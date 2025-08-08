# Blog Management Guide

## How to Add New Blog Posts

### Step 1: Add Post Data
Open `src/app/blog/[slug]/page.tsx` and add your new post to the `blogPosts` array:

```javascript
{
  id: 'your-post-slug',
  title: 'Your Post Title',
  excerpt: 'A brief description of your post...',
  content: `
    <p>Your blog post content goes here...</p>
    
    <h2>Section Title</h2>
    <p>More content...</p>
    
    <ul>
      <li>List item 1</li>
      <li>List item 2</li>
    </ul>
  `,
  date: '2024-12-20',
  category: 'Programming',
  readTime: '5 min read',
  author: 'Maurik',
  featured: false // Set to true to feature this post
}
```

### Step 2: Update Blog List
Open `src/app/blog/page.tsx` and add the same post data to the `blogPosts` array there.

### Step 3: Update Homepage
Open `src/app/page.tsx` and add your post to the blog section on the homepage.

## Post Structure Guidelines

### Required Fields:
- `id`: URL slug (e.g., 'my-new-post')
- `title`: Post title
- `excerpt`: Brief description
- `content`: Full post content in HTML
- `date`: Publication date (YYYY-MM-DD)
- `category`: Post category
- `readTime`: Estimated reading time
- `author`: Your name

### Optional Fields:
- `featured`: Set to `true` to feature on blog page

## Content Formatting

### HTML Tags You Can Use:
- `<h2>`, `<h3>` for headings
- `<p>` for paragraphs
- `<ul>`, `<li>` for lists
- `<strong>` for bold text
- `<pre><code>` for code blocks
- `<a href="">` for links

### Example Post Structure:
```html
<p>Introduction paragraph...</p>

<h2>Main Section</h2>
<p>Content for this section...</p>

<ul>
  <li><strong>Key Point:</strong> Description</li>
  <li><strong>Another Point:</strong> Description</li>
</ul>

<h2>Code Example</h2>
<pre><code>console.log('Hello World');</code></pre>
```

## URL Structure
Your posts will be available at:
- Blog list: `/blog`
- Individual post: `/blog/your-post-slug`

## Future Automation
To make this even easier, you could:
1. Create a simple admin interface
2. Use a headless CMS like Contentful or Strapi
3. Store posts in markdown files
4. Use a database for dynamic content

## Newsletter Integration
The newsletter is already integrated with ConvertKit. You just need to:
1. Get your Form ID from ConvertKit dashboard
2. Replace `YOUR_FORM_ID` in `src/app/api/subscribe/route.ts`
3. Test the subscription form

## SEO Optimization
Each post automatically includes:
- Proper heading structure
- Meta descriptions (excerpt)
- Social sharing buttons
- Clean URLs
- Responsive design
