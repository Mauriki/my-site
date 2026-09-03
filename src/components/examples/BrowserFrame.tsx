'use client';

import React, { ReactNode } from 'react';
import { Lock, ExternalLink } from 'lucide-react';

interface BrowserFrameProps {
  url: string;
  title?: string;
  children: ReactNode;
  aspectRatio?: string;
  className?: string;
  accentColor?: string;
  dark?: boolean;
}

export function BrowserFrame({
  url,
  children,
  className = '',
  dark = false,
}: BrowserFrameProps) {
  const bgHeader = dark ? '#1a1918' : '#f3f4f6';
  const borderCol = dark ? '#2e2c29' : '#e5e7eb';
  const textColor = dark ? '#d1d5db' : '#4b5563';
  const inputBg = dark ? '#11100f' : '#ffffff';

  return (
    <div
      className={`browser-frame-container ${className}`}
      style={{
        borderRadius: '12px',
        overflow: 'hidden',
        border: `1px solid ${borderCol}`,
        boxShadow: '0 18px 40px -10px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.04)',
        backgroundColor: dark ? '#121110' : '#ffffff',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Browser Chrome Header */}
      <div
        style={{
          backgroundColor: bgHeader,
          borderBottom: `1px solid ${borderCol}`,
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          userSelect: 'none',
        }}
      >
        {/* macOS window dots */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444', display: 'inline-block' }} />
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f59e0b', display: 'inline-block' }} />
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }} />
        </div>

        {/* Address Bar */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            backgroundColor: inputBg,
            border: `1px solid ${borderCol}`,
            borderRadius: '6px',
            padding: '3px 12px',
            fontSize: '0.75rem',
            color: textColor,
            fontFamily: "'IBM Plex Mono', 'SF Mono', Consolas, monospace",
            letterSpacing: '-0.01em',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          <Lock size={11} color="#10b981" style={{ flexShrink: 0 }} />
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{url}</span>
        </div>

        {/* External indicator */}
        <div style={{ color: textColor, opacity: 0.5, flexShrink: 0 }}>
          <ExternalLink size={13} />
        </div>
      </div>

      {/* Browser Viewport Content */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  );
}
