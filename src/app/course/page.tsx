import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Redirecting to Ultimate Guide',
  description: 'This page has moved to /ultimate-guide.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function LegacyCoursePage() {
  return (
    <main className="container legacy-redirect-page">
      <h1>Redirecting to the Ultimate Guide...</h1>
      <p>The old /course URL has moved.</p>
      <p>
        <Link href="/ultimate-guide">Continue to the Ultimate Guide</Link>
      </p>
      <script
        dangerouslySetInnerHTML={{
          __html: "window.location.replace('/ultimate-guide');",
        }}
      />
      <noscript>
        <p>JavaScript is disabled. Use the link above to continue.</p>
      </noscript>
    </main>
  );
}
