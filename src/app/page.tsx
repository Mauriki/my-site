'use client';
import React, { useState } from 'react';

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
        <h1>Maurik Munir</h1>
        <p>
          I'm a programmer passionate about learning new technologies and building innovative solutions. 
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
          <img src="/x-logo.svg" alt="X" />
          X (Twitter)
        </a>
        <a href="https://www.youtube.com/@MaurikMunir" target="_blank" rel="noopener noreferrer" className="social-link">
          <img src="/youtube-logo.svg" alt="YouTube" />
          YouTube
        </a>
        <a href="https://www.tiktok.com/@MaurikMunir" target="_blank" rel="noopener noreferrer" className="social-link">
          <img src="/tiktok-logo.svg" alt="TikTok" />
          TikTok
        </a>
      </div>

      {/* About Section */}
      <section id="about" className="section">
        <h2>About Me</h2>
        <p>
          I'm a dedicated programmer who loves exploring new technologies and sharing knowledge with the community. 
          My journey in tech has been driven by curiosity and a desire to solve real-world problems through code.
        </p>
        <p>
          When I'm not coding, you'll find me creating content on YouTube, sharing insights on X, 
          or experimenting with the latest programming trends. I believe in continuous learning and 
          helping others grow in their tech journey.
        </p>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section">
        <h2>Projects</h2>
        <p>Here are some of the projects I've been working on:</p>
        
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
            <h3><a href="#">Why I'm Learning TypeScript</a></h3>
            <p>My journey into TypeScript and how it's improving my code quality and development experience.</p>
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
        <p>&copy; 2024 Maurik Munir. Built with Next.js and ❤️</p>
      </footer>
    </div>
  );
}