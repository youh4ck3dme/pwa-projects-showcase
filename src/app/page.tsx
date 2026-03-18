'use client';

import { fetchProjects } from '@/api/projects';
import ProjectsClient from './ProjectsClient';
import { motion } from 'framer-motion';
import { SearchAssistant } from '@/components/ai/SearchAssistant';
import { MarketAnalyzer } from '@/components/ai/MarketAnalyzer';
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
    <div className="container-tight pt-32 pb-24">
      <div className="border-b border-black pb-16">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mb-8"
        >
           <div className="w-2 h-2 bg-primary-600 rounded-full animate-pulse" />
           <span className="label-system text-[10px] tracking-[0.3em]">{t('label', 'home')}</span>
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-7xl font-black tracking-tighter max-w-5xl leading-[0.85] uppercase"
          dangerouslySetInnerHTML={{ __html: t('heading', 'home') }}
        />
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-12 text-xl font-medium text-charcoal max-w-xl leading-snug uppercase tracking-tighter"
        >
          {t('description', 'home')}
        </motion.p>
      </div>

      <SearchAssistant />
      <div className="grid grid-cols-4 gap-8">
        <div className="col-span-3">
          <ProjectsClient initialProjects={projects} />
        </div>
        <div className="col-span-1">
          <MarketAnalyzer />
        </div>
      </div>
    </div>
  );
}
