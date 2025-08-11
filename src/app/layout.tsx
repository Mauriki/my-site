import './globals.css';
import type { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/1000030440-modified.png" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
