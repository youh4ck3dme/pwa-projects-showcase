'use client';

import React, { useEffect } from 'react';

interface AILoadingOverlayProps {
  isVisible: boolean;
  onComplete?: () => void;
  /**
   * @deprecated All animations are disabled as per user request.
   */
  mode?: 'deep' | 'standard' | 'nano';
}

/**
 * LARSEN EVANS - EMERGENCY OVERRIDE
 * This component is now a logic-only passthrough.
 * It bypasses all animation phases to ensure maximum UX speed.
 */
export const AILoadingOverlay: React.FC<AILoadingOverlayProps> = ({ 
  isVisible, 
  onComplete 
}) => {
  useEffect(() => {
    if (isVisible && onComplete) {
      // Immediate execution of completion callback
      onComplete();
    }
  }, [isVisible, onComplete]);

  // Completely disabled as per user request "uplne vypn animaciu"
  return null;
};
