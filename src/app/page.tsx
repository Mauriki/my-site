'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
// Replaced SupascribeEmbed with a direct Substack iframe to avoid loading external Supascribe loader

export default function PersonalWebsite() {
  // Subscription UI removed per request

  return (
    <div className="container">
      {/* Header */}
      <header
        className="header"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
          marginBottom: '2.5rem',
        }}
      >
        <Image
          src="/1000030440-modified.png"
          alt="Maurik Logo"
          width={100}
          height={100}
          style={{
            borderRadius: '50%',
            boxShadow: '0 6px 24px rgba(0,0,0,0.12)',
            border: '4px solid #fff',
            background: '#f3f3f3',
            objectFit: 'cover',
          }}
          priority
        />
        <h1
          style={{
            margin: 0,
            fontSize: '3rem',
            fontWeight: 700,
            letterSpacing: '-1px',
            lineHeight: 1.1,
          }}
        >
          Maurik
        </h1>
      </header>

      {/* Navigation */}
      <nav className="nav">
        <a href="#about" className="active">About</a>
        <a href="#projects">My Work</a>
      </nav>

      {/* Social Links */}
      <div className="social-links">
        <a href="https://x.com/maurikcreates" target="_blank" rel="noopener noreferrer" className="social-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '6px' }}>
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          X
        </a>
        <a href="https://substack.com/@maurikcreates" target="_blank" rel="noopener noreferrer" className="social-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '6px' }}>
            <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
          </svg>
          Substack
        </a>
      </div>

      {/* About Section */}
      <section id="about" className="section">
        <h2>About Me</h2>
        <p>
          I began my journey into programming during my first year at university, initially without a clear idea of what programming entailed.
          Over time, I discovered my passion for coding, driven by the desire to create useful and innovative solutions.
        </p>
        <p>
          Although I dropped out of university, I&apos;ve been self-learning and building my skills independently.
          I&apos;ve created a Notion template and a simple web component using HTML, CSS, and JavaScript.
          My ultimate goal is to develop applications that people find genuinely helpful and that offer better features at more affordable prices.
        </p>
      </section>

      {/* Work Section */}
      <section id="work" className="work-section">
        <h2>Work</h2>
        <ul className="work-list">
          <li className="work-item">
            <Link href="/course" className="work-link">
              The Ultimate Guide Course
            </Link>
          </li>
          <li className="work-item">
            <a
              href="https://maurik.gumroad.com/l/zdwgwb"
              target="_blank"
              rel="noopener noreferrer"
              className="work-link"
            >
              Course Notion Template
            </a>
          </li>
        </ul>
      </section>

      {/* Posts section removed */}

      {/* Newsletter / subscribe removed */}

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 Maurik. Built with Next.js and ❤️</p>
        <div style={{ marginTop: '16px', fontSize: '14px' }}>
          <Link href="/privacy" style={{ marginRight: '20px', color: '#666', textDecoration: 'none' }}>
            Privacy Policy
          </Link>
          <Link href="/terms" style={{ color: '#666', textDecoration: 'none' }}>
            Terms of Use
          </Link>
        </div>
      </footer>
    </div>
  );
}