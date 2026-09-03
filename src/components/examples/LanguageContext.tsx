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
  lang: 'en',
  setLang: () => {},
  toggleLang: () => {},
  t: (enText: string) => enText,
});

interface LanguageProviderProps {
  children: ReactNode;
  forcedLang?: Language;
  defaultLang?: Language;
}

export const LanguageProvider = ({
  children,
  forcedLang,
  defaultLang = 'en',
}: LanguageProviderProps) => {
  const [lang, setLangState] = useState<Language>(forcedLang || defaultLang);

  useEffect(() => {
    if (forcedLang) {
      setLangState(forcedLang);
      return;
    }

    // Auto-detect based on current URL path
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      if (path.includes('/examples/al') || path.includes('/examples/sq')) {
        setLangState('sq');
        return;
      }
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang');
      if (urlLang === 'sq' || urlLang === 'al') {
        setLangState('sq');
        return;
      }
      if (urlLang === 'en') {
        setLangState('en');
        return;
      }
    }
  }, [forcedLang]);

  const setLang = (newLang: Language) => {
    if (forcedLang) return;
    setLangState(newLang);
  };

  const toggleLang = () => {
    if (forcedLang) return;
    setLangState((prev) => (prev === 'sq' ? 'en' : 'sq'));
  };

  const t = (enText: string, sqText: string) => (lang === 'sq' ? sqText : enText);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
