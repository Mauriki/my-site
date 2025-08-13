/**
 * Notion Blog Sync API
 * 
 * This endpoint fetches all published blog posts from your Notion database.
 * It uses the stored OAuth token to authenticate with Notion's API and
 * returns formatted blog post data for your website.
 */

import { NextResponse } from "next/server";
import { getStoredToken } from "@/lib/notion";

// Notion API types
interface NotionBlock {
  type: string;
  paragraph?: {
    rich_text: Array<{
      plain_text: string;
      href?: string;
      annotations?: {
        bold?: boolean;
        italic?: boolean;
        code?: boolean;
        color?: string;
      };
    }>;
  };
  heading_1?: {
    rich_text: Array<{ plain_text: string }>;
  };
  heading_2?: {
    rich_text: Array<{ plain_text: string }>;
  };
  heading_3?: {
    rich_text: Array<{ plain_text: string }>;
  };
  bulleted_list_item?: {
    rich_text: Array<{ plain_text: string }>;
  };
  numbered_list_item?: {
    rich_text: Array<{ plain_text: string }>;
  };
  quote?: {
    rich_text: Array<{ plain_text: string }>;
  };
  code?: {
    rich_text: Array<{ plain_text: string }>;
    language?: string;
  };
  image?: {
    type: string;
    file?: { url: string };
    external?: { url: string };
  };
}

interface NotionPost {
  id: string;
  properties: {
    Title: {
      title: Array<{ plain_text: string }>;
    };
    Slug: {
      rich_text: Array<{ plain_text: string }>;
    };
    Date: {
      date: { start: string };
    };
    Tags: {
      multi_select: Array<{ name: string; color: string }>;
    };
    Published: {
      checkbox: boolean;
    };
    Cover: {
      files: Array<{ file?: { url: string }; external?: { url: string } }>;
    };
    Excerpt: {
      rich_text: Array<{ plain_text: string }>;
    };
  };
}

interface FormattedPost {
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

// Convert Notion blocks to HTML
function blocksToHtml(blocks: NotionBlock[]): string {
  return blocks.map(block => {
    switch (block.type) {
      case 'paragraph':
        if (block.paragraph?.rich_text.length) {
          const text = block.paragraph.rich_text.map(richText => {
            let html = richText.plain_text;
            if (richText.annotations?.bold) html = `<strong>${html}</strong>`;
            if (richText.annotations?.italic) html = `<em>${html}</em>`;
            if (richText.annotations?.code) html = `<code>${html}</code>`;
            if (richText.href) html = `<a href="${richText.href}">${html}</a>`;
            return html;
          }).join('');
          return `<p>${text}</p>`;
        }
        return '<p></p>';
      
      case 'heading_1':
        return `<h1>${block.heading_1?.rich_text.map(t => t.plain_text).join('')}</h1>`;
      
      case 'heading_2':
        return `<h2>${block.heading_2?.rich_text.map(t => t.plain_text).join('')}</h2>`;
      
      case 'heading_3':
        return `<h3>${block.heading_3?.rich_text.map(t => t.plain_text).join('')}</h3>`;
      
      case 'bulleted_list_item':
        return `<li>${block.bulleted_list_item?.rich_text.map(t => t.plain_text).join('')}</li>`;
      
      case 'numbered_list_item':
        return `<li>${block.numbered_list_item?.rich_text.map(t => t.plain_text).join('')}</li>`;
      
      case 'quote':
        return `<blockquote>${block.quote?.rich_text.map(t => t.plain_text).join('')}</blockquote>`;
      
      case 'code':
        const language = block.code?.language || 'text';
        return `<pre><code class="language-${language}">${block.code?.rich_text.map(t => t.plain_text).join('')}</code></pre>`;
      
      case 'image':
        const imageUrl = block.image?.file?.url || block.image?.external?.url;
        if (imageUrl) {
          return `<img src="${imageUrl}" alt="" class="w-full h-auto rounded-lg" />`;
        }
        return '';
      
      default:
        return '';
    }
  }).join('');
}

// Calculate read time
function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.split(' ').length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export async function GET() {
  try {
    // Get stored token
    const token = getStoredToken();
    if (!token) {
      return NextResponse.json({ 
        error: "No valid Notion token found. Please authorize the integration first.",
        action_required: "Visit /auth/notion to connect your Notion database"
      }, { status: 401 });
    }

    const databaseId = process.env.NOTION_DATABASE_ID;
    if (!databaseId) {
      return NextResponse.json({ 
        error: "NOTION_DATABASE_ID environment variable not set",
        action_required: "Add NOTION_DATABASE_ID to your Vercel environment variables"
      }, { status: 500 });
    }

    // Fetch posts from Notion database
    const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token.access_token}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filter: {
          property: 'Published',
          checkbox: {
            equals: true
          }
        },
        sorts: [
          {
            property: 'Date',
            direction: 'descending'
          }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: errorText }, { status: 500 });
    }

    const data = await response.json();
    const posts: NotionPost[] = data.results;

    // Fetch content for each post
    const formattedPosts: FormattedPost[] = await Promise.all(
      posts.map(async (post) => {
        // Fetch post content
        const contentResponse = await fetch(`https://api.notion.com/v1/blocks/${post.id}/children`, {
          headers: {
            'Authorization': `Bearer ${token.access_token}`,
            'Notion-Version': '2022-06-28',
          }
        });

        let content = '';
        if (contentResponse.ok) {
          const contentData = await contentResponse.json();
          content = blocksToHtml(contentData.results);
        }

        const title = post.properties.Title.title[0]?.plain_text || 'Untitled';
        const slug = post.properties.Slug.rich_text[0]?.plain_text || 
                    title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        const date = post.properties.Date.date?.start || new Date().toISOString();
        const tags = post.properties.Tags.multi_select.map(tag => tag.name);
        const coverImage = post.properties.Cover.files[0]?.file?.url || 
                          post.properties.Cover.files[0]?.external?.url;
        const excerpt = post.properties.Excerpt.rich_text[0]?.plain_text || 
                       content.substring(0, 150) + '...';

        return {
          id: post.id,
          title,
          slug,
          date,
          tags,
          coverImage,
          excerpt,
          content,
          readTime: calculateReadTime(content)
        };
      })
    );

    return NextResponse.json({
      ok: true,
      posts: formattedPosts,
      count: formattedPosts.length
    });

  } catch (error) {
    console.error('Notion sync error:', error);
    return NextResponse.json({ 
      error: (error as Error).message 
    }, { status: 500 });
  }
}
