'use client';

import React from 'react';
import { MarketAnalyzer } from '@/components/ai/MarketAnalyzer';

export default function EnterpriseClient() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
          Enterprise <span className="text-primary-600">Talent Marketplace</span>
        </h1>
        <p className="mt-4 text-lg text-gray-500 max-w-2xl">
          Inteligentné riešenia pre firemných klientov a outsourcing projektov poháňaný Gemini AI.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          {/* Featured Enterprise Solutions */}
          <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Prémiové riešenia</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: 'AI Automation', desc: 'Automatizácia biznis procesov pomocou LLM.' },
                { title: 'Cloud Infrastructure', desc: 'Enterprise-grade cloudové riešenia.' },
                { title: 'Digital Transformation', desc: 'Kompletný prechod na digitálne fungovanie.' },
                { title: 'Custom Software', desc: 'Vývoj na mieru s dôrazom na škálovateľnosť.' }
              ].map((item, i) => (
                <div key={i} className="p-6 bg-gray-50 rounded-2xl hover:bg-primary-50 transition-colors">
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* AI Content Generator Placeholder */}
          <section className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white">
            <div className="max-w-md">
              <h2 className="text-2xl font-bold mb-4">AI Content Generator</h2>
              <p className="text-gray-300 mb-6">
                Generujte blogové príspevky, case studies a marketingové texty pre vaše projekty jedným klikom.
              </p>
              <button className="px-6 py-3 bg-primary-600 rounded-xl font-bold hover:bg-primary-500 transition-colors">
                Spustiť generátor
              </button>
            </div>
          </section>
        </div>

        {/* Market Intelligence Sidebar */}
        <aside className="space-y-8">
          <MarketAnalyzer onAnalysisComplete={(a) => console.log('Market:', a)} />
          
          <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-bold mb-4">Prečo Enterprise?</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2"></span>
                Garantovaná SLA podpora
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2"></span>
                Dedikovaný project manager
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2"></span>
                AI optimalizácia nákladov
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
