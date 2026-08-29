'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BrowserFrame } from '@/components/examples/BrowserFrame';
import { LanguageProvider, useLanguage } from '@/components/examples/LanguageContext';
import { LanguageToggle } from '@/components/examples/LanguageToggle';
import {
  Sparkles,
  ArrowRight,
  Zap,
  CheckCircle2,
  Send,
  ShieldCheck,
  Award,
  Mail,
  MessageCircle,
  Copy,
  Check,
} from 'lucide-react';

interface ExampleProject {
  id: string;
  slug: string;
  category: 'restaurant' | 'retail' | 'salon' | 'professional' | 'trade' | 'education';
  titleEn: string;
  titleSq: string;
  industryEn: string;
  industrySq: string;
  descEn: string;
  descSq: string;
  urlPreview: string;
  featuresEn: string[];
  featuresSq: string[];
  palette: string[];
  accentColor: string;
  darkPreview: boolean;
  previewHeroTitle: { en: string; sq: string };
  previewHeroImage: string;
  previewSubtext: { en: string; sq: string };
}

const examplesData: ExampleProject[] = [
  {
    id: 'education',
    slug: '/examples/education',
    category: 'education',
    titleEn: 'Nexus Studio Academy',
    titleSq: 'Nexus Studio Academy',
    industryEn: 'Online Masterclasses & Education',
    industrySq: 'Platformë Kursesh & Akademi',
    descEn: 'High-converting course creator platform with interactive 6-module curriculum accordion, video player preview modal, and 3-tier tuition checkout.',
    descSq: 'Platformë moderne për kurse online me kurrikulë 6-modulëshe, demonstrim të video leksioneve dhe pagesë të thjeshtë regjistrimi.',
    urlPreview: 'nexusacademy.dev',
    featuresEn: ['6-Module Interactive Curriculum', 'Sample Lesson Video Player', '3-Tier Tuition Checkout', 'Cryptographic Credential'],
    featuresSq: ['Kurrikulë Interaktive 6-Modulëshe', 'Video Player për Mësime Falas', 'Pagesë me 3 Paketa Regjistrimi', 'Çertifikatë Zyrtare e Verifikuar'],
    palette: ['#090d16', '#101626', '#4f46e5', '#818cf8'],
    accentColor: '#6366f1',
    darkPreview: true,
    previewHeroTitle: {
      en: 'Master full-stack system architecture.',
      sq: 'Mësoni ndërtimin e sistemeve komplekse.',
    },
    previewHeroImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    previewSubtext: {
      en: '42+ Hours of HD video lessons, Figma UI kits, and production source code.',
      sq: '42+ Orë leksione video, skedarë Figma dhe kod burimor i plotë.',
    },
  },
  {
    id: 'restaurant',
    slug: '/examples/restaurant',
    category: 'restaurant',
    titleEn: 'Lumë Hearth & Smoke',
    titleSq: 'Lumë Hearth & Smoke',
    industryEn: 'Wood-Fired Dining & Botanicals',
    industrySq: 'Kuzhinë mbi Prush & Pije Botanike',
    descEn: 'Nordic-Mediterranean open-hearth dining with online table booking, interactive seasonal menu with allergen filters, and botanical beverage pairings.',
    descSq: 'Prezantim elegant me gatim mbi prush lisi, rezervim të menjëhershëm tavoline, menu interaktive me filtra dietikë dhe pije bimore.',
    urlPreview: 'lumehearth.al',
    featuresEn: ['Interactive Table Booking', 'Allergen-Filtered Menu', 'Hearth Tasting Builder', 'Botanical Spritz Program'],
    featuresSq: ['Rezervim Interaktiv Tavolinash', 'Menu me Filtra Dietikë', 'Ndërtues i Menysë së Shijimit', 'Program Pijesh Botanike'],
    palette: ['#111b15', '#16231c', '#a67c52', '#f3f4f1'],
    accentColor: '#a67c52',
    darkPreview: true,
    previewHeroTitle: {
      en: 'Pure hearth flame. Wild alpine botanicals.',
      sq: 'Prush i pastër lisi. Barëra alpine.',
    },
    previewHeroImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    previewSubtext: {
      en: 'Wood-fired Mediterranean cuisine with 100% Halal farm-sourced cuts.',
      sq: 'Kuzhinë mesdhetare mbi prush me mishra të certifikuar 100% hallall.',
    },
  },
  {
    id: 'retail',
    slug: '/examples/retail',
    category: 'retail',
    titleEn: 'Nordik Coffee Lab & Goods',
    titleSq: 'Nordik Coffee Lab & Goods',
    industryEn: 'Specialty Retail & Coffee Lab',
    industrySq: 'Dyqan Online & Kafe Speciale',
    descEn: 'Swiss brutalist storefront with slide-out cart drawer, quantity controls, promo code simulator, and coffee subscription customizer.',
    descSq: 'Dyqan minimalist me shportë anësore interaktive, matës të transportit falas, aplikim kuponash dhe kalkulator abonimi kafeje.',
    urlPreview: 'nordikgoods.com',
    featuresEn: ['Slide-Out Cart Drawer', 'Free Shipping Meter', 'Roast Profile Calculator', 'Subscription Builder'],
    featuresSq: ['Shportë Anësore Interaktive', 'Matës i Transportit Falas', 'Kalkulator i Pjekjes', 'Përshtatës i Abonimit'],
    palette: ['#f2eee7', '#ffffff', '#1d4ed8', '#121314'],
    accentColor: '#1d4ed8',
    darkPreview: false,
    previewHeroTitle: {
      en: 'Specialty coffee & minimalist gear.',
      sq: 'Kafe speciale dhe pajisje minimaliste.',
    },
    previewHeroImage: 'https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=800&q=80',
    previewSubtext: {
      en: 'Single-origin micro-lots roasted fresh weekly with direct grower trade.',
      sq: 'Mikro-lote me origjinë të vetme, pjekur të freskëta çdo javë.',
    },
  },
  {
    id: 'salon',
    slug: '/examples/salon',
    category: 'salon',
    titleEn: 'Kallfa Classic Barber & Grooming',
    titleSq: 'Kallfa Classic Barber & Grooming',
    industryEn: 'Gentlemen’s Barber & Grooming',
    industrySq: 'Berber & Kujdes për Meshkuj',
    descEn: 'Traditional gentlemen’s barber lounge with precision scissor tapers, sandalwood hot towel beard sculpting, and online chair booking wizard.',
    descSq: 'Atelie tradicionale për prerje flokësh dhe rregullim mjekre me peshqirë të ngrohtë avulli dhe rezervim të menjëhershëm karrigeje online.',
    urlPreview: 'kallfabarber.com',
    featuresEn: ['3-Step Chair Booking Wizard', 'Sandalwood Hot Towel Steam', 'Japanese Steel Straight Razor', 'Organic Beard Tonics'],
    featuresSq: ['Rezervim Karrigeje 3-Hapësh', 'Avullim me Peshqirë të Ngrohtë', 'Brisqe Çeliku Japonez', 'Vajra & Dyllëra Organikë'],
    palette: ['#111215', '#181a20', '#c59b27', '#ffffff'],
    accentColor: '#c59b27',
    darkPreview: true,
    previewHeroTitle: {
      en: 'Precision cuts, straight-razor lines, and timeless craftsmanship.',
      sq: 'Prerje precize, konture me brisk dhe përkushtim ndaj stilit.',
    },
    previewHeroImage: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
    previewSubtext: {
      en: 'Heritage barbering, hot towel beard sculpting, and organic elixirs.',
      sq: 'Berber klasik, kujdes me avull të ngrohtë dhe stilim master.',
    },
  },
  {
    id: 'professional',
    slug: '/examples/professional',
    category: 'professional',
    titleEn: 'Vanguard & Partners Legal',
    titleSq: 'Vanguard & Partners Legal',
    industryEn: 'Corporate Law & Wealth Advisory',
    industrySq: 'Avokaturë & Këshillim Biznesi',
    descEn: 'Executive sovereign presence featuring an interactive case evaluation estimator, practice matrix, and privileged consultation portal.',
    descSq: 'Prezencë prestigjoze korporative me mjet vlerësimi paraprak të çështjes dhe formular të sigurt konsultimi me garanci konfidencialiteti.',
    urlPreview: 'vanguardlegal.ch',
    featuresEn: ['Case Scope Assessment Tool', 'Practice Areas Explorer', 'Confidential Client Portal', 'Attorney-Client Privilege'],
    featuresSq: ['Vlerësim Paraprak i Çështjes', 'Eksplorues i Fushave Ligjore', 'Portal Konfidencial Klienti', 'Konfidencialitet Avokat-Klient'],
    palette: ['#070d18', '#0b1424', '#a17c38', '#ffffff'],
    accentColor: '#a17c38',
    darkPreview: true,
    previewHeroTitle: {
      en: 'Strategic legal precision for enterprise advantage.',
      sq: 'Saktësi ligjore strategjike për suksesin e kompanisë.',
    },
    previewHeroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    previewSubtext: {
      en: 'Cross-border M&A, commercial real estate, and dispute resolution counsel.',
      sq: 'Blerje kompanish, prona komerciale dhe arbitrazh ndërkombëtar.',
    },
  },
  {
    id: 'trade',
    slug: '/examples/trade',
    category: 'trade',
    titleEn: 'Artisan Build & Craft',
    titleSq: 'Artisan Build & Craft',
    industryEn: 'Architecture & Renovations',
    industrySq: 'Arkitekturë & Ndërtim',
    descEn: 'Architectural technical grid with real-time slider-based project cost & timeline calculator, portfolio showcase, and on-site survey form.',
    descSq: 'Dizajn modern teknik me llogaritës të menjëhershëm kostoje e kohe me slider, galeri punimesh dhe kërkesë matjeje në objekt.',
    urlPreview: 'artisanbuild.com',
    featuresEn: ['Real-Time Cost Slider Engine', 'Finish Tier Estimator', '5-Phase Method Blueprint', 'Laser On-Site Survey Request'],
    featuresSq: ['Llogaritës Kostoje me Slider', 'Përzgjedhje Nivelit të Punimit', 'Proces i Qartë 5-Hapësh', 'Kërkesë për Matje me Laser në Objekt'],
    palette: ['#14171a', '#1c2024', '#d97706', '#ffffff'],
    accentColor: '#d97706',
    darkPreview: true,
    previewHeroTitle: {
      en: 'Bespoke architectural execution built to last.',
      sq: 'Ndërtime arkitekturore me saktësi absolute.',
    },
    previewHeroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    previewSubtext: {
      en: 'Turnkey residential remodeling, custom millwork, and stone masonry.',
      sq: 'Renovim i plotë banesash, punime druri me porosi dhe mermer.',
    },
  },
];

function GalleryContent() {
  const { lang, t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [inquirySent, setInquirySent] = useState(false);
  const [copied, setCopied] = useState(false);

  // Form Fields
  const [businessName, setBusinessName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [customBusinessType, setCustomBusinessType] = useState('');
  const [note, setNote] = useState('');

  // Industry suggestion chips for open typing
  const popularSuggestions = [
    { en: 'Medical / Dental Clinic', sq: 'Klinikë / Stomatologji' },
    { en: 'Logistics & Transport', sq: 'Transport & Logjistikë' },
    { en: 'Real Estate Agency', sq: 'Agjenci Imobiliare' },
    { en: 'Auto Salon / Dealership', sq: 'Auto Sallon / Servis' },
    { en: 'Fitness / Gym Center', sq: 'Qendër Fitnesi & Gym' },
    { en: 'Course / Academy', sq: 'Akademi Kursesh' },
    { en: 'Restaurant / Café', sq: 'Restorant / Kafene' },
    { en: 'E-Commerce / Shop', sq: 'Dyqan Online' },
    { en: 'Construction / Architecture', sq: 'Ndërtim / Arkitekturë' },
    { en: 'Law / Financial Advisory', sq: 'Zyrë Ligjore / Financa' },
  ];

  const filteredProjects = examplesData.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  const formattedProposal =
    `Përshëndetje Maurik,\n\n` +
    `Po ju kontaktoj nga faqja juaj e portofolit për një propozim të personalizuar faqeje interneti.\n\n` +
    `• Emri / Biznesi: ${businessName || 'I paspecifikuar'}\n` +
    `• Kontakti im (Email / WhatsApp): ${contactInfo || 'I paspecifikuar'}\n` +
    `• Lloji i Biznesit: ${customBusinessType || 'Biznes i Personalizuar'}\n` +
    `• Kërkesat & Veçoritë: ${note || 'Dua një propozim dhe plan vizual për biznesin tim.'}\n\n` +
    `Pres përgjigjen tuaj.\nFaleminderit!`;

  const mailtoUrl = `mailto:millakumaurik@gmail.com?subject=${encodeURIComponent(
    `Kërkesë për Propozim Faqeje: ${businessName || 'Biznes'} (${customBusinessType || 'Faqe e Re'})`
  )}&body=${encodeURIComponent(formattedProposal)}`;

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(formattedProposal)}`;

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();

    // Trigger direct native compose in client's default email app
    try {
      window.location.href = mailtoUrl;
    } catch {
      // ignore
    }

    // Also send an async JSON dispatch to FormSubmit
    try {
      fetch('https://formsubmit.co/ajax/millakumaurik@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          'Emri & Biznesi': businessName,
          'Kontakti (Email / WhatsApp)': contactInfo,
          'Lloji i Biznesit': customBusinessType,
          'Veçoritë / Mesazhi': note,
          _subject: `Kërkesë e Re për Propozim Faqeje: ${businessName} (${customBusinessType})`,
          _captcha: 'false',
        }),
      }).catch(() => {});
    } catch {
      // ignore
    }

    setInquirySent(true);
  };

  const copyProposal = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(formattedProposal);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div style={{ backgroundColor: '#faf9f6', color: '#11100f', minHeight: '100vh', fontFamily: "var(--font-sans), 'Plus Jakarta Sans', -apple-system, sans-serif" }}>
      {/* Top Main Navigation */}
      <header
        style={{
          borderBottom: '1px solid #e8e6e1',
          backgroundColor: '#ffffff',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '14px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none',
                color: '#11100f',
                fontWeight: 800,
                fontSize: '1.05rem',
              }}
            >
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: '#11100f',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                }}
              >
                M
              </div>
              <span>Maurik</span>
            </Link>

            <span style={{ color: '#d1cdc7' }}>/</span>

            <span
              style={{
                fontSize: '0.85rem',
                fontWeight: 700,
                color: '#0b63f3',
                backgroundColor: '#ebf2ff',
                padding: '3px 10px',
                borderRadius: '9999px',
              }}
            >
              {t('What I Can Build', 'Çfarë Mund të Ndërtoj')}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <LanguageToggle />

            <a
              href="#contact"
              style={{
                backgroundColor: '#11100f',
                color: '#ffffff',
                padding: '8px 18px',
                borderRadius: '6px',
                fontSize: '0.85rem',
                fontWeight: 700,
                textDecoration: 'none',
                transition: 'background 0.2s',
              }}
            >
              {t('Get a Free Site Proposal', 'Merr një Propozim Falas')}
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        style={{
          maxWidth: '1060px',
          margin: '0 auto',
          padding: '72px 24px 40px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#ebf2ff',
            color: '#0a4bc4',
            border: '1px solid #bad3ff',
            padding: '5px 14px',
            borderRadius: '9999px',
            fontSize: '0.78rem',
            fontWeight: 800,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            marginBottom: '20px',
          }}
        >
          <Sparkles size={14} />
          {t('Interactive Local Business Showcase', 'Shembuj Faqesh për Çdo Lloj Biznesi')}
        </div>

        <h1
          style={{
            fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)',
            fontWeight: 800,
            lineHeight: 1.12,
            letterSpacing: '-0.03em',
            margin: '0 0 20px',
            color: '#11100f',
          }}
        >
          {t(
            'High-converting websites crafted for any local or online business.',
            'Faqe unike për biznese lokale që shndërrojnë vizitorët në klientë realë.'
          )}
        </h1>

        <p
          style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.18rem)',
            lineHeight: 1.65,
            color: '#55514b',
            maxWidth: '780px',
            margin: '0 auto 28px',
          }}
        >
          {t(
            'Explore 6 interactive website examples below illustrating bespoke typography, sub-second speed, and working business tools. I build custom websites for any legitimate business — from medical clinics and logistics to academies, shops, and professional services.',
            'Këta 6 shembuj më poshtë ilustrojnë shpejtësinë, dizajnin unik dhe veçoritë reale që mund të ndërtoj. Unë krijoj faqe të personalizuara për çdo lloj biznesi etik dhe profesional — nga klinika dhe transport, deri te akademi, dyqane dhe shërbime.'
          )}
        </p>

        {/* Category Filters */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            flexWrap: 'wrap',
            backgroundColor: '#edebe6',
            padding: '5px',
            borderRadius: '10px',
            maxWidth: '880px',
            margin: '0 auto',
          }}
        >
          {[
            { id: 'all', en: 'All Examples (6)', sq: 'Të Gjithë Shembujt (6)' },
            { id: 'education', en: 'Courses & Academy', sq: 'Kurse & Akademi' },
            { id: 'restaurant', en: 'Restaurant', sq: 'Restorant' },
            { id: 'retail', en: 'Retail & Shop', sq: 'Dyqan & Kafe' },
            { id: 'salon', en: 'Barber & Grooming', sq: 'Berber & Kujdes' },
            { id: 'professional', en: 'Law & Advisory', sq: 'Zyrë Ligjore' },
            { id: 'trade', en: 'Architecture & Trade', sq: 'Ndërtim & Interier' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveFilter(cat.id)}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                border: 'none',
                fontSize: '0.82rem',
                fontWeight: 800,
                cursor: 'pointer',
                backgroundColor: activeFilter === cat.id ? '#ffffff' : 'transparent',
                color: activeFilter === cat.id ? '#11100f' : '#6b665f',
                boxShadow: activeFilter === cat.id ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                transition: 'all 0.2s',
              }}
            >
              {t(cat.en, cat.sq)}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Cards Grid */}
      <section style={{ maxWidth: '1280px', margin: '0 auto 80px', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '36px' }}>
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                border: '1px solid #e8e6e1',
                padding: '24px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                {/* Header info */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                  <div>
                    <span
                      style={{
                        display: 'inline-block',
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: project.accentColor,
                        marginBottom: '4px',
                      }}
                    >
                      {t(project.industryEn, project.industrySq)}
                    </span>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 900, margin: 0, color: '#11100f', letterSpacing: '-0.01em' }}>
                      {t(project.titleEn, project.titleSq)}
                    </h3>
                  </div>

                  {/* Palette dots */}
                  <div style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>
                    {project.palette.map((color, cIdx) => (
                      <span
                        key={cIdx}
                        style={{
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          backgroundColor: color,
                          border: '1px solid rgba(0,0,0,0.12)',
                          display: 'inline-block',
                        }}
                      />
                    ))}
                  </div>
                </div>

                <p style={{ fontSize: '0.88rem', color: '#5e5a53', lineHeight: 1.5, margin: '0 0 20px' }}>
                  {t(project.descEn, project.descSq)}
                </p>

                {/* Clickable Browser Frame Card */}
                <Link
                  href={project.slug}
                  style={{ textDecoration: 'none', display: 'block', marginBottom: '20px' }}
                >
                  <BrowserFrame
                    url={project.urlPreview}
                    dark={project.darkPreview}
                  >
                    <div
                      style={{
                        height: '240px',
                        position: 'relative',
                        backgroundColor: project.palette[0],
                        color: project.palette[3] || '#ffffff',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        padding: '20px',
                      }}
                    >
                      <Image
                        src={project.previewHeroImage}
                        alt={project.titleEn}
                        fill
                        sizes="(max-width: 768px) 100vw, 500px"
                        style={{ objectFit: 'cover', opacity: project.darkPreview ? 0.45 : 0.85 }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: project.darkPreview
                            ? 'linear-gradient(to top, rgba(0,0,0,0.9) 10%, transparent 80%)'
                            : 'linear-gradient(to top, rgba(255,255,255,0.95) 15%, transparent 75%)',
                        }}
                      />
                      <div style={{ position: 'relative', zIndex: 2 }}>
                        <h4
                          style={{
                            margin: '0 0 6px',
                            fontSize: '1.05rem',
                            fontWeight: 800,
                            color: project.darkPreview ? '#ffffff' : '#11100f',
                            lineHeight: 1.25,
                          }}
                        >
                          {t(project.previewHeroTitle.en, project.previewHeroTitle.sq)}
                        </h4>
                        <p
                          style={{
                            margin: 0,
                            fontSize: '0.78rem',
                            color: project.darkPreview ? '#d1d5db' : '#4b5563',
                            lineHeight: 1.4,
                          }}
                        >
                          {t(project.previewSubtext.en, project.previewSubtext.sq)}
                        </p>
                      </div>
                    </div>
                  </BrowserFrame>
                </Link>

                {/* Key feature pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                  {(t(project.featuresEn.join('|||'), project.featuresSq.join('|||')).split('|||')).map((feat, fIdx) => (
                    <span
                      key={fIdx}
                      style={{
                        backgroundColor: '#f3f2ee',
                        color: '#403d39',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                      }}
                    >
                      <CheckCircle2 size={12} color={project.accentColor} />
                      {feat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Action Link */}
              <Link
                href={project.slug}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: '#11100f',
                  color: '#ffffff',
                  padding: '12px 18px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                }}
              >
                <span>{t(`Explore ${project.titleEn} Demo`, `Shiko Demonstrimin e Plotë`)}</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Value Proposition Band */}
      <section style={{ backgroundColor: '#ffffff', borderTop: '1px solid #e8e6e1', borderBottom: '1px solid #e8e6e1', padding: '80px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{ color: '#0b63f3', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              {t('Why Custom Outperforms Generic Page Builders', 'Pse Faqet e Personalizuara Janë Më Efektive')}
            </span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 900, margin: '8px 0 14px', letterSpacing: '-0.02em', color: '#11100f' }}>
              {t('Built specifically for local business growth and high conversions.', 'Ndërtuar posaçërisht për rritjen e biznesit dhe shitjeve.')}
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div style={{ backgroundColor: '#fbfaf8', padding: '28px', borderRadius: '8px', border: '1px solid #ece8e1' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: '#ebf2ff', color: '#0b63f3', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Zap size={22} />
              </div>
              <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#11100f', marginBottom: '8px' }}>
                {t('Sub-Second Page Load Speed', 'Ngarkim Rrufe i Faqes')}
              </div>
              <p style={{ color: '#6b665f', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>
                {t(
                  'Local customers on mobile bounce if a site takes more than 2 seconds to load. My sites score 95-100 on Google PageSpeed with zero bloated plugins.',
                  'Klientët lokalë largohen nëse faqja vonon mbi 2 sekonda. Faqet e mia arrijnë notën 95-100 në Google PageSpeed pa kode të rënda.'
                )}
              </p>
            </div>

            <div style={{ backgroundColor: '#fbfaf8', padding: '28px', borderRadius: '8px', border: '1px solid #ece8e1' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: '#eff6ff', color: '#1d4ed8', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Award size={22} />
              </div>
              <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#11100f', marginBottom: '8px' }}>
                {t('Bespoke Brand Identity', 'Identitet Unik Vizual')}
              </div>
              <p style={{ color: '#6b665f', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>
                {t(
                  'Your business will never look like a generic template. Custom typography, palettes, and layout rhythm crafted for your exact industry.',
                  'Biznesi juaj nuk do të duket kurrë si një shabllon i zakonshëm. Tipografi, ngjyra dhe strukturë unike e krijuar për industrinë tuaj.'
                )}
              </p>
            </div>

            <div style={{ backgroundColor: '#fbfaf8', padding: '28px', borderRadius: '8px', border: '1px solid #ece8e1' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: '#f0fdf4', color: '#16a34a', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <ShieldCheck size={22} />
              </div>
              <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#11100f', marginBottom: '8px' }}>
                {t('Zero Fragile Monthly Plugin Fees', 'Pa Tarifa të Fryra Mujore')}
              </div>
              <p style={{ color: '#6b665f', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>
                {t(
                  'You own your website entirely with no high agency lock-ins or recurring plugin subscriptions that break during updates.',
                  'Ju jeni pronari i plotë i faqes, pa varësi nga tarifa të fshehura apo plugina që prishen pas çdo përditësimi.'
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Direct Proposal & Contact Form */}
      <section id="contact" style={{ maxWidth: '920px', margin: '0 auto', padding: '80px 24px 100px' }}>
        <div style={{ backgroundColor: '#11100f', color: '#ffffff', borderRadius: '16px', padding: '48px 36px', boxShadow: '0 25px 60px rgba(0,0,0,0.18)' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <span style={{ color: '#0b63f3', backgroundColor: '#ebf2ff', padding: '4px 12px', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'inline-block', marginBottom: '14px' }}>
              {t('Start Your Project', 'Fillo Projektin Tënd')}
            </span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 900, margin: '0 0 12px', letterSpacing: '-0.02em', color: '#fff' }}>
              {t('Ready to build a website for your business?', 'Gati për të ndërtuar një faqe për biznesin tuaj?')}
            </h2>
            <p style={{ color: '#9ca3af', maxWidth: '600px', margin: '0 auto', fontSize: '0.95rem', lineHeight: 1.6 }}>
              {t(
                'Type your business details below. Submitting opens a direct pre-filled email to millakumaurik@gmail.com and WhatsApp for immediate response.',
                'Shkruani të dhënat e biznesit tuaj më poshtë. Dërgimi hap direkt email-in e përgatitur për millakumaurik@gmail.com dhe WhatsApp për përgjigje të shpejtë.'
              )}
            </p>
          </div>

          {inquirySent ? (
            <div style={{ textAlign: 'center', padding: '32px 20px', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '12px' }}>
              <div style={{ width: '56px', height: '56px', backgroundColor: '#dcfce7', color: '#16a34a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <CheckCircle2 size={32} />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 8px', color: '#fff' }}>
                {t('Proposal Dispatched to Maurik!', 'Kërkesa u Dërgua!')}
              </h3>
              <p style={{ color: '#9ca3af', fontSize: '0.92rem', lineHeight: 1.6, margin: '0 0 24px', maxWidth: '520px', marginInline: 'auto' }}>
                {t(
                  `Thank you, ${businessName || 'Friend'}! Your proposal details have been dispatched to millakumaurik@gmail.com. You can also send directly via email or WhatsApp below:`,
                  `Faleminderit, ${businessName || 'Mik'}! Kërkesa juaj u dërgua te millakumaurik@gmail.com. Mund ta dërgoni edhe drejtpërdrejt përmes email-it ose WhatsApp më poshtë:`
                )}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '440px', margin: '0 auto 24px' }}>
                <a
                  href={mailtoUrl}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    backgroundColor: '#ffffff',
                    color: '#11100f',
                    padding: '12px 20px',
                    borderRadius: '8px',
                    fontWeight: 800,
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                  }}
                >
                  <Mail size={17} />
                  <span>{t('Open in Email (Gmail / Apple Mail)', 'Hap në Email (Gmail / Apple Mail)')}</span>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    backgroundColor: '#16a34a',
                    color: '#ffffff',
                    padding: '12px 20px',
                    borderRadius: '8px',
                    fontWeight: 800,
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                  }}
                >
                  <MessageCircle size={17} />
                  <span>{t('Send via WhatsApp', 'Dërgo me WhatsApp')}</span>
                </a>

                <button
                  type="button"
                  onClick={copyProposal}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    color: '#ffffff',
                    border: '1px solid rgba(255,255,255,0.2)',
                    padding: '11px 20px',
                    borderRadius: '8px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                  }}
                >
                  {copied ? <Check size={16} color="#4ade80" /> : <Copy size={16} />}
                  <span>{copied ? t('Copied to Clipboard!', 'U Kopjua!') : t('Copy Proposal Summary', 'Kopjo Përmbledhjen')}</span>
                </button>
              </div>

              <div style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: '16px' }}>
                {t('Direct Email:', 'Email Direkt:')} <strong style={{ color: '#fff' }}>millakumaurik@gmail.com</strong>
              </div>

              <button
                type="button"
                onClick={() => {
                  setInquirySent(false);
                  setBusinessName('');
                  setContactInfo('');
                  setCustomBusinessType('');
                  setNote('');
                }}
                style={{ backgroundColor: 'transparent', color: '#9ca3af', border: 'none', cursor: 'pointer', fontSize: '0.85rem' }}
              >
                {t('Send Another Inquiry', 'Dërgo një Kërkesë Tjetër')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleInquiry} style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px', margin: '0 auto' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#d1d5db', marginBottom: '6px' }}>
                  {t('Your Name & Business Name', 'Emri Juaj & Emri i Biznesit')}
                </label>
                <input
                  type="text"
                  required
                  placeholder={lang === 'sq' ? 'p.sh. Arben Krasniqi – City Clinic' : 'e.g. Marcus Sterling – Apex Studio'}
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  style={{ width: '100%', padding: '12px 14px', backgroundColor: '#1a1918', border: '1px solid #333', borderRadius: '6px', color: '#fff', fontSize: '0.9rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#d1d5db', marginBottom: '6px' }}>
                  {t('Email Address or WhatsApp Number', 'Email ose Numër WhatsApp')}
                </label>
                <input
                  type="text"
                  required
                  placeholder={lang === 'sq' ? 'ju@biznesi.com ose +383 44 123 456' : 'you@company.com or +44 20 7946 0833'}
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  style={{ width: '100%', padding: '12px 14px', backgroundColor: '#1a1918', border: '1px solid #333', borderRadius: '6px', color: '#fff', fontSize: '0.9rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#d1d5db', marginBottom: '6px' }}>
                  {t('What type of business do you run? (Type freely or click a suggestion)', 'Çfarë lloji biznesi keni? (Shkruani lirisht çfarëdo biznesi)')}
                </label>
                <input
                  type="text"
                  required
                  placeholder={lang === 'sq' ? 'p.sh. Klinikë Dentare, Kompani Transporti, Agjenci, Dyqan, etj.' : 'e.g. Dental Clinic, Logistics Company, Real Estate, E-Commerce...'}
                  value={customBusinessType}
                  onChange={(e) => setCustomBusinessType(e.target.value)}
                  style={{ width: '100%', padding: '12px 14px', backgroundColor: '#1a1918', border: '1px solid #333', borderRadius: '6px', color: '#fff', fontSize: '0.9rem', marginBottom: '8px' }}
                />

                {/* Quick suggestion tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {popularSuggestions.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCustomBusinessType(t(s.en, s.sq))}
                      style={{
                        backgroundColor: '#242322',
                        border: '1px solid #3d3b38',
                        color: '#d1cdc7',
                        padding: '4px 10px',
                        borderRadius: '4px',
                        fontSize: '0.72rem',
                        cursor: 'pointer',
                        fontWeight: 600,
                      }}
                    >
                      + {t(s.en, s.sq)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#d1d5db', marginBottom: '6px' }}>
                  {t('What features do you need? (Optional)', 'Çfarë veçorish ju nevojiten? (Opsionale)')}
                </label>
                <textarea
                  rows={3}
                  placeholder={lang === 'sq' ? 'p.sh. Rezervim online, shumëgjuhësi, llogaritës çmimesh, katalog produktesh...' : 'e.g. Online booking, multi-language, price calculator, product catalog...'}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  style={{ width: '100%', padding: '12px 14px', backgroundColor: '#1a1918', border: '1px solid #333', borderRadius: '6px', color: '#fff', fontSize: '0.9rem', resize: 'vertical' }}
                />
              </div>

              <button
                type="submit"
                style={{
                  backgroundColor: '#0b63f3',
                  color: '#ffffff',
                  padding: '14px 24px',
                  borderRadius: '6px',
                  border: 'none',
                  fontWeight: 900,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(11, 99, 243, 0.4)',
                  marginTop: '6px',
                }}
              >
                <Send size={16} />
                <span>{t('Send Proposal Request (Direct to Email)', 'Dërgo Kërkesën për Propozim Falas')}</span>
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #e8e6e1', padding: '36px 24px', textAlign: 'center', fontSize: '0.85rem', color: '#736d63', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            &copy; {new Date().getFullYear()} Maurik. {t('Bespoke web development for local businesses.', 'Faqe të personalizuara për biznese lokale.')}
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link href="/" style={{ color: '#11100f', textDecoration: 'none', fontWeight: 700 }}>{t('Home', 'Ballina')}</Link>
            <Link href="/about" style={{ color: '#11100f', textDecoration: 'none', fontWeight: 700 }}>{t('About', 'Rreth Meje')}</Link>
            <Link href="/privacy" style={{ color: '#6b665f', textDecoration: 'none' }}>{t('Privacy', 'Privatësia')}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function ExamplesPage() {
  return (
    <LanguageProvider>
      <GalleryContent />
    </LanguageProvider>
  );
}
