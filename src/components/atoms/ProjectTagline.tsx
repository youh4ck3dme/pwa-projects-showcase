import React from 'react';

interface TaglineProps {
  children: React.ReactNode;
  className?: string;
}

export const ProjectTagline: React.FC<TaglineProps> = ({ children, className = '' }) => (
  <p className={`uppercase tracking-wider ${className}`} 
    style={{ 
      fontSize: 'var(--text-sm)', 
      fontWeight: 'var(--font-medium)', 
      color: 'var(--primary-600)',
      marginBottom: 'var(--space-2)'
    }}>
    {children}
  </p>
);
