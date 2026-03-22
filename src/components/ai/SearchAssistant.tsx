import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { geminiClient } from '../../lib/gemini';
import { ProjectData, ProjectAPI } from '../../lib/api';
import { AILoadingOverlay } from '../molecules/AILoadingOverlay';
import { Search, Command, Activity, Zap, Cpu } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface SearchAssistantProps {
  onSearchResults: (results: ProjectData[]) => void;
  onLoading: (loading: boolean) => void;
}

export const SearchAssistant: React.FC<SearchAssistantProps> = ({
  onSearchResults,
  onLoading
}) => {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [context, setContext] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const generateSuggestions = useCallback(async () => {
    try {
      const prompt = t('suggestions_prompt', 'ai_tools');
      
      const result = await geminiClient.generateQuickContent(prompt);
      const parsed = JSON.parse(result);
      
      if (Array.isArray(parsed)) {
        setSuggestions(parsed);
      }
    } catch {
      setSuggestions(t('suggestions_fallback', 'ai_tools') as unknown as string[] || ['MODERN PWA', 'E-COMMERCE API', 'AI ENGINE', 'MOBILE CORE', 'BLOCKCHAIN HUB']);
    }
  }, [t]);

  useEffect(() => {
    generateSuggestions();
  }, [generateSuggestions]);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    setQuery(searchQuery);
    setIsAnalyzing(true);
    onLoading(true);

    try {
      const enhancedQuery = await geminiClient.generateQuickContent(
        t('enhance_prompt', 'ai_tools').replace('{searchQuery}', searchQuery).replace('{context}', context.join(', ')),
        context
      );

      const results = await ProjectAPI.searchProjects({
        query: enhancedQuery,
        category: extractCategory(enhancedQuery),
        skills: extractSkills(enhancedQuery)
      });

      onSearchResults(results.projects);
    } catch (error) {
      console.error('Search error:', error);
      onSearchResults([]);
    }
  };

  const handleLoadingComplete = () => {
    setIsAnalyzing(false);
    onLoading(false);
  };

  const extractCategory = (query: string): string | undefined => {
    const categories = ['web', 'mobile', 'ai', 'ml', 'ecommerce', 'automation', 'design'];
    const lowerQuery = query.toLowerCase();
    
    for (const category of categories) {
      if (lowerQuery.includes(category)) return category;
    }
    return undefined;
  };

  const extractSkills = (query: string): string[] => {
    const skills = ['javascript', 'python', 'react', 'node.js', 'aws', 'docker', 'kubernetes'];
    const lowerQuery = query.toLowerCase();
    const foundSkills: string[] = [];
    
    for (const skill of skills) {
      if (lowerQuery.includes(skill)) foundSkills.push(skill);
    }
    return foundSkills;
  };

  return (
    <div className="relative">
      <AILoadingOverlay 
        isVisible={isAnalyzing} 
        onComplete={handleLoadingComplete}
        mode="standard"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Search Input Section */}
        <div className="lg:col-span-12 space-y-8">
          <div className="flex items-end justify-between border-b border-black pb-4">
            <div className="space-y-1">
              <h3 className="text-2xl font-black tracking-tighter uppercase leading-none flex items-center gap-3">
                <Search className="w-5 h-5" />
                {t('query_assistant', 'ai_tools')}
              </h3>
              <p className="label-system text-[9px] text-silver">{t('neural_engine', 'ai_tools')}</p>
            </div>
            <div className="flex gap-2">
              <span className="w-2 h-2 bg-primary-600 rounded-full animate-pulse" />
              <span className="w-2 h-2 bg-black rounded-full" />
              <span className="w-2 h-2 bg-silver rounded-full" />
            </div>
          </div>

          <div className="relative group">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
              placeholder={t('query_placeholder', 'ai_tools')}
              className="w-full pl-0 pr-32 py-8 bg-transparent border-b border-silver focus:border-black outline-none transition-all text-sm font-black tracking-tight placeholder:text-silver placeholder:font-normal uppercase"
            />
            
            {/* Scanning line removed to prevent chaotic UI behavior */}

            <button
              onClick={() => handleSearch(query)}
              disabled={!query.trim() || isAnalyzing}
              className="absolute right-0 top-1/2 -translate-y-1/2 px-6 py-3 bg-black text-white text-[10px] font-black tracking-[0.2em] uppercase hover:bg-primary-600 transition-all disabled:opacity-20 flex items-center gap-2"
            >
              <Command className="w-3 h-3" />
              {isAnalyzing ? t('syncing', 'ai_tools') : t('execute', 'ai_tools')}
            </button>
          </div>
        </div>

        {/* Intelligence Panels */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Zap className="w-3 h-3 text-primary-600" />
              <h4 className="label-system text-[10px] font-black">{t('neural_suggestions', 'ai_tools')}</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(suggestion)}
                  className="px-4 py-2 border border-black text-[9px] font-black tracking-[0.1em] uppercase transition-all hover:bg-black hover:text-white"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Cpu className="w-3 h-3 text-primary-600" />
              <h4 className="label-system text-[10px] font-black">{t('logic_overrides', 'ai_tools')}</h4>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: t('critical_label', 'ai_tools'), val: 'urgent', icon: <Activity className="w-3 h-3" /> },
                { label: t('high_load_label', 'ai_tools'), val: 'enterprise', icon: <Zap className="w-3 h-3" /> }
              ].map((modifier) => (
                <button
                  key={modifier.label}
                  onClick={() => setContext([...context, modifier.val])}
                  className="px-4 py-3 bg-white border border-silver hover:border-black text-[9px] font-black tracking-widest uppercase transition-all flex items-center gap-3 group"
                >
                  <span className="text-silver group-hover:text-primary-600">{modifier.icon}</span>
                  <span>{modifier.label}</span>
                </button>
              ))}
            </div>
            
            <AnimatePresence>
              {context.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pt-4 mt-4 border-t border-silver"
                >
                  <div className="flex flex-wrap gap-2">
                    {context.map((ctx, i) => (
                      <span key={i} className="text-[9px] font-mono bg-bone border border-black text-black px-3 py-1 flex items-center gap-2">
                        {ctx}
                        <button onClick={() => setContext(context.filter((_, idx) => idx !== i))} className="hover:text-primary-600">×</button>
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
