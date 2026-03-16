import { NextResponse } from 'next/server';
import type { ProjectCCT } from '@/types/project';

// Read projects from the JSON file
async function getProjects(): Promise<ProjectCCT[]> {
  try {
    const fs = await import('fs/promises');
    const path = await import('path');
    const dataPath = path.join(process.cwd(), 'public', 'projects_data.json');
    const data = await fs.readFile(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading projects data:', error);
    return [];
  }
}

// GET /api/projects/[id] - Get single project
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const projects = await getProjects();
    const id = params.id;
    
    // Find project by api_id or id
    const project = projects.find(p => p.api_id === parseInt(id) || p.id === parseInt(id));
    
    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(project);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}