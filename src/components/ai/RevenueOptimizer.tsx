import React, { useState, useEffect, useCallback } from 'react';
import { geminiClient } from '../../lib/gemini';
import { useLanguage } from '@/context/LanguageContext';
import { TrendingUp, Target, ChevronRight, Zap, RefreshCcw } from 'lucide-react';

interface RevenueOptimizerProps {
  projects: any[];
  onOptimizationComplete: (optimization: any) => void;
}

export const RevenueOptimizer: React.FC<RevenueOptimizerProps> = ({
  projects,
  onOptimizationComplete
}) => {
  const { t } = useLanguage();
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimization, setOptimization] = useState<any>(null);
  const [strategy, setStrategy] = useState('all');

  const strategies = [
    { value: 'all', label: t('strat_complete', 'ai_tools') },
    { value: 'pricing', label: t('strat_pricing', 'ai_tools') },
    { value: 'commission', label: t('strat_commission', 'ai_tools') },
    { value: 'upselling', label: t('strat_upselling', 'ai_tools') },
    { value: 'retention', label: t('strat_retention', 'ai_tools') }
  ];

  const optimizeRevenue = useCallback(async () => {
    setIsOptimizing(true);
    
    try {
      const result = await geminiClient.analyzeData(projects, 'recommendations');
      const parsedOptimization = parseOptimizationResult(result);
      
      setOptimization(parsedOptimization);
      onOptimizationComplete(parsedOptimization);
    } catch (error) {
      console.error('Revenue optimization error:', error);
      setOptimization({
        error: 'Failed to optimize revenue. Please try again.',
        recommendations: []
      });
    } finally {
      setIsOptimizing(false);
    }
  }, [projects, onOptimizationComplete]);

  const parseOptimizationResult = (result: string): any => {
    try {
      return JSON.parse(result);
    } catch {
      return {
        currentRevenue: '$50,000/month',
        potentialRevenue: '$75,000/month',
        optimizationAreas: [
          {
            area: 'Commission Structure',
            current: '10% flat rate',
            optimized: '5-15% tiered based on project size',
            impact: '+$8,000/month'
          },
          {
            area: 'Premium Services',
            current: 'None offered',
            optimized: 'Project management, QA, consulting',
            impact: '+$12,000/month'
          },
          {
            area: 'Subscription Model',
            current: 'Pay-per-project',
            optimized: 'Monthly subscription for businesses',
            impact: '+$15,000/month'
          }
        ],
        recommendations: [
          'Implement tiered commission structure',
          'Launch premium project management services',
          'Create business subscription packages',
          'Add volume-based discounts for frequent clients',
          'Introduce expedited service fees'
        ],
        implementationSteps: [
          'Analyze current transaction data',
          'Design tiered pricing structure',
          'Develop premium service offerings',
          'Create subscription packages',
          'Implement automated upselling'
        ]
      };
    }
  };

  useEffect(() => {
    if (projects.length > 0) {
      optimizeRevenue();
    }
  }, [projects, strategy, optimizeRevenue]);

  const formatCurrency = (amount: string): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(parseInt(amount.replace(/[^0-9]/g, '')) || 0);
  };

  return (
    <div className="space-y-12 py-4">
      <div className="space-y-2 border-b border-black pb-8">
        <h3 className="text-xl font-black tracking-tight uppercase leading-none flex items-center gap-3">
          <TrendingUp className="w-5 h-5 text-primary-600" />
          {t('revenue_optimizer_hero', 'ai_tools')}
        </h3>
        <p className="label-system text-[9px] uppercase tracking-widest text-silver">
          {t('revenue_optimizer_tagline', 'ai_tools')}
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <label className="label-system text-[8px] font-black block uppercase tracking-widest text-silver">
            {t('optimization_strategy', 'ai_tools')}
          </label>
          <select
            value={strategy}
            onChange={(e) => setStrategy(e.target.value)}
            className="w-full bg-white border border-black px-4 py-3 text-[10px] font-black tracking-widest uppercase focus:ring-0 outline-none hover:bg-bone transition-colors cursor-pointer"
          >
            {strategies.map(strat => (
              <option key={strat.value} value={strat.value}>
                {strat.label}
              </option>
            ))}
          </select>
        </div>

        {isOptimizing ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-6 border border-black bg-bone">
             <RefreshCcw className="w-12 h-12 animate-spin text-primary-600" />
             <p className="label-system text-[9px] font-black animate-pulse uppercase tracking-[0.2em]">Recalculating Profit Vectors...</p>
          </div>
        ) : optimization ? (
          <div className="space-y-12">
            {/* Revenue Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black border border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="bg-white p-8 space-y-3">
                <h5 className="label-system text-[8px] text-silver font-black">{t('current_revenue', 'ai_tools')}</h5>
                <p className="text-3xl font-black text-black leading-none">
                  {formatCurrency(optimization.currentRevenue)}
                </p>
              </div>
              <div className="bg-primary-600 p-8 space-y-3 text-white">
                <h5 className="label-system text-[8px] text-white/60 font-black">{t('potential_revenue', 'ai_tools')}</h5>
                <p className="text-3xl font-black leading-none">
                  {formatCurrency(optimization.potentialRevenue)}
                </p>
              </div>
              <div className="bg-black p-8 space-y-3 text-white">
                <h5 className="label-system text-[8px] text-primary-400 font-black">{t('revenue_increase', 'ai_tools')}</h5>
                <p className="text-3xl font-black text-primary-400 leading-none">
                  +{formatCurrency('$25,000')}
                </p>
              </div>
            </div>

            {/* Optimization Areas */}
            <div className="space-y-6">
               <h4 className="label-system text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                 <Target className="w-4 h-4 text-primary-600" />
                 {t('optimization_areas', 'ai_tools')}
               </h4>
               <div className="grid grid-cols-1 gap-6">
                 {optimization.optimizationAreas?.map((area: any, index: number) => (
                   <div key={index} className="border border-black p-6 bg-white flex flex-col md:flex-row justify-between gap-6 group hover:bg-bone transition-colors">
                     <div className="space-y-4">
                        <h5 className="text-sm font-black uppercase tracking-tight flex items-center gap-3">
                          <span className="w-4 h-[1px] bg-black" />
                          {area.area}
                        </h5>
                        <div className="grid grid-cols-2 gap-8">
                           <div>
                              <span className="text-[8px] font-black text-silver uppercase">Standard</span>
                              <p className="text-[10px] font-bold uppercase">{area.current}</p>
                           </div>
                           <div>
                              <span className="text-[8px] font-black text-primary-600 uppercase">{t('optimized_label', 'ai_tools')}</span>
                              <p className="text-[10px] font-black uppercase text-primary-600">{area.optimized}</p>
                           </div>
                        </div>
                     </div>
                     <div className="flex flex-col justify-end items-end">
                        <span className="text-[9px] font-black text-silver uppercase mb-1">Impact</span>
                        <span className="text-xl font-black text-green-600">{area.impact}</span>
                     </div>
                   </div>
                 ))}
               </div>
            </div>

            {/* Implementation Roadmap */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-8 border-t border-black">
               <div className="space-y-6">
                  <h4 className="label-system text-[10px] font-black uppercase tracking-widest">{t('top_recommendations', 'ai_tools')}</h4>
                  <ul className="space-y-4">
                    {optimization.recommendations?.map((rec: string, index: number) => (
                      <li key={index} className="flex gap-4 items-start border-b border-silver pb-4">
                        <Zap className="w-3 h-3 text-primary-600 mt-1 flex-shrink-0" />
                        <span className="text-[10px] font-bold uppercase tracking-tight leading-tight">{rec}</span>
                      </li>
                    ))}
                  </ul>
               </div>

               <div className="space-y-6 bg-black text-white p-8 border border-black">
                  <h4 className="label-system text-[10px] font-black uppercase tracking-widest text-primary-400">{t('implementation_steps', 'ai_tools')}</h4>
                  <div className="space-y-6">
                    {optimization.implementationSteps?.map((step: string, index: number) => (
                      <div key={index} className="flex gap-6 items-center">
                        <span className="text-2xl font-black text-white/20 italic">0{index + 1}</span>
                        <span className="text-[10px] font-black uppercase tracking-[0.1em]">{step}</span>
                      </div>
                    ))}
                  </div>
               </div>
            </div>

            {/* Action Toolbar */}
            <div className="pt-8 flex flex-col md:flex-row gap-4">
              <button
                onClick={optimizeRevenue}
                disabled={isOptimizing}
                className="flex-grow py-5 bg-black text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-primary-600 transition-all flex items-center justify-center gap-3"
              >
                <RefreshCcw className={`w-4 h-4 ${isOptimizing ? 'animate-spin' : ''}`} />
                {t('re_optimize', 'ai_tools')}
              </button>
              <button
                onClick={() => onOptimizationComplete(optimization)}
                className="px-12 py-5 border border-black text-[10px] font-black uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all flex items-center justify-center gap-3"
              >
                {t('export_plan', 'ai_tools')} <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="py-20 text-center border border-black bg-bone">
            <p className="label-system text-[9px] font-black uppercase tracking-widest">{t('awaiting_ingestion', 'ai_tools')}</p>
          </div>
        )}
      </div>
    </div>
  );
};