'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// This would normally come from a database
const initialPosts = [
  {
    id: 'getting-started-with-nextjs-14',
    title: 'Getting Started with Next.js 14',
    excerpt: 'A comprehensive guide to building modern web applications with Next.js 14, covering the latest features and best practices.',
    date: '2024-12-15',
    category: 'Programming',
    readTime: '8 min read',
    featured: true,
    published: true
  },
  {
    id: 'why-im-learning-typescript',
    title: 'Why I\'m Learning TypeScript',
    excerpt: 'My journey into TypeScript and how it\'s improving my code quality and development experience.',
    date: '2024-12-10',
    category: 'Programming',
    readTime: '5 min read',
    featured: false,
    published: true
  },
  {
    id: 'building-personal-brand-as-developer',
    title: 'Building a Personal Brand as a Developer',
    excerpt: 'Strategies for creating content, sharing knowledge, and building a presence in the tech community.',
    date: '2024-12-05',
    category: 'Career',
    readTime: '6 min read',
    featured: false,
    published: true
  }
];

export default function PostsAdmin() {
  const [posts, setPosts] = useState(initialPosts);
  const [subscribers, setSubscribers] = useState<string[]>([]);
  const [subscriberCount, setSubscriberCount] = useState(0);

  useEffect(() => {
    // Fetch subscribers
    fetch('/api/subscribe')
      .then(res => res.json())
      .then(data => {
        setSubscribers(data.subscribers || []);
        setSubscriberCount(data.count || 0);
      })
      .catch(err => console.error('Error fetching subscribers:', err));
  }, []);

  const toggleFeatured = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, featured: !post.featured }
        : post
    ));
  };

  const togglePublished = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, published: !post.published }
        : post
    ));
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Admin Dashboard</h1>
        <p>Manage your blog posts and newsletter subscribers.</p>
      </header>

      {/* Newsletter Stats */}
      <section className="admin-section">
        <h2>Newsletter Subscribers</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Subscribers</h3>
            <p className="stat-number">{subscriberCount}</p>
          </div>
          <div className="stat-card">
            <h3>Recent Subscribers</h3>
            <div className="subscriber-list">
              {subscribers.slice(-5).map((email, index) => (
                <div key={index} className="subscriber-item">
                  {email}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Management */}
      <section className="admin-section">
        <div className="section-header">
          <h2>Blog Posts</h2>
          <Link href="/admin" className="cta-button">
            Create New Post
          </Link>
        </div>

        <div className="posts-table">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Date</th>
                <th>Featured</th>
                <th>Published</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map(post => (
                <tr key={post.id}>
                  <td>
                    <div className="post-title">
                      <strong>{post.title}</strong>
                      <p className="post-excerpt">{post.excerpt}</p>
                    </div>
                  </td>
                  <td>
                    <span className="category-badge">{post.category}</span>
                  </td>
                  <td>{new Date(post.date).toLocaleDateString()}</td>
                  <td>
                    <button
                      onClick={() => toggleFeatured(post.id)}
                      className={`toggle-button ${post.featured ? 'active' : ''}`}
                    >
                      {post.featured ? '✓' : '✗'}
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => togglePublished(post.id)}
                      className={`toggle-button ${post.published ? 'active' : ''}`}
                    >
                      {post.published ? '✓' : '✗'}
                    </button>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <Link href={`/blog/${post.id}`} className="action-button">
                        View
                      </Link>
                      <button className="action-button">Edit</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="admin-section">
        <h2>Quick Actions</h2>
        <div className="quick-actions">
          <Link href="/admin" className="action-card">
            <h3>Create New Post</h3>
            <p>Add a new blog post using the form</p>
          </Link>
          <Link href="/blog" className="action-card">
            <h3>View Blog</h3>
            <p>See how your blog looks to visitors</p>
          </Link>
          <a href="/api/subscribe" target="_blank" className="action-card">
            <h3>Export Subscribers</h3>
            <p>Download your newsletter subscribers</p>
          </a>
        </div>
      </section>
    </div>
  );
}
