'use client';

import React from "react";

// Blog posts data
const blogPosts = [
  {
    id: 1,
    title: "How I Built My Custom Notion Template",
    excerpt:
      "A walkthrough of my thought process, tools, and design decisions in creating a powerful productivity template.",
    date: "July 24, 2025",
    link: "https://maurik.gumroad.com/l/zdwgwb", // Your Gumroad Notion template link here
  },
  {
    id: 2,
    title: "5 Tips for Writing Clean, Maintainable Code",
    excerpt:
      "Best practices that keep your codebase healthy and easy to work with, even on complex projects.",
    date: "July 18, 2025",
    link: "#",
  },
  {
    id: 3,
    title: "Why I Cut Sugar for 30 Days and What Happened",
    excerpt:
      "My personal experiment with cutting sugar and the surprising effects it had on my energy and focus.",
    date: "July 10, 2025",
    link: "#",
  },
];

// Social links with SVG icons (YouTube, Twitter, Instagram, TikTok)
const socialLinks = [
  {
    href: "https://www.youtube.com/@MaurikMunir",
    label: "YouTube",
    svg: (
      <svg
        aria-hidden="true"
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M23.499 6.203a2.827 2.827 0 0 0-1.984-2c-1.752-.472-8.763-.472-8.763-.472s-7.01 0-8.763.472a2.827 2.827 0 0 0-1.984 2A29.94 29.94 0 0 0 0 12a29.94 29.94 0 0 0 .005 5.797 2.826 2.826 0 0 0 1.984 2c1.753.473 8.763.473 8.763.473s7.01 0 8.763-.473a2.826 2.826 0 0 0 1.984-2A29.94 29.94 0 0 0 24 12a29.94 29.94 0 0 0-.501-5.797zM9.545 15.568v-7.14l6.18 3.57-6.18 3.57z" />
      </svg>
    ),
  },
  {
    href: "https://x.com/MaurikMunir",
    label: "Twitter",
    svg: (
      <svg
        aria-hidden="true"
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M23 3a10.9 10.9 0 0 1-3.14.86 4.48 4.48 0 0 0 1.96-2.46 10.86 10.86 0 0 1-3.47 1.33 4.52 4.52 0 0 0-7.7 4.13A12.85 12.85 0 0 1 1.64 2.16a4.52 4.52 0 0 0 1.4 6.05 4.42 4.42 0 0 1-2.05-.56v.06a4.52 4.52 0 0 0 3.63 4.43 4.52 4.52 0 0 1-2.04.08 4.53 4.53 0 0 0 4.22 3.14A9.05 9.05 0 0 1 0 19.54a12.8 12.8 0 0 0 6.93 2.03c8.32 0 12.87-6.9 12.87-12.87 0-.2 0-.42-.02-.63A9.22 9.22 0 0 0 23 3z" />
      </svg>
    ),
  },
  {
    href: "https://www.instagram.com/maurikmunir/",
    label: "Instagram",
    svg: (
      <svg
        aria-hidden="true"
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 2A3.75 3.75 0 0 0 4 7.75v8.5A3.75 3.75 0 0 0 7.75 20h8.5a3.75 3.75 0 0 0 3.75-3.75v-8.5A3.75 3.75 0 0 0 16.25 4h-8.5zm8.75 2.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10z" />
      </svg>
    ),
  },
  {
    href: "https://www.tiktok.com/@maurik.munir",
    label: "TikTok",
    svg: (
      <svg
        aria-hidden="true"
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M17.564 3h-1.565a5.158 5.158 0 0 1-2.868-1.148v10.165a5.6 5.6 0 1 1-2.054-4.264V16a7.953 7.953 0 1 0 5.717-13z" />
      </svg>
    ),
  },
];

export default function HomePage() {
  return (
    <>
      <main className="max-w-4xl mx-auto px-6 py-16 font-sans text-gray-900">
        {/* HERO */}
        <section className="mb-16 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Maurik — Software Engineer & Creator
          </h1>
          <p className="text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            Building clean, minimal, and meaningful digital experiences. Sharing
            my journey, tools, and tips along the way.
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
            <a
              href="https://www.youtube.com/@MaurikMunir"
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              Watch My Demo
            </a>
            <a
              href="https://maurik.gumroad.com/l/zdwgwb"
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
            >
              Explore My Notion Template
            </a>
          </div>
        </section>

        {/* NOTION TEMPLATE EMBED */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-4 text-center">My Custom Notion Template</h2>
          <p className="max-w-xl mx-auto mb-6 text-center leading-relaxed">
            I designed a powerful Notion workspace to organize projects, tasks, and ideas efficiently. Check it out below.
          </p>
          <div className="notion-embed-wrapper max-w-3xl mx-auto rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://gumroad.com/l/zdwgwb"
              frameBorder="0"
              allowFullScreen
              title="Notion Template Preview"
              className="w-full h-[480px]"
            ></iframe>
          </div>
          <div className="text-center mt-4">
            <a
              href="https://maurik.gumroad.com/l/zdwgwb"
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              Open Notion Template
            </a>
          </div>
        </section>

        {/* BLOG POSTS */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Latest Blog Posts</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {blogPosts.map(({ id, title, excerpt, date, link }) => (
              <article
                key={id}
                className="post-card p-6 border border-gray-200 rounded-lg hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="mb-4 text-gray-700">{excerpt}</p>
                <time className="block mb-4 text-sm text-gray-500">{date}</time>
                <a
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Read more →
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* NEWSLETTER SUBSCRIBE */}
        <section className="mb-16 max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">Subscribe to My Newsletter</h2>
          <p className="mb-6">
            Get updates, tutorials, and exclusive content delivered right to your inbox.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thanks for subscribing! (This is just a demo)");
            }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <input
              type="email"
              placeholder="Your email address"
              required
              aria-label="Email address"
              className="border border-gray-300 rounded px-4 py-3 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              type="submit"
              className="btn-primary px-6 py-3 rounded font-semibold"
            >
              Subscribe
            </button>
          </form>
        </section>

        {/* SOCIAL LINKS */}
        <section className="mb-16 max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">Find Me on Social Media</h2>
          <div className="flex justify-center gap-8 text-gray-700 text-2xl">
            {socialLinks.map(({ href, label, svg }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="hover:text-blue-600 transition"
              >
                {svg}
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="text-center py-8 border-t border-gray-200 text-gray-600">
        &copy; {new Date().getFullYear()} Maurik. All rights reserved.
      </footer>

      <style jsx>{`
        .btn-primary {
          background-color: #1d4ed8; /* Blue 700 */
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 600;
          text-decoration: none;
          display: inline-block;
          transition: background-color 0.3s ease;
        }
        .btn-primary:hover {
          background-color: #2563eb; /* Blue 600 */
        }
        .btn-secondary {
          background-color: transparent;
          color: #1d4ed8;
          padding: 0.75rem 1.5rem;
          border: 2px solid #1d4ed8;
          border-radius: 0.5rem;
          font-weight: 600;
          text-decoration: none;
          display: inline-block;
          transition: background-color 0.3s ease, color 0.3s ease;
        }
        .btn-secondary:hover {
          background-color: #1d4ed8;
          color: white;
        }
      `}</style>
    </>
  );
}
