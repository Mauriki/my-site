'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HomeScrollSaver } from '@/components/layout/HomeScrollSaver';

export default function PersonalWebsite() {
  const [isHovered, setIsHovered] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  return (
    <>
      <HomeScrollSaver />
      <main id="main-content" className="container home-page">
        <header className="home-hero">
          <div className="home-identity">
            <Image
              src="/maurik-profile.jpg"
              alt="Maurik"
              width={112}
              height={112}
              className="home-avatar"
              priority
            />
            <h1>Maurik</h1>
            <p className="home-lead" style={{ marginBottom: '0.5rem', lineHeight: '1.7' }}>
              I help people find what they need to do and get that thing done. After years of struggling, failing, and trying everything under the sun, I finally built a system that works. Now I am sharing everything I learned so you do not have to spend years figuring it out the hard way. You can find out more <Link href="/about" style={{ textDecoration: 'underline', color: 'inherit' }}>about me here</Link>.
            </p>
          </div>
        </header>

        <nav className="nav" aria-label="Primary">
          <a href="#work">My Work</a>
          <Link href="/find-your-direction">Find Your Direction</Link>
          <Link href="/ultimate-guide" className="nav-pill">
            Ultimate Guide
          </Link>
        </nav>

        <section id="coaching" className="coaching-section" aria-labelledby="coaching-title">
          <p className="eyebrow">Free Coaching &middot; 5 Spots</p>
          <div className="coaching-title-wrapper">
            <h2 id="coaching-title">Free Coaching Sessions</h2>
            <button
              type="button"
              className="coaching-info-btn"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => setIsLocked((prev) => !prev)}
              aria-label="Show coaching info"
            >
              i
            </button>

            <div 
              className={`coaching-popup ${isHovered || isLocked ? 'visible' : ''}`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <button
                type="button"
                className="coaching-popup-close"
                onClick={() => {
                  setIsLocked(false);
                  setIsHovered(false);
                }}
                aria-label="Close info popup"
              >
                &times;
              </button>
              <p>
                I&apos;m taking on 5 people for free coaching sessions. Three things we work on: building discipline, taking control over your life using tools like calendars, journaling, note-taking apps, and to-do lists, and finding your direction - a clear vision for what you&apos;re working towards. Apply below. I read every application personally.
              </p>
            </div>
          </div>
          <div className="coaching-action">
            <a
              href="https://forms.gle/H92c12huCVLQSqW6A"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Apply for a Session &rarr;
            </a>
            <p className="coaching-subtext">
              Free. I personally read every application.
            </p>
          </div>
        </section>

        <section className="newsletter-embed" aria-label="Articles newsletter signup">
          <div className="newsletter-copy">
            <p className="eyebrow">Articles</p>
            <h2>Ideas for clarity, intention, and systems.</h2>
            <p>
              I write and share ideas that help people think more clearly, live with
              more intention, and build systems that actually work.
            </p>
          </div>
          <div className="newsletter-frame-wrap">
            <form
              action="https://maurikmillaku.substack.com/subscribe"
              method="get"
              target="_blank"
              className="newsletter-simple-form"
            >
              <input type="hidden" name="autoSubmit" value="true" />
              <input
                type="email"
                id="newsletter-email"
                name="email"
                placeholder="Type your email"
                className="newsletter-simple-input"
                aria-label="Email address"
                autoComplete="email"
                inputMode="email"
                required
              />
              <button type="submit" className="newsletter-simple-button">
                Subscribe
              </button>
            </form>
          </div>
        </section>



        <section id="work" className="work-section" aria-labelledby="work-title">
          <div className="work-header">
            <h2 id="work-title">My Work</h2>
          </div>
          <ul className="work-list">
            <li className="work-item work-item-featured">
              <Link href="/ultimate-guide" className="work-link">
                <span>
                  <strong>The Ultimate Guide</strong>
                  <small>Direction + execution framework to follow through</small>
                </span>
                <span className="work-tag">Featured</span>
              </Link>
            </li>
            <li className="work-item">
              <Link href="/find-your-direction" className="work-link">
                <span>
                  <strong>Find Your Direction</strong>
                  <small>A free guide to figuring out what you actually want.</small>
                </span>
                <span className="work-external">Free</span>
              </Link>
            </li>
            <li className="work-item">
              <a
                href="https://maurik.gumroad.com/l/zdwgwb"
                target="_blank"
                rel="noopener noreferrer"
                className="work-link"
              >
                <span>
                  <strong>Free Notion Template</strong>
                  <small>Free download with practical trackers</small>
                </span>
                <span className="work-external">Free</span>
              </a>
            </li>
          </ul>
        </section>

        <section className="social-panel" aria-label="Social links">
          <a
            href="https://x.com/maurikmillaku"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <span className="social-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </span>
            <span>
              <strong>X</strong>
              <small>@maurikmillaku</small>
            </span>
          </a>
          <a
            href="https://maurikmillaku.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <span className="social-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
              </svg>
            </span>
            <span>
              <strong>Substack</strong>
              <small>@maurikmillaku</small>
            </span>
          </a>
        </section>

        <footer className="footer">
          <p suppressHydrationWarning>&copy; {new Date().getFullYear()} Maurik. All rights reserved.</p>
          <div className="footer-links">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Use</Link>
          </div>
        </footer>
      </main>
    </>
  );
}
