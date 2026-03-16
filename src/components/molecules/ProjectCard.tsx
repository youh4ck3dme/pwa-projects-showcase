import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { ProjectCCT } from '../../types/project';

interface ProjectCardProps {
  project: ProjectCCT;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const imageUrl = project.featured_image_url || `https://placehold.co/600x400?text=${encodeURIComponent(project.project_title)}`;

  return (
    <Link href={`/project/${project.api_id || project.id}`} 
      className="group block border border-silver hover:border-black transition-all duration-100 bg-white"
    >
      <div className="aspect-[16/9] overflow-hidden relative border-b border-silver group-hover:border-black transition-colors">
        <Image
          src={imageUrl}
          alt={project.project_title}
          fill
          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
        />
        {project.project_category && (
          <div className="absolute top-0 right-0 bg-black text-white px-3 py-1 text-[9px] font-black tracking-widest uppercase">
            {project.project_category}
          </div>
        )}
      </div>
      
      <div className="p-8 space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <span className="label-system text-[9px] font-black">{project.project_type || 'CORE PROJECT'}</span>
            <span className="text-[10px] font-mono text-silver group-hover:text-black">OBJ. {project.api_id || project.id}</span>
          </div>
          <h3 className="text-3xl font-black tracking-tighter uppercase leading-none border-b-2 border-transparent group-hover:border-black inline-block pb-1">
            {project.project_title}
          </h3>
          <p className="text-[11px] font-medium text-charcoal leading-relaxed uppercase tracking-tight line-clamp-2">
            {project.project_desc}
          </p>
        </div>

        <div className="pt-6 border-t border-silver flex items-center justify-between">
          <div className="flex flex-col">
            <span className="label-system text-[8px] mb-1">CONTRACT / CLIENT</span>
            <span className="text-[10px] font-black uppercase tracking-widest">{project.project_client}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="label-system text-[8px] mb-1">SEQUENCE / YEAR</span>
            <span className="text-[10px] font-mono font-bold">{project.project_date}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
