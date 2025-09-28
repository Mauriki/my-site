'use client';
import React, { useEffect, useRef, useState } from 'react';

const SUPASCRIBE_SCRIPT_SRC = 'https://js.supascribe.com/v1/loader/MGtdkNMZy3XtjfFWi3VQphrMs2h1.js';
const EMBED_ID = '743689191622';

export default function SupascribeEmbed() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'loaded' | 'failed'>('idle');
  const attemptsRef = useRef(0);

  const createScript = () => {
    // avoid appending multiple times
    if (document.querySelector(`script[src="${SUPASCRIBE_SCRIPT_SRC}"]`)) {
      setStatus('loading');
      return;
    }

    attemptsRef.current += 1;
    setStatus('loading');

    const s = document.createElement('script');
    s.src = SUPASCRIBE_SCRIPT_SRC;
    s.async = true;
    s.onload = () => {
      setStatus('loaded');
    };
    s.onerror = () => {
      // network or parse error while loading the script
      setStatus('failed');
      s.remove();
    };
    document.body.appendChild(s);
  };

  useEffect(() => {
    // inject script once
    createScript();

    // listen for global errors coming from the supascribe script and handle gracefully
    const onError = (e: ErrorEvent) => {
      if (e && typeof e.filename === 'string' && e.filename.includes('supascribe.com')) {
        // prevent the error from bubbling to the console/window handler chain
        e.preventDefault?.();
        setStatus('failed');
      }
    };

    window.addEventListener('error', onError as EventListener);

    return () => {
      window.removeEventListener('error', onError as EventListener);
    };
  }, []);

  const handleRetry = () => {
    // simple retry with small delay
    setStatus('loading');
    setTimeout(() => {
      createScript();
    }, 800);
  };

  return (
    <div style={{ maxWidth: 820, margin: '16px 0' }}>
      {status === 'failed' ? (
        <div style={{ padding: 12, border: '1px solid #eee', borderRadius: 8 }}>
          <strong>Feed unavailable</strong>
          <p style={{ margin: '8px 0' }}>The Supascribe feed failed to load. This can happen if the service is temporarily unavailable.</p>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={handleRetry} style={{ padding: '8px 12px' }}>
              Try again
            </button>
            <a href="https://maurik.substack.com" target="_blank" rel="noopener noreferrer" style={{ padding: '8px 12px' }}>
              Open newsletter
            </a>
          </div>
        </div>
      ) : (
        <div
          data-supascribe-embed-id={EMBED_ID}
          data-supascribe-feed
          style={{ width: '100%' }}
        />
      )}
    </div>
  );
}