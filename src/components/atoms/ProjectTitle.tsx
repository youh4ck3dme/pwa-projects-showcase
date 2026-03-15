import React from 'react';

interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

export const ProjectTitle: React.FC<TitleProps> = ({ children, className = '' }) => (
  <h2 className={`transition-colors ${className}`} 
    style={{ 
      fontSize: 'var(--text-2xl)', 
      fontWeight: 'var(--font-bold)', 
      letterSpacing: '-0.025em', // tight
      color: 'var(--text-primary)'
    }}>
    {children}
  </h2>
);
