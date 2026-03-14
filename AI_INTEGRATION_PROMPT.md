# Prompt pre AI: Integrácia Gemini Enterprise do Next.js projektu

## Kontext projektu

Mám Next.js PWA projekt "vzorkovník" pre prezentáciu projektov. Projekt už má:
- WordPress API integráciu (src/api/projects.ts)
- Projektové typy a kategórie (src/types/project.ts)
- Základný layout a komponenty
- Google Gemini Enterprise knižnice nainštalované
- PWA konfiguráciu

## Cieľ

Integrovať Google Gemini Enterprise AI funkcie do existujúceho projektu podľa týchto 5 obchodných modelov:

### 1. AI-Powered Project Matching Service
**Cieľ:** Vytvoriť inteligentný systém, ktorý bude odporúčať projekty na základe preferencií používateľa

**Funkcie:**
- Analyzovať históriu prezretých projektov
- Odporúčať podobné projekty pomocou AI
- Vytvoriť osobné preferencie používateľa
- Ukladať preferencie do localStorage

**Integrácia:**
- Pridať AI odporúčania na hlavnú stránku
- Vytvoriť komponent "Podobné projekty"
- Pridať filtrovanie podľa AI odporúčaní

### 2. Dynamic Commission Optimization
**Cieľ:** Analyzovať trhové trendy a optimalizovať zobrazenie projektov

**Funkcie:**
- Analyzovať návštevnosť projektov
- Dynamicky zoraďovať projekty podľa popularizmu
- Vytvoriť "Trendy" sekciu
- Optimalizovať metadáta projektov pre SEO

**Integrácia:**
- Pridať sekciu "Trendy projekty"
- Implementovať dynamické zoraďovanie
- Analyzovať klikacie frekvencie

### 3. Premium Project Management Suite
**Cieľ:** Vytvoriť AI asistenta pre detaily projektov

**Funkcie:**
- AI generovanie popisov projektov
- Automatické kategorizovanie
- Generovanie kľúčových slov
- Analýza technológií použitých v projekte

**Integrácia:**
- Pridať AI asistenta na detail projektu
- Generovanie doplnkových informácií
- Automatické tagovanie projektov

### 4. Enterprise Talent Marketplace
**Cieľ:** Vytvoriť sekciu pre firemné projekty a služby

**Funkcie:**
- AI generovanie firemných profilov
- Odporúčanie podobných firiem
- Analýza firemných potrieb
- Generovanie cenových ponúk

**Integrácia:**
- Vytvoriť novú stránku "/enterprise"
- Pridať firemné filtre
- Implementovať AI generovanie ponúk

### 5. AI Content Creation Marketplace
**Cieľ:** Vytvoriť nástroj pre generovanie obsahu o projektov

**Funkcie:**
- AI generovanie blogových článkov o projektov
- Vytváranie marketingových textov
- Generovanie sociálnych médií príspevkov
- Automatické vytváranie case study

**Integrácia:**
- Pridať sekciu "AI Content Generator"
- Vytvoriť formuláre pre generovanie obsahu
- Export vygenerovaného obsahu

## Technické požiadavky

### Súčasné technológie:
- Next.js 15.1.6
- React 19
- TypeScript
- Tailwind CSS
- PWA konfigurácia
- WordPress API

### Nové komponenty:
- AI Search Assistant
- Market Analyzer
- Revenue Optimizer
- Business Strategy Generator

### Dátové štruktúry:
- Preferencie používateľa
- História prezretých projektov
- AI odporúčania
- Trhové trendy
- Firemné profily

## Implementačný plán

### Fáza 1: Základná AI integrácia
1. Vytvoriť Gemini API služby
2. Pridať AI odporúčania na hlavnú stránku
3. Implementovať ukladanie preferencií

### Fáza 2: Rozšírené funkcie
1. Pridať dynamické zoraďovanie
2. Vytvoriť AI asistenta pre detaily
3. Implementovať trend analýzu

### Fáza 3: Enterprise funkcie
1. Vytvoriť firemnú sekciu
2. Pridať generovanie ponúk
3. Implementovať firemné filtre

### Fáza 4: Content generátor
1. Vytvoriť nástroj pre generovanie obsahu
2. Pridať export funkcie
3. Implementovať šablóny

## Súbory na úpravu

### Nové súbory:
- src/lib/gemini.ts (už existuje)
- src/lib/api.ts (už existuje)
- src/components/ai/SearchAssistant.tsx (už existuje)
- src/components/ai/MarketAnalyzer.tsx (už existuje)
- src/components/ai/RevenueOptimizer.tsx (už existuje)
- src/lib/business-strategies.ts (už existuje)

### Úpravy existujúcich:
- src/app/page.tsx - pridať AI odporúčania
- src/app/layout.tsx - pridať AI navigáciu
- src/components/layout/AppLayout.tsx - pridať AI komponenty
- src/types/project.ts - rozšíriť o AI dáta

## Očakávaný výsledok

Po integrácii budem mať:
1. Inteligentný projektový portfólio s AI odporúčaniami
2. Dynamické zoraďovanie podľa trhových trendov
3. AI asistenta pre detaily projektov
4. Firemnú sekciu s generovanými ponukami
5. Nástroj pre generovanie marketingového obsahu

## Požiadavky na testovanie

1. Otestovať AI odporúčania na reálnych dátach
2. Overiť dynamické zoraďovanie
3. Testovať generovanie obsahu
4. Overiť firemné funkcie
5. Testovať PWA kompatibilitu

## Ďalšie kroky po implementácii

1. Pridať reálne Gemini API kľúče
2. Napojiť na reálne WordPress API
3. Optimalizovať výkon AI volaní
4. Pridať caching mechanizmy
5. Implementovať A/B testovanie