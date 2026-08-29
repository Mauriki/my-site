'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { DemoTopBar } from '@/components/examples/DemoTopBar';
import { LanguageProvider, useLanguage } from '@/components/examples/LanguageContext';
import {
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
  category: 'hair' | 'face' | 'body' | 'nails';
  nameEn: string;
  nameSq: string;
  descEn: string;
  descSq: string;
  duration: string;
  price: string;
}

const serviceCatalog: ServiceItem[] = [
  {
    id: 'h1',
    category: 'hair',
    nameEn: 'Signature Botanical Scalp & Hair Therapy',
    nameSq: 'Trajtim Botanik i Kokës & Flokëve',
    descEn: 'Scalp detox wash, organic herbal conditioning mask, customized precision shaping and blowout.',
    descSq: 'Larje detoksikuese e kokës, maskë me barëra organike, prerje precize dhe stilim me shkëlqim.',
    duration: '60 min',
    price: '€38',
  },
  {
    id: 'h2',
    category: 'hair',
    nameEn: 'Glossing & Bond-Strengthening Ritual',
    nameSq: 'Trajtim Rigjenerues me Shkëlqim Gloss',
    descEn: 'Hand-painted glossing toner, bond-protecting olaplex seal, bespoke hydrating elixir.',
    descSq: 'Nuancim me tonues me shkëlqim, mbrojtje e thellë e fijeve të flokut, eliksir hidratues bimor.',
    duration: '90 min',
    price: '€65',
  },
  {
    id: 'f1',
    category: 'face',
    nameEn: 'Aura Radiance & Gua Sha Jade Facial',
    nameSq: 'Trajtim Fytyre me Shkëlqim & Masazh Gua Sha',
    descEn: 'Deep botanical enzyme peel, jade crystal lymphatic drainage, hyaluronic moisture infusion.',
    descSq: 'Pastrim i thellë me enzima bimore, drenazh limfatik me gur lodhi, infuzion me acid hialuronik.',
    duration: '75 min',
    price: '€65',
  },
  {
    id: 'f2',
    category: 'face',
    nameEn: 'Collagen Lift & Cellular Light Therapy',
    nameSq: 'Terapi Kolagjeni & Dritë Qelizore Rinovuese',
    descEn: 'Non-invasive microcurrent firming, collagen peptide serum, custom wavelength calming therapy.',
    descSq: 'Tonifikim joinvaziv me mikrorrymë, serum me peptide kolagjeni, terapi qetësuese qelizore.',
    duration: '60 min',
    price: '€75',
  },
  {
    id: 'b1',
    category: 'body',
    nameEn: 'Warm Basalt Stone & Cedar Massage',
    nameSq: 'Masazh me Gurë të Ngrohtë Vullkanikë & Dru Kedri',
    descEn: 'Smooth volcanic basalt stones heated to 52°C, organic cedarwood oil for profound muscle release.',
    descSq: 'Gurë vullkanikë të lëmuar të ngrohur në 52°C, vaj aromatik kedri për relaksim të thellë të muskujve.',
    duration: '90 min',
    price: '€70',
  },
  {
    id: 'n1',
    category: 'nails',
    nameEn: 'Luxury Japanese Mineral Manicure',
    nameSq: 'Manikyr Luksoz me Minerale Japoneze',
    descEn: 'Dry Russian cuticle care, botanical exfoliation scrub, non-toxic mineral glaze overlay.',
    descSq: 'Kujdes i hollësishëm i kutikulave, eksfoliim bimor, veshje me minerale pa toksina.',
    duration: '50 min',
    price: '€30',
  },
];

function SalonContent() {
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
  const [activeCatalogTab, setActiveCatalogTab] = useState<'all' | 'hair' | 'face' | 'body' | 'nails'>('all');

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

  const locationText = lang === 'sq' ? 'Lagjja Marigona, Rruga 4, Prishtinë' : '28 South Molton St, Mayfair, London W1K 5RE';
  const phoneText = lang === 'sq' ? '+383 44 700 800' : '+44 20 7946 0991';
  const sampleName = lang === 'sq' ? 'Zana Gashi' : 'Eleanor Vance';

  return (
    <div style={{ backgroundColor: '#f7f5f0', color: '#261f1c', minHeight: '100vh', fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif" }}>
      <DemoTopBar
        demoTitle={{ en: 'Salon & Botanical Spa Demo', sq: 'Shembull Faqeje: Sallon & Spa Botanike' }}
        industry={{ en: 'Aesthetic Skincare & Thermal Spa', sq: 'Estetikë & Kujdes Personal' }}
        badgeColor="#556b5a"
      />

      {/* Top Header */}
      <header style={{ borderBottom: '1px solid #e5ded2', backgroundColor: '#f7f5f0', position: 'sticky', top: '49px', zIndex: 30 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '0.14em', color: '#261f1c', textTransform: 'uppercase' }}>
              AURA
            </span>
            <span style={{ fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#556b5a', display: 'block', fontWeight: 700 }}>
              {t('BOTANICAL SANCTUARY', 'SANCTUAR BOTANIK')}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '32px', fontSize: '0.88rem', fontWeight: 600 }} className="hidden-mobile">
            <a href="#services" style={{ color: '#4a3f3a', textDecoration: 'none' }}>{t('Rituals', 'Ritualet')}</a>
            <a href="#experience" style={{ color: '#4a3f3a', textDecoration: 'none' }}>{t('Sanctuary', 'Ambienti')}</a>
            <a href="#faq" style={{ color: '#4a3f3a', textDecoration: 'none' }}>{t('FAQ', 'Pyetje')}</a>
            <a href="#location" style={{ color: '#4a3f3a', textDecoration: 'none' }}>{t('Contact', 'Kontakt')}</a>
          </div>

          <button
            type="button"
            onClick={() => {
              setWizardStep(1);
              setIsWizardOpen(true);
            }}
            style={{
              backgroundColor: '#261f1c',
              color: '#f7f5f0',
              border: 'none',
              padding: '10px 22px',
              borderRadius: '6px',
              fontSize: '0.82rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              cursor: 'pointer',
            }}
          >
            {t('Book Appointment', 'Cakto Takim')}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '72px 24px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#556b5a', backgroundColor: '#ebe5da', padding: '5px 14px', borderRadius: '4px', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 800, marginBottom: '20px' }}>
              <Sparkles size={14} />
              {t('Holistic Botanical Aesthetics & Thermal Stone Care', 'Kujdes Holistik me Barëra Botanike & Gurë Termikë')}
            </div>

            <h1 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', lineHeight: 1.12, fontWeight: 700, margin: '0 0 24px', letterSpacing: '-0.02em', color: '#261f1c', fontFamily: "'Playfair Display', Georgia, serif" }}>
              {t('Where refined aesthetics meet deep, restorative calm.', 'Aty ku estetika e rafinuar takon qetësinë e thellë.')}
            </h1>

            <p style={{ maxWidth: '580px', margin: '0 0 32px', fontSize: '1.05rem', lineHeight: 1.7, color: '#635650', fontWeight: 400 }}>
              {t(
                'Experience customized organic scalp therapies, botanical enzyme facials, and basalt stone therapies designed for profound restoration.',
                'Zbuloni trajtime organike të personalizuara për lëkurën dhe flokët, masazhe relaksuese me gurë vullkanikë dhe qetësi absolute.'
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
                  backgroundColor: '#556b5a',
                  color: '#ffffff',
                  border: 'none',
                  padding: '14px 32px',
                  borderRadius: '6px',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(85, 107, 90, 0.35)',
                }}
              >
                {t('Reserve Your Ritual', 'Rezervo Trajtimin')}
              </button>
              <a
                href="#services"
                style={{
                  backgroundColor: 'transparent',
                  color: '#261f1c',
                  border: '1px solid #c9c0b3',
                  padding: '14px 26px',
                  borderRadius: '6px',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                {t('View Ritual Menu', 'Shiko Menynë')}
              </a>
            </div>
          </div>

          {/* Hero Image (Strictly Object / Hot Stones / Spa Interior - ZERO People) */}
          <div style={{ position: 'relative', height: '420px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e0d8cc', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.08)' }}>
            <Image
              src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80"
              alt="Organic spa volcanic basalt stones, fresh bamboo and natural dropper oils on dark water reflection"
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              style={{ objectFit: 'cover' }}
              priority
            />
            <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px', backgroundColor: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', padding: '10px 16px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#261f1c' }}>
                {t('Thermal Basalt Suite & Organic Elixirs', 'Salla e Gurëve Termikë & Eliksirëve')}
              </span>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#556b5a' }}>
                {t('100% Certified Organic', '100% Organike')}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Sanctuary Interior & Objects Grid (Strictly Objects/Interior - ZERO People) */}
      <section id="experience" style={{ maxWidth: '1280px', margin: '0 auto 80px', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          <div style={{ height: '280px', position: 'relative', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e0d8cc' }}>
            <Image
              src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"
              alt="Clean organic cosmetic beauty bottles and ceramic display"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              style={{ objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', bottom: '14px', left: '14px', backgroundColor: 'rgba(255,255,255,0.92)', padding: '4px 10px', borderRadius: '4px', fontSize: '0.78rem', fontWeight: 800 }}>
              {t('Botanical Apothecary Dispensary', 'Koleksioni i Produkteve')}
            </div>
          </div>

          <div style={{ height: '280px', position: 'relative', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e0d8cc' }}>
            <Image
              src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80"
              alt="Natural clay face mask in stone bowl with wooden spatula and eucalyptus"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              style={{ objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', bottom: '14px', left: '14px', backgroundColor: 'rgba(255,255,255,0.92)', padding: '4px 10px', borderRadius: '4px', fontSize: '0.78rem', fontWeight: 800 }}>
              {t('Mineral Clay & Enzyme Preparations', 'Përgatitje me Argjilë Minerale')}
            </div>
          </div>

          <div style={{ height: '280px', position: 'relative', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e0d8cc' }}>
            <Image
              src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80"
              alt="Travertine stone vanity basin with rolled organic cotton linen towels"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              style={{ objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', bottom: '14px', left: '14px', backgroundColor: 'rgba(255,255,255,0.92)', padding: '4px 10px', borderRadius: '4px', fontSize: '0.78rem', fontWeight: 800 }}>
              {t('Private Treatment Suites', 'Dhomat Private të Kujdesit')}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Treatment Price List */}
      <section id="services" style={{ maxWidth: '1080px', margin: '0 auto 100px', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span style={{ color: '#556b5a', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 800 }}>
            {t('Curated Rituals', 'Menyja e Shërbimeve')}
          </span>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 700, margin: '8px 0 16px', color: '#261f1c', fontFamily: "'Playfair Display', Georgia, serif" }}>
            {t('Signature Botanical Treatments', 'Shërbimet Kryesore & Ritualet')}
          </h2>
        </div>

        {/* Category Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '36px' }}>
          {[
            { id: 'all', en: 'All Rituals', sq: 'Të Gjitha' },
            { id: 'hair', en: 'Hair Care & Gloss', sq: 'Kujdes për Flokët' },
            { id: 'face', en: 'Facial Aesthetics', sq: 'Trajtime Fytyre' },
            { id: 'body', en: 'Body & Thermal Stones', sq: 'Masazh me Gurë' },
            { id: 'nails', en: 'Nail Lounge', sq: 'Thonjtë & Manikyr' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveCatalogTab(tab.id as typeof activeCatalogTab)}
              style={{
                backgroundColor: activeCatalogTab === tab.id ? '#556b5a' : '#ebe5da',
                color: activeCatalogTab === tab.id ? '#ffffff' : '#4a3f3a',
                border: 'none',
                padding: '8px 18px',
                borderRadius: '6px',
                fontSize: '0.85rem',
                fontWeight: 700,
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
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                padding: '24px',
                border: '1px solid #e2dbcf',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
              }}
            >
              <div style={{ flex: 1, minWidth: '260px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: '#261f1c' }}>
                    {t(service.nameEn, service.nameSq)}
                  </h3>
                  <span style={{ fontSize: '0.75rem', backgroundColor: '#efebe3', color: '#556b5a', padding: '3px 8px', borderRadius: '4px', fontWeight: 700 }}>
                    {service.duration}
                  </span>
                </div>
                <p style={{ margin: 0, color: '#635650', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  {t(service.descEn, service.descSq)}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#261f1c' }}>
                  {service.price}
                </div>
                <button
                  type="button"
                  onClick={() => startBookingWithService(service)}
                  style={{
                    backgroundColor: '#261f1c',
                    color: '#ffffff',
                    border: 'none',
                    padding: '9px 18px',
                    borderRadius: '6px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  {t('Book Now', 'Rezervo')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" style={{ backgroundColor: '#ebe5da', padding: '80px 24px', borderTop: '1px solid #ded5c7' }}>
        <div style={{ maxWidth: '840px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <span style={{ color: '#556b5a', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 800 }}>
              {t('Information', 'Informacion')}
            </span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 700, margin: '8px 0 0', color: '#261f1c', fontFamily: "'Playfair Display', Georgia, serif" }}>
              {t('Frequently Asked Questions', 'Pyetjet më të Shpeshta')}
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              {
                qEn: 'What is your appointment cancellation policy?',
                qSq: 'Cila është politika e anulimit ose ndryshimit të orarit?',
                aEn: 'We kindly request at least 24 hours advance notice for cancellations or modifications.',
                aSq: 'Ju lutemi të na njoftoni të paktën 24 orë përpara për anulime apo ndryshime orari.',
              },
              {
                qEn: 'Are all products certified vegan and organic?',
                qSq: 'A janë produktet tuaja organike dhe të pastra?',
                aEn: 'Yes, all our haircare elixirs, skincare serums, and massage oils are certified vegan, organic, and ethically sourced from Europe.',
                aSq: 'Po, të gjitha vajrat e masazhit, serumet dhe trajtimet tona janë të certifikuara organike dhe vegane.',
              },
            ].map((faq, idx) => (
              <div key={idx} style={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #ded5c7', overflow: 'hidden' }}>
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
                    fontWeight: 700,
                    color: '#261f1c',
                    cursor: 'pointer',
                  }}
                >
                  <span>{t(faq.qEn, faq.qSq)}</span>
                  {openFaq === idx ? <ChevronUp size={18} color="#556b5a" /> : <ChevronDown size={18} color="#556b5a" />}
                </button>
                {openFaq === idx && (
                  <div style={{ padding: '0 20px 18px', color: '#635650', fontSize: '0.88rem', lineHeight: 1.6 }}>
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
          <div style={{ backgroundColor: '#ffffff', padding: '32px', borderRadius: '10px', border: '1px solid #e2dbcf' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <Clock color="#556b5a" size={20} />
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700 }}>{t('Sanctuary Hours', 'Orari i Punës')}</h3>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem', color: '#635650', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f2eee7', paddingBottom: '6px' }}>
                <span>{t('Monday &ndash; Friday', 'E Hënë &ndash; E Premte')}</span>
                <strong style={{ color: '#261f1c' }}>09:00 &ndash; 20:00</strong>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f2eee7', paddingBottom: '6px' }}>
                <span>{t('Saturday', 'E Shtunë')}</span>
                <strong style={{ color: '#261f1c' }}>10:00 &ndash; 18:00</strong>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between', color: '#888' }}>
                <span>{t('Sunday', 'E Diel')}</span>
                <span>{t('Closed (Private Rituals)', 'Mbyllur (Rituale Private)')}</span>
              </li>
            </ul>
          </div>

          <div style={{ backgroundColor: '#ffffff', padding: '32px', borderRadius: '10px', border: '1px solid #e2dbcf' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <MapPin color="#556b5a" size={20} />
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700 }}>{t('Studio Location', 'Vendndodhja')}</h3>
            </div>
            <p style={{ fontSize: '0.95rem', color: '#635650', lineHeight: 1.6, margin: '0 0 16px' }}>
              {locationText}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#261f1c' }}>
                <Phone size={15} color="#556b5a" /> {phoneText}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#261f1c' }}>
                <ShieldCheck size={15} color="#556b5a" /> {t('Private Valet & Covered Parking', 'Parkim i Sigurt')}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '36px 24px', textAlign: 'center', fontSize: '0.85rem', color: '#736b64', borderTop: '1px solid #e5ded2', backgroundColor: '#f7f5f0' }}>
        <p style={{ margin: 0 }}>
          &copy; {new Date().getFullYear()} Aura Botanical Sanctuary. {t('All rights reserved.', 'Të gjitha të drejtat të rezervuara.')}
        </p>
      </footer>

      {/* Multi-Step Appointment Booking Wizard */}
      {isWizardOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100000,
            backgroundColor: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsWizardOpen(false);
          }}
        >
          <div style={{ backgroundColor: '#ffffff', maxWidth: '540px', width: '100%', borderRadius: '12px', padding: '28px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            {bookingDone ? (
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <div style={{ width: '56px', height: '56px', backgroundColor: '#eef8f2', color: '#16a34a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <Check size={32} />
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 8px', color: '#261f1c' }}>
                  {t('Appointment Reserved!', 'Takimi u Rezervua me Sukses!')}
                </h3>
                <p style={{ color: '#635650', fontSize: '0.9rem', lineHeight: 1.6, margin: '0 0 20px' }}>
                  {t(
                    `Thank you, ${clientName || 'Valued Guest'}! We look forward to seeing you for ${t(selectedService.nameEn, selectedService.nameSq)} on ${bookingDate} at ${bookingTime}.`,
                    `Faleminderit, ${clientName || 'Mysafir'}! Ju mirëpresim për ${t(selectedService.nameEn, selectedService.nameSq)} më datë ${bookingDate} në orën ${bookingTime}.`
                  )}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setBookingDone(false);
                    setIsWizardOpen(false);
                    setWizardStep(1);
                  }}
                  style={{ backgroundColor: '#261f1c', color: '#fff', padding: '10px 24px', borderRadius: '6px', border: 'none', fontWeight: 700, cursor: 'pointer' }}
                >
                  {t('Done', 'Mbyll')}
                </button>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#556b5a', textTransform: 'uppercase' }}>
                      {t(`Step ${wizardStep} of 3`, `Hapi ${wizardStep} nga 3`)}
                    </span>
                    <h3 style={{ margin: '2px 0 0', fontSize: '1.25rem', fontWeight: 800, color: '#261f1c' }}>
                      {wizardStep === 1 && t('Choose Your Ritual', 'Zgjidhni Trajtimin')}
                      {wizardStep === 2 && t('Select Date & Time', 'Zgjidhni Datën & Orën')}
                      {wizardStep === 3 && t('Guest Information', 'Të Dhënat Tuaja')}
                    </h3>
                  </div>
                  <button onClick={() => setIsWizardOpen(false)} style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#888' }}>
                    &times;
                  </button>
                </div>

                {/* Step 1: Select Service */}
                {wizardStep === 1 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {serviceCatalog.map((s) => (
                      <div
                        key={s.id}
                        onClick={() => {
                          setSelectedService(s);
                          setWizardStep(2);
                        }}
                        style={{
                          border: `1px solid ${selectedService.id === s.id ? '#556b5a' : '#e5ded6'}`,
                          backgroundColor: selectedService.id === s.id ? '#f2eee7' : '#ffffff',
                          padding: '12px 16px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <div>
                          <strong style={{ display: 'block', fontSize: '0.92rem', color: '#261f1c' }}>{t(s.nameEn, s.nameSq)}</strong>
                          <span style={{ fontSize: '0.78rem', color: '#635650' }}>{s.duration}</span>
                        </div>
                        <span style={{ fontWeight: 800, color: '#556b5a' }}>{s.price}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Step 2: Date & Time */}
                {wizardStep === 2 && (
                  <div>
                    <div style={{ backgroundColor: '#f2eee7', padding: '12px', borderRadius: '8px', marginBottom: '16px', border: '1px solid #e0d8cc' }}>
                      <small style={{ color: '#635650' }}>{t('Selected Service:', 'Shërbimi i Zgjedhur:')}</small>
                      <div style={{ fontWeight: 800, color: '#261f1c' }}>{t(selectedService.nameEn, selectedService.nameSq)} ({selectedService.price})</div>
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px' }}>{t('Select Date', 'Zgjidhni Datën')}</label>
                      <input
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d4ccc2' }}
                      />
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px' }}>{t('Available Time Slot', 'Oraret e Lira')}</label>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                        {['10:00', '11:30', '14:00', '15:30', '17:00', '18:30'].map((timeSlot) => (
                          <button
                            key={timeSlot}
                            type="button"
                            onClick={() => setBookingTime(timeSlot)}
                            style={{
                              padding: '8px',
                              borderRadius: '6px',
                              border: `1px solid ${bookingTime === timeSlot ? '#556b5a' : '#d4ccc2'}`,
                              backgroundColor: bookingTime === timeSlot ? '#556b5a' : '#ffffff',
                              color: bookingTime === timeSlot ? '#ffffff' : '#261f1c',
                              fontWeight: 700,
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
                      <button type="button" onClick={() => setWizardStep(1)} style={{ background: 'none', border: 'none', color: '#635650', cursor: 'pointer', fontWeight: 600 }}>
                        {t('← Back', '← Prapa')}
                      </button>
                      <button
                        type="button"
                        onClick={() => setWizardStep(3)}
                        style={{ backgroundColor: '#261f1c', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 700, cursor: 'pointer' }}
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
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px' }}>{t('Full Name', 'Emri & Mbiemri')}</label>
                      <input
                        type="text"
                        required
                        placeholder={sampleName}
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d4ccc2' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px' }}>{t('Phone Number', 'Numri i Telefonit')}</label>
                      <input
                        type="tel"
                        required
                        placeholder={phoneText}
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d4ccc2' }}
                      />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
                      <button type="button" onClick={() => setWizardStep(2)} style={{ background: 'none', border: 'none', color: '#635650', cursor: 'pointer', fontWeight: 600 }}>
                        {t('← Back', '← Prapa')}
                      </button>
                      <button
                        type="submit"
                        style={{ backgroundColor: '#556b5a', color: '#fff', border: 'none', padding: '11px 24px', borderRadius: '6px', fontWeight: 700, cursor: 'pointer' }}
                      >
                        {t('Confirm Appointment', 'Konfirmo Takimin')}
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
      <SalonContent />
    </LanguageProvider>
  );
}
