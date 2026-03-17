import JSZip from 'jszip';
import { geminiClient } from './gemini';

export interface IngestedProject {
  title: string;
  tagline: string;
  description: string;
  category: string;
  type: string;
  techStack: string[];
  architecture: string;
  marketIntel: string;
  suggestedBudget: string;
  suggestedTimeline: string;
}

export class IngestionService {
  /**
   * Processes a ZIP file, extracts relevant text content, and sends it to Gemini for analysis.
   */
  static async ingestZip(fileBuffer: Buffer): Promise<IngestedProject> {
    const zip = new JSZip();
    const contents = await zip.loadAsync(fileBuffer);
    
    let combinedContext = '';
    const filesToRead = [
      'README.md',
      'package.json',
      'next.config.js',
      'tailwind.config.js',
      'composer.json',
      'requirements.txt',
      'Dockerfile',
      '.env.example'
    ];

    // Extract content from key files
    for (const fileName of Object.keys(contents.files)) {
      const file = contents.files[fileName];
      if (file.dir) continue;

      // Focus on documentation and config files for efficient context
      const isKeyFile = filesToRead.some(k => fileName.toLowerCase().endsWith(k.toLowerCase()));
      const isSourceFile = /\.(ts|tsx|js|py|php|go)$/.test(fileName) && !fileName.includes('node_modules');

      if (isKeyFile || (isSourceFile && combinedContext.length < 15000)) {
        const text = await file.async('string');
        combinedContext += `\n\n--- FILE: ${fileName} ---\n${text}`;
      }
    }

    const prompt = `
      Act as a Senior CTO and Product Strategist. Analyze the following project files and generate a comprehensive project profile.
      
      CONTEXT:
      ${combinedContext}
      
      TASK:
      Generate a JSON object with the following fields:
      - title: A premium, impactful name.
      - tagline: A one-sentence value proposition.
      - description: A detailed 2-3 paragraph overview of the product's purpose and functionality.
      - category: One of [Fintech, AI, Blockchain, E-commerce, Enterprise, SaaS, Gaming, Innovation].
      - type: One of [Web App, Native App, Infrastructure, AI Tool, System Software].
      - techStack: An array of core technologies used.
      - architecture: A summary of the architectural approach (e.g., Microservices, Monolithic, Serverless).
      - marketIntel: Analysis of the target audience and revenue potential.
      - suggestedBudget: Estimated project cost (e.g., "$50k - $100k").
      - suggestedTimeline: Estimated development time (e.g., "4-6 months").

      Output ONLY valid JSON.
    `;

    try {
      const aiResponse = await geminiClient.generateContent(prompt);
      // Clean up potential markdown formatting in response
      const jsonStr = aiResponse.replace(/```json|```/g, '').trim();
      return JSON.parse(jsonStr);
    } catch (error) {
      console.error('Gemini Analysis Error:', error);
      throw new Error('Failed to analyze project with AI');
    }
  }
}
