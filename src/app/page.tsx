'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function PersonalWebsite() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubscriptionStatus('idle');

    try {
      // ConvertKit API integration
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubscriptionStatus('success');
        setEmail('');
      } else {
        setSubscriptionStatus('error');
      }
    } catch {
      setSubscriptionStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

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
      <section id="blog" className="section">
        <h2>Latest Posts</h2>
        <p>Thoughts on programming, technology, and continuous learning.</p>
        
        <div className="blog-posts">
          <article className="blog-post">
            <div className="date">December 15, 2024</div>
            <h3><Link href="/blog/getting-started-with-nextjs-14">Getting Started with Next.js 14</Link></h3>
            <p>A comprehensive guide to building modern web applications with Next.js 14, covering the latest features and best practices.</p>
          </article>

          <article className="blog-post">
            <div className="date">December 10, 2024</div>
            <h3><Link href="/blog/why-im-learning-typescript">Why I&apos;m Learning TypeScript</Link></h3>
            <p>My journey into TypeScript and how it&apos;s improving my code quality and development experience.</p>
          </article>

          <article className="blog-post">
            <div className="date">December 5, 2024</div>
            <h3><Link href="/blog/building-personal-brand-as-developer">Building a Personal Brand as a Developer</Link></h3>
            <p>Strategies for creating content, sharing knowledge, and building a presence in the tech community.</p>
          </article>
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link href="/blog" className="cta-button">
            View All Posts
          </Link>
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="newsletter" className="section">
        <div className="newsletter">
          <h3>Stay Updated</h3>
          <p>
            Subscribe to my newsletter for weekly insights on programming, tech trends, and personal development. 
            No spam, just valuable content.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
            />
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
          {subscriptionStatus === 'success' && (
            <p style={{ color: 'green', marginTop: '16px', fontSize: '14px' }}>
              ✅ Thanks for subscribing! Check your email for confirmation.
            </p>
          )}
          {subscriptionStatus === 'error' && (
            <p style={{ color: 'red', marginTop: '16px', fontSize: '14px' }}>
              ❌ Something went wrong. Please try again.
            </p>
          )}
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