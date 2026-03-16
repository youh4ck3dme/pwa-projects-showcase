'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MarketAnalyzer } from '@/components/ai/MarketAnalyzer';
import { Building2, ShieldCheck, Zap, Briefcase, ChevronRight, BarChart3, Globe2 } from 'lucide-react';

export default function EnterpriseClient() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-bone pt-32 pb-24">
      <div className="container-tight">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-20 border-b-2 border-black pb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <span className="label-system px-3 py-1 bg-black text-white text-[9px]">GLOBAL ENTERPRISE v4.0</span>
            <span className="label-system text-silver text-[9px]">INTEL-SYNTHESIS ACTIVE</span>
          </div>
          <h1 className="text-8xl font-black tracking-tighter leading-[0.8] mb-10 text-gradient">
            SCALE <br /> BEYOND.
          </h1>
          <p className="text-2xl font-medium text-charcoal max-w-3xl uppercase tracking-tighter leading-snug">
            Intelligent enterprise solutions and AI-driven talent infrastructure for high-velocity organizations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-20">
            {/* Value Propositions */}
            <motion.section 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {[
                { 
                  title: 'AI STRATEGY', 
                  desc: 'End-to-end automation strategies using Gemini Pro architecture.',
                  icon: <Zap className="w-6 h-6" />
                },
                { 
                  title: 'ELITE SELECTION', 
                  desc: 'AI-vetted talent pool optimized for enterprise-scale deployments.',
                  icon: <Briefcase className="w-6 h-6" />
                },
                { 
                  title: 'SECURE INFRA', 
                  desc: 'Military-grade security protocols for all AI-integrated workflows.',
                  icon: <ShieldCheck className="w-6 h-6" />
                },
                { 
                  title: 'GLOBAL REACH', 
                  desc: 'Distributed systems designed for multi-region scalability.',
                  icon: <Globe2 className="w-6 h-6" />
                }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  variants={itemVariants}
                  className="group p-8 bg-white border-2 border-charcoal hover:bg-black hover:text-white transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                  <div className="mb-6 text-charcoal group-hover:text-primary-400 transition-colors">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-black tracking-tighter mb-4 uppercase">{item.title}</h3>
                  <p className="text-sm font-medium leading-relaxed uppercase opacity-70 group-hover:opacity-100 transition-opacity">
                    {item.desc}
                  </p>
                  <div className="mt-8 pt-8 border-t border-silver group-hover:border-charcoal flex items-center gap-2 text-[10px] font-black tracking-widest uppercase">
                    Learn More <ChevronRight className="w-3 h-3" />
                  </div>
                </motion.div>
              ))}
            </motion.section>

            {/* AI Proposal Generator Teaser */}
            <motion.section 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative overflow-hidden bg-black text-white p-12 shadow-[12px_12px_0px_0px_var(--primary-600)]"
            >
              <div className="relative z-10 max-w-xl">
                <h4 className="label-system text-primary-400 mb-6">NEW FEATURE</h4>
                <h2 className="text-4xl font-black tracking-tighter mb-6 leading-tight uppercase">AI PROPOSAL <br /> ENGINE.</h2>
                <p className="text-lg font-medium mb-10 opacity-70 uppercase tracking-tight">
                  Generate comprehensive business proposals and architecture blueprints in 30 seconds.
                </p>
                <button className="px-8 py-4 bg-primary-600 text-white text-xs font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all">
                  Access Alpha
                </button>
              </div>
              <div className="absolute right-[-10%] top-[-10%] opacity-10 pointer-events-none">
                <Building2 className="w-96 h-96" />
              </div>
            </motion.section>
          </div>

          <aside className="lg:col-span-4 space-y-12">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 border-2 border-black bg-white"
            >
              <h4 className="label-system text-[10px] mb-8 underline underline-offset-8">MARKET INTELLIGENCE</h4>
              <MarketAnalyzer onAnalysisComplete={(a) => console.log('Market:', a)} />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 border-2 border-black bg-black text-white"
            >
              <h4 className="label-system text-silver mb-6">WHY SCALE?</h4>
              <ul className="space-y-6">
                {[
                  { icon: <BarChart3 className="w-4 h-4" />, text: 'GUARANTEED 99.9% UPTIME' },
                  { icon: <Briefcase className="w-4 h-4" />, text: 'DEDICATED ARCHITECTS' },
                  { icon: <Zap className="w-4 h-4" />, text: 'REAL-TIME PERFORMANCE' }
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-[11px] font-black uppercase tracking-widest text-silver">
                    <span className="text-primary-600 font-bold">{item.icon}</span>
                    {item.text}
                  </li>
                ))}
              </ul>
            </motion.div>
          </aside>
        </div>
      </div>
    </div>
  );
}
