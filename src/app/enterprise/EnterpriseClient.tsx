'use client';

import React from 'react';
import { MarketAnalyzer } from '@/components/ai/MarketAnalyzer';

export default function EnterpriseClient() {
  return (
    <div className="max-w-7xl mx-auto" style={{ paddingLeft: 'var(--space-4)', paddingRight: 'var(--space-4)', paddingTop: 'var(--space-16)', paddingBottom: 'var(--space-16)' }}>
      <div style={{ marginBottom: 'var(--space-12)' }}>
        <h1 className="tracking-tight" style={{ fontSize: 'var(--text-4xl)', fontWeight: 'var(--font-black)', color: 'var(--text-primary)' }}>
          Enterprise <span style={{ color: 'var(--primary-600)' }}>Talent Marketplace</span>
        </h1>
        <p className="max-w-2xl" style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-lg)', color: 'var(--text-secondary)' }}>
          Inteligentné riešenia pre firemných klientov a outsourcing projektov poháňaný Gemini AI.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3" style={{ gap: 'var(--space-12)' }}>
        <div className="lg:col-span-2" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
          {/* Featured Enterprise Solutions */}
          <section className="border shadow-sm" style={{ backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-3xl)', padding: 'var(--space-8)', borderColor: 'var(--border-subtle)' }}>
            <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-6)', color: 'var(--text-primary)' }}>Prémiové riešenia</h2>
            <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 'var(--space-6)' }}>
              {[
                { title: 'AI Automation', desc: 'Automatizácia biznis procesov pomocou LLM.' },
                { title: 'Cloud Infrastructure', desc: 'Enterprise-grade cloudové riešenia.' },
                { title: 'Digital Transformation', desc: 'Kompletný prechod na digitálne fungovanie.' },
                { title: 'Custom Software', desc: 'Vývoj na mieru s dôrazom na škálovateľnosť.' }
              ].map((item, i) => (
                <div key={i} className="transition-colors" style={{ padding: 'var(--space-6)', backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius-2xl)' }}>
                  <h3 style={{ fontWeight: 'var(--font-bold)', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)', color: 'var(--text-primary)' }}>{item.title}</h3>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* AI Content Generator Placeholder */}
          <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white" style={{ borderRadius: 'var(--radius-3xl)', padding: 'var(--space-8)' }}>
            <div className="max-w-md">
              <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-4)' }}>AI Content Generator</h2>
              <p style={{ color: 'var(--slate-300)', marginBottom: 'var(--space-6)' }}>
                Generujte blogové príspevky, case studies a marketingové texty pre vaše projekty jedným klikom.
              </p>
              <button className="transition-colors" style={{ paddingLeft: 'var(--space-6)', paddingRight: 'var(--space-6)', paddingTop: 'var(--space-3)', paddingBottom: 'var(--space-3)', backgroundColor: 'var(--primary-600)', borderRadius: 'var(--radius-xl)', fontWeight: 'var(--font-bold)' }}>
                Spustiť generátor
              </button>
            </div>
          </section>
        </div>

        {/* Market Intelligence Sidebar */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
          <MarketAnalyzer onAnalysisComplete={(a) => console.log('Market:', a)} />
          
          <div className="border shadow-sm" style={{ backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-2xl)', padding: 'var(--space-6)', borderColor: 'var(--border-subtle)' }}>
            <h3 style={{ fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-4)', color: 'var(--text-primary)' }}>Prečo Enterprise?</h3>
            <ul className="text-sm" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', color: 'var(--text-secondary)' }}>
              <li className="flex items-center">
                <span style={{ width: 'var(--space-1-5, 6px)', height: 'var(--space-1-5, 6px)', backgroundColor: 'var(--primary-600)', borderRadius: 'var(--radius-3xl)', marginRight: 'var(--space-2)' }}></span>
                Garantovaná SLA podpora
              </li>
              <li className="flex items-center">
                <span style={{ width: 'var(--space-1-5, 6px)', height: 'var(--space-1-5, 6px)', backgroundColor: 'var(--primary-600)', borderRadius: 'var(--radius-3xl)', marginRight: 'var(--space-2)' }}></span>
                Dedikovaný project manager
              </li>
              <li className="flex items-center">
                <span style={{ width: 'var(--space-1-5, 6px)', height: 'var(--space-1-5, 6px)', backgroundColor: 'var(--primary-600)', borderRadius: 'var(--radius-3xl)', marginRight: 'var(--space-2)' }}></span>
                AI optimalizácia nákladov
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
