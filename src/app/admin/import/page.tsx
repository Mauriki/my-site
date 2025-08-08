'use client';
import React, { useState } from 'react';

export default function ImportPage() {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    category: 'Programming',
    readTime: '5 min read',
    hashnodeUrl: ''
  });

  const [generatedCode, setGeneratedCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate the code to copy
    const postCode = `
// Add this to src/app/blog/[slug]/page.tsx in the blogPosts array:
{
  id: '${formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}',
  title: '${formData.title}',
  excerpt: '${formData.excerpt}',
  content: \`${formData.content}\`,
  date: '${formData.date}',
  category: '${formData.category}',
  readTime: '${formData.readTime}',
  author: 'Maurik',
  featured: false
},

// Also add this to src/app/blog/page.tsx in the blogPosts array:
{
  id: '${formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}',
  title: '${formData.title}',
  excerpt: '${formData.excerpt}',
  date: '${formData.date}',
  category: '${formData.category}',
  readTime: '${formData.readTime}',
  featured: false
},
`;

    setGeneratedCode(postCode);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    alert('Code copied to clipboard!');
  };

  const formatContent = (content: string) => {
    // Convert Hashnode content to HTML
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold text
      .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic text
      .replace(/^### (.*$)/gim, '<h3>$1</h3>') // H3 headers
      .replace(/^## (.*$)/gim, '<h2>$1</h2>') // H2 headers
      .replace(/^# (.*$)/gim, '<h1>$1</h1>') // H1 headers
      .replace(/^\- (.*$)/gim, '<li>$1</li>') // List items
      .replace(/\n\n/g, '</p><p>') // Paragraphs
      .replace(/^/g, '<p>') // Start paragraph
      .replace(/$/g, '</p>'); // End paragraph
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value;
    setFormData({...formData, content: formatContent(content)});
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Import Hashnode Post</h1>
        <p>Easily import your Hashnode posts to your website.</p>
      </header>

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-group">
          <label htmlFor="title">Post Title:</label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            placeholder="Your Hashnode post title"
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
          <label htmlFor="content">Hashnode Content (Markdown):</label>
          <textarea
            id="content"
            onChange={handleContentChange}
            placeholder="Paste your Hashnode post content here (markdown format)..."
            rows={15}
            required
          />
          <small>Paste your Hashnode content in markdown format. It will be automatically converted to HTML.</small>
        </div>

        <div className="form-group">
          <label htmlFor="hashnodeUrl">Hashnode URL (Optional):</label>
          <input
            type="url"
            id="hashnodeUrl"
            value={formData.hashnodeUrl}
            onChange={(e) => setFormData({...formData, hashnodeUrl: e.target.value})}
            placeholder="https://hashnode.com/post/..."
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

        <button type="submit" className="submit-button">
          Generate Import Code
        </button>
      </form>

      {generatedCode && (
        <div className="generated-code">
          <h3>Generated Code</h3>
          <p>Copy this code and paste it into your blog files:</p>
          <pre>
            <code>{generatedCode}</code>
          </pre>
          <button onClick={copyToClipboard} className="cta-button">
            Copy to Clipboard
          </button>
        </div>
      )}

      <div className="instructions">
        <h3>How to Import Your Hashnode Posts:</h3>
        <ol>
          <li>Go to your Hashnode post</li>
          <li>Copy the title and content</li>
          <li>Paste them into the form above</li>
          <li>Click "Generate Import Code"</li>
          <li>Copy the generated code</li>
          <li>Paste it into your blog files</li>
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
