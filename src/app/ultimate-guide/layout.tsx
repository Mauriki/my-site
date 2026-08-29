import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Ultimate Guide',
  description:
    'A complete guide for direction and execution with practical lessons, templates, and frameworks.',
  openGraph: {
    title: 'The Ultimate Guide to Turning Your Life Around',
    description:
      'Practical systems for clarity, action, and consistency. Includes 13 HD lessons and lifetime access.',
    type: 'website',
    images: [
      {
        url: 'https://maurikmillaku.com/og-preview.png',
        width: 1200,
        height: 630,
        alt: 'The Ultimate Guide to Turning Your Life Around',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['https://maurikmillaku.com/og-preview.png'],
  },
};

export default function UltimateGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
