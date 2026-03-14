import React from 'react';

interface TaglineProps {
  children: React.ReactNode;
  className?: string;
}

export const ProjectTagline: React.FC<TaglineProps> = ({ children, className = '' }) => (
  <p className={`text-sm font-medium text-primary-600 mb-2 uppercase tracking-wider ${className}`}>
    {children}
  </p>
);
