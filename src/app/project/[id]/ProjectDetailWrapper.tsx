import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import ProjectDetailClient from './ProjectDetailClient';
import ProjectNeuralPresentation from '@/components/molecules/ProjectNeuralPresentation';
import type { ProjectCCT } from '@/types/project';
import { Eye } from 'lucide-react';

interface ProjectDetailWrapperProps {
  project: ProjectCCT;
  id: string;
}

export default function ProjectDetailWrapper({ project, id }: ProjectDetailWrapperProps) {
  const { t } = useLanguage();
  const [isPresenting, setIsPresenting] = useState(false);
  
  // Normalize title for key mapping
  const keyBase = project.project_title.toLowerCase().replace(/[^a-z0-9]/g, '_');
  
  const translatedTitle = t(`${keyBase}_title`, 'projects_data') !== `${keyBase}_title` 
    ? t(`${keyBase}_title`, 'projects_data') 
    : project.project_title;
    
  const translatedTagline = t(`${keyBase}_tagline`, 'projects_data') !== `${keyBase}_tagline` 
    ? t(`${keyBase}_tagline`, 'projects_data') 
    : (project.project_tagline || 'PROJECT_SEQUENCE');
    
  const translatedContent = t(`${keyBase}_desc`, 'projects_data') !== `${keyBase}_desc` 
    ? t(`${keyBase}_desc`, 'projects_data') 
    : project.project_content;

  const imageUrl = project.featured_image_url || `https://placehold.co/1200x600?text=${encodeURIComponent(project.project_title)}`;

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <div className="border-b-2 border-black bg-white sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link 
            href="/" 
            className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] hover:text-primary-600 transition-colors"
          >
            <div className="w-6 h-6 border-2 border-black flex items-center justify-center group-hover:border-primary-600 transition-colors">
              <svg className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </div>
            {t('return', 'detail')}
          </Link>
          <div className="flex items-center gap-8 text-[9px] font-black text-silver uppercase tracking-widest hidden md:flex">
            <span className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary-600 rounded-full animate-pulse" /> 
              {t('system_stable', 'detail')}
            </span>
            <span>DATA_STREAM: {id}-X</span>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-20 lg:py-32 focus:outline-none">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Project Header & Main Info */}
          <div className="lg:col-span-8 space-y-16">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                 <div className="h-[2px] w-12 bg-primary-600" />
                 <p className="text-[11px] font-black text-primary-600 uppercase tracking-[0.3em]">{translatedTagline}</p>
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-black tracking-tighter leading-[0.85] uppercase">
                {translatedTitle}
              </h1>
            </div>

            <div className="aspect-[16/10] bg-bone border-2 border-black relative overflow-hidden group shadow-[16px_16px_0px_0px_rgba(0,0,0,0.05)]">
              <Image
                src={imageUrl}
                alt={project.project_title}
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-out scale-[1.01] hover:scale-105"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-end">
                 <span className="text-[10px] text-white font-black tracking-widest uppercase">{t('enhance_vision', 'detail')}</span>
              </div>
            </div>

            <section className="space-y-10">
              <div className="flex items-center gap-4">
                <h2 className="text-[12px] font-black text-black uppercase tracking-[0.4em]">{t('overview', 'detail')}</h2>
                <div className="h-[1px] flex-grow bg-silver/20" />
              </div>
              <div
                className="prose prose-xl max-w-none 
                  prose-p:text-charcoal prose-p:leading-[1.7] prose-p:font-medium prose-p:tracking-tight
                  prose-strong:text-black prose-strong:font-black
                  prose-headings:text-black prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter
                  prose-li:text-charcoal prose-li:font-medium
                  prose-blockquote:border-l-4 prose-blockquote:border-black prose-blockquote:bg-bone prose-blockquote:py-4 prose-blockquote:px-10"
                dangerouslySetInnerHTML={{ __html: translatedContent }}
              />
            </section>

            {project.project_link && (
              <div className="pt-10">
                <a
                  href={project.project_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-6 px-12 py-6 bg-black text-white text-[12px] font-black uppercase tracking-[0.3em] hover:bg-primary-600 transition-all shadow-[12px_12px_0px_0px_rgba(37,99,235,0.2)] active:translate-y-1 active:shadow-none"
                >
                  {t('deploy', 'detail')}
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            )}
          </div>

          {/* Sidebar Metadata */}
          <aside className="lg:col-span-4 space-y-12">
            <div className="bg-bone border-2 border-black p-10 lg:p-12 space-y-12 sticky top-40">
              <div>
                <h3 className="text-[10px] font-black text-black uppercase tracking-[0.3em] mb-10 pb-4 border-b border-black/10">{t('intel', 'detail')}</h3>
                <dl className="space-y-10">
                  <div>
                    <dt className="text-[9px] font-black text-silver uppercase tracking-[0.2em] mb-2">{t('ident_client', 'detail')}</dt>
                    <dd className="text-xl font-black text-black tracking-tight uppercase">{project.project_client}</dd>
                  </div>
                  <div>
                    <dt className="text-[9px] font-black text-silver uppercase tracking-[0.2em] mb-2">{t('sector_cat', 'detail')}</dt>
                    <dd className="text-xl font-black text-black tracking-tight uppercase">{project.project_category}</dd>
                  </div>
                  <div>
                    <dt className="text-[9px] font-black text-silver uppercase tracking-[0.2em] mb-2">{t('mech_type', 'detail')}</dt>
                    <dd className="text-xl font-black text-black tracking-tight uppercase">{project.project_type}</dd>
                  </div>
                  <div>
                    <dt className="text-[9px] font-black text-silver uppercase tracking-[0.2em] mb-2">{t('tx_timestamp', 'detail')}</dt>
                    <dd className="text-xl font-black text-black tracking-tight uppercase">{project.project_date}</dd>
                  </div>
                </dl>
              </div>

              {/* Neural Intelligence Expansion [BIG UPGRADE] */}
              {(project.ai_tech_stack || project.ai_architecture || project.ai_market_intel) && (
                <div className="pt-10 border-t-2 border-black space-y-10">
                   <h3 className="text-[10px] font-black text-primary-600 uppercase tracking-[0.4em] flex items-center gap-2">
                     <div className="w-2 h-2 bg-primary-600 rounded-full animate-pulse" />
                     {t('neural_intel', 'detail')}
                   </h3>
                   
                   {project.ai_tech_stack && (
                     <div className="space-y-4">
                       <dt className="text-[9px] font-black text-silver uppercase tracking-[0.2em]">{t('stack_intelligence', 'detail')}</dt>
                       <div className="flex flex-wrap gap-2">
                         {project.ai_tech_stack.map((tech, i) => (
                           <span key={i} className="px-3 py-1 bg-black text-white text-[9px] font-black uppercase tracking-widest">{tech}</span>
                         ))}
                       </div>
                     </div>
                   )}

                   {project.ai_architecture && (
                     <div className="space-y-4">
                       <dt className="text-[9px] font-black text-silver uppercase tracking-[0.2em]">{t('arch_neural_map', 'detail')}</dt>
                       <dd className="text-sm font-bold text-black border-l-2 border-black pl-4 py-1 uppercase leading-tight">{project.ai_architecture}</dd>
                     </div>
                   )}

                   {project.ai_market_intel && (
                     <div className="space-y-4">
                       <dt className="text-[9px] font-black text-silver uppercase tracking-[0.2em]">{t('market_potential', 'detail')}</dt>
                       <dd className="text-xs font-medium text-charcoal bg-black/5 p-4 border border-black/10 uppercase tracking-tighter leading-relaxed">{project.ai_market_intel}</dd>
                     </div>
                   )}
                </div>
              )}

              <div className="pt-10 border-t border-black/10 space-y-6">
                <div className="p-6 bg-white border border-silver/30 flex items-center justify-between group cursor-help">
                  <span className="text-[10px] font-black tracking-widest uppercase">{t('encryption', 'detail')}</span>
                  <div className="flex gap-1">
                    {[1,2,3,4].map(i => <div key={i} className="w-1 h-3 bg-black/10 group-hover:bg-primary-600 transition-colors" />)}
                  </div>
                </div>
                <p className="text-[9px] font-bold text-silver uppercase leading-relaxed tracking-wider">
                  {t('verification_note', 'detail')}
                </p>
              </div>
            </div>
          </aside>
        </div>
        <ProjectDetailClient project={project} />
      </main>

      {/* Presentation Mode Button */}
      {(project.ai_tech_stack) && (
        <ProjectNeuralPresentation 
          project={project} 
          isOpen={isPresenting} 
          onClose={() => setIsPresenting(false)} 
        />
      )}

      {!isPresenting && project.ai_tech_stack && (
        <button 
          onClick={() => setIsPresenting(true)}
          className="fixed bottom-32 right-10 z-50 px-6 py-3 bg-primary-600 text-white font-black uppercase text-[10px] tracking-widest shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center gap-3 border-2 border-black"
        >
          <Eye className="w-4 h-4" />
          {t('view_presentation', 'detail')}
        </button>
      )}
    </div>
  );
}
