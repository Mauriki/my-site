// app/layout.tsx
import './globals.css'; // 1️⃣ Bring in global styles
import type { ReactNode } from 'react'; // 2️⃣ Tell TypeScript what "children" will be

export default function RootLayout({ children }: { children: ReactNode }) { // 3️⃣ Function that wraps all pages
  return (
    <html lang="en"> {/* 4️⃣ Required outer HTML tag */}
      <body> {/* 5️⃣ Body styles applied everywhere */}
        {children} {/* 7️⃣ Page content gets inserted here */}
      </body>
    </html>
  );
}
