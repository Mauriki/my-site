'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { DemoTopBar } from '@/components/examples/DemoTopBar';
import { LanguageProvider, useLanguage } from '@/components/examples/LanguageContext';
import {
  ShieldCheck,
  Briefcase,
  Scale,
  ArrowRight,
  CheckCircle2,
  Lock,
  Globe,
  PhoneCall,
  MapPin,
} from 'lucide-react';

function ProfessionalContent() {
  const { lang, t } = useLanguage();

  // Case Assessment Tool State
  const [assessmentDomain, setAssessmentDomain] = useState<'corporate' | 'real_estate' | 'tax' | 'litigation'>('corporate');
  const [assessmentUrgency, setAssessmentUrgency] = useState<'immediate' | 'planning' | 'audit'>('immediate');
  const [dealScope, setDealScope] = useState<'small' | 'mid' | 'large'>('mid');

  // Consultation Form State
  const [consultSubmitted, setConsultSubmitted] = useState(false);
  const [firmName, setFirmName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [legalTopic, setLegalTopic] = useState('');

  const practiceAreas = [
    {
      titleEn: 'Corporate M&A & Business Formation',
      titleSq: 'Bashkime & Blerje Kompanish (M&A)',
      descEn: 'Structuring high-value acquisitions, joint ventures, seed/series investment rounds, and corporate governance frameworks.',
      descSq: 'Strukturim blerjesh kompanish, marrëveshje aksionarësh, raunde investimi dhe qeverisje korporative.',
      pointsEn: ['Cross-border deal execution', 'Due diligence audits', 'Commercial contracts & NDAs'],
      pointsSq: ['Transaksione ndërkombëtare', 'Auditimi ligjor (Due Diligence)', 'Kontrata tregtare & Marrëveshje konfidencialiteti'],
    },
    {
      titleEn: 'Commercial Real Estate & Development',
      titleSq: 'Pasuri të Paluajtshme & Zhvillim Pronash',
      descEn: 'Zoning approvals, complex title verification, leasing agreements, and construction dispute mitigation.',
      descSq: 'Leje ndërtimi, verifikim pronësie, kontrata qiraje komerciale dhe zgjidhje kontestesh ndërtimore.',
      pointsEn: ['Title search & deed escrow', 'Commercial lease structuring', 'Construction contract disputes'],
      pointsSq: ['Verifikim i titujve të pronësisë', 'Strukturim qirash afatgjata', 'Kontrata ndërtimi'],
    },
    {
      titleEn: 'Tax Structuring & Wealth Preservation',
      titleSq: 'Planifikim Tatimor & Mbrojtje Pasurie',
      descEn: 'Strategic international tax compliance, family office wealth structuring, and asset protection trusts.',
      descSq: 'Pajtueshmëri me legjislacionin tatimor, struktura për mbrojtjen e pasurisë familjare dhe truste.',
      pointsEn: ['International treaty optimization', 'Estate & succession planning', 'Corporate tax defense'],
      pointsSq: ['Optimizim tatimor ndërkombëtar', 'Planifikim trashëgimie', 'Mbrojtje në kontrolle tatimore'],
    },
    {
      titleEn: 'Commercial Litigation & Arbitration',
      titleSq: 'Arbitrazh & Zgjidhje Konfliktesh Tregtare',
      descEn: 'High-stakes court representation, breach of contract enforcement, and international arbitration tribunals.',
      descSq: 'Përfaqësim në gjykata dhe tribunale arbitrazhi ndërkombëtar për kontrata me vlerë të lartë.',
      pointsEn: ['ICC & LCIA arbitration', 'Emergency injunctive relief', 'Debt & asset recovery'],
      pointsSq: ['Arbitrazh pranë ICC & LCIA', 'Masa të përkohshme sigurimi', 'Rikthim asetesh dhe borxhesh'],
    },
  ];

  const officesText = lang === 'sq' ? 'Zyrat: Prishtinë · Cyrih · Londër' : 'Offices: London · Zurich · Pristina';
  const phoneText = lang === 'sq' ? '+383 38 220 900' : '+44 20 7946 0550';
  const addressText = lang === 'sq' ? 'Rruga UÇK, Qendra e Biznesit, Prishtinë' : '100 Bishopsgate, City of London, EC2N 4AG';
  const sampleName = lang === 'sq' ? 'Bujar Krasniqi' : 'Alasdair Montgomery';

  return (
    <div style={{ backgroundColor: '#070d18', color: '#e2e8f0', minHeight: '100vh', fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif" }}>
      <DemoTopBar
        demoTitle={{ en: 'Corporate Law Firm Demo', sq: 'Shembull Faqeje: Zyrë Ligjore & Konsulencë' }}
        industry={{ en: 'Legal, Advisory & Corporate', sq: 'Shërbime Ligjore & Korporative' }}
        badgeColor="#a17c38"
      />

      {/* Top Corporate Nav */}
      <header style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', backgroundColor: '#070d18', position: 'sticky', top: '49px', zIndex: 30 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '32px', height: '32px', border: '1px solid #a17c38', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a17c38' }}>
              <Scale size={18} />
            </div>
            <div>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '0.15em', color: '#ffffff', display: 'block', lineHeight: 1 }}>
                VANGUARD
              </span>
              <span style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#a17c38', fontWeight: 700 }}>
                & PARTNERS LEGAL
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '28px', fontSize: '0.85rem', fontWeight: 600 }} className="hidden-mobile">
            <a href="#practices" style={{ color: '#94a3b8', textDecoration: 'none' }}>{t('Practice Areas', 'Fushat e Praktikës')}</a>
            <a href="#estimator" style={{ color: '#94a3b8', textDecoration: 'none' }}>{t('Case Evaluation', 'Vlerësim Rasti')}</a>
            <a href="#consultation" style={{ color: '#94a3b8', textDecoration: 'none' }}>{t('Offices', 'Zyrat')}</a>
          </div>

          <a
            href="#consultation"
            style={{
              backgroundColor: '#a17c38',
              color: '#070d18',
              padding: '10px 20px',
              borderRadius: '4px',
              fontSize: '0.82rem',
              fontWeight: 800,
              letterSpacing: '0.04em',
              textDecoration: 'none',
              boxShadow: '0 2px 10px rgba(161, 124, 56, 0.3)',
            }}
          >
            {t('Schedule Consultation', 'Konsultim Konfidencial')}
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 24px 90px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(161, 124, 56, 0.4)', padding: '5px 14px', borderRadius: '4px', fontSize: '0.75rem', color: '#dfb78e', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 800, marginBottom: '24px' }}>
              <ShieldCheck size={14} color="#a17c38" />
              {t('High-Stakes Corporate & Commercial Counsel', 'Këshillim Ligjor & Korporativ me Reputacion')}
            </div>

            <h1 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', lineHeight: 1.12, fontWeight: 700, margin: '0 0 24px', letterSpacing: '-0.02em', color: '#ffffff', fontFamily: "'Playfair Display', Georgia, serif" }}>
              {t('Strategic legal precision for decisive commercial advantage.', 'Saktësi ligjore strategjike për suksesin tuaj tregtar.')}
            </h1>

            <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#94a3b8', margin: '0 0 32px', fontWeight: 400 }}>
              {t(
                'We represent leading enterprises, financial institutions, and family offices across complex corporate transactions, regulatory compliance, and cross-border commercial disputes.',
                'Ne mbrojmë interesat e kompanive udhëheqëse, institucioneve financiare dhe investitorëve në transaksione komplekse, pajtueshmëri rregullatore dhe arbitrazh ndërkombëtar.'
              )}
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <a
                href="#estimator"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#a17c38',
                  color: '#070d18',
                  padding: '13px 26px',
                  borderRadius: '4px',
                  fontSize: '0.9rem',
                  fontWeight: 800,
                  textDecoration: 'none',
                }}
              >
                <span>{t('Evaluate Your Case Scope', 'Vlerëso Çështjen Tuaj')}</span>
                <ArrowRight size={16} />
              </a>

              <a
                href="#practices"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'transparent',
                  color: '#ffffff',
                  border: '1px solid rgba(255,255,255,0.2)',
                  padding: '13px 22px',
                  borderRadius: '4px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                {t('Our Practice Areas', 'Fushat e Praktikës')}
              </a>
            </div>
          </div>

          {/* Boardroom Architecture (Strictly Object / Office Interior - Zero People) */}
          <div style={{ position: 'relative', height: '420px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
            <Image
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80"
              alt="Modern corporate boardroom with executive glass table and architectural lighting"
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              style={{ objectFit: 'cover' }}
              priority
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #070d18 0%, transparent 60%)' }} />
            <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', borderTop: '1px solid rgba(161, 124, 56, 0.4)', paddingTop: '16px' }}>
              <div>
                <strong style={{ display: 'block', fontSize: '1.4rem', color: '#dfb78e' }}>€120M+</strong>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{t('Transaction Volume Advised', 'Vlera e Transaksioneve')}</span>
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '1.4rem', color: '#dfb78e' }}>98.8%</strong>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{t('Resolution Success Rate', 'Sukses në Zgjidhje')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Areas Section */}
      <section id="practices" style={{ backgroundColor: '#0b1424', padding: '80px 24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{ color: '#a17c38', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 800 }}>
              {t('Core Competencies', 'Ekspertiza Jonë')}
            </span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 700, margin: '8px 0 16px', color: '#ffffff', fontFamily: "'Playfair Display', Georgia, serif" }}>
              {t('Specialized Legal & Advisory Practices', 'Praktika të Specializuara Ligjore')}
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {practiceAreas.map((p, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#0f1c30',
                  border: '1px solid rgba(255,255,255,0.08)',
                  padding: '28px',
                  borderRadius: '6px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ width: '40px', height: '40px', backgroundColor: 'rgba(161, 124, 56, 0.15)', color: '#dfb78e', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', marginBottom: '18px' }}>
                    <Briefcase size={20} />
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 12px', color: '#ffffff' }}>
                    {t(p.titleEn, p.titleSq)}
                  </h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.6, margin: '0 0 20px' }}>
                    {t(p.descEn, p.descSq)}
                  </p>
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.8rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px' }}>
                  {(t(p.pointsEn.join('|'), p.pointsSq.join('|')).split('|')).map((pt, pIdx) => (
                    <li key={pIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle2 size={13} color="#a17c38" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Case Assessment Tool */}
      <section id="estimator" style={{ maxWidth: '1000px', margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ backgroundColor: '#0e182a', border: '1px solid rgba(161, 124, 56, 0.3)', borderRadius: '8px', padding: '36px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span style={{ color: '#a17c38', fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 800 }}>
              {t('Confidential Evaluation Tool', 'Mjet Vlerësimi Konfidencial')}
            </span>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '6px 0 10px', color: '#ffffff' }}>
              {t('Preliminary Case Scope & Strategy Advisor', 'Vlerësim Paraprak i Çështjes')}
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0 }}>
              {t('Answer 3 brief questions to view recommended legal engagement steps and estimated timeline.', 'Përgjigjuni 3 pyetjeve të shpejta për të parë hapat e rekomanduar.')}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '28px' }}>
            {/* Domain */}
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#e2e8f0', marginBottom: '8px' }}>
                1. {t('Legal Matter Domain', 'Fusha Ligjore')}
              </label>
              <select
                value={assessmentDomain}
                onChange={(e) => setAssessmentDomain(e.target.value as typeof assessmentDomain)}
                style={{ width: '100%', padding: '11px', borderRadius: '4px', backgroundColor: '#070d18', border: '1px solid #334155', color: '#fff', fontSize: '0.85rem' }}
              >
                <option value="corporate">{t('Corporate M&A / Shareholder Deal', 'Blerje Biznesi / Marrëveshje Aksionarësh')}</option>
                <option value="real_estate">{t('Commercial Real Estate / Construction', 'Prona Komerciale / Ndërtim')}</option>
                <option value="tax">{t('Tax Structuring & Audits', 'Optimizim Tatimor & Kontroll')}</option>
                <option value="litigation">{t('Commercial Litigation / Dispute', 'Kontest Tregtar / Gjyq')}</option>
              </select>
            </div>

            {/* Scope */}
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#e2e8f0', marginBottom: '8px' }}>
                2. {t('Transaction / Claim Value', 'Vlera e Transaksionit / Kontestit')}
              </label>
              <select
                value={dealScope}
                onChange={(e) => setDealScope(e.target.value as typeof dealScope)}
                style={{ width: '100%', padding: '11px', borderRadius: '4px', backgroundColor: '#070d18', border: '1px solid #334155', color: '#fff', fontSize: '0.85rem' }}
              >
                <option value="small">{t('Under €100,000', 'Nën €100,000')}</option>
                <option value="mid">{t('€100,000 – €1,000,000', '€100,000 – €1,000,000')}</option>
                <option value="large">{t('€1,000,000+ (Enterprise)', 'Mbi €1,000,000 (Korporatë)')}</option>
              </select>
            </div>

            {/* Urgency */}
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#e2e8f0', marginBottom: '8px' }}>
                3. {t('Urgency / Timeline', 'Afati Kohor')}
              </label>
              <select
                value={assessmentUrgency}
                onChange={(e) => setAssessmentUrgency(e.target.value as typeof assessmentUrgency)}
                style={{ width: '100%', padding: '11px', borderRadius: '4px', backgroundColor: '#070d18', border: '1px solid #334155', color: '#fff', fontSize: '0.85rem' }}
              >
                <option value="immediate">{t('Urgent (Within 48h)', 'Urgjente (Brenda 48 orëve)')}</option>
                <option value="planning">{t('Active Planning (1-3 weeks)', 'Në Planifikim (1-3 javë)')}</option>
                <option value="audit">{t('Long-term Strategic', 'Strategjike Afatgjatë')}</option>
              </select>
            </div>
          </div>

          <div style={{ backgroundColor: '#070d18', border: '1px solid rgba(161, 124, 56, 0.2)', padding: '20px', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '0.78rem', color: '#dfb78e', fontWeight: 800, textTransform: 'uppercase' }}>
                {t('Recommended Engagement Route:', 'Rruga e Rekomanduar e Bashkëpunimit:')}
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginTop: '2px' }}>
                {dealScope === 'large'
                  ? t('Partner-Led Due Diligence & Executive Strategy Council', 'Drejtim nga Partneri Kryesor & Audit i Thelluar')
                  : t('Senior Counsel Review & 48h Action Memorandum', 'Shqyrtim nga Avokati Kryesor & Memorandum Veprimi')}
              </div>
              <small style={{ color: '#94a3b8' }}>
                {t('Estimated Lead Partner Review: 2-4 business days', 'Koha e shqyrtimit: 2-4 ditë pune')}
              </small>
            </div>

            <a
              href="#consultation"
              style={{
                backgroundColor: '#a17c38',
                color: '#070d18',
                padding: '11px 22px',
                borderRadius: '4px',
                fontWeight: 800,
                fontSize: '0.85rem',
                textDecoration: 'none',
              }}
            >
              {t('Proceed to Request', 'Kërko Konsultim')}
            </a>
          </div>
        </div>
      </section>

      {/* Consultation Request & Office Contact */}
      <section id="consultation" style={{ backgroundColor: '#050912', padding: '80px 24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px' }}>
          <div>
            <span style={{ color: '#a17c38', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 800 }}>
              {t('Direct Counsel', 'Kontakt i Drejtpërdrejtë')}
            </span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 700, margin: '8px 0 18px', color: '#ffffff', fontFamily: "'Playfair Display', Georgia, serif" }}>
              {t('Schedule a Privileged Consultation', 'Rezervoni një Konsultë të Mbrojtur')}
            </h2>
            <p style={{ color: '#94a3b8', lineHeight: 1.7, fontSize: '0.92rem', marginBottom: '24px' }}>
              {t(
                'All communications are strictly protected under professional Attorney-Client Privilege standards.',
                'Çdo komunikim mbrohet rreptësisht nga konfidencialiteti profesional avokat-klient.'
              )}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#cbd5e1' }}>
                <Lock size={16} color="#a17c38" />
                <span>{t('Strict Non-Disclosure & Data Encryption', 'Mbrojtje e Plotë e të Dhënave me Enkriptim')}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#cbd5e1' }}>
                <Globe size={16} color="#a17c38" />
                <span>{officesText}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#cbd5e1' }}>
                <MapPin size={16} color="#a17c38" />
                <span>{addressText}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#cbd5e1' }}>
                <PhoneCall size={16} color="#a17c38" />
                <span>{phoneText} · partner@vanguardlegal.com</span>
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: '#0c1524', padding: '32px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.08)' }}>
            {consultSubmitted ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <CheckCircle2 size={28} />
                </div>
                <h3 style={{ fontSize: '1.25rem', color: '#fff', margin: '0 0 8px' }}>
                  {t('Inquiry Received Securely', 'Kërkesa u Pranua me Sukses')}
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.5, margin: '0 0 16px' }}>
                  {t(
                    'Our managing partner will review your inquiry under privilege and respond within 24 hours.',
                    'Partneri ynë përgjegjës do ta shqyrtojë kërkesën tuaj dhe do t\'ju kontaktojë brenda 24 orëve.'
                  )}
                </p>
                <button
                  type="button"
                  onClick={() => setConsultSubmitted(false)}
                  style={{ backgroundColor: '#a17c38', color: '#070d18', padding: '8px 18px', border: 'none', borderRadius: '4px', fontWeight: 800, cursor: 'pointer' }}
                >
                  {t('Reset Form', 'Dërgo Kërkesë Tjetër')}
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setConsultSubmitted(true);
                }}
                style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
              >
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '4px' }}>
                    {t('Entity / Individual Name', 'Emri i Kompanisë / Personit')}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={lang === 'sq' ? `p.sh. Adriatic Holdings Sh.p.k. (${sampleName})` : `e.g. Sterling Capital Ltd (${sampleName})`}
                    value={firmName}
                    onChange={(e) => setFirmName(e.target.value)}
                    style={{ width: '100%', padding: '10px', backgroundColor: '#070d18', border: '1px solid #334155', borderRadius: '4px', color: '#fff', fontSize: '0.85rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '4px' }}>
                    {t('Corporate Email / Phone', 'Email Zyrtar / Telefon')}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={lang === 'sq' ? 'counsel@kompania.com ose +383 38...' : 'counsel@company.com or +44 20...'}
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    style={{ width: '100%', padding: '10px', backgroundColor: '#070d18', border: '1px solid #334155', borderRadius: '4px', color: '#fff', fontSize: '0.85rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '4px' }}>
                    {t('Brief Summary of Matter', 'Përmbledhje e Shkurtër e Çështjes')}
                  </label>
                  <textarea
                    rows={3}
                    placeholder={lang === 'sq' ? 'Përshkrim i shkurtër i transaksionit ose kontestit...' : 'Brief description of corporate transaction or commercial dispute...'}
                    value={legalTopic}
                    onChange={(e) => setLegalTopic(e.target.value)}
                    style={{ width: '100%', padding: '10px', backgroundColor: '#070d18', border: '1px solid #334155', borderRadius: '4px', color: '#fff', fontSize: '0.85rem' }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    backgroundColor: '#a17c38',
                    color: '#070d18',
                    padding: '12px',
                    border: 'none',
                    borderRadius: '4px',
                    fontWeight: 800,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    marginTop: '6px',
                  }}
                >
                  {t('Submit Privileged Request', 'Dërgo Kërkesën Konfidenciale')}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '32px 24px', textAlign: 'center', fontSize: '0.8rem', color: '#64748b' }}>
        <p style={{ margin: 0 }}>
          &copy; {new Date().getFullYear()} Vanguard & Partners Legal Counsel. {t('All rights reserved. Attorney Advertising.', 'Të gjitha të drejtat të rezervuara.')}
        </p>
      </footer>
    </div>
  );
}

export default function ProfessionalPage() {
  return (
    <LanguageProvider>
      <ProfessionalContent />
    </LanguageProvider>
  );
}
