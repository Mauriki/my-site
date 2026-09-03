import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Ultimate Guide (Private Access) | Maurik',
  description:
    'The Ultimate Guide is currently available by private request.',
  openGraph: {
    title: 'The Ultimate Guide (Private Access) | Maurik',
    description:
      'The Ultimate Guide is currently available by private request.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'The Ultimate Guide (Private Access) | Maurik',
    description:
      'The Ultimate Guide is currently available by private request.',
  },
};

export default function UltimateGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
