import { NextResponse } from 'next/server';
import type { ProjectCCT } from '@/types/project';
import fs from 'fs/promises';
import path from 'path';

async function getProjects(): Promise<ProjectCCT[]> {
  const dataPath = path.join(process.cwd(), 'public', 'projects_data.json');
  const data = await fs.readFile(dataPath, 'utf8');
  return JSON.parse(data);
}

export async function POST(request: Request) {
  try {
    const { projectId, contextWeights } = await request.json();
    const projects = await getProjects();
    
    // Convert to number since IDs in JSON are numbers
    const targetId = typeof projectId === 'string' ? parseInt(projectId) : projectId;
    
    const projectIndex = projects.findIndex(p => p.api_id === targetId || p.id === targetId);
    
    if (projectIndex === -1) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // Update Project with Calibration Data
    projects[projectIndex] = {
      ...projects[projectIndex],
      neuralMetadata: {
        ...projects[projectIndex].neuralMetadata,
        contextWeights,
        lastCalibration: new Date().toISOString()
      }
    };

    const dataPath = path.join(process.cwd(), 'public', 'projects_data.json');
    await fs.writeFile(dataPath, JSON.stringify(projects, null, 2), 'utf8');

    return NextResponse.json({ 
      success: true, 
      project: projects[projectIndex] 
    });
  } catch (error) {
    console.error('Calibration error:', error);
    return NextResponse.json(
      { error: 'Calibration failed' },
      { status: 500 }
    );
  }
}