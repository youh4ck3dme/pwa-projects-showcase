import React from 'react';

interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

export const ProjectTitle: React.FC<TitleProps> = ({ children, className = '' }) => (
  <h2 className={`text-2xl font-bold tracking-tight text-gray-900 group-hover:text-primary-600 transition-colors ${className}`}>
    {children}
  </h2>
);
