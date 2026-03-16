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