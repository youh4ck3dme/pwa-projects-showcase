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
              setTimeout(onComplete, mode === 'nano' ? 100 : 300);
            }
            return 100;
          }
          return prev + (mode === 'nano' ? 5 : 1);
        });
      }, config.step);
    }

    return () => {
      clearTimeout(phase1Timer);
      if (progressInterval) clearInterval(progressInterval);
    };
  }, [isVisible, phase, onComplete, config.phase1, config.step, mode]);

  useEffect(() => {
    if (isVisible && onComplete) {
      onComplete();
    }
  }, [isVisible, onComplete]);

  return null;
};
