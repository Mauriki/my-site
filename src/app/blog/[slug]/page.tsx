/**
 * Individual Blog Post Page
 * 
 * This page displays a single blog post fetched from your Notion database.
 * It includes SEO meta tags, table of contents, and navigation between posts.
 * The content is converted from Notion blocks to HTML for proper display.
 */

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getStoredToken } from "@/lib/notion";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  tags: string[];
  coverImage?: string;
  excerpt: string;
  content: string;
  readTime: string;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const token = getStoredToken();
    if (!token) {
      return {
        title: 'Post Not Found',
        description: 'The blog post you\'re looking for doesn\'t exist.'
      };
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/notion/sync`);
    if (!response.ok) {
      return {
        title: 'Post Not Found',
        description: 'The blog post you\'re looking for doesn\'t exist.'
      };
    }

    const data = await response.json();
    const post = data.posts.find((p: BlogPost) => p.slug === slug);

    if (!post) {
      return {
        title: 'Post Not Found',
        description: 'The blog post you\'re looking for doesn\'t exist.'
      };
    }

    return {
      title: `${post.title} | Maurik's Blog`,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: 'article',
        publishedTime: post.date,
        authors: ['Maurik'],
        tags: post.tags,
        images: post.coverImage ? [post.coverImage] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt,
        images: post.coverImage ? [post.coverImage] : [],
      },
    };
  } catch (err) {
    return {
      title: 'Post Not Found',
      description: 'The blog post you\'re looking for doesn\'t exist.'
    };
  }
}

// Generate static params for all posts
export async function generateStaticParams() {
  try {
    const token = getStoredToken();
    if (!token) return [];

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/notion/sync`);
    if (!response.ok) return [];

    const data = await response.json();
    return data.posts.map((post: BlogPost) => ({
      slug: post.slug,
    }));
  } catch (err) {
    return [];
  }
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  try {
    const token = getStoredToken();
    if (!token) {
      return (
        <div className="container">
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Notion Integration Required</h1>
            <p className="text-gray-600 mb-6">Please authorize the Notion integration to view blog posts.</p>
            <Link href="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Go Home
            </Link>
          </div>
        </div>
      );
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/notion/sync`);
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }

    const data = await response.json();
    const post = data.posts.find((p: BlogPost) => p.slug === slug);

    if (!post) {
      return (
        <div className="container">
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Post Not Found</h1>
            <p className="text-gray-600 mb-6">The blog post you&apos;re looking for doesn&apos;t exist.</p>
            <Link href="/blog" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Back to Blog
            </Link>
          </div>
        </div>
      );
    }

    // Find next and previous posts
    const currentIndex = data.posts.findIndex((p: BlogPost) => p.slug === slug);
    const nextPost = currentIndex > 0 ? data.posts[currentIndex - 1] : null;
    const prevPost = currentIndex < data.posts.length - 1 ? data.posts[currentIndex + 1] : null;

    // Generate table of contents from headings
    const toc = generateTableOfContents(post.content);

    return (
      <div className="container max-w-4xl mx-auto px-6 py-8">
        {/* Breadcrumbs */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-gray-700">Home</Link></li>
            <li><span className="mx-2">/</span></li>
            <li><Link href="/blog" className="hover:text-gray-700">Blog</Link></li>
            <li><span className="mx-2">/</span></li>
            <li className="text-gray-900">{post.title}</li>
          </ol>
        </nav>

        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Cover Image */}
          {post.coverImage && (
            <div className="relative h-64 md:h-80 bg-gray-200">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="p-8">
            {/* Post Header */}
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">{post.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                <span>•</span>
                <span>{post.readTime}</span>
                {post.tags.length > 0 && (
                  <>
                    <span>•</span>
                    <div className="flex gap-2">
                      {post.tags.map((tag: string) => (
                        <Link
                          key={tag}
                          href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                          className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs hover:bg-blue-200 transition-colors"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </div>
              {post.excerpt && (
                <p className="text-xl text-gray-600 leading-relaxed">{post.excerpt}</p>
              )}
            </header>

            {/* Table of Contents */}
            {toc.length > 0 && (
              <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Table of Contents</h2>
                <nav>
                  <ul className="space-y-2">
                    {toc.map((item, index) => (
                      <li key={index}>
                        <a
                          href={`#${item.id}`}
                          className={`text-blue-600 hover:text-blue-800 transition-colors ${
                            item.level === 3 ? 'ml-4' : ''
                          }`}
                        >
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            )}

            {/* Post Content */}
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Post Footer */}
            <footer className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">Share this post:</span>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_BASE_URL || 'https://maurik.vercel.app'}/blog/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    Twitter
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_BASE_URL || 'https://maurik.vercel.app'}/blog/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </footer>
          </div>
        </article>

        {/* Navigation */}
        <nav className="mt-12 flex justify-between items-center">
          {prevPost ? (
            <Link
              href={`/blog/${prevPost.slug}`}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="hidden sm:inline">Previous: {prevPost.title}</span>
              <span className="sm:hidden">Previous</span>
            </Link>
          ) : (
            <div></div>
          )}
          
          {nextPost ? (
            <Link
              href={`/blog/${nextPost.slug}`}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <span className="hidden sm:inline">Next: {nextPost.title}</span>
              <span className="sm:hidden">Next</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ) : (
            <div></div>
          )}
        </nav>
      </div>
    );
  } catch (err) {
    return (
      <div className="container">
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Error Loading Post</h1>
          <p className="text-gray-600 mb-6">There was an error loading this blog post.</p>
          <Link href="/blog" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }
}

// Generate table of contents from HTML content
function generateTableOfContents(content: string) {
  const headings = content.match(/<h[23][^>]*>(.*?)<\/h[23]>/g);
  if (!headings) return [];

  return headings.map((heading, index) => {
    const level = heading.charAt(2);
    const text = heading.replace(/<[^>]*>/g, '');
    const id = `heading-${index}`;
    
    return {
      id,
      text,
      level: parseInt(level)
    };
  });
}
