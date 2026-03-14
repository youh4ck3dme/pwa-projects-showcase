'use client';

import React, { useState } from 'react';
import type { ProjectCCT } from '@/types/project';
import { RevenueOptimizer } from '@/components/ai/RevenueOptimizer';

interface ProjectDetailClientProps {
  project: ProjectCCT;
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const [showAI, setShowAI] = useState(false);

  return (
    <div className="relative">
      {/* Floating AI Action Button */}
      <button
        onClick={() => setShowAI(!showAI)}
        className="fixed bottom-8 right-8 z-50 p-4 bg-primary-600 text-white rounded-full shadow-2xl hover:bg-primary-700 transition-all transform hover:scale-110 flex items-center space-x-2"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <span className="font-bold">AI Asistent</span>
      </button>

      {/* AI Panel Overlay */}
      {showAI && (
        <div className="fixed inset-0 z-40 flex items-center justify-end p-4 bg-black/20 backdrop-blur-sm">
          <div className="w-full max-w-lg h-[80vh] bg-white rounded-3xl shadow-2xl overflow-y-auto relative animate-in slide-in-from-right duration-300">
            <button 
              onClick={() => setShowAI(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="p-8">
              <RevenueOptimizer 
                projects={[project]} 
                onOptimizationComplete={(opt) => console.log('Optimization Complete:', opt)} 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
