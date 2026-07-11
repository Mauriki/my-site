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
  successMessage = 'Click "Confirm your subscription" in that email to open the course portal.',
}: KitSubscribeFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="kit-subscribe-container">
      {/* Hidden iframe to receive Kit's response without redirecting the main page */}
      <iframe
        name={`kit_post_iframe_${formId}`}
        id={`kit_post_iframe_${formId}`}
        style={{ display: 'none' }}
        title="Kit Submission Target"
      />

      {/* 
        CRITICAL FIX: We keep the form in the DOM but hide it using CSS.
        If we unmount the form instantly, the browser aborts the request before it reaches Kit.
      */}
      <div style={{ display: submitted ? 'none' : 'block' }}>
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
          <button type="submit" className="newsletter-simple-button">
            {buttonText}
          </button>
        </form>
      </div>

      {submitted && (
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
          <h3>Check Your Inbox</h3>
          <p style={{ marginTop: '0.5rem', fontSize: 'var(--text-sm)', color: 'var(--ink-soft)', lineHeight: '1.65' }}>
            We sent a confirmation email to <strong>{email}</strong>.
            <br />
            {successMessage}
          </p>
          <p style={{ marginTop: '0.75rem', fontSize: '12px', color: 'var(--ink-mute)' }}>
            Can&rsquo;t find it? Check your spam or promotions folder.
          </p>
        </div>
      )}
    </div>
  );
}
