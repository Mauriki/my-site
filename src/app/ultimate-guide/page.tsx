'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BackToHomeLink } from '@/components/ui/BackToHomeLink';
import { Mail, Check, Copy } from 'lucide-react';

export default function UltimateGuidePrivatePage() {
  const [copied, setCopied] = useState(false);
  const email = 'millakumaurik@gmail.com';

  const copyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent('Private Access Request: The Ultimate Guide')}&body=${encodeURIComponent(
    'Hi Maurik,\n\nI would like to request private access to The Ultimate Guide.\n\nMy name:\nWhat I am currently working on:\n\nThank you!'
  )}`;

  return (
    <div className="course-page" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f5f3ee' }}>
      <header className="course-topbar">
        <div className="course-topbar-inner">
          <BackToHomeLink className="course-brand" />
          <Link href="/" style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', textDecoration: 'none', fontWeight: 600 }}>
            Home
          </Link>
        </div>
      </header>

      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 24px' }}>
        <div
          style={{
            maxWidth: '560px',
            width: '100%',
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            border: '1px solid #e8e6e1',
            padding: '40px 32px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              display: 'inline-block',
              fontSize: '0.72rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#736d63',
              backgroundColor: '#f3f2ee',
              padding: '4px 12px',
              borderRadius: '9999px',
              marginBottom: '20px',
            }}
          >
            Private Access Only
          </div>

          <h1
            style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              color: '#11100f',
              letterSpacing: '-0.02em',
              margin: '0 0 16px',
            }}
          >
            The Ultimate Guide
          </h1>

          <p
            style={{
              fontSize: '0.98rem',
              lineHeight: 1.7,
              color: '#55514b',
              margin: '0 0 24px',
              textAlign: 'left',
            }}
          >
            Public enrollment for The Ultimate Guide is currently closed. If you found this link via Twitter, my About page, or a personal recommendation, the materials and lessons are still available by private request.
          </p>

          <p
            style={{
              fontSize: '0.92rem',
              lineHeight: 1.65,
              color: '#6b665f',
              margin: '0 0 32px',
              textAlign: 'left',
              backgroundColor: '#faf8f5',
              padding: '16px',
              borderRadius: '8px',
              border: '1px solid #eeebe4',
            }}
          >
            Send me a short note about what you are currently trying to organize or build, and I will share private access with you directly.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            <a
              href={mailtoUrl}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                backgroundColor: '#11100f',
                color: '#ffffff',
                padding: '14px 24px',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.95rem',
                textDecoration: 'none',
                transition: 'opacity 0.2s',
              }}
            >
              <Mail size={17} />
              <span>Request Access via Email</span>
            </a>

            <button
              type="button"
              onClick={copyEmail}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                backgroundColor: '#f3f2ee',
                color: '#403d39',
                border: '1px solid #e2ded6',
                padding: '12px 20px',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '0.88rem',
                cursor: 'pointer',
              }}
            >
              {copied ? <Check size={16} color="#16a34a" /> : <Copy size={16} />}
              <span>{copied ? 'Email Copied to Clipboard' : 'Copy Email (millakumaurik@gmail.com)'}</span>
            </button>
          </div>

          <div style={{ paddingTop: '16px', borderTop: '1px solid #f0eee8' }}>
            <Link href="/" style={{ fontSize: '0.85rem', color: '#827d73', textDecoration: 'none' }}>
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      <footer className="course-footer" style={{ borderTop: '1px solid #e8e6e1', padding: '24px', textAlign: 'center', fontSize: '0.82rem', color: '#888' }}>
        <p suppressHydrationWarning>&copy; {new Date().getFullYear()} Maurik. All rights reserved.</p>
      </footer>
    </div>
  );
}
