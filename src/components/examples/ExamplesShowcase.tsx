'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BrowserFrame } from '@/components/examples/BrowserFrame';
import { useLanguage } from '@/components/examples/LanguageContext';
import {
  CheckCircle2,
  Send,
  ShieldCheck,
  Award,
  Mail,
  MessageCircle,
  Copy,
  Check,
  MapPin,
} from 'lucide-react';

interface ExampleProject {
  id: string;
  slug: string;
  category: 'restaurant' | 'retail' | 'salon' | 'professional' | 'trade' | 'education';
  titleEn: string;
  titleSq: string;
  industryEn: string;
  industrySq: string;
  locationEn: string;
  locationSq: string;
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
    id: 'restaurant',
    slug: '/examples/restaurant',
    category: 'restaurant',
    titleEn: 'Lumë Hearth & Smoke',
    titleSq: 'Lumë Hearth & Smoke',
    industryEn: 'Wood-Fired Dining & Botanicals',
    industrySq: 'Kuzhinë mbi Prush & Pije Botanike',
    locationEn: 'Prevallë Alpine Ridge · Prizren',
    locationSq: 'Prevallë · Prizren',
    descEn: 'Atmospheric alpine dining with instant online table reservations, interactive seasonal menu with allergen filters, and curated botanical pairings.',
    descSq: 'Prezantim elegant me gatim mbi prush lisi, rezervim të menjëhershëm tavoline, menu interaktive me filtra dietikë dhe pije bimore.',
    urlPreview: 'lumehearth.al',
    featuresEn: ['Interactive Table Booking', 'Allergen-Filtered Menu', 'Hearth Tasting Builder', 'Botanical Beverage Pairings'],
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
    locationEn: 'Copenhagen & Zurich',
    locationSq: 'Kopenhagë & Cyrih',
    descEn: 'Swiss-Scandinavian editorial storefront with a slide-out cart drawer, free shipping meter, interactive roast dials, and monthly subscription builder.',
    descSq: 'Dyqan minimalist me shportë anësore interaktive, matës të transportit falas, aplikim kuponash dhe kalkulator abonimi kafeje.',
    urlPreview: 'nordikgoods.com',
    featuresEn: ['Slide-Out Cart Drawer', 'Free Shipping Progress Meter', 'Roast Profile Dials', 'Flexible Subscription Engine'],
    featuresSq: ['Shportë Anësore Interaktive', 'Matës i Transportit Falas', 'Kalkulator i Pjekjes', 'Përshtatës i Abonimit'],
    palette: ['#f2eee7', '#ffffff', '#1d4ed8', '#121314'],
    accentColor: '#1d4ed8',
    darkPreview: false,
    previewHeroTitle: {
      en: 'Specialty coffee and minimalist gear.',
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
    locationEn: 'London Mayfair & Prishtinë',
    locationSq: 'Londër & Prishtinë',
    descEn: 'Traditional gentlemen’s grooming lounge with classic scissor tapers, sandalwood hot towel treatments, and an intuitive 3-step chair booking wizard.',
    descSq: 'Atelie tradicionale për prerje flokësh dhe rregullim mjekre me peshqirë të ngrohtë avulli dhe rezervim të menjëhershëm karrigeje online.',
    urlPreview: 'kallfabarber.com',
    featuresEn: ['3-Step Chair Booking Wizard', 'Sandalwood Hot Towel Steam', 'Japanese Steel Straight Razor', 'Organic Beard Care Tonics'],
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
    locationEn: 'Geneva & Zurich',
    locationSq: 'Gjenevë & Cyrih',
    descEn: 'Refined advisory presence featuring a confidential case evaluation estimator, interactive practice matrix, and secure consultation intake portal.',
    descSq: 'Prezencë prestigjoze korporative me mjet vlerësimi paraprak të çështjes dhe formular të sigurt konsultimi me garanci konfidencialiteti.',
    urlPreview: 'vanguardlegal.ch',
    featuresEn: ['Case Scope Assessment Tool', 'Practice Matrix Explorer', 'Confidential Client Portal', 'Attorney-Client Privilege Guarantee'],
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
    locationEn: 'Lugano & Munich',
    locationSq: 'Lugano & Mynih',
    descEn: 'Architectural technical showcase featuring an interactive slider-based cost and timeline estimator, project portfolio, and quick on-site survey request.',
    descSq: 'Dizajn modern teknik me llogaritës të menjëhershëm kostoje e kohe me slider, galeri punimesh dhe kërkesë matjeje në objekt.',
    urlPreview: 'artisanbuild.com',
    featuresEn: ['Interactive Cost Slider Engine', 'Finish Tier Estimator', '5-Phase Method Blueprint', 'Laser On-Site Survey Request'],
    featuresSq: ['Llogaritës Kostoje me Slider', 'Përzgjedhje Nivelit të Punimit', 'Proces i Qartë 5-Hapësh', 'Kërkesë për Matje me Laser'],
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
  {
    id: 'education',
    slug: '/examples/education',
    category: 'education',
    titleEn: 'Nexus Studio Academy',
    titleSq: 'Nexus Studio Academy',
    industryEn: 'Masterclasses & Technical Training',
    industrySq: 'Platformë Kursesh & Akademi',
    locationEn: 'Berlin & Global',
    locationSq: 'Berlin & Ndërkombëtar',
    descEn: 'High-end technical education portal with an interactive 6-module curriculum accordion, sample video lecture modal, and transparent enrollment checkout tiers.',
    descSq: 'Platformë moderne për kurse online me kurrikulë 6-modulëshe, demonstrim të video leksioneve dhe përzgjedhje të thjeshtë të paketës së regjistrimit.',
    urlPreview: 'nexusacademy.dev',
    featuresEn: ['6-Module Interactive Curriculum', 'Sample Lecture Video Player', '3-Tier Tuition Checkout', 'Official Credential Verification'],
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
];

interface ExamplesShowcaseProps {
  forcedLanguage?: 'en' | 'sq';
}

export function ExamplesShowcase({ forcedLanguage }: ExamplesShowcaseProps) {
  const { lang } = useLanguage();
  const activeLang = forcedLanguage || lang;

  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [inquirySent, setInquirySent] = useState(false);
  const [copied, setCopied] = useState(false);

  // Form Fields
  const [businessName, setBusinessName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [customBusinessType, setCustomBusinessType] = useState('');
  const [note, setNote] = useState('');

  const popularSuggestions = [
    { en: 'Medical / Dental Clinic', sq: 'Klinikë / Stomatologji' },
    { en: 'Logistics & Transport', sq: 'Transport & Logjistikë' },
    { en: 'Real Estate Agency', sq: 'Agjenci Imobiliare' },
    { en: 'Auto Salon / Dealership', sq: 'Auto Sallon / Servis' },
    { en: 'Bar & Restaurant', sq: 'Restorant & Gastronomi' },
    { en: 'E-Commerce Store', sq: 'Dyqan Online' },
  ];

  const proposalText =
    `Përshëndetje Maurik,\n\n` +
    `Po ju kontaktoj nga galeria e projekteve tuaja për një propozim faqeje interneti.\n\n` +
    `• Emri / Biznesi: ${businessName || 'Nuk u specifikua'}\n` +
    `• Kontakti: ${contactInfo || 'Nuk u specifikua'}\n` +
    `• Lloji i Biznesit: ${customBusinessType || 'General'}\n` +
    `• Kërkesat & Veçoritë: ${note || 'Dua një faqe me cilësi të lartë dhe arkitekturë të personalizuar për biznesin tim.'}\n\n` +
    `Pres përgjigjen tuaj.\nFaleminderit!`;

  const mailtoUrl = `mailto:millakumaurik@gmail.com?subject=${encodeURIComponent(
    `Kërkesë për Faqe nga Galeria: ${businessName || 'Klient'}`
  )}&body=${encodeURIComponent(proposalText)}`;

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(proposalText)}`;

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      window.location.href = mailtoUrl;
    } catch {
      // ignore
    }

    try {
      fetch('https://formsubmit.co/ajax/millakumaurik@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          'Emri / Biznesi': businessName,
          'Kontakti': contactInfo,
          'Lloji i Biznesit': customBusinessType,
          'Veçoritë / Kërkesat': note,
          _subject: `Kërkesë nga Galeria e Shembujve: ${businessName || 'Klient'}`,
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
      navigator.clipboard.writeText(proposalText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const filteredProjects =
    activeFilter === 'all'
      ? examplesData
      : examplesData.filter((p) => p.category === activeFilter);

  return (
    <div
      style={{
        backgroundColor: '#f6f5f1',
        minHeight: '100vh',
        color: '#11100f',
        fontFamily: "'Avenir Next', 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Top Navbar */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: 'rgba(246, 245, 241, 0.96)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid #e7e4dc',
          padding: '14px 24px',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link
              href="/"
              style={{
                fontSize: '1.1rem',
                fontWeight: 900,
                color: '#11100f',
                textDecoration: 'none',
                letterSpacing: '-0.02em',
              }}
            >
              Maurik
            </Link>

            <span
              style={{
                fontSize: '0.74rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.09em',
                color: '#1e40af',
                backgroundColor: '#eff6ff',
                padding: '4px 12px',
                borderRadius: '9999px',
                border: '1px solid #dbeafe',
              }}
            >
              {activeLang === 'sq' ? 'Cilësi & Elegancë' : 'High-Quality Architecture'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <a
              href="#contact"
              style={{
                backgroundColor: '#11100f',
                color: '#ffffff',
                padding: '9px 20px',
                borderRadius: '6px',
                fontSize: '0.85rem',
                fontWeight: 700,
                textDecoration: 'none',
                transition: 'opacity 0.2s',
              }}
            >
              {activeLang === 'sq' ? 'Kërko një Propozim' : 'Request a Proposal'}
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        style={{
          maxWidth: '1060px',
          margin: '0 auto',
          padding: '84px 24px 48px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '7px',
            fontSize: '0.78rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: '#716b60',
            backgroundColor: '#ece9e1',
            padding: '5px 14px',
            borderRadius: '9999px',
            marginBottom: '22px',
          }}
        >
          <span>{activeLang === 'sq' ? 'Galeri Arkitekturash Reale' : 'Production Architectures'}</span>
        </div>

        <h1
          style={{
            fontSize: 'clamp(2.3rem, 4.8vw, 3.8rem)',
            fontWeight: 900,
            lineHeight: 1.12,
            letterSpacing: '-0.035em',
            margin: '0 0 22px',
            color: '#11100f',
          }}
        >
          {activeLang === 'sq'
            ? 'Faqe interneti me cilësi të lartë për biznese që kërkojnë rezultat dhe elegancë.'
            : 'High-quality custom websites designed for businesses that demand distinction.'}
        </h1>

        <p
          style={{
            fontSize: 'clamp(1.02rem, 1.8vw, 1.18rem)',
            lineHeight: 1.68,
            color: '#4e4a43',
            maxWidth: '820px',
            margin: '0 auto 34px',
          }}
        >
          {activeLang === 'sq'
            ? 'Gjashtë arkitektura reale që ilustrojnë tipografi unike, dizajne të sofistikuara dhe veçori të gatshme pune. Të ndërtuara mbi sisteme moderne që mund të zgjerohen në çdo kohë, pa pagesa mujore për platforma të huaja.'
            : 'Six production-ready website architectures illustrating custom typography, refined layouts, and working business systems. Built on a modular, upgradable foundation owned entirely by you, with zero recurring plugin fees or template constraints.'}
        </p>

        {/* Category Filters */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            flexWrap: 'wrap',
            backgroundColor: '#eae7df',
            padding: '6px',
            borderRadius: '10px',
            maxWidth: '900px',
            margin: '0 auto',
          }}
        >
          {[
            { id: 'all', en: 'All Architectures (6)', sq: 'Të Gjitha Arkitekturat (6)' },
            { id: 'restaurant', en: 'Fine Dining & Bar', sq: 'Restorant & Gastronomi' },
            { id: 'retail', en: 'Editorial Retail', sq: 'Dyqan & Kafe' },
            { id: 'salon', en: 'Grooming Lounge', sq: 'Berber & Sallon' },
            { id: 'professional', en: 'Corporate Law', sq: 'Zyrë Ligjore' },
            { id: 'trade', en: 'Architecture & Craft', sq: 'Arkitekturë & Ndërtim' },
            { id: 'education', en: 'Masterclasses', sq: 'Akademi & Kurse' },
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
                boxShadow: activeFilter === cat.id ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                transition: 'all 0.2s ease',
              }}
            >
              {activeLang === 'sq' ? cat.sq : cat.en}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Cards Grid */}
      <section style={{ maxWidth: '1280px', margin: '0 auto 90px', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '40px' }}>
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '14px',
                border: '1px solid #e6e3da',
                padding: '26px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              }}
            >
              <div>
                {/* Header info */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <span
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          color: project.accentColor,
                        }}
                      >
                        {activeLang === 'sq' ? project.industrySq : project.industryEn}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: '#8c867a' }}>·</span>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '3px',
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          color: '#6b665f',
                        }}
                      >
                        <MapPin size={11} />
                        {activeLang === 'sq' ? project.locationSq : project.locationEn}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.45rem', fontWeight: 900, margin: 0, color: '#11100f', letterSpacing: '-0.015em' }}>
                      {activeLang === 'sq' ? project.titleSq : project.titleEn}
                    </h3>
                  </div>

                  {/* Palette dots */}
                  <div style={{ display: 'flex', gap: '4px', marginTop: '6px' }}>
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

                <p style={{ fontSize: '0.89rem', color: '#55514a', lineHeight: 1.55, margin: '0 0 20px' }}>
                  {activeLang === 'sq' ? project.descSq : project.descEn}
                </p>

                {/* Clickable Browser Frame Card */}
                <Link
                  href={project.slug}
                  style={{ textDecoration: 'none', display: 'block', marginBottom: '22px' }}
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
                        padding: '22px',
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
                            ? 'linear-gradient(to top, rgba(0,0,0,0.92) 10%, transparent 80%)'
                            : 'linear-gradient(to top, rgba(255,255,255,0.96) 15%, transparent 75%)',
                        }}
                      />
                      <div style={{ position: 'relative', zIndex: 2 }}>
                        <h4
                          style={{
                            margin: '0 0 6px',
                            fontSize: '1.08rem',
                            fontWeight: 800,
                            color: project.darkPreview ? '#ffffff' : '#11100f',
                            lineHeight: 1.25,
                          }}
                        >
                          {activeLang === 'sq' ? project.previewHeroTitle.sq : project.previewHeroTitle.en}
                        </h4>
                        <p
                          style={{
                            margin: 0,
                            fontSize: '0.78rem',
                            color: project.darkPreview ? '#d1d5db' : '#4b5563',
                            lineHeight: 1.4,
                          }}
                        >
                          {activeLang === 'sq' ? project.previewSubtext.sq : project.previewSubtext.en}
                        </p>
                      </div>
                    </div>
                  </BrowserFrame>
                </Link>

                {/* Key feature pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '22px' }}>
                  {(activeLang === 'sq' ? project.featuresSq : project.featuresEn).map((feat, fIdx) => (
                    <span
                      key={fIdx}
                      style={{
                        backgroundColor: '#f3f1eb',
                        color: '#3d3a34',
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

              {/* Card Action Link (No arrow) */}
              <Link
                href={project.slug}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#11100f',
                  color: '#ffffff',
                  padding: '13px 20px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontWeight: 800,
                  fontSize: '0.88rem',
                  textAlign: 'center',
                }}
              >
                <span>{activeLang === 'sq' ? 'Shiko Demonstrimin e Plotë' : 'Explore Live Demo'}</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Value Proposition Band */}
      <section style={{ backgroundColor: '#ffffff', borderTop: '1px solid #e7e4dc', borderBottom: '1px solid #e7e4dc', padding: '90px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span style={{ color: '#1e40af', fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              {activeLang === 'sq' ? 'Parimet e Arkitekturës Digjitale' : 'The Architectural Standard'}
            </span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, margin: '10px 0 16px', letterSpacing: '-0.025em', color: '#11100f' }}>
              {activeLang === 'sq'
                ? 'Ndërtuar posaçërisht për qëndrueshmëri, elegancë dhe konvertim.'
                : 'Built specifically for distinction, longevity, and direct customer conversion.'}
            </h2>
            <p style={{ color: '#666157', fontSize: '1.02rem', maxWidth: '680px', margin: '0 auto' }}>
              {activeLang === 'sq'
                ? 'Pse një arkitekturë e personalizuar tejkalon çdo shabllon të zakonshëm në internet.'
                : 'Why custom digital architecture outperforms off-the-shelf page builders.'}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px' }}>
            <div style={{ backgroundColor: '#faf9f6', padding: '32px', borderRadius: '10px', border: '1px solid #ece8e0' }}>
              <div style={{ width: '42px', height: '42px', backgroundColor: '#eff6ff', color: '#1d4ed8', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                <Award size={22} />
              </div>
              <div style={{ fontWeight: 900, fontSize: '1.15rem', color: '#11100f', marginBottom: '10px' }}>
                {activeLang === 'sq' ? 'Identitet Unik Vizual' : 'Bespoke Brand Architecture'}
              </div>
              <p style={{ color: '#635e54', fontSize: '0.9rem', lineHeight: 1.65, margin: 0 }}>
                {activeLang === 'sq'
                  ? 'Biznesi juaj nuk do të duket kurrë si një kopje e zakonshme. Tipografi e zgjedhur posaçërisht, ngjyra të sofistikuara dhe strukturë unike e përshtatur për nivelin e klientëve tuaj.'
                  : 'Your business will never look like a template. Curated typography, tailored palettes, and layout rhythm crafted specifically for your exact industry.'}
              </p>
            </div>

            <div style={{ backgroundColor: '#faf9f6', padding: '32px', borderRadius: '10px', border: '1px solid #ece8e0' }}>
              <div style={{ width: '42px', height: '42px', backgroundColor: '#f0fdf4', color: '#16a34a', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                <MessageCircle size={22} />
              </div>
              <div style={{ fontWeight: 900, fontSize: '1.15rem', color: '#11100f', marginBottom: '10px' }}>
                {activeLang === 'sq' ? 'Konvertim i Drejtpërdrejtë' : 'Direct Customer Conversion'}
              </div>
              <p style={{ color: '#635e54', fontSize: '0.9rem', lineHeight: 1.65, margin: 0 }}>
                {activeLang === 'sq'
                  ? 'Shndërroni vizitorët në klientë me rezervime tavolinash, matës kostoje dhe komunikim direkt me WhatsApp me një klik, pa ndërmjetësues dhe pa komisione të panevojshme.'
                  : 'Turn visitors into patrons through purpose-built booking flows, instant project quote sliders, and direct WhatsApp communication with zero commission fees.'}
              </p>
            </div>

            <div style={{ backgroundColor: '#faf9f6', padding: '32px', borderRadius: '10px', border: '1px solid #ece8e0' }}>
              <div style={{ width: '42px', height: '42px', backgroundColor: '#faf5ff', color: '#7e22ce', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                <ShieldCheck size={22} />
              </div>
              <div style={{ fontWeight: 900, fontSize: '1.15rem', color: '#11100f', marginBottom: '10px' }}>
                {activeLang === 'sq' ? 'Strukturë e Zgjerueshme' : 'Upgradable Foundation'}
              </div>
              <p style={{ color: '#635e54', fontSize: '0.9rem', lineHeight: 1.65, margin: 0 }}>
                {activeLang === 'sq'
                  ? 'Ju jeni pronari i plotë i kodit dhe faqes tuaj. E ndërtuar me teknologji moderne Next.js që mund të zgjerohet me funksione të reja në çdo kohë pa u prishur.'
                  : 'You own your website entirely. Built with modern Next.js and React architecture that scales seamlessly with your company without fragile plugin breakdowns.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Proposal Request Section */}
      <section id="contact" style={{ backgroundColor: '#11100f', color: '#ffffff', padding: '96px 24px' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ color: '#60a5fa', fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', display: 'inline-block', marginBottom: '12px' }}>
            {activeLang === 'sq' ? 'Kërkesë Direkte për Propozim' : 'Direct Proposal Request'}
          </span>
          <h2 style={{ fontSize: 'clamp(2.1rem, 4.2vw, 2.9rem)', fontWeight: 900, color: '#ffffff', margin: '0 0 16px', letterSpacing: '-0.025em' }}>
            {activeLang === 'sq' ? 'Keni një biznes që meriton një faqe të tillë?' : 'Ready to build a website that reflects true quality?'}
          </h2>
          <p style={{ color: '#9ca3af', fontSize: '1.02rem', lineHeight: 1.65, margin: '0 auto 42px', maxWidth: '640px' }}>
            {activeLang === 'sq'
              ? 'Shkruani emrin e biznesit dhe veçoritë që dëshironi të keni. Do të përgatis një koncept të qartë dhe propozim të detajuar brenda 24 orëve.'
              : 'Tell me about your business and the features you envision. I will put together a clear concept and direct proposal within 24 hours.'}
          </p>

          {inquirySent ? (
            <div style={{ backgroundColor: '#1c1b1a', border: '1px solid #333', borderRadius: '12px', padding: '36px 24px', maxWidth: '600px', margin: '0 auto' }}>
              <div style={{ width: '48px', height: '48px', backgroundColor: '#14532d', color: '#4ade80', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <Check size={26} />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 8px', color: '#ffffff' }}>
                {activeLang === 'sq' ? 'Kërkesa u Dërgua me Sukses' : 'Proposal Request Dispatched'}
              </h3>
              <p style={{ color: '#9ca3af', fontSize: '0.92rem', lineHeight: 1.6, margin: '0 0 24px', maxWidth: '520px', marginInline: 'auto' }}>
                {activeLang === 'sq'
                  ? `Faleminderit, ${businessName || 'Mik'}! Kërkesa juaj u dërgua te millakumaurik@gmail.com. Mund ta dërgoni edhe drejtpërdrejt përmes email-it ose WhatsApp më poshtë:`
                  : `Thank you, ${businessName || 'Friend'}! Your proposal details have been dispatched to millakumaurik@gmail.com. You can also send directly via email or WhatsApp below:`}
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
                  <span>{activeLang === 'sq' ? 'Hap në Email (Gmail / Apple Mail)' : 'Open in Email (Gmail / Apple Mail)'}</span>
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
                  <span>{activeLang === 'sq' ? 'Dërgo me WhatsApp' : 'Send via WhatsApp'}</span>
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
                  <span>{copied ? (activeLang === 'sq' ? 'U Kopjua!' : 'Copied to Clipboard!') : (activeLang === 'sq' ? 'Kopjo Përmbledhjen' : 'Copy Proposal Summary')}</span>
                </button>
              </div>

              <div style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: '16px' }}>
                {activeLang === 'sq' ? 'Email Direkt:' : 'Direct Email:'} <strong style={{ color: '#fff' }}>millakumaurik@gmail.com</strong>
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
                {activeLang === 'sq' ? 'Dërgo një Kërkesë Tjetër' : 'Send Another Inquiry'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleInquiry} style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px', margin: '0 auto' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#d1d5db', marginBottom: '6px', textAlign: 'left' }}>
                  {activeLang === 'sq' ? 'Emri Juaj & Emri i Biznesit' : 'Your Name & Business Name'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={activeLang === 'sq' ? 'p.sh. Arben Krasniqi, City Clinic' : 'e.g. Marcus Sterling, Apex Studio'}
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  style={{ width: '100%', padding: '12px 14px', backgroundColor: '#1a1918', border: '1px solid #333', borderRadius: '6px', color: '#fff', fontSize: '0.9rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#d1d5db', marginBottom: '6px', textAlign: 'left' }}>
                  {activeLang === 'sq' ? 'Email ose Numër WhatsApp' : 'Email Address or WhatsApp Number'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={activeLang === 'sq' ? 'ju@biznesi.com ose +383 44 123 456' : 'you@company.com or +44 20 7946 0833'}
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  style={{ width: '100%', padding: '12px 14px', backgroundColor: '#1a1918', border: '1px solid #333', borderRadius: '6px', color: '#fff', fontSize: '0.9rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#d1d5db', marginBottom: '6px', textAlign: 'left' }}>
                  {activeLang === 'sq' ? 'Çfarë lloji biznesi keni?' : 'What type of business do you run?'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={activeLang === 'sq' ? 'p.sh. Klinikë Dentare, Kompani Transporti, Agjenci, Dyqan, etj.' : 'e.g. Dental Clinic, Logistics Company, Real Estate, E-Commerce...'}
                  value={customBusinessType}
                  onChange={(e) => setCustomBusinessType(e.target.value)}
                  style={{ width: '100%', padding: '12px 14px', backgroundColor: '#1a1918', border: '1px solid #333', borderRadius: '6px', color: '#fff', fontSize: '0.9rem', marginBottom: '8px' }}
                />

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {popularSuggestions.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCustomBusinessType(activeLang === 'sq' ? s.sq : s.en)}
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
                      + {activeLang === 'sq' ? s.sq : s.en}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#d1d5db', marginBottom: '6px', textAlign: 'left' }}>
                  {activeLang === 'sq' ? 'Çfarë veçorish ju nevojiten? (Opsionale)' : 'What features do you need? (Optional)'}
                </label>
                <textarea
                  rows={3}
                  placeholder={activeLang === 'sq' ? 'p.sh. Rezervim online, shumëgjuhësi, llogaritës çmimesh, katalog produktesh...' : 'e.g. Online booking, multi-language, price calculator, product catalog...'}
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
                  fontWeight: 800,
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
                <span>{activeLang === 'sq' ? 'Dërgo Kërkesën për Propozim' : 'Send Proposal Request'}</span>
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #e7e4dc', padding: '36px 24px', textAlign: 'center', fontSize: '0.85rem', color: '#716b60', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            &copy; {new Date().getFullYear()} Maurik. {activeLang === 'sq' ? 'Faqe interneti me cilësi të lartë dhe arkitekturë të qëndrueshme.' : 'High-quality digital architecture and custom web development.'}
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link href="/" style={{ color: '#11100f', textDecoration: 'none', fontWeight: 700 }}>{activeLang === 'sq' ? 'Ballina' : 'Home'}</Link>
            <Link href="/about" style={{ color: '#11100f', textDecoration: 'none', fontWeight: 700 }}>{activeLang === 'sq' ? 'Rreth Meje' : 'About'}</Link>
            <Link href="/privacy" style={{ color: '#6b665f', textDecoration: 'none' }}>{activeLang === 'sq' ? 'Privatësia' : 'Privacy'}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
