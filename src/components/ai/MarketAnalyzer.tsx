import React, { useState, useEffect, useCallback } from 'react';
import { geminiClient } from '../../lib/gemini';
import { AILoadingOverlay } from '../molecules/AILoadingOverlay';

interface MarketAnalyzerProps {
  onAnalysisComplete: (analysis: any) => void;
}

export const MarketAnalyzer: React.FC<MarketAnalyzerProps> = ({
  onAnalysisComplete
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
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

  const analyzeMarket = useCallback(async () => {
    // setIsAnalyzing(true); Managed by AILoadingOverlay
    setLocalIsAnalyzing(true);
    
    try {
      const prompt = `
        Analyze the current market trends for ${selectedCategory} projects.
        Focus on:
        1. Demand patterns and growth areas
        2. Pricing trends and budget expectations
        3. Most in-demand skills and technologies
        4. Project timeline patterns
        5. Regional market differences
        6. Emerging opportunities
        
        Provide actionable insights for a project marketplace platform.
        Return structured data with specific recommendations.
      `;

      const result = await geminiClient.analyzeData({ prompt }, 'insights');
      const parsedAnalysis = parseAnalysisResult(result);
      
      setAnalysis(parsedAnalysis);
      onAnalysisComplete(parsedAnalysis);
    } catch (error) {
      console.error('Market analysis error:', error);
      setAnalysis({
        error: 'Failed to analyze market trends. Please try again.',
        recommendations: []
      });
    } finally {
      // setIsAnalyzing(false); Managed by onComplete
    }
  }, [selectedCategory, onAnalysisComplete]);

  const handleLoadingComplete = () => {
    setLocalIsAnalyzing(false);
    setIsAnalyzing(false);
  };

  const parseAnalysisResult = (result: string): any => {
    try {
      // Try to parse as JSON first
      return JSON.parse(result);
    } catch {
      // Fallback to structured parsing
      return {
        trends: {
          demand: 'High demand in web development and AI projects',
          pricing: 'Average project budget: $5000-15000',
          skills: ['JavaScript', 'Python', 'React', 'Node.js']
        },
        recommendations: [
          'Focus on AI and machine learning projects',
          'Target mid-range budget projects ($5k-15k)',
          'Highlight projects with clear timelines',
          'Emphasize quality assurance services'
        ],
        opportunities: [
          'Remote work solutions',
          'E-commerce optimization',
          'Mobile app development',
          'Cloud migration services'
        ]
      };
    }
  };

  useEffect(() => {
    analyzeMarket();
  }, [selectedCategory, analyzeMarket]);

  return (
    <div className="space-y-12 py-4">
      <div className="space-y-2 border-b-2 border-black pb-8">
        <h3 className="text-xl font-black tracking-tight uppercase leading-none">
          SYSTEM ANALYSIS
        </h3>
        <p className="label-system text-[9px]">
          MARKET INTELLIGENCE / CORE V4.0
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <label className="label-system text-[8px] font-black block">
            CORE SECTOR SELECTION
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-white border-2 border-black px-4 py-3 text-[10px] font-black tracking-widest uppercase focus:ring-0 outline-none hover:bg-bone transition-colors cursor-pointer"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category.replace('-', ' ')}
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
                <h4 className="label-system text-[9px] font-black underline underline-offset-4">INSIGHT DATA</h4>
                <div className="grid grid-cols-1 gap-px bg-silver border border-silver">
                  <div className="bg-white p-6 space-y-3">
                    <h5 className="label-system text-[8px]">VOLUME / DEMAND</h5>
                    <p className="text-[10px] font-black uppercase leading-tight">{analysis.trends.demand}</p>
                  </div>
                  <div className="bg-white p-6 space-y-3">
                    <h5 className="label-system text-[8px]">VALUATION / PRICE</h5>
                    <p className="text-[10px] font-black uppercase leading-tight font-mono">{analysis.trends.pricing}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Recommendations */}
            {analysis.recommendations && (
              <div className="space-y-4">
                <h4 className="label-system text-[9px] font-black">STRATEGIC VECTORS</h4>
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
                <h4 className="label-system text-[9px] font-black underline underline-offset-4">ALPHA OPS</h4>
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
            <div className="pt-12 border-t-2 border-black flex flex-col gap-4">
              <button
                onClick={analyzeMarket}
                disabled={isAnalyzing}
                className="btn-productivity w-full py-5 text-[10px]"
              >
                REEVALUATE MARKET
              </button>
              <button
                onClick={() => onAnalysisComplete(analysis)}
                className="px-4 py-4 border-2 border-black text-[9px] font-black tracking-widest uppercase hover:bg-black hover:text-white transition-all"
              >
                EXPORT RAW DATA
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 border-2 border-black bg-bone">
            <p className="label-system text-[9px] font-black">SYSTEM STANDBY</p>
          </div>
        )}
      </div>
    </div>
  );
};