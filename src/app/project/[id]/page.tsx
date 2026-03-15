import Link from 'next/link';
import Image from 'next/image';
import { fetchProject, fetchProjects } from '@/api/projects';
import ProjectDetailClient from './ProjectDetailClient';
import V4FinstatPresentation from '@/components/V4FinstatPresentation';

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Specific metadata for V4-Finstat to match user's original HTML
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
      title: `${project.project_title} | PWA Vzorkovník`,
      description: project.project_desc || project.project_tagline,
      openGraph: {
        images: [project.featured_image_url || `https://placehold.co/1200x600?text=${encodeURIComponent(project.project_title)}`],
      },
    };
  } catch {
    return { title: 'Projekt nebol nájdený | PWA Vzorkovník' };
  }
}

// Optionally generate static paths at build time for speed (SSG)
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

    // Custom presentation render for Project 101
    if (id === '101' || project.api_id === 101) {
      return <V4FinstatPresentation />;
    }

    const imageUrl = project.featured_image_url || `https://placehold.co/1200x600?text=${encodeURIComponent(project.project_title)}`;

    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-primary-600 transition-colors mb-8">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Späť na zoznam
        </Link>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CreativeWork",
              name: project.project_title,
              description: project.project_desc || project.project_tagline,
              image: imageUrl,
              author: {
                "@type": "Organization",
                name: "JetEngine CCT PWA"
              }
            })
          }}
        />

        <div className="space-y-4 mb-12">
          <p className="text-sm font-semibold text-primary-600 uppercase tracking-widest">{project.project_tagline}</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">{project.project_title}</h1>
        </div>

        <div className="rounded-3xl overflow-hidden shadow-2xl mb-12 relative aspect-video">
          <Image
            src={imageUrl}
            alt={project.project_title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Popis projektu</h2>
              <div
                className="prose prose-lg max-w-none text-gray-600 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: project.project_content }}
              />
            </section>

            {project.project_link && (
              <a
                href={project.project_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-xl text-white bg-primary-600 hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Navštíviť projekt
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            )}
          </div>

          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-50 pb-4">Detaily projektu</h3>
              <dl className="space-y-6">
                <div>
                  <dt className="text-xs font-medium text-gray-400 uppercase tracking-wider">Klient</dt>
                  <dd className="mt-1 text-base font-semibold text-gray-900">{project.project_client}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-gray-400 uppercase tracking-wider">Kategória</dt>
                  <dd className="mt-1 text-base font-semibold text-gray-900">{project.project_category}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-gray-400 uppercase tracking-wider">Typ projektu</dt>
                  <dd className="mt-1 text-base font-semibold text-gray-900">{project.project_type}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-gray-400 uppercase tracking-wider">Dátum</dt>
                  <dd className="mt-1 text-base font-semibold text-gray-900">{project.project_date}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
        <ProjectDetailClient project={project} />
      </div>
    );
  } catch {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-2xl font-bold text-red-600">Projekt nebol nájdený</h2>
        <Link href="/" className="text-primary-600 hover:underline mt-4 block">Späť na zoznam projektov</Link>
      </div>
    );
  }
}
