import React from 'react';
import Link from 'next/link';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <header className="sticky top-0 z-50 border-b" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between" style={{ paddingLeft: 'var(--space-4)', paddingRight: 'var(--space-4)', height: 'var(--space-20)' }}>
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">
              Vzorkovník
            </span>
          </Link>
          <nav className="hidden md:flex items-center" style={{ gap: 'var(--space-8)' }}>
            <Link href="/" className="text-sm font-medium transition-colors" style={{ color: 'var(--text-secondary)' }}>
              Projekty
            </Link>
            <Link href="/enterprise" className="text-sm font-bold transition-colors flex items-center" style={{ color: 'var(--primary-600)' }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--primary-500)', marginRight: 'var(--space-1-5, 6px)' }}></span>
              Enterprise
            </Link>
            <Link href="/content-generator" className="text-sm font-medium transition-colors" style={{ color: 'var(--text-secondary)' }}>
              Content AI
            </Link>
            <a href="#" className="text-sm font-medium transition-colors" style={{ color: 'var(--text-secondary)' }}>
              O nás
            </a>
            <a href="#" className="text-sm font-medium transition-colors" style={{ color: 'var(--text-secondary)' }}>
              Kontakt
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="border-t mt-auto" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-subtle)', paddingTop: 'var(--space-12)', paddingBottom: 'var(--space-12)' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between" style={{ paddingLeft: 'var(--space-4)', paddingRight: 'var(--space-4)' }}>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} JetEngine CCT PWA. Všetky práva vyhradené.
          </p>
          <div className="flex mt-4 md:mt-0" style={{ gap: 'var(--space-6)' }}>
            <a href="#" className="transition-colors" style={{ color: 'var(--text-muted)' }}>
              Facebook
            </a>
            <a href="#" className="transition-colors" style={{ color: 'var(--text-muted)' }}>
              Instagram
            </a>
            <a href="#" className="transition-colors" style={{ color: 'var(--text-muted)' }}>
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
