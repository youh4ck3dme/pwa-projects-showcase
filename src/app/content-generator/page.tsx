'use client';

import React, { useState } from 'react';
import { geminiClient } from '@/lib/gemini';

export default function ContentGeneratorPage() {
  const [contentType, setContentType] = useState('blog');
  const [projectTitle, setProjectTitle] = useState('');
  const [keywords, setKeywords] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');

  const contentTypes = [
    { id: 'blog', label: 'Blogový článok', prompt: 'Napíš pútavý blogový článok o projekte' },
    { id: 'case-study', label: 'Case Study', prompt: 'Vytvor detailnú prípadovú štúdiu pre projekt' },
    { id: 'social', label: 'Sociálne siete', prompt: 'Vygeneruj príspevky na Instagram, LinkedIn a Facebook pre' },
    { id: 'marketing', label: 'Marketingový text', prompt: 'Vytvor predajný text pre webovú stránku o' }
  ];

  const handleGenerate = async () => {
    if (!projectTitle) return;
    setIsGenerating(true);
    setGeneratedContent('');

    try {
      const selectedType = contentTypes.find(t => t.id === contentType);
      const prompt = `${selectedType?.prompt} "${projectTitle}". Kľúčové slová: ${keywords}. Formátuj v Markdown.`;
      
      const result = await geminiClient.generateContent(prompt);
      setGeneratedContent(result);
    } catch (error) {
      console.error('Content Generation Error:', error);
      setGeneratedContent('Chyba pri generovaní obsahu. Skontrolujte API kľúč alebo skúste znova.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          AI <span className="text-primary-600">Content Generator</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Vytvárajte profesionálny marketingový obsah pre vaše projekty v priebehu sekúnd pomocou Gemini AI.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Settings Panel */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Typ obsahu</label>
              <div className="space-y-2">
                {contentTypes.map(type => (
                  <button
                    key={type.id}
                    onClick={() => setContentType(type.id)}
                    className={`w-full text-left px-4 py-2 rounded-xl text-sm transition-all ${
                      contentType === type.id 
                        ? 'bg-primary-600 text-white shadow-lg shadow-primary-200' 
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Názov projektu</label>
              <input
                type="text"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                placeholder="napr. Moderný Rodinný Dom"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Kľúčové slová</label>
              <textarea
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="napr. moderný, energeticky úsporný, drevostavba"
                rows={3}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none resize-none"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating || !projectTitle}
              className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white/20 border-t-white rounded-full"></div>
                  <span>Generujem...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  <span>Generovať obsah</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Output Panel */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm h-full flex flex-col min-h-[500px]">
            <div className="p-4 border-b border-gray-50 flex justify-between items-center">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Výstup generátora</span>
              {generatedContent && (
                <button 
                  onClick={() => navigator.clipboard.writeText(generatedContent)}
                  className="text-xs text-primary-600 font-bold hover:underline"
                >
                  Kopírovať
                </button>
              )}
            </div>
            <div className="flex-grow p-8 overflow-y-auto">
              {!generatedContent && !isGenerating ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <div className="p-6 bg-gray-50 rounded-full">
                    <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <p className="text-gray-400 italic">Váš vygenerovaný obsah sa zobrazí tu.</p>
                </div>
              ) : isGenerating ? (
                <div className="space-y-4">
                  <div className="h-4 bg-gray-100 rounded w-3/4 animate-pulse"></div>
                  <div className="h-4 bg-gray-100 rounded w-1/2 animate-pulse"></div>
                  <div className="h-4 bg-gray-100 rounded w-5/6 animate-pulse"></div>
                </div>
              ) : (
                <div className="prose prose-primary max-w-none">
                  {/* Simplistic renderer for markdown-like text */}
                  {generatedContent.split('\n').map((line, i) => (
                    <p key={i} className="mb-2 text-gray-700">{line}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
