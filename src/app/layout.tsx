import './globals.css';
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  metadataBase: new URL('https://maurikmillaku.com'),
  title: {
    default: 'Maurik | Systems, Direction, Execution',
    template: '%s | Maurik',
  },
  description:
    'Personal website and ultimate guide by Maurik. Practical systems for direction, consistency, and meaningful execution.',
  applicationName: 'Maurik',
  icons: {
    icon: '/1000030440-modified.png',
    apple: '/1000030440-modified.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: 'Maurik | Systems, Direction, Execution',
    description:
      'Practical systems for direction, consistency, and meaningful execution.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maurik | Systems, Direction, Execution',
    description:
      'Practical systems for direction, consistency, and meaningful execution.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f5f3ee',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[]).push(arguments);},l=d.createElement(e),l.async=1,l.src=u,n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);})(window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');ml('account','2174090');`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
