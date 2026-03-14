import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

export interface GeminiSearchResult {
  title: string;
  snippet: string;
  url?: string;
  score?: number;
}

export interface GeminiQuery {
  query: string;
  context?: string[];
  filters?: Record<string, any>;
}

export class GeminiEnterpriseClient {
  private model: GenerativeModel;

  constructor() {
    this.model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

  async search(query: GeminiQuery): Promise<GeminiSearchResult[]> {
    try {
      const prompt = this.buildSearchPrompt(query);
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Parse the response into structured results
      return this.parseSearchResults(text);
    } catch (error) {
      console.error('Gemini search error:', error);
      return [];
    }
  }

  async generateContent(prompt: string, context?: string[]): Promise<string> {
    try {
      const fullPrompt = this.buildContentPrompt(prompt, context);
      const result = await this.model.generateContent(fullPrompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini content generation error:', error);
      return '';
    }
  }

  async analyzeData(data: any, analysisType: 'summary' | 'insights' | 'recommendations'): Promise<string> {
    try {
      const prompt = this.buildAnalysisPrompt(data, analysisType);
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini data analysis error:', error);
      return '';
    }
  }

  private buildSearchPrompt(query: GeminiQuery): string {
    return `
      Perform an enterprise search for: "${query.query}"
      
      Context: ${query.context?.join('\n') || 'No additional context'}
      
      Filters: ${JSON.stringify(query.filters || {})}
      
      Return results in JSON format with title, snippet, url, and score fields.
      Focus on relevance, accuracy, and enterprise-grade information.
    `;
  }

  private buildContentPrompt(prompt: string, context?: string[]): string {
    return `
      Generate content based on this prompt: "${prompt}"
      
      Context: ${context?.join('\n') || 'No additional context'}
      
      Provide a comprehensive, accurate response suitable for enterprise use.
      Include relevant examples and practical applications where appropriate.
    `;
  }

  private buildAnalysisPrompt(data: any, analysisType: string): string {
    return `
      Analyze this data for ${analysisType}:
      
      Data: ${JSON.stringify(data, null, 2)}
      
      Analysis Type: ${analysisType}
      
      Provide insights in a structured format suitable for enterprise decision-making.
    `;
  }

  private parseSearchResults(text: string): GeminiSearchResult[] {
    try {
      // Try to parse as JSON first
      const parsed = JSON.parse(text);
      if (Array.isArray(parsed)) {
        return parsed;
      }
      return [parsed];
    } catch {
      // Fallback to simple parsing if not valid JSON
      return [{
        title: 'Search Result',
        snippet: text.substring(0, 200),
        url: '',
        score: 1
      }];
    }
  }
}

// Export singleton instance
export const geminiClient = new GeminiEnterpriseClient();