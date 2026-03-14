import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { ProjectCCT } from '../../types/project';
import { ProjectTitle } from '../atoms/ProjectTitle';
import { ProjectTagline } from '../atoms/ProjectTagline';

interface ProjectCardProps {
  project: ProjectCCT;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const imageUrl = project.featured_image_url || `https://placehold.co/600x400?text=${encodeURIComponent(project.project_title)}`;

  return (
    <Link href={`/project/${project.api_id || project.id}`} className="group block overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="aspect-[16/9] overflow-hidden bg-gray-100 relative">
        <Image
          src={imageUrl}
          alt={project.project_title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {project.project_category && (
          <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700 border border-white/20">
            {project.project_category}
          </span>
        )}
      </div>
      <div className="p-6">
        <ProjectTagline>{project.project_tagline}</ProjectTagline>
        <ProjectTitle>{project.project_title}</ProjectTitle>
        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <span>{project.project_client}</span>
          <span>{project.project_date}</span>
        </div>
      </div>
    </Link>
  );
};
