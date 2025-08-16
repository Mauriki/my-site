'use client';
import React, { useEffect } from 'react';

const SUPASCRIBE_SCRIPT_SRC = 'https://js.supascribe.com/v1/loader/MGtdkNMZy3XtjfFWi3VQphrMs2h1.js';
const EMBED_ID = '743689191622';

export default function SupascribeEmbed() {
  useEffect(() => {
    // inject script once
    if (!document.querySelector(`script[src="${SUPASCRIBE_SCRIPT_SRC}"]`)) {
      const s = document.createElement('script');
      s.src = SUPASCRIBE_SCRIPT_SRC;
      s.async = true;
      document.body.appendChild(s);
    }
    // no cleanup needed for this loader
  }, []);

  return (
    <div style={{ maxWidth: 820, margin: '16px 0' }}>
      <div
        data-supascribe-embed-id={EMBED_ID}
        data-supascribe-feed
        style={{ width: '100%' }}
      />
    </div>
  );
}