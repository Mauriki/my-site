/**
 * Notion OAuth Success Page
 * 
 * This page is shown after successful OAuth completion.
 * It provides feedback and redirects users to the blog.
 */

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';


export default function NotionAuthSuccess() {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Auto-redirect after 5 seconds
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          window.location.href = '/blog';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container max-w-2xl mx-auto px-6 py-12">
      <div className="text-center">
        <div className="mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Successfully Connected!</h1>
          <p className="text-xl text-gray-600 mb-6">
            Your Notion integration is now active. You can start writing blog posts in Notion!
          </p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <h2 className="font-semibold text-green-800 mb-3">What happens next?</h2>
          <ul className="text-left text-green-700 space-y-2">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Write blog posts in your Notion database
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Set &quot;Published&quot; to true when ready to publish
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Posts appear automatically on your website
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <Link
            href="/blog"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            View Your Blog
          </Link>
          
          <div className="text-sm text-gray-500">
            Redirecting automatically in {countdown} seconds...
          </div>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>Need help? Check the <Link href="/NOTION_SETUP.md" className="text-blue-600 hover:underline">setup guide</Link></p>
        </div>
      </div>
    </div>
  );
}
