import React from 'react';
import Link from 'next/link';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
              Vzorkovník
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-medium text-gray-500 hover:text-primary-600 transition-colors">
              Projekty
            </Link>
            <Link href="/enterprise" className="text-sm font-medium text-primary-600 font-bold hover:text-primary-700 transition-colors flex items-center">
              <span className="w-2 h-2 bg-primary-500 rounded-full mr-1.5 animate-pulse"></span>
              Enterprise
            </Link>
            <Link href="/content-generator" className="text-sm font-medium text-gray-500 hover:text-primary-600 transition-colors">
              Content AI
            </Link>
            <a href="#" className="text-sm font-medium text-gray-500 hover:text-primary-600 transition-colors">
              O nás
            </a>
            <a href="#" className="text-sm font-medium text-gray-500 hover:text-primary-600 transition-colors">
              Kontakt
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-white border-t border-gray-100 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-gray-400">
            © 2026 JetEngine CCT PWA. Všetky práva vyhradené.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
              Facebook
            </a>
            <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
              Instagram
            </a>
            <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
