'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Briefcase, Zap, Info, Phone, LayoutDashboard } from 'lucide-react';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle body scroll locking when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Nav Items Data
  const navItems = [
    { label: 'Projekty', href: '/', icon: <LayoutDashboard size={18} /> },
    { label: 'Content AI', href: '/content-generator', icon: <Zap size={18} /> },
    { label: 'O nás', href: '#', icon: <Info size={18} /> },
    { label: 'Kontakt', href: '#', icon: <Phone size={18} /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0f172a] text-slate-200 antialiased selection:bg-cyan-500 selection:text-white relative">
      <style dangerouslySetInnerHTML={{
        __html: `
        :root {
           /* Ensure scrollbar looks OK on default layout */
           scrollbar-width: thin;
           scrollbar-color: #334155 transparent;
        }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(51, 65, 85, 0.8); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(71, 85, 105, 1); }
      `}} />

      {/* Header */}
      <header 
        className={`sticky top-0 z-50 transition-all duration-300 border-b ${
          scrolled 
            ? 'bg-[#0f172a]/80 backdrop-blur-xl border-cyan-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' 
            : 'bg-[#0f172a]/50 backdrop-blur-sm border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group relative z-50">
            <div className="relative w-10 h-10 lg:w-12 lg:h-12 rounded-[12px] bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.3)] border border-white/20 group-hover:scale-105 transition-transform duration-300 overflow-hidden shrink-0">
               <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent opacity-60"></div>
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-6 h-6 lg:w-7 lg:h-7 relative z-10 drop-shadow-lg group-hover:scale-110 transition-transform">
                   <path d="M50 20 L80 45 L50 80 L20 45 Z" fill="white" fillOpacity="0.1" stroke="white" strokeWidth="6" strokeLinejoin="round" />
                   <path d="M50 20 L50 80" stroke="white" strokeWidth="6" strokeLinecap="round" />
                   <path d="M20 45 L80 45" stroke="white" strokeWidth="6" strokeLinecap="round" />
                   <circle cx="50" cy="20" r="7" fill="#0f172a" stroke="white" strokeWidth="3" />
                   <circle cx="80" cy="45" r="7" fill="#0f172a" stroke="white" strokeWidth="3" />
                   <circle cx="50" cy="80" r="7" fill="#0f172a" stroke="white" strokeWidth="3" />
                   <circle cx="20" cy="45" r="7" fill="#0f172a" stroke="white" strokeWidth="3" />
               </svg>
            </div>
            <span className="text-2xl lg:text-3xl font-black tracking-tight bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent transform group-hover:scale-105 transition-transform duration-300 hidden sm:block">
              JetEngine
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item, idx) => (
              <Link 
                key={idx} 
                href={item.href} 
                className="flex items-center gap-2 px-3 lg:px-4 py-2 rounded-xl text-sm lg:text-base font-semibold text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all duration-200"
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
            
            <div className="w-px h-6 bg-slate-700/60 mx-1 lg:mx-2"></div>
            
            {/* Enterprise Badge Link */}
            <Link 
              href="/enterprise" 
              className="group relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-slate-900 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] overflow-hidden"
            >
              <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
              <Briefcase size={18} className="relative z-10" />
              <span className="relative z-10 uppercase tracking-widest">Enterprise</span>
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative z-50 p-2 text-cyan-400 bg-slate-800/80 backdrop-blur border border-slate-700 hover:bg-slate-700 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-lg"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div 
          className={`fixed inset-0 min-h-[100dvh] bg-[#0f172a]/98 backdrop-blur-3xl z-40 transition-all duration-700 md:hidden flex flex-col
          ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        >
          {/* Animated Background Elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none translate-x-[20%] translate-y-[-20%]"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none translate-x-[-20%] translate-y-[20%]"></div>
          
          <div className="flex-1 flex flex-col justify-center px-6 py-24 gap-4 relative z-10 overflow-y-auto w-full max-w-sm mx-auto">
             {navItems.map((item, idx) => (
                <Link 
                  key={idx} 
                  href={item.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-4 text-2xl font-bold text-slate-200 hover:text-cyan-400 transition-all duration-500 p-4 rounded-2xl bg-white/5 hover:bg-slate-800/80 border border-transparent hover:border-cyan-500/30 transform
                    ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                  style={{ transitionDelay: `${50 + idx * 75}ms` }}
                >
                  <div className="p-3 bg-slate-900/80 rounded-xl text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.15)] border border-cyan-500/20">
                    {React.cloneElement(item.icon as React.ReactElement, { size: 28 })}
                  </div>
                  {item.label}
                </Link>
             ))}

             <div className={`mt-8 pt-8 border-t border-slate-700/50 transition-all duration-700 transform ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: '350ms' }}>
                <Link 
                  href="/enterprise" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-3 w-full p-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black text-xl uppercase tracking-widest shadow-[0_0_40px_rgba(59,130,246,0.4)] hover:shadow-[0_0_60px_rgba(59,130,246,0.6)] transition-all transform hover:scale-[1.02]"
                >
                  <Briefcase size={26} />
                  Enterprise API
                </Link>
                <p className="text-center text-slate-500 text-sm mt-4 font-medium uppercase tracking-widest">
                  Ready for B2B integrácie
                </p>
             </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col relative z-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-[#0f172a]/90 backdrop-blur relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center border border-slate-700 shadow-inner">
               <span className="text-cyan-400 font-bold text-sm tracking-tighter">JE</span>
            </div>
            <p className="text-sm font-medium text-slate-500">
              © {new Date().getFullYear()} JetEngine CCT PWA.<br className="md:hidden" /> Všetky práva vyhradené.
            </p>
          </div>
          <div className="flex gap-4 md:gap-6">
            {['Facebook', 'Instagram', 'LinkedIn'].map((social) => (
              <a 
                key={social} 
                href="#" 
                className="px-4 py-2 rounded-xl text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all font-semibold text-sm border border-transparent hover:border-cyan-500/20 shadow-sm"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};
