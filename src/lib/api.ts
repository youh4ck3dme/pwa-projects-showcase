import { geminiClient, GeminiQuery, GeminiSearchResult } from './gemini';

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  budget: string;
  timeline: string;
  skills: string[];
  files?: string[];
  featured_image_url?: string;
  createdAt: string;
}

export interface SearchParams {
  query?: string;
  category?: string;
  type?: string;
  budget?: string;
  skills?: string[];
  page?: number;
  limit?: number;
}

export class ProjectAPI {
  private static async handleGeminiRequest<T>(
    requestFn: () => Promise<T>
  ): Promise<{ data?: T; error?: string }> {
    try {
      const data = await requestFn();
      return { data };
    } catch (error) {
      console.error('API request error:', error);
      return { 
        error: error instanceof Error ? error.message : 'An unexpected error occurred' 
      };
    }
  }

  private static async fetchAllProjects(): Promise<ProjectData[]> {
    try {
      // In a real environment, this would call the /api/projects route
      // or read the file if on the server.
      const response = await fetch('/api/projects');
      if (!response.ok) return [];
      const projectsCCT = await response.json();
      return projectsCCT.map((p: any) => ({
        id: String(p.api_id || p.id),
        title: p.project_title,
        description: p.project_desc,
        category: p.project_category,
        type: p.project_type,
        budget: p.suggested_budget || '$10k - $50k',
        timeline: p.suggested_timeline || '3-6 months',
        skills: p.neural_meta?.tech_stack || [],
        featured_image_url: p.featured_image_url,
        createdAt: p.project_date || new Date().toISOString()
      }));
    } catch (e) {
      console.error('Failed to fetch projects for context:', e);
      return [];
    }
  }

  static async searchProjects(params: SearchParams): Promise<{
    projects: ProjectData[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    return this.handleGeminiRequest(async () => {
      // Get all real projects first to provide context and match results
      const allProjects = await this.fetchAllProjects();
      
      const query: GeminiQuery = {
        query: params.query || 'Find relevant projects',
        context: allProjects.map(p => `${p.title}: ${p.description}`),
        filters: {
          category: params.category,
          type: params.type,
          budget: params.budget,
          skills: params.skills
        }
      };

      // Use Gemini for intelligent ranking/search if query is provided
      // Otherwise just filter the allProjects
      let filteredProjects = allProjects;

      if (params.query) {
        const searchResults = await geminiClient.search(query);
        // Match Gemini results back to our real project objects to keep images
        filteredProjects = searchResults.map(res => {
          const match = allProjects.find(p => 
            p.title.toLowerCase().includes(res.title.toLowerCase()) || 
            res.title.toLowerCase().includes(p.title.toLowerCase())
          );
          return match || {
            id: `gen-${Math.random()}`,
            title: res.title,
            description: res.snippet,
            category: params.category || 'General',
            type: params.type || 'Standard',
            budget: '$10k - $50k',
            timeline: '3-6 months',
            skills: [],
            createdAt: new Date().toISOString()
          };
        });
      }

      // Apply basic filters if any
      if (params.category && params.category !== 'all' && params.category !== 'ALL') {
        filteredProjects = filteredProjects.filter(p => p.category.toLowerCase() === params.category?.toLowerCase());
      }
      
      return {
        projects: filteredProjects,
        total: filteredProjects.length,
        page: params.page || 1,
        totalPages: Math.ceil(filteredProjects.length / (params.limit || 10))
      };
    }).then(result => result.data!);
  }

  static async getProjectById(id: string): Promise<ProjectData | null> {
    return this.handleGeminiRequest(async () => {
      const query: GeminiQuery = {
        query: `Get detailed information for project with ID: ${id}`,
        context: [`Looking for project details for ID: ${id}`]
      };

      const results = await geminiClient.search(query);
      
      if (results.length > 0) {
        return this.convertResultToProject(results[0], id);
      }
      
      return null;
    }).then(result => result.data || null);
  }

  static async createProject(projectData: Omit<ProjectData, 'id' | 'createdAt'>): Promise<ProjectData> {
    return this.handleGeminiRequest(async () => {
      const prompt = `
        Create a new project with these details:
        Title: ${projectData.title}
        Description: ${projectData.description}
        Category: ${projectData.category}
        Type: ${projectData.type}
        Budget: ${projectData.budget}
        Timeline: ${projectData.timeline}
        Skills: ${projectData.skills.join(', ')}
        
        Generate a unique project ID and return the complete project data.
      `;

      const result = await geminiClient.generateContent(prompt);
      
      // Parse the generated content into project format
      return this.parseGeneratedProject(result, projectData);
    }).then(result => result.data!);
  }

  static async updateProject(id: string, updates: Partial<ProjectData>): Promise<ProjectData | null> {
    return this.handleGeminiRequest(async () => {
      const prompt = `
        Update project with ID: ${id}
        Changes: ${JSON.stringify(updates)}
        
        Return the updated project data.
      `;

      const result = await geminiClient.generateContent(prompt);
      return this.parseGeneratedProject(result, { ...updates, id } as any);
    }).then(result => result.data || null);
  }

  static async deleteProject(id: string): Promise<boolean> {
    return this.handleGeminiRequest(async () => {
      const prompt = `Delete project with ID: ${id}. Confirm deletion.`;
      const result = await geminiClient.generateContent(prompt);
      
      return result.toLowerCase().includes('confirmed') || result.toLowerCase().includes('deleted');
    }).then(result => result.data!);
  }

  static async getRecommendations(projectId: string): Promise<ProjectData[]> {
    return this.handleGeminiRequest(async () => {
      const project = await this.getProjectById(projectId);
      
      if (!project) {
        return [];
      }

      const prompt = `
        Based on this project:
        ${JSON.stringify(project, null, 2)}
        
        Recommend 5 similar projects that would be relevant.
        Return project data in the same format.
      `;

      const result = await geminiClient.generateContent(prompt);
      return this.parseRecommendations(result);
    }).then(result => result.data || []);
  }

  static async analyzeMarketTrends(category?: string): Promise<any> {
    return this.handleGeminiRequest(async () => {
      return await geminiClient.analyzeData({ category: category || 'all' }, 'insights');
    }).then(result => result.data);
  }

  // Private helper methods
  private static async buildSearchContext(params: SearchParams): Promise<string[]> {
    const context: string[] = [];
    
    if (params.category) {
      context.push(`Filtering by category: ${params.category}`);
    }
    
    if (params.type) {
      context.push(`Filtering by type: ${params.type}`);
    }
    
    if (params.budget) {
      context.push(`Budget filter: ${params.budget}`);
    }
    
    if (params.skills && params.skills.length > 0) {
      context.push(`Required skills: ${params.skills.join(', ')}`);
    }
    
    return context;
  }

  private static async convertToProjects(
    results: GeminiSearchResult[], 
    params: SearchParams
  ): Promise<ProjectData[]> {
    // This would typically convert Gemini search results to project format
    // For now, return mock data structure
    return results.map((result, index) => ({
      id: `project-${index + 1}`,
      title: result.title,
      description: result.snippet,
      category: params.category || 'General',
      type: params.type || 'Standard',
      budget: params.budget || '$1000-5000',
      timeline: '2-4 weeks',
      skills: params.skills || ['General'],
      createdAt: new Date().toISOString()
    }));
  }

  private static convertResultToProject(result: GeminiSearchResult, id: string): ProjectData {
    return {
      id,
      title: result.title,
      description: result.snippet,
      category: 'General',
      type: 'Standard',
      budget: '$1000-5000',
      timeline: '2-4 weeks',
      skills: ['General'],
      createdAt: new Date().toISOString()
    };
  }

  private static parseGeneratedProject(content: string, baseData: any): ProjectData {
    // Parse Gemini-generated content into project format
    return {
      id: `project-${Date.now()}`,
      title: baseData.title || 'Generated Project',
      description: baseData.description || content.substring(0, 200),
      category: baseData.category || 'General',
      type: baseData.type || 'Standard',
      budget: baseData.budget || '$1000-5000',
      timeline: baseData.timeline || '2-4 weeks',
      skills: baseData.skills || ['General'],
      createdAt: new Date().toISOString()
    };
  }

  private static parseRecommendations(content: string): ProjectData[] {
    // Parse Gemini recommendations into project format
    try {
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) {
        return parsed.map((item, index) => ({
          id: `recommendation-${index + 1}`,
          title: item.title || 'Recommended Project',
          description: item.description || item.snippet || 'Recommended project description',
          category: item.category || 'General',
          type: item.type || 'Standard',
          budget: item.budget || '$1000-5000',
          timeline: item.timeline || '2-4 weeks',
          skills: item.skills || ['General'],
          createdAt: new Date().toISOString()
        }));
      }
    } catch {
      // Fallback to simple parsing
      return [{
        id: 'recommendation-1',
        title: 'Recommended Project',
        description: content.substring(0, 200),
        category: 'General',
        type: 'Standard',
        budget: '$1000-5000',
        timeline: '2-4 weeks',
        skills: ['General'],
        createdAt: new Date().toISOString()
      }];
    }
    
    return [];
  }
}

// Export API instance
export const projectAPI = new ProjectAPI();