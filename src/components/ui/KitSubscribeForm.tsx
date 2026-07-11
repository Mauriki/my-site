'use client';

import { useEffect, useRef } from 'react';

/**
 * KitSubscribeForm
 *
 * Uses Kit's official JS embed (ck.5.js) which is the only fully reliable
 * way to ensure the confirmation email is triggered server-side.
 * We load the script once, let Kit render the form into a hidden container,
 * then intercept the submission so we can show our own styled UI and success state.
 *
 * The ?unlocked=true redirect is configured inside Kit:
 *   Form Settings → Confirmation email → After confirming redirect to:
 *   https://maurikmillaku.com/ultimate-guide/portal?unlocked=true
 */
export default function KitSubscribeForm() {
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If ck.5.js is already loaded, no need to reload
    const existingScript = document.getElementById('kit-ck5-script');

    const initKit = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const w = window as any;
      if (w.ck && typeof w.ck.initForms === 'function') {
        w.ck.initForms();
      }
    };

    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'kit-ck5-script';
      script.src = 'https://f.convertkit.com/ckjs/ck.5.js';
      script.async = true;
      script.onload = initKit;
      document.head.appendChild(script);
    } else {
      initKit();
    }
  }, []);

  return (
    <div className="kit-subscribe-container" ref={formRef}>
      {/*
        Kit's official embed form.
        data-format="inline" keeps it as a regular embedded form.
        All Kit default styles are reset/overridden via globals.css.
        The success message & redirect after confirmation are set in Kit dashboard.
      */}
      <form
        action="https://app.kit.com/forms/9625976/subscriptions"
        className="seva-form formkit-form newsletter-simple-form"
        method="post"
        data-sv-form="9625976"
        data-uid="b1979c1c5f"
        data-format="inline"
        data-version="5"
      >
        <div data-style="clean">
          {/* Kit renders error messages here */}
          <ul
            className="formkit-alert formkit-alert-error"
            data-element="errors"
            data-group="alert"
          />

          <div
            data-element="fields"
            data-stacked="false"
            className="seva-fields formkit-fields kit-inline-fields"
          >
            <div className="formkit-field kit-field">
              <input
                className="formkit-input newsletter-simple-input"
                name="email_address"
                aria-label="Email Address"
                placeholder="Type your email"
                required
                type="email"
              />
            </div>

            <button
              data-element="submit"
              className="formkit-submit newsletter-simple-button"
            >
              {/* Kit replaces this with a spinner on submit */}
              <div className="formkit-spinner">
                <div />
                <div />
                <div />
              </div>
              <span>Get Free Access</span>
            </button>
          </div>
        </div>
      </form>

      {/* Override Kit's default styles to match site design */}
      <style>{`
        /* Reset Kit's injected styles inside our container */
        .kit-subscribe-container .formkit-form {
          background: transparent !important;
          border: none !important;
          padding: 0 !important;
          margin: 0 !important;
          max-width: 100% !important;
          font-family: inherit !important;
        }
        .kit-subscribe-container .kit-inline-fields {
          display: flex !important;
          gap: 0.5rem !important;
          flex-wrap: wrap !important;
          margin: 0 !important;
        }
        .kit-subscribe-container .kit-field {
          flex: 1 1 200px !important;
          margin: 0 !important;
        }
        .kit-subscribe-container .formkit-input {
          width: 100% !important;
          padding: 0.75rem 1rem !important;
          border-radius: var(--radius-md, 8px) !important;
          border: 1.5px solid var(--border, rgba(255,255,255,0.15)) !important;
          background: var(--surface, rgba(255,255,255,0.05)) !important;
          color: var(--ink, #fff) !important;
          font-size: var(--text-base, 1rem) !important;
          font-family: inherit !important;
          outline: none !important;
          margin: 0 !important;
          transition: border-color 0.2s ease !important;
        }
        .kit-subscribe-container .formkit-input:focus {
          border-color: var(--accent, #6366f1) !important;
        }
        .kit-subscribe-container .formkit-input::placeholder {
          color: var(--ink-mute, rgba(255,255,255,0.4)) !important;
          opacity: 1 !important;
        }
        .kit-subscribe-container .formkit-submit {
          flex-shrink: 0 !important;
          padding: 0.75rem 1.5rem !important;
          border-radius: var(--radius-md, 8px) !important;
          background: var(--accent, #6366f1) !important;
          color: #fff !important;
          font-size: var(--text-base, 1rem) !important;
          font-weight: 600 !important;
          font-family: inherit !important;
          border: none !important;
          cursor: pointer !important;
          transition: opacity 0.2s ease, transform 0.15s ease !important;
          margin: 0 !important;
          position: relative !important;
          overflow: hidden !important;
          min-width: 140px !important;
        }
        .kit-subscribe-container .formkit-submit:hover {
          opacity: 0.9 !important;
          transform: translateY(-1px) !important;
        }
        .kit-subscribe-container .formkit-submit span {
          display: block !important;
          padding: 0 !important;
          background: transparent !important;
        }
        /* Hide Kit branding */
        .kit-subscribe-container .formkit-powered-by-convertkit-container {
          display: none !important;
        }
        /* Kit success message styling */
        .kit-subscribe-container [data-element="success"] {
          background: transparent !important;
          padding: 0 !important;
          text-align: left !important;
          color: var(--ink, #fff) !important;
          font-family: inherit !important;
        }
        .kit-subscribe-container .formkit-alert-error {
          background: rgba(239,68,68,0.1) !important;
          border: 1px solid rgba(239,68,68,0.4) !important;
          border-radius: var(--radius-md, 8px) !important;
          color: #fca5a5 !important;
          padding: 0.75rem 1rem !important;
          margin-bottom: 0.75rem !important;
          font-size: 0.875rem !important;
          list-style: none !important;
        }
        .kit-subscribe-container .formkit-alert-error:empty {
          display: none !important;
        }
        /* Spinner */
        .kit-subscribe-container .formkit-spinner {
          display: none !important;
          position: absolute !important;
          top: 50% !important;
          left: 50% !important;
          transform: translate(-50%, -50%) !important;
          width: auto !important;
          height: auto !important;
        }
        .kit-subscribe-container .formkit-submit[data-active] .formkit-spinner {
          display: flex !important;
          gap: 4px !important;
        }
        .kit-subscribe-container .formkit-submit[data-active] span {
          opacity: 0 !important;
        }
        .kit-subscribe-container .formkit-spinner > div {
          width: 8px !important;
          height: 8px !important;
          background: #fff !important;
          border-radius: 50% !important;
          animation: kitBounce 1.4s infinite ease-in-out both !important;
        }
        .kit-subscribe-container .formkit-spinner > div:nth-child(1) { animation-delay: -0.32s !important; }
        .kit-subscribe-container .formkit-spinner > div:nth-child(2) { animation-delay: -0.16s !important; }
        @keyframes kitBounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
        /* Responsive */
        @media (max-width: 480px) {
          .kit-subscribe-container .kit-inline-fields {
            flex-direction: column !important;
          }
          .kit-subscribe-container .formkit-submit {
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}
