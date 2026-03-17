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

// POST /api/projects - Add a new project
export async function POST(req: Request) {
  try {
    const newProject: ProjectCCT = await req.json();
    const projects = await getProjects();
    
    // Check if project already exists
    if (projects.some(p => p.api_id === newProject.api_id)) {
      return NextResponse.json(
        { error: 'Project already exists' },
        { status: 400 }
      );
    }

    projects.push(newProject);

    const fs = await import('fs/promises');
    const path = await import('path');
    const dataPath = path.join(process.cwd(), 'public', 'projects_data.json');
    
    await fs.writeFile(dataPath, JSON.stringify(projects, null, 2), 'utf8');

    return NextResponse.json(newProject);
  } catch (error) {
    console.error('Error saving project:', error);
    return NextResponse.json(
      { error: 'Failed to save project' },
      { status: 500 }
    );
  }
}

// GET /api/projects - Get all projects
export async function GET() {
  try {
    const projects = await getProjects();
    return NextResponse.json(projects);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}