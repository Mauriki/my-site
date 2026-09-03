import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Selected Work (Client Websites) | Maurik',
  description:
    'High-quality custom website architectures designed for restaurants, retail, grooming, law, and trade.',
  openGraph: {
    title: 'Selected Work (Client Websites) | Maurik',
    description:
      'High-quality custom website architectures designed for businesses that demand distinction.',
    type: 'website',
    url: 'https://maurikmillaku.com/examples',
    images: [
      {
        url: 'https://maurikmillaku.com/og-examples.png',
        width: 1200,
        height: 630,
        alt: 'Selected Work & Client Websites | Maurik',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Selected Work (Client Websites) | Maurik',
    description:
      'High-quality custom website architectures designed for businesses that demand distinction.',
    images: ['https://maurikmillaku.com/og-examples.png'],
  },
};

export default function ExamplesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
