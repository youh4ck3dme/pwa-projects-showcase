'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileCode, CheckCircle2, ChevronRight, Save, RefreshCcw, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface IngestedData {
  title: string;
  tagline: string;
  description: string;
  category: string;
  type: string;
  techStack: string[];
  architecture: string;
  marketIntel: string;
  suggestedBudget: string;
  suggestedTimeline: string;
}

export default function IngestionDashboard() {
  const { t } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [ingestedData, setIngestedData] = useState<IngestedData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const processFile = async () => {
    if (!file) return;

    setIsProcessing(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/ingest', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to analyze project');
      }

      const data = await response.json();
      setIngestedData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during analysis');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSave = async () => {
    if (!ingestedData) return;

    setIsSaving(true);
    setSaveSuccess(false);

    const projectToSave = {
      id: Date.now(),
      api_id: Math.floor(Math.random() * 9000) + 1000,
      project_title: ingestedData.title,
      project_tagline: ingestedData.tagline,
      project_desc: ingestedData.description,
      project_content: ingestedData.description, // Can be refined later
      project_type: ingestedData.type,
      project_category: ingestedData.category,
      project_client: 'AI Generated',
      project_date: new Date().getFullYear().toString(),
      project_link: '#',
      project_img_id: 0,
      project_gal_id: '',
      featured_image_url: `https://placehold.co/1200x600?text=${encodeURIComponent(ingestedData.title)}`,
      ai_tech_stack: ingestedData.techStack,
      ai_architecture: ingestedData.architecture,
      ai_market_intel: ingestedData.marketIntel,
      suggested_budget: ingestedData.suggestedBudget,
      suggested_timeline: ingestedData.suggestedTimeline
    };

    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectToSave),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to save project');
      }

      setSaveSuccess(true);
      setTimeout(() => setIngestedData(null), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save to repository');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* Upload Zone */}
      <section className="bg-white border-4 border-black p-12 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="text-4xl font-black tracking-tighter uppercase mb-8">{t('upload_zip', 'ingestion')}</h2>
        
        {!ingestedData && !isProcessing && (
          <div className="border-4 border-dashed border-silver p-16 text-center group hover:border-black transition-colors relative">
            <input 
              type="file" 
              accept=".zip" 
              onChange={onFileChange}
              aria-label="DRAG & DROP PROJECT ZIP"
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center gap-4">
              <Upload className="w-16 h-16 text-silver group-hover:text-black transition-colors" />
              <p className="text-xl font-black uppercase tracking-widest text-silver group-hover:text-black">
                {file ? file.name : 'DRAG & DROP PROJECT ZIP'}
              </p>
            </div>
          </div>
        )}

        {isProcessing && (
          <div className="p-16 text-center border-4 border-black bg-black text-white">
            <RefreshCcw className="w-16 h-16 mx-auto mb-6 animate-spin text-primary-400" />
            <p className="text-2xl font-black uppercase tracking-[0.2em]">{t('analyzing', 'ingestion')}</p>
          </div>
        )}

        {error && (
          <div className="mt-8 p-6 bg-red-100 border-2 border-red-600 text-red-600 flex items-center gap-4">
            <AlertTriangle className="w-6 h-6" />
            <p className="font-bold uppercase tracking-widest">{error}</p>
          </div>
        )}

        {file && !isProcessing && !ingestedData && (
          <button 
            onClick={processFile}
            className="mt-8 w-full py-6 bg-black text-white text-xl font-black uppercase tracking-[0.3em] hover:bg-primary-600 transition-all flex items-center justify-center gap-4 shadow-[8px_8px_0px_0px_rgba(37,99,235,0.3)]"
          >
            START AI ANALYSIS <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </section>

      {/* Results View */}
      <AnimatePresence>
        {ingestedData && (
          <motion.section 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            <div className="bg-primary-600 text-white p-6 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between">
               <div className="flex items-center gap-4">
                 <CheckCircle2 className="w-8 h-8" />
                 <h3 className="text-2xl font-black uppercase tracking-widest">{t('success', 'ingestion')}</h3>
               </div>
               <button onClick={() => setIngestedData(null)} className="text-xs font-black uppercase border-b-2 border-white">{t('refine', 'ingestion')}</button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
               {/* Left Column: Form */}
               <div className="lg:col-span-8 space-y-8 bg-white border-4 border-black p-10">
                  <div className="space-y-6">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-silver">Project Identity</label>
                    <input 
                      type="text" 
                      value={ingestedData.title}
                      className="w-full text-4xl font-black bg-bone border-2 border-black p-4 focus:ring-4 ring-primary-600/20 outline-none uppercase tracking-tighter"
                    />
                    <input 
                      type="text" 
                      value={ingestedData.tagline}
                      className="w-full text-xl font-bold bg-bone border-2 border-black p-4 focus:ring-4 ring-primary-600/20 outline-none uppercase tracking-tight"
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-silver">Contextual Description</label>
                    <textarea 
                      rows={6}
                      value={ingestedData.description}
                      className="w-full bg-bone border-2 border-black p-6 font-medium text-lg leading-snug uppercase tracking-tighter"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                     <div className="space-y-4">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-silver">{t('market_intel', 'ingestion')}</label>
                        <div className="bg-bone p-4 border-2 border-black text-sm font-bold uppercase">{ingestedData.marketIntel}</div>
                     </div>
                     <div className="space-y-4">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-silver">{t('architecture', 'ingestion')}</label>
                        <div className="bg-bone p-4 border-2 border-black text-sm font-bold uppercase">{ingestedData.architecture}</div>
                     </div>
                  </div>
               </div>

               {/* Right Column: Metadata */}
               <div className="lg:col-span-4 space-y-8">
                  <div className="bg-black text-white border-4 border-black p-10 space-y-10">
                     <div>
                       <h4 className="text-[11px] font-black text-primary-400 uppercase tracking-widest mb-6 underline underline-offset-8">AI INTEL</h4>
                       <div className="space-y-6">
                          <div className="flex justify-between items-end border-b border-white/10 pb-4">
                             <span className="text-[9px] font-black text-silver uppercase">Category</span>
                             <span className="text-lg font-black">{ingestedData.category}</span>
                          </div>
                          <div className="flex justify-between items-end border-b border-white/10 pb-4">
                             <span className="text-[9px] font-black text-silver uppercase">Type</span>
                             <span className="text-lg font-black">{ingestedData.type}</span>
                          </div>
                          <div className="flex justify-between items-end border-b border-white/10 pb-4">
                             <span className="text-[9px] font-black text-silver uppercase">Budget Est.</span>
                             <span className="text-lg font-black">{ingestedData.suggestedBudget}</span>
                          </div>
                          <div className="flex justify-between items-end border-b border-white/10 pb-4">
                             <span className="text-[9px] font-black text-silver uppercase">Timeline Est.</span>
                             <span className="text-lg font-black">{ingestedData.suggestedTimeline}</span>
                          </div>
                       </div>
                     </div>

                     <div>
                       <h4 className="text-[11px] font-black text-primary-400 uppercase tracking-widest mb-6 underline underline-offset-8">{t('tech_stack', 'ingestion')}</h4>
                       <div className="flex flex-wrap gap-2">
                          {ingestedData.techStack.map((tech, i) => (
                            <span key={i} className="px-3 py-1 bg-white text-black text-[10px] font-black uppercase tracking-widest">{tech}</span>
                          ))}
                       </div>
                     </div>

                     <button 
                       onClick={handleSave}
                       disabled={isSaving || saveSuccess}
                       className="w-full py-5 bg-primary-600 text-white font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all disabled:opacity-50"
                     >
                       {isSaving ? <RefreshCcw className="w-5 h-5 animate-spin" /> : saveSuccess ? <CheckCircle2 className="w-5 h-5" /> : <Save className="w-5 h-5" />}
                       {saveSuccess ? 'SAVED_TO_CORE' : isSaving ? 'ENCRYPTING...' : t('save', 'ingestion')}
                     </button>
                  </div>
               </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
