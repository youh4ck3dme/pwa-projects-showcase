'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { geminiClient } from '@/lib/gemini';
import { Check, Copy, Sparkles, Send, FileText, Share2, CornerDownRight } from 'lucide-react';

export default function ContentGeneratorPage() {
  const [contentType, setContentType] = useState('blog');
  const [projectTitle, setProjectTitle] = useState('');
  const [keywords, setKeywords] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [copied, setCopied] = useState(false);

  const contentTypes = [
    { id: 'blog', label: 'Blogový článok', prompt: 'Napíš pútavý blogový článok o projekte', icon: <FileText className="w-4 h-4" /> },
    { id: 'case-study', label: 'Case Study', prompt: 'Vytvor detailnú prípadovú štúdiu pre projekt', icon: <Check className="w-4 h-4" /> },
    { id: 'social', label: 'Sociálne siete', prompt: 'Vygeneruj príspevky na Instagram, LinkedIn a Facebook pre', icon: <Share2 className="w-4 h-4" /> },
    { id: 'marketing', label: 'Marketingový text', prompt: 'Vytvor predajný text pre webovú stránku o', icon: <Send className="w-4 h-4" /> }
  ];

  const handleGenerate = async () => {
    if (!projectTitle) return;
    setIsGenerating(true);
    setGeneratedContent('');

    try {
      const selectedType = contentTypes.find(t => t.id === contentType);
      const prompt = `${selectedType?.prompt} "${projectTitle}". Kľúčové slová: ${keywords}. Formátuj v Markdown. Použi štruktúrované nadpisy a zoznamy.`;
      
      const result = await geminiClient.generateContent(prompt);
      setGeneratedContent(result);
    } catch (error) {
      console.error('Content Generation Error:', error);
      setGeneratedContent('## Chyba pri generovaní obsahu\nSkontrolujte API kľúč alebo skúste znova neskôr.');
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
          className="mb-16"
        >
          <div className="flex items-center gap-2 mb-6">
            <span className="label-system text-primary-600 px-3 py-1 bg-primary-600/10 rounded-full">AI CONTENT ENGINE v4.2</span>
          </div>
          <h1 className="text-7xl font-black tracking-tighter leading-[0.85] mb-8 text-gradient">
            CONTENT <br /> GENERATOR.
          </h1>
          <p className="text-xl font-medium text-charcoal max-w-2xl uppercase tracking-tighter leading-snug">
            Professional marketing output for high-end projects, synthesized by Gemini Pro architecture.
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
            <div className="bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="space-y-8">
                <div>
                  <h4 className="label-system text-[10px] mb-4">01 / CONTENT TYPE</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {contentTypes.map(type => (
                      <button
                        key={type.id}
                        onClick={() => setContentType(type.id)}
                        className={`flex items-center gap-3 px-4 py-3 text-[11px] font-black uppercase tracking-widest transition-all border ${
                          contentType === type.id 
                            ? 'bg-black text-white border-black' 
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
                  <h4 className="label-system text-[10px] mb-4">02 / CORE DATA</h4>
                  <div className="space-y-4">
                    <div className="group">
                      <label className="block text-[8px] font-black uppercase text-silver group-focus-within:text-black transition-colors mb-2">Project Title</label>
                      <input
                        type="text"
                        value={projectTitle}
                        onChange={(e) => setProjectTitle(e.target.value)}
                        placeholder="e.g., BRUTALIST VILLA"
                        className="w-full px-4 py-3 bg-bone border border-silver focus:border-black outline-none text-[13px] font-bold uppercase tracking-tight transition-all"
                      />
                    </div>

                    <div className="group">
                      <label className="block text-[8px] font-black uppercase text-silver group-focus-within:text-black transition-colors mb-2">Target Keywords</label>
                      <textarea
                        value={keywords}
                        onChange={(e) => setKeywords(e.target.value)}
                        placeholder="e.g., CONCRETE, MINIMAL, GLASS"
                        rows={3}
                        className="w-full px-4 py-3 bg-bone border border-silver focus:border-black outline-none text-[13px] font-bold uppercase tracking-tight transition-all resize-none"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || !projectTitle}
                  className="w-full py-5 bg-black text-white text-[11px] font-black uppercase tracking-[0.2em] hover:bg-primary-600 transition-all disabled:opacity-20 flex items-center justify-center gap-3"
                >
                  {isGenerating ? (
                    <>
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full"
                      />
                      <span>SYNTHESIZING...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>GENERATE DATA</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="p-6 border border-silver bg-bone flex items-start gap-4">
              <CornerDownRight className="w-5 h-5 text-silver mt-1 shrink-0" />
              <p className="text-[11px] font-medium text-charcoal leading-relaxed uppercase">
                Using Gemini 1.5 Pro architecture for high-fidelity content synthesis and semantic analysis.
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
            <div className="bg-white border-2 border-black h-full flex flex-col relative overflow-hidden">
              <div className="p-4 border-b-2 border-black flex justify-between items-center bg-bone">
                <span className="label-system text-[10px]">OUTPUT / BUFFER / v4.2</span>
                <AnimatePresence>
                  {generatedContent && (
                    <motion.button 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      onClick={copyToClipboard}
                      className="flex items-center gap-2 px-4 py-2 bg-black text-white text-[9px] font-black uppercase tracking-widest hover:bg-primary-600 transition-all"
                    >
                      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      {copied ? 'COPIED TO BUFFER' : 'CLONE DATA'}
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex-grow p-12 overflow-y-auto">
                <AnimatePresence mode="wait">
                  {!generatedContent && !isGenerating ? (
                    <motion.div 
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center h-full text-center space-y-6"
                    >
                      <div className="w-24 h-24 bg-bone border border-silver flex items-center justify-center grayscale opacity-50">
                        <FileText className="w-10 h-10 text-silver" />
                      </div>
                      <p className="text-[11px] font-bold text-silver uppercase tracking-[0.2em] italic">Awaiting input sequence for generation.</p>
                    </motion.div>
                  ) : isGenerating ? (
                    <motion.div 
                      key="generating"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-8"
                    >
                      <div className="h-8 bg-bone animate-pulse w-3/4"></div>
                      <div className="space-y-4">
                        <div className="h-4 bg-bone animate-pulse w-full"></div>
                        <div className="h-4 bg-bone animate-pulse w-5/6"></div>
                        <div className="h-4 bg-bone animate-pulse w-full"></div>
                      </div>
                      <div className="h-40 bg-bone animate-pulse w-full"></div>
                      <div className="space-y-4">
                        <div className="h-4 bg-bone animate-pulse w-4/5"></div>
                        <div className="h-4 bg-bone animate-pulse w-full"></div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="content"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="prose prose-sm prose-slate max-w-none prose-headings:font-black prose-headings:tracking-tighter prose-headings:uppercase prose-p:text-charcoal prose-p:leading-relaxed prose-li:text-charcoal"
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
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-[2px] bg-primary-600 opacity-50 blur-[2px] z-10"
                />
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
