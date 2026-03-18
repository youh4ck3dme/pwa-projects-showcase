'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Activity, Cpu, Zap, Globe, Shield } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import type { ProjectCCT } from '@/types/project';

interface ProjectNeuralPresentationProps {
  project: ProjectCCT;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectNeuralPresentation({ project, isOpen, onClose }: ProjectNeuralPresentationProps) {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 'intro',
      label: '01 / IDENTITY',
      title: project.project_title,
      tagline: project.project_tagline,
      content: project.project_desc,
      icon: <Activity className="w-8 h-8 text-primary-600" />
    },
    {
      id: 'intel',
      label: '02 / ARCHITECTURE',
      title: t('arch_neural_map', 'detail'),
      content: project.ai_architecture || 'Neural mapping in progress...',
      tech: project.ai_tech_stack || [],
      icon: <Cpu className="w-8 h-8 text-primary-600" />
    },
    {
      id: 'market',
      label: '03 / POTENTIAL',
      title: t('market_potential', 'detail'),
      content: project.ai_market_intel || 'Analyzing market trajectories...',
      icon: <Globe className="w-8 h-8 text-primary-600" />
    },
    {
      id: 'deploy',
      label: '04 / EXECUTION',
      title: 'Deployment Stream',
      status: 'Ready for Deploy',
      budget: project.suggested_budget,
      timeline: project.suggested_timeline,
      icon: <Zap className="w-8 h-8 text-primary-600" />
    },
    {
      id: 'calibrate',
      label: '05 / CALIBRATION',
      title: 'Neural Tuning',
      content: 'Adjust context weights to refine AI prioritization.',
      icon: <Shield className="w-8 h-8 text-primary-600" />
    }
  ];

  const [weights, setWeights] = useState(project.neuralMetadata?.contextWeights || {
    architecture: 50,
    market: 50,
    tech: 50
  });
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [caliberSuccess, setCaliberSuccess] = useState(false);

  const handleCalibrate = async () => {
    setIsCalibrating(true);
    setCaliberSuccess(false);
    try {
      const response = await fetch('/api/neural/calibrate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: project.api_id || project.id,
          contextWeights: weights
        })
      });
      if (response.ok) {
        setCaliberSuccess(true);
        setTimeout(() => setCaliberSuccess(false), 3000);
      }
    } catch (err) {
      console.error('Calibration failed', err);
    } finally {
      setIsCalibrating(false);
    }
  };

  const nextSlide = React.useCallback(() => setCurrentSlide((prev) => (prev + 1) % slides.length), [slides.length]);
  const prevSlide = React.useCallback(() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black text-white flex flex-col font-sans overflow-hidden"
      >
        {/* Header Ticker */}
        <div className="h-16 border-b border-white/20 flex items-center justify-between px-8 bg-black/80 backdrop-blur-md sticky top-0 z-10">
           <div className="flex items-center gap-6">
              <span className="label-system text-[10px] text-primary-400 font-black tracking-[0.3em]">LARSEN_SYNTH_DECK_v2.0</span>
              <div className="h-4 w-[1px] bg-white/20" />
              <span className="text-[10px] font-black uppercase tracking-widest">{project.project_title}</span>
           </div>
           <button 
             onClick={onClose}
             data-testid="close-presentation"
             className="flex items-center gap-3 px-4 py-2 border border-white/20 hover:bg-white hover:text-black transition-all group"
           >
             <span className="text-[9px] font-black uppercase tracking-widest">Terminate Stream</span>
             <X className="w-4 h-4 group-hover:rotate-90 transition-transform" />
           </button>
        </div>

        {/* Slide Content */}
        <div className="flex-grow flex relative">
           <AnimatePresence mode="wait">
              <motion.div 
                key={currentSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                className="flex-grow flex flex-col justify-center p-8 lg:p-32"
              >
                 <div className="max-w-6xl space-y-12">
                    <div className="flex items-center gap-4">
                       {slides[currentSlide].icon}
                       <span className="text-xl font-black tracking-[0.4em] text-primary-400 uppercase">{slides[currentSlide].label}</span>
                    </div>

                    <h2 
                       data-testid="slide-title"
                       className="text-7xl lg:text-[9rem] font-black tracking-tighter leading-[0.8] uppercase text-stroke-white text-transparent lg:text-white"
                    >
                       {slides[currentSlide].title}
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12">
                       <div className="lg:col-span-8">
                          <p className="text-xl lg:text-3xl font-medium leading-[1.4] uppercase tracking-tighter text-silver opacity-90">
                             {slides[currentSlide].content}
                          </p>
                          
                          {slides[currentSlide].tech && (
                            <div className="flex flex-wrap gap-3 mt-12">
                               {slides[currentSlide].tech.map((t, i) => (
                                 <span key={i} className="px-4 py-2 bg-white text-black text-[11px] font-black uppercase tracking-widest">{t}</span>
                               ))}
                            </div>
                          )}
                       </div>
                       
                       <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-white/20 pt-12 lg:pt-0 lg:pl-12 flex flex-col justify-between">
                          <div className="space-y-8">
                             {slides[currentSlide].budget && (
                               <div>
                                 <p className="text-[9px] font-black text-silver uppercase tracking-widest mb-2">Resource Allocation</p>
                                 <p className="text-2xl font-black">{slides[currentSlide].budget}</p>
                               </div>
                             )}
                             {slides[currentSlide].timeline && (
                               <div>
                                 <p className="text-[9px] font-black text-silver uppercase tracking-widest mb-2">Deployment Cycle</p>
                                 <p className="text-2xl font-black">{slides[currentSlide].timeline}</p>
                               </div>
                             )}

                             {currentSlide === 4 && (
                                <div className="space-y-6">
                                   {Object.entries(weights).map(([key, value]) => (
                                     <div key={key} className="space-y-2">
                                        <div className="flex justify-between text-[8px] font-black uppercase text-silver">
                                           <span>{key}_context</span>
                                           <span>{value}%</span>
                                        </div>
                                        <input 
                                          type="range" 
                                          min="0" 
                                          max="100" 
                                          value={value}
                                          onChange={(e) => setWeights({...weights, [key]: parseInt(e.target.value)})}
                                          className="w-full accent-primary-600 bg-white/10 h-1 appearance-none cursor-pointer"
                                        />
                                     </div>
                                   ))}
                                   <button 
                                     onClick={handleCalibrate}
                                     disabled={isCalibrating}
                                     className={`w-full py-4 text-[10px] font-black uppercase tracking-[0.3em] border-2 border-white transition-all ${
                                       caliberSuccess ? 'bg-green-600 border-green-600' : 'bg-transparent hover:bg-white hover:text-black'
                                     }`}
                                   >
                                     {isCalibrating ? 'CALIBRATING...' : caliberSuccess ? 'SYNC_COMPLETE' : 'PUSH_NEURAL_WEIGHTS'}
                                   </button>
                                </div>
                             )}
                          </div>
                          
                          <div className="hidden lg:block">
                             <Shield className={`w-12 h-12 transition-colors ${currentSlide === 4 ? 'text-primary-600' : 'text-white/10'}`} />
                          </div>
                       </div>
                    </div>
                 </div>
              </motion.div>
           </AnimatePresence>

           {/* Controls */}
           <div className="absolute inset-y-0 left-0 flex items-center p-8">
              <button 
                onClick={prevSlide} 
                data-testid="prev-slide"
                className="p-4 border border-white/20 hover:bg-white hover:text-black transition-all"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
           </div>
           <div className="absolute inset-y-0 right-0 flex items-center p-8">
              <button 
                onClick={nextSlide} 
                data-testid="next-slide"
                className="p-4 border border-white/20 hover:bg-white hover:text-black transition-all"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
           </div>
        </div>

        {/* Footer Navigation */}
        <div className="h-24 border-t border-white/20 flex items-center justify-between px-8 bg-black">
           <div className="flex gap-4">
              {slides.map((slide, i) => (
                <button 
                  key={slide.id}
                  onClick={() => setCurrentSlide(i)}
                  className={`w-12 h-1.5 transition-all ${currentSlide === i ? 'bg-primary-600' : 'bg-white/10 hover:bg-white/30'}`}
                />
              ))}
           </div>
           <div className="flex items-center gap-4 text-[9px] font-black text-silver uppercase tracking-widest">
              <span>SCANNING_PROJECT_ID: {project.id}</span>
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
           </div>
        </div>

        <style jsx global>{`
          .text-stroke-white {
            -webkit-text-stroke: 1px white;
          }
        `}</style>
      </motion.div>
    </AnimatePresence>
  );
}
