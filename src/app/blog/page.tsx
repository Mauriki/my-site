import Link from 'next/link';

// Blog post data - this is where you'll add new posts
const blogPosts = [
  {
    id: 'getting-started-with-nextjs-14',
    title: 'Getting Started with Next.js 14',
    excerpt: 'A comprehensive guide to building modern web applications with Next.js 14, covering the latest features and best practices.',
    date: '2024-12-15',
    category: 'Programming',
    readTime: '8 min read',
    featured: true
  },
  {
    id: 'why-im-learning-typescript',
    title: 'Why I\'m Learning TypeScript',
    excerpt: 'My journey into TypeScript and how it\'s improving my code quality and development experience.',
    date: '2024-12-10',
    category: 'Programming',
    readTime: '5 min read',
    featured: false
  },
  {
    id: 'building-personal-brand-as-developer',
    title: 'Building a Personal Brand as a Developer',
    excerpt: 'Strategies for creating content, sharing knowledge, and building a presence in the tech community.',
    date: '2024-12-05',
    category: 'Career',
    readTime: '6 min read',
    featured: false
  },
  {
    id: 'my-hashnode-post',
    title: 'My First Hashnode Post',
    excerpt: 'This is the post I created on Hashnode that I want to show on my website.',
    date: '2024-12-18',
    category: 'Programming',
    readTime: '3 min read',
    featured: false
  }
];

export default function BlogPage() {
  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <h1>Blog</h1>
        <p>Thoughts on programming, technology, and continuous learning.</p>
      </header>

      {/* Featured Post */}
      {featuredPost && (
        <section className="featured-post">
          <div className="featured-badge">Featured</div>
          <article className="blog-post featured">
            <div className="post-meta">
              <span className="category">{featuredPost.category}</span>
              <span className="date">{new Date(featuredPost.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
              <span className="read-time">{featuredPost.readTime}</span>
            </div>
            <h2>
              <Link href={`/blog/${featuredPost.id}`}>
                {featuredPost.title}
              </Link>
            </h2>
            <p>{featuredPost.excerpt}</p>
            <Link href={`/blog/${featuredPost.id}`} className="read-more">
              Read more →
            </Link>
          </article>
        </section>
      )}

      {/* All Posts */}
      <section className="all-posts">
        <h2>All Posts</h2>
        <div className="blog-posts">
          {regularPosts.map((post) => (
            <article key={post.id} className="blog-post">
              <div className="post-meta">
                <span className="category">{post.category}</span>
                <span className="date">{new Date(post.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
                <span className="read-time">{post.readTime}</span>
              </div>
              <h3>
                <Link href={`/blog/${post.id}`}>
                  {post.title}
                </Link>
              </h3>
              <p>{post.excerpt}</p>
              <Link href={`/blog/${post.id}`} className="read-more">
                Read more →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
