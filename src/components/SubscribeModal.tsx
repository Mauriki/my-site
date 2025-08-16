'use client';
import React, { useEffect, useState } from 'react';

export default function SubscribeModal({ openInitial = true }: { openInitial?: boolean }) {
  const [open, setOpen] = useState(openInitial);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // show modal on first load (you can customize with localStorage if needed)
    setOpen(openInitial);
  }, [openInitial]);

  if (!open) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      alert('Please enter a valid email.');
      return;
    }
    setLoading(true);

    // Open Substack subscribe page in a new tab (prefill via query param if supported)
    const substackUrl = `https://maurik.substack.com/subscribe?email=${encodeURIComponent(email)}`;
    window.open(substackUrl, '_blank', 'noopener');

    // local UX: show thanks and close after short delay
    setTimeout(() => {
      setLoading(false);
      setDone(true);
      // auto-close after 2s
      setTimeout(() => setOpen(false), 1600);
    }, 800);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(10,10,10,0.45)',
        padding: '1rem',
      }}
      onClick={() => setOpen(false)}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 680,
          borderRadius: 12,
          background: '#fff',
          boxShadow: '0 12px 40px rgba(0,0,0,0.18)',
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: '20px 20px 14px 20px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Subscribe to my newsletter</h3>
            <p style={{ margin: '6px 0 0 0', color: '#666', fontSize: 14 }}>
              Short notes, updates and behind-the-scenes — delivered to your inbox.
            </p>
          </div>
          <button onClick={() => setOpen(false)} aria-label="Close" style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer' }}>✕</button>
        </div>

        <div style={{ padding: 18 }}>
          {done ? (
            <div style={{ textAlign: 'center', padding: '24px 8px' }}>
              <strong style={{ display: 'block', fontSize: 18 }}>Thanks — check your inbox</strong>
              <p style={{ color: '#666', marginTop: 8 }}>A new tab was opened to complete your subscription.</p>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <label htmlFor="subscribe-email" style={{ flex: '1 1 320px', minWidth: 220 }}>
                <input
                  id="subscribe-email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 8,
                    border: '1px solid #e6e6e6',
                    fontSize: 15,
                    boxSizing: 'border-box',
                  }}
                />
              </label>

              <button
                type="submit"
                disabled={loading}
                style={{
                  background: '#0070f3',
                  color: '#fff',
                  border: 'none',
                  padding: '12px 16px',
                  borderRadius: 8,
                  fontWeight: 700,
                  cursor: 'pointer',
                  minWidth: 130,
                }}
              >
                {loading ? 'Subscribing…' : 'Subscribe'}
              </button>

              <div style={{ flexBasis: '100%', height: 0 }} />

              <p style={{ color: '#888', fontSize: 12, margin: '6px 0 0 0' }}>
                By subscribing you agree to the <a href="/privacy" style={{ color: '#0070f3' }}>Privacy Policy</a>.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}