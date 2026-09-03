'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { DemoTopBar } from '@/components/examples/DemoTopBar';
import { LanguageProvider, useLanguage } from '@/components/examples/LanguageContext';
import {
  Scissors,
  Clock,
  MapPin,
  Phone,
  Check,
  ShieldCheck,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface ServiceItem {
  id: string;
  category: 'hair' | 'beard' | 'combo' | 'treatment';
  nameEn: string;
  nameSq: string;
  descEn: string;
  descSq: string;
  duration: string;
  price: string;
}

const serviceCatalog: ServiceItem[] = [
  {
    id: 'b1',
    category: 'hair',
    nameEn: 'Master Executive Haircut & Scissor Finish',
    nameSq: 'Prerje Klasike me Gërshërë & Stilim Master',
    descEn: 'Consultation, precision razor taper fade, hot neck lather & straight razor finish, cooling menthol wash.',
    descSq: 'Konsultim i stilit, prerje precize me gërshërë, pastrim me brisk rroje në qafë dhe larje freskuese.',
    duration: '45 min',
    price: '€18',
  },
  {
    id: 'b2',
    category: 'beard',
    nameEn: 'Traditional Sandalwood Hot Towel Beard Sculpt',
    nameSq: 'Rregullim Mjekre me Peshaqirë të Ngrohtë & Avull',
    descEn: 'Triple hot towel eucalyptus steam, hand-drawn beard lines with Japanese steel razor, organic cedar balm massage.',
    descSq: 'Avullim me peshqirë të ngrohtë eukalipti, vijëzim me brisk rroje çeliku dhe masazh me vaj kedri organik.',
    duration: '35 min',
    price: '€14',
  },
  {
    id: 'b3',
    category: 'combo',
    nameEn: 'The Complete Kallfa Gentleman Ritual',
    nameSq: 'Paketa e Plotë: Prerje + Mjekër + Trajtim Avulli',
    descEn: 'Master haircut, full beard shaping, hot & cold towel treatment, invigorating scalp massage & styling tonic.',
    descSq: 'Prerje e plotë flokësh, rregullim dhe vijëzim mjekre, terapi peshqiri të nxehtë dhe masazh i kokës.',
    duration: '75 min',
    price: '€28',
  },
  {
    id: 'b4',
    category: 'treatment',
    nameEn: 'Detoxifying Charcoal Scalp & Pore Steam',
    nameSq: 'Pastrim i Thellë i Kokës me Qymyr Aktiv & Avull',
    descEn: 'Activated charcoal exfoliating wash, herbal steam therapy, and deep botanical hydration seal.',
    descSq: 'Eksfoliim me qymyr aktiv, terapi me avull bimore dhe hidratim me ekstrakt menteje.',
    duration: '30 min',
    price: '€16',
  },
  {
    id: 'b5',
    category: 'hair',
    nameEn: 'Classic Skin Fade & Razor Lineup',
    nameSq: 'Prerje Skin Fade & Konturim Preciz me Brisk',
    descEn: 'Zero foil gradient fade, crisp perimeter outline, matte clay natural texture styling.',
    descSq: 'Shkrirje perfekte në lëkurë, konture të theksuara dhe stilim me dyllë mat.',
    duration: '40 min',
    price: '€16',
  },
  {
    id: 'b6',
    category: 'treatment',
    nameEn: 'Beard Softening & Argan Oil Deep Hydration',
    nameSq: 'Trajtim Zbutës i Mjekrës me Vaj Argani',
    descEn: 'Deep conditioning warm argan oil bath, high-frequency follicle stimulation, and mustache wax grooming.',
    descSq: 'Kujdes i thellë me vaj argani të ngrohtë, stimulim i rrënjëve dhe stilim i mustaqeve.',
    duration: '25 min',
    price: '€12',
  },
];

function BarberContent() {
  const { lang, t } = useLanguage();

  // Booking Wizard State
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState<1 | 2 | 3>(1);
  const [selectedService, setSelectedService] = useState<ServiceItem>(serviceCatalog[0]);
  const [bookingDate, setBookingDate] = useState('2026-08-31');
  const [bookingTime, setBookingTime] = useState('11:00');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [bookingDone, setBookingDone] = useState(false);

  // Active Category filter for catalog display
  const [activeCatalogTab, setActiveCatalogTab] = useState<'all' | 'hair' | 'beard' | 'combo' | 'treatment'>('all');

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const filteredServices = serviceCatalog.filter(
    (item) => activeCatalogTab === 'all' || item.category === activeCatalogTab
  );

  const startBookingWithService = (service: ServiceItem) => {
    setSelectedService(service);
    setWizardStep(2);
    setIsWizardOpen(true);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingDone(true);
  };

  const locationText = lang === 'sq' ? 'Rruga Garibaldi, Nr. 14, Prishtinë' : '18 Jermyn Street, St James’s, London SW1Y 6HP';
  const phoneText = lang === 'sq' ? '+383 49 500 600' : '+44 20 7946 0772';
  const sampleName = lang === 'sq' ? 'Dren Krasniqi' : 'Arthur Vance';

  return (
    <div style={{ backgroundColor: '#111215', color: '#e5e7eb', minHeight: '100vh', fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif" }}>
      <DemoTopBar
        demoTitle={{ en: 'Gentlemen’s Barber & Grooming Demo', sq: 'Shembull Faqeje: Berber & Kujdes për Meshkuj' }}
        industry={{ en: 'Traditional Barbering & Beard Lounge', sq: 'Berber Tradicional & Kujdes Personal' }}
        badgeColor="#c59b27"
      />

      {/* Top Header */}
      <header style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', backgroundColor: '#111215', position: 'sticky', top: '49px', zIndex: 30 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', backgroundColor: 'rgba(197, 155, 39, 0.15)', border: '1px solid #c59b27', color: '#c59b27', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Scissors size={18} />
            </div>
            <div>
              <span style={{ fontSize: '1.35rem', fontWeight: 900, letterSpacing: '0.12em', color: '#ffffff', display: 'block', lineHeight: 1 }}>
                KALLFA
              </span>
              <span style={{ fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#c59b27', fontWeight: 800 }}>
                {t('CLASSIC BARBER & GROOMING', 'BERBER & ATELIE TRADICIONALE')}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '32px', fontSize: '0.88rem', fontWeight: 700 }} className="hidden-mobile">
            <a href="#services" style={{ color: '#9ca3af', textDecoration: 'none' }}>{t('Services & Rates', 'Shërbimet & Çmimet')}</a>
            <a href="#atelier" style={{ color: '#9ca3af', textDecoration: 'none' }}>{t('The Atelier', 'Ambienti')}</a>
            <a href="#faq" style={{ color: '#9ca3af', textDecoration: 'none' }}>{t('FAQ', 'Pyetje')}</a>
            <a href="#location" style={{ color: '#9ca3af', textDecoration: 'none' }}>{t('Hours & Chairs', 'Orari & Vendndodhja')}</a>
          </div>

          <button
            type="button"
            onClick={() => {
              setWizardStep(1);
              setIsWizardOpen(true);
            }}
            style={{
              backgroundColor: '#c59b27',
              color: '#111215',
              border: 'none',
              padding: '10px 22px',
              borderRadius: '4px',
              fontSize: '0.82rem',
              fontWeight: 800,
              letterSpacing: '0.04em',
              cursor: 'pointer',
              boxShadow: '0 2px 10px rgba(197, 155, 39, 0.35)',
            }}
          >
            {t('Book Chair Online', 'Rezervo Karrigen Online')}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '72px 24px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#c59b27', backgroundColor: 'rgba(197, 155, 39, 0.12)', border: '1px solid rgba(197, 155, 39, 0.3)', padding: '5px 14px', borderRadius: '4px', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 800, marginBottom: '20px' }}>
              <Sparkles size={14} />
              {t('Heritage Barbering & Hot Towel Beard Grooming', 'Prerje Tradicionale me Gërshërë & Kujdes Mjekre')}
            </div>

            <h1 style={{ fontSize: 'clamp(2.4rem, 4.6vw, 3.8rem)', lineHeight: 1.1, fontWeight: 900, margin: '0 0 24px', letterSpacing: '-0.02em', color: '#ffffff' }}>
              {t('Precision cuts, straight-razor lines, and timeless craftsmanship.', 'Përkushtim i pakompromis ndaj stilit, saktësisë dhe traditës.')}
            </h1>

            <p style={{ maxWidth: '580px', margin: '0 0 32px', fontSize: '1.05rem', lineHeight: 1.7, color: '#9ca3af', fontWeight: 400 }}>
              {t(
                'Kallfa brings back the golden age of traditional gentleman grooming, featuring classic scissor tapers, sandalwood hot towel steam, and organic beard care.',
                'Kallfa rikhen përvojën klasike të berberit tradicional, me prerje precize me gërshërë, avullim me peshqirë të nxehtë dhe vajra bimorë për mjekër.'
              )}
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => {
                  setWizardStep(1);
                  setIsWizardOpen(true);
                }}
                style={{
                  backgroundColor: '#c59b27',
                  color: '#111215',
                  border: 'none',
                  padding: '14px 32px',
                  borderRadius: '4px',
                  fontSize: '0.95rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(197, 155, 39, 0.4)',
                }}
              >
                {t('Book Your Appointment', 'Rezervo Takimin Tënd')}
              </button>
              <a
                href="#services"
                style={{
                  backgroundColor: 'transparent',
                  color: '#ffffff',
                  border: '1px solid rgba(255,255,255,0.2)',
                  padding: '14px 26px',
                  borderRadius: '4px',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                }}
              >
                {t('View Services & Rates', 'Shiko Çmimet')}
              </a>
            </div>
          </div>

          {/* Hero Image (Strictly Leather Barber Chair / Interior - ZERO People) */}
          <div style={{ position: 'relative', height: '420px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.5)' }}>
            <Image
              src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1000&q=80"
              alt="Vintage brown leather barber chair with antique mirrors and brass finishes in heritage barbershop"
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              style={{ objectFit: 'cover' }}
              priority
            />
            <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px', backgroundColor: 'rgba(17,18,21,0.92)', backdropFilter: 'blur(8px)', padding: '10px 16px', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid rgba(255,255,255,0.08)' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ffffff' }}>
                {t('Custom Vintage Leather Barber Chairs', 'Karrige Klasike Lëkure & Brisk Çeliku')}
              </span>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#c59b27' }}>
                {t('Walk-Ins & Online Bookings', 'Me Termin ose Pa Termin')}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Atelier Tools & Interior Grid (Strictly Objects/Interior - ZERO People) */}
      <section id="atelier" style={{ maxWidth: '1280px', margin: '0 auto 80px', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          <div style={{ height: '280px', position: 'relative', borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
            <Image
              src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80"
              alt="Forged steel straight razor and classic badger shaving brush on dark slate"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              style={{ objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', bottom: '14px', left: '14px', backgroundColor: 'rgba(0,0,0,0.75)', padding: '4px 10px', borderRadius: '4px', fontSize: '0.78rem', fontWeight: 800, color: '#c59b27' }}>
              {t('Japanese Forged Steel Straight Razors', 'Brisqe Çeliku të Punuar me Dorë')}
            </div>
          </div>

          <div style={{ height: '280px', position: 'relative', borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
            <Image
              src="https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=800&q=80"
              alt="Artisan beard balms, matte clay pomades, and sandalwood grooming tonics"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              style={{ objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', bottom: '14px', left: '14px', backgroundColor: 'rgba(0,0,0,0.75)', padding: '4px 10px', borderRadius: '4px', fontSize: '0.78rem', fontWeight: 800, color: '#c59b27' }}>
              {t('Organic Sandalwood & Cedar Beard Care', 'Vajra & Dyllëra Natyralë me Dru Sandali')}
            </div>
          </div>

          <div style={{ height: '280px', position: 'relative', borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
            <Image
              src="https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&w=800&q=80"
              alt="Warm atmospheric barbershop station with industrial brass lighting and tools"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              style={{ objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', bottom: '14px', left: '14px', backgroundColor: 'rgba(0,0,0,0.75)', padding: '4px 10px', borderRadius: '4px', fontSize: '0.78rem', fontWeight: 800, color: '#c59b27' }}>
              {t('Private Leather Grooming Stations', 'Hapësira Individuale me Karrige Lëkure')}
            </div>
          </div>
        </div>
      </section>

      {/* Services & Rate List */}
      <section id="services" style={{ maxWidth: '1080px', margin: '0 auto 100px', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span style={{ color: '#c59b27', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 800 }}>
            {t('Master Craftsmen', 'Menyja e Shërbimeve')}
          </span>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 900, margin: '8px 0 16px', color: '#ffffff' }}>
            {t('Services & Grooming Rituals', 'Prerje, Mjekër & Kujdes')}
          </h2>
        </div>

        {/* Category Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '36px' }}>
          {[
            { id: 'all', en: 'All Services', sq: 'Të Gjitha' },
            { id: 'hair', en: 'Haircuts & Fades', sq: 'Prerje Flokësh' },
            { id: 'beard', en: 'Beard & Straight Razor', sq: 'Mjekër me Brisk' },
            { id: 'combo', en: 'Full Ritual Packages', sq: 'Paketa të Plota' },
            { id: 'treatment', en: 'Scalp & Steam', sq: 'Trajtime me Avull' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveCatalogTab(tab.id as typeof activeCatalogTab)}
              style={{
                backgroundColor: activeCatalogTab === tab.id ? '#c59b27' : '#1c1e24',
                color: activeCatalogTab === tab.id ? '#111215' : '#9ca3af',
                border: 'none',
                padding: '8px 18px',
                borderRadius: '4px',
                fontSize: '0.85rem',
                fontWeight: 800,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {t(tab.en, tab.sq)}
            </button>
          ))}
        </div>

        {/* Service Cards */}
        <div style={{ display: 'grid', gap: '16px' }}>
          {filteredServices.map((service) => (
            <div
              key={service.id}
              style={{
                backgroundColor: '#181a20',
                borderRadius: '6px',
                padding: '24px',
                border: '1px solid rgba(255,255,255,0.06)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '20px',
              }}
            >
              <div style={{ flex: 1, minWidth: '260px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>
                    {t(service.nameEn, service.nameSq)}
                  </h3>
                  <span style={{ fontSize: '0.75rem', backgroundColor: 'rgba(197, 155, 39, 0.15)', color: '#c59b27', padding: '3px 8px', borderRadius: '4px', fontWeight: 800 }}>
                    {service.duration}
                  </span>
                </div>
                <p style={{ margin: 0, color: '#9ca3af', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  {t(service.descEn, service.descSq)}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#c59b27' }}>
                  {service.price}
                </div>
                <button
                  type="button"
                  onClick={() => startBookingWithService(service)}
                  style={{
                    backgroundColor: '#c59b27',
                    color: '#111215',
                    border: 'none',
                    padding: '9px 18px',
                    borderRadius: '4px',
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                  }}
                >
                  {t('Book Chair', 'Rezervo')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" style={{ backgroundColor: '#0d0e11', padding: '80px 24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '840px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <span style={{ color: '#c59b27', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 800 }}>
              {t('Information', 'Informacion')}
            </span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 900, margin: '8px 0 0', color: '#ffffff' }}>
              {t('Frequently Asked Questions', 'Pyetjet më të Shpeshta')}
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              {
                qEn: 'Do I need an appointment or can I walk in?',
                qSq: 'A duhet të caktoj termin apo mund të vij pa rezervim?',
                aEn: 'We welcome walk-ins based on chair availability, but reserving online ensures priority zero-wait seating.',
                aSq: 'Jeni të mirëpritur edhe pa termin, por rezervimi online ju garanton ulje të menjëhershme pa pritje.',
              },
              {
                qEn: 'What grooming products do you use?',
                qSq: 'Çfarë produktesh përdorni për flokët dhe mjekrën?',
                aEn: 'We formulate our own 100% natural, alcohol-free beard oils, organic sandalwood lathers, and water-soluble clay pomades.',
                aSq: 'Përdorim ekskluzivisht vajra natyralë pa alkool, shkumë rroje me dru sandali dhe dyllëra organikë me bazë uji.',
              },
            ].map((faq, idx) => (
              <div key={idx} style={{ backgroundColor: '#181a20', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>
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
                    textAlign: 'left',
                    fontSize: '0.95rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    cursor: 'pointer',
                  }}
                >
                  <span>{t(faq.qEn, faq.qSq)}</span>
                  {openFaq === idx ? <ChevronUp size={18} color="#c59b27" /> : <ChevronDown size={18} color="#c59b27" />}
                </button>
                {openFaq === idx && (
                  <div style={{ padding: '0 20px 18px', color: '#9ca3af', fontSize: '0.88rem', lineHeight: 1.6 }}>
                    {t(faq.aEn, faq.aSq)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Hours */}
      <section id="location" style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
          <div style={{ backgroundColor: '#181a20', padding: '32px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <Clock color="#c59b27" size={20} />
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>{t('Barbershop Hours', 'Orari i Punës')}</h3>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem', color: '#9ca3af', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '6px' }}>
                <span>{t('Monday &ndash; Friday', 'E Hënë &ndash; E Premte')}</span>
                <strong style={{ color: '#ffffff' }}>09:00 &ndash; 21:00</strong>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '6px' }}>
                <span>{t('Saturday', 'E Shtunë')}</span>
                <strong style={{ color: '#ffffff' }}>09:00 &ndash; 20:00</strong>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between', color: '#666' }}>
                <span>{t('Sunday', 'E Diel')}</span>
                <span>{t('Closed', 'Mbyllur')}</span>
              </li>
            </ul>
          </div>

          <div style={{ backgroundColor: '#181a20', padding: '32px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <MapPin color="#c59b27" size={20} />
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>{t('Atelier Location', 'Vendndodhja')}</h3>
            </div>
            <p style={{ fontSize: '0.95rem', color: '#9ca3af', lineHeight: 1.6, margin: '0 0 16px' }}>
              {locationText}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffffff' }}>
                <Phone size={15} color="#c59b27" /> {phoneText}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffffff' }}>
                <ShieldCheck size={15} color="#c59b27" /> {t('Reserved Customer Parking', 'Parkim i Rezervuar për Klientët')}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '36px 24px', textAlign: 'center', fontSize: '0.85rem', color: '#6b7280', borderTop: '1px solid rgba(255,255,255,0.08)', backgroundColor: '#111215' }}>
        <p style={{ margin: 0 }}>
          &copy; {new Date().getFullYear()} Kallfa Classic Barber & Grooming Lounge. {t('All rights reserved.', 'Të gjitha të drejtat të rezervuara.')}
        </p>
      </footer>

      {/* Multi-Step Appointment Booking Wizard */}
      {isWizardOpen && (
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
            if (e.target === e.currentTarget) setIsWizardOpen(false);
          }}
        >
          <div style={{ backgroundColor: '#181a20', color: '#fff', maxWidth: '540px', width: '100%', borderRadius: '8px', padding: '28px', border: '1px solid #c59b27', boxShadow: '0 25px 60px rgba(0,0,0,0.5)' }}>
            {bookingDone ? (
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <div style={{ width: '56px', height: '56px', backgroundColor: 'rgba(34,197,94,0.15)', color: '#4ade80', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <Check size={32} />
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 900, margin: '0 0 8px', color: '#fff' }}>
                  {t('Barber Chair Reserved!', 'Takimi u Rezervua me Sukses!')}
                </h3>
                <p style={{ color: '#9ca3af', fontSize: '0.9rem', lineHeight: 1.6, margin: '0 0 20px' }}>
                  {t(
                    `Thank you, ${clientName || 'Sir'}! Your chair for ${t(selectedService.nameEn, selectedService.nameSq)} is reserved for ${bookingDate} at ${bookingTime}.`,
                    `Faleminderit, ${clientName || 'Zotëri'}! Karrigia juaj për ${t(selectedService.nameEn, selectedService.nameSq)} është rezervuar më datë ${bookingDate} në orën ${bookingTime}.`
                  )}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setBookingDone(false);
                    setIsWizardOpen(false);
                    setWizardStep(1);
                  }}
                  style={{ backgroundColor: '#c59b27', color: '#111215', padding: '10px 24px', borderRadius: '4px', border: 'none', fontWeight: 900, cursor: 'pointer' }}
                >
                  {t('Done', 'Mbyll')}
                </button>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#c59b27', textTransform: 'uppercase' }}>
                      {t(`Step ${wizardStep} of 3`, `Hapi ${wizardStep} nga 3`)}
                    </span>
                    <h3 style={{ margin: '2px 0 0', fontSize: '1.25rem', fontWeight: 900, color: '#ffffff' }}>
                      {wizardStep === 1 && t('Choose Service', 'Zgjidhni Shërbimin')}
                      {wizardStep === 2 && t('Select Date & Time', 'Zgjidhni Datën & Orën')}
                      {wizardStep === 3 && t('Contact Details', 'Të Dhënat Tuaja')}
                    </h3>
                  </div>
                  <button onClick={() => setIsWizardOpen(false)} style={{ background: 'none', border: 'none', fontSize: '1.3rem', cursor: 'pointer', color: '#888' }}>
                    &times;
                  </button>
                </div>

                {/* Step 1: Select Service */}
                {wizardStep === 1 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '340px', overflowY: 'auto' }}>
                    {serviceCatalog.map((s) => (
                      <div
                        key={s.id}
                        onClick={() => {
                          setSelectedService(s);
                          setWizardStep(2);
                        }}
                        style={{
                          border: `1px solid ${selectedService.id === s.id ? '#c59b27' : 'rgba(255,255,255,0.1)'}`,
                          backgroundColor: selectedService.id === s.id ? 'rgba(197, 155, 39, 0.15)' : '#111215',
                          padding: '12px 16px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <div>
                          <strong style={{ display: 'block', fontSize: '0.92rem', color: '#ffffff' }}>{t(s.nameEn, s.nameSq)}</strong>
                          <span style={{ fontSize: '0.78rem', color: '#9ca3af' }}>{s.duration}</span>
                        </div>
                        <span style={{ fontWeight: 900, color: '#c59b27', fontSize: '1.1rem' }}>{s.price}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Step 2: Date & Time */}
                {wizardStep === 2 && (
                  <div>
                    <div style={{ backgroundColor: '#111215', padding: '12px', borderRadius: '6px', marginBottom: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <small style={{ color: '#9ca3af' }}>{t('Selected Service:', 'Shërbimi i Zgjedhur:')}</small>
                      <div style={{ fontWeight: 800, color: '#ffffff' }}>{t(selectedService.nameEn, selectedService.nameSq)} ({selectedService.price})</div>
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px', color: '#cbd5e1' }}>{t('Select Date', 'Zgjidhni Datën')}</label>
                      <input
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', backgroundColor: '#111215', border: '1px solid #374151', color: '#fff' }}
                      />
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px', color: '#cbd5e1' }}>{t('Available Chair Slot', 'Oraret e Lira')}</label>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                        {['10:00', '11:00', '13:00', '14:30', '16:00', '17:30', '19:00'].map((timeSlot) => (
                          <button
                            key={timeSlot}
                            type="button"
                            onClick={() => setBookingTime(timeSlot)}
                            style={{
                              padding: '8px',
                              borderRadius: '4px',
                              border: `1px solid ${bookingTime === timeSlot ? '#c59b27' : '#374151'}`,
                              backgroundColor: bookingTime === timeSlot ? '#c59b27' : '#111215',
                              color: bookingTime === timeSlot ? '#111215' : '#ffffff',
                              fontWeight: 800,
                              fontSize: '0.82rem',
                              cursor: 'pointer',
                            }}
                          >
                            {timeSlot}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <button type="button" onClick={() => setWizardStep(1)} style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', fontWeight: 700 }}>
                        {t('← Back', '← Prapa')}
                      </button>
                      <button
                        type="button"
                        onClick={() => setWizardStep(3)}
                        style={{ backgroundColor: '#c59b27', color: '#111215', border: 'none', padding: '10px 20px', borderRadius: '4px', fontWeight: 900, cursor: 'pointer' }}
                      >
                        {t('Continue →', 'Vazhdo →')}
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Client Details */}
                {wizardStep === 3 && (
                  <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px', color: '#cbd5e1' }}>{t('Your Name', 'Emri & Mbiemri')}</label>
                      <input
                        type="text"
                        required
                        placeholder={sampleName}
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', backgroundColor: '#111215', border: '1px solid #374151', color: '#fff' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px', color: '#cbd5e1' }}>{t('Phone Number (WhatsApp)', 'Numri i Telefonit (WhatsApp)')}</label>
                      <input
                        type="tel"
                        required
                        placeholder={phoneText}
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', backgroundColor: '#111215', border: '1px solid #374151', color: '#fff' }}
                      />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
                      <button type="button" onClick={() => setWizardStep(2)} style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', fontWeight: 700 }}>
                        {t('← Back', '← Prapa')}
                      </button>
                      <button
                        type="submit"
                        style={{ backgroundColor: '#c59b27', color: '#111215', border: 'none', padding: '11px 24px', borderRadius: '4px', fontWeight: 900, cursor: 'pointer' }}
                      >
                        {t('Confirm Chair Booking', 'Konfirmo Rezervimin')}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function SalonPage() {
  return (
    <LanguageProvider>
      <BarberContent />
    </LanguageProvider>
  );
}
