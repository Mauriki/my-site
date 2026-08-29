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
  Flame,
  Leaf,
  Wheat,
} from 'lucide-react';

function RestaurantContent() {
  const { lang, t } = useLanguage();

  // Booking Modal State
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [guests, setGuests] = useState('2');
  const [date, setDate] = useState('2026-08-30');
  const [time, setTime] = useState('19:30');
  const [seatingArea, setSeatingArea] = useState('dining_room');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Menu Category Filter State
  const [activeMenuCat, setActiveMenuCat] = useState<'all' | 'starters' | 'mains' | 'desserts' | 'drinks'>('all');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'gf'>('all');

  // Interactive Tasting Menu Builder
  const [tastingStarter, setTastingStarter] = useState(0);
  const [tastingMain, setTastingMain] = useState(0);
  const [tastingDrink, setTastingDrink] = useState(0);

  const menuItems = [
    {
      id: 1,
      cat: 'starters',
      nameEn: 'Truffled Burrata & Charred Figs',
      nameSq: 'Burrata me Tartuf & Fiq të Pjekur',
      descEn: 'Aged balsamic reduction, toasted wild hazelnuts, warm olive sourdough crisp.',
      descSq: 'Reduktim balsamiku i vjetëruar, lajthi pylli të thekura, bukë fshati me vaj ulliri.',
      price: '€14.50',
      tag: 'Chef Favorite',
      veg: true,
      gf: false,
      img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 2,
      cat: 'starters',
      nameEn: 'Charred Mediterranean Seafood Carpaccio',
      nameSq: 'Karpacio Deti në Prush me Piper të Kuq',
      descEn: 'Smoked paprika emulsion, caper berries, pickled shallots, sea salt flakes.',
      descSq: 'Emulsion piperke të kuqe të tymosur, kaperi, qepë të marinuara, kripë deti.',
      price: '€17.00',
      tag: 'Hearth Grilled',
      veg: false,
      gf: true,
      img: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 3,
      cat: 'mains',
      nameEn: 'Handmade Tagliolini al Tartufo',
      nameSq: 'Tagliolini Artizanale me Tartuf të Zi',
      descEn: 'Fresh hand-rolled egg pasta, shaved black Istrian truffle, 36-month Parmigiano cream.',
      descSq: 'Pasta e freskët me vezë, tartuf i zi nga pylli, krem parmigiano 36-mujor.',
      price: '€22.00',
      tag: 'Signature',
      veg: true,
      gf: false,
      img: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 4,
      cat: 'mains',
      nameEn: 'Wood-Fired Dry-Aged Ribeye (350g)',
      nameSq: 'Biftek Ribeye i Pjekur në Zjarr Druri (350g)',
      descEn: 'Charcoal seared, rosemary infused butter, roasted baby root vegetables.',
      descSq: 'Pjekur në prush lisi, gjalpë me rozmarinë të egër, perime të pjekura stine.',
      price: '€34.00',
      tag: 'Premium Cut',
      veg: false,
      gf: true,
      img: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 5,
      cat: 'mains',
      nameEn: 'Wild Sea Bass & Saffron Herb Broth',
      nameSq: 'Levrek i Egër me Lëng Shafrani & Barëra',
      descEn: 'Pan-seared Mediterranean fillet, braised fennel bulbs, clams, cold-pressed dill oil.',
      descSq: 'Fileto levreku mesdhetar, marantë e zier me avull, lëng shafrani organik, vaj kopre.',
      price: '€26.50',
      tag: 'Fresh Catch',
      veg: false,
      gf: true,
      img: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 6,
      cat: 'desserts',
      nameEn: 'Valrhona Dark Chocolate Cremoso',
      nameSq: 'Krem Çokollate e Zezë Valrhona',
      descEn: '70% cocoa mousse, salted olive oil drizzle, cocoa nib tuile.',
      descSq: 'Muz çokollate 70%, vaj ulliri i virgjër me kripë deti, krokante kakaoje.',
      price: '€9.50',
      tag: 'Artisan Dolci',
      veg: true,
      gf: true,
      img: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 7,
      cat: 'drinks',
      nameEn: 'Smoked Pomegranate & Cardamom Spritz',
      nameSq: 'Pije e Freskët Shege e Tymosur & Kardamom',
      descEn: 'Fresh pressed wild pomegranate, toasted green cardamom syrup, crushed ice & sparkling mineral water.',
      descSq: 'Lëng shege i freskët, shurup kardamomi të gjelbër, akull i thërrmuar dhe ujë mineral me gaz.',
      price: '€6.50',
      tag: 'Botanical Craft',
      veg: true,
      gf: true,
      img: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 8,
      cat: 'drinks',
      nameEn: 'Wild Mountain Oregano & Honey Infusion',
      nameSq: 'Infuzion Çaj Mali me Mjaltë Pylli & Limon',
      descEn: 'Hand-picked Alpine herbal tea, raw wildflower honey, lemon thyme reduction.',
      descSq: 'Çaj mali i mbledhur me dorë në alpe, mjaltë natyral lulesh, trumzë dhe limon.',
      price: '€5.00',
      tag: 'Alpine Herbal',
      veg: true,
      gf: true,
      img: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const filteredMenu = menuItems.filter((item) => {
    if (activeMenuCat !== 'all' && item.cat !== activeMenuCat) return false;
    if (dietaryFilter === 'veg' && !item.veg) return false;
    if (dietaryFilter === 'gf' && !item.gf) return false;
    return true;
  });

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingConfirmed(true);
  };

  // Locale-specific address & phone details
  const locationText = lang === 'sq' ? 'Rruga Fehmi Agani, Nr. 28, Prishtinë' : '44 Charlotte Street, Fitzrovia, London W1T 2NR';
  const phoneText = lang === 'sq' ? '+383 38 240 500' : '+44 20 7946 0833';
  const sampleClientName = lang === 'sq' ? 'Arben Krasniqi' : 'Marcus Sterling';

  return (
    <div style={{ backgroundColor: '#111b15', color: '#f3f4f1', minHeight: '100vh', fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif" }}>
      <DemoTopBar
        demoTitle={{ en: 'Restaurant & Hearth Kitchen Demo', sq: 'Shembull Faqeje: Restorant & Kuzhinë Prushi' }}
        industry={{ en: 'Wood-Fired Dining & Botanical Drinks', sq: 'Gastronomi & Pije Botanike' }}
        badgeColor="#a67c52"
      />

      {/* Restaurant Header Nav */}
      <nav
        style={{
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '1280px',
          margin: '0 auto',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '4px', backgroundColor: 'rgba(166, 124, 82, 0.2)', color: '#c99f74', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Flame size={18} />
          </div>
          <div>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '0.04em', color: '#ffffff', display: 'block', lineHeight: 1 }}>
              LUMË
            </span>
            <span style={{ fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c99f74', fontWeight: 700 }}>
              {t('HEARTH & BOTANICALS', 'ZJARR & PRUSH')}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '32px', fontSize: '0.88rem', fontWeight: 600 }} className="hidden-mobile">
          <a href="#menu" style={{ color: '#d1cdc7', textDecoration: 'none', transition: 'color 0.2s' }}>
            {t('Hearth Menu', 'Menuja')}
          </a>
          <a href="#tasting" style={{ color: '#d1cdc7', textDecoration: 'none', transition: 'color 0.2s' }}>
            {t('Tasting Experience', 'Përvoja e Shijimit')}
          </a>
          <a href="#story" style={{ color: '#d1cdc7', textDecoration: 'none', transition: 'color 0.2s' }}>
            {t('Our Craft', 'Kuzhina Jonë')}
          </a>
          <a href="#hours" style={{ color: '#d1cdc7', textDecoration: 'none', transition: 'color 0.2s' }}>
            {t('Hours & Location', 'Orari & Vendndodhja')}
          </a>
        </div>

        <button
          type="button"
          onClick={() => setIsBookModalOpen(true)}
          style={{
            backgroundColor: '#a67c52',
            color: '#ffffff',
            border: 'none',
            padding: '10px 22px',
            borderRadius: '6px',
            fontSize: '0.85rem',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(166, 124, 82, 0.35)',
            transition: 'all 0.2s',
          }}
        >
          {t('Reserve a Table', 'Rezervo Tavolinë')}
        </button>
      </nav>

      {/* Hero Section (Wide Atmospheric Hearth) */}
      <header
        style={{
          position: 'relative',
          padding: '80px 24px 90px',
          maxWidth: '1280px',
          margin: '0 auto',
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'center' }}>
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(166, 124, 82, 0.18)',
                color: '#dfb78e',
                border: '1px solid rgba(166, 124, 82, 0.35)',
                padding: '6px 16px',
                borderRadius: '9999px',
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '24px',
              }}
            >
              <Flame size={14} color="#e58b3a" />
              {t('Wood-Fired Mediterranean Kitchen & Herbal Spritzes', 'Kuzhinë Mesdhetare mbi Prush & Pije Botanike')}
            </div>

            <h1
              style={{
                fontSize: 'clamp(2.4rem, 5vw, 4rem)',
                lineHeight: 1.1,
                fontWeight: 800,
                margin: '0 0 24px',
                letterSpacing: '-0.02em',
                color: '#ffffff',
                fontFamily: "'Playfair Display', Georgia, serif",
              }}
            >
              {t('Pure hearth flame. Wild alpine botanicals. Elevated craft.', 'Prush i pastër lisi. Barëra alpine. Pasion kulinar.')}
            </h1>

            <p
              style={{
                fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
                lineHeight: 1.7,
                color: '#b6c2b9',
                margin: '0 0 36px',
                maxWidth: '580px',
                fontWeight: 400,
              }}
            >
              {t(
                'Lumë celebrates the primal warmth of open-fire Mediterranean cooking, sustainable farm cuts, and an artisan non-alcoholic botanical beverage program.',
                'Lumë ngrihet mbi ngrohtësinë e gatimit mbi prush lisi, mishra të stazhionuar nga ferma lokale dhe pije speciale me barëra të egra mali.'
              )}
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setIsBookModalOpen(true)}
                style={{
                  backgroundColor: '#a67c52',
                  color: '#ffffff',
                  border: 'none',
                  padding: '14px 32px',
                  borderRadius: '6px',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 6px 20px rgba(166, 124, 82, 0.4)',
                }}
              >
                {t('Book an Evening', 'Rezervo një Mbrëmje')}
              </button>
              <a
                href="#menu"
                style={{
                  backgroundColor: 'transparent',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  padding: '14px 26px',
                  borderRadius: '6px',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                {t('View Seasonal Menu', 'Zbulo Menunë')}
              </a>
            </div>
          </div>

          {/* Atmospheric Imagery (Strictly Food & Interior Objects - Zero People) */}
          <div style={{ position: 'relative', height: '420px', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
            <Image
              src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80"
              alt="Artisanal wood-fired meat and roasted vegetable platter on dark slate"
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              style={{ objectFit: 'cover' }}
              priority
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(17,27,21,0.9) 0%, transparent 60%)' }} />
            <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#c99f74', fontWeight: 700, textTransform: 'uppercase' }}>
                  {t('Open Hearth Kitchen', 'Kuzhina me Prush')}
                </span>
                <div style={{ fontWeight: 800, fontSize: '1rem', color: '#fff' }}>
                  {t('Oak & Beechwood Charcoal Fire', 'Pjekje mbi Qymyr Druri Lisi')}
                </div>
              </div>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(6px)', padding: '6px 12px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                {t('100% Halal Certified', '100% E Certifikuar Halal')}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Interior & Ambiance Strip (Strictly Object/Interiors Only - NO People) */}
      <section style={{ maxWidth: '1280px', margin: '0 auto 80px', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          <div style={{ borderRadius: '8px', overflow: 'hidden', height: '260px', position: 'relative', border: '1px solid rgba(255,255,255,0.08)' }}>
            <Image
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
              alt="Warm candlelit rustic dining hall with oak tables and ambient pendant lighting"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              style={{ objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', bottom: '14px', left: '16px', fontSize: '0.85rem', fontWeight: 700, backgroundColor: 'rgba(0,0,0,0.6)', padding: '4px 10px', borderRadius: '4px' }}>
              {t('Main Hearth Dining Hall', 'Salla Kryesore e Ngrënies')}
            </div>
          </div>

          <div style={{ borderRadius: '8px', overflow: 'hidden', height: '260px', position: 'relative', border: '1px solid rgba(255,255,255,0.08)' }}>
            <Image
              src="https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80"
              alt="Cold-pressed botanical spritz with fresh herbs and ice"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              style={{ objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', bottom: '14px', left: '16px', fontSize: '0.85rem', fontWeight: 700, backgroundColor: 'rgba(0,0,0,0.6)', padding: '4px 10px', borderRadius: '4px' }}>
              {t('Artisanal Botanical Bar', 'Bari i Pijeve Botanike')}
            </div>
          </div>

          <div style={{ borderRadius: '8px', overflow: 'hidden', height: '260px', position: 'relative', border: '1px solid rgba(255,255,255,0.08)' }}>
            <Image
              src="https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80"
              alt="Freshly sliced charcoal grilled steak with rosemary and sea salt"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              style={{ objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', bottom: '14px', left: '16px', fontSize: '0.85rem', fontWeight: 700, backgroundColor: 'rgba(0,0,0,0.6)', padding: '4px 10px', borderRadius: '4px' }}>
              {t('Wood-Fired Aged Cuts', 'Mishra të Pjekur në Zjarr')}
            </div>
          </div>
        </div>
      </section>

      {/* Signature Visual Moment: Interactive Hearth Tasting Experience Builder */}
      <section id="tasting" style={{ backgroundColor: '#16231c', borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '72px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <span style={{ color: '#c99f74', fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              {t('Curated Culinary Journey', 'Përvojë e Personalizuar')}
            </span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '8px 0 10px', color: '#ffffff', fontFamily: "'Playfair Display', Georgia, serif" }}>
              {t('Interactive 3-Course Hearth Tasting Builder', 'Ndërtoni Menynë Tuaj të Shijimit')}
            </h2>
            <p style={{ color: '#aab8ad', maxWidth: '600px', margin: '0 auto', fontSize: '0.92rem' }}>
              {t('Select your starter, wood-fired main, and house-infused botanical pairing to preview your personalized table menu.', 'Zgjidhni pjatën e parë, pjatën kryesore dhe pijen tuaj bimore për të parë menynë e mbrëmjes.')}
            </p>
          </div>

          <div style={{ backgroundColor: '#1c2b23', borderRadius: '12px', padding: '32px', border: '1px solid rgba(166, 124, 82, 0.3)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '28px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#dfb78e', marginBottom: '8px' }}>
                  1. {t('Starter Selection', 'Pjata e Parë')}
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    { nameEn: 'Truffled Burrata & Figs', nameSq: 'Burrata me Tartuf & Fiq', price: '€14.50' },
                    { nameEn: 'Charred Seafood Carpaccio', nameSq: 'Karpacio Deti në Prush', price: '€17.00' },
                  ].map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setTastingStarter(idx)}
                      style={{
                        padding: '10px 14px',
                        borderRadius: '6px',
                        border: `1px solid ${tastingStarter === idx ? '#c99f74' : 'rgba(255,255,255,0.1)'}`,
                        backgroundColor: tastingStarter === idx ? 'rgba(166, 124, 82, 0.2)' : '#142118',
                        color: tastingStarter === idx ? '#fff' : '#b6c2b9',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        textAlign: 'left',
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span>{t(s.nameEn, s.nameSq)}</span>
                      <span style={{ color: '#c99f74' }}>{s.price}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#dfb78e', marginBottom: '8px' }}>
                  2. {t('Wood-Fired Main', 'Pjata Kryesore në Zjarr')}
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    { nameEn: 'Wood-Fired Dry-Aged Ribeye', nameSq: 'Biftek Ribeye në Prush', price: '€34.00' },
                    { nameEn: 'Wild Sea Bass & Saffron', nameSq: 'Levrek i Egër me Shafran', price: '€26.50' },
                    { nameEn: 'Handmade Tagliolini al Tartufo', nameSq: 'Tagliolini me Tartuf të Zi', price: '€22.00' },
                  ].map((m, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setTastingMain(idx)}
                      style={{
                        padding: '10px 14px',
                        borderRadius: '6px',
                        border: `1px solid ${tastingMain === idx ? '#c99f74' : 'rgba(255,255,255,0.1)'}`,
                        backgroundColor: tastingMain === idx ? 'rgba(166, 124, 82, 0.2)' : '#142118',
                        color: tastingMain === idx ? '#fff' : '#b6c2b9',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        textAlign: 'left',
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span>{t(m.nameEn, m.nameSq)}</span>
                      <span style={{ color: '#c99f74' }}>{m.price}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#dfb78e', marginBottom: '8px' }}>
                  3. {t('Botanical Spritz / Infusion', 'Pije Botanike')}
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    { nameEn: 'Smoked Pomegranate & Cardamom', nameSq: 'Shegë e Tymosur & Kardamom', price: '€6.50' },
                    { nameEn: 'Alpine Oregano & Wild Honey', nameSq: 'Çaj Mali Alpin & Mjaltë', price: '€5.00' },
                  ].map((d, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setTastingDrink(idx)}
                      style={{
                        padding: '10px 14px',
                        borderRadius: '6px',
                        border: `1px solid ${tastingDrink === idx ? '#c99f74' : 'rgba(255,255,255,0.1)'}`,
                        backgroundColor: tastingDrink === idx ? 'rgba(166, 124, 82, 0.2)' : '#142118',
                        color: tastingDrink === idx ? '#fff' : '#b6c2b9',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        textAlign: 'left',
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span>{t(d.nameEn, d.nameSq)}</span>
                      <span style={{ color: '#c99f74' }}>{d.price}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <span style={{ fontSize: '0.78rem', color: '#c99f74', fontWeight: 700, textTransform: 'uppercase' }}>
                  {t('Estimated Tasting Experience Value:', 'Totali i Përzgjedhur:')}
                </span>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff' }}>
                  €{(
                    (tastingStarter === 0 ? 14.5 : 17.0) +
                    (tastingMain === 0 ? 34.0 : tastingMain === 1 ? 26.5 : 22.0) +
                    (tastingDrink === 0 ? 6.5 : 5.0)
                  ).toFixed(2)}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsBookModalOpen(true)}
                style={{
                  backgroundColor: '#a67c52',
                  color: '#ffffff',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                }}
              >
                {t('Reserve This Tasting Experience', 'Rezervo Këtë Menu')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Menu Section */}
      <section id="menu" style={{ maxWidth: '1280px', margin: '0 auto 100px', padding: '80px 24px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span style={{ color: '#c99f74', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 800 }}>
            {t('Daily Hearth Offerings', 'Pjatat e Stinës')}
          </span>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 800, margin: '8px 0 16px', fontFamily: "'Playfair Display', Georgia, serif" }}>
            {t('The Seasonal Carte', 'Menuja e Plotë')}
          </h2>
          <p style={{ color: '#aab8ad', maxWidth: '600px', margin: '0 auto', fontSize: '0.95rem' }}>
            {t(
              'All meats, produce, and herbs are 100% halal and sourced from regenerative regional farms.',
              'Të gjithë përbërësit janë 100% hallall dhe sigurohen nga fermerë të besuar lokalë.'
            )}
          </p>
        </div>

        {/* Category & Dietary Filters */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '36px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px' }}>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {[
              { id: 'all', en: 'All Items', sq: 'Të Gjitha' },
              { id: 'starters', en: 'Small Plates', sq: 'Pjata të Para' },
              { id: 'mains', en: 'Wood-Fired Mains', sq: 'Kryesore në Zjarr' },
              { id: 'drinks', en: 'Botanical Drinks', sq: 'Pije Botanike' },
              { id: 'desserts', en: 'Dolci', sq: 'Ëmbëlsira' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveMenuCat(tab.id as typeof activeMenuCat)}
                style={{
                  backgroundColor: activeMenuCat === tab.id ? '#a67c52' : 'rgba(255,255,255,0.06)',
                  color: activeMenuCat === tab.id ? '#ffffff' : '#b6c2b9',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {t(tab.en, tab.sq)}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '0.8rem' }}>
            <span style={{ color: '#8a8378' }}>{t('Filter:', 'Filtro:')}</span>
            <button
              type="button"
              onClick={() => setDietaryFilter(dietaryFilter === 'veg' ? 'all' : 'veg')}
              style={{
                backgroundColor: dietaryFilter === 'veg' ? 'rgba(34, 197, 94, 0.2)' : 'transparent',
                color: dietaryFilter === 'veg' ? '#4ade80' : '#aab8ad',
                border: `1px solid ${dietaryFilter === 'veg' ? '#22c55e' : 'rgba(255,255,255,0.15)'}`,
                padding: '4px 10px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.75rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <Leaf size={12} />
              {t('Vegetarian', 'Vegjetariane')}
            </button>
            <button
              type="button"
              onClick={() => setDietaryFilter(dietaryFilter === 'gf' ? 'all' : 'gf')}
              style={{
                backgroundColor: dietaryFilter === 'gf' ? 'rgba(234, 179, 8, 0.2)' : 'transparent',
                color: dietaryFilter === 'gf' ? '#facc15' : '#aab8ad',
                border: `1px solid ${dietaryFilter === 'gf' ? '#eab308' : 'rgba(255,255,255,0.15)'}`,
                padding: '4px 10px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.75rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <Wheat size={12} />
              {t('Gluten-Free', 'Pa Gluten')}
            </button>
          </div>
        </div>

        {/* Menu Items Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
          {filteredMenu.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: '#16231c',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.06)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ height: '180px', position: 'relative', width: '100%' }}>
                <Image
                  src={item.img}
                  alt={item.nameEn}
                  fill
                  sizes="(max-width: 768px) 100vw, 360px"
                  style={{ objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'rgba(0,0,0,0.75)', color: '#dfb78e', fontSize: '0.72rem', fontWeight: 700, padding: '3px 8px', borderRadius: '4px' }}>
                  {item.tag}
                </div>
              </div>

              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0, color: '#ffffff' }}>
                      {t(item.nameEn, item.nameSq)}
                    </h3>
                    <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#dfb78e' }}>
                      {item.price}
                    </span>
                  </div>
                  <p style={{ color: '#aab8ad', fontSize: '0.875rem', lineHeight: 1.5, margin: 0 }}>
                    {t(item.descEn, item.descSq)}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginTop: '16px', fontSize: '0.72rem' }}>
                  {item.veg && (
                    <span style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#4ade80', padding: '2px 8px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <Leaf size={11} /> {t('Vegetarian', 'Vegjetariane')}
                    </span>
                  )}
                  {item.gf && (
                    <span style={{ backgroundColor: 'rgba(234, 179, 8, 0.1)', color: '#facc15', padding: '2px 8px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <Wheat size={11} /> {t('Gluten-Free', 'Pa Gluten')}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hours & Location Section */}
      <section id="hours" style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
          <div style={{ backgroundColor: '#16231c', padding: '32px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <Clock color="#c99f74" size={20} />
              <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 700 }}>{t('Opening Hours', 'Orari i Punës')}</h3>
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', padding: '4px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, marginBottom: '20px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22c55e' }} />
              {t('Open Today &bull; Tables Available', 'Hapur Sot &bull; Tavolina të Lira')}
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem', color: '#b6c2b9', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '6px' }}>
                <span>{t('Tuesday &ndash; Thursday', 'E Martë &ndash; E Enjte')}</span>
                <strong style={{ color: '#fff' }}>12:00 &ndash; 23:00</strong>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '6px' }}>
                <span>{t('Friday &ndash; Saturday', 'E Premte &ndash; E Shtunë')}</span>
                <strong style={{ color: '#fff' }}>12:00 &ndash; 24:00</strong>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '6px' }}>
                <span>{t('Sunday Family Hearth', 'E Diel Drekë Familjare')}</span>
                <strong style={{ color: '#fff' }}>12:00 &ndash; 22:00</strong>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between', color: '#7a8c80' }}>
                <span>{t('Monday', 'E Hënë')}</span>
                <span>{t('Closed (Private Caterings)', 'Mbyllur (Evente Private)')}</span>
              </li>
            </ul>
          </div>

          <div style={{ backgroundColor: '#16231c', padding: '32px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <MapPin color="#c99f74" size={20} />
              <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 700 }}>{t('Find Us & Valet', 'Vendndodhja & Parkimi')}</h3>
            </div>
            <p style={{ fontSize: '0.95rem', color: '#b6c2b9', lineHeight: 1.6, margin: '0 0 16px' }}>
              {locationText}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#d1cdc7' }}>
                <Phone size={15} color="#c99f74" /> {phoneText}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#d1cdc7' }}>
                <ShieldCheck size={15} color="#c99f74" /> {t('Complimentary Valet Parking Available', 'Parkim Falas me Valet')}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsBookModalOpen(true)}
              style={{
                marginTop: '24px',
                width: '100%',
                backgroundColor: '#a67c52',
                color: '#ffffff',
                border: 'none',
                padding: '12px',
                borderRadius: '6px',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
              }}
            >
              {t('Reserve Table Now', 'Rezervo Tavolinën Tani')}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '32px 24px', textAlign: 'center', fontSize: '0.85rem', color: '#7a8c80' }}>
        <p style={{ margin: 0 }}>
          &copy; {new Date().getFullYear()} Lumë Hearth & Smoke. {t('100% Halal & Non-Alcoholic Fine Hearth Dining.', 'Kuzhinë Mesdhetare mbi Zjarr.')}
        </p>
      </footer>

      {/* Interactive Reservation Modal */}
      {isBookModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100000,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsBookModalOpen(false);
          }}
        >
          <div
            style={{
              backgroundColor: '#16231c',
              color: '#f3f4f1',
              borderRadius: '12px',
              maxWidth: '520px',
              width: '100%',
              padding: '28px',
              border: '1px solid rgba(166, 124, 82, 0.4)',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6)',
            }}
          >
            {bookingConfirmed ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <Check size={32} />
                </div>
                <h3 style={{ fontSize: '1.4rem', margin: '0 0 10px', color: '#fff' }}>
                  {t('Reservation Confirmed!', 'Rezervimi u Konfirmua!')}
                </h3>
                <p style={{ color: '#aab8ad', fontSize: '0.9rem', lineHeight: 1.6, margin: '0 0 20px' }}>
                  {t(
                    `We look forward to welcoming you, ${guestName || 'Guest'}! A table for ${guests} guests has been reserved for ${date} at ${time}.`,
                    `Ju mirëpresim me kënaqësi, ${guestName || 'Mysafir'}! Një tavolinë për ${guests} persona është rezervuar për datën ${date} në orën ${time}.`
                  )}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setBookingConfirmed(false);
                    setIsBookModalOpen(false);
                  }}
                  style={{
                    backgroundColor: '#a67c52',
                    color: '#ffffff',
                    border: 'none',
                    padding: '10px 24px',
                    borderRadius: '6px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  {t('Close', 'Mbyll')}
                </button>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#c99f74', fontWeight: 700 }}>
                      {t('Instant Table Booking', 'Rezervim i Menjëhershëm')}
                    </span>
                    <h3 style={{ margin: '4px 0 0', fontSize: '1.3rem', color: '#fff' }}>
                      {t('Reserve Your Table at Lumë', 'Rezervoni Tavolinën tuaj te Lumë')}
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsBookModalOpen(false)}
                    style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: '1.2rem' }}
                  >
                    &times;
                  </button>
                </div>

                <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: '#aab8ad', marginBottom: '4px' }}>
                        {t('Number of Guests', 'Numri i Personave')}
                      </label>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        style={{ width: '100%', padding: '10px', backgroundColor: '#111b15', border: '1px solid #283e30', borderRadius: '6px', color: '#fff', fontSize: '0.9rem' }}
                      >
                        <option value="1">1 {t('Guest', 'Person')}</option>
                        <option value="2">2 {t('Guests', 'Persona')}</option>
                        <option value="3">3 {t('Guests', 'Persona')}</option>
                        <option value="4">4 {t('Guests', 'Persona')}</option>
                        <option value="5">5 {t('Guests', 'Persona')}</option>
                        <option value="6+">6+ {t('Guests (Group Table)', 'Persona (Tavolinë Grupi)')}</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: '#aab8ad', marginBottom: '4px' }}>
                        {t('Seating Area', 'Zona e Uljes')}
                      </label>
                      <select
                        value={seatingArea}
                        onChange={(e) => setSeatingArea(e.target.value)}
                        style={{ width: '100%', padding: '10px', backgroundColor: '#111b15', border: '1px solid #283e30', borderRadius: '6px', color: '#fff', fontSize: '0.9rem' }}
                      >
                        <option value="dining_room">{t('Main Hearth Hall', 'Salla Kryesore')}</option>
                        <option value="candle_vault">{t('Candlelit Stone Vault', 'Qilari me Qirinj')}</option>
                        <option value="terrace">{t('Garden Terrace (Heated)', 'Teraca me Ngrohje')}</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: '#aab8ad', marginBottom: '4px' }}>
                        {t('Date', 'Data')}
                      </label>
                      <input
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        style={{ width: '100%', padding: '10px', backgroundColor: '#111b15', border: '1px solid #283e30', borderRadius: '6px', color: '#fff', fontSize: '0.9rem' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: '#aab8ad', marginBottom: '4px' }}>
                        {t('Time', 'Ora')}
                      </label>
                      <select
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        style={{ width: '100%', padding: '10px', backgroundColor: '#111b15', border: '1px solid #283e30', borderRadius: '6px', color: '#fff', fontSize: '0.9rem' }}
                      >
                        <option value="18:00">18:00</option>
                        <option value="18:30">18:30</option>
                        <option value="19:00">19:00</option>
                        <option value="19:30">19:30</option>
                        <option value="20:00">20:00</option>
                        <option value="20:30">20:30</option>
                        <option value="21:00">21:00</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#aab8ad', marginBottom: '4px' }}>
                      {t('Your Name', 'Emri Juaj')}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={sampleClientName}
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      style={{ width: '100%', padding: '10px', backgroundColor: '#111b15', border: '1px solid #283e30', borderRadius: '6px', color: '#fff', fontSize: '0.9rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#aab8ad', marginBottom: '4px' }}>
                      {t('Phone Number (for SMS confirmation)', 'Numri i Telefonit (për konfirmim SMS)')}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder={phoneText}
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      style={{ width: '100%', padding: '10px', backgroundColor: '#111b15', border: '1px solid #283e30', borderRadius: '6px', color: '#fff', fontSize: '0.9rem' }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      marginTop: '8px',
                      backgroundColor: '#a67c52',
                      color: '#ffffff',
                      border: 'none',
                      padding: '12px',
                      borderRadius: '6px',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                    }}
                  >
                    {t('Confirm Table Booking', 'Konfirmo Rezervimin e Tavolinës')}
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

export default function RestaurantPage() {
  return (
    <LanguageProvider>
      <RestaurantContent />
    </LanguageProvider>
  );
}
