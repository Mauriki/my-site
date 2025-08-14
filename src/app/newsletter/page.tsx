/**
 * Newsletter Page - Like Oliur's "The Manual"
 * 
 * A monthly newsletter for exclusive content, similar to Oliur's approach.
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsSubscribed(true);
        setEmail('');
      } else {
        throw new Error('Subscription failed');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-2xl mx-auto text-center">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">The Manual</h1>
          <p className="text-xl text-gray-600 mb-6">
            A monthly newsletter sharing my experiences, programming insights, and curated links to interesting things.
          </p>
          <p className="text-gray-500">
            I don&apos;t share this content anywhere else.
          </p>
        </header>

        {/* Newsletter Signup */}
        {!isSubscribed ? (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Subscribe to The Manual</h2>
            <p className="text-gray-600 mb-6">
              Get exclusive content delivered to your inbox once a month. No spam, just valuable insights.
            </p>
            
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
              >
                {isLoading ? 'Subscribing...' : 'Subscribe to Newsletter'}
              </button>
            </form>
            
            <p className="text-sm text-gray-500 mt-4">
              By subscribing, you agree to receive monthly emails. You can unsubscribe at any time.
            </p>
          </div>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-lg p-8 mb-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-green-800 mb-2">Welcome to The Manual!</h2>
            <p className="text-green-700 mb-4">
              You&apos;ve successfully subscribed to my newsletter. Look out for the first email in your inbox.
            </p>
            <button
              onClick={() => setIsSubscribed(false)}
              className="text-green-600 hover:text-green-800 underline"
            >
              Subscribe another email
            </button>
          </div>
        )}

        {/* What to Expect */}
        <div className="bg-gray-50 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What to Expect</h2>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">📝 Personal Stories</h3>
              <p className="text-gray-600">
                Behind-the-scenes insights from my programming journey and learning experiences.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">🔗 Curated Links</h3>
              <p className="text-gray-600">
                The most interesting articles, tools, and resources I&apos;ve discovered each month.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">💡 Programming Tips</h3>
              <p className="text-gray-600">
                Practical advice and techniques I&apos;ve learned while building projects and learning new technologies.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">🚀 Exclusive Content</h3>
              <p className="text-gray-600">
                Content that I don&apos;t share on my blog or social media - just for newsletter subscribers.
              </p>
            </div>
          </div>
        </div>

        {/* Recent Issues Preview */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Issues</h2>
          <div className="space-y-4 text-left">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-900 mb-1">Issue #3 - January 2025</h3>
              <p className="text-gray-600 text-sm mb-2">
                My experience learning Next.js, the best programming resources I found, and why I switched from Notion to static content.
              </p>
              <span className="text-xs text-gray-500">Sent to 127 subscribers</span>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-900 mb-1">Issue #2 - December 2024</h3>
              <p className="text-gray-600 text-sm mb-2">
                Building my first website, lessons learned from the development process, and my favorite coding tools.
              </p>
              <span className="text-xs text-gray-500">Sent to 89 subscribers</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Issue #1 - November 2024</h3>
              <p className="text-gray-600 text-sm mb-2">
                Why I started learning to code, my initial struggles, and the resources that helped me the most.
              </p>
              <span className="text-xs text-gray-500">Sent to 45 subscribers</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
                      <p className="text-gray-500 mb-4">
              Questions or feedback? I&apos;d love to hear from you.
            </p>
          <div className="flex justify-center space-x-6">
            <Link href="/" className="text-blue-600 hover:text-blue-800 transition-colors">
              Home
            </Link>
            <Link href="/blog" className="text-blue-600 hover:text-blue-800 transition-colors">
              Blog
            </Link>
            <a href="mailto:maurikmunir@gmail.com" className="text-blue-600 hover:text-blue-800 transition-colors">
              Email Me
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

