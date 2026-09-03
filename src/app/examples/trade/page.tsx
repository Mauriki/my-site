'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { DemoTopBar } from '@/components/examples/DemoTopBar';
import { LanguageProvider, useLanguage } from '@/components/examples/LanguageContext';
import {
  Compass,
  CheckCircle2,
  HardHat,
  MapPin,
  Phone,
} from 'lucide-react';

function TradeContent() {
  const { lang, t } = useLanguage();

  // Interactive Estimator State
  const [projectType, setProjectType] = useState<'full_home' | 'kitchen' | 'bathroom' | 'extension'>('kitchen');
  const [spaceArea, setSpaceArea] = useState<number>(45); // in m2
  const [finishTier, setFinishTier] = useState<'standard' | 'premium' | 'bespoke'>('premium');

  // Contact / Measurement Form State
  const [formDone, setFormDone] = useState(false);
  const [ownerName, setOwnerName] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [projectLocation, setProjectLocation] = useState('');

  // Cost & Timeline Calculation Engine
  const baseRates = {
    full_home: { baseM2: 420, weeksPer30m: 3, labelEn: 'Complete Residence Overhaul', labelSq: 'Renovim i Plotë i Banesës / Shtëpisë' },
    kitchen: { baseM2: 550, weeksPer30m: 2.5, labelEn: 'Architectural Kitchen & Millwork', labelSq: 'Kuzhinë Moderne & Punime Druri' },
    bathroom: { baseM2: 680, weeksPer30m: 2, labelEn: 'Luxury Stone Bathroom Suite', labelSq: 'Banjë Luksoze me Gur Natyral' },
    extension: { baseM2: 490, weeksPer30m: 3.5, labelEn: 'Structural Floor Extension', labelSq: 'Zgjerim Struktural & Ndërtim' },
  };

  const tierMultipliers = {
    standard: { cost: 1.0, time: 1.0, titleEn: 'Standard Craft Tier', titleSq: 'Zgjedhje Standarde' },
    premium: { cost: 1.35, time: 1.2, titleEn: 'Architectural Premium', titleSq: 'Cilësi Premium Arkitekturore' },
    bespoke: { cost: 1.75, time: 1.4, titleEn: 'Master Artisan Bespoke', titleSq: 'Punim Ekskluziv Artizanal' },
  };

  const selectedBase = baseRates[projectType];
  const selectedTier = tierMultipliers[finishTier];

  const calculatedMinCost = Math.round(spaceArea * selectedBase.baseM2 * selectedTier.cost * 0.95);
  const calculatedMaxCost = Math.round(spaceArea * selectedBase.baseM2 * selectedTier.cost * 1.15);
  const calculatedWeeks = Math.max(3, Math.round((spaceArea / 25) * selectedBase.weeksPer30m * selectedTier.time));

  const currencySymbol = '€';
  const locationText = lang === 'sq' ? 'Zona Industriale, Prishtinë-Fushë Kosovë' : 'Studio 12, Design District, Greenwich Peninsula, London SE10 0AX';
  const phoneText = lang === 'sq' ? '+383 45 600 700' : '+44 20 7946 0418';
  const sampleName = lang === 'sq' ? 'Valon Berisha' : 'Edward Cross';

  return (
    <div style={{ backgroundColor: '#14171a', color: '#e5e7eb', minHeight: '100vh', fontFamily: "'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif" }}>
      <DemoTopBar
        demoTitle={{ en: 'Architecture & Construction Demo', sq: 'Shembull Faqeje: Ndërtim & Arkitekturë' }}
        industry={{ en: 'Renovations, Interiors & Trade', sq: 'Renovim, Interier & Ndërtim' }}
        badgeColor="#d97706"
      />

      {/* Top Header */}
      <header style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', backgroundColor: '#14171a', position: 'sticky', top: '49px', zIndex: 30 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', backgroundColor: '#d97706', color: '#14171a', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Compass size={18} />
            </div>
            <div>
              <span style={{ fontSize: '1.25rem', fontWeight: 900, letterSpacing: '-0.02em', color: '#ffffff', display: 'block', lineHeight: 1 }}>
                ARTISAN
              </span>
              <span style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#d97706', fontWeight: 800 }}>
                BUILD & CRAFT
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '28px', fontSize: '0.88rem', fontWeight: 700 }} className="hidden-mobile">
            <a href="#calculator" style={{ color: '#9ca3af', textDecoration: 'none' }}>{t('Cost Estimator', 'Llogaritësi i Kostos')}</a>
            <a href="#projects" style={{ color: '#9ca3af', textDecoration: 'none' }}>{t('Portfolio', 'Projektet')}</a>
            <a href="#quote" style={{ color: '#9ca3af', textDecoration: 'none' }}>{t('Get Quote', 'Kërko Ofertë')}</a>
          </div>

          <a
            href="#calculator"
            style={{
              backgroundColor: '#d97706',
              color: '#14171a',
              padding: '10px 20px',
              borderRadius: '4px',
              fontWeight: 800,
              fontSize: '0.85rem',
              textDecoration: 'none',
              boxShadow: '0 2px 10px rgba(217, 119, 6, 0.35)',
            }}
          >
            {t('Calculate Project Cost', 'Llogarit Koston')}
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 24px 90px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(217, 119, 6, 0.15)', color: '#fbbf24', padding: '6px 14px', borderRadius: '4px', fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '20px' }}>
              <HardHat size={14} />
              {t('Premium Architectural Renovations & Custom Millwork', 'Renovime Luksoze & Punime Druri të Personalizuara')}
            </div>

            <h1 style={{ fontSize: 'clamp(2.4rem, 4.8vw, 4rem)', lineHeight: 1.08, fontWeight: 900, letterSpacing: '-0.03em', margin: '0 0 24px', color: '#ffffff' }}>
              {t('Bespoke architectural execution built to last generations.', 'Ndërtime arkitekturore me saktësi absolute dhe jetëgjatësi.')}
            </h1>

            <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#9ca3af', margin: '0 0 32px' }}>
              {t(
                'From high-concept residential remodeling to custom stone joinery and structural extensions. We combine licensed structural engineering with master craftsmanship.',
                'Nga renovimet e plota të banesave e vilave, deri te punimet e detajuara me mermer dhe dru masiv. Garanci e plotë kontraktuale dhe përfundim në afat.'
              )}
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <a
                href="#calculator"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#d97706',
                  color: '#14171a',
                  padding: '14px 28px',
                  borderRadius: '4px',
                  fontWeight: 800,
                  fontSize: '0.92rem',
                  textDecoration: 'none',
                }}
              >
                <span>{t('Instant Cost Estimator', 'Llogarit Koston Menjëherë')}</span>
              </a>

              <a
                href="#projects"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'transparent',
                  color: '#ffffff',
                  border: '1px solid rgba(255,255,255,0.2)',
                  padding: '14px 24px',
                  borderRadius: '4px',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  textDecoration: 'none',
                }}
              >
                {t('View Finished Works', 'Shiko Punët e Përfunduara')}
              </a>
            </div>
          </div>

          {/* Living Room Interior (Strictly Architectural Interior - Zero People) */}
          <div style={{ position: 'relative', height: '440px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
              alt="High-end modern architectural living room interior with oak slats and micro-cement floors"
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              style={{ objectFit: 'cover' }}
              priority
            />
            <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px', backgroundColor: 'rgba(20,23,26,0.92)', backdropFilter: 'blur(8px)', padding: '12px 18px', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#d97706', fontWeight: 800, textTransform: 'uppercase' }}>{t('Featured Project', 'Projekti i Javës')}</span>
                <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#fff' }}>{t('Lake Residence &bull; 180m² Overhaul', 'Vila në Liqen &bull; Renovim 180m²')}</div>
              </div>
              <span style={{ fontSize: '0.8rem', backgroundColor: 'rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: '4px', fontWeight: 800 }}>
                {t('Completed in 7 Weeks', 'Përfunduar në 7 Javë')}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Project Cost & Timeline Calculator Section */}
      <section id="calculator" style={{ backgroundColor: '#1c2024', padding: '80px 24px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '44px' }}>
            <span style={{ color: '#d97706', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              {t('Transparent Pricing Engine', 'Kalkulatori i Çmimeve')}
            </span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 900, margin: '8px 0 14px', letterSpacing: '-0.02em', color: '#ffffff' }}>
              {t('Interactive Project Cost & Timeline Estimator', 'Llogaritni Koston dhe Kohën e Projektit')}
            </h2>
            <p style={{ color: '#9ca3af', maxWidth: '620px', margin: '0 auto', fontSize: '0.95rem' }}>
              {t(
                'Adjust project parameters below for an immediate, data-backed estimate based on current regional material and labor standards.',
                'Përzgjidhni parametrat e hapësirës suaj për të marrë një vlerësim të saktë të buxhetit dhe kohëzgjatjes.'
              )}
            </p>
          </div>

          <div style={{ backgroundColor: '#252a30', borderRadius: '12px', padding: '36px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', marginBottom: '36px' }}>
              {/* Project Type */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: '#e5e7eb', marginBottom: '10px' }}>
                  1. {t('Scope of Renovation', 'Lloji i Projektit')}
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {[
                    { id: 'kitchen', en: 'Kitchen & Millwork', sq: 'Kuzhinë & Dru' },
                    { id: 'bathroom', en: 'Stone Bathroom', sq: 'Banjë me Gur' },
                    { id: 'full_home', en: 'Full Home (Complete)', sq: 'Renovim i Plotë' },
                    { id: 'extension', en: 'Room Extension', sq: 'Zgjerim Ndërtimi' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setProjectType(p.id as typeof projectType)}
                      style={{
                        padding: '12px 10px',
                        borderRadius: '6px',
                        border: `1px solid ${projectType === p.id ? '#d97706' : 'rgba(255,255,255,0.1)'}`,
                        backgroundColor: projectType === p.id ? 'rgba(217, 119, 6, 0.2)' : '#1a1d20',
                        color: projectType === p.id ? '#fbbf24' : '#9ca3af',
                        fontWeight: 800,
                        fontSize: '0.82rem',
                        cursor: 'pointer',
                        textAlign: 'center',
                      }}
                    >
                      {t(p.en, p.sq)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Area Slider */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 800, color: '#e5e7eb' }}>
                    2. {t('Floor Space Area:', 'Sipërfaqja e Hapësirës:')}
                  </label>
                  <span style={{ fontSize: '1.1rem', fontWeight: 900, color: '#fbbf24' }}>
                    {spaceArea} m² ({Math.round(spaceArea * 10.764)} sq ft)
                  </span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={250}
                  step={5}
                  value={spaceArea}
                  onChange={(e) => setSpaceArea(parseInt(e.target.value, 10))}
                  style={{ width: '100%', accentColor: '#d97706', cursor: 'pointer', height: '8px', borderRadius: '4px' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#6b7280', marginTop: '6px' }}>
                  <span>20 m²</span>
                  <span>100 m²</span>
                  <span>250 m²</span>
                </div>
              </div>

              {/* Finish Tier */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: '#e5e7eb', marginBottom: '10px' }}>
                  3. {t('Material & Finish Level', 'Niveli i Materialeve & Punimit')}
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
                  {[
                    { id: 'standard', en: 'Standard', sq: 'Standard' },
                    { id: 'premium', en: 'Premium', sq: 'Premium' },
                    { id: 'bespoke', en: 'Bespoke', sq: 'Ekskluziv' },
                  ].map((tier) => (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setFinishTier(tier.id as typeof finishTier)}
                      style={{
                        padding: '10px 6px',
                        borderRadius: '6px',
                        border: `1px solid ${finishTier === tier.id ? '#d97706' : 'rgba(255,255,255,0.1)'}`,
                        backgroundColor: finishTier === tier.id ? '#d97706' : '#1a1d20',
                        color: finishTier === tier.id ? '#14171a' : '#9ca3af',
                        fontWeight: 800,
                        fontSize: '0.78rem',
                        cursor: 'pointer',
                      }}
                    >
                      {t(tier.en, tier.sq)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Calculated Output Card */}
            <div style={{ backgroundColor: '#1a1d20', borderRadius: '8px', padding: '24px', border: '1px solid #d97706', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '0.78rem', color: '#9ca3af', fontWeight: 800, textTransform: 'uppercase' }}>
                  {t('Estimated Budget Range:', 'Buxheti i Vlerësuar:')}
                </span>
                <div style={{ fontSize: '1.9rem', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.02em' }}>
                  {currencySymbol}{calculatedMinCost.toLocaleString()} &ndash; {currencySymbol}{calculatedMaxCost.toLocaleString()}
                </div>
                <small style={{ color: '#fbbf24', fontSize: '0.8rem', fontWeight: 700 }}>
                  {t('Includes materials, labor & turnkey site cleanup', 'Përfshin materialet, punën dhe pastrimin')}
                </small>
              </div>

              <div>
                <span style={{ fontSize: '0.78rem', color: '#9ca3af', fontWeight: 800, textTransform: 'uppercase' }}>
                  {t('Estimated Duration:', 'Kohëzgjatja e Parashikuar:')}
                </span>
                <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#ffffff' }}>
                  {calculatedWeeks} &ndash; {calculatedWeeks + 2} {t('Weeks', 'Javë')}
                </div>
                <small style={{ color: '#9ca3af', fontSize: '0.8rem' }}>
                  {t('Fixed schedule penalty guarantee', 'Garanci kontraktuale për afatin')}
                </small>
              </div>

              <a
                href="#quote"
                style={{
                  backgroundColor: '#d97706',
                  color: '#14171a',
                  padding: '13px 20px',
                  borderRadius: '4px',
                  fontWeight: 900,
                  fontSize: '0.9rem',
                  textAlign: 'center',
                  textDecoration: 'none',
                }}
              >
                {t('Lock In Free On-Site Survey', 'Rezervo Matjen Falas në Objekt')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Showcase (Strictly Interiors & Architectural Objects - No People) */}
      <section id="projects" style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span style={{ color: '#d97706', fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 800 }}>
            {t('Selected Works', 'Punët e Fundit')}
          </span>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 900, margin: '8px 0 0', color: '#ffffff' }}>
            {t('Craftsmanship in Detail', 'Përsosmëri në Çdo Detaj')}
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          <div style={{ height: '320px', position: 'relative', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
            <Image
              src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80"
              alt="Custom oak kitchen island with matte black fixtures and quartzite countertop"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              style={{ objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent 60%)' }} />
            <div style={{ position: 'absolute', bottom: '16px', left: '16px' }}>
              <strong style={{ display: 'block', fontSize: '1.05rem', color: '#fff' }}>{t('Minimalist Oak & Quartz Kitchen', 'Kuzhinë me Dru Lisi & Kuarc')}</strong>
              <small style={{ color: '#9ca3af' }}>{t('Custom CNC millwork + integrated LED profiles', 'Punim i personalizuar me dru dhe profile LED')}</small>
            </div>
          </div>

          <div style={{ height: '320px', position: 'relative', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
            <Image
              src="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80"
              alt="Monolithic travertine master bathroom with concealed drains and brass tap"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              style={{ objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent 60%)' }} />
            <div style={{ position: 'absolute', bottom: '16px', left: '16px' }}>
              <strong style={{ display: 'block', fontSize: '1.05rem', color: '#fff' }}>{t('Travertine Stone Wetroom Suite', 'Banjë me Gur Travertin & Dushe me Shira')}</strong>
              <small style={{ color: '#9ca3af' }}>{t('Seamless waterproofing + floor heating', 'Izolim i plotë hidro & ngrohje në dysheme')}</small>
            </div>
          </div>

          <div style={{ height: '320px', position: 'relative', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
              alt="Modern architectural open floor plan with polished microcement and bespoke joinery"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              style={{ objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent 60%)' }} />
            <div style={{ position: 'absolute', bottom: '16px', left: '16px' }}>
              <strong style={{ display: 'block', fontSize: '1.05rem', color: '#fff' }}>{t('Industrial Loft Overhaul', 'Apartament me Hapësirë të Hapur')}</strong>
              <small style={{ color: '#9ca3af' }}>{t('Acoustic wall slats & architectural lighting', 'Panele akustike druri dhe ndriçim arkitektural')}</small>
            </div>
          </div>
        </div>
      </section>

      {/* On-Site Survey & Quote Form */}
      <section id="quote" style={{ backgroundColor: '#181b1f', padding: '80px 24px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'center' }}>
          <div>
            <span style={{ color: '#d97706', fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 800 }}>
              {t('Zero-Obligation Estimate', 'Vlerësim Falas')}
            </span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 900, margin: '8px 0 16px', color: '#ffffff' }}>
              {t('Book Your Free On-Site Measurement', 'Caktoni Matjen Falas në Vendngjarje')}
            </h2>
            <p style={{ color: '#9ca3af', lineHeight: 1.7, fontSize: '0.92rem', marginBottom: '20px' }}>
              {t(
                'Our lead project engineer visits your property with laser measurement tools to review structural viability and provide an itemized fixed-price quote.',
                'Inxhinieri ynë vjen në pronën tuaj me aparatura laserike për të kryer matjet dhe për t\'ju dorëzuar ofertën e detajuar me çmim fiks.'
              )}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: '#cbd5e1', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} color="#d97706" />
                <span>{t('10-Year Structural & Waterproofing Warranty', '10 Vite Garanci Strukturore & Hidroizolimi')}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} color="#d97706" />
                <span>{t('Clean site guarantee & daily dust management', 'Pastërti ditore dhe menaxhim mbetjesh')}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={16} color="#d97706" />
                <span>{locationText}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={16} color="#d97706" />
                <span>{phoneText}</span>
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: '#21252b', padding: '32px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
            {formDone ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ width: '56px', height: '56px', backgroundColor: 'rgba(34,197,94,0.15)', color: '#4ade80', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <CheckCircle2 size={32} />
                </div>
                <h3 style={{ fontSize: '1.3rem', color: '#fff', margin: '0 0 8px' }}>
                  {t('Survey Request Received!', 'Kërkesa u Regjistrua!')}
                </h3>
                <p style={{ color: '#9ca3af', fontSize: '0.88rem', lineHeight: 1.6, margin: '0 0 16px' }}>
                  {t(
                    `Thank you, ${ownerName || 'Property Owner'}! We will call you within 24 hours to schedule the on-site survey.`,
                    `Faleminderit, ${ownerName || 'Pronar'}! Do t\'ju telefonojmë brenda 24 orëve për të caktuar vizitën në objekt.`
                  )}
                </p>
                <button
                  type="button"
                  onClick={() => setFormDone(false)}
                  style={{ backgroundColor: '#d97706', color: '#14171a', padding: '8px 20px', borderRadius: '4px', border: 'none', fontWeight: 800, cursor: 'pointer' }}
                >
                  {t('Close', 'Mbyll')}
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setFormDone(true);
                }}
                style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
              >
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#9ca3af', marginBottom: '4px' }}>
                    {t('Your Name', 'Emri Juaj')}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={sampleName}
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    style={{ width: '100%', padding: '10px', backgroundColor: '#14171a', border: '1px solid #374151', borderRadius: '4px', color: '#fff', fontSize: '0.85rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#9ca3af', marginBottom: '4px' }}>
                    {t('Phone Number (WhatsApp)', 'Numri i Telefonit (WhatsApp)')}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder={phoneText}
                    value={ownerPhone}
                    onChange={(e) => setOwnerPhone(e.target.value)}
                    style={{ width: '100%', padding: '10px', backgroundColor: '#14171a', border: '1px solid #374151', borderRadius: '4px', color: '#fff', fontSize: '0.85rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#9ca3af', marginBottom: '4px' }}>
                    {t('Project Address / Location', 'Vendndodhja e Pronës')}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={lang === 'sq' ? 'p.sh. Prishtinë, Lagjja Marigona' : 'e.g. Richmond upon Thames, London'}
                    value={projectLocation}
                    onChange={(e) => setProjectLocation(e.target.value)}
                    style={{ width: '100%', padding: '10px', backgroundColor: '#14171a', border: '1px solid #374151', borderRadius: '4px', color: '#fff', fontSize: '0.85rem' }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    backgroundColor: '#d97706',
                    color: '#14171a',
                    padding: '12px',
                    borderRadius: '4px',
                    border: 'none',
                    fontWeight: 900,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    marginTop: '6px',
                  }}
                >
                  {t('Confirm Free Measurement Request', 'Dërgo Kërkesën për Matje Falas')}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '32px 24px', textAlign: 'center', fontSize: '0.8rem', color: '#6b7280' }}>
        <p style={{ margin: 0 }}>
          &copy; {new Date().getFullYear()} Artisan Build & Craft. {t('Licensed Architectural General Contractor.', 'Kontraktor i Licencuar Ndërtimi.')}
        </p>
      </footer>
    </div>
  );
}

export default function TradePage() {
  return (
    <LanguageProvider>
      <TradeContent />
    </LanguageProvider>
  );
}
