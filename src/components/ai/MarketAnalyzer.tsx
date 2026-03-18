import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { geminiClient } from '../../lib/gemini';
import { AILoadingOverlay } from '../molecules/AILoadingOverlay';

interface MarketAnalyzerProps {
  onAnalysisComplete: (analysis: any) => void;
}

export const MarketAnalyzer: React.FC<MarketAnalyzerProps> = ({
  onAnalysisComplete
}) => {
  const { t } = useLanguage();
  const [localIsAnalyzing, setLocalIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    'all',
    'web-development',
    'mobile-apps',
    'ai-ml',
    'e-commerce',
    'business-automation'
  ];

  const handleLoadingComplete = useCallback(() => {
    setLocalIsAnalyzing(false);
  }, []);

  const categoryLabels: Record<string, string> = {
    'all': t('cat_all', 'ai_tools'),
    'web-development': t('cat_web', 'ai_tools'),
    'mobile-apps': t('cat_mobile', 'ai_tools'),
    'ai-ml': t('cat_ai', 'ai_tools'),
    'e-commerce': t('cat_ecommerce', 'ai_tools'),
    'business-automation': t('cat_automation', 'ai_tools')
  };

  const parseAnalysisResult = useCallback((result: string): any => {
    try {
      // Try to parse as JSON first
      return JSON.parse(result);
    } catch {
      // Fallback to structured parsing
      return {
        trends: {
          demand: t('fallback_demand', 'ai_tools'),
          pricing: t('fallback_pricing', 'ai_tools'),
          skills: ['JavaScript', 'Python', 'React', 'Node.js']
        },
        recommendations: [
          t('fallback_rec1', 'ai_tools'),
          t('fallback_rec2', 'ai_tools'),
          t('fallback_rec3', 'ai_tools'),
          t('fallback_rec4', 'ai_tools')
        ],
        opportunities: [
          t('fallback_opp1', 'ai_tools'),
          t('fallback_opp2', 'ai_tools'),
          t('fallback_opp3', 'ai_tools'),
          t('fallback_opp4', 'ai_tools')
        ]
      };
    }
  }, [t]);

  const analyzeMarket = useCallback(async () => {
    // setIsAnalyzing(true); Managed by AILoadingOverlay
    setLocalIsAnalyzing(true);
    
    try {
      const prompt = t('analyzer_prompt', 'ai_tools').replace('{category}', selectedCategory);

      const result = await geminiClient.analyzeData({ prompt }, 'insights');
      const parsedAnalysis = parseAnalysisResult(result);
      
      setAnalysis(parsedAnalysis);
      onAnalysisComplete(parsedAnalysis);
    } catch (error) {
      console.error('Market analysis error:', error);
      setAnalysis({
        error: t('error_desc', 'generator'),
        recommendations: []
      });
    } finally {
      // setIsAnalyzing(false); Managed by onComplete
    }
  }, [selectedCategory, onAnalysisComplete, t, parseAnalysisResult]);

  useEffect(() => {
    analyzeMarket();
  }, [selectedCategory, analyzeMarket]);

  return (
    <div className="space-y-12 py-4">
      <div className="space-y-2 border-b border-black pb-8">
        <h3 className="text-xl font-black tracking-tight uppercase leading-none">
          {t('market_analyzer', 'ai_tools')}
        </h3>
        <p className="label-system text-[9px]">
          {t('market_intel', 'ai_tools')}
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <label className="label-system text-[8px] font-black block">
            {t('sector_selection', 'ai_tools')}
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-white border border-black px-4 py-3 text-[10px] font-black tracking-widest uppercase focus:ring-0 outline-none hover:bg-bone transition-colors cursor-pointer"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {categoryLabels[category]}
              </option>
            ))}
          </select>
        </div>

        {localIsAnalyzing ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-6">
             <AILoadingOverlay isVisible={localIsAnalyzing} onComplete={handleLoadingComplete} mode="standard" />
          </div>
        ) : analysis ? (
          <div className="space-y-12">
            {/* Key Insights */}
            {analysis.trends && (
              <div className="space-y-4">
                <h4 className="label-system text-[9px] font-black underline underline-offset-4">{t('insight_data', 'ai_tools')}</h4>
                <div className="grid grid-cols-1 gap-px bg-silver border border-silver">
                  <div className="bg-white p-6 space-y-3">
                    <h5 className="label-system text-[8px]">{t('volume_demand', 'ai_tools')}</h5>
                    <p className="text-[10px] font-black uppercase leading-tight">{analysis.trends.demand}</p>
                  </div>
                  <div className="bg-white p-6 space-y-3">
                    <h5 className="label-system text-[8px]">{t('valuation_price', 'ai_tools')}</h5>
                    <p className="text-[10px] font-black uppercase leading-tight font-mono">{analysis.trends.pricing}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Recommendations */}
            {analysis.recommendations && (
              <div className="space-y-4">
                <h4 className="label-system text-[9px] font-black">{t('strategic_vectors', 'ai_tools')}</h4>
                <ul className="space-y-0 border-t border-silver">
                  {analysis.recommendations.map((rec: string, index: number) => (
                    <li key={index} className="flex gap-4 items-start border-b border-silver py-4 group">
                      <span className="text-[9px] font-black font-mono">0{index + 1}</span>
                      <span className="text-[10px] font-bold leading-relaxed uppercase tracking-tight text-charcoal group-hover:text-black">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Opportunities */}
            {analysis.opportunities && (
              <div className="space-y-4">
                <h4 className="label-system text-[9px] font-black underline underline-offset-4">{t('alpha_ops', 'ai_tools')}</h4>
                <div className="flex flex-col gap-2">
                  {analysis.opportunities.map((opp: string, index: number) => (
                    <div
                      key={index}
                      className="p-4 bg-black text-white"
                    >
                      <span className="text-[9px] font-black tracking-widest uppercase">{opp}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Button */}
            <div className="pt-12 border-t border-black flex flex-col gap-4">
              <button
                onClick={analyzeMarket}
                disabled={localIsAnalyzing}
                className="btn-productivity w-full py-5 text-[10px]"
              >
                {t('reevaluate', 'ai_tools')}
              </button>
              <button
                onClick={() => onAnalysisComplete(analysis)}
                className="px-4 py-4 border border-black text-[9px] font-black tracking-widest uppercase hover:bg-black hover:text-white transition-all"
              >
                {t('export_raw', 'ai_tools')}
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 border border-black bg-bone">
            <p className="label-system text-[9px] font-black">{t('system_standby', 'ai_tools')}</p>
          </div>
        )}
      </div>
    </div>
  );
};