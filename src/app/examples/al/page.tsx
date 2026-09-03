'use client';

import React from 'react';
import { LanguageProvider } from '@/components/examples/LanguageContext';
import { ExamplesShowcase } from '@/components/examples/ExamplesShowcase';

export default function ExamplesAlbanianPage() {
  return (
    <LanguageProvider forcedLang="sq">
      <ExamplesShowcase forcedLanguage="sq" />
    </LanguageProvider>
  );
}
