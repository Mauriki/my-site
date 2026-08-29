'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'sq';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (enText: string, sqText: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'sq',
  setLang: () => {},
  toggleLang: () => {},
  t: (_enText: string, sqText: string) => sqText,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Default to Albanian ('sq') for the examples section as requested
  const [lang, setLangState] = useState<Language>('sq');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('site_preview_lang') as Language;
      if (saved === 'en' || saved === 'sq') {
        setLangState(saved);
      }
    } catch {
      // ignore storage access error
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem('site_preview_lang', newLang);
    } catch {
      // ignore
    }
  };

  const toggleLang = () => {
    const nextLang = lang === 'sq' ? 'en' : 'sq';
    setLang(nextLang);
  };

  const t = (enText: string, sqText: string) => (lang === 'sq' ? sqText : enText);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
