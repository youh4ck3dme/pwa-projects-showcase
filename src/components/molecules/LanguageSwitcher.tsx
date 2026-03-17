'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex border-2 border-black h-10 overflow-hidden bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      {(['SK', 'EN'] as const).map((lang) => (
        <button
          key={lang}
          onClick={() => setLanguage(lang)}
          className={`px-4 text-[10px] font-black tracking-widest transition-all ${
            language === lang 
              ? 'bg-black text-white' 
              : 'text-black hover:bg-bone'
          } border-r last:border-r-0 border-black`}
        >
          {lang}
        </button>
      ))}
    </div>
  );
};
