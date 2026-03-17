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
      
      <div className="p-10 space-y-8 flex flex-col h-full">
        <div className="space-y-5 flex-grow">
          <div className="flex justify-between items-start">
            <span 
              data-testid="project-type"
              className="label-system text-[9px] font-black border-l-2 border-primary-600 pl-3"
            >
              {project.project_type || 'CORE PROJECT'}
            </span>
            <span className="text-[10px] font-mono font-bold text-silver group-hover:text-black transition-colors">
              OBJ. {String(project.api_id || project.id).padStart(4, '0')}
            </span>
          </div>
          <h3 
            data-testid="project-title"
            className="text-4xl font-black tracking-tighter uppercase leading-[0.9] transition-all group-hover:text-primary-600"
          >
            {translatedTitle}
          </h3>
          <p className="text-[12px] font-medium text-charcoal leading-snug uppercase tracking-tight line-clamp-3 tight-p opacity-80 group-hover:opacity-100 transition-opacity">
            {translatedDesc}
          </p>
        </div>

        <div className="pt-8 border-t border-silver/50 flex items-center justify-between group-hover:border-black transition-colors">
          <div className="flex flex-col">
            <span className="label-system text-[8px] mb-1.5 text-silver group-hover:text-black transition-colors">{t('contract_client', 'repository')}</span>
            <span className="text-[11px] font-black uppercase tracking-widest">{project.project_client}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="label-system text-[8px] mb-1.5 text-silver group-hover:text-black transition-colors">{t('seq_year', 'repository')}</span>
            <span className="text-[11px] font-mono font-black">{project.project_date}</span>
          </div>
        </div>
      </div>
      
      {/* Decorative Corner Element */}
      <div className="absolute bottom-0 right-0 w-2 h-2 bg-silver group-hover:bg-primary-600 transition-colors" />
    </Link>
  );
};
