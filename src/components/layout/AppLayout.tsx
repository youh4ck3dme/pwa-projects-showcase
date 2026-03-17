'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Activity } from 'lucide-react';
import { LanguageSwitcher } from '../molecules/LanguageSwitcher';
import { useLanguage } from '@/context/LanguageContext';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  const navItems = [
    { label: t('projects'), href: '/' },
    { label: t('content_ai'), href: '/content-generator' },
    { label: t('about'), href: '#' },
    { label: t('contact'), href: '#' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-black antialiased selection:bg-black selection:text-white">
      {/* Header - Fixed Grid Structure with Glassmorphism */}
      {/* Header - Fixed Grid Structure with Glassmorphism */}
      <header className="sticky top-0 z-50 glass-premium border-b-2 border-black h-20">
        <div className="container-tight flex items-stretch h-full">
          {/* Logo Section */}
          <Link href="/" className="flex items-center pr-4 md:pr-10 border-r border-silver group">
            <motion.div 
              whileHover={{ rotate: 90 }}
              className="bg-black text-white p-2 mr-4 hidden sm:block"
            >
              <Activity className="w-4 h-4" />
            </motion.div>
            <span className="text-xl md:text-2xl font-black tracking-tighter leading-none">
              LARSEN EVANS<span className="text-primary-600">.</span>
            </span>
          </Link>

          {/* Service Status - Operational Polish */}
          <div className="hidden xl:flex items-center px-8 border-r border-silver gap-6">
            <div className="flex flex-col">
              <span className="label-system text-[8px] text-silver leading-none mb-1">SESSION_MODE</span>
              <span className="text-[10px] font-black tracking-widest uppercase text-primary-600">{t('production')}</span>
            </div>
            <div className="flex flex-col">
              <span className="label-system text-[8px] text-silver leading-none mb-1">SYSTEM_STATUS</span>
              <span className="text-[10px] font-black tracking-widest uppercase">{t('stable')}_V5.2</span>
            </div>
          </div>

          {/* Desktop Nav - Built into the grid */}
          <nav className="hidden lg:flex flex-grow">
            {navItems.map((item, idx) => (
              <Link 
                key={idx} 
                href={item.href} 
                className="flex items-center px-8 text-[10px] font-bold tracking-[0.2em] border-r border-silver hover:bg-bone transition-all hover:text-primary-600 relative group overflow-hidden"
              >
                <span className="relative z-10">{item.label}</span>
                <motion.div 
                  initial={{ y: '100%' }}
                  whileHover={{ y: 0 }}
                  className="absolute inset-0 bg-primary-600/5 z-0"
                />
              </Link>
            ))}
          </nav>

          {/* Actions Section */}
          <div className="hidden md:flex items-center px-8 border-r border-silver gap-6">
            <LanguageSwitcher />
            <Link 
              href="/enterprise" 
              className="text-[10px] font-black tracking-widest border-2 border-black px-6 py-3 hover:bg-black hover:text-white transition-all shadow-[6px_6px_0px_0px_rgba(37,99,235,0.4)] hover:shadow-none translate-y-[-3px] hover:translate-y-0 active:translate-y-1"
            >
              {t('scale')}
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden ml-auto px-6 border-l border-silver hover:bg-bone transition-colors flex items-center justify-center"
            aria-label="Toggle Menu"
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </header>

      {/* Mobile Menu - Premium Framer Motion Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-40 md:hidden"
          >
            <Link 
                  href="/admin" 
                  className="hidden sm:flex items-center gap-2 group"
                >
                  <div className="w-4 h-4 rounded border border-charcoal/20 flex items-center justify-center group-hover:bg-black group-hover:border-black transition-all">
                     <span className="text-[7px] font-black group-hover:text-white transition-colors">A</span>
                  </div>
                </Link>
                <div className="hidden sm:flex flex-col text-right items-end justify-center">
            <div className="flex flex-col h-full pt-32 p-8">
              <div className="space-y-4">
                <span className="label-system text-[10px] text-silver block mb-8">SYSTEM_NAVIGATION / v5.0</span>
                {navItems.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Link 
                      href={item.href} 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-5xl font-black tracking-tighter hover:text-primary-600 transition-colors uppercase"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-auto"
              >
                <Link 
                  href="/enterprise" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block p-8 text-xl font-black tracking-widest bg-black text-white text-center hover:bg-primary-600 transition-colors uppercase shadow-[8px_8px_0px_0px_rgba(37,99,235,0.3)]"
                >
                  ENTERPRISE API_CORE
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content with Page Transitions */}
      <main className="flex-grow relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={typeof window !== 'undefined' ? window.location.pathname : 'initial'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Elite Finish: Grain Overlay */}
      <div className="noise-overlay" />

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
