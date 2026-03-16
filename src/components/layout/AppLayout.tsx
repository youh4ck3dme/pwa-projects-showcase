'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Activity } from 'lucide-react';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'PROJEKTY', href: '/' },
    { label: 'CONTENT AI', href: '/content-generator' },
    { label: 'O NÁS', href: '#' },
    { label: 'KONTAKT', href: '#' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-black antialiased selection:bg-black selection:text-white">
      {/* Header - Fixed Grid Structure with Glassmorphism */}
      <header className="sticky top-0 z-50 glass-premium border-b-2 border-black">
        <div className="container-tight flex items-stretch h-20">
          {/* Logo Section */}
          <Link href="/" className="flex items-center pr-4 md:pr-8 border-r border-silver group">
            <div className="bg-black text-white p-2 mr-3 hidden sm:block">
              <Activity className="w-4 h-4" />
            </div>
            <span className="text-lg md:text-xl font-black tracking-tighter leading-none">
              LARSEN EVANS<span className="text-primary-600">.</span>
            </span>
          </Link>

          {/* Service Status - Operational Polish */}
          <div className="hidden xl:flex items-center px-6 border-r border-silver gap-4">
            <div className="flex flex-col">
              <span className="label-system text-[8px] text-silver leading-none">SESSION_MODE</span>
              <span className="text-[10px] font-black tracking-widest uppercase text-primary-600">PRODUCTION</span>
            </div>
            <div className="flex flex-col">
              <span className="label-system text-[8px] text-silver leading-none">SYSTEM_STATUS</span>
              <span className="text-[10px] font-black tracking-widest uppercase">STABLE_V4.2</span>
            </div>
          </div>

          {/* Desktop Nav - Built into the grid */}
          <nav className="hidden lg:flex flex-grow">
            {navItems.map((item, idx) => (
              <Link 
                key={idx} 
                href={item.href} 
                className="flex items-center px-6 text-[10px] font-bold tracking-[0.2em] border-r border-silver hover:bg-bone transition-all hover:text-primary-600"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions Section */}
          <div className="hidden md:flex items-center pl-6">
            <Link 
              href="/enterprise" 
              className="text-[10px] font-black tracking-widest border-2 border-black px-5 py-2 hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none translate-y-[-2px] hover:translate-y-0"
            >
              SCALE_RESOURCES
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden ml-auto px-6 border-l border-silver hover:bg-bone transition-colors"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu - Minimalist List */}
      <div 
        className={`fixed inset-0 bg-white z-40 transition-transform duration-300 md:hidden
        ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full pt-20">
          {navItems.map((item, idx) => (
            <Link 
              key={idx} 
              href={item.href} 
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-8 text-3xl font-black tracking-tighter border-b border-silver hover:bg-bone"
            >
              {item.label}
            </Link>
          ))}
          <Link 
            href="/enterprise" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-8 text-sm font-black tracking-widest bg-black text-white"
          >
            ENTERPRISE API
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer - Systematic Documentation Style */}
      <footer className="border-t-2 border-black bg-white mt-32">
        <div className="container-tight py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <span className="text-lg font-black tracking-tighter">LARSEN EVANS</span>
            <p className="label-system text-[9px] leading-relaxed max-w-xs">
              PROFESSIONAL PROJECT SHOWCASE AND AI INTEGRATION FRAMEWORK. BUILT FOR PRECISION AND PERFORMANCE.
            </p>
          </div>
          
          <div className="flex flex-col space-y-2">
            <span className="label-system text-[9px] mb-2">Navigation</span>
            {navItems.map((item, idx) => (
              <Link key={idx} href={item.href} className="text-[10px] font-bold hover:underline">
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col space-y-2">
            <span className="label-system text-[9px] mb-2">Compliance</span>
            <span className="text-[10px] font-medium">© {new Date().getFullYear()} CCT PWA V4.0</span>
            <span className="text-[10px] font-medium">ALL RIGHTS RESERVED.</span>
            <div className="flex gap-4 pt-4">
              {['FB', 'IG', 'LI'].map((social) => (
                <a key={social} href="#" className="text-[10px] font-black hover:underline">{social}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
