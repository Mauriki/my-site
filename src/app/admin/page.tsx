'use client';
import React, { useState } from 'react';

export default function AdminPage() {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    excerpt: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    category: 'Programming',
    readTime: '5 min read',
    author: 'Maurik',
    featured: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate the code to copy
    const postCode = `
// Add this to src/app/blog/[slug]/page.tsx in the blogPosts array:
{
  id: '${formData.id}',
  title: '${formData.title}',
  excerpt: '${formData.excerpt}',
  content: \`${formData.content}\`,
  date: '${formData.date}',
  category: '${formData.category}',
  readTime: '${formData.readTime}',
  author: '${formData.author}',
  featured: ${formData.featured}
},

// Also add this to src/app/blog/page.tsx in the blogPosts array:
{
  id: '${formData.id}',
  title: '${formData.title}',
  excerpt: '${formData.excerpt}',
  date: '${formData.date}',
  category: '${formData.category}',
  readTime: '${formData.readTime}',
  featured: ${formData.featured}
},
`;

    // Copy to clipboard
    navigator.clipboard.writeText(postCode);
    alert('Post code copied to clipboard! Paste it into the blog files.');
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Blog Post Creator</h1>
        <p>Create new blog posts easily with this form.</p>
      </header>

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-group">
          <label htmlFor="id">Post ID (URL slug):</label>
          <input
            type="text"
            id="id"
            value={formData.id}
            onChange={(e) => setFormData({...formData, id: e.target.value})}
            placeholder="my-new-post"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            placeholder="My New Blog Post"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="excerpt">Excerpt:</label>
          <textarea
            id="excerpt"
            value={formData.excerpt}
            onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
            placeholder="Brief description of your post..."
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content (HTML):</label>
          <textarea
            id="content"
            value={formData.content}
            onChange={(e) => setFormData({...formData, content: e.target.value})}
            placeholder="&lt;p&gt;Your blog post content here...&lt;/p&gt;"
            rows={10}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <option value="Programming">Programming</option>
              <option value="Career">Career</option>
              <option value="Technology">Technology</option>
              <option value="Lifestyle">Lifestyle</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="readTime">Read Time:</label>
            <input
              type="text"
              id="readTime"
              value={formData.readTime}
              onChange={(e) => setFormData({...formData, readTime: e.target.value})}
              placeholder="5 min read"
              required
            />
          </div>
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({...formData, featured: e.target.checked})}
            />
            Feature this post on the blog page
          </label>
        </div>

        <button type="submit" className="submit-button">
          Generate Post Code
        </button>
      </form>

      <div className="instructions">
        <h3>How to Use:</h3>
        <ol>
          <li>Fill out the form above</li>
          <li>Click "Generate Post Code"</li>
          <li>The code will be copied to your clipboard</li>
          <li>Paste it into the blog files (see instructions below)</li>
        </ol>

        <h3>Files to Update:</h3>
        <ul>
          <li><code>src/app/blog/[slug]/page.tsx</code> - Add to blogPosts array</li>
          <li><code>src/app/blog/page.tsx</code> - Add to blogPosts array</li>
          <li><code>src/app/page.tsx</code> - Add to homepage blog section</li>
        </ul>
      </div>
    </div>
  );
}
