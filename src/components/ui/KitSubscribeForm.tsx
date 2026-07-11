'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function KitSubscribeForm() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    // Set localStorage unlocked flag immediately
    localStorage.setItem('ultimate_guide_unlocked', 'true');
    setSubmitted(true);
  };

  return (
    <div className="kit-subscribe-container">
      {/* Hidden iframe to receive Kit's redirect without reloading the page */}
      <iframe
        name="kit_post_iframe"
        id="kit_post_iframe"
        style={{ display: 'none' }}
        title="Kit Submission Target"
      />

      {!submitted ? (
        <form
          action="https://app.kit.com/forms/9625976/subscriptions"
          method="post"
          data-sv-form="9625976"
          data-uid="b1979c1c5f"
          target="kit_post_iframe"
          onSubmit={handleSubmit}
          className="newsletter-simple-form"
        >
          <input
            type="email"
            name="email_address"
            placeholder="Type your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="newsletter-simple-input"
            aria-label="Email address"
            autoComplete="email"
            inputMode="email"
            required
          />
          <button type="submit" className="newsletter-simple-button">
            Get Free Access
          </button>
        </form>
      ) : (
        <div className="kit-success-state">
          <div className="success-icon-wrapper">
            <svg
              className="checkmark-svg"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 52 52"
            >
              <circle
                className="checkmark-circle"
                cx="26"
                cy="26"
                r="25"
                fill="none"
              />
              <path
                className="checkmark-check"
                fill="none"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
              />
            </svg>
          </div>
          <h3>You&apos;re Unlocked!</h3>
          <p style={{ marginTop: '0.5rem', marginBottom: '1.25rem', fontSize: 'var(--text-sm)', color: 'var(--ink-soft)' }}>
            We have sent your confirmation link via email. You can also dive into the lectures right away by clicking the button below.
          </p>
          <Link href="/ultimate-guide/portal?unlocked=true" className="btn-special btn-block" style={{ textDecoration: 'none', display: 'block', textAlign: 'center' }}>
            Go to Course Portal
          </Link>
        </div>
      )}
    </div>
  );
}
