'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (
    <div className="state-shell">
      <div className="state-card">
        <p className="state-kicker">Error</p>
        <h1>Something went wrong</h1>
        <p>An unexpected error occurred. Please try again.</p>
        <div className="state-actions">
          <button onClick={reset} className="btn btn-primary state-button">
            Try again
          </button>
          <Link href="/" className="state-link">
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}
