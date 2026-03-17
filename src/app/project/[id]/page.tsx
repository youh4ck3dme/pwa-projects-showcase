import Link from 'next/link';
import { fetchProject, fetchProjects } from '@/api/projects';
import V4FinstatPresentation from '@/components/V4FinstatPresentation';
import ProjectDetailWrapper from './ProjectDetailWrapper';

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  if (id === '101') {
    return {
      title: '📊 V4-Finstat Projekt v5.0 - Pitch Deck',
      description: 'Vyhľadávač firiem pre celý región V4. B2B SaaS Softvér | Live na produkcii. Prepojenie registrov SK, CZ, PL, HU.',
      openGraph: {
        title: '📊 V4-Finstat Projekt v5.0 - Pitch Deck',
        description: 'Vyhľadávač firiem pre celý región V4. B2B SaaS Softvér | Live na produkcii. Prepojenie registrov SK, CZ, PL, HU.',
        images: ['/images/v4-finstat.png'],
      },
    };
  }

  try {
    const project = await fetchProject(id);
    return {
      title: `${project.project_title} | LARSEN EVANS PROJECTS`,
      description: project.project_desc || project.project_tagline,
      openGraph: {
        images: [project.featured_image_url || `https://placehold.co/1200x600?text=${encodeURIComponent(project.project_title)}`],
      },
    };
  } catch {
    return { title: 'Projekt nebol nájdený | LARSEN EVANS PROJECTS' };
  }
}

export async function generateStaticParams() {
  try {
    const projects = await fetchProjects();
    return projects.map((p) => ({
      id: p.api_id ? p.api_id.toString() : p.id.toString(),
    }));
  } catch {
    return [];
  }
}

export default async function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const project = await fetchProject(id);

    if (id === '101' || project.api_id === 101) {
      return <V4FinstatPresentation />;
    }

    return <ProjectDetailWrapper project={project} id={id} />;
  } catch {
    return (
      <div className="max-w-7xl mx-auto px-6 py-32 text-center h-screen flex flex-col items-center justify-center bg-white">
        <h2 className="text-4xl font-black tracking-tighter uppercase mb-6">Error_404: Sequence_Not_Found</h2>
        <Link href="/" className="text-[10px] font-black uppercase tracking-widest border-2 border-black px-8 py-4 hover:bg-black hover:text-white transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)]">
          Back_to_Index
        </Link>
      </div>
    );
  }
}
