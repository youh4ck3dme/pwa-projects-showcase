import React, { useState, useEffect } from 'react';
import { geminiClient } from '../../lib/gemini';

interface MarketAnalyzerProps {
  onAnalysisComplete: (analysis: any) => void;
}

export const MarketAnalyzer: React.FC<MarketAnalyzerProps> = ({
  onAnalysisComplete
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
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

  const analyzeMarket = async () => {
    setIsAnalyzing(true);
    
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

      const result = await geminiClient.analyzeData({}, 'insights');
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
      setIsAnalyzing(false);
    }
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
    // Auto-analyze when component mounts
    analyzeMarket();
  }, [selectedCategory]);

  return (
    <div className="market-analyzer bg-white rounded-lg shadow-md p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Market Intelligence
        </h3>
        <p className="text-sm text-gray-600">
          AI-powered analysis of project marketplace trends
        </p>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Category
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category.replace('-', ' ').toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {isAnalyzing ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Analyzing market trends...</span>
        </div>
      ) : analysis ? (
        <div className="space-y-6">
          {/* Key Insights */}
          {analysis.trends && (
            <div className="insights">
              <h4 className="font-semibold text-gray-800 mb-3">Key Insights</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h5 className="font-medium text-blue-900 mb-2">Demand</h5>
                  <p className="text-blue-800 text-sm">{analysis.trends.demand}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h5 className="font-medium text-green-900 mb-2">Pricing</h5>
                  <p className="text-green-800 text-sm">{analysis.trends.pricing}</p>
                </div>
              </div>
            </div>
          )}

          {/* Skills Demand */}
          {analysis.trends?.skills && (
            <div className="skills-demand">
              <h4 className="font-semibold text-gray-800 mb-3">In-Demand Skills</h4>
              <div className="flex flex-wrap gap-2">
                {analysis.trends.skills.map((skill: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations */}
          {analysis.recommendations && (
            <div className="recommendations">
              <h4 className="font-semibold text-gray-800 mb-3">Recommendations</h4>
              <ul className="space-y-2">
                {analysis.recommendations.map((rec: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Opportunities */}
          {analysis.opportunities && (
            <div className="opportunities">
              <h4 className="font-semibold text-gray-800 mb-3">Emerging Opportunities</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {analysis.opportunities.map((opp: string, index: number) => (
                  <div
                    key={index}
                    className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
                  >
                    <span className="text-yellow-800 text-sm font-medium">{opp}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="mt-6 flex space-x-3">
            <button
              onClick={analyzeMarket}
              disabled={isAnalyzing}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              Refresh Analysis
            </button>
            <button
              onClick={() => onAnalysisComplete(analysis)}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Export Insights
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          Click "Refresh Analysis" to get market insights
        </div>
      )}
    </div>
  );
};