/**
 * Blog List Page
 * 
 * This page displays all published blog posts from your Notion database.
 * It fetches posts via the Notion sync API and displays them in a responsive grid.
 * Posts are sorted by date (newest first) and include cover images, tags, and excerpts.
 */

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  tags: string[];
  coverImage?: string;
  excerpt: string;
  readTime: string;
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [connectionStatus, setConnectionStatus] = useState<{
    connected: boolean;
    status: string;
    message: string;
    action_required?: string;
    workspace?: { name: string; id: string };
    database?: { title: string; id: string };
    token_expires_in?: number;
  } | null>(null);
  const postsPerPage = 10;

  useEffect(() => {
    checkConnectionStatus();
    fetchPosts();
  }, []);

  const checkConnectionStatus = async () => {
    try {
      const response = await fetch('/api/notion/status');
      const data = await response.json();
      setConnectionStatus(data);
    } catch (err) {
      console.error('Failed to check connection status:', err);
    }
  };

  const fetchPosts = async () => {
    try {
      setLoading(true);
      
      // First check the connection status
      const statusResponse = await fetch('/api/notion/status');
      const statusData = await statusResponse.json();
      
      if (!statusData.connected) {
        throw new Error(statusData.message);
      }
      
      // If connected, fetch posts
      const response = await fetch('/api/notion/sync');
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch posts');
      }
      
      const data = await response.json();
      setPosts(data.posts);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  // Get all unique tags
  const allTags = Array.from(new Set(posts.flatMap(post => post.tags))).sort();

  // Filter posts by selected tag
  const filteredPosts = selectedTag 
    ? posts.filter(post => post.tags.includes(selectedTag))
    : posts;

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="container">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading blog posts...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    // Check if it's a token-related error
    const isTokenError = error.includes('token') || error.includes('authorize') || error.includes('integration');
    
    return (
      <div className="container">
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Blog</h1>
          
          {isTokenError ? (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
              <div className="mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold text-blue-800 mb-2">Notion Integration Required</h2>
                <p className="text-blue-700 mb-4">
                  To view blog posts, you need to connect your Notion database first.
                </p>
              </div>
              
              <div className="space-y-3">
                <Link
                  href="/auth/notion"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Connect Notion Database
                </Link>
                
                <div className="text-sm text-blue-600">
                  <p>This will redirect you to Notion to authorize access to your database.</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-800 mb-4">{error}</p>
              <button 
                onClick={fetchPosts}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="container">
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Blog</h1>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
            <div className="mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-blue-800 mb-2">Ready to Start Blogging?</h2>
              <p className="text-blue-700 mb-4">
                Your Notion database is connected, but you haven&apos;t published any posts yet.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-4 border border-blue-100">
                <h3 className="font-medium text-blue-800 mb-2">Next Steps:</h3>
                <ol className="text-sm text-blue-700 space-y-1 text-left">
                  <li>1. Go to your Notion database</li>
                  <li>2. Create a new blog post</li>
                  <li>3. Set &quot;Published&quot; to true</li>
                  <li>4. Your post will appear here automatically!</li>
                </ol>
              </div>
              
              <div className="text-sm text-blue-600">
                <p>Need help? Check the <Link href="/NOTION_SETUP.md" className="underline">setup guide</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Connection Status */}
      {connectionStatus && (
        <div className="mb-6">
          {connectionStatus.connected ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-green-800 font-medium">
                    Connected to {connectionStatus.workspace?.name || 'Notion'}
                  </span>
                  {connectionStatus.database && (
                    <span className="text-green-600 text-sm">
                      • Database: {connectionStatus.database.title}
                    </span>
                  )}
                </div>
                <div className="text-sm text-green-600">
                  Token expires in {connectionStatus.token_expires_in ? `${Math.floor(connectionStatus.token_expires_in / 3600)}h ${Math.floor((connectionStatus.token_expires_in % 3600) / 60)}m` : 'Unknown'}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-yellow-800 font-medium">
                    {connectionStatus.message}
                  </span>
                </div>
                <div className="text-sm text-yellow-700">
                  {connectionStatus.action_required}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <header className="header text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Thoughts on programming, technology, and continuous learning.
        </p>
      </header>

      {/* Tag Filter */}
      {allTags.length > 0 && (
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedTag === null
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All Posts
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedTag === tag
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Posts Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {paginatedPosts.map(post => (
          <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            {post.coverImage && (
              <div className="relative h-48 bg-gray-200">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm text-gray-500">{formatDate(post.date)}</span>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">{post.readTime}</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map(tag => (
                    <Link
                      key={tag}
                      href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full hover:bg-blue-200 transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              )}
              <Link
                href={`/blog/${post.slug}`}
                className="text-blue-600 hover:text-blue-800 font-medium text-sm inline-flex items-center gap-1 transition-colors"
              >
                Read More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-12">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          >
            Previous
          </button>
          
          <span className="px-4 py-2 text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          >
            Next
          </button>
        </div>
      )}

      {/* Post Count */}
      <div className="text-center mt-8 text-gray-500">
        {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} found
        {selectedTag && ` in "${selectedTag}"`}
      </div>
    </div>
  );
}
