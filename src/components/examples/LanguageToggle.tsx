'use client';

import React from 'react';
import { useLanguage } from './LanguageContext';

export function LanguageToggle({ className = '' }: { className?: string }) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Language selection"
      className={`inline-flex items-center p-1 rounded-full bg-neutral-900/10 dark:bg-white/10 backdrop-blur-md border border-neutral-300 dark:border-neutral-700 text-xs font-semibold select-none transition-all ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '3px',
        borderRadius: '9999px',
        backgroundColor: 'rgba(0,0,0,0.06)',
        border: '1px solid rgba(0,0,0,0.12)',
        fontSize: '0.75rem',
        fontWeight: 600,
      }}
    >
      <button
        type="button"
        onClick={() => setLang('en')}
        className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
          lang === 'en'
            ? 'bg-neutral-900 text-white shadow-sm'
            : 'text-neutral-600 hover:text-neutral-900'
        }`}
        style={{
          padding: '4px 10px',
          borderRadius: '9999px',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          backgroundColor: lang === 'en' ? '#0f0f0f' : 'transparent',
          color: lang === 'en' ? '#ffffff' : '#555555',
          fontWeight: lang === 'en' ? 700 : 500,
        }}
        aria-pressed={lang === 'en'}
      >
        🇬🇧 EN
      </button>
      <button
        type="button"
        onClick={() => setLang('sq')}
        className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
          lang === 'sq'
            ? 'bg-neutral-900 text-white shadow-sm'
            : 'text-neutral-600 hover:text-neutral-900'
        }`}
        style={{
          padding: '4px 10px',
          borderRadius: '9999px',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          backgroundColor: lang === 'sq' ? '#0f0f0f' : 'transparent',
          color: lang === 'sq' ? '#ffffff' : '#555555',
          fontWeight: lang === 'sq' ? 700 : 500,
        }}
        aria-pressed={lang === 'sq'}
      >
        🇦🇱 AL
      </button>
    </div>
  );
}
