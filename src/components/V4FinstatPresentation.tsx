'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

export default function V4FinstatPresentation() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = 8;

    // Slide navigation
    const nextSlide = useCallback(() => {
        if (currentSlide < totalSlides - 1) {
            setCurrentSlide((prev) => prev + 1);
        }
    }, [currentSlide]);

    const prevSlide = useCallback(() => {
        if (currentSlide > 0) {
            setCurrentSlide((prev) => prev - 1);
        }
    }, [currentSlide]);

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
            else if (e.key === 'ArrowLeft') prevSlide();
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [nextSlide, prevSlide]);

    // Touch Swipe support
    useEffect(() => {
        let touchStartX = 0;
        let touchStartY = 0;

        const handleTouchStart = (e: TouchEvent) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        };

        const handleTouchEnd = (e: TouchEvent) => {
            const touchEndX = e.changedTouches[0].screenX;
            const touchEndY = e.changedTouches[0].screenY;

            const xDiff = Math.abs(touchStartX - touchEndX);
            const yDiff = Math.abs(touchStartY - touchEndY);

            if (xDiff > yDiff && xDiff > 50) {
                if (touchEndX < touchStartX) nextSlide();
                if (touchEndX > touchStartX) prevSlide();
            }
        };

        document.addEventListener('touchstart', handleTouchStart, { passive: true });
        document.addEventListener('touchend', handleTouchEnd, { passive: true });

        return () => {
            document.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchend', handleTouchEnd);
        };
    }, [nextSlide, prevSlide]);

    return (
        <div className="h-[100dvh] w-full relative flex flex-col antialiased selection:bg-cyan-500 selection:text-white bg-[#0f172a] text-[#f8fafc] overflow-hidden">
            <style dangerouslySetInnerHTML={{
                __html: `
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800;900&family=Inter:wght@300;400;500;600&display=swap');
        .v4-presentation-root { font-family: 'Inter', sans-serif; }
        .v4-presentation-root h1, .v4-presentation-root h2, .v4-presentation-root h3, .v4-presentation-root h4, .outfit {
            font-family: 'Outfit', sans-serif;
        }
        .slide {
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .glass-panel {
            background: rgba(30, 41, 59, 0.85);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(148, 163, 184, 0.15);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
        .text-gradient {
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-image: linear-gradient(to right, #22d3ee, #3b82f6);
        }
        .bg-gradient-glow {
            position: absolute;
            width: 600px;
            height: 600px;
            background: radial-gradient(circle, rgba(56,189,248,0.12) 0%, rgba(15,23,42,0) 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 0;
        }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(51, 65, 85, 0.8); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(71, 85, 105, 1); }
      `}} />

            {/* Global Header */}
            <header className="absolute top-0 left-0 w-full p-4 md:p-6 z-[60] flex justify-between items-center pointer-events-none v4-presentation-root">
                <div className="flex items-center gap-3 md:gap-4 glass-panel px-3 md:px-5 py-2.5 rounded-2xl pointer-events-auto shadow-lg relative group overflow-hidden">
                    <Link href="/" className="absolute inset-0 z-20"></Link>
                    <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-[12px] md:rounded-[14px] bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.4)] border border-white/20 overflow-hidden shrink-0 group">
                        <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent opacity-60"></div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-6 h-6 md:w-7 md:h-7 relative z-10 drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                            <path d="M50 20 L80 45 L50 80 L20 45 Z" fill="white" fillOpacity="0.1" stroke="white" strokeWidth="6" strokeLinejoin="round" />
                            <path d="M50 20 L50 80" stroke="white" strokeWidth="6" strokeLinecap="round" />
                            <path d="M20 45 L80 45" stroke="white" strokeWidth="6" strokeLinecap="round" />
                            <circle cx="50" cy="20" r="7" fill="#0f172a" stroke="white" strokeWidth="3" />
                            <circle cx="80" cy="45" r="7" fill="#0f172a" stroke="white" strokeWidth="3" />
                            <circle cx="50" cy="80" r="7" fill="#0f172a" stroke="white" strokeWidth="3" />
                            <circle cx="20" cy="45" r="7" fill="#0f172a" stroke="white" strokeWidth="3" />
                        </svg>
                    </div>

                    <span className="outfit font-bold text-[22px] md:text-2xl tracking-wide hidden sm:block">V4-Finstat v5.0</span>
                    <span className="outfit font-bold text-[22px] tracking-wide sm:hidden">V4-Finstat</span>
                </div>
                <div className="hidden md:block px-4 py-1.5 rounded-full glass-panel text-base font-semibold text-cyan-400 uppercase tracking-widest shadow-lg v4-presentation-root">
                    Enterprise Ready
                </div>
            </header>

            {/* Background Effects */}
            <div className="bg-gradient-glow top-[-100px] left-[-100px] pointer-events-none"></div>
            <div className="bg-gradient-glow bottom-[-200px] right-[-100px] opacity-70 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(15,23,42,0) 70%)' }}></div>

            {/* Slides Container */}
            <main id="slider" className="relative w-full h-full overflow-hidden z-10 v4-presentation-root">

                {/* Slide 1: Hook / Executive Summary */}
                <section className={`slide absolute inset-0 overflow-y-auto custom-scrollbar ${currentSlide === 0 ? 'opacity-100 z-20 scale-100 pointer-events-auto' : 'opacity-0 z-0 scale-95 pointer-events-none'}`}>
                    <div className="flex flex-col min-h-full px-4 py-24 md:px-8">
                        <div className="m-auto w-full max-w-5xl text-center space-y-6 md:space-y-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold text-base md:text-lg uppercase tracking-widest">
                                <span className="relative flex h-3 w-3 mr-1 md:mr-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                                </span>
                                B2B SaaS Softvér | Live na produkcii
                            </div>
                            <h1 className="text-[40px] sm:text-[52px] md:text-[5.75rem] font-black leading-tight tracking-tight uppercase drop-shadow-2xl">
                                Vyhľadávač firiem<br />
                                <span className="text-gradient">pre celý región V4</span>
                            </h1>
                            <div className="glass-panel p-5 md:p-8 rounded-3xl border-2 border-cyan-500/30 mt-8 transform transition-transform hover:scale-105">
                                <p className="text-[22px] sm:text-2xl md:text-[34px] text-slate-200 font-medium leading-relaxed">
                                    <strong className="text-white font-black block mb-2">Čo vlastne predávame?</strong>
                                    Softvér, do ktorého firmy zadajú IČO svojho partnera a <span className="text-cyan-400 font-bold">do 1 sekundy</span> vidia: kto ho reálne vlastní, či nemá <span className="text-red-400 font-bold">skryté dlhy</span> a či nie je prepojený na <span className="text-yellow-400 font-bold">podvodníkov</span>.
                                </p>
                                <p style={{ fontSize: 'var(--text-lg)', color: 'var(--slate-300)', marginTop: 'var(--space-4)', fontWeight: 'var(--font-light)', fontStyle: 'italic' }}>
                                    Agregujeme štátne registre Slovenska, Česka, Poľska a Maďarska do jedného kliknutia.
                                </p>
                            </div>
                            <div className="pt-6 pb-12">
                                <button onClick={nextSlide} className="group relative px-6 py-4 md:px-10 md:py-5 bg-white text-slate-900 font-black rounded-2xl overflow-hidden transition-all hover:scale-105 shadow-[0_0_30px_rgba(34,211,238,0.4)] text-xl md:text-2xl uppercase tracking-wider w-full sm:w-auto">
                                    <span className="relative z-10 flex items-center justify-center gap-3">
                                        Ukázať ako to funguje
                                        <svg className="group-hover:translate-x-2 transition-transform" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Slide 2: Problem & Solution */}
                <section className={`slide absolute inset-0 overflow-y-auto custom-scrollbar ${currentSlide === 1 ? 'opacity-100 z-20 scale-100 pointer-events-auto' : 'opacity-0 z-0 scale-95 pointer-events-none'}`}>
                    <div className="flex flex-col min-h-full px-4 py-24 md:px-8">
                        <div className="m-auto w-full max-w-7xl">
                            <h2 className="text-[34px] md:text-[64px] font-black mb-8 md:mb-12 text-center uppercase tracking-wider">Čo presne náš systém <span className="text-gradient">robí?</span></h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="glass-panel p-6 md:p-8 rounded-3xl border-t-4 border-blue-500">
                                    <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-5 text-blue-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2" /><rect x="2" y="14" width="20" height="8" rx="2" ry="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" /></svg>
                                    </div>
                                    <h3 className="text-2xl md:text-[28px] font-bold text-white mb-3">1. Vykráda 4 Registre</h3>
                                    <p className="text-slate-300 text-lg md:text-[22px] leading-relaxed">
                                        Už žiadne ručné hľadanie v slovenskom ORSR, českom ARESe, či poľskom KRS. My tie dáta sťahujeme, čistíme a spájame automaticky do jednej prehľadnej databázy.
                                    </p>
                                </div>
                                <div className="glass-panel p-6 md:p-8 rounded-3xl border-t-4 border-cyan-400 relative overflow-hidden">
                                    <div className="absolute right-0 top-0 w-24 h-24 md:w-32 md:h-32 bg-cyan-500/10 rounded-bl-full"></div>
                                    <div className="w-12 h-12 md:w-16 md:h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center mb-5 text-cyan-400 relative z-10">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z" /></svg>
                                    </div>
                                    <h3 className="text-2xl md:text-[28px] font-bold text-white mb-3 relative z-10">2. Kreslí &quot;Pavúkov&quot;</h3>
                                    <p className="text-slate-300 text-lg md:text-[22px] leading-relaxed relative z-10">
                                        Namiesto čítania dlhých výpisov vygenerujeme interaktívny graf. Okamžite vidíte, ak má vaša cieľová firma prepojenie na schránkové spoločnosti alebo biele kone.
                                    </p>
                                </div>
                                <div className="glass-panel p-6 md:p-8 rounded-3xl border-t-4 border-red-500">
                                    <div className="w-12 h-12 md:w-16 md:h-16 bg-red-500/20 rounded-2xl flex items-center justify-center mb-5 text-red-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                                    </div>
                                    <h3 className="text-2xl md:text-[28px] font-bold text-white mb-3">3. Napojenie na ERP</h3>
                                    <p className="text-slate-300 text-lg md:text-[22px] leading-relaxed">
                                        Napojíme sa priamo na ERP (Pohoda, SAP) nášho klienta. Ak sa jeho dodávateľ dostane do dlhov alebo prestane platiť, náš systém pošle okamžité varovanie.
                                    </p>
                                </div>
                            </div>
                            <div className="h-12 w-full"></div>
                        </div>
                    </div>
                </section>

                {/* Slide 3: Tech Diagnostics */}
                <section className={`slide absolute inset-0 overflow-y-auto custom-scrollbar ${currentSlide === 2 ? 'opacity-100 z-20 scale-100 pointer-events-auto' : 'opacity-0 z-0 scale-95 pointer-events-none'}`}>
                    <div className="flex flex-col min-h-full px-4 py-24 md:px-8">
                        <div className="m-auto w-full max-w-5xl">
                            <div className="text-center mb-8 md:mb-12">
                                <h2 className="text-[34px] md:text-[52px] font-bold mb-4">Proof of Stability: <span className="text-gradient">Nulové Dev Riziko</span></h2>
                                <p className="text-[22px] md:text-2xl text-slate-400">Technológia nie je na papieri, je nasadená v produkcii.</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="glass-panel p-6 md:p-8 rounded-2xl text-center">
                                    <div className="w-14 h-14 md:w-16 md:h-16 mx-auto bg-green-500/10 rounded-full flex items-center justify-center mb-4 text-green-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 8-6 4 6 4V8Z" /><rect width="14" height="12" x="2" y="6" rx="2" ry="2" /></svg>
                                    </div>
                                    <h4 className="text-[34px] md:text-[40px] font-extrabold text-white mb-2">93 / 93</h4>
                                    <p style={{ color: 'var(--slate-300)', fontSize: 'var(--text-base)', textTransform: 'uppercase', tracking: '0.05em', fontWeight: 'var(--font-semibold)' }}>Úspešných QA Testov</p>
                                    <p style={{ fontSize: 'var(--text-base)', color: 'var(--slate-400)', marginTop: 'var(--space-2)' }}>Pokrytie kódu 85%+ testami</p>
                                </div>
                                <div className="glass-panel p-6 md:p-8 rounded-2xl text-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent"></div>
                                    <div className="w-14 h-14 md:w-16 md:h-16 mx-auto bg-blue-500/10 rounded-full flex items-center justify-center mb-4 text-blue-400 relative z-10">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /></svg>
                                    </div>
                                    <h4 className="text-2xl md:text-[28px] font-bold text-white mb-2 relative z-10">Nexus Resolver</h4>
                                    <p className="text-slate-400 text-base md:text-lg uppercase tracking-wider font-semibold relative z-10">Unfair Advantage</p>
                                    <p className="text-base text-slate-300 mt-2 relative z-10">Algoritmus spája identity vo V4 aj pri preklepoch.</p>
                                </div>
                                <div className="glass-panel p-6 md:p-8 rounded-2xl text-center">
                                    <div className="w-14 h-14 md:w-16 md:h-16 mx-auto bg-cyan-500/10 rounded-full flex items-center justify-center mb-4 text-cyan-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" /></svg>
                                    </div>
                                    <h4 className="text-2xl md:text-[28px] font-bold text-white mb-2">Production Ready</h4>
                                    <p style={{ color: 'var(--slate-300)', fontSize: 'var(--text-base)', textTransform: 'uppercase', tracking: '0.05em', fontWeight: 'var(--font-semibold)' }}>Infraštruktúra</p>
                                    <p style={{ fontSize: 'var(--text-base)', color: 'var(--slate-400)', marginTop: 'var(--space-2)' }}>PostgreSQL, Redis cache. Škálovateľné ihneď.</p>
                                </div>
                            </div>
                            <div className="h-12 w-full"></div>
                        </div>
                    </div>
                </section>

                {/* Slide 4: ERP Integrations */}
                <section className={`slide absolute inset-0 overflow-y-auto custom-scrollbar ${currentSlide === 3 ? 'opacity-100 z-20 scale-100 pointer-events-auto' : 'opacity-0 z-0 scale-95 pointer-events-none'}`}>
                    <div className="flex flex-col min-h-full px-4 py-24 md:px-8">
                        <div className="m-auto w-full max-w-6xl">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                                <div>
                                    <h2 className="text-[34px] md:text-[52px] font-bold mb-4 md:mb-6">ERP Integrácie:<br /><span className="text-gradient">Enterprise Klenot</span></h2>
                                    <p className="text-xl md:text-[22px] text-slate-300 mb-6">Verejné registre neobsahujú všetko. 📊 V4-Finstat ide hlbšie vďaka bezproblémovému napojeniu na účtovníctvo firiem.</p>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4 p-4 glass-panel rounded-xl">
                                            <div className="bg-blue-600 rounded-lg p-2 shrink-0"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg></div>
                                            <div>
                                                <h4 className="font-bold text-white text-lg md:text-xl">Analýza platieb v reálnom čase</h4>
                                                <p className="text-base md:text-lg text-slate-400">Platí partner faktúry včas? Sledujeme cash-flow a záväzky.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 p-4 glass-panel rounded-xl">
                                            <div className="bg-red-500 rounded-lg p-2 shrink-0"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg></div>
                                            <div>
                                                <h4 className="font-bold text-white text-lg md:text-xl">Automatické varovania (Webhooks)</h4>
                                                <p className="text-base md:text-lg text-slate-400">Notifikácia, ak sa zhorší risk score kľúčového dodávateľa.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="glass-panel p-6 md:p-8 rounded-2xl relative">
                                    <div className="absolute top-0 right-0 -mt-3 -mr-3 bg-cyan-500 text-slate-900 font-bold px-3 py-1 rounded-full text-base shadow-lg shadow-cyan-500/30 rotate-12">
                                        Plug & Play
                                    </div>
                                    <h3 className="text-[22px] md:text-2xl font-bold text-white mb-6 border-b border-slate-700 pb-3 md:pb-4">Pripravené konektory</h3>
                                    <div className="space-y-4 md:space-y-6">
                                        <div className="flex justify-between items-center group">
                                            <div className="flex items-center gap-3">
                                                <span className="text-2xl md:text-[28px]">🇩🇪</span>
                                                <span className="font-bold text-xl md:text-[22px] text-slate-200">SAP</span>
                                            </div>
                                            <span className="text-sm md:text-base font-mono text-cyan-400 bg-cyan-400/10 px-2 md:px-3 py-1 rounded-full whitespace-nowrap">REST / SOAP</span>
                                        </div>
                                        <div className="flex justify-between items-center group">
                                            <div className="flex items-center gap-3">
                                                <span className="text-2xl md:text-[28px]">🇸🇰</span>
                                                <span className="font-bold text-xl md:text-[22px] text-slate-200">Pohoda</span>
                                            </div>
                                            <span className="text-sm md:text-base font-mono text-cyan-400 bg-cyan-400/10 px-2 md:px-3 py-1 rounded-full whitespace-nowrap">REST / SyncHub</span>
                                        </div>
                                        <div className="flex justify-between items-center group">
                                            <div className="flex items-center gap-3">
                                                <span className="text-2xl md:text-[28px]">🇨🇿</span>
                                                <span className="font-bold text-xl md:text-[22px] text-slate-200">Money S3</span>
                                            </div>
                                            <span className="text-sm md:text-base font-mono text-cyan-400 bg-cyan-400/10 px-2 md:px-3 py-1 rounded-full whitespace-nowrap">API Module</span>
                                        </div>
                                    </div>
                                    <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-slate-700 text-base md:text-lg text-slate-400 italic">
                                        Implementácia trvá hodiny. Vytvárame enormné &quot;switching costs&quot; - klient po integrácii neodíde.
                                    </div>
                                </div>
                            </div>
                            <div className="h-12 w-full"></div>
                        </div>
                    </div>
                </section>

                {/* Slide 5: Monetization */}
                <section className={`slide absolute inset-0 overflow-y-auto custom-scrollbar ${currentSlide === 4 ? 'opacity-100 z-20 scale-100 pointer-events-auto' : 'opacity-0 z-0 scale-95 pointer-events-none'}`}>
                    <div className="flex flex-col min-h-full px-4 py-24 md:px-8">
                        <div className="m-auto w-full max-w-6xl text-center">
                            <h2 className="text-[34px] md:text-[52px] font-bold mb-3 md:mb-4">Biznis Model & <span className="text-gradient">Ziskovosť</span></h2>
                            <p className="text-lg md:text-2xl text-slate-400 mb-8 md:mb-12">B2B SaaS s vysokou maržou a minimálnymi prevádzkovými nákladmi.</p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                                <div className="glass-panel p-6 rounded-2xl flex flex-col h-full border-t-4 border-t-slate-500">
                                    <h3 className="text-2xl md:text-[28px] font-bold text-white mb-2">PRO</h3>
                                    <div className="mb-4 md:mb-6"><span className="text-[34px] md:text-[40px] font-extrabold text-white">500 €</span><span className="text-slate-400 text-lg md:text-xl"> / mes.</span></div>
                                    <ul className="text-left space-y-2 md:space-y-3 mb-6 flex-grow text-slate-300 text-lg md:text-xl">
                                        <li className="flex gap-2"><svg className="text-cyan-400 shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg> AML checky</li>
                                        <li className="flex gap-2"><svg className="text-cyan-400 shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg> Monitoring partnerov</li>
                                        <li className="flex gap-2"><svg className="text-cyan-400 shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg> V4 Registre (Dáta)</li>
                                    </ul>
                                    <p className="text-sm md:text-base text-slate-500 font-bold uppercase">Pre stredné firmy</p>
                                </div>
                                <div className="glass-panel p-6 rounded-2xl flex flex-col h-full border-2 border-cyan-500 relative transform md:-translate-y-4 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-3 md:-mt-4 bg-cyan-500 text-slate-900 font-bold px-3 py-1 rounded-full text-base whitespace-nowrap">
                                        Najväčší rast
                                    </div>
                                    <h3 className="text-2xl md:text-[28px] font-bold text-cyan-400 mb-2 mt-2 md:mt-0">ENTERPRISE</h3>
                                    <div className="mb-4 md:mb-6"><span className="text-[34px] md:text-[40px] font-extrabold text-white">700 €</span><span className="text-slate-400 text-lg md:text-xl"> / mes.</span></div>
                                    <ul className="text-left space-y-2 md:space-y-3 mb-6 flex-grow text-slate-300 text-lg md:text-xl">
                                        <li className="flex gap-2"><svg className="text-cyan-400 shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg> Všetko z PRO</li>
                                        <li className="flex gap-2"><svg className="text-cyan-400 shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg> <b>Plná ERP Integrácia</b></li>
                                        <li className="flex gap-2"><svg className="text-cyan-400 shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg> Webhooks API</li>
                                        <li className="flex gap-2"><svg className="text-cyan-400 shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg> Fraud Detection</li>
                                    </ul>
                                    <p className="text-sm md:text-base text-cyan-400 font-bold uppercase">Pre logistiku</p>
                                </div>
                                <div className="glass-panel p-6 rounded-2xl flex flex-col h-full border-t-4 border-t-blue-500">
                                    <h3 className="text-2xl md:text-[28px] font-bold text-white mb-2">API DATA</h3>
                                    <div className="mb-4 md:mb-6"><span className="text-[34px] md:text-[40px] font-extrabold text-white">0.05 €</span><span className="text-slate-400 text-lg md:text-xl"> / dopyt</span></div>
                                    <ul className="text-left space-y-2 md:space-y-3 mb-6 flex-grow text-slate-300 text-lg md:text-xl">
                                        <li className="flex gap-2"><svg className="text-cyan-400 shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg> Transakčný model</li>
                                        <li className="flex gap-2"><svg className="text-cyan-400 shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg> Real-time scoring</li>
                                        <li className="flex gap-2"><svg className="text-cyan-400 shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg> Bankové systémy</li>
                                    </ul>
                                    <p className="text-sm md:text-base text-blue-400 font-bold uppercase">Pre Banky & Poisťovne</p>
                                </div>
                            </div>

                            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 w-full">
                                <div className="glass-panel p-4 md:p-6 rounded-2xl border-b-4 border-green-500 text-center bg-green-900/10">
                                    <div className="text-[40px] md:text-[64px] font-black text-green-400 mb-1 md:mb-2">85%+</div>
                                    <div className="text-sm md:text-lg font-bold text-slate-200 uppercase tracking-widest">Prevádzková Marža</div>
                                </div>
                                <div className="glass-panel p-4 md:p-6 rounded-2xl border-b-4 border-cyan-500 text-center bg-cyan-900/10">
                                    <div className="text-[40px] md:text-[64px] font-black text-cyan-400 mb-1 md:mb-2">3M €</div>
                                    <div className="text-sm md:text-lg font-bold text-slate-200 uppercase tracking-widest">Cieľové ARR (Rok 2)</div>
                                </div>
                                <div className="glass-panel p-4 md:p-6 rounded-2xl border-b-4 border-purple-500 text-center bg-purple-900/10">
                                    <div className="text-[40px] md:text-[64px] font-black text-purple-400 mb-1 md:mb-2">&lt; 2%</div>
                                    <div className="text-sm md:text-lg font-bold text-slate-200 uppercase tracking-widest">Odhadovaný Churn</div>
                                </div>
                            </div>
                            <div className="h-12 w-full"></div>
                        </div>
                    </div>
                </section>

                {/* Slide 6: Legal & Compliance */}
                <section className={`slide absolute inset-0 overflow-y-auto custom-scrollbar ${currentSlide === 5 ? 'opacity-100 z-20 scale-100 pointer-events-auto' : 'opacity-0 z-0 scale-95 pointer-events-none'}`}>
                    <div className="flex flex-col min-h-full px-4 py-24 md:px-8">
                        <div className="m-auto w-full max-w-5xl">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                                <div className="order-2 lg:order-1 relative">
                                    <div className="absolute inset-0 bg-green-500/10 blur-3xl rounded-full"></div>
                                    <div className="glass-panel p-6 md:p-8 rounded-2xl border border-green-500/30 relative z-10">
                                        <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                                            <div className="bg-green-500/20 p-2 md:p-3 rounded-xl text-green-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>
                                            </div>
                                            <h3 className="text-2xl md:text-[28px] font-bold text-white">Bulletproof Compliance</h3>
                                        </div>
                                        <ul className="space-y-4 md:space-y-5 text-slate-300 text-lg md:text-xl">
                                            <li className="flex gap-2 md:gap-3">
                                                <span className="text-green-400 font-bold mt-0.5">1.</span>
                                                <div>
                                                    <strong className="text-white block">GDPR &amp; Oprávnený záujem</strong>
                                                    Zber dát je chránený čl. 6(1)(f) GDPR. Máme implementované &quot;Právo na výmaz&quot;.
                                                </div>
                                            </li>
                                            <li className="flex gap-2 md:gap-3">
                                                <span className="text-green-400 font-bold mt-0.5">2.</span>
                                                <div>
                                                    <strong className="text-white block">Fair Use & Bezpečnosť</strong>
                                                    Scraping engine využíva rotujúce proxy. Nepreťažujeme štátne servery.
                                                </div>
                                            </li>
                                            <li className="flex gap-2 md:gap-3">
                                                <span className="text-green-400 font-bold mt-0.5">3.</span>
                                                <div>
                                                    <strong className="text-white block">Automatický Disclaimer</strong>
                                                    Každý graf cituje zdroje. Vylúčenie našej právnej zodpovednosti za dáta.
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="order-1 lg:order-2 text-center lg:text-left">
                                    <h2 className="text-[34px] md:text-[52px] font-bold mb-4 md:mb-6">100% Legal &<br /><span className="text-gradient">Zero Risk</span></h2>
                                    <p className="text-xl md:text-2xl text-slate-300 mb-4 md:mb-6">
                                        📊 V4-Finstat Projekt v5.0 je navrhnutý tak, aby agresívne rástol, no právne bol úplne nedotknuteľný.
                                    </p>
                                    <p className="text-lg md:text-xl text-slate-400">
                                        Implementovali sme kompletný systém na mieru (VOP, Privacy Policy). Pri investícii preberáte čistý stôl.
                                    </p>
                                </div>
                            </div>
                            <div className="h-12 w-full"></div>
                        </div>
                    </div>
                </section>

                {/* Slide 7: Roadmap */}
                <section className={`slide absolute inset-0 overflow-y-auto custom-scrollbar ${currentSlide === 6 ? 'opacity-100 z-20 scale-100 pointer-events-auto' : 'opacity-0 z-0 scale-95 pointer-events-none'}`}>
                    <div className="flex flex-col min-h-full px-4 py-24 md:px-8">
                        <div className="m-auto w-full max-w-6xl text-center">
                            <h2 className="text-[34px] md:text-[52px] font-bold mb-8 md:mb-12">12-Mesačná <span className="text-gradient">Roadmapa</span></h2>

                            <div className="relative flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4 px-0 md:px-4">
                                <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-slate-800 -z-10 -translate-y-1/2 rounded-full"></div>
                                <div className="hidden md:block absolute top-1/2 left-0 w-1/4 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 -z-10 -translate-y-1/2 rounded-full"></div>
                                <div className="md:hidden absolute top-0 left-1/2 h-full w-1 bg-slate-800 -translate-x-1/2 -z-10"></div>

                                <div className="relative w-full md:w-1/4 flex flex-col items-center group">
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-cyan-500 text-slate-900 flex items-center justify-center font-bold text-xl md:text-[22px] mb-3 md:mb-4 shadow-[0_0_20px_rgba(34,211,238,0.5)] z-10 relative">Q1</div>
                                    <div className="glass-panel p-4 md:p-6 rounded-xl text-center w-full max-w-xs md:max-w-none border border-cyan-500/30">
                                        <h4 className="font-bold text-white mb-1 md:mb-2 text-lg md:text-xl">Launch & Traction</h4>
                                        <p className="text-base md:text-lg text-slate-400">0-3 mes. Prvých 10 B2B kontraktov.</p>
                                    </div>
                                </div>

                                <div className="relative w-full md:w-1/4 flex flex-col items-center group">
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-800 border-2 border-slate-600 text-slate-300 flex items-center justify-center font-bold text-xl md:text-[22px] mb-3 md:mb-4 z-10 relative">Q2</div>
                                    <div className="glass-panel p-4 md:p-6 rounded-xl text-center w-full max-w-xs md:max-w-none">
                                        <h4 className="font-bold text-white mb-1 md:mb-2 text-lg md:text-xl">V4 Expansion</h4>
                                        <p className="text-base md:text-lg text-slate-400">4-6 mes. Vstup na trh PL a HU.</p>
                                    </div>
                                </div>

                                <div className="relative w-full md:w-1/4 flex flex-col items-center group">
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-800 border-2 border-slate-600 text-slate-300 flex items-center justify-center font-bold text-xl md:text-[22px] mb-3 md:mb-4 z-10 relative">Q3</div>
                                    <div className="glass-panel p-4 md:p-6 rounded-xl text-center w-full max-w-xs md:max-w-none">
                                        <h4 className="font-bold text-white mb-1 md:mb-2 text-lg md:text-xl">AI Intelligence</h4>
                                        <p className="text-base md:text-lg text-slate-400">7-9 mes. AI predikcie rizík partnera.</p>
                                    </div>
                                </div>

                                <div className="relative w-full md:w-1/4 flex flex-col items-center group">
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-800 border-2 border-slate-600 text-slate-300 flex items-center justify-center font-bold text-xl md:text-[22px] mb-3 md:mb-4 z-10 relative">Q4</div>
                                    <div className="glass-panel p-4 md:p-6 rounded-xl text-center w-full max-w-xs md:max-w-none relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/10 to-transparent"></div>
                                        <h4 className="font-bold text-yellow-400 mb-1 md:mb-2 text-lg md:text-xl">Series A Dominance</h4>
                                        <p className="text-base md:text-lg text-slate-400">10-12 mes. Valuácia 15M+ EUR.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="h-12 w-full"></div>
                        </div>
                    </div>
                </section>

                {/* Slide 8: The Ask / Call to Action */}
                <section className={`slide absolute inset-0 overflow-y-auto custom-scrollbar ${currentSlide === 7 ? 'opacity-100 z-20 scale-100 pointer-events-auto' : 'opacity-0 z-0 scale-95 pointer-events-none'}`}>
                    <div className="flex flex-col min-h-full px-4 py-24 md:px-8">
                        <div className="m-auto w-full max-w-5xl text-center space-y-4 md:space-y-6">
                            <div className="inline-block p-3 md:p-4 rounded-full bg-white/5 mb-0 md:mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" className="md:w-16 md:h-16" viewBox="0 0 24 24" fill="none" stroke="url(#gradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <defs>
                                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#22d3ee" />
                                            <stop offset="100%" stopColor="#3b82f6" />
                                        </linearGradient>
                                    </defs>
                                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                </svg>
                            </div>

                            <h2 className="text-[28px] sm:text-[34px] md:text-[52px] font-extrabold tracking-tight uppercase text-slate-300">Investičná požiadavka</h2>

                            <div className="relative inline-block w-full">
                                <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"></div>
                                <div className="relative text-[4.25rem] sm:text-[80px] md:text-[10.25rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 py-2 md:py-4 leading-none drop-shadow-2xl">
                                    100 000 €
                                </div>
                            </div>

                            <div className="text-2xl sm:text-[28px] md:text-[52px] text-green-400 font-black mt-1 md:mt-2 mb-2 md:mb-4 drop-shadow-[0_0_20px_rgba(74,222,128,0.4)]">
                                Potenciál: 10x do 3 rokov
                            </div>
                            <h3 className="text-xl sm:text-[22px] md:text-[28px] text-slate-300 font-light mb-6 md:mb-8 px-4">Podiel v technológii pre Series A s valuáciou <span className="text-white font-bold text-2xl md:text-[34px] whitespace-nowrap">15 000 000 €</span></h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 text-left max-w-4xl mx-auto mt-2 md:mt-4">
                                <div className="glass-panel p-5 md:p-6 rounded-xl border border-green-500/40 bg-green-900/10">
                                    <h4 className="font-black text-white mb-2 flex items-center gap-2 text-xl md:text-2xl">
                                        <svg className="text-green-400 shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                                        Hotový Produkt
                                    </h4>
                                    <p className="text-slate-300 text-lg md:text-[22px]">Investícia nejde do vývoja. Ide čisto do predaja a rýchleho znásobenia tržieb.</p>
                                </div>
                                <div className="glass-panel p-5 md:p-6 rounded-xl border border-cyan-500/40 bg-cyan-900/10">
                                    <h4 className="font-black text-white mb-2 flex items-center gap-2 text-xl md:text-2xl">
                                        <svg className="text-cyan-400 shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="2" x2="12" y2="22" /><path d="m17 5-5-3-5 3" /><path d="m17 19-5 3-5-3" /></svg>
                                        Škálovateľný Monopol
                                    </h4>
                                    <p className="text-slate-300 text-lg md:text-[22px]">My prepájame 4 štáty, čím vytvárame neohrozený monopol na cezhraničnú risk analýzu.</p>
                                </div>
                            </div>

                            <div className="pt-6 md:pt-10 pb-12">
                                <button className="px-6 py-4 md:px-12 md:py-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black rounded-xl text-[22px] md:text-[28px] uppercase tracking-widest shadow-[0_0_40px_rgba(59,130,246,0.6)] hover:shadow-[0_0_60px_rgba(59,130,246,0.8)] transition-all w-full sm:w-auto">
                                    Prejsť k Live Demonštrácii
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Navigation Controls */}
                <button onClick={prevSlide} className={`hidden sm:flex absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-[100] p-2 md:p-3 rounded-full glass-panel hover:bg-slate-700/50 transition-colors group ${currentSlide === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    <svg className="text-slate-400 group-hover:text-white transition-colors" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                </button>
                <button onClick={nextSlide} className={`hidden sm:flex absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-[100] p-2 md:p-3 rounded-full glass-panel hover:bg-slate-700/50 transition-colors group ${currentSlide === totalSlides - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    <svg className="text-slate-400 group-hover:text-white transition-colors" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                </button>

                {/* Dots Pagination */}
                <div className="absolute bottom-4 md:bottom-8 w-full flex justify-center gap-2 md:gap-3 z-[100] pointer-events-none" id="dots-container">
                    {Array.from({ length: totalSlides }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`h-1.5 md:h-2 rounded-full transition-all duration-300 pointer-events-auto ${currentSlide === index ? 'w-6 md:w-8 bg-cyan-400' : 'w-1.5 md:w-2 bg-slate-600'}`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}
