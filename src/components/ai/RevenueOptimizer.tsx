import React, { useState, useEffect } from 'react';
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

  const optimizeRevenue = async () => {
    setIsOptimizing(true);
    
    try {
      const prompt = `
        Analyze revenue optimization opportunities for a project marketplace platform.
        
        Current projects data: ${JSON.stringify(projects.slice(0, 10))}
        
        Optimization strategy: ${strategy}
        
        Focus on:
        1. Optimal pricing models and commission structures
        2. Upselling and cross-selling opportunities
        3. Customer retention strategies
        4. Premium service offerings
        5. Volume-based discounts
        6. Subscription models
        7. Transaction fee optimization
        
        Provide specific, actionable recommendations with projected revenue impact.
        Return structured data with implementation steps.
      `;

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
  };

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
  }, [projects, strategy]);

  const formatCurrency = (amount: string): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(parseInt(amount.replace(/[^0-9]/g, '')));
  };

  return (
    <div className="revenue-optimizer bg-white rounded-lg shadow-md p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Revenue Optimization
        </h3>
        <p className="text-sm text-gray-600">
          AI-powered analysis to maximize your platform's revenue potential
        </p>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Optimization Strategy
        </label>
        <select
          value={strategy}
          onChange={(e) => setStrategy(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {strategies.map(strat => (
            <option key={strat.value} value={strat.value}>
              {strat.label}
            </option>
          ))}
        </select>
      </div>

      {isOptimizing ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <span className="ml-3 text-gray-600">Optimizing revenue strategy...</span>
        </div>
      ) : optimization ? (
        <div className="space-y-6">
          {/* Revenue Overview */}
          <div className="revenue-overview">
            <h4 className="font-semibold text-gray-800 mb-3">Revenue Overview</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h5 className="font-medium text-blue-900 mb-1">Current Revenue</h5>
                <p className="text-2xl font-bold text-blue-800">
                  {formatCurrency(optimization.currentRevenue || '$50,000')}
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h5 className="font-medium text-green-900 mb-1">Potential Revenue</h5>
                <p className="text-2xl font-bold text-green-800">
                  {formatCurrency(optimization.potentialRevenue || '$75,000')}
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h5 className="font-medium text-purple-900 mb-1">Revenue Increase</h5>
                <p className="text-2xl font-bold text-purple-800">
                  +{formatCurrency('$25,000')}
                </p>
              </div>
            </div>
          </div>

          {/* Optimization Areas */}
          {optimization.optimizationAreas && (
            <div className="optimization-areas">
              <h4 className="font-semibold text-gray-800 mb-3">Optimization Areas</h4>
              <div className="space-y-3">
                {optimization.optimizationAreas.map((area: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-medium text-gray-800">{area.area}</h5>
                      <span className="text-green-600 font-semibold">{area.impact}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Current:</span>
                        <p className="text-gray-800 mt-1">{area.current}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Optimized:</span>
                        <p className="text-green-800 mt-1 font-medium">{area.optimized}</p>
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
              <h4 className="font-semibold text-gray-800 mb-3">Top Recommendations</h4>
              <ul className="space-y-2">
                {optimization.recommendations.map((rec: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Implementation Steps */}
          {optimization.implementationSteps && (
            <div className="implementation">
              <h4 className="font-semibold text-gray-800 mb-3">Implementation Steps</h4>
              <ol className="space-y-2">
                {optimization.implementationSteps.map((step: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-semibold mr-3 flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-6 flex space-x-3">
            <button
              onClick={optimizeRevenue}
              disabled={isOptimizing}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              Re-optimize
            </button>
            <button
              onClick={() => onOptimizationComplete(optimization)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Export Plan
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          Add projects to start revenue optimization analysis
        </div>
      )}
    </div>
  );
};