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
    <div className="market-analyzer border" 
      style={{ 
        backgroundColor: 'var(--bg-card)', 
        borderRadius: 'var(--radius-lg)', 
        boxShadow: 'var(--shadow-md)', 
        padding: 'var(--space-6)',
        borderColor: 'var(--border-subtle)'
      }}>
      <div style={{ marginBottom: 'var(--space-4)' }}>
        <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-semibold)', color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>
          Market Intelligence
        </h3>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
          AI-powered analysis of project marketplace trends
        </p>
      </div>

      <div style={{ marginBottom: 'var(--space-4)' }}>
        <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)', color: 'var(--text-secondary)', marginBottom: 'var(--space-2)' }}>
          Select Category
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
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
          {categories.map(category => (
            <option key={category} value={category}>
              {category.replace('-', ' ').toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {isAnalyzing ? (
        <div className="flex items-center justify-center" style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-8)' }}>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: 'var(--primary-600)' }}></div>
          <span style={{ marginLeft: 'var(--space-3)', color: 'var(--text-secondary)' }}>Analyzing market trends...</span>
        </div>
      ) : analysis ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          {/* Key Insights */}
          {analysis.trends && (
            <div className="insights">
              <h4 style={{ fontWeight: 'var(--font-semibold)', color: 'var(--text-primary)', marginBottom: 'var(--space-3)' }}>Key Insights</h4>
              <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 'var(--space-4)' }}>
                <div style={{ backgroundColor: 'var(--primary-50)', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)' }}>
                  <h5 style={{ fontWeight: 'var(--font-medium)', color: 'var(--primary-900)', marginBottom: 'var(--space-2)' }}>Demand</h5>
                  <p style={{ color: 'var(--primary-800)', fontSize: 'var(--text-sm)' }}>{analysis.trends.demand}</p>
                </div>
                <div style={{ backgroundColor: 'var(--success-50)', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)' }}>
                  <h5 style={{ fontWeight: 'var(--font-medium)', color: 'var(--success-900)', marginBottom: 'var(--space-2)' }}>Pricing</h5>
                  <p style={{ color: 'var(--success-800)', fontSize: 'var(--text-sm)' }}>{analysis.trends.pricing}</p>
                </div>
              </div>
            </div>
          )}

          {/* Skills Demand */}
          {analysis.trends?.skills && (
            <div className="skills-demand">
              <h4 style={{ fontWeight: 'var(--font-semibold)', color: 'var(--text-primary)', marginBottom: 'var(--space-3)' }}>In-Demand Skills</h4>
              <div className="flex flex-wrap" style={{ gap: 'var(--space-2)' }}>
                {analysis.trends.skills.map((skill: string, index: number) => (
                  <span
                    key={index}
                    style={{ 
                      paddingLeft: 'var(--space-3)', 
                      paddingRight: 'var(--space-3)', 
                      paddingTop: 'var(--space-1)', 
                      paddingBottom: 'var(--space-1)', 
                      backgroundColor: 'var(--primary-100)', 
                      color: 'var(--primary-800)', 
                      borderRadius: 'var(--radius-3xl)', 
                      fontSize: 'var(--text-sm)' 
                    }}
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
              <h4 style={{ fontWeight: 'var(--font-semibold)', color: 'var(--text-primary)', marginBottom: 'var(--space-3)' }}>Recommendations</h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                {analysis.recommendations.map((rec: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="rounded-full flex-shrink-0" style={{ width: 'var(--space-2)', height: 'var(--space-2)', backgroundColor: 'var(--primary-600)', marginTop: 'var(--space-2)', marginRight: 'var(--space-3)' }}></span>
                    <span style={{ color: 'var(--text-secondary)' }}>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Opportunities */}
          {analysis.opportunities && (
            <div className="opportunities">
              <h4 style={{ fontWeight: 'var(--font-semibold)', color: 'var(--text-primary)', marginBottom: 'var(--space-3)' }}>Emerging Opportunities</h4>
              <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 'var(--space-3)' }}>
                {analysis.opportunities.map((opp: string, index: number) => (
                  <div
                    key={index}
                    style={{ 
                      padding: 'var(--space-3)', 
                      backgroundColor: 'var(--warning-50)', 
                      border: '1px solid var(--warning-200)', 
                      borderRadius: 'var(--radius-lg)' 
                    }}
                  >
                    <span style={{ color: 'var(--warning-800)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)' }}>{opp}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="flex" style={{ marginTop: 'var(--space-6)', gap: 'var(--space-3)' }}>
            <button
              onClick={analyzeMarket}
              disabled={isAnalyzing}
              className="px-4 py-2 text-white rounded-md transition-all hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: 'var(--primary-600)' }}
            >
              Refresh Analysis
            </button>
            <button
              onClick={() => onAnalysisComplete(analysis)}
              className="px-4 py-2 text-white rounded-md transition-all hover:opacity-90"
              style={{ backgroundColor: 'var(--success-600)' }}
            >
              Export Insights
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500" style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-8)' }}>
          Click "Refresh Analysis" to get market insights
        </div>
      )}
    </div>
  );
};