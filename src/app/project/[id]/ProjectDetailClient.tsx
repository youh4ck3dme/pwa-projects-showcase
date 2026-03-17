'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, X, Activity, FileText, Globe } from 'lucide-react';
import type { ProjectCCT } from '@/types/project';
import { RevenueOptimizer } from '@/components/ai/RevenueOptimizer';
import { useLanguage } from '@/context/LanguageContext';

interface ProjectDetailClientProps {
  project: ProjectCCT;
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const { t, language } = useLanguage();
  const [showAI, setShowAI] = useState(false);
  const [showDocs, setShowDocs] = useState(false);

  // Check if documentation exists for this project
  const hasDocumentation = project.project_title.toLowerCase().includes('neon bloom');

  return (
    <div className="relative">
      {/* Floating Documentation Button */}
      {hasDocumentation && (
        <motion.button
          initial={{ scale: 0, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowDocs(!showDocs)}
          className="fixed bottom-10 right-24 z-50 w-16 h-16 bg-white text-black rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] flex items-center justify-center group overflow-hidden border-2 border-black hover:bg-black hover:text-white transition-colors"
        >
          <FileText className={`w-6 h-6 transition-transform duration-500 ${showDocs ? 'rotate-180 scale-125' : 'group-hover:scale-110'}`} />
          <div className="absolute inset-0 bg-black/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </motion.button>
      )}

      {/* Floating AI Action Button */}
      <motion.button
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowAI(!showAI)}
        className="fixed bottom-10 right-10 z-50 w-16 h-16 bg-black text-white rounded-none shadow-[8px_8px_0px_0px_rgba(37,99,235,0.5)] flex items-center justify-center group overflow-hidden border-2 border-black hover:bg-primary-600 transition-colors"
      >
        <Zap className={`w-6 h-6 transition-transform duration-500 ${showAI ? 'rotate-180 scale-125 text-white' : 'group-hover:scale-110'}`} />
        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
      </motion.button>

      {/* Documentation Panel Overlay */}
      <AnimatePresence>
        {showDocs && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDocs(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-md"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 w-full max-w-2xl h-screen z-50 bg-white border-r-4 border-black shadow-[20px_0_40px_rgba(0,0,0,0.1)] flex flex-col"
            >
              <div className="p-8 lg:p-12 border-b-2 border-black flex justify-between items-center bg-bone">
                <div className="space-y-1">
                  <h4 className="label-system text-[10px] text-primary-600 font-black tracking-[0.3em]">PROJECT DOCUMENTATION</h4>
                  <h2 className="text-2xl font-black tracking-tighter uppercase">{project.project_title}</h2>
                  <p className="text-[12px] text-silver font-medium uppercase">{t('documentation', 'detail')}</p>
                </div>
                <button 
                  onClick={() => setShowDocs(false)}
                  className="w-12 h-12 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all transform hover:rotate-90"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-8 lg:p-12">
                <div className="max-w-xl mx-auto space-y-8">
                  {/* Language Selector */}
                  <div className="flex items-center gap-4 border-b-2 border-silver pb-4">
                    <Globe className="w-5 h-5 text-primary-600" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-silver">LANGUAGE</span>
                    <div className="flex gap-2">
                      {['sk', 'en', 'de', 'fr', 'es'].map((lang) => (
                        <button
                          key={lang}
                          onClick={() => {}}
                          className={`px-3 py-1 text-[10px] font-black uppercase border-2 border-black ${
                            language.toLowerCase() === lang ? 'bg-black text-white' : 'bg-white text-black'
                          } hover:bg-primary-600 hover:text-white transition-colors`}
                        >
                          {lang.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Documentation Content */}
                  <div className="prose prose-sm max-w-none">
                    <div className="p-6 bg-silver/20 rounded-lg border-2 border-silver">
                      <h3 className="text-lg font-black mb-4">README {language.toUpperCase()}</h3>
                      <p className="text-sm text-charcoal">
                        Documentation for {project.project_title} is available in multiple languages.
                        Select your preferred language above to view the complete project documentation.
                      </p>
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase">
                          <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
                          <span>Available Languages:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {['SK', 'EN', 'DE', 'FR', 'ES'].map((lang) => (
                            <span key={lang} className="px-2 py-1 bg-black text-white text-[9px] font-black">
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 lg:p-12 border-t-2 border-black bg-white flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className="w-2 h-2 bg-primary-600 rounded-full animate-pulse" />
                   <span className="text-[10px] font-black uppercase tracking-widest text-silver">DOCUMENTATION_READY</span>
                </div>
                <div className="text-[9px] font-black uppercase tracking-widest opacity-30">
                  NEON_BLOOM_DOCS_v1.0
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* AI Panel Overlay */}
      <AnimatePresence>
        {showAI && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAI(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-md"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-full max-w-2xl h-screen z-50 bg-white border-l-4 border-black shadow-[-20px_0_40px_rgba(0,0,0,0.1)] flex flex-col"
            >
              <div className="p-8 lg:p-12 border-b-2 border-black flex justify-between items-center bg-bone">
                <div className="space-y-1">
                  <h4 className="label-system text-[10px] text-primary-600 font-black tracking-[0.3em]">{t('ai_assistant', 'ai_tools')}</h4>
                  <h2 className="text-2xl font-black tracking-tighter uppercase">{t('revenue_optimizer_title', 'ai_tools')}</h2>
                </div>
                <button 
                  onClick={() => setShowAI(false)}
                  className="w-12 h-12 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all transform hover:rotate-90"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-8 lg:p-12">
                <div className="max-w-xl mx-auto space-y-12">
                   <div className="p-8 bg-black text-white space-y-4">
                      <div className="flex items-center gap-3">
                         <Activity className="w-4 h-4 text-primary-600" />
                         <span className="label-system text-[9px] text-silver font-black">{t('active_analysis', 'ai_tools')} / {project.project_title.toUpperCase()}</span>
                      </div>
                      <p className="text-[13px] font-medium leading-relaxed uppercase tracking-tight opacity-80">
                         {t('mapping_msg', 'ai_tools')}
                      </p>
                   </div>

                   <RevenueOptimizer 
                    projects={[project]} 
                    onOptimizationComplete={(opt) => console.log('Optimization Complete:', opt)} 
                  />
                </div>
              </div>

              <div className="p-8 lg:p-12 border-t-2 border-black bg-white flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className="w-2 h-2 bg-primary-600 rounded-full animate-pulse" />
                   <span className="text-[10px] font-black uppercase tracking-widest text-silver">{t('core_sync_ready', 'ai_tools')}</span>
                </div>
                <div className="text-[9px] font-black uppercase tracking-widest opacity-30">
                  LARSEN_SYNTH_PRO_v5.2
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
