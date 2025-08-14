# Maurik's Personal Website & Blog

A clean, modern personal website and blog built with Next.js 15, inspired by [Oliur's design approach](https://www.oliur.com/blog).

## 🚀 Features

- **Clean, Minimal Design** - Inspired by successful personal blogs
- **Static Blog System** - Simple, reliable content management
- **Responsive Layout** - Works perfectly on all devices
- **SEO Optimized** - Built-in meta tags and structured data
- **Fast Performance** - Static generation and optimized images
- **Newsletter Integration** - "The Manual" newsletter signup
- **Category Filtering** - Easy content organization
- **Search Functionality** - Find posts quickly

## 📁 Project Structure

```
src/
├── app/
│   ├── blog/
│   │   ├── page.tsx              # Blog listing page
│   │   └── [slug]/
│   │       └── page.tsx          # Individual blog post
│   ├── newsletter/
│   │   └── page.tsx              # Newsletter signup page
│   ├── privacy/
│   │   └── page.tsx              # Privacy policy
│   ├── terms/
│   │   └── page.tsx              # Terms of use
│   ├── api/
│   │   └── subscribe/
│   │       └── route.ts          # Newsletter API
│   ├── globals.css               # Clean, organized styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Homepage
├── data/
│   └── blog-posts.ts             # Centralized blog content
└── public/                       # Static assets
```

## 🎯 Key Design Decisions

### Why Static Content?
After experimenting with Notion integration, I chose a static content approach because:

- **Reliability** - No external API dependencies
- **Performance** - Instant page loads
- **Simplicity** - Easy to maintain and update
- **Control** - Full control over content and formatting
- **SEO** - Better search engine optimization

### Inspired by Oliur's Approach
- Clean, minimal design
- Focus on content over complexity
- Simple navigation and user experience
- High-quality typography and spacing
- Monthly newsletter for exclusive content

## 📝 Adding New Blog Posts

To add a new blog post, simply edit `src/data/blog-posts.ts`:

```typescript
{
  id: '6',
  title: 'Your New Post Title',
  slug: 'your-new-post-slug',
  excerpt: 'A brief description of your post...',
  content: `
    <h2>Your Content</h2>
    <p>Write your content in HTML format...</p>
  `,
  date: '2025-01-20',
  category: 'Programming',
  readTime: '5 min read',
  featured: false,
  coverImage: '/api/placeholder/800/400',
  tags: ['Next.js', 'React', 'Web Development']
}
```

## 🛠️ Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

## 🎨 Styling

The project uses a clean, organized CSS approach:

- **CSS Variables** - Consistent theming
- **Utility Classes** - Reusable components
- **Responsive Design** - Mobile-first approach
- **Prose Styles** - Beautiful blog content formatting

## 📧 Newsletter

The newsletter system ("The Manual") is inspired by Oliur's approach:

- Monthly exclusive content
- Personal stories and insights
- Curated resources and links
- Programming tips and techniques

## 🔧 Customization

### Colors
Update CSS variables in `src/app/globals.css`:
```css
:root {
  --primary-color: #000000;
  --secondary-color: #666666;
  --accent-color: #007AFF;
  /* ... */
}
```

### Content
- Blog posts: `src/data/blog-posts.ts`
- Homepage content: `src/app/page.tsx`
- Newsletter content: `src/app/newsletter/page.tsx`

## 🚀 Deployment

The site is optimized for deployment on Vercel:

1. Connect your GitHub repository
2. Deploy automatically on push
3. Custom domain support
4. Edge functions for API routes

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🤝 Contributing

This is a personal project, but suggestions are welcome! The focus is on:

- Clean, maintainable code
- Performance optimization
- User experience
- Content quality

## 📄 License

This project is for personal use. Feel free to use the code structure for your own projects.

---

Built with ❤️ using Next.js 15, TypeScript, and Tailwind CSS.
