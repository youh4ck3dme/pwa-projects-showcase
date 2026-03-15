import React, { useState, useEffect } from 'react';
import { geminiClient } from '../../lib/gemini';
import { projectAPI, ProjectData, ProjectAPI } from '../../lib/api';

interface SearchAssistantProps {
  onSearchResults: (results: ProjectData[]) => void;
  onLoading: (loading: boolean) => void;
}

export const SearchAssistant: React.FC<SearchAssistantProps> = ({
  onSearchResults,
  onLoading
}) => {
  const [query, setQuery] = useState('');
  const [context, setContext] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    // Generate initial suggestions based on common project types
    generateSuggestions();
  }, []);

  const generateSuggestions = async () => {
    try {
      const prompt = `
        Generate 5 search suggestions for a project marketplace platform.
        Focus on popular project categories, technologies, and business needs.
        Return as a JSON array of strings.
      `;
      
      const result = await geminiClient.generateContent(prompt);
      const parsed = JSON.parse(result);
      
      if (Array.isArray(parsed)) {
        setSuggestions(parsed);
      }
    } catch (error) {
      setSuggestions([
        'Web development projects',
        'Mobile app development',
        'AI and machine learning projects',
        'E-commerce solutions',
        'Business automation tools'
      ]);
    }
  };

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);
    onLoading(true);
    setIsAnalyzing(true);

    try {
      // Use Gemini to analyze and enhance the search query
      const enhancedQuery = await geminiClient.generateContent(
        `Enhance this search query for better project matching: "${searchQuery}". 
        Return the enhanced query only.`,
        context
      );

      // Search for projects
      const results = await ProjectAPI.searchProjects({
        query: enhancedQuery,
        category: extractCategory(enhancedQuery),
        skills: extractSkills(enhancedQuery)
      });

      onSearchResults(results.projects);
    } catch (error) {
      console.error('Search error:', error);
      onSearchResults([]);
    } finally {
      onLoading(false);
      setIsAnalyzing(false);
    }
  };

  const extractCategory = (query: string): string | undefined => {
    const categories = ['web', 'mobile', 'ai', 'ml', 'ecommerce', 'automation', 'design'];
    const lowerQuery = query.toLowerCase();
    
    for (const category of categories) {
      if (lowerQuery.includes(category)) {
        return category;
      }
    }
    return undefined;
  };

  const extractSkills = (query: string): string[] => {
    const skills = ['javascript', 'python', 'react', 'node.js', 'aws', 'docker', 'kubernetes'];
    const lowerQuery = query.toLowerCase();
    const foundSkills: string[] = [];
    
    for (const skill of skills) {
      if (lowerQuery.includes(skill)) {
        foundSkills.push(skill);
      }
    }
    
    return foundSkills;
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSearch(suggestion);
  };

  return (
    <div className="search-assistant border" 
      style={{ 
        backgroundColor: 'var(--bg-card)', 
        borderRadius: 'var(--radius-lg)', 
        boxShadow: 'var(--shadow-md)', 
        padding: 'var(--space-6)',
        borderColor: 'var(--border-subtle)'
      }}>
      <div style={{ marginBottom: 'var(--space-4)' }}>
        <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-semibold)', color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>
          AI Search Assistant
        </h3>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
          Get intelligent search suggestions and enhanced results
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch(query)}
            placeholder="Describe what you're looking for..."
            className="w-full pr-12 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            style={{ 
              paddingLeft: 'var(--space-4)', 
              paddingRight: 'var(--space-12)', 
              paddingTop: 'var(--space-3)', 
              paddingBottom: 'var(--space-3)', 
              border: '1px solid var(--border-strong)', 
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--bg-primary)',
              color: 'var(--text-primary)'
            }}
          />
          <button
            onClick={() => handleSearch(query)}
            disabled={!query.trim() || isAnalyzing}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ 
              backgroundColor: 'var(--primary-600)', 
              paddingLeft: 'var(--space-4)', 
              paddingRight: 'var(--space-4)', 
              paddingTop: 'var(--space-1)', 
              paddingBottom: 'var(--space-1)', 
              borderRadius: 'var(--radius-md)' 
            }}
          >
            {isAnalyzing ? 'Analyzing...' : 'Search'}
          </button>
        </div>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="suggestions">
            <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)', color: 'var(--text-secondary)', marginBottom: 'var(--space-2)' }}>Popular searches:</h4>
            <div className="flex flex-wrap" style={{ gap: 'var(--space-2)' }}>
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="transition-colors"
                  style={{ 
                    paddingLeft: 'var(--space-3)', 
                    paddingRight: 'var(--space-3)', 
                    paddingTop: 'var(--space-1)', 
                    paddingBottom: 'var(--space-1)', 
                    backgroundColor: 'var(--bg-tertiary)', 
                    color: 'var(--text-primary)', 
                    borderRadius: 'var(--radius-3xl)', 
                    fontSize: 'var(--text-sm)',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Context Builder */}
        <div className="context-builder">
          <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)', color: 'var(--text-secondary)', marginBottom: 'var(--space-2)' }}>Add context:</h4>
          <div className="flex flex-wrap" style={{ gap: 'var(--space-2)' }}>
            <button
              onClick={() => setContext([...context, 'Looking for urgent projects'])}
              style={{ 
                paddingLeft: 'var(--space-3)', 
                paddingRight: 'var(--space-3)', 
                paddingTop: 'var(--space-1)', 
                paddingBottom: 'var(--space-1)', 
                backgroundColor: 'var(--success-50)', 
                color: 'var(--success-700)', 
                borderRadius: 'var(--radius-3xl)', 
                fontSize: 'var(--text-sm)',
                border: '1px solid var(--success-200)'
              }}
            >
              Urgent
            </button>
            <button
              onClick={() => setContext([...context, 'Budget under $5000'])}
              style={{ 
                paddingLeft: 'var(--space-3)', 
                paddingRight: 'var(--space-3)', 
                paddingTop: 'var(--space-1)', 
                paddingBottom: 'var(--space-1)', 
                backgroundColor: 'var(--primary-50)', 
                color: 'var(--primary-700)', 
                borderRadius: 'var(--radius-3xl)', 
                fontSize: 'var(--text-sm)',
                border: '1px solid var(--primary-200)'
              }}
            >
              Budget-friendly
            </button>
            <button
              onClick={() => setContext([...context, 'Requires React expertise'])}
              style={{ 
                paddingLeft: 'var(--space-3)', 
                paddingRight: 'var(--space-3)', 
                paddingTop: 'var(--space-1)', 
                paddingBottom: 'var(--space-1)', 
                backgroundColor: 'var(--secondary-50)', 
                color: 'var(--secondary-700)', 
                borderRadius: 'var(--radius-3xl)', 
                fontSize: 'var(--text-sm)',
                border: '1px solid var(--secondary-200)'
              }}
            >
              React required
            </button>
          </div>
          {context.length > 0 && (
            <div style={{ marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
              Context: {context.join(', ')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};