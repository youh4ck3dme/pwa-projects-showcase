'use client';

import { fetchProjects } from '@/api/projects';
import ProjectsClient from './ProjectsClient';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useState, useEffect } from 'react';

export default function ProjectsPage() {
  const { t } = useLanguage();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchProjects()
      .then(data => {
        setProjects(data || []);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container-tight pt-32 pb-24 text-center">
        <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <span className="label-system text-[10px] tracking-[0.3em]">INITIALIZING SYSTEM...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center pt-40">
        <h2 className="text-2xl font-bold text-red-600 uppercase">{t('error_loading', 'home')}</h2>
        <p className="text-charcoal mt-2 uppercase tracking-tighter font-medium">{t('error_desc', 'home')}</p>
      </div>
    );
  }

  return (
    <div className="container-full">
      <div className="border-b border-black px-6 lg:px-10 py-12 lg:py-24 bg-white relative overflow-hidden">
        {/* Abstract background element for depth */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-bone skew-x-12 translate-x-1/2 opacity-50 -z-10" />
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mb-6 lg:mb-8"
        >
           <div className="w-2 h-2 bg-primary-600 rounded-full animate-pulse" />
           <span className="label-system text-[10px] tracking-[0.3em] font-black">{t('label', 'home')}</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-5xl uppercase"
          dangerouslySetInnerHTML={{ __html: t('heading', 'home') }}
        />
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-8 lg:mt-12 text-lg lg:text-xl font-medium text-charcoal max-w-xl leading-snug uppercase tracking-tighter opacity-70"
        >
          {t('description', 'home')}
        </motion.p>
      </div>

      <ProjectsClient initialProjects={projects} />
    </div>
  );
}
