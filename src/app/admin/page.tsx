'use client';

import React from 'react';
import { motion } from 'framer-motion';
import IngestionDashboard from '@/components/admin/IngestionDashboard';
import { useLanguage } from '@/context/LanguageContext';
import { ShieldCheck, Database, Zap } from 'lucide-react';

export default function AdminPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-bone pt-32 pb-24">
      <div className="container-tight">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20 border-b border-black pb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <span className="label-system px-3 py-1 bg-black text-white text-[9px]">ADMIN v5.5</span>
            <span className="label-system text-charcoal text-[9px] uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck className="w-3 h-3 text-primary-600" /> AUTHORIZED ACCESS ONLY
            </span>
          </div>
          
          <h1 className="text-8xl font-black tracking-tighter leading-[0.8] mb-10 text-gradient uppercase">
            Product <br /> Ingestion
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
             <div className="p-6 bg-white border border-black flex items-center gap-4">
                <Database className="w-8 h-8 text-primary-600" />
                <div>
                   <p className="text-[10px] font-black text-silver uppercase">Repository Stat</p>
                   <p className="text-xl font-black uppercase">8 Active Projects</p>
                </div>
             </div>
             <div className="p-6 bg-white border border-black flex items-center gap-4">
                <Zap className="w-8 h-8 text-primary-600" />
                <div>
                   <p className="text-[10px] font-black text-silver uppercase">AI Load</p>
                   <p className="text-xl font-black uppercase">Optimal Status</p>
                </div>
             </div>
             <div className="p-6 bg-black text-white flex items-center gap-4 border border-black">
                <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center font-black">LE</div>
                <div>
                   <p className="text-[10px] font-black text-silver uppercase">Identity</p>
                   <p className="text-xl font-black uppercase">Larsen Evans</p>
                </div>
             </div>
          </div>
        </motion.div>

        {/* Core Content */}
        <IngestionDashboard />
      </div>

      {/* Decorative Matrix Background (Subtle) */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] flex flex-wrap gap-4 overflow-hidden z-0 p-4">
         {Array.from({ length: 100 }).map((_, i) => (
           <div key={i} className="text-[8px] font-mono font-bold uppercase tracking-widest">
             {Math.random() > 0.5 ? '01' : '10'}_{Math.random().toString(16).substring(2, 6)}
           </div>
         ))}
      </div>
    </div>
  );
}
