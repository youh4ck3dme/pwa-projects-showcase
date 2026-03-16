'use client';

import React, { useEffect } from 'react';

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
  useEffect(() => {
    if (isVisible && onComplete) {
      onComplete();
    }
  }, [isVisible, onComplete]);

  return null;
};
