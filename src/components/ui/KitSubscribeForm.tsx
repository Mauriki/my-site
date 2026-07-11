'use client';

import { useState } from 'react';

interface KitSubscribeFormProps {
  formId?: string;
  uid?: string;
  buttonText?: string;
  successMessage?: string;
}

export default function KitSubscribeForm({
  formId = '9625976',
  uid = 'b1979c1c5f',
  buttonText = 'Get Free Access',
  successMessage = 'Click the link in that email to open the course portal.',
}: KitSubscribeFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    setLoading(true);
    // Fallback: If for some reason the iframe load event doesn't fire, 
    // force success screen after 1.8 seconds so the user isn't stuck.
    const timer = setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  };

  const handleIframeLoad = () => {
    if (loading) {
      setSubmitted(true);
      setLoading(false);
    }
  };

  return (
    <div className="kit-subscribe-container">
      {/* Hidden iframe to receive Kit's response without redirecting the main page */}
      <iframe
        name={`kit_post_iframe_${formId}`}
        id={`kit_post_iframe_${formId}`}
        style={{ display: 'none' }}
        title="Kit Submission Target"
        onLoad={handleIframeLoad}
      />

      {/* 
        We keep the form in the DOM so the browser does not abort the request.
      */}
      <div style={{ display: submitted ? 'none' : 'block', width: '100%' }}>
        <form
          action={`https://app.kit.com/forms/${formId}/subscriptions`}
          method="post"
          data-sv-form={formId}
          data-uid={uid}
          target={`kit_post_iframe_${formId}`}
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
          <button 
            type="submit" 
            className="newsletter-simple-button"
            style={{ opacity: loading ? 0.8 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
          >
            {loading ? 'Processing...' : buttonText}
          </button>
        </form>
      </div>

      {submitted && (
        <div className="kit-success-state">
          <div className="success-icon-wrapper" style={{ marginBottom: '0.25rem' }}>
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
          <h3 style={{ margin: '0.25rem 0' }}>Check Your Inbox</h3>
          <p style={{ marginTop: '0.25rem', marginBottom: '0.25rem', fontSize: 'var(--text-sm)', color: 'var(--ink-soft)', lineHeight: '1.5' }}>
            We sent the link to <strong>{email}</strong>.
            <br />
            {successMessage}
          </p>
          <p style={{ marginTop: '0.35rem', marginBottom: 0, fontSize: '11px', color: 'var(--ink-mute)' }}>
            Check spam if you don&rsquo;t see it.
          </p>
        </div>
      )}
    </div>
  );
}
