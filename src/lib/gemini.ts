import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';

/**
 * LARSEN EVANS - EMERGENCY PATCH
 * Global fix for "TypeError: Failed to execute 'append' on 'Headers': String contains non ISO-8859-1 code point"
 * This error occurs when third-party SDKs attempt to add non-ASCII metadata to headers.
 */
if (typeof window !== 'undefined' && typeof Headers !== 'undefined') {
  const originalAppend = Headers.prototype.append;
  Headers.prototype.append = function(name: string, value: string) {
    // Sanitize value to basic ASCII to prevent fetch crashes
    const sanitizedValue = String(value).replace(/[^\x00-\x7F]/g, '');
    return originalAppend.call(this, name, sanitizedValue);
  };
}

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
  private flashModel: GenerativeModel;
  private proModel: GenerativeModel;

  constructor() {
    this.flashModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    this.proModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

  private sanitizeInput(input: string): string {
    // Aggressive sanitization: Strip everything except Basic ASCII (0-127)
    // to prevent "String contains non ISO-8859-1 code point" in browser Header.append
    return input.replace(/[^\x00-\x7F]/g, '');
  }

  async search(query: GeminiQuery): Promise<GeminiSearchResult[]> {
    try {
      const sanitizedQuery = {
        ...query,
        query: this.sanitizeInput(query.query),
        context: query.context?.map(c => this.sanitizeInput(c))
      };
      const prompt = this.buildSearchPrompt(sanitizedQuery);
      const result = await this.flashModel.generateContent(prompt);
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
      const sanitizedPrompt = this.sanitizeInput(prompt);
      const sanitizedContext = context?.map(c => this.sanitizeInput(c));
      const fullPrompt = this.buildContentPrompt(sanitizedPrompt, sanitizedContext);
      const result = await this.proModel.generateContent(fullPrompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini content generation error:', error);
      return '';
    }
  }

  async generateQuickContent(prompt: string, context?: string[]): Promise<string> {
    try {
      const sanitizedPrompt = this.sanitizeInput(prompt);
      const sanitizedContext = context?.map(c => this.sanitizeInput(c));
      const fullPrompt = this.buildContentPrompt(sanitizedPrompt, sanitizedContext);
      const result = await this.flashModel.generateContent(fullPrompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini quick content generation error:', error);
      return '';
    }
  }

  async analyzeData(data: any, analysisType: 'summary' | 'insights' | 'recommendations'): Promise<string> {
    try {
      const sanitizedData = JSON.parse(this.sanitizeInput(JSON.stringify(data)));
      const prompt = this.buildAnalysisPrompt(sanitizedData, analysisType);
      const result = await this.proModel.generateContent(prompt);
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