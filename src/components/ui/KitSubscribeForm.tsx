'use client';

import { useState } from 'react';

export default function KitSubscribeForm() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    // Do NOT unlock immediately — wait for email confirmation.
    // Kit will redirect to /ultimate-guide/portal?unlocked=true after they confirm.
    setSubmitted(true);
  };

  return (
    <div className="kit-subscribe-container">
      {/* Hidden iframe so the form posts to Kit without navigating away */}
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
            {/* Envelope icon instead of checkmark — signals "check your email" */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 52 52"
              className="checkmark-svg"
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
            Click <strong>&ldquo;Confirm your subscription&rdquo;</strong> in that email and you will be taken straight into the course.
          </p>
          <p style={{ marginTop: '0.75rem', fontSize: '12px', color: 'var(--ink-mute)' }}>
            Can&rsquo;t find it? Check your spam or promotions folder.
          </p>
        </div>
      )}
    </div>
  );
}
