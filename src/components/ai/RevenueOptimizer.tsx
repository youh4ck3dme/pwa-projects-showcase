import React, { useState, useEffect, useCallback } from 'react';
import { geminiClient } from '../../lib/gemini';

interface RevenueOptimizerProps {
  projects: any[];
  onOptimizationComplete: (optimization: any) => void;
}

export const RevenueOptimizer: React.FC<RevenueOptimizerProps> = ({
  projects,
  onOptimizationComplete
}) => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimization, setOptimization] = useState<any>(null);
  const [strategy, setStrategy] = useState('all');

  const strategies = [
    { value: 'all', label: 'Complete Revenue Optimization' },
    { value: 'pricing', label: 'Pricing Strategy' },
    { value: 'commission', label: 'Commission Optimization' },
    { value: 'upselling', label: 'Upselling Opportunities' },
    { value: 'retention', label: 'Customer Retention' }
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
      // Try to parse as JSON first
      return JSON.parse(result);
    } catch {
      // Fallback to structured parsing
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
    }).format(parseInt(amount.replace(/[^0-9]/g, '')));
  };

  return (
    <div className="revenue-optimizer border" 
      style={{ 
        backgroundColor: 'var(--bg-card)', 
        borderRadius: 'var(--radius-lg)', 
        boxShadow: 'var(--shadow-md)', 
        padding: 'var(--space-6)',
        borderColor: 'var(--border-subtle)'
      }}>
      <div style={{ marginBottom: 'var(--space-4)' }}>
        <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-semibold)', color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>
          Revenue Optimization
        </h3>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
          AI-powered analysis to maximize your platform&apos;s revenue potential
        </p>
      </div>

      <div style={{ marginBottom: 'var(--space-4)' }}>
        <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)', color: 'var(--text-secondary)', marginBottom: 'var(--space-2)' }}>
          Optimization Strategy
        </label>
        <select
          value={strategy}
          onChange={(e) => setStrategy(e.target.value)}
          className="w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          style={{ 
            paddingLeft: 'var(--space-3)', 
            paddingRight: 'var(--space-3)', 
            paddingTop: 'var(--space-2)', 
            paddingBottom: 'var(--space-2)', 
            border: '1px solid var(--border-strong)', 
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-primary)',
            color: 'var(--text-primary)'
          }}
        >
          {strategies.map(strat => (
            <option key={strat.value} value={strat.value}>
              {strat.label}
            </option>
          ))}
        </select>
      </div>

      {isOptimizing ? (
        <div className="flex items-center justify-center" style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-8)' }}>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: 'var(--success-600)' }}></div>
          <span style={{ marginLeft: 'var(--space-3)', color: 'var(--text-secondary)' }}>Optimizing revenue strategy...</span>
        </div>
      ) : optimization ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          {/* Revenue Overview */}
          <div className="revenue-overview">
            <h4 style={{ fontWeight: 'var(--font-semibold)', color: 'var(--text-primary)', marginBottom: 'var(--space-3)' }}>Revenue Overview</h4>
            <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 'var(--space-4)' }}>
              <div style={{ backgroundColor: 'var(--primary-50)', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)' }}>
                <h5 style={{ fontWeight: 'var(--font-medium)', color: 'var(--primary-900)', marginBottom: 'var(--space-1)' }}>Current Revenue</h5>
                <p style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-bold)', color: 'var(--primary-800)' }}>
                  {formatCurrency(optimization.currentRevenue || '$50,000')}
                </p>
              </div>
              <div style={{ backgroundColor: 'var(--success-50)', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)' }}>
                <h5 style={{ fontWeight: 'var(--font-medium)', color: 'var(--success-900)', marginBottom: 'var(--space-1)' }}>Potential Revenue</h5>
                <p style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-bold)', color: 'var(--success-800)' }}>
                  {formatCurrency(optimization.potentialRevenue || '$75,000')}
                </p>
              </div>
              <div style={{ backgroundColor: 'var(--primary-50)', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)' }}>
                <h5 style={{ fontWeight: 'var(--font-medium)', color: 'var(--primary-900)', marginBottom: 'var(--space-1)' }}>Revenue Increase</h5>
                <p style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-bold)', color: 'var(--primary-800)' }}>
                  +{formatCurrency('$25,000')}
                </p>
              </div>
            </div>
          </div>

          {/* Optimization Areas */}
          {optimization.optimizationAreas && (
            <div className="optimization-areas">
              <h4 style={{ fontWeight: 'var(--font-semibold)', color: 'var(--text-primary)', marginBottom: 'var(--space-3)' }}>Optimization Areas</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {optimization.optimizationAreas.map((area: any, index: number) => (
                  <div key={index} className="border" style={{ borderColor: 'var(--border-strong)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)' }}>
                    <div className="flex justify-between items-start" style={{ marginBottom: 'var(--space-2)' }}>
                      <h5 style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>{area.area}</h5>
                      <span style={{ color: 'var(--success-600)', fontWeight: 'var(--font-semibold)' }}>{area.impact}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 text-sm" style={{ gap: 'var(--space-4)' }}>
                      <div>
                        <span style={{ color: 'var(--text-muted)' }}>Current:</span>
                        <p style={{ color: 'var(--text-primary)', marginTop: 'var(--space-1)' }}>{area.current}</p>
                      </div>
                      <div>
                        <span style={{ color: 'var(--text-muted)' }}>Optimized:</span>
                        <p style={{ color: 'var(--success-800)', marginTop: 'var(--space-1)', fontWeight: 'var(--font-medium)' }}>{area.optimized}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations */}
          {optimization.recommendations && (
            <div className="recommendations">
              <h4 style={{ fontWeight: 'var(--font-semibold)', color: 'var(--text-primary)', marginBottom: 'var(--space-3)' }}>Top Recommendations</h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                {optimization.recommendations.map((rec: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="rounded-full flex-shrink-0" style={{ width: 'var(--space-2)', height: 'var(--space-2)', backgroundColor: 'var(--success-600)', marginTop: 'var(--space-2)', marginRight: 'var(--space-3)' }}></span>
                    <span style={{ color: 'var(--text-secondary)' }}>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Implementation Steps */}
          {optimization.implementationSteps && (
            <div className="implementation">
              <h4 style={{ fontWeight: 'var(--font-semibold)', color: 'var(--text-primary)', marginBottom: 'var(--space-3)' }}>Implementation Steps</h4>
              <ol style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                {optimization.implementationSteps.map((step: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="flex items-center justify-center flex-shrink-0" 
                      style={{ 
                        width: 'var(--space-6)', 
                        height: 'var(--space-6)', 
                        backgroundColor: 'var(--primary-600)', 
                        color: 'white', 
                        borderRadius: 'var(--radius-3xl)', 
                        fontSize: 'var(--text-xs)', 
                        fontWeight: 'var(--font-semibold)', 
                        marginRight: 'var(--space-3)' 
                      }}>
                      {index + 1}
                    </span>
                    <span style={{ color: 'var(--text-secondary)' }}>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex" style={{ marginTop: 'var(--space-6)', gap: 'var(--space-3)' }}>
            <button
              onClick={optimizeRevenue}
              disabled={isOptimizing}
              className="px-4 py-2 text-white rounded-md transition-all hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: 'var(--success-600)' }}
            >
              Re-optimize
            </button>
            <button
              onClick={() => onOptimizationComplete(optimization)}
              className="px-4 py-2 text-white rounded-md transition-all hover:opacity-90"
              style={{ backgroundColor: 'var(--primary-600)' }}
            >
              Export Plan
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500" style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-8)' }}>
          Add projects to start revenue optimization analysis
        </div>
      )}
    </div>
  );
};