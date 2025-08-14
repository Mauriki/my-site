/**
 * Blog Posts Data
 * 
 * This file contains all blog posts in a simple, manageable format.
 * Inspired by Oliur's approach - static content that's easy to update.
 */

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  readTime: string;
  featured: boolean;
  coverImage: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with Next.js 15',
    slug: 'getting-started-with-nextjs-15',
    excerpt: 'A comprehensive guide to building modern web applications with Next.js 15, covering the latest features and best practices.',
    content: `
      <h2>Why Next.js 15?</h2>
      <p>Next.js 15 brings significant improvements to the developer experience, performance, and overall capabilities of the framework. Whether you're building a personal blog like this one or a complex web application, Next.js 15 provides the tools you need to succeed.</p>
      
      <h3>Key Features</h3>
      <ul>
        <li><strong>App Router:</strong> The new routing system that makes building complex applications easier</li>
        <li><strong>Server Components:</strong> Improved performance with server-side rendering</li>
        <li><strong>TypeScript Support:</strong> First-class TypeScript support out of the box</li>
        <li><strong>Image Optimization:</strong> Automatic image optimization with the Image component</li>
      </ul>
      
      <h3>Setting Up Your First Project</h3>
      <p>Getting started with Next.js 15 is straightforward. The framework provides an excellent developer experience with hot reloading, automatic code splitting, and built-in optimizations.</p>
      
      <p>Here's how to create your first Next.js 15 project:</p>
      
      <pre><code>npx create-next-app@latest my-app --typescript --tailwind --app</code></pre>
      
      <h3>Building This Blog</h3>
      <p>This blog was built using Next.js 15 with the App Router. The static content approach makes it fast, reliable, and easy to maintain. No complex database integrations needed - just clean, simple code.</p>
      
      <h3>Next Steps</h3>
      <p>Once you have your Next.js 15 project set up, explore the documentation and start building. The framework is designed to grow with your needs, from simple static sites to complex applications.</p>
    `,
    date: '2025-01-15',
    category: 'Web Development',
    readTime: '8 min read',
    featured: true,
    coverImage: '/api/placeholder/800/400',
    tags: ['Next.js', 'React', 'Web Development', 'TypeScript']
  },
  {
    id: '2',
    title: 'Why I Switched from Notion to Static Content',
    slug: 'why-i-switched-from-notion-to-static-content',
    excerpt: 'My experience with Notion integration and why I ultimately chose a simpler, more reliable approach for my blog.',
    content: `
      <h2>The Notion Experiment</h2>
      <p>When I first started building this blog, I wanted to integrate with Notion. The idea of managing content in a familiar interface and having it automatically sync to my website was appealing. However, the reality was more complex than expected.</p>
      
      <h3>Challenges with Notion Integration</h3>
      <ul>
        <li><strong>Complex Setup:</strong> OAuth flows, token management, and API rate limits</li>
        <li><strong>Reliability Issues:</strong> API failures and inconsistent data formatting</li>
        <li><strong>Performance:</strong> Slower page loads due to API calls</li>
        <li><strong>Maintenance:</strong> Constant updates and breaking changes</li>
      </ul>
      
      <h3>The Static Content Advantage</h3>
      <p>After struggling with Notion integration, I switched to a static content approach. This decision was inspired by successful blogs like Oliur's, which use simple, reliable content management.</p>
      
      <p>Benefits of static content:</p>
      <ul>
        <li><strong>Reliability:</strong> No external dependencies or API failures</li>
        <li><strong>Performance:</strong> Instant page loads and excellent SEO</li>
        <li><strong>Simplicity:</strong> Easy to maintain and update</li>
        <li><strong>Control:</strong> Full control over content and formatting</li>
      </ul>
      
      <h3>My Current Workflow</h3>
      <p>Now I manage my blog content directly in code. While this might seem less convenient at first, it actually gives me more control and reliability. I can format content exactly how I want, add custom styling, and ensure everything works perfectly.</p>
      
      <h3>Lessons Learned</h3>
      <p>Sometimes the simplest solution is the best solution. While Notion integration seemed like a good idea, the static content approach is more reliable and gives me better control over my content.</p>
    `,
    date: '2025-01-10',
    category: 'Programming',
    readTime: '6 min read',
    featured: false,
    coverImage: '/api/placeholder/800/400',
    tags: ['Notion', 'Content Management', 'Web Development', 'Blogging']
  },
  {
    id: '3',
    title: 'Building a Personal Brand as a Developer',
    slug: 'building-a-personal-brand-as-a-developer',
    excerpt: 'Strategies for creating content, sharing knowledge, and building a presence in the tech community.',
    content: `
      <h2>Why Personal Branding Matters</h2>
      <p>In today's competitive tech landscape, having a strong personal brand can open doors to opportunities, collaborations, and career growth. Your personal brand is how you present yourself to the world and the value you provide to others.</p>
      
      <h3>Content Creation Strategy</h3>
      <p>Creating valuable content is the foundation of building a personal brand. Focus on sharing your knowledge, experiences, and insights with others in the tech community.</p>
      
      <h4>Types of Content to Create</h4>
      <ul>
        <li><strong>Blog Posts:</strong> Share your learning journey and technical insights</li>
        <li><strong>Code Examples:</strong> Provide practical solutions to common problems</li>
        <li><strong>Tutorials:</strong> Help others learn from your experiences</li>
        <li><strong>Case Studies:</strong> Showcase your projects and problem-solving approach</li>
      </ul>
      
      <h3>Consistency is Key</h3>
      <p>Building a personal brand takes time and consistency. Set realistic goals for content creation and stick to them. Whether it's one blog post per week or one per month, consistency matters more than frequency.</p>
      
      <h3>Engaging with the Community</h3>
      <p>Don't just create content - engage with others in the tech community. Comment on other blogs, participate in discussions, and share valuable insights. This helps you build relationships and expand your network.</p>
      
      <h3>Authenticity</h3>
      <p>Be authentic in your content. Share your real experiences, including failures and challenges. People connect with authenticity, and it helps build trust with your audience.</p>
      
      <h3>Measuring Success</h3>
      <p>Track your progress by monitoring engagement, feedback, and opportunities that come your way. Remember that building a personal brand is a long-term investment.</p>
    `,
    date: '2025-01-05',
    category: 'Career',
    readTime: '7 min read',
    featured: false,
    coverImage: '/api/placeholder/800/400',
    tags: ['Personal Branding', 'Career', 'Content Creation', 'Networking']
  },
  {
    id: '4',
    title: 'My Favorite Programming Tools in 2025',
    slug: 'my-favorite-programming-tools-2025',
    excerpt: 'A curated list of the tools and technologies that have made the biggest impact on my development workflow this year.',
    content: `
      <h2>Development Environment</h2>
      <p>Having the right tools can significantly improve your productivity and development experience. Here are the tools that have become essential to my workflow.</p>
      
      <h3>Code Editor: VS Code</h3>
      <p>VS Code remains my go-to editor for web development. The extensive extension ecosystem, excellent TypeScript support, and seamless Git integration make it perfect for modern development.</p>
      
      <h3>Terminal: iTerm2</h3>
      <p>iTerm2 provides a powerful terminal experience with features like split panes, search, and excellent customization options. It's become an essential part of my daily workflow.</p>
      
      <h3>Version Control: Git</h3>
      <p>Git is the foundation of modern software development. Understanding Git workflows and best practices is crucial for any developer.</p>
      
      <h2>Frontend Development</h2>
      <h3>Framework: Next.js</h3>
      <p>Next.js has revolutionized my approach to building web applications. The App Router, server components, and excellent developer experience make it my preferred framework.</p>
      
      <h3>Styling: Tailwind CSS</h3>
      <p>Tailwind CSS has changed how I think about styling. The utility-first approach and excellent documentation make it easy to build beautiful, responsive interfaces.</p>
      
      <h3>TypeScript</h3>
      <p>TypeScript has become essential for building reliable applications. The type safety and excellent IDE support help catch errors early and improve code quality.</p>
      
      <h2>Productivity Tools</h2>
      <h3>Notion</h3>
      <p>While I don't use Notion for my blog anymore, it's still excellent for project management, note-taking, and organizing ideas.</p>
      
      <h3>Figma</h3>
      <p>Figma is perfect for designing interfaces and collaborating with designers. The web-based approach and excellent collaboration features make it my preferred design tool.</p>
      
      <h3>Conclusion</h3>
      <p>These tools have significantly improved my development workflow and productivity. The key is finding tools that work well together and fit your specific needs.</p>
    `,
    date: '2024-12-28',
    category: 'Tools',
    readTime: '5 min read',
    featured: false,
    coverImage: '/api/placeholder/800/400',
    tags: ['Tools', 'Productivity', 'Development', 'VS Code', 'Next.js']
  },
  {
    id: '5',
    title: 'Learning TypeScript: My Journey and Tips',
    slug: 'learning-typescript-my-journey-and-tips',
    excerpt: 'My experience learning TypeScript and practical tips for anyone starting their TypeScript journey.',
    content: `
      <h2>Why TypeScript?</h2>
      <p>TypeScript has become the standard for building large-scale JavaScript applications. The type safety, better IDE support, and improved developer experience make it worth learning.</p>
      
      <h3>Getting Started</h3>
      <p>When I first started learning TypeScript, I was overwhelmed by the syntax and concepts. However, taking it step by step made the learning process much more manageable.</p>
      
      <h4>Start with the Basics</h4>
      <ul>
        <li><strong>Types:</strong> Learn about basic types (string, number, boolean)</li>
        <li><strong>Interfaces:</strong> Understand how to define object shapes</li>
        <li><strong>Functions:</strong> Learn to type function parameters and return values</li>
        <li><strong>Generics:</strong> Explore generic types for reusable code</li>
      </ul>
      
      <h3>Practical Tips</h3>
      <p>Here are some tips that helped me learn TypeScript effectively:</p>
      
      <h4>1. Start Small</h4>
      <p>Don't try to convert an entire project to TypeScript at once. Start with new files or small modules and gradually expand.</p>
      
      <h4>2. Use Strict Mode</h4>
      <p>Enable strict mode in your TypeScript configuration. While it might be frustrating at first, it will help you write better, more reliable code.</p>
      
      <h4>3. Leverage IDE Support</h4>
      <p>Modern IDEs like VS Code provide excellent TypeScript support. Use features like IntelliSense, error highlighting, and refactoring tools.</p>
      
      <h4>4. Practice with Real Projects</h4>
      <p>The best way to learn TypeScript is by using it in real projects. Start with small applications and gradually work on larger ones.</p>
      
      <h3>Common Challenges</h3>
      <p>Learning TypeScript comes with its challenges. Here are some common issues and how to overcome them:</p>
      
      <ul>
        <li><strong>Type Definitions:</strong> Learn to write your own type definitions for external libraries</li>
        <li><strong>Union Types:</strong> Understand how to work with union types and type guards</li>
        <li><strong>Error Messages:</strong> Don't be intimidated by TypeScript error messages - they're actually helpful once you understand them</li>
      </ul>
      
      <h3>Resources</h3>
      <p>Here are some resources that helped me learn TypeScript:</p>
      <ul>
        <li>Official TypeScript documentation</li>
        <li>TypeScript Handbook</li>
        <li>Online courses and tutorials</li>
        <li>Practice with real projects</li>
      </ul>
      
      <h3>Conclusion</h3>
      <p>Learning TypeScript has been one of the best investments in my development career. The initial learning curve is worth it for the improved code quality and developer experience.</p>
    `,
    date: '2024-12-20',
    category: 'Learning',
    readTime: '9 min read',
    featured: false,
    coverImage: '/api/placeholder/800/400',
    tags: ['TypeScript', 'Learning', 'JavaScript', 'Programming']
  }
];

// Helper function to get posts by category
export function getPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(post => post.category === category);
}

// Helper function to get featured posts
export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter(post => post.featured);
}

// Helper function to get recent posts
export function getRecentPosts(limit: number = 3): BlogPost[] {
  return blogPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

// Helper function to get all categories
export function getAllCategories(): string[] {
  return [...new Set(blogPosts.map(post => post.category))];
}

// Helper function to get all tags
export function getAllTags(): string[] {
  const allTags = blogPosts.flatMap(post => post.tags);
  return [...new Set(allTags)];
}
