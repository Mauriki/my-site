'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { DemoTopBar } from '@/components/examples/DemoTopBar';
import { LanguageProvider, useLanguage } from '@/components/examples/LanguageContext';
import {
  GraduationCap,
  BookOpen,
  PlayCircle,
  Video,
  Award,
  CheckCircle2,
  Sparkles,
  Clock,
  Download,
  Lock,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  X,
  Check,
  Code2,
} from 'lucide-react';

interface ModuleItem {
  id: number;
  titleEn: string;
  titleSq: string;
  duration: string;
  lessonCount: number;
  previewAvailable?: boolean;
  lessonsEn: string[];
  lessonsSq: string[];
}

const curriculumModules: ModuleItem[] = [
  {
    id: 1,
    titleEn: 'Module 1: Modern Software Architecture & High-Performance Foundations',
    titleSq: 'Moduli 1: Arkitektura Moderne e Softuerit & Bazat e Performancës',
    duration: '6.5 hours',
    lessonCount: 8,
    previewAvailable: true,
    lessonsEn: [
      '1.1 Designing Scalable Frontend & Backend Boundaries',
      '1.2 State Management Patterns: Server State vs Client State',
      '1.3 Real-Time Data Streaming & WebSocket Pipelines',
      '1.4 Sub-Second Page Speed: Asset Optimization & Cache Keys',
    ],
    lessonsSq: [
      '1.1 Strukturimi i Kufijve Midis Frontend dhe Backend',
      '1.2 Modelet e Menaxhimit të Gjendjes: Server State vs Client State',
      '1.3 Transmetimi i të Dhënave në Kohë Reale & WebSockets',
      '1.4 Shpejtësi Nën-Sekondëshe: Optimizim AsCrunch & Cache',
    ],
  },
  {
    id: 2,
    titleEn: 'Module 2: Advanced Design Systems & Micro-Interactions',
    titleSq: 'Moduli 2: Sistemet e Avancuara të Dizajnit & Mikro-Ndërveprimet',
    duration: '8.0 hours',
    lessonCount: 10,
    previewAvailable: true,
    lessonsEn: [
      '2.1 Semantic Token Architecture: Color, Typography & Spacing',
      '2.2 Fluid Typography & Viewport Range Scaling',
      '2.3 Accessible ARIA Modals, Drawers & Popovers from Scratch',
      '2.4 Hardware-Accelerated 60fps Animation Workflows',
    ],
    lessonsSq: [
      '2.1 Arkitektura e Shenjave Semantike: Ngjyrat, Tipografia & Hapësirat',
      '2.2 Tipografia Fluide & Përshtatja në Çdo Ekran',
      '2.3 Komponentë të Qasshëm (Modale, Sirtarë) me Standarde ARIA',
      '2.4 Animacione të Shpejta 60fps me Përshpejtim Harduerik',
    ],
  },
  {
    id: 3,
    titleEn: 'Module 3: Full-Stack APIs, Cloud Functions & Database Modeling',
    titleSq: 'Moduli 3: Ndërtimi i API-ve, Funksioneve në Re & Modelimi i Bazës',
    duration: '9.5 hours',
    lessonCount: 12,
    previewAvailable: false,
    lessonsEn: [
      '3.1 Relational vs Document Schemas for High-Traffic Apps',
      '3.2 Bulletproof Authentication, RBAC & Session Tokens',
      '3.3 Edge Function Deployments & Global Latency Reduction',
      '3.4 Automated Database Migrations & Transaction Locks',
    ],
    lessonsSq: [
      '3.1 Skemat Racionale vs Dokumentare për Ngarkesë të Lartë',
      '3.2 Autentifikim i Sigurt, Role Përdoruesish & Tokena',
      '3.3 Funksione në Skaj (Edge) për Reduktim të Vonesave Globale',
      '3.4 Migrime të Automatizuara të Bazës & Siguri Transaksionesh',
    ],
  },
  {
    id: 4,
    titleEn: 'Module 4: Payment Gateways, Webhooks & Automated Invoicing',
    titleSq: 'Moduli 4: Integrimi i Pagesave Online, Webhooks & Faturimi',
    duration: '6.0 hours',
    lessonCount: 7,
    previewAvailable: false,
    lessonsEn: [
      '4.1 Stripe / Bank Webhook Synchronization & Replay Queues',
      '4.2 Subscription Lifecycles: Upgrades, Prorations & Dunning',
      '4.3 Generating Dynamic PDF Invoices & Fiscal Reports',
      '4.4 Multi-Currency & Local Tax Calculations',
    ],
    lessonsSq: [
      '4.1 Sinkronizimi i Webhooks për Pagesa me Kartelë & Bankë',
      '4.2 Cikli i Jetës së Abonimeve: Ndryshime Planesh & Zbritje',
      '4.3 Gjenerimi i Faturave PDF & Raporteve Fiskale Automatike',
      '4.4 Përshtatja me Monedha të Ndryshme & Tatime Lokale',
    ],
  },
  {
    id: 5,
    titleEn: 'Module 5: Security Hardening, Rate Limiting & Zero-Trust Ops',
    titleSq: 'Moduli 5: Siguria Kibernetike, Kufizimi i Kërkesave & Mbrojtja',
    duration: '5.5 hours',
    lessonCount: 6,
    previewAvailable: false,
    lessonsEn: [
      '5.1 CSRF, XSS & SQL Injection Defense-in-Depth',
      '5.2 Redis-Backed Token Bucket Rate Limiting',
      '5.3 Secret Management & Environment Vaults in CI/CD',
      '5.4 Automated Vulnerability Scanning & Compliance Audits',
    ],
    lessonsSq: [
      '5.1 Mbrojtje e Thelluar kundër Sulmeve CSRF, XSS & Injeksioneve',
      '5.2 Kufizim i Shpejtësisë së Kërkesave (Rate Limiting) me Redis',
      '5.3 Menaxhim i Sigurt i Çelësave Sekretë në CI/CD',
      '5.4 Skanim i Automatizuar i Cenueshmërive & Raporte Sigurie',
    ],
  },
  {
    id: 6,
    titleEn: 'Module 6: Capstone Commercial Launch & Production Monitoring',
    titleSq: 'Moduli 6: Projekti Përmbyllës, Publikimi & Monitorimi në Prodhim',
    duration: '7.0 hours',
    lessonCount: 8,
    previewAvailable: false,
    lessonsEn: [
      '6.1 Zero-Downtime Blue-Green Deployment Strategies',
      '6.2 Real-Time Error Logging, Sentry & Alert Triggers',
      '6.3 Conversion Rate Optimization & A/B Funnel Splitting',
      '6.4 Final Capstone Defense & Verified Industry Credential',
    ],
    lessonsSq: [
      '6.1 Publikim Pa Ndërprerje (Zero-Downtime Deployments)',
      '6.2 Monitorim i Gabimeve në Kohë Reale & Sinjalizime',
      '6.3 Optimizim i Konvertimeve & Testim A/B',
      '6.4 Mbrojtja e Projektit & Çertifikimi Zyrtar Profesional',
    ],
  },
];

function EducationContent() {
  const { lang, t } = useLanguage();

  // Accordion State
  const [openModule, setOpenModule] = useState<number | null>(1);

  // Video Preview Modal State
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Tuition Plan State
  const [selectedPlan, setSelectedPlan] = useState<'self_paced' | 'cohort' | 'enterprise'>('cohort');
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [enrollDone, setEnrollDone] = useState(false);

  // FAQ State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const planDetails = {
    self_paced: {
      price: '€240',
      periodEn: 'one-time investment',
      periodSq: 'pagesë e vetme',
      titleEn: 'Self-Paced Developer Pass',
      titleSq: 'Paketa e Pavarur (Self-Paced)',
      featuresEn: [
        'Lifetime access to all 6 modules & 42h video library',
        'Downloadable source code repository & Figma UI kit',
        'Automated code evaluation exercises & quizzes',
        'Digital Certificate of Completion',
      ],
      featuresSq: [
        'Qasje e përjetshme në 6 modulet dhe 42 orë video',
        'Shkarkim i kodit burimor dhe skedarëve Figma',
        'Ushtrime praktike & teste të automatizuara kodi',
        'Çertifikatë Dixhitale e Përfundimit',
      ],
    },
    cohort: {
      price: '€490',
      periodEn: 'cohort tuition (Next batch: Oct 15)',
      periodSq: 'çmimi i grupit (Grupi i radhës: 15 Tetor)',
      titleEn: 'Interactive Mastermind Cohort',
      titleSq: 'Grupi Mastermind me Mentorim',
      badgeEn: 'MOST POPULAR &bull; LIMITED TO 24 SEATS',
      badgeSq: 'MË I KËRKUARI &bull; LIMITUAR NË 24 VENDE',
      featuresEn: [
        'Everything in Self-Paced Pass',
        'Weekly live 2-hour architectural code reviews with Lead Instructor',
        'Private Slack/Discord community with senior engineers',
        'Direct 1-on-1 Capstone Project critique & portfolio review',
        'Official Verified Credential badge for LinkedIn',
      ],
      featuresSq: [
        'Të gjitha përfitimet e Paketës së Pavarur',
        'Takime javore 2-orëshe live për shqyrtim kodi me instruktorin kryesor',
        'Komunitet privat me inxhinierë të nivelit të lartë',
        'Konsulencë 1-mbi-1 për projektin tuaj përmbyllës',
        'Çertifikatë Zyrtare e Verifikuar për LinkedIn',
      ],
    },
    enterprise: {
      price: '€1,200',
      periodEn: 'up to 5 team seats',
      periodSq: 'për deri në 5 inxhinierë',
      titleEn: 'Engineering Team License',
      titleSq: 'Licencë për Ekipin e Kompanisë',
      featuresEn: [
        '5 full-access seats for your company engineering team',
        'Custom private workshop tailored to your production tech stack',
        'Dedicated Slack channel with instructor priority support',
        'Company invoice with VAT receipt & corporate reporting',
      ],
      featuresSq: [
        '5 qasje të plota për ekipin e inxhinierëve të kompanisë suaj',
        'Punëtori private e përshtatur posaçërisht për projektet tuaja',
        'Kanal i dedikuar me mbështetje prioritare',
        'Faturë e rregullt tatimore me TVSH për kompani',
      ],
    },
  };

  const handleEnrollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnrollDone(true);
  };

  return (
    <div style={{ backgroundColor: '#090d16', color: '#f1f5f9', minHeight: '100vh', fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif" }}>
      <DemoTopBar
        demoTitle={{ en: 'Course Platform & Academy Demo', sq: 'Shembull Faqeje: Platformë Kursesh & Akademi' }}
        industry={{ en: 'Online Masterclasses & Education', sq: 'Edukimi Online & Kurse Profesionale' }}
        badgeColor="#6366f1"
      />

      {/* Top Header */}
      <header style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', backgroundColor: '#090d16', position: 'sticky', top: '49px', zIndex: 30 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', backgroundColor: '#4f46e5', color: '#ffffff', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <GraduationCap size={18} />
            </div>
            <div>
              <span style={{ fontSize: '1.25rem', fontWeight: 900, letterSpacing: '-0.02em', color: '#ffffff', display: 'block', lineHeight: 1 }}>
                NEXUS
              </span>
              <span style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#818cf8', fontWeight: 800 }}>
                STUDIO ACADEMY
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '28px', fontSize: '0.85rem', fontWeight: 700 }} className="hidden-mobile">
            <a href="#curriculum" style={{ color: '#94a3b8', textDecoration: 'none' }}>{t('Curriculum', 'Kurrikula')}</a>
            <a href="#outcomes" style={{ color: '#94a3b8', textDecoration: 'none' }}>{t('Outcomes', 'Përfitimet')}</a>
            <a href="#pricing" style={{ color: '#94a3b8', textDecoration: 'none' }}>{t('Tuition & Plans', 'Planet & Çmimet')}</a>
            <a href="#faq" style={{ color: '#94a3b8', textDecoration: 'none' }}>{t('FAQ', 'Pyetje të Shpeshta')}</a>
          </div>

          <a
            href="#pricing"
            style={{
              backgroundColor: '#4f46e5',
              color: '#ffffff',
              padding: '9px 18px',
              borderRadius: '6px',
              fontSize: '0.82rem',
              fontWeight: 800,
              textDecoration: 'none',
              boxShadow: '0 2px 10px rgba(79, 70, 229, 0.4)',
            }}
          >
            {t('Enroll Now', 'Regjistrohu Tani')}
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '72px 24px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(99, 102, 241, 0.15)', color: '#a5b4fc', border: '1px solid rgba(99, 102, 241, 0.3)', padding: '5px 14px', borderRadius: '9999px', fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '20px' }}>
              <Sparkles size={14} />
              {t('Advanced System Design & UI Engineering Masterclass', 'Masterclass i Avancuar në Arkitekturë Softueri')}
            </div>

            <h1 style={{ fontSize: 'clamp(2.4rem, 4.6vw, 3.9rem)', lineHeight: 1.1, fontWeight: 900, letterSpacing: '-0.03em', margin: '0 0 24px', color: '#ffffff' }}>
              {t('Master full-stack system architecture that ships at production scale.', 'Mësoni ndërtimin e sistemeve komplekse me performancë të lartë.')}
            </h1>

            <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#94a3b8', margin: '0 0 32px', maxWidth: '580px' }}>
              {t(
                'A rigorous, hands-on masterclass for engineers and ambitious creators who want to build sub-second web applications, robust payment systems, and resilient cloud architectures.',
                'Një program intensiv dhe praktik për zhvillues dhe krijues që dëshirojnë të zotërojnë arkitekturën moderne, pagesat automatike dhe sigurinë e plotë.'
              )}
            </p>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '32px' }}>
              <a
                href="#pricing"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#4f46e5',
                  color: '#ffffff',
                  padding: '14px 28px',
                  borderRadius: '6px',
                  fontWeight: 800,
                  fontSize: '0.92rem',
                  textDecoration: 'none',
                  boxShadow: '0 4px 18px rgba(79, 70, 229, 0.45)',
                }}
              >
                <span>{t('View Enrollment Options', 'Shiko Opsionet e Regjistrimit')}</span>
                <ArrowRight size={16} />
              </a>

              <button
                type="button"
                onClick={() => setIsVideoModalOpen(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  color: '#ffffff',
                  border: '1px solid rgba(255,255,255,0.18)',
                  padding: '14px 22px',
                  borderRadius: '6px',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                }}
              >
                <PlayCircle size={18} color="#818cf8" />
                <span>{t('Watch Trailer & Free Lesson', 'Shiko Trailer & Mësim Falas')}</span>
              </button>
            </div>

            {/* Credibility metric pills */}
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', fontSize: '0.85rem', color: '#cbd5e1', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={16} color="#818cf8" />
                <span><strong>42+</strong> {t('Hours of Video', 'Orë Video HD')}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <BookOpen size={16} color="#818cf8" />
                <span><strong>6</strong> {t('In-Depth Modules', 'Module të Thelluara')}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Award size={16} color="#818cf8" />
                <span>{t('Official Certificate', 'Çertifikatë Zyrtare')}</span>
              </div>
            </div>
          </div>

          {/* Minimalist Tech Workspace (Strictly Object / Workspace - Zero People) */}
          <div style={{ position: 'relative', height: '440px', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
            <Image
              src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80"
              alt="High-end developer desk workstation with dual 4K monitors displaying code architecture, mechanical keyboard, and studio microphone"
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              style={{ objectFit: 'cover' }}
              priority
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #090d16 0%, transparent 60%)' }} />
            <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '0.72rem', color: '#818cf8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {t('STUDIO CURRICULUM ACCESS', 'QASJE E PLOTË NË PLATFORMË')}
                </span>
                <div style={{ fontWeight: 900, fontSize: '1.05rem', color: '#ffffff' }}>
                  {t('Production Source Code & Figma Included', 'Kodi Burimor & Skedarët Figma')}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsVideoModalOpen(true)}
                style={{
                  backgroundColor: '#4f46e5',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '50%',
                  width: '44px',
                  height: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(79, 70, 229, 0.5)',
                }}
              >
                <PlayCircle size={22} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Explorer Section (Accordion) */}
      <section id="curriculum" style={{ backgroundColor: '#0d1320', padding: '80px 24px', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '44px' }}>
            <span style={{ color: '#818cf8', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              {t('Comprehensive Roadmap', 'Plani i Plotë Mësimor')}
            </span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 900, margin: '8px 0 14px', letterSpacing: '-0.02em', color: '#ffffff' }}>
              {t('Course Curriculum Breakdown', 'Çfarë do të Mësoni në Detaje')}
            </h2>
            <p style={{ color: '#94a3b8', maxWidth: '600px', margin: '0 auto', fontSize: '0.95rem' }}>
              {t('6 comprehensive modules, 51 video lessons, downloadable starter repositories, and hands-on architecture challenges.', '6 module të plota, 51 mësime praktike me shembuj realë kodi dhe projekte.')}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {curriculumModules.map((mod) => (
              <div
                key={mod.id}
                style={{
                  backgroundColor: '#121a2c',
                  border: `1px solid ${openModule === mod.id ? '#4f46e5' : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: '8px',
                  overflow: 'hidden',
                  transition: 'border-color 0.2s',
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenModule(openModule === mod.id ? null : mod.id)}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'none',
                    border: 'none',
                    color: '#ffffff',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, backgroundColor: 'rgba(99, 102, 241, 0.2)', color: '#a5b4fc', padding: '2px 8px', borderRadius: '4px' }}>
                        {mod.duration} &bull; {mod.lessonCount} {t('Lessons', 'Mësime')}
                      </span>
                      {mod.previewAvailable && (
                        <span style={{ fontSize: '0.72rem', fontWeight: 800, backgroundColor: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', padding: '2px 8px', borderRadius: '4px' }}>
                          {t('Free Preview Available', 'Mësim Falas')}
                        </span>
                      )}
                    </div>
                    <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800 }}>
                      {t(mod.titleEn, mod.titleSq)}
                    </h3>
                  </div>

                  <div style={{ color: '#818cf8', paddingLeft: '16px' }}>
                    {openModule === mod.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </button>

                {openModule === mod.id && (
                  <div style={{ padding: '0 24px 22px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <ul style={{ listStyle: 'none', padding: 0, margin: '14px 0 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {(t(mod.lessonsEn.join('|||'), mod.lessonsSq.join('|||')).split('|||')).map((les, lIdx) => (
                        <li
                          key={lIdx}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            fontSize: '0.88rem',
                            color: '#cbd5e1',
                            backgroundColor: 'rgba(0,0,0,0.2)',
                            padding: '10px 14px',
                            borderRadius: '6px',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Video size={15} color="#818cf8" />
                            <span>{les}</span>
                          </div>

                          {mod.previewAvailable && lIdx === 0 ? (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsVideoModalOpen(true);
                              }}
                              style={{
                                backgroundColor: '#4f46e5',
                                color: '#fff',
                                border: 'none',
                                padding: '4px 10px',
                                borderRadius: '4px',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                              }}
                            >
                              {t('Watch Free', 'Shiko Falas')}
                            </button>
                          ) : (
                            <span style={{ color: '#64748b', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <Lock size={12} /> {t('Members Only', 'Për Anëtarët')}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Transformation Matrix */}
      <section id="outcomes" style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ color: '#818cf8', fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 800 }}>
            {t('Career Transformation', 'Rezultate Konkrete')}
          </span>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 900, margin: '8px 0 14px', color: '#ffffff' }}>
            {t('What You Will Be Able to Build', 'Çfarë do të jeni në Gjendje të Ndërtoni')}
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          <div style={{ backgroundColor: '#101626', border: '1px solid rgba(255,255,255,0.08)', padding: '28px', borderRadius: '8px' }}>
            <div style={{ width: '40px', height: '40px', backgroundColor: 'rgba(99, 102, 241, 0.15)', color: '#818cf8', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <Code2 size={22} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 10px', color: '#ffffff' }}>
              {t('Production-Ready Architecture', 'Arkitekturë e Plotë')}
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>
              {t(
                'Move beyond toy tutorials to build systems with strict TypeScript types, optimized database indexes, and sub-second rendering.',
                'Ndërtoni aplikacione me kod të pastër TypeScript, indekse të shpejta baze dhe performancë të lartë.'
              )}
            </p>
          </div>

          <div style={{ backgroundColor: '#101626', border: '1px solid rgba(255,255,255,0.08)', padding: '28px', borderRadius: '8px' }}>
            <div style={{ width: '40px', height: '40px', backgroundColor: 'rgba(99, 102, 241, 0.15)', color: '#818cf8', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <Download size={22} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 10px', color: '#ffffff' }}>
              {t('Commercial SaaS Starter Kit', 'SaaS Starter Kit i Gatshëm')}
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>
              {t(
                'Clone our proprietary multi-tenant template with built-in auth, Stripe subscription webhooks, and transactional emails.',
                'Përdorni modelin tonë me autentifikim të integruar, pagesa mujore dhe dërgim automatik email-esh.'
              )}
            </p>
          </div>

          <div style={{ backgroundColor: '#101626', border: '1px solid rgba(255,255,255,0.08)', padding: '28px', borderRadius: '8px' }}>
            <div style={{ width: '40px', height: '40px', backgroundColor: 'rgba(99, 102, 241, 0.15)', color: '#818cf8', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <Award size={22} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 10px', color: '#ffffff' }}>
              {t('Industry Credential & Defense', 'Çertifikim & Mbrojtje Projekti')}
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>
              {t(
                'Submit your capstone code for manual peer review. Earn a cryptographic credential recognized by leading software agencies.',
                'Dorëzoni projektin përfundimtar për vlerësim dhe merrni një çertifikatë të njohur nga kompani softuerike.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Tuition Plans Section */}
      <section id="pricing" style={{ backgroundColor: '#0b101c', padding: '80px 24px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '44px' }}>
            <span style={{ color: '#818cf8', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              {t('Tuition & Enrollment', 'Zgjidhni Paketën Tuaj')}
            </span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 900, margin: '8px 0 14px', letterSpacing: '-0.02em', color: '#ffffff' }}>
              {t('Simple, Transparent Course Investment', 'Investim i Qartë & Pa Tarifa të Fshehura')}
            </h2>
            <p style={{ color: '#94a3b8', maxWidth: '580px', margin: '0 auto', fontSize: '0.95rem' }}>
              {t('14-day 100% money-back satisfaction guarantee. Instant lifetime access.', 'Garanci e plotë kthimi pagese për 14 ditë nëse nuk jeni plotësisht të kënaqur.')}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px', alignItems: 'stretch' }}>
            {/* Self Paced */}
            <div
              style={{
                backgroundColor: '#101626',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '10px',
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 6px', color: '#fff' }}>
                  {t(planDetails.self_paced.titleEn, planDetails.self_paced.titleSq)}
                </h3>
                <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#fff', margin: '14px 0 4px' }}>
                  {planDetails.self_paced.price}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '20px' }}>
                  {t(planDetails.self_paced.periodEn, planDetails.self_paced.periodSq)}
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: '#cbd5e1' }}>
                  {(t(planDetails.self_paced.featuresEn.join('|||'), planDetails.self_paced.featuresSq.join('|||')).split('|||')).map((f, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <CheckCircle2 size={16} color="#818cf8" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedPlan('self_paced');
                  setIsEnrollModalOpen(true);
                }}
                style={{
                  marginTop: '28px',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  color: '#ffffff',
                  border: '1px solid rgba(255,255,255,0.2)',
                  padding: '12px',
                  borderRadius: '6px',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                }}
              >
                {t('Enroll Self-Paced', 'Zgjidh Paketën e Pavarur')}
              </button>
            </div>

            {/* Cohort (Featured) */}
            <div
              style={{
                backgroundColor: '#131b2e',
                border: '2px solid #4f46e5',
                borderRadius: '10px',
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                boxShadow: '0 20px 40px rgba(79, 70, 229, 0.2)',
              }}
            >
              <div style={{ position: 'absolute', top: '-13px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#4f46e5', color: '#ffffff', padding: '3px 12px', borderRadius: '9999px', fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>
                {t(planDetails.cohort.badgeEn, planDetails.cohort.badgeSq)}
              </div>

              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 6px', color: '#fff' }}>
                  {t(planDetails.cohort.titleEn, planDetails.cohort.titleSq)}
                </h3>
                <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#818cf8', margin: '14px 0 4px' }}>
                  {planDetails.cohort.price}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#a5b4fc', marginBottom: '20px' }}>
                  {t(planDetails.cohort.periodEn, planDetails.cohort.periodSq)}
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: '#cbd5e1' }}>
                  {(t(planDetails.cohort.featuresEn.join('|||'), planDetails.cohort.featuresSq.join('|||')).split('|||')).map((f, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <CheckCircle2 size={16} color="#4ade80" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedPlan('cohort');
                  setIsEnrollModalOpen(true);
                }}
                style={{
                  marginTop: '28px',
                  backgroundColor: '#4f46e5',
                  color: '#ffffff',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '6px',
                  fontWeight: 900,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(79, 70, 229, 0.4)',
                }}
              >
                {t('Join Live Cohort Group', 'Regjistrohu në Grupin me Mentorim')}
              </button>
            </div>

            {/* Enterprise */}
            <div
              style={{
                backgroundColor: '#101626',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '10px',
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 6px', color: '#fff' }}>
                  {t(planDetails.enterprise.titleEn, planDetails.enterprise.titleSq)}
                </h3>
                <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#fff', margin: '14px 0 4px' }}>
                  {planDetails.enterprise.price}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '20px' }}>
                  {t(planDetails.enterprise.periodEn, planDetails.enterprise.periodSq)}
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: '#cbd5e1' }}>
                  {(t(planDetails.enterprise.featuresEn.join('|||'), planDetails.enterprise.featuresSq.join('|||')).split('|||')).map((f, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <CheckCircle2 size={16} color="#818cf8" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedPlan('enterprise');
                  setIsEnrollModalOpen(true);
                }}
                style={{
                  marginTop: '28px',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  color: '#ffffff',
                  border: '1px solid rgba(255,255,255,0.2)',
                  padding: '12px',
                  borderRadius: '6px',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                }}
              >
                {t('Get Team License', 'Kërko Licencë Ekipi')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" style={{ maxWidth: '860px', margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span style={{ color: '#818cf8', fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 800 }}>
            {t('Got Questions?', 'Keni Pyetje?')}
          </span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 900, margin: '8px 0 0', color: '#ffffff' }}>
            {t('Frequently Asked Questions', 'Pyetjet më të Shpeshta')}
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            {
              qEn: 'Do I get instant access to the source code and templates?',
              qSq: 'A marr qasje të menjëhershme në kodin burimor dhe materialet?',
              aEn: 'Yes, as soon as enrollment is complete, you unlock private repository access on GitHub and full Figma UI design system libraries.',
              aSq: 'Po, menjëherë pas regjistrimit ju merrni qasje në repositorinë private në GitHub dhe të gjitha skedarët Figma.',
            },
            {
              qEn: 'What prerequisites do I need for this masterclass?',
              qSq: 'Çfarë njohurish paraprake më nevojiten për këtë kurs?',
              aEn: 'Basic familiarity with JavaScript/TypeScript and web development. We start from architectural foundations and build upward.',
              aSq: 'Njohuri bazike në JavaScript/TypeScript. Kursi fillon nga parimet kryesore arkitekturore dhe thellohet hap pas hapi.',
            },
          ].map((faq, idx) => (
            <div key={idx} style={{ backgroundColor: '#101626', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', overflow: 'hidden' }}>
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                style={{
                  width: '100%',
                  padding: '18px 20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'none',
                  border: 'none',
                  color: '#fff',
                  textAlign: 'left',
                  fontSize: '0.95rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                }}
              >
                <span>{t(faq.qEn, faq.qSq)}</span>
                {openFaq === idx ? <ChevronUp size={18} color="#818cf8" /> : <ChevronDown size={18} color="#818cf8" />}
              </button>
              {openFaq === idx && (
                <div style={{ padding: '0 20px 18px', color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.6 }}>
                  {t(faq.aEn, faq.aSq)}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '36px 24px', textAlign: 'center', fontSize: '0.85rem', color: '#64748b' }}>
        <p style={{ margin: 0 }}>
          &copy; {new Date().getFullYear()} Nexus Studio Academy. {t('All rights reserved. Dedicated to engineering mastery.', 'Të gjitha të drejtat të rezervuara.')}
        </p>
      </footer>

      {/* Video Trailer / Free Lesson Modal */}
      {isVideoModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100000,
            backgroundColor: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsVideoModalOpen(false);
          }}
        >
          <div style={{ backgroundColor: '#101626', maxWidth: '640px', width: '100%', borderRadius: '12px', overflow: 'hidden', border: '1px solid #4f46e5', padding: '24px', position: 'relative' }}>
            <button
              onClick={() => setIsVideoModalOpen(false)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', color: '#fff', cursor: 'pointer' }}
            >
              <X size={16} />
            </button>

            <div style={{ marginBottom: '16px' }}>
              <span style={{ fontSize: '0.75rem', color: '#818cf8', fontWeight: 800, textTransform: 'uppercase' }}>
                {t('Sample Masterclass Lesson & Trailer', 'Mësim Demonstrues & Trailer')}
              </span>
              <h3 style={{ margin: '4px 0 0', fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>
                {t('Lesson 1.1: Structuring System Boundaries', 'Mësimi 1.1: Strukturimi i Kufijve të Sistemit')}
              </h3>
            </div>

            {/* Video Placeholder Container */}
            <div style={{ height: '300px', backgroundColor: '#060910', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', marginBottom: '12px', boxShadow: '0 4px 20px rgba(79, 70, 229, 0.6)' }}>
                <PlayCircle size={32} />
              </div>
              <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#ffffff' }}>
                {t('Interactive 4K Video Player Simulation', 'Demonstrim i Player-it të Videove 4K')}
              </div>
              <small style={{ color: '#64748b' }}>
                {t('42 Hours of crystal-clear 60fps tutorials', '42 Orë leksione në rezolucion të lartë')}
              </small>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <small style={{ color: '#94a3b8' }}>{t('Full video unlocked upon enrollment', 'Video e plotë hapet pas regjistrimit')}</small>
              <button
                type="button"
                onClick={() => {
                  setIsVideoModalOpen(false);
                  setIsEnrollModalOpen(true);
                }}
                style={{ backgroundColor: '#4f46e5', color: '#fff', border: 'none', padding: '9px 18px', borderRadius: '6px', fontWeight: 800, cursor: 'pointer' }}
              >
                {t('Unlock All Lessons', 'Hap të Gjitha Mësimet')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enrollment Checkout Simulation Modal */}
      {isEnrollModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100000,
            backgroundColor: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsEnrollModalOpen(false);
          }}
        >
          <div style={{ backgroundColor: '#101626', maxWidth: '500px', width: '100%', borderRadius: '12px', border: '1px solid #4f46e5', padding: '28px', position: 'relative' }}>
            <button
              onClick={() => setIsEnrollModalOpen(false)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', color: '#fff', cursor: 'pointer' }}
            >
              <X size={16} />
            </button>

            {enrollDone ? (
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <div style={{ width: '56px', height: '56px', backgroundColor: 'rgba(34,197,94,0.15)', color: '#4ade80', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <Check size={32} />
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: '0 0 8px', color: '#fff' }}>
                  {t('Welcome to Nexus Academy!', 'Mirësevini te Nexus Academy!')}
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.5, margin: '0 0 20px' }}>
                  {t(
                    `Congratulations, ${studentName || 'Student'}! Your pass for ${t(planDetails[selectedPlan].titleEn, planDetails[selectedPlan].titleSq)} is active. A confirmation link has been sent to ${studentEmail || 'your email'}.`,
                    `Urime, ${studentName || 'Student'}! Qasja juaj për ${t(planDetails[selectedPlan].titleEn, planDetails[selectedPlan].titleSq)} është aktive. Linku i hyrjes u dërgua te ${studentEmail || 'email-i juaj'}.`
                  )}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setEnrollDone(false);
                    setIsEnrollModalOpen(false);
                  }}
                  style={{ backgroundColor: '#4f46e5', color: '#fff', padding: '10px 24px', borderRadius: '6px', border: 'none', fontWeight: 800, cursor: 'pointer' }}
                >
                  {t('Go to Dashboard', 'Shko te Paneli')}
                </button>
              </div>
            ) : (
              <div>
                <div style={{ marginBottom: '16px' }}>
                  <span style={{ fontSize: '0.72rem', color: '#818cf8', fontWeight: 800, textTransform: 'uppercase' }}>
                    {t('Fast Checkout Simulation', 'Demonstrim Regjistrimi')}
                  </span>
                  <h3 style={{ margin: '4px 0 0', fontSize: '1.3rem', fontWeight: 800, color: '#fff' }}>
                    {t(planDetails[selectedPlan].titleEn, planDetails[selectedPlan].titleSq)}
                  </h3>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#818cf8', marginTop: '6px' }}>
                    {planDetails[selectedPlan].price}
                  </div>
                </div>

                <form onSubmit={handleEnrollSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '4px' }}>
                      {t('Student Name', 'Emri & Mbiemri')}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={lang === 'sq' ? 'p.sh. Ardit Kelmendi' : 'e.g. Liam Vance'}
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      style={{ width: '100%', padding: '10px', backgroundColor: '#090d16', border: '1px solid #334155', borderRadius: '6px', color: '#fff', fontSize: '0.85rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '4px' }}>
                      {t('Email Address (for Course Portal Access)', 'Email (për hyrje në platformë)')}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder={lang === 'sq' ? 'ardit@shembull.com' : 'liam@example.com'}
                      value={studentEmail}
                      onChange={(e) => setStudentEmail(e.target.value)}
                      style={{ width: '100%', padding: '10px', backgroundColor: '#090d16', border: '1px solid #334155', borderRadius: '6px', color: '#fff', fontSize: '0.85rem' }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      marginTop: '8px',
                      backgroundColor: '#4f46e5',
                      color: '#ffffff',
                      border: 'none',
                      padding: '12px',
                      borderRadius: '6px',
                      fontWeight: 900,
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                    }}
                  >
                    {t('Complete Instant Enrollment', 'Përfundo Regjistrimin')}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function EducationPage() {
  return (
    <LanguageProvider>
      <EducationContent />
    </LanguageProvider>
  );
}
