'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { geminiClient } from '../../lib/gemini';
import { AILoadingOverlay } from '../../components/molecules/AILoadingOverlay';
import { Check, Copy, Sparkles, Send, FileText, Share2, CornerDownRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function ContentGeneratorPage() {
  const { t } = useLanguage();
  const [contentType, setContentType] = useState('blog');
  const [projectTitle, setProjectTitle] = useState('');
  const [keywords, setKeywords] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [copied, setCopied] = useState(false);

  const contentTypes = [
    { id: 'blog', label: t('blog', 'generator'), prompt: t('blog_prompt', 'generator'), icon: <FileText className="w-4 h-4" /> },
    { id: 'case-study', label: t('case_study', 'generator'), prompt: t('case_study_prompt', 'generator'), icon: <Check className="w-4 h-4" /> },
    { id: 'social', label: t('social', 'generator'), prompt: t('social_prompt', 'generator'), icon: <Share2 className="w-4 h-4" /> },
    { id: 'marketing', label: t('marketing', 'generator'), prompt: t('marketing_prompt', 'generator'), icon: <Send className="w-4 h-4" /> }
  ];

  const handleGenerate = async () => {
    if (!projectTitle) return;
    setIsGenerating(true);
    setGeneratedContent('');

    try {
      const selectedType = contentTypes.find(t => t.id === contentType);
      const prompt = `${selectedType?.prompt} "${projectTitle}". ${t('keywords_label', 'generator')} ${keywords}. ${t('prompt_suffix', 'generator')}`;
      
      try {
        const result = await geminiClient.generateContent(prompt);
        setGeneratedContent(result);
      } catch (sdkError) {
        console.warn('SDK failed, falling back to API route:', sdkError);
        const response = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt, model: 'gemini-1.5-pro' })
        });
        
        if (!response.ok) throw new Error('API route also failed');
        const data = await response.json();
        setGeneratedContent(data.text);
      }
    } catch (error) {
      console.error('Content Generation Error:', error);
      setGeneratedContent(`## ${t('error_title', 'generator')}\n${t('error_desc', 'generator')}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] pt-32 pb-24">
      <div className="container-tight">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-8">
            <span className="label-system text-primary-600 px-4 py-1.5 bg-primary-600/10 border border-primary-600/20 rounded-full font-black tracking-[0.2em]">
              {t('tagline', 'generator')}
            </span>
            <div className="h-[1px] flex-grow bg-silver/30" />
          </div>
          <h1 className="text-7xl font-black tracking-tighter leading-[0.82] mb-10 text-gradient uppercase whitespace-pre-line">
            {t('heading', 'generator')}
          </h1>
          <p className="text-xl font-medium text-charcoal max-w-2xl uppercase tracking-tighter leading-snug tight-p">
            {t('description', 'generator')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Settings Panel */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-4 sticky top-32 space-y-8"
          >
            <div className="bg-white border-2 border-black p-8 lg:p-10 shadow-[12px_12px_0px_0px_rgba(37,99,235,0.1)]">
              <div className="space-y-10">
                <div>
                  <h4 className="label-system text-[10px] mb-6 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary-600" />
                    {t('type_label', 'generator')}
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {contentTypes.map(type => (
                      <button
                        key={type.id}
                        onClick={() => setContentType(type.id)}
                        className={`flex items-center gap-4 px-5 py-4 text-[11px] font-black uppercase tracking-widest transition-all border-2 ${
                          contentType === type.id 
                            ? 'bg-black text-white border-black shadow-[4px_4px_0px_0px_rgba(37,99,235,0.4)]' 
                            : 'bg-white text-charcoal border-silver hover:border-black'
                        }`}
                      >
                        {type.icon}
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="label-system text-[10px] mb-6 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-silver" />
                    {t('core_data', 'generator')}
                  </h4>
                  <div className="space-y-6">
                    <div className="group">
                      <label className="block text-[9px] font-black uppercase text-silver group-focus-within:text-primary-600 transition-colors mb-2.5 tracking-widest">{t('project_title', 'generator')}</label>
                      <input
                        type="text"
                        value={projectTitle}
                        onChange={(e) => setProjectTitle(e.target.value)}
                        placeholder={t('placeholder_title', 'generator')}
                        className="w-full px-5 py-4 bg-bone border-2 border-silver focus:border-black outline-none text-[14px] font-black uppercase tracking-tight transition-all placeholder:text-silver/50"
                      />
                    </div>

                    <div className="group">
                      <label className="block text-[9px] font-black uppercase text-silver group-focus-within:text-primary-600 transition-colors mb-2.5 tracking-widest">{t('keywords', 'generator')}</label>
                      <textarea
                        value={keywords}
                        onChange={(e) => setKeywords(e.target.value)}
                        placeholder={t('placeholder_keywords', 'generator')}
                        rows={3}
                        className="w-full px-5 py-4 bg-bone border-2 border-silver focus:border-black outline-none text-[14px] font-black uppercase tracking-tight transition-all resize-none placeholder:text-silver/50"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || !projectTitle}
                  className="w-full py-6 bg-black text-white text-[12px] font-black uppercase tracking-[0.3em] hover:bg-primary-600 transition-all disabled:opacity-20 flex items-center justify-center gap-4 group relative overflow-hidden"
                >
                  {isGenerating ? (
                    <>
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full"
                      />
                      <span>{t('synth_button', 'generator')}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <span>{t('generate_button', 'generator')}</span>
                      <motion.div 
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0 bg-white/10 skew-x-12"
                      />
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="p-8 border-2 border-silver/30 bg-bone/50 backdrop-blur-sm flex items-start gap-5">
              <CornerDownRight className="w-6 h-6 text-primary-600 mt-0.5 shrink-0" />
              <p className="text-[12px] font-bold text-charcoal leading-relaxed uppercase tracking-tight opacity-70">
                {t('footer_note', 'generator')}
              </p>
            </div>
          </motion.div>

          {/* Output Panel */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-8 min-h-[700px] flex flex-col"
          >
            <AILoadingOverlay 
              isVisible={isGenerating} 
              onComplete={() => setIsGenerating(false)} 
              mode="deep" 
            />
            <div className="bg-white border-2 border-black h-full flex flex-col relative overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,0.05)]">
              <div className="px-8 py-5 border-b-2 border-black flex justify-between items-center bg-bone">
                <div className="flex items-center gap-4">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                  </div>
                  <span className="label-system text-[10px] tracking-widest font-black uppercase">{t('output_label', 'generator')}</span>
                </div>
                <AnimatePresence>
                  {generatedContent && (
                    <motion.button 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      onClick={copyToClipboard}
                      className="flex items-center gap-3 px-6 py-2.5 bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary-600 transition-all shadow-[4px_4px_0px_0px_rgba(37,99,235,0.3)] hover:shadow-none translate-y-[-2px] hover:translate-y-0"
                    >
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? t('copied', 'generator') : t('clone_data', 'generator')}
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex-grow p-10 lg:p-16 overflow-y-auto bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed opacity-[0.03] absolute inset-0 pointer-events-none" />
              
              <div className="flex-grow p-10 lg:p-16 overflow-y-auto relative z-10">
                <AnimatePresence mode="wait">
                  {!generatedContent && !isGenerating ? (
                    <motion.div 
                      key="empty"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex flex-col items-center justify-center h-full text-center space-y-8"
                    >
                      <div className="w-32 h-32 bg-bone border-2 border-silver flex items-center justify-center grayscale opacity-40 relative group">
                        <FileText className="w-12 h-12 text-silver group-hover:text-primary-600 transition-colors" />
                        <div className="absolute -inset-4 border border-silver/50 scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500" />
                      </div>
                      <div className="space-y-3">
                        <p className="text-[13px] font-black text-silver uppercase tracking-[0.4em] italic leading-none">{t('awaiting', 'generator')}</p>
                        <p className="text-[10px] font-bold text-silver/60 uppercase tracking-widest">{t('ready', 'generator')}</p>
                      </div>
                    </motion.div>
                  ) : isGenerating ? (
                    <motion.div 
                      key="generating"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-12"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-10 bg-bone animate-pulse w-3/4 border-l-4 border-black" />
                        <div className="h-10 bg-primary-600/10 animate-pulse w-1/4" />
                      </div>
                      <div className="space-y-6">
                        <div className="h-5 bg-bone animate-pulse w-full" />
                        <div className="h-5 bg-bone animate-pulse w-5/6" />
                        <div className="h-5 bg-bone animate-pulse w-11/12" />
                        <div className="h-5 bg-bone animate-pulse w-full" />
                      </div>
                      <div className="h-[300px] bg-bone border-2 border-silver/20 animate-pulse w-full flex items-center justify-center">
                         <motion.div 
                           animate={{ 
                             scale: [1, 1.1, 1],
                             opacity: [0.3, 0.6, 0.3]
                           }}
                           transition={{ duration: 2, repeat: Infinity }}
                           className="w-16 h-16 bg-black/5 rounded-full border-2 border-black/10"
                         />
                      </div>
                      <div className="space-y-6">
                        <div className="h-5 bg-bone animate-pulse w-4/5" />
                        <div className="h-5 bg-bone animate-pulse w-full" />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="content"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                      className="prose prose-lg prose-slate max-w-none 
                        prose-headings:font-black prose-headings:tracking-tighter prose-headings:uppercase prose-headings:text-black
                        prose-p:text-charcoal prose-p:leading-[1.8] prose-p:text-[16px] prose-p:font-medium
                        prose-li:text-charcoal prose-li:text-[16px] prose-li:font-medium
                        prose-strong:text-black prose-strong:font-black
                        prose-blockquote:border-l-4 prose-blockquote:border-black prose-blockquote:bg-bone prose-blockquote:py-2 prose-blockquote:px-8 prose-blockquote:italic
                        selection:bg-primary-600 selection:text-white"
                    >
                      <ReactMarkdown>{generatedContent}</ReactMarkdown>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Decorative Scanning line for AI effect */}
              {isGenerating && (
                <motion.div 
                  initial={{ top: 0 }}
                  animate={{ top: '100%' }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-[3px] bg-primary-600 shadow-[0_0_15px_rgba(37,99,235,0.8)] z-20"
                />
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
