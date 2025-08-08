'use client';
import React, { useState } from 'react';
import Image from 'next/image';

export default function PersonalWebsite() {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the email to your newsletter service
    alert('Thanks for subscribing! Check your email for confirmation.');
    setEmail('');
  };

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <h1>Maurik</h1>
        <p>
          I&apos;m a programmer passionate about learning new technologies and building innovative solutions. 
          I share my journey through code, content creation, and continuous learning.
        </p>
      </header>

      {/* Navigation */}
      <nav className="nav">
        <a href="#about" className="active">About</a>
        <a href="#projects">Projects</a>
        <a href="#blog">Blog</a>
        <a href="#newsletter">Newsletter</a>
      </nav>

      {/* Social Links */}
      <div className="social-links">
        <a href="https://x.com/MaurikMunir" target="_blank" rel="noopener noreferrer" className="social-link">
          <Image src="/x-logo.svg" alt="X" width={20} height={20} />
          X (Twitter)
        </a>
        <a href="https://www.youtube.com/@MaurikMunir" target="_blank" rel="noopener noreferrer" className="social-link">
          <Image src="/youtube-logo.svg" alt="YouTube" width={20} height={20} />
          YouTube
        </a>
        <a href="https://www.tiktok.com/@MaurikMunir" target="_blank" rel="noopener noreferrer" className="social-link">
          <Image src="/tiktok-logo.svg" alt="TikTok" width={20} height={20} />
          TikTok
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
      <section id="projects" className="section">
        <h2>Projects</h2>
        <p>Here are some of the projects I&apos;ve been working on:</p>
        
        <div className="projects-grid">
          <div className="project-card">
            <h3>Personal Website</h3>
            <p>A modern, responsive personal website built with Next.js and TypeScript, featuring clean design and optimal performance.</p>
            <div className="project-links">
              <a href="#" target="_blank" rel="noopener noreferrer">View Live</a>
              <a href="#" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>

          <div className="project-card">
            <h3>Notion Course & Lecture Template</h3>
            <p>An all-in-one Notion template designed for students and lifelong learners to organize courses, track lectures, and streamline study workflows.</p>
            <div className="project-links">
              <a href="https://maurik.gumroad.com/l/zdwgwb?_gl=1*13lfz2a*_ga*ODc0NDk4MTk1LjE3MzkwMjM4MzA.*_ga_6LJN6D94N6*czE3NTQ2NTg1NDgkbzE3JGcxJHQxNzU0NjU5MDk0JGo1NCRsMCRoMA.." target="_blank" rel="noopener noreferrer">Get Template</a>
              <a href="#" target="_blank" rel="noopener noreferrer">Learn More</a>
            </div>
          </div>

          <div className="project-card">
            <h3>Tech Blog</h3>
            <p>A blog platform for sharing programming insights, tutorials, and tech discoveries with the developer community.</p>
            <div className="project-links">
              <a href="#" target="_blank" rel="noopener noreferrer">View Live</a>
              <a href="#" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>

          <div className="project-card">
            <h3>Learning Tracker</h3>
            <p>An application to track learning progress, set goals, and monitor skill development across different technologies.</p>
            <div className="project-links">
              <a href="#" target="_blank" rel="noopener noreferrer">View Live</a>
              <a href="#" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="section">
        <h2>Latest Posts</h2>
        <p>Thoughts on programming, technology, and continuous learning.</p>
        
        <div className="blog-posts">
          <article className="blog-post">
            <div className="date">December 15, 2024</div>
            <h3><a href="#">Getting Started with Next.js 14</a></h3>
            <p>A comprehensive guide to building modern web applications with Next.js 14, covering the latest features and best practices.</p>
          </article>

          <article className="blog-post">
            <div className="date">December 10, 2024</div>
            <h3><a href="#">Why I&apos;m Learning TypeScript</a></h3>
            <p>My journey into TypeScript and how it&apos;s improving my code quality and development experience.</p>
          </article>

          <article className="blog-post">
            <div className="date">December 5, 2024</div>
            <h3><a href="#">Building a Personal Brand as a Developer</a></h3>
            <p>Strategies for creating content, sharing knowledge, and building a presence in the tech community.</p>
          </article>
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
            />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 Maurik. Built with Next.js and ❤️</p>
      </footer>
    </div>
  );
}