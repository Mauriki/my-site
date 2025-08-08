import Link from 'next/link';
import { notFound } from 'next/navigation';

// Blog post data - this is where you'll add new posts
const blogPosts = [
  {
    id: 'getting-started-with-nextjs-14',
    title: 'Getting Started with Next.js 14',
    excerpt: 'A comprehensive guide to building modern web applications with Next.js 14, covering the latest features and best practices.',
    content: `
      <p>Next.js 14 represents a significant leap forward in the React framework ecosystem. With its new App Router, improved performance, and enhanced developer experience, it's become the go-to choice for building modern web applications.</p>
      
      <h2>What's New in Next.js 14</h2>
      <p>The latest version introduces several groundbreaking features that make development faster and more efficient:</p>
      
      <ul>
        <li><strong>App Router:</strong> A new file-system based router that's more intuitive and powerful</li>
        <li><strong>Server Components:</strong> React components that run on the server for better performance</li>
        <li><strong>Streaming:</strong> Progressive rendering for faster page loads</li>
        <li><strong>Improved TypeScript Support:</strong> Better type safety and developer experience</li>
      </ul>
      
      <h2>Getting Started</h2>
      <p>To create a new Next.js 14 project, run:</p>
      
      <pre><code>npx create-next-app@latest my-app --typescript --tailwind --app</code></pre>
      
      <p>This command will set up a new project with TypeScript, Tailwind CSS, and the new App Router structure.</p>
      
      <h2>Key Benefits</h2>
      <p>Next.js 14 offers several advantages over previous versions:</p>
      
      <ul>
        <li>Faster development with hot reloading</li>
        <li>Better SEO with server-side rendering</li>
        <li>Automatic code splitting for optimal performance</li>
        <li>Built-in API routes for backend functionality</li>
      </ul>
      
      <p>Whether you're building a personal blog, e-commerce site, or enterprise application, Next.js 14 provides the tools and performance you need to create exceptional user experiences.</p>
    `,
    date: '2024-12-15',
    category: 'Programming',
    readTime: '8 min read',
    author: 'Maurik'
  },
  {
    id: 'why-im-learning-typescript',
    title: 'Why I\'m Learning TypeScript',
    excerpt: 'My journey into TypeScript and how it\'s improving my code quality and development experience.',
    content: `
      <p>TypeScript has been a game-changer in my programming journey. As someone who started with JavaScript, the transition to TypeScript has been both challenging and rewarding.</p>
      
      <h2>The Learning Curve</h2>
      <p>When I first encountered TypeScript, I was intimidated by the type system. Coming from JavaScript, where everything was flexible and dynamic, the idea of defining types seemed restrictive. However, I quickly realized that this "restriction" was actually a superpower.</p>
      
      <h2>Benefits I've Experienced</h2>
      <ul>
        <li><strong>Fewer Bugs:</strong> TypeScript catches errors at compile time that would only surface at runtime in JavaScript</li>
        <li><strong>Better IDE Support:</strong> Enhanced autocomplete and refactoring capabilities</li>
        <li><strong>Improved Code Documentation:</strong> Types serve as living documentation</li>
        <li><strong>Better Team Collaboration:</strong> Clear interfaces make code easier to understand and maintain</li>
      </ul>
      
      <h2>My Learning Strategy</h2>
      <p>I started by gradually adding TypeScript to existing JavaScript projects. This incremental approach allowed me to learn without overwhelming myself. I began with simple type annotations and gradually moved to more advanced features like generics and utility types.</p>
      
      <p>TypeScript has made me a more confident developer. The safety net it provides allows me to refactor code with confidence and build more robust applications.</p>
    `,
    date: '2024-12-10',
    category: 'Programming',
    readTime: '5 min read',
    author: 'Maurik'
  },
  {
    id: 'building-personal-brand-as-developer',
    title: 'Building a Personal Brand as a Developer',
    excerpt: 'Strategies for creating content, sharing knowledge, and building a presence in the tech community.',
    content: `
      <p>Building a personal brand as a developer isn't just about getting more job offers—it's about creating opportunities, sharing knowledge, and making meaningful connections in the tech community.</p>
      
      <h2>Why Personal Branding Matters</h2>
      <p>In today's digital age, your online presence is often the first impression potential employers, clients, or collaborators have of you. A strong personal brand can open doors to opportunities you never knew existed.</p>
      
      <h2>My Approach to Content Creation</h2>
      <ul>
        <li><strong>Share Your Journey:</strong> Document your learning process, including both successes and failures</li>
        <li><strong>Create Valuable Content:</strong> Focus on helping others solve real problems</li>
        <li><strong>Be Consistent:</strong> Regular posting builds trust and keeps you top of mind</li>
        <li><strong>Engage with the Community:</strong> Comment on others' posts and participate in discussions</li>
      </ul>
      
      <h2>Platforms I Use</h2>
      <p>I focus on platforms where developers actually spend time:</p>
      
      <ul>
        <li><strong>Personal Blog:</strong> Deep-dive technical content and tutorials</li>
        <li><strong>YouTube:</strong> Video tutorials and coding walkthroughs</li>
        <li><strong>X (Twitter):</strong> Quick tips, industry insights, and community engagement</li>
        <li><strong>GitHub:</strong> Open source contributions and project showcases</li>
      </ul>
      
      <h2>Measuring Success</h2>
      <p>Success isn't just about follower counts. I measure my personal brand success by:</p>
      
      <ul>
        <li>Meaningful connections made</li>
        <li>Knowledge shared and questions answered</li>
        <li>Projects that inspire others</li>
        <li>Opportunities that come from my online presence</li>
      </ul>
      
      <p>Building a personal brand is a long-term investment. It's about consistently showing up, providing value, and being authentic in everything you share.</p>
    `,
    date: '2024-12-05',
    category: 'Career',
    readTime: '6 min read',
    author: 'Maurik'
  },
  {
    id: 'my-hashnode-post',
    title: 'My First Hashnode Post',
    excerpt: 'This is the post I created on Hashnode that I want to show on my website.',
    content: `
      <p>This is the content from your Hashnode post. You can copy and paste your Hashnode content here to display it on your own website.</p>
      
      <h2>How This Works</h2>
      <p>When you write a post on Hashnode, you can copy the content and add it to your website's blog system. This way, you have the content on both platforms.</p>
      
      <h2>Benefits of This Approach</h2>
      <ul>
        <li><strong>Own Your Content:</strong> Your posts live on your own domain</li>
        <li><strong>Better SEO:</strong> Search engines index your own website</li>
        <li><strong>Custom Design:</strong> Your posts match your website's style</li>
        <li><strong>No External Dependencies:</strong> Your blog works even if Hashnode is down</li>
      </ul>
      
      <p>You can also add a link to the original Hashnode post at the bottom:</p>
      
      <div style="background: #f8f8f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Originally published on Hashnode:</strong></p>
        <a href="https://hashnode.com/post/cme2vomws000702jy3ulhhlnk" target="_blank" rel="noopener noreferrer">
          Read on Hashnode →
        </a>
      </div>
    `,
    date: '2024-12-18',
    category: 'Programming',
    readTime: '3 min read',
    author: 'Maurik'
  }
];

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find(p => p.id === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container">
      <article className="blog-post-full">
        {/* Back to Blog */}
        <Link href="/blog" className="back-link">
          ← Back to Blog
        </Link>

        {/* Post Header */}
        <header className="post-header">
          <div className="post-meta">
            <span className="category">{post.category}</span>
            <span className="date">{new Date(post.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
            <span className="read-time">{post.readTime}</span>
            <span className="author">By {post.author}</span>
          </div>
          <h1>{post.title}</h1>
          <p className="excerpt">{post.excerpt}</p>
        </header>

        {/* Post Content */}
        <div 
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Post Footer */}
        <footer className="post-footer">
          <div className="share-buttons">
            <span>Share this post:</span>
            <a 
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://yourdomain.com/blog/${post.id}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-button twitter"
            >
              X (Twitter)
            </a>
            <a 
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://yourdomain.com/blog/${post.id}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-button linkedin"
            >
              LinkedIn
            </a>
          </div>
        </footer>
      </article>
    </div>
  );
}
