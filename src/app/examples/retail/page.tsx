'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { DemoTopBar } from '@/components/examples/DemoTopBar';
import { LanguageProvider, useLanguage } from '@/components/examples/LanguageContext';
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Check,
  X,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Coffee,
  Package,
  Eye,
} from 'lucide-react';

interface Product {
  id: number;
  cat: 'beans' | 'gear' | 'ceramics';
  nameEn: string;
  nameSq: string;
  subEn: string;
  subSq: string;
  price: number;
  notesEn: string;
  notesSq: string;
  altitude?: string;
  process?: string;
  img: string;
  isNew?: boolean;
}

const products: Product[] = [
  {
    id: 1,
    cat: 'beans',
    nameEn: 'Guji Highlands &bull; Heirloom Lot',
    nameSq: 'Guji Highlands &bull; Kafe Speciale Etiopi',
    subEn: 'Single Origin Ethiopia / Light-Medium Roast',
    subSq: 'Origjinë e Vetme Etiopi / Pjekje e Lehtë',
    price: 16.5,
    notesEn: 'Jasmine blossom, sweet bergamot, candied peach, clean tea-like finish.',
    notesSq: 'Lule jasemini, bergamot i ëmbël, pjeshkë, aromë e pastër frutore.',
    altitude: '2,100m MASL',
    process: 'Washed / Anaerobic',
    img: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80',
    isNew: true,
  },
  {
    id: 2,
    cat: 'beans',
    nameEn: 'Huila Supremo &bull; Pink Bourbon',
    nameSq: 'Huila Supremo &bull; Bourbon Kolumbian',
    subEn: 'Single Origin Colombia / Medium Roast',
    subSq: 'Origjinë e Vetme Kolumbi / Pjekje Mesatare',
    price: 15.0,
    notesEn: 'Toasted almond, milk chocolate praline, red apple acidity.',
    notesSq: 'Bajame e thekur, çokollatë me qumësht, freski molle të kuqe.',
    altitude: '1,750m MASL',
    process: 'Fully Washed',
    img: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    cat: 'beans',
    nameEn: 'Nordik Midnight &bull; Espresso Roast',
    nameSq: 'Nordik Midnight &bull; Përzierje Ekskluzive Ekspres',
    subEn: 'Dark Chocolate & Hazelnut / Espresso Roast',
    subSq: 'Çokollatë e Zezë & Lajthi / Pjekje për Ekspres',
    price: 14.0,
    notesEn: 'Velvety crema, deep dark cocoa, brown sugar sweetness.',
    notesSq: 'Kremë e dendur, kakao e zezë, ëmbëlsi sheqeri kaf.',
    altitude: 'Multi-region',
    process: 'Natural + Washed',
    img: 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?auto=format&fit=crop&w=800&q=80',
    isNew: true,
  },
  {
    id: 4,
    cat: 'gear',
    nameEn: 'Precision Matte Ceramic Pour-Over Dripper',
    nameSq: 'Dripper Qeramik me Mat Preciz',
    subEn: 'Hand-cast heat retention cone / 1-4 cups',
    subSq: 'Qeramikë termike e punuar me dorë / 1-4 filxhanë',
    price: 34.0,
    notesEn: 'Optimal 60-degree flow ridges for uniform extraction and clarity.',
    notesSq: 'Dizajn optimal 60-gradësh për ekstraktim të njëtrajtshëm.',
    img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 5,
    cat: 'gear',
    nameEn: 'Stepless Hand Burr Grinder Pro',
    nameSq: 'Mulli Manual Profesional me Thika Çeliku',
    subEn: '48mm Titanium-coated steel burrs',
    subSq: 'Thika çeliku 48mm me shtresë titani',
    price: 78.0,
    notesEn: 'Ultra-consistent micron adjustments from Turkish fine to French press.',
    notesSq: 'Rregullim mikrometrik i bluarjes për çdo lloj përgatitjeje.',
    img: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 6,
    cat: 'ceramics',
    nameEn: 'Sandstone Nordic Mug (280ml)',
    nameSq: 'Filxhan Nordik nga Gurraniku (280ml)',
    subEn: 'Hand-thrown stoneware / Matte glazed',
    subSq: 'Punuar në rrotë qeramike / Lustër mat',
    price: 22.0,
    notesEn: 'Ergonomic tactile thumb rest, microwave & dishwasher safe.',
    notesSq: 'Kapje ergonomike, rezistent ndaj mikrovalës dhe larjes.',
    img: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=800&q=80',
  },
];

interface CartItem {
  product: Product;
  quantity: number;
}

function RetailContent() {
  const { lang, t } = useLanguage();

  const [activeCategory, setActiveCategory] = useState<'all' | 'beans' | 'gear' | 'ceramics'>('all');
  const [cart, setCart] = useState<CartItem[]>([
    { product: products[0], quantity: 1 },
    { product: products[3], quantity: 1 },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Promo Code State
  const [promoInput, setPromoInput] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMsg, setPromoMsg] = useState('');

  // Checkout Modal State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  // Subscription interactive builder
  const [subFreq, setSubFreq] = useState('2');
  const [subBagCount, setSubBagCount] = useState('2');
  const [subGrind, setSubGrind] = useState('whole_bean');

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeItem = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const rawSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = (rawSubtotal * discountPercent) / 100;
  const subtotal = Math.max(0, rawSubtotal - discountAmount);
  const freeShippingThreshold = 45;
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoInput.trim().toUpperCase() === 'LOCAL10') {
      setDiscountPercent(10);
      setPromoMsg(t('Promo LOCAL10 applied: 10% OFF!', 'Kodi LOCAL10 u aplikua: 10% Zbritje!'));
    } else {
      setPromoMsg(t('Invalid code. Try "LOCAL10"', 'Kod i pavlefshëm. Provoni "LOCAL10"'));
    }
  };

  const filteredProducts = products.filter((p) => {
    if (activeCategory === 'all') return true;
    return p.cat === activeCategory;
  });

  const currencySymbol = '€';
  const deliveryBannerText = lang === 'sq'
    ? 'Dërgesë e shpejtë në të gjithë Kosovën falas mbi €45 · Pjekje e freskët çdo javë'
    : 'Express UK & EU delivery free over €45 · Roasted fresh weekly in small batches';

  return (
    <div style={{ backgroundColor: '#f2eee7', color: '#121314', minHeight: '100vh', fontFamily: "'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif" }}>
      <DemoTopBar
        demoTitle={{ en: 'Specialty Retail & Coffee Lab Demo', sq: 'Shembull Faqeje: Dyqan & Kafe Speciale' }}
        industry={{ en: 'E-Commerce & Specialty Goods', sq: 'Dyqan Online & Produkte Artizanale' }}
        badgeColor="#1d4ed8"
      />

      {/* Clean Announcement Strip */}
      <div style={{ backgroundColor: '#121314', color: '#ffffff', textAlign: 'center', padding: '8px 16px', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.04em' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <Truck size={14} color="#60a5fa" />
          <span>{deliveryBannerText}</span>
        </div>
      </div>

      {/* Main Store Header */}
      <header
        style={{
          borderBottom: '1px solid #ddd7cb',
          backgroundColor: '#ffffff',
          position: 'sticky',
          top: '49px',
          zIndex: 40,
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '30px', height: '30px', backgroundColor: '#121314', color: '#fff', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Coffee size={17} />
            </div>
            <div>
              <span style={{ fontSize: '1.25rem', fontWeight: 900, letterSpacing: '-0.03em', color: '#121314', display: 'block', lineHeight: 1 }}>
                NORDIK
              </span>
              <span style={{ fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1d4ed8', fontWeight: 800 }}>
                COFFEE LAB & GOODS
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '28px', fontSize: '0.88rem', fontWeight: 700 }} className="hidden-mobile">
            <a href="#shop" style={{ color: '#333', textDecoration: 'none' }}>{t('Specialty Beans', 'Kafe e Pjekur')}</a>
            <a href="#shop" style={{ color: '#333', textDecoration: 'none' }}>{t('Brew Gear', 'Pajisje')}</a>
            <a href="#subscription" style={{ color: '#333', textDecoration: 'none' }}>{t('Subscription', 'Abonim Kafeje')}</a>
            <a href="#roastery" style={{ color: '#333', textDecoration: 'none' }}>{t('Our Lab', 'Laboratori')}</a>
          </div>

          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#121314',
              color: '#ffffff',
              border: 'none',
              padding: '9px 16px',
              borderRadius: '6px',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
            }}
          >
            <ShoppingBag size={16} />
            <span>{t('Cart', 'Shporta')}</span>
            <span style={{ backgroundColor: '#1d4ed8', color: '#fff', padding: '1px 7px', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 800 }}>
              {totalItemCount}
            </span>
          </button>
        </div>
      </header>

      {/* Hero Section (Swiss Brutalist Asymmetry) */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '56px 24px 72px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '44px', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-block', backgroundColor: '#e2dcce', color: '#1d4ed8', padding: '4px 12px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
              {t('Direct Trade Micro-Lots', 'Mikro-Lote me Tregti Direkte')}
            </div>
            <h1 style={{ fontSize: 'clamp(2.2rem, 4.2vw, 3.6rem)', fontWeight: 900, lineHeight: 1.08, letterSpacing: '-0.03em', margin: '0 0 20px', color: '#121314' }}>
              {t('Specialty coffee and minimalist gear, roasted with precision.', 'Kafe speciale dhe pajisje minimaliste, pjekur me saktësi shkencore.')}
            </h1>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.65, color: '#4a4843', margin: '0 0 28px' }}>
              {t(
                'Directly imported from high-altitude regenerative farms. Small weekly roast batches for supreme clarity and vibrant terroir expression.',
                'Bashkëpunim direkt me ferma në lartësi mbi 1,800m për të garantuar kokrra me profil unik aromatik dhe freski absolute.'
              )}
            </p>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <a
                href="#shop"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#121314',
                  color: '#ffffff',
                  padding: '13px 26px',
                  borderRadius: '6px',
                  fontWeight: 800,
                  fontSize: '0.92rem',
                  textDecoration: 'none',
                }}
              >
                <span>{t('Browse Catalog', 'Eksploro Katalogun')}</span>
                <ArrowRight size={16} />
              </a>
              <a
                href="#subscription"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#ffffff',
                  color: '#121314',
                  border: '1px solid #d2cbbe',
                  padding: '13px 22px',
                  borderRadius: '6px',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  textDecoration: 'none',
                }}
              >
                {t('Coffee Subscription (-15%)', 'Abonim Kafeje (-15%)')}
              </a>
            </div>
          </div>

          <div style={{ position: 'relative', height: '420px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #ddd7cb', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.12)' }}>
            <Image
              src="https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=1000&q=80"
              alt="Fresh roasted specialty whole bean coffee on clean oak cupping table"
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              style={{ objectFit: 'cover' }}
              priority
            />
            <div style={{ position: 'absolute', bottom: '16px', right: '16px', backgroundColor: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)', padding: '10px 16px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
              <Sparkles size={16} color="#1d4ed8" />
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#121314' }}>
                {t('Roast Profile: Light Nordic Filter & Espresso', 'Profili: Pjekje e Lehtë Nordike')}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Value Banner (Wide Band) */}
      <section style={{ borderTop: '1px solid #ddd7cb', borderBottom: '1px solid #ddd7cb', backgroundColor: '#ffffff', padding: '28px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ backgroundColor: '#eff6ff', padding: '10px', borderRadius: '8px', color: '#1d4ed8' }}>
              <Truck size={22} />
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '0.9rem', color: '#121314' }}>{t('Fast Local Delivery', 'Dërgesë e Shpejtë')}</strong>
              <small style={{ color: '#6b665f' }}>{t('Free shipping over €45', 'Falas për porosi mbi €45')}</small>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ backgroundColor: '#eff6ff', padding: '10px', borderRadius: '8px', color: '#1d4ed8' }}>
              <Package size={22} />
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '0.9rem', color: '#121314' }}>{t('Nitrogen-Flushed Bags', 'Paketim me Valvul Degazimi')}</strong>
              <small style={{ color: '#6b665f' }}>{t('Locks in aroma up to 90 days', 'Ruan aromën për 90 ditë')}</small>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ backgroundColor: '#eff6ff', padding: '10px', borderRadius: '8px', color: '#1d4ed8' }}>
              <ShieldCheck size={22} />
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '0.9rem', color: '#121314' }}>{t('100% Direct Trade', 'Tregti Direkte me Fermerët')}</strong>
              <small style={{ color: '#6b665f' }}>{t('Fair prices paid to growers', 'Çmime të drejta për prodhuesit')}</small>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ backgroundColor: '#eff6ff', padding: '10px', borderRadius: '8px', color: '#1d4ed8' }}>
              <RotateCcw size={22} />
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '0.9rem', color: '#121314' }}>{t('Freshness Guarantee', 'Garanci e Freskisë')}</strong>
              <small style={{ color: '#6b665f' }}>{t('Roasted within 7 days of order', 'Pjekur brenda javës së porosisë')}</small>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Product Grid */}
      <section id="shop" style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '36px' }}>
          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#1d4ed8', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {t('Specialty Catalog', 'Katalogu i Përzgjedhur')}
            </span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 900, margin: '6px 0 0', letterSpacing: '-0.02em', color: '#121314' }}>
              {t('Single Origins, Blends & Precision Gear', 'Kokrra Kafeje & Pajisje Përgatitjeje')}
            </h2>
          </div>

          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', backgroundColor: '#e2dcce', padding: '4px', borderRadius: '8px' }}>
            {[
              { id: 'all', en: 'All Items (6)', sq: 'Të Gjitha (6)' },
              { id: 'beans', en: 'Whole Beans', sq: 'Kokrra Kafeje' },
              { id: 'gear', en: 'Brew Gear', sq: 'Pajisje' },
              { id: 'ceramics', en: 'Ceramics', sq: 'Qeramikë' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id as typeof activeCategory)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  backgroundColor: activeCategory === tab.id ? '#ffffff' : 'transparent',
                  color: activeCategory === tab.id ? '#121314' : '#6b665f',
                  boxShadow: activeCategory === tab.id ? '0 2px 5px rgba(0,0,0,0.06)' : 'none',
                  transition: 'all 0.2s',
                }}
              >
                {t(tab.en, tab.sq)}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '28px' }}>
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                border: '1px solid #ddd7cb',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
              }}
            >
              <div style={{ height: '240px', position: 'relative', width: '100%', backgroundColor: '#e9e4d9' }}>
                <Image
                  src={p.img}
                  alt={p.nameEn}
                  fill
                  sizes="(max-width: 768px) 100vw, 380px"
                  style={{ objectFit: 'cover' }}
                />
                {p.isNew && (
                  <span style={{ position: 'absolute', top: '12px', left: '12px', backgroundColor: '#1d4ed8', color: '#fff', fontSize: '0.72rem', fontWeight: 800, padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                    {t('New Lot', 'Mikro-Lot i Ri')}
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => setQuickViewProduct(p)}
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    backgroundColor: 'rgba(255,255,255,0.95)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '34px',
                    height: '34px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#121314',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                  }}
                  title={t('Quick View', 'Shiko Detajet')}
                >
                  <Eye size={16} />
                </button>
              </div>

              <div style={{ padding: '22px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <small style={{ color: '#7a746a', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {t(p.subEn, p.subSq)}
                  </small>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '4px 0 10px', color: '#121314' }}>
                    {t(p.nameEn, p.nameSq)}
                  </h3>
                  <p style={{ color: '#5e5a53', fontSize: '0.85rem', lineHeight: 1.5, margin: '0 0 16px' }}>
                    {t(p.notesEn, p.notesSq)}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid #f0eee8' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#121314' }}>
                    {currencySymbol}{p.price.toFixed(2)}
                  </span>
                  <button
                    type="button"
                    onClick={() => addToCart(p)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      backgroundColor: '#121314',
                      color: '#ffffff',
                      border: 'none',
                      padding: '9px 16px',
                      borderRadius: '6px',
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                    }}
                  >
                    <Plus size={15} />
                    <span>{t('Add to Cart', 'Shto në Shportë')}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Subscription Builder */}
      <section id="subscription" style={{ backgroundColor: '#121314', color: '#f5f7f5', padding: '80px 24px' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span style={{ color: '#60a5fa', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              {t('Never Run Out of Fresh Roast', 'Kafe e Freskët Çdo Javë')}
            </span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 900, margin: '8px 0 14px', letterSpacing: '-0.02em', color: '#ffffff' }}>
              {t('Custom Roastery Subscription', 'Përshtat Abonimin tënd të Kafes')}
            </h2>
            <p style={{ color: '#9ca3af', maxWidth: '560px', margin: '0 auto', fontSize: '0.95rem' }}>
              {t('Enjoy 15% off every bag, free priority shipping, and full control to pause or cancel anytime.', 'Përfitoni 15% zbritje në çdo pako, dërgesë prioritare falas dhe mundësi ndalimi në çdo moment.')}
            </p>
          </div>

          <div style={{ backgroundColor: '#1e2022', borderRadius: '12px', padding: '36px', border: '1px solid #33383f', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '32px' }}>
              {/* Bag Count */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: '#e0e7e1', marginBottom: '10px' }}>
                  1. {t('Bags per Delivery', 'Numri i Pakove për Dërgesë')}
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                  {['1', '2', '3'].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setSubBagCount(num)}
                      style={{
                        padding: '10px',
                        borderRadius: '6px',
                        border: `1px solid ${subBagCount === num ? '#60a5fa' : '#33383f'}`,
                        backgroundColor: subBagCount === num ? '#1d4ed8' : '#121314',
                        color: '#fff',
                        fontWeight: 800,
                        cursor: 'pointer',
                      }}
                    >
                      {num} {t('Bag', 'Pako')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Frequency */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: '#e0e7e1', marginBottom: '10px' }}>
                  2. {t('Delivery Frequency', 'Frekuenca e Dërgesës')}
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {[
                    { val: '2', en: 'Every 2 Weeks', sq: 'Çdo 2 Javë' },
                    { val: '4', en: 'Every 4 Weeks', sq: 'Çdo 4 Javë' },
                  ].map((f) => (
                    <button
                      key={f.val}
                      type="button"
                      onClick={() => setSubFreq(f.val)}
                      style={{
                        padding: '10px',
                        borderRadius: '6px',
                        border: `1px solid ${subFreq === f.val ? '#60a5fa' : '#33383f'}`,
                        backgroundColor: subFreq === f.val ? '#1d4ed8' : '#121314',
                        color: '#fff',
                        fontWeight: 800,
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                      }}
                    >
                      {t(f.en, f.sq)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grind Profile */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: '#e0e7e1', marginBottom: '10px' }}>
                  3. {t('Grind Profile', 'Mënyra e Bluarjes')}
                </label>
                <select
                  value={subGrind}
                  onChange={(e) => setSubGrind(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '11px',
                    borderRadius: '6px',
                    backgroundColor: '#121314',
                    border: '1px solid #33383f',
                    color: '#ffffff',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                  }}
                >
                  <option value="whole_bean">{t('Whole Bean (Recommended)', 'Kokërr e Paprekur (Rekomandohet)')}</option>
                  <option value="espresso">{t('Fine / Espresso', 'E Imët / Për Ekspres')}</option>
                  <option value="filter">{t('Medium / V60 & Filter', 'Mesatare / Për Filtër')}</option>
                  <option value="french_press">{t('Coarse / French Press', 'E Trashë / Për French Press')}</option>
                </select>
              </div>
            </div>

            {/* Calculated Plan Summary */}
            <div style={{ borderTop: '1px solid #33383f', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>{t('Estimated Subscription Cost:', 'Kosto e Pllogaritur:')}</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#ffffff' }}>
                  {currencySymbol}{(parseInt(subBagCount, 10) * 16.5 * 0.85).toFixed(2)}{' '}
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#60a5fa' }}>
                    / {t(`every ${subFreq} weeks`, `çdo ${subFreq} javë`)}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  addToCart(products[0]);
                }}
                style={{
                  backgroundColor: '#1d4ed8',
                  color: '#ffffff',
                  border: 'none',
                  padding: '12px 28px',
                  borderRadius: '6px',
                  fontWeight: 800,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                }}
              >
                {t('Start Coffee Subscription', 'Fillo Abonimin Tani')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #ddd7cb', padding: '36px 24px', textAlign: 'center', fontSize: '0.85rem', color: '#6b665f', backgroundColor: '#ffffff' }}>
        <p style={{ margin: 0 }}>
          &copy; {new Date().getFullYear()} Nordik Coffee Lab & Goods. {t('Specialty Coffee Roasters.', 'Punishte e Kafes Speciale.')}
        </p>
      </footer>

      {/* Sliding Cart Drawer */}
      {isCartOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100000,
            backgroundColor: 'rgba(0,0,0,0.65)',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsCartOpen(false);
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              width: '100%',
              maxWidth: '440px',
              height: '100%',
              boxShadow: '-10px 0 30px rgba(0,0,0,0.2)',
              display: 'flex',
              flexDirection: 'column',
              padding: '24px',
              overflowY: 'auto',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid #e7e5e0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShoppingBag size={18} />
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 900 }}>
                  {t('Your Cart', 'Shporta Juaj')} ({totalItemCount})
                </h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#666' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Free shipping meter */}
            <div style={{ margin: '16px 0', backgroundColor: '#f2eee7', padding: '12px', borderRadius: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 700, marginBottom: '6px' }}>
                <span>
                  {subtotal >= freeShippingThreshold
                    ? t('Free Delivery Unlocked!', 'Fitoni Transport Falas!')
                    : t(`Add €${(freeShippingThreshold - subtotal).toFixed(2)} more for FREE delivery`, `Shtoni edhe €${(freeShippingThreshold - subtotal).toFixed(2)} për transport falas`)}
                </span>
                <span>{freeShippingProgress.toFixed(0)}%</span>
              </div>
              <div style={{ width: '100%', height: '6px', backgroundColor: '#dcd6c8', borderRadius: '9999px', overflow: 'hidden' }}>
                <div style={{ width: `${freeShippingProgress}%`, height: '100%', backgroundColor: '#1d4ed8', transition: 'width 0.3s' }} />
              </div>
            </div>

            {/* Cart Items List */}
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', padding: '8px 0' }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '48px 16px', color: '#736d63' }}>
                  <ShoppingBag size={40} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
                  <p style={{ margin: 0, fontWeight: 700 }}>{t('Your cart is empty', 'Shporta juaj është bosh')}</p>
                </div>
              ) : (
                cart.map(({ product, quantity }) => (
                  <div key={product.id} style={{ display: 'flex', gap: '12px', alignItems: 'center', borderBottom: '1px solid #f0eee8', paddingBottom: '12px' }}>
                    <div style={{ width: '64px', height: '64px', position: 'relative', borderRadius: '6px', overflow: 'hidden', backgroundColor: '#f2eee7', flexShrink: 0 }}>
                      <Image src={product.img} alt={product.nameEn} fill sizes="64px" style={{ objectFit: 'cover' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: '0 0 4px', fontSize: '0.9rem', fontWeight: 800 }}>
                        {t(product.nameEn, product.nameSq)}
                      </h4>
                      <div style={{ fontSize: '0.85rem', fontWeight: 900, color: '#1d4ed8' }}>
                        {currencySymbol}{(product.price * quantity).toFixed(2)}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid #dcdad5', borderRadius: '4px' }}>
                          <button
                            type="button"
                            onClick={() => updateQuantity(product.id, -1)}
                            style={{ padding: '2px 6px', background: 'none', border: 'none', cursor: 'pointer' }}
                          >
                            <Minus size={12} />
                          </button>
                          <span style={{ padding: '0 8px', fontSize: '0.8rem', fontWeight: 800 }}>{quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(product.id, 1)}
                            style={{ padding: '2px 6px', background: 'none', border: 'none', cursor: 'pointer' }}
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(product.id)}
                          style={{ background: 'none', border: 'none', color: '#999', cursor: 'pointer', padding: '4px' }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Promo Code Simulator */}
            <form onSubmit={applyPromo} style={{ margin: '16px 0 8px', display: 'flex', gap: '8px' }}>
              <input
                type="text"
                placeholder={t('Promo Code (try LOCAL10)', 'Kodi i Zbritjes (shkruaj LOCAL10)')}
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                style={{ flex: 1, padding: '8px 12px', border: '1px solid #dcdad5', borderRadius: '6px', fontSize: '0.82rem' }}
              />
              <button
                type="submit"
                style={{ backgroundColor: '#e2dcce', border: 'none', padding: '8px 14px', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 800, cursor: 'pointer' }}
              >
                {t('Apply', 'Apliko')}
              </button>
            </form>
            {promoMsg && <div style={{ fontSize: '0.75rem', color: discountPercent > 0 ? '#16a34a' : '#dc2626', marginBottom: '8px' }}>{promoMsg}</div>}

            {/* Subtotal & Checkout */}
            <div style={{ borderTop: '1px solid #e7e5e0', paddingTop: '16px' }}>
              {discountPercent > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#16a34a', marginBottom: '4px' }}>
                  <span>{t('Discount (10%):', 'Zbritje (10%):')}</span>
                  <span>-{currencySymbol}{discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: 900, marginBottom: '16px' }}>
                <span>{t('Subtotal:', 'Totali:')}</span>
                <span>{currencySymbol}{subtotal.toFixed(2)}</span>
              </div>

              <button
                type="button"
                disabled={cart.length === 0}
                onClick={() => {
                  setIsCheckoutOpen(true);
                  setIsCartOpen(false);
                }}
                style={{
                  width: '100%',
                  backgroundColor: '#121314',
                  color: '#ffffff',
                  border: 'none',
                  padding: '14px',
                  borderRadius: '6px',
                  fontWeight: 800,
                  fontSize: '0.95rem',
                  cursor: cart.length === 0 ? 'not-allowed' : 'pointer',
                  opacity: cart.length === 0 ? 0.5 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <span>{t('Proceed to Checkout', 'Vazhdo te Pagesa')}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 100000, backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setQuickViewProduct(null);
          }}
        >
          <div style={{ backgroundColor: '#ffffff', maxWidth: '580px', width: '100%', borderRadius: '10px', overflow: 'hidden', padding: '24px', position: 'relative' }}>
            <button
              onClick={() => setQuickViewProduct(null)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: '#f0eee8', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer' }}
            >
              <X size={16} />
            </button>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', alignItems: 'center' }}>
              <div style={{ height: '240px', position: 'relative', borderRadius: '6px', overflow: 'hidden' }}>
                <Image src={quickViewProduct.img} alt={quickViewProduct.nameEn} fill sizes="300px" style={{ objectFit: 'cover' }} />
              </div>
              <div>
                <small style={{ color: '#1d4ed8', fontWeight: 800, textTransform: 'uppercase' }}>{t(quickViewProduct.subEn, quickViewProduct.subSq)}</small>
                <h3 style={{ margin: '4px 0 10px', fontSize: '1.3rem', fontWeight: 900 }}>{t(quickViewProduct.nameEn, quickViewProduct.nameSq)}</h3>
                <p style={{ fontSize: '0.88rem', color: '#5e5a53', lineHeight: 1.5 }}>{t(quickViewProduct.notesEn, quickViewProduct.notesSq)}</p>
                {quickViewProduct.altitude && (
                  <div style={{ fontSize: '0.8rem', color: '#6b665f', margin: '8px 0' }}>
                    <strong>Altitude:</strong> {quickViewProduct.altitude} &bull; <strong>Process:</strong> {quickViewProduct.process}
                  </div>
                )}
                <div style={{ fontSize: '1.4rem', fontWeight: 900, margin: '14px 0', color: '#121314' }}>
                  {currencySymbol}{quickViewProduct.price.toFixed(2)}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    addToCart(quickViewProduct);
                    setQuickViewProduct(null);
                  }}
                  style={{ width: '100%', backgroundColor: '#121314', color: '#fff', border: 'none', padding: '11px', borderRadius: '6px', fontWeight: 800, cursor: 'pointer' }}
                >
                  {t('Add to Cart', 'Shto në Shportë')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Simulator Modal */}
      {isCheckoutOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100000, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ backgroundColor: '#fff', maxWidth: '480px', width: '100%', borderRadius: '10px', padding: '28px' }}>
            {checkoutComplete ? (
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: '56px', height: '56px', backgroundColor: '#dcfce7', color: '#16a34a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <Check size={32} />
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 900, margin: '0 0 8px' }}>{t('Demo Order Placed!', 'Porosia Demo u Krye!')}</h3>
                <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.5, margin: '0 0 20px' }}>
                  {t('This simulates a full e-commerce checkout flow with order confirmation, tracking email, and instant inventory sync.', 'Ky është një demonstrim interaktiv i procesit të blerjes online me konfirmim të menjëhershëm.')}
                </p>
                <button
                  onClick={() => {
                    setCheckoutComplete(false);
                    setIsCheckoutOpen(false);
                    setCart([]);
                  }}
                  style={{ backgroundColor: '#121314', color: '#fff', padding: '10px 24px', borderRadius: '6px', border: 'none', fontWeight: 800, cursor: 'pointer' }}
                >
                  {t('Back to Store', 'Kthehu te Dyqani')}
                </button>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 900 }}>{t('Fast Checkout Demo', 'Demonstrim Pagese')}</h3>
                  <button onClick={() => setIsCheckoutOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>&times;</button>
                </div>
                <div style={{ backgroundColor: '#f2eee7', padding: '12px', borderRadius: '6px', marginBottom: '16px', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800 }}>
                    <span>{t('Total Order Value:', 'Vlera Totale e Porosisë:')}</span>
                    <span>{currencySymbol}{subtotal.toFixed(2)}</span>
                  </div>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setCheckoutComplete(true);
                  }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
                >
                  <input type="text" required placeholder={lang === 'sq' ? 'Emri & Mbiemri (p.sh. Elena Hoxha)' : 'Full Name (e.g. Julian Sterling)'} style={{ padding: '10px', border: '1px solid #dcdad5', borderRadius: '6px' }} />
                  <input type="text" required placeholder={lang === 'sq' ? 'Adresa e Dërgesës (p.sh. Rruga B, Prishtinë)' : 'Shipping Address (e.g. 14 Oxford Street, London)'} style={{ padding: '10px', border: '1px solid #dcdad5', borderRadius: '6px' }} />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <input type="text" required placeholder={lang === 'sq' ? 'Qyteti' : 'City'} style={{ padding: '10px', border: '1px solid #dcdad5', borderRadius: '6px' }} />
                    <input type="tel" required placeholder={lang === 'sq' ? '+383 44 123 456' : '+44 7700 900142'} style={{ padding: '10px', border: '1px solid #dcdad5', borderRadius: '6px' }} />
                  </div>
                  <button type="submit" style={{ backgroundColor: '#1d4ed8', color: '#fff', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 800, cursor: 'pointer', marginTop: '6px' }}>
                    {t('Complete Mock Order (Pay on Delivery)', 'Përfundo Porosinë (Pagesë në Dorëzim)')}
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

export default function RetailPage() {
  return (
    <LanguageProvider>
      <RetailContent />
    </LanguageProvider>
  );
}
