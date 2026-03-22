import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { ProjectCCT } from '../../types/project';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';

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
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="h-full flex flex-col"
    >
      <Link href={`/project/${project.api_id || project.id}`} 
        className="group block glass hover:bg-white/5 transition-all duration-500 overflow-hidden h-full flex flex-col relative"
      >
        <div className="aspect-[16/9] overflow-hidden relative">
          <Image
            src={imageUrl}
            alt={project.project_title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
          />
          {project.project_category && (
            <div 
              data-testid="project-category"
              className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm text-white px-3 py-1.5 text-[9px] font-black tracking-[0.2em] uppercase z-10"
            >
              {project.project_category}
            </div>
          )}
        </div>
        
        <div className="p-5 lg:p-8 flex flex-col flex-grow space-y-4 lg:space-y-6">
          <div className="flex justify-between items-center opacity-60">
            <span 
              data-testid="project-type"
              className="text-[9px] font-black tracking-widest uppercase text-primary-600"
            >
              {project.project_type || 'CORE PROJECT'}
            </span>
            <span className="text-[9px] font-mono font-bold">
              #{String(project.api_id || project.id).slice(-4)}
            </span>
          </div>

          <div className="space-y-3 flex-grow">
            <h3 
              data-testid="project-title"
              className="text-2xl lg:text-3xl font-black tracking-tight uppercase leading-none group-hover:text-primary-600 transition-colors"
            >
              {translatedTitle}
            </h3>
            <p className="text-[12px] font-medium text-charcoal leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity line-clamp-3">
              {translatedDesc}
            </p>
          </div>

          <div className="pt-4 lg:pt-6 border-t border-white/10 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[8px] font-black text-white/40 uppercase mb-1">{t('contract_client', 'repository')}</span>
              <span className="text-[10px] font-black uppercase tracking-wider">{project.project_client}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[8px] font-black text-white/40 uppercase mb-1">{t('seq_year', 'repository')}</span>
              <span className="text-[10px] font-mono font-black">{project.project_date}</span>
            </div>
          </div>
        </div>
        
        {/* Modern Accent */}
        <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full bg-primary-600 transition-all duration-500" />
      </Link>
    </motion.div>
  );
};
