import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { ProjectCCT } from '../../types/project';
import { useLanguage } from '@/context/LanguageContext';

interface ProjectCardProps {
  project: ProjectCCT;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { t } = useLanguage();
  
  // Normalize title for key mapping
  const keyBase = project.project_title.toLowerCase().replace(/[^a-z0-9]/g, '_');
  
  const translatedTitle = t(`${keyBase}_title`, 'projects_data') !== `${keyBase}_title` 
    ? t(`${keyBase}_title`, 'projects_data') 
    : project.project_title;
    
  const translatedDesc = t(`${keyBase}_desc`, 'projects_data') !== `${keyBase}_desc` 
    ? t(`${keyBase}_desc`, 'projects_data') 
    : project.project_desc;

  const imageUrl = project.featured_image_url || `https://placehold.co/600x400?text=${encodeURIComponent(project.project_title)}`;

  return (
    <Link href={`/project/${project.api_id || project.id}`} 
      className="group block border-silver hover:border-black transition-all duration-300 bg-white relative overflow-hidden h-full"
    >
      <div className="aspect-[16/10] overflow-hidden relative border-b border-silver group-hover:border-black transition-colors">
        <Image
          src={imageUrl}
          alt={project.project_title}
          fill
          className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
        />
        {project.project_category && (
          <div 
            data-testid="project-category"
            className="absolute top-0 right-0 bg-black text-white px-4 py-2 text-[10px] font-black tracking-[0.2em] uppercase z-10 translate-x-1 group-hover:translate-x-0 transition-transform"
          >
            {project.project_category}
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
      </div>
      
      <div className="p-8 space-y-8 flex flex-col h-full border-l border-black/5 group-hover:border-black/20 transition-colors mx-2">
        <div className="space-y-6 flex-grow">
          <div className="flex justify-between items-center bg-bone px-3 py-2 border border-silver group-hover:border-black transition-colors">
            <span 
              data-testid="project-type"
              className="text-[9px] font-black tracking-widest uppercase text-primary-600"
            >
              {project.project_type || 'CORE PROJECT'}
            </span>
            <span className="text-[9px] font-mono font-bold text-silver group-hover:text-black">
              #{String(project.api_id || project.id).slice(-4)}
            </span>
          </div>
          <h3 
            data-testid="project-title"
            className="text-4xl font-black tracking-tighter uppercase leading-[0.85] transition-all group-hover:text-primary-600"
          >
            {translatedTitle}
          </h3>
          <p className="text-[11px] font-medium text-charcoal leading-snug uppercase tracking-tight line-clamp-2 tight-p opacity-60 group-hover:opacity-100 transition-opacity max-w-[90%]">
            {translatedDesc}
          </p>
        </div>

        <div className="pt-6 border-t border-silver/40 flex items-center justify-between group-hover:border-black/40 transition-colors">
          <div className="flex flex-col">
            <span className="text-[8px] font-black text-silver uppercase mb-1">{t('contract_client', 'repository')}</span>
            <span className="text-[10px] font-black uppercase tracking-widest">{project.project_client}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[8px] font-black text-silver uppercase mb-1">{t('seq_year', 'repository')}</span>
            <span className="text-[10px] font-mono font-black">{project.project_date}</span>
          </div>
        </div>
      </div>
      
      {/* Decorative Corner Element */}
      <div className="absolute bottom-0 right-0 w-2 h-2 bg-silver group-hover:bg-primary-600 transition-colors" />
    </Link>
  );
};
