'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectCard } from '@/components/molecules/ProjectCard';
import { SearchAssistant } from '@/components/ai/SearchAssistant';
import { MarketAnalyzer } from '@/components/ai/MarketAnalyzer';
import type { ProjectCCT } from '@/types/project';
import type { ProjectData } from '@/lib/api';
import { Activity, Database, Server, Cpu } from 'lucide-react';

interface ProjectsClientProps {
  initialProjects: ProjectCCT[];
}

export default function ProjectsClient({ initialProjects }: ProjectsClientProps) {
  const [projects, setProjects] = useState<ProjectCCT[]>(initialProjects);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [isLoading, setIsLoading] = useState(false);
  const [tickerIndex, setTickerIndex] = useState(0);

  const categories = ['ALL', ...Array.from(new Set(initialProjects.map(p => p.project_category).filter(Boolean)))];

  const tickers = [
    'GEMINI_PRO_SYNAPSE_CONNECTED',
    'BUFFER_STREAM_STABLE_v4.2',
    'SECTOR_ANALYSIS_COMPLETE',
    'DATA_SEQUENCES_OPTIMIZED',
    'NEURAL_FILTER_v1.0.4_ACTIVE'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % tickers.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [tickers.length]);

  const mapToProjectCCT = (data: ProjectData[]): ProjectCCT[] => {
    return data.map(p => ({
      id: parseInt(p.id.replace('project-', '')) || Math.floor(Math.random() * 10000),
      api_id: parseInt(p.id.replace('project-', '')) || 0,
      project_title: p.title,
      project_tagline: p.category,
      project_desc: p.description,
      project_content: p.description,
      project_type: p.type,
      project_category: p.category,
      project_client: 'N/A',
      project_date: p.createdAt,
      project_link: p.id,
      project_img_id: 0,
      project_gal_id: '',
      featured_image_url: `https://placehold.co/600x400?text=${encodeURIComponent(p.title)}`
    }));
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
      <aside className="lg:w-80 border-r-2 border-black order-1 lg:order-none flex flex-col">
        <div className="p-8 space-y-12 flex-grow">
          <div className="space-y-6">
            <h4 className="label-system text-[10px] font-black underline underline-offset-8">CATEGORIES / FILTER</h4>
            <nav className="flex flex-col items-start gap-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat || 'ALL')}
                  className={`text-[11px] font-black tracking-[0.15em] uppercase transition-all text-left w-full px-4 py-3 border-l-2 ${
                    activeCategory === cat 
                      ? 'bg-black text-white border-black' 
                      : 'text-charcoal border-transparent hover:border-silver hover:bg-bone'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </nav>
          </div>

          <div className="pt-12 border-t border-silver">
            <MarketAnalyzer onAnalysisComplete={(analysis) => console.log('Market Analysis:', analysis)} />
          </div>
        </div>

        {/* Live Activity Ticker */}
        <div className="bg-black text-white p-6 border-t-2 border-black">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-3 h-3 text-primary-600 animate-pulse" />
            <span className="label-system text-[9px] text-silver">LIVE_FEED</span>
          </div>
          <motion.p 
            key={tickerIndex}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-[10px] font-black tracking-widest uppercase truncate"
          >
            {tickers[tickerIndex]}
          </motion.p>
        </div>
      </aside>

      {/* Main Content: Search & Grid */}
      <div className="flex-grow flex flex-col">
        <div className="border-b-2 border-black p-8 bg-bone">
          <SearchAssistant 
            onSearchResults={handleSearchResults}
            onLoading={setIsLoading}
          />
        </div>

        <div className="flex-grow flex flex-col">
          <div className="p-0 border-b-2 border-black bg-white sticky top-20 z-10">
            <div className="p-8 flex items-center justify-between">
              <div className="space-y-2">
                <h2 className="text-sm font-black tracking-[0.2em] uppercase flex items-center gap-3">
                  <Database className="w-4 h-4" />
                  {isLoading ? 'SYNCING DATA...' : `RESULTS / INDEX v4.0`}
                </h2>
                <div className="flex items-center gap-4 text-[9px] font-black text-silver">
                   <span className="flex items-center gap-1"><Server className="w-3 h-3" /> BUFFER_ID: 8829-X</span>
                   <span className="flex items-center gap-1"><Cpu className="w-3 h-3" /> ENGINE: GEMINI_1.5</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-4xl font-black tracking-tighter leading-none">{filteredProjects.length}</span>
                <span className="label-system text-[8px] block">DATAPREFIXED_SECTOR</span>
              </div>
            </div>
            
            {/* Visual Progress/Indicator */}
            <div className="h-1 bg-bone w-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(filteredProjects.length / initialProjects.length) * 100}%` }}
                className="h-full bg-black"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 flex-grow bg-silver/10">
            <AnimatePresence mode="popLayout">
              {filteredProjects?.map((project, idx) => (
                <motion.div 
                  key={project.id} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="border-r border-b border-silver last:border-r-0 bg-white"
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {!isLoading && filteredProjects?.length === 0 && (
            <div className="flex-grow flex items-center justify-center min-h-[500px] bg-bone border-b border-silver">
              <div className="text-center">
                <div className="w-16 h-16 bg-white border border-silver mx-auto mb-6 flex items-center justify-center grayscale opacity-50">
                  <Database className="w-8 h-8 text-silver" />
                </div>
                <p className="label-system text-silver italic font-bold mb-8">NO DATA SEQUENCES FOUND IN BUFFER.</p>
                <button 
                  onClick={() => setActiveCategory('ALL')}
                  className="px-8 py-4 bg-black text-white text-[10px] font-black tracking-[0.2em] uppercase hover:bg-primary-600 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                  RESET_BUFFER_PARAMETERS
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
