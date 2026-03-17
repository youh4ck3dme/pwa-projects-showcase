'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectCard } from '@/components/molecules/ProjectCard';
import { SearchAssistant } from '@/components/ai/SearchAssistant';
import { MarketAnalyzer } from '@/components/ai/MarketAnalyzer';
import type { ProjectCCT } from '@/types/project';
import type { ProjectData } from '@/lib/api';
import { Activity, Database, Server, Cpu } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface ProjectsClientProps {
  initialProjects: ProjectCCT[];
}

export default function ProjectsClient({ initialProjects }: ProjectsClientProps) {
  const { t } = useLanguage();
  const [projects, setProjects] = useState<ProjectCCT[]>(initialProjects);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [isLoading, setIsLoading] = useState(false);
  const [tickerIndex, setTickerIndex] = useState(0);

  const categories = ['ALL', ...Array.from(new Set(initialProjects.map(p => p.project_category).filter(Boolean)))];

  const tickers = [
    t('connected', 'tickers'),
    t('active', 'tickers'),
    t('analysis', 'tickers'),
    t('data_lock', 'tickers'),
    t('filter', 'tickers')
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % tickers.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [tickers.length]);

  const mapToProjectCCT = (data: ProjectData[]): ProjectCCT[] => {
    return data.map(p => {
      // Normalize title for key mapping (e.g., "V4-Finstat" -> "v4_finstat")
      const keyBase = p.title.toLowerCase().replace(/[^a-z0-9]/g, '_');
      
      return {
        id: parseInt(p.id.replace('project-', '')) || Math.floor(Math.random() * 10000),
        api_id: parseInt(p.id.replace('project-', '')) || 0,
        project_title: t(`${keyBase}_title`, 'projects_data') !== `${keyBase}_title` ? t(`${keyBase}_title`, 'projects_data') : p.title,
        project_tagline: t(`${keyBase}_tagline`, 'projects_data') !== `${keyBase}_tagline` ? t(`${keyBase}_tagline`, 'projects_data') : p.category,
        project_desc: t(`${keyBase}_desc`, 'projects_data') !== `${keyBase}_desc` ? t(`${keyBase}_desc`, 'projects_data') : p.description,
        project_content: t(`${keyBase}_desc`, 'projects_data') !== `${keyBase}_desc` ? t(`${keyBase}_desc`, 'projects_data') : p.description,
        project_type: p.type,
        project_category: p.category,
        project_client: 'N/A',
        project_date: p.createdAt,
        project_link: p.id,
        project_img_id: 0,
        project_gal_id: '',
        featured_image_url: `https://placehold.co/600x400?text=${encodeURIComponent(p.title)}`
      };
    });
  };

  const handleSearchResults = (results: ProjectData[]) => {
    if (results.length > 0) {
      setProjects(mapToProjectCCT(results));
    } else {
      setProjects([]);
    }
  };

  const filteredProjects = activeCategory === 'ALL' 
    ? projects 
    : projects.filter(p => p.project_category === activeCategory);

  return (
    <div className="flex flex-col lg:flex-row gap-0 border-t-2 border-black min-h-screen bg-white">
      {/* Sidebar: Categories & Market Analyzer */}
      <aside className="lg:w-80 border-r-2 border-black order-2 lg:order-none flex flex-col bg-white">
        <div className="p-8 lg:p-10 space-y-12 flex-grow overflow-y-auto lg:sticky lg:top-20 lg:h-[calc(100vh-80px)]">
          <div className="space-y-8">
            <h4 className="label-system text-[10px] font-black underline underline-offset-8 decoration-primary-600">{t('categories', 'repository')}</h4>
            <nav className="flex flex-col items-start gap-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[11px] font-black tracking-[0.2em] uppercase transition-all text-left w-full px-5 py-4 border-l-4 ${
                    activeCategory === cat 
                      ? 'bg-black text-white border-primary-600' 
                      : 'text-charcoal border-transparent hover:border-silver hover:bg-bone'
                  }`}
                >
                  {cat === 'ALL' ? t('all', 'repository') : cat}
                </button>
              ))}
            </nav>
          </div>

          <div className="pt-12 border-t border-silver/50">
            <MarketAnalyzer onAnalysisComplete={(analysis) => console.log('Market Analysis:', analysis)} />
          </div>
          
          {/* Live Activity Ticker - Integrated into sidebar scroll flow */}
          <div className="bg-black text-white p-6 border border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center gap-3 mb-4">
              <Activity className="w-3 h-3 text-primary-600 animate-pulse" />
              <span className="label-system text-[9px] text-silver font-black">{t('live_feed', 'repository')}</span>
            </div>
            <motion.p 
              key={tickerIndex}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[10px] font-black tracking-widest uppercase truncate font-mono"
            >
              {tickers[tickerIndex]}
            </motion.p>
          </div>
        </div>
      </aside>

      {/* Main Content: Search & Grid */}
      <div className="flex-grow flex flex-col order-1 lg:order-none">
        <div className="border-b-2 border-black p-8 lg:p-10 bg-bone sticky top-20 z-20">
          <SearchAssistant 
            onSearchResults={handleSearchResults}
            onLoading={setIsLoading}
          />
        </div>

        <div className="flex-grow flex flex-col">
          <div className="p-0 border-b-2 border-black bg-white sticky top-[calc(20px+120px)] lg:top-20 z-10">
            <div className="p-8 lg:p-10 flex items-center justify-between">
              <div className="space-y-3">
                <h2 className="text-base font-black tracking-[0.25em] uppercase flex items-center gap-3">
                  <Database className="w-4 h-4 text-primary-600" />
                  {isLoading ? t('syncing', 'repository') : t('results', 'repository')}
                </h2>
                <div className="flex items-center gap-6 text-[10px] font-black text-silver">
                   <span className="flex items-center gap-1.5"><Server className="w-3 h-3" /> {t('buffer', 'repository')}: RM-8829-X</span>
                   <span className="flex items-center gap-1.5"><Cpu className="w-3 h-3" /> {t('engine', 'repository')}: LARSEN_SY_PRO</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-5xl font-black tracking-tighter leading-none block">{filteredProjects.length}</span>
                <span className="label-system text-[9px] block mt-1 tracking-widest">{t('sector_total', 'repository')}</span>
              </div>
            </div>
            
            {/* Visual Progress/Indicator */}
            <div className="h-[2px] bg-bone w-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(filteredProjects.length / initialProjects.length) * 100}%` }}
                className="h-full bg-primary-600 shadow-[0_0_8px_rgba(37,99,235,0.5)]"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-0 flex-grow bg-silver/10">
            <AnimatePresence mode="popLayout">
              {filteredProjects?.map((project, idx) => (
                <motion.div 
                  key={project.id} 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ 
                    duration: 0.4,
                    delay: idx * 0.03,
                    ease: [0.23, 1, 0.32, 1]
                  }}
                  className="border-r border-b border-silver last:border-r-0 bg-white"
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </AnimatePresence>
            
            {filteredProjects.length === 0 && (
              <div className="col-span-full flex items-center justify-center min-h-[600px] bg-bone border-b border-silver">
                <div className="text-center p-12 max-w-md">
                  <div className="w-24 h-24 bg-white border-2 border-black mx-auto mb-8 flex items-center justify-center grayscale shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)]">
                    <Database className="w-10 h-10 text-charcoal" />
                  </div>
                  <h3 className="text-2xl font-black tracking-tighter uppercase mb-4">{t('no_results', 'repository')}</h3>
                  <p className="label-system text-silver italic font-bold mb-10 leading-relaxed">
                    {t('no_results_desc', 'repository').replace('{category}', activeCategory)}
                  </p>
                  <button 
                    onClick={() => setActiveCategory('ALL')}
                    className="w-full py-5 bg-black text-white text-[11px] font-black tracking-[0.3em] uppercase hover:bg-primary-600 transition-all shadow-[8px_8px_0px_0px_rgba(37,99,235,0.2)] active:translate-y-1 active:shadow-none"
                  >
                    {t('reset', 'repository')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
