import type { ProjectCCT } from '../types/project';

const API_BASE_URL = process.env.NEXT_PUBLIC_WP_API_URL || '';

export const fetchProjects = async (): Promise<ProjectCCT[]> => {
  // Try to fetch from JSON files if API URL is not set (mocking for initial setup)
  if (!API_BASE_URL) {
    // Isomorphic approach: if we are on the server, read the file directly
    if (typeof window === 'undefined') {
      const fs = await import('fs/promises');
      const path = await import('path');
      const dataPath = path.join(process.cwd(), 'public', 'projects_data.json');
      try {
        const data = await fs.readFile(dataPath, 'utf8');
        return JSON.parse(data);
      } catch (e) {
        console.error("Mock data file not found", e);
        return [];
      }
    }

    // Client-side fallback fetching using our API route
    const response = await fetch('/api/projects');
    if (!response.ok) throw new Error('Failed to fetch projects');
    return response.json();
  }

  const response = await fetch(`${API_BASE_URL}/wp-json/wp/v2/projects?_embed`);
  if (!response.ok) throw new Error('Failed to fetch projects');
  return response.json();
};

export const fetchProject = async (id: string | number): Promise<ProjectCCT> => {
  if (!API_BASE_URL) {
    if (typeof window === 'undefined') {
      const projects = await fetchProjects();
      const project = projects.find(p => p.api_id === Number(id) || p.id === Number(id));
      if (!project) throw new Error('Project not found');
      return project;
    }

    // Use our API route for client-side fetching
    const response = await fetch(`/api/projects/${id}`);
    if (!response.ok) throw new Error('Project not found');
    return response.json();
  }

  const response = await fetch(`${API_BASE_URL}/wp-json/wp/v2/projects/${id}?_embed`);
  if (!response.ok) throw new Error('Failed to fetch project');
  return response.json();
};
