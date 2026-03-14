'use client';

import React, { useState } from 'react';
import { ProjectCard } from '@/components/molecules/ProjectCard';
import { SearchAssistant } from '@/components/ai/SearchAssistant';
import { MarketAnalyzer } from '@/components/ai/MarketAnalyzer';
import type { ProjectCCT } from '@/types/project';
import type { ProjectData } from '@/lib/api';

interface ProjectsClientProps {
  initialProjects: ProjectCCT[];
}

export default function ProjectsClient({ initialProjects }: ProjectsClientProps) {
  const [projects, setProjects] = useState<ProjectCCT[]>(initialProjects);
  const [isLoading, setIsLoading] = useState(false);

  // Helper to map AI ProjectData back to ProjectCCT for the UI
  const mapToProjectCCT = (data: ProjectData[]): ProjectCCT[] => {
    return data.map(p => ({
      id: parseInt(p.id.replace('project-', '')) || Math.floor(Math.random() * 10000),
      api_id: parseInt(p.id.replace('project-', '')) || 0,
      project_title: p.title,
      project_tagline: p.category,
      project_desc: p.description,
      project_content: p.description,
      project_type: p.type,
      project_category: p.category,
      project_client: 'N/A',
      project_date: p.createdAt,
      project_link: p.id,
      project_img_id: 0,
      project_gal_id: '',
      featured_image_url: `https://placehold.co/600x400?text=${encodeURIComponent(p.title)}`
    }));
  };

  const handleSearchResults = (results: ProjectData[]) => {
    if (results.length > 0) {
      setProjects(mapToProjectCCT(results));
    } else {
      // If no results, maybe show initial or empty
      setProjects([]);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Main Content */}
      <div className="flex-grow space-y-8">
        <SearchAssistant 
          onSearchResults={handleSearchResults}
          onLoading={setIsLoading}
        />

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {isLoading ? 'Hľadám...' : 'Projekty'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects?.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {!isLoading && projects?.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
              <p className="text-gray-500 italic">Neboli nájdené žiadne projekty.</p>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <aside className="lg:w-80 space-y-8">
        <MarketAnalyzer onAnalysisComplete={(analysis) => console.log('Market Analysis:', analysis)} />
        
        <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-6 text-white shadow-xl">
          <h3 className="text-lg font-bold mb-2">Premium Support</h3>
          <p className="text-primary-100 text-sm mb-4">
            Potrebujete help s implementáciou AI do vášho WordPressu?
          </p>
          <button className="w-full py-2 bg-white text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors">
            Kontaktujte nás
          </button>
        </div>
      </aside>
    </div>
  );
}
