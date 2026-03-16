'use client';

import React, { useState, useEffect } from 'react';

interface AILoadingOverlayProps {
  isVisible: boolean;
  onComplete?: () => void;
  /**
   * 'deep' - Full 5s sequence (LARSEN Synthesis)
   * 'standard' - 2s sequence (Rapid Sync)
   * 'nano' - 800ms sequence (Instant Buffer)
   */
  mode?: 'deep' | 'standard' | 'nano';
}

export const AILoadingOverlay: React.FC<AILoadingOverlayProps> = ({ 
  isVisible, 
  onComplete,
  mode = 'standard'
}) => {
  const [phase, setPhase] = useState<'matrix' | 'liquid'>('matrix');
  const [progress, setProgress] = useState(0);
  const [activeMode, setActiveMode] = useState<'deep' | 'standard' | 'nano'>(mode);

  useEffect(() => {
    if (isVisible) {
      const now = Date.now();
      const lastSync = localStorage.getItem('LARSEN_LAST_SYNC');
      const COOLDOWN = 5 * 60 * 1000; // 5 minutes

      if (lastSync && (now - parseInt(lastSync) < COOLDOWN)) {
        setActiveMode('nano');
      } else {
        setActiveMode(mode);
        localStorage.setItem('LARSEN_LAST_SYNC', now.toString());
      }
    }
  }, [isVisible, mode]);

  const config = {
    deep: { phase1: 2000, step: 30, text: 'INITIALIZING LARSEN_CORE' },
    standard: { phase1: 800, step: 10, text: 'RAPID_SYNC_ACTIVE' },
    nano: { phase1: 200, step: 2, text: 'BUFFER_LOAD' }
  }[activeMode];

  useEffect(() => {
    if (!isVisible) {
      setPhase('matrix');
      setProgress(0);
      return;
    }

    // Phase 1: Matrix / Code Stream
    const phase1Timer = setTimeout(() => {
      setPhase('liquid');
    }, config.phase1);

    // Phase 2: Liquid Progress
    let progressInterval: NodeJS.Timeout;
    if (phase === 'liquid') {
      progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            if (onComplete) {
              setTimeout(onComplete, activeMode === 'nano' ? 100 : 300);
            }
            return 100;
          }
          return prev + (activeMode === 'nano' ? 5 : 1);
        });
      }, config.step);
    }

    return () => {
      clearTimeout(phase1Timer);
      if (progressInterval) clearInterval(progressInterval);
    };
  }, [isVisible, phase, onComplete, config.phase1, config.step, activeMode]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[1000] bg-white flex flex-col items-center justify-center overflow-hidden animate-in fade-in duration-300">
      {/* Structural Grid lines background */}
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 pointer-events-none opacity-5">
        {[...Array(36)].map((_, i) => (
          <div key={i} className="border-[0.5px] border-black"></div>
        ))}
      </div>

      {phase === 'matrix' ? (
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Matrix / Code Columns */}
          <div className="absolute inset-0 flex justify-around opacity-20">
            {[...Array(12)].map((_, i) => (
              <div 
                key={i} 
                className="flex flex-col text-[10px] font-mono font-black break-all whitespace-pre-wrap animate-[matrix_2s_linear_infinite]"
                style={{ animationDelay: `${i * 0.1}s`, writingMode: 'vertical-rl' }}
              >
                {Array(50).fill(0).map(() => String.fromCharCode(33 + Math.floor(Math.random() * 94))).join('')}
              </div>
            ))}
          </div>
          
          <div className="z-10 text-center space-y-4">
            <h2 className="text-4xl font-black tracking-tighter uppercase leading-none">
              {config.text.split(' ')[0]} <br /> {config.text.split(' ')[1] || ''}
            </h2>
            <p className="label-system text-[10px] animate-pulse">ESTABLISHING CONNECTION v5.0...</p>
          </div>
        </div>
      ) : (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-8">
          {/* Liquid Fill Effect */}
          <div className={`relative ${activeMode === 'nano' ? 'w-32 h-48' : 'w-64 h-96'} border-4 border-black mb-12 overflow-hidden bg-white transition-all`}>
            <div 
              className="absolute bottom-0 left-0 right-0 bg-black transition-all duration-300 ease-out"
              style={{ height: `${progress}%` }}
            >
              <div className="absolute top-0 left-0 right-0 h-4 bg-black -translate-y-full flex justify-around opacity-50">
                    <div className="w-full h-2 bg-black animate-pulse"></div>
              </div>
            </div>
            
            <div className={`absolute inset-0 flex items-center justify-center mix-blend-difference text-white z-10`}>
                <span className={`${activeMode === 'nano' ? 'text-3xl' : 'text-6xl'} font-black font-mono tracking-tighter`}>
                    {progress}%
                </span>
            </div>
          </div>

          <div className="text-center space-y-4 max-w-sm">
            <div className="flex justify-between label-system text-[9px] font-black pb-2 border-b border-silver">
                <span>SYSTEM / {activeMode.toUpperCase()}</span>
                <span>STATUS: {progress < 100 ? 'SYNCING' : 'READY'}</span>
            </div>
            {activeMode !== 'nano' && (
              <p className="text-[10px] font-mono font-bold uppercase tracking-widest pt-4 animate-pulse">
                Synthesizing proprietary data structures...
              </p>
            )}
          </div>

          <div className="absolute bottom-12 label-system text-[8px] opacity-30">
            SECURE_CHANNEL_ACTIVE // PORT_8080 // LARSEN_CORE
          </div>
        </div>
      )}
    </div>
  );
};
