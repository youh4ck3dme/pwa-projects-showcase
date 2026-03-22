'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import ProjectDetailClient from './ProjectDetailClient';
import ProjectNeuralPresentation from '@/components/molecules/ProjectNeuralPresentation';
import type { ProjectCCT } from '@/types/project';
import { Eye } from 'lucide-react';
import { motion } from 'framer-motion';

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
    
  const translatedContent = t(`${keyBase}_content`, 'projects_data') !== `${keyBase}_content` 
    ? t(`${keyBase}_content`, 'projects_data') 
    : project.project_content;

  const imageUrl = project.featured_image_url || `https://placehold.co/1200x600?text=${encodeURIComponent(project.project_title)}`;

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <div className="border-b border-black bg-white/80 backdrop-blur-md sticky top-20 z-30">
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
            <span>DATA_STREAM: {id}-NODE</span>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-12 lg:py-32 focus:outline-none">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          {/* Project Header & Main Info */}
          <div className="lg:col-span-8 space-y-12 lg:space-y-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 lg:space-y-8"
            >
              <div className="flex items-center gap-4">
                 <div className="h-[2px] w-12 bg-primary-600" />
                 <p className="text-[11px] font-black text-primary-600 uppercase tracking-[0.3em]">{translatedTagline}</p>
              </div>
              <h1 className="text-black uppercase">
                {translatedTitle}
              </h1>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="aspect-[16/10] glass relative overflow-hidden group shadow-2xl"
            >
              <Image
                src={imageUrl}
                alt={project.project_title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                priority
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
            </motion.div>

            <motion.section 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-10"
            >
              <div className="flex items-center gap-4">
                <h2 className="text-[12px] font-black text-black uppercase tracking-[0.4em]">{t('overview', 'detail')}</h2>
                <div className="h-[1px] flex-grow bg-silver/20" />
              </div>
              <div
                className="prose prose-xl max-w-none 
                  prose-p:text-charcoal prose-p:leading-relaxed prose-p:font-medium
                  prose-strong:text-black prose-strong:font-black
                  prose-headings:text-black prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter
                  prose-li:text-charcoal prose-li:font-medium"
                dangerouslySetInnerHTML={{ __html: translatedContent }}
              />
            </motion.section>

            {project.project_link && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="pt-6 lg:pt-10"
              >
                <a
                  href={project.project_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-6 px-10 lg:px-12 py-5 lg:py-6 bg-black text-white text-[12px] font-black uppercase tracking-[0.3em] hover:bg-primary-600 transition-all shadow-[12px_12px_0px_0px_rgba(37,99,235,0.15)]"
                >
                  {t('deploy', 'detail')}
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </motion.div>
            )}
          </div>

          {/* Sidebar Metadata */}
          <aside className="lg:col-span-4 space-y-12">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass p-8 lg:p-10 space-y-12 sticky top-44"
            >
              <div>
                <h3 className="text-[10px] font-black text-black uppercase tracking-[0.3em] mb-10 pb-4 border-b border-black/5">{t('intel', 'detail')}</h3>
                <dl className="space-y-6">
                  <div className="flex justify-between items-end border-b border-black/5 pb-2">
                    <dt className="text-[8px] font-black text-silver uppercase tracking-[0.2em]">{t('ident_client', 'detail')}</dt>
                    <dd className="text-xs font-black text-black uppercase tracking-tight">{project.project_client}</dd>
                  </div>
                  <div className="flex justify-between items-end border-b border-black/5 pb-2">
                    <dt className="text-[8px] font-black text-silver uppercase tracking-[0.2em]">{t('sector_cat', 'detail')}</dt>
                    <dd className="text-xs font-black text-black uppercase tracking-tight">{project.project_category}</dd>
                  </div>
                  <div className="flex justify-between items-end border-b border-black/5 pb-2">
                    <dt className="text-[8px] font-black text-silver uppercase tracking-[0.2em]">{t('budget', 'detail')}</dt>
                    <dd className="text-xs font-black text-black uppercase tracking-tight">
                      {t(`${keyBase}_budget`, 'projects_data') !== `${keyBase}_budget` 
                        ? t(`${keyBase}_budget`, 'projects_data') 
                        : project.suggested_budget}
                    </dd>
                  </div>
                  <div className="flex justify-between items-end border-b border-black/5 pb-2">
                    <dt className="text-[8px] font-black text-silver uppercase tracking-[0.2em]">{t('timeline', 'detail')}</dt>
                    <dd className="text-xs font-black text-black uppercase tracking-tight">
                      {t(`${keyBase}_timeline`, 'projects_data') !== `${keyBase}_timeline` 
                        ? t(`${keyBase}_timeline`, 'projects_data') 
                        : project.suggested_timeline}
                    </dd>
                  </div>
                  <div className="flex justify-between items-end border-b border-black/5 pb-10">
                    <dt className="text-[8px] font-black text-silver uppercase tracking-[0.2em]">{t('tx_timestamp', 'detail')}</dt>
                    <dd className="text-xs font-black text-black uppercase tracking-tight">{project.project_date}</dd>
                  </div>
                </dl>
              </div>

              {/* Neural Intelligence Expansion */}
              {(project.neural_meta || project.ai_tech_stack) && (
                <div className="pt-8 border-t border-black/5 space-y-8">
                   <h3 className="text-[9px] font-black text-primary-600 uppercase tracking-[0.3em] flex items-center gap-2">
                     <div className="w-1.5 h-1.5 bg-primary-600 rounded-full" />
                     MECHANICAL_CORE
                   </h3>
                   
                   {(project.neural_meta?.tech_stack || project.ai_tech_stack) && (
                     <div className="space-y-4">
                       <dt className="text-[8px] font-black text-silver uppercase tracking-[0.2em]">{t('stack_intelligence', 'detail')}</dt>
                       <div className="flex flex-wrap gap-1.5">
                         {(project.neural_meta?.tech_stack || project.ai_tech_stack || []).map((tech: string, i: number) => (
                           <span key={i} className="px-2 py-0.5 bg-black text-white text-[8px] font-black uppercase tracking-widest">
                             {t(`${keyBase}_tech_${i}`, 'projects_data') !== `${keyBase}_tech_${i}` 
                               ? t(`${keyBase}_tech_${i}`, 'projects_data') 
                               : tech}
                           </span>
                         ))}
                       </div>
                     </div>
                   )}

                   {(project.neural_meta?.architecture || project.ai_architecture) && (
                     <div className="space-y-3">
                       <dt className="text-[8px] font-black text-silver uppercase tracking-[0.2em]">{t('arch_neural_map', 'detail')}</dt>
                       <dd className="text-[11px] font-bold text-black border-l-2 border-primary-600 pl-3 py-0.5 uppercase leading-tight">
                         {t(`${keyBase}_architecture`, 'projects_data') !== `${keyBase}_architecture` 
                           ? t(`${keyBase}_architecture`, 'projects_data') 
                           : (project.neural_meta?.architecture || project.ai_architecture)}
                       </dd>
                     </div>
                   )}

                   {(project.neural_meta?.market_intel || project.ai_market_intel) && (
                     <div className="space-y-3">
                       <dt className="text-[8px] font-black text-silver uppercase tracking-[0.2em]">{t('market_intel', 'detail')}</dt>
                       <dd className="text-[11px] font-bold text-black border-l-2 border-primary-600 pl-3 py-0.5 uppercase leading-tight">
                         {t(`${keyBase}_market_intel`, 'projects_data') !== `${keyBase}_market_intel` 
                           ? t(`${keyBase}_market_intel`, 'projects_data') 
                           : (project.neural_meta?.market_intel || project.ai_market_intel)}
                       </dd>
                     </div>
                   )}

                   {(project.neural_meta?.arch_analysis || project.ai_arch_analysis) && (
                     <div className="space-y-3">
                       <dt className="text-[8px] font-black text-silver uppercase tracking-[0.2em]">{t('arch_analysis', 'detail')}</dt>
                       <dd className="text-[11px] font-bold text-black border-l-2 border-primary-600 pl-3 py-0.5 uppercase leading-tight">
                         {t(`${keyBase}_arch_analysis`, 'projects_data') !== `${keyBase}_arch_analysis` 
                           ? t(`${keyBase}_arch_analysis`, 'projects_data') 
                           : (project.neural_meta?.arch_analysis || project.ai_arch_analysis)}
                       </dd>
                     </div>
                   )}

                   {(project.neural_meta?.security_audit || project.ai_security_audit) && (
                     <div className="space-y-3">
                       <dt className="text-[8px] font-black text-silver uppercase tracking-[0.2em]">{t('security_audit', 'detail')}</dt>
                       <dd className="text-[11px] font-bold text-black border-l-2 border-primary-600 pl-3 py-0.5 uppercase leading-tight">
                         {t(`${keyBase}_security_audit`, 'projects_data') !== `${keyBase}_security_audit` 
                           ? t(`${keyBase}_security_audit`, 'projects_data') 
                           : (project.neural_meta?.security_audit || project.ai_security_audit)}
                       </dd>
                     </div>
                   )}
                </div>
              )}

              <div className="pt-10 border-t border-black/5 space-y-6">
                <div className="p-5 bg-white/5 border border-white/10 flex items-center justify-between group cursor-help">
                  <span className="text-[10px] font-black tracking-widest uppercase">{t('encryption', 'detail')}</span>
                  <div className="flex gap-1">
                    {[1,2,3,4].map((i) => <div key={i} className="w-1 h-3 bg-primary-600/20 group-hover:bg-primary-600 transition-colors" />)}
                  </div>
                </div>
              </div>
            </motion.div>
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
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsPresenting(true)}
          className="fixed bottom-10 right-6 lg:bottom-20 lg:right-10 z-50 px-6 py-4 glass text-black font-black uppercase text-[10px] tracking-widest flex items-center gap-3 border-black shadow-xl"
        >
          <Eye className="w-4 h-4 text-primary-600" />
          {t('view_presentation', 'detail')}
        </motion.button>
      )}
    </div>
  );
}
