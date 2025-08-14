'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({
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
    <html>
      <body>
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Something went wrong!</h1>
            <p className="text-xl text-gray-600 mb-8">
              An unexpected error occurred. Please try again.
            </p>
            <div className="space-y-4">
              <button
                onClick={reset}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try again
              </button>
              <div>
                            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Go back home
            </Link>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

