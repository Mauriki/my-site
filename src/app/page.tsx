'use client';

import React from "react";

const blogPosts = [
  {
    id: 1,
    title: "How I Built My Custom Notion Template",
    excerpt: "A walkthrough of my thought process, tools, and design decisions in creating a powerful productivity template.",
    date: "July 24, 2025",
    link: "#",
  },
  {
    id: 2,
    title: "5 Tips for Writing Clean, Maintainable Code",
    excerpt: "Best practices that keep your codebase healthy and easy to work with, even on complex projects.",
    date: "July 18, 2025",
    link: "#",
  },
  {
    id: 3,
    title: "Why I Cut Sugar for 30 Days and What Happened",
    excerpt: "My personal experiment with cutting sugar and the surprising effects it had on my energy and focus.",
    date: "July 10, 2025",
    link: "#",
  },
];

export default function HomePage() {
  return (
    <>
      <main className="container">
        {/* HERO */}
        <section className="hero">
          <h1 className="hero-title">Maurik — Software Engineer & Creator</h1>
          <p className="hero-subtitle">
            Building clean, minimal, and meaningful digital experiences. Sharing my journey, tools, and tips along the way.
          </p>
          <div className="hero-buttons">
            <a href="#" className="btn primary">Watch My Demo</a>
            <a href="#" className="btn secondary">See My Work</a>
          </div>
        </section>

        {/* NOTION TEMPLATE */}
        <section className="notion-template">
          <h2>My Custom Notion Template</h2>
          <p>
            I designed a powerful Notion workspace to organize projects, tasks, and ideas efficiently.
            Here’s a preview—click below to explore.
          </p>
          {/* Replace iframe src below with your actual public Notion share link */}
          <div className="notion-embed-wrapper">
            <iframe
              src="https://www.notion.so/embed-placeholder"
              frameBorder="0"
              allowFullScreen
              title="Notion Template Preview"
            ></iframe>
          </div>
          <a href="#" className="btn primary mt-3">Open Notion Template</a>
        </section>

        {/* BLOG POSTS */}
        <section className="blog-posts">
          <h2>Latest Blog Posts</h2>
          <div className="posts-grid">
            {blogPosts.map(({ id, title, excerpt, date, link }) => (
              <article key={id} className="post-card">
                <h3>{title}</h3>
                <p>{excerpt}</p>
                <small>{date}</small>
                <a href={link} className="read-more">Read more →</a>
              </article>
            ))}
          </div>
        </section>

        {/* NEWSLETTER SUBSCRIBE */}
        <section className="newsletter">
          <h2>Subscribe to My Newsletter</h2>
          <p>Get updates, tutorials, and exclusive content delivered right to your inbox.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thanks for subscribing! (This is just a demo)");
            }}
          >
            <input
              type="email"
              placeholder="Your email address"
              required
              aria-label="Email address"
            />
            <button type="submit" className="btn primary">Subscribe</button>
          </form>
        </section>

        {/* SOCIAL LINKS */}
        <section className="social-links">
          <h2>Find Me on Social Media</h2>
          <div className="social-icons">
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
              🐦
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub">
              💻
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              🔗
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
              ▶️
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        &copy; {new Date().getFullYear()} Maurik. All rights reserved.
      </footer>
    </>
  );
}
