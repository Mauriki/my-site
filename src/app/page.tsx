'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function PersonalWebsite() {
  const [showSubscribeOnLoad] = useState(true); // set to true to show immediately

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
        <a href="#blog">Blog</a>
        <a href="#newsletter">Newsletter</a>
      </nav>

      {/* Social Links */}
      <div className="social-links">
        <a href="https://www.youtube.com/@MaurikMunir" target="_blank" rel="noopener noreferrer" className="social-link">
          <Image
            src="/YouTube Logo 2017.png"
            alt="YouTube"
            width={32}
            height={32}
            className="social-img"
            priority
          />
          YouTube
        </a>
        <a href="https://x.com/MaurikMunir" target="_blank" rel="noopener noreferrer" className="social-link">
          <Image
            src="/X Logo White Background Vector.avif"
            alt="X"
            width={32}
            height={32}
            className="social-img"
            priority
          />
          X (Twitter)
        </a>
        <a href="https://www.tiktok.com/@maurik.munir" target="_blank" rel="noopener noreferrer" className="social-link tiktok">
          <Image
            src="/TikTok Logo.png"
            alt="TikTok"
            width={32}
            height={32}
            className="social-img"
            priority
          />
          TikTok
        </a>
        <a href="https://www.fiverr.com/s/6YWwYLB" target="_blank" rel="noopener noreferrer" className="social-link">
          <Image
            src="/Fiverr Logo.png"
            alt="Fiverr"
            width={32}
            height={32}
            className="social-img"
            priority
          />
          Fiverr
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

      {/* Projects Section */}
      <section id="projects" className="section" style={{ marginBottom: '3.5rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1.2rem' }}>Projects</h2>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li style={{ marginBottom: '1.2rem' }}>
            <a
              href="#"
              style={{
                fontSize: '1.15rem',
                fontWeight: 600,
                color: '#0070f3',
                textDecoration: 'none',
                transition: 'color 0.18s',
              }}
              onMouseOver={e => (e.currentTarget.style.color = '#0051a3')}
              onMouseOut={e => (e.currentTarget.style.color = '#0070f3')}
            >
              Example Project (coming soon)
            </a>
          </li>
          {/* Add more project links here in the future */}
        </ul>
      </section>

      {/* Notion Templates Section */}
      <section id="notion-templates" className="section" style={{ marginBottom: '3.5rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1.2rem' }}>Notion Templates</h2>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li style={{ marginBottom: '1.2rem' }}>
            <a
              href="https://maurik.gumroad.com/l/zdwgwb?_gl=1*13lfz2a*_ga*ODc0NDk4MTk1LjE3MzkwMjM4MzA.*_ga_6LJN6D94N6*czE3NTQ2NTg1NDgkbzE3JGcxJHQxNzU0NjU5MDk0JGo1NCRsMCRoMA.."
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '1.15rem',
                fontWeight: 600,
                color: '#0070f3',
                textDecoration: 'none',
                transition: 'color 0.18s',
              }}
              onMouseOver={e => (e.currentTarget.style.color = '#0051a3')}
              onMouseOut={e => (e.currentTarget.style.color = '#0070f3')}
            >
              Minimal Course & Lecture template
            </a>
          </li>
          {/* Add more Notion template links here in the future */}
        </ul>
      </section>

      {/* Blog Section */}
      <section id="blog" className="section" style={{ marginBottom: '3.5rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1.2rem' }}>Blog</h2>
        <p style={{ color: '#666', marginBottom: '1rem' }}>Blog coming soon.</p>
        <div style={{ marginTop: '0.6rem' }}>
          <a href="#" style={{ color: '#0070f3', textDecoration: 'none', fontWeight: 600 }}>Read updates (coming soon)</a>
        </div>
      </section>

      {/* Newsletter Section - REPLACED with inline Substack embed */}
      <section id="newsletter" className="section" style={{ marginTop: '2.5rem' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center', padding: '1rem' }}>
          <h3 style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>The Manual — Newsletter</h3>
          <p style={{ color: '#666', marginBottom: '1rem' }}>
            Subscribe for short notes, updates and exclusive resources.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.6rem' }}>
            <div style={{ width: '100%', maxWidth: 560 }}>
              <iframe
                src="https://maurik.substack.com/embed"
                title="Subscribe to Maurik on Substack"
                style={{
                  width: '100%',
                  height: 320,
                  border: '1px solid #EEE',
                  background: '#fff',
                  borderRadius: 8,
                }}
                frameBorder="0"
                scrolling="no"
              />
            </div>
          </div>

          <p style={{ color: '#888', fontSize: 13 }}>
            By subscribing you agree to the <Link href="/privacy"><a style={{ color: '#0070f3' }}>Privacy Policy</a></Link>.
          </p>
        </div>
      </section>

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