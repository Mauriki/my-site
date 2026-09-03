import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Faqe Interneti për Biznese Lokale | Maurik',
  description:
    'Arkitektura dhe faqe interneti me cilësi të lartë për biznese lokale, me rezervime dhe porosi direkt në WhatsApp.',
  openGraph: {
    title: 'Faqe Interneti për Biznese Lokale | Maurik',
    description:
      'Arkitektura dhe faqe interneti me cilësi të lartë për biznese lokale, me rezervime dhe porosi direkt në WhatsApp.',
    type: 'website',
    url: 'https://maurikmillaku.com/examples/sq',
    images: [
      {
        url: 'https://maurikmillaku.com/og-examples.png',
        width: 1200,
        height: 630,
        alt: 'Faqe Interneti për Biznese Lokale | Maurik',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Faqe Interneti për Biznese Lokale | Maurik',
    description:
      'Arkitektura dhe faqe interneti me cilësi të lartë për biznese lokale, me rezervime dhe porosi direkt në WhatsApp.',
    images: ['https://maurikmillaku.com/og-examples.png'],
  },
};

export default function ExamplesSqLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
