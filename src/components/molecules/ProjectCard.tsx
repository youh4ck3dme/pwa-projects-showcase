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
    <Link href={`/project/${project.api_id || project.id}`} 
      className="group block overflow-hidden transition-all duration-300 border" 
      style={{ 
        borderRadius: 'var(--radius-2xl)', 
        backgroundColor: 'var(--bg-card)', 
        borderColor: 'var(--border-subtle)',
        boxShadow: 'var(--shadow-sm)'
      }}>
      <div className="aspect-[16/9] overflow-hidden relative" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
        <Image
          src={imageUrl}
          alt={project.project_title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {project.project_category && (
          <span className="absolute backdrop-blur-sm border border-white/20" 
            style={{ 
              top: 'var(--space-4)', 
              left: 'var(--space-4)', 
              backgroundColor: 'rgba(255, 255, 255, 0.9)', 
              paddingLeft: 'var(--space-3)', 
              paddingRight: 'var(--space-3)', 
              paddingTop: 'var(--space-1)', 
              paddingBottom: 'var(--space-1)',
              borderRadius: 'var(--radius-3xl)',
              fontSize: 'var(--text-xs)',
              fontWeight: 'var(--font-semibold)',
              color: 'var(--neutral-700)'
            }}>
            {project.project_category}
          </span>
        )}
      </div>
      <div style={{ padding: 'var(--space-6)' }}>
        <ProjectTagline>{project.project_tagline}</ProjectTagline>
        <ProjectTitle>{project.project_title}</ProjectTitle>
        <div className="flex items-center justify-between" style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
          <span>{project.project_client}</span>
          <span>{project.project_date}</span>
        </div>
      </div>
    </Link>
  );
};
