'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from './LanguageContext';
import { LanguageToggle } from './LanguageToggle';
import {
  ArrowLeft,
  Sparkles,
  Send,
  CheckCircle2,
  X,
  Mail,
  Copy,
  Check,
  MessageCircle,
} from 'lucide-react';

interface DemoTopBarProps {
  demoTitle: { en: string; sq: string };
  industry: { en: string; sq: string };
  badgeColor?: string;
}

export function DemoTopBar({ demoTitle, industry, badgeColor = '#0b63f3' }: DemoTopBarProps) {
  const { lang, t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  // Form Fields
  const [clientName, setClientName] = useState('');
  const [clientContact, setClientContact] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [message, setMessage] = useState('');

  // Quick suggestion chips
  const suggestions = [
    { en: 'Medical / Dental Clinic', sq: 'Klinikë / Stomatologji' },
    { en: 'Logistics & Transport', sq: 'Transport & Logjistikë' },
    { en: 'Real Estate Agency', sq: 'Agjenci Imobiliare' },
    { en: 'Fitness & Gym Center', sq: 'Qendër Fitnesi & Gym' },
    { en: 'Auto Salon / Garage', sq: 'Auto Sallon / Servis' },
    { en: 'E-Commerce / Retail', sq: 'Dyqan Online / Retail' },
    { en: 'Restaurant / Café', sq: 'Restorant / Kafene' },
    { en: 'Education / Academy', sq: 'Akademi / Kurse' },
  ];

  const proposalText =
    `Përshëndetje Maurik,\n\n` +
    `Po ju kontaktoj nga demonstrimi (${t(demoTitle.sq, demoTitle.en)}) për një propozim faqeje interneti.\n\n` +
    `• Emri / Biznesi: ${clientName || 'Nuk u specifikua'}\n` +
    `• Kontakti (Email / Telefon): ${clientContact || 'Nuk u specifikua'}\n` +
    `• Lloji i Biznesit: ${businessType || t(industry.sq, industry.en)}\n` +
    `• Kërkesat & Veçoritë: ${message || 'Dua një faqe të shpejtë dhe moderne të përshtatur për biznesin tim.'}\n\n` +
    `Pres përgjigjen tuaj.\nFaleminderit!`;

  const mailtoLink = `mailto:millakumaurik@gmail.com?subject=${encodeURIComponent(
    `Kërkesë për Faqe nga Shembulli: ${clientName || 'Klient'} (${t(demoTitle.sq, demoTitle.en)})`
  )}&body=${encodeURIComponent(proposalText)}`;

  const whatsappLink = `https://wa.me/?text=${encodeURIComponent(proposalText)}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Trigger direct native mail compose in client's default email client
    try {
      window.location.href = mailtoLink;
    } catch {
      // ignore
    }

    // Also send async backup to formsubmit
    try {
      fetch('https://formsubmit.co/ajax/millakumaurik@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          'Emri / Biznesi': clientName,
          'Kontakti': clientContact,
          'Lloji i Biznesit': businessType,
          'Faqja Burimore': t(demoTitle.sq, demoTitle.en),
          'Mesazhi': message,
          _subject: `Kërkesë nga Shembulli: ${clientName || 'Klient'} (${t(demoTitle.sq, demoTitle.en)})`,
          _captcha: 'false',
        }),
      }).catch(() => {});
    } catch {
      // ignore
    }

    setSubmitted(true);
  };

  const copyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(proposalText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <>
      <aside
        aria-label="Demo site navigation bar"
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          backgroundColor: 'rgba(18, 18, 20, 0.95)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
          color: '#ffffff',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
          fontFamily: "'Avenir Next', 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: '0.85rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <Link
            href="/examples"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#d1d5db',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.825rem',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              padding: '6px 12px',
              borderRadius: '6px',
              transition: 'all 0.2s ease',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.18)';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.color = '#d1d5db';
            }}
          >
            <ArrowLeft size={14} />
            <span>{t('← All Examples', '← Të gjithë shembujt')}</span>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#f3f4f6',
                padding: '4px 9px',
                borderRadius: '4px',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                borderLeft: `3px solid ${badgeColor}`,
              }}
            >
              <Sparkles size={11} color="#f59e0b" />
              {t(demoTitle.en, demoTitle.sq)}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)', borderRadius: '9999px' }}>
            <LanguageToggle />
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#0b63f3',
              color: '#ffffff',
              border: 'none',
              padding: '7px 14px',
              borderRadius: '6px',
              fontWeight: 600,
              fontSize: '0.825rem',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(11, 99, 243, 0.4)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#0a4bc4';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#0b63f3';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <Send size={13} />
            <span>{t('Get a Site Like This', 'Kërko një Faqe si Kjo')}</span>
          </button>
        </div>
      </aside>

      {/* Direct Inquire Modal */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100000,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              color: '#111827',
              borderRadius: '16px',
              maxWidth: '540px',
              width: '100%',
              padding: '28px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              position: 'relative',
              fontFamily: "'Avenir Next', 'Manrope', sans-serif",
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              style={{
                position: 'absolute',
                top: '18px',
                right: '18px',
                background: '#f3f4f6',
                border: 'none',
                borderRadius: '9999px',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#6b7280',
              }}
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '16px 8px' }}>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    backgroundColor: '#dcfce7',
                    color: '#16a34a',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                  }}
                >
                  <CheckCircle2 size={32} />
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: '0 0 8px', color: '#111827' }}>
                  {t('Direct Dispatch Prepared!', 'Kërkesa u Përgatit!')}
                </h3>
                <p style={{ color: '#4b5563', fontSize: '0.9rem', margin: '0 0 20px', lineHeight: 1.5 }}>
                  {t(
                    `Your proposal was dispatched to millakumaurik@gmail.com. You can also send directly via email or WhatsApp below:`,
                    `Kërkesa juaj u dërgua te millakumaurik@gmail.com. Mund ta dërgoni edhe drejtpërdrejt me email ose WhatsApp më poshtë:`
                  )}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                  <a
                    href={mailtoLink}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      backgroundColor: '#0f0f0f',
                      color: '#ffffff',
                      padding: '11px 18px',
                      borderRadius: '8px',
                      fontWeight: 700,
                      textDecoration: 'none',
                      fontSize: '0.88rem',
                    }}
                  >
                    <Mail size={16} />
                    <span>{t('Open in Email (Gmail / Apple Mail)', 'Hap në Email (Gmail / Apple Mail)')}</span>
                  </a>

                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      backgroundColor: '#16a34a',
                      color: '#ffffff',
                      padding: '11px 18px',
                      borderRadius: '8px',
                      fontWeight: 700,
                      textDecoration: 'none',
                      fontSize: '0.88rem',
                    }}
                  >
                    <MessageCircle size={16} />
                    <span>{t('Send via WhatsApp', 'Dërgo me WhatsApp')}</span>
                  </a>

                  <button
                    type="button"
                    onClick={copyToClipboard}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      backgroundColor: '#f3f4f6',
                      color: '#374151',
                      border: '1px solid #d1d5db',
                      padding: '10px 18px',
                      borderRadius: '8px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      fontSize: '0.88rem',
                    }}
                  >
                    {copied ? <Check size={16} color="#16a34a" /> : <Copy size={16} />}
                    <span>{copied ? t('Copied to Clipboard!', 'U Kopjua!') : t('Copy Message Text', 'Kopjo Tekstin e Kërkesës')}</span>
                  </button>
                </div>

                <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '16px' }}>
                  {t('Direct Contact:', 'Email Direkt:')} <strong>millakumaurik@gmail.com</strong>
                </div>

                <button
                  onClick={() => {
                    setSubmitted(false);
                    setIsModalOpen(false);
                  }}
                  style={{
                    backgroundColor: 'transparent',
                    color: '#6b7280',
                    padding: '8px 18px',
                    borderRadius: '8px',
                    border: 'none',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {t('Close', 'Mbyll')}
                </button>
              </div>
            ) : (
              <div>
                <span
                  style={{
                    display: 'inline-block',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: '#0b63f3',
                    marginBottom: '4px',
                  }}
                >
                  {t('Direct Outreach & Quote', 'Kërkesë Direkte për Ofertë')}
                </span>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: '0 0 8px', color: '#0f172a' }}>
                  {t('Want a custom website for your business?', 'Dëshironi një faqe unike për biznesin tuaj?')}
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.88rem', margin: '0 0 16px', lineHeight: 1.5 }}>
                  {t(
                    'I design fast, high-converting websites crafted for any legitimate business — with zero slow templates or recurring agency bloat.',
                    'Ndërtoj faqe të shpejta dhe moderne, të përshtatura posaçërisht për çdo lloj biznesi — pa shabllone të ngadalta apo tarifa agjencish.'
                  )}
                </p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px', color: '#374151' }}>
                      {t('Your Name / Business Name', 'Emri Juaj / Emri i Biznesit')}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={lang === 'sq' ? 'p.sh. Arben Krasniqi – City Clinic' : 'e.g. Marcus Sterling – Apex Studio'}
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px', color: '#374151' }}>
                      {t('Email Address / WhatsApp Phone', 'Email / WhatsApp Numër')}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={lang === 'sq' ? 'ju@biznesi.com ose +383 44...' : 'you@company.com or +44 20...'}
                      value={clientContact}
                      onChange={(e) => setClientContact(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px', color: '#374151' }}>
                      {t('What is your business type? (Type freely or click suggestion)', 'Lloji i Biznesit (Shkruani lirisht çfarëdo biznesi)')}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={lang === 'sq' ? 'p.sh. Klinikë Stomatologjike, Transport, Agjenci, Dyqan...' : 'e.g. Dental Clinic, Logistics, Real Estate, E-Commerce, Gym...'}
                      value={businessType}
                      onChange={(e) => setBusinessType(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                        marginBottom: '6px',
                      }}
                    />
                    {/* Quick suggestion chips */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {suggestions.map((s, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setBusinessType(t(s.en, s.sq))}
                          style={{
                            backgroundColor: '#f3f4f6',
                            border: '1px solid #e5e7eb',
                            color: '#4b5563',
                            padding: '3px 8px',
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
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px', color: '#374151' }}>
                      {t('What features do you need? (Optional)', 'Çfarë veçorish ju nevojiten? (Opsionale)')}
                    </label>
                    <textarea
                      rows={2}
                      placeholder={lang === 'sq' ? 'p.sh. Rezervim online, pagesa me kartelë, llogaritës çmimesh, katalog...' : 'e.g. Online booking, card payments, price calculator, product catalog...'}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                        resize: 'vertical',
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      marginTop: '4px',
                      backgroundColor: '#0f0f0f',
                      color: '#ffffff',
                      padding: '12px 18px',
                      borderRadius: '8px',
                      border: 'none',
                      fontWeight: 800,
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                    }}
                  >
                    <Send size={16} />
                    {t('Send Proposal Request (Direct to Email)', 'Dërgo Kërkesën (Direkt në Email)')}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
