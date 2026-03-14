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
    <div className="search-assistant bg-white rounded-lg shadow-md p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          AI Search Assistant
        </h3>
        <p className="text-sm text-gray-600">
          Get intelligent search suggestions and enhanced results
        </p>
      </div>

      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch(query)}
            placeholder="Describe what you're looking for..."
            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={() => handleSearch(query)}
            disabled={!query.trim() || isAnalyzing}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? 'Analyzing...' : 'Search'}
          </button>
        </div>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="suggestions">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Popular searches:</h4>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Context Builder */}
        <div className="context-builder">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Add context:</h4>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setContext([...context, 'Looking for urgent projects'])}
              className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm hover:bg-green-200"
            >
              Urgent
            </button>
            <button
              onClick={() => setContext([...context, 'Budget under $5000'])}
              className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm hover:bg-purple-200"
            >
              Budget-friendly
            </button>
            <button
              onClick={() => setContext([...context, 'Requires React expertise'])}
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200"
            >
              React required
            </button>
          </div>
          {context.length > 0 && (
            <div className="mt-2 text-sm text-gray-600">
              Context: {context.join(', ')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};