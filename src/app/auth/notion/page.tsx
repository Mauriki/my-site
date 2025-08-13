/**
 * Notion OAuth Authorization Page
 * 
 * This page initiates the OAuth flow by redirecting users to Notion's authorization page.
 * Users will be asked to authorize access to their Notion workspace and database.
 */

import { redirect } from 'next/navigation';

export default function NotionAuth() {
  // Get environment variables
  const clientId = process.env.NOTION_CLIENT_ID;
  const redirectUri = process.env.NOTION_REDIRECT_URI;
  
  if (!clientId || !redirectUri) {
    return (
      <div className="container max-w-2xl mx-auto px-6 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Configuration Error</h1>
          <p className="text-gray-600 mb-6">
            Missing required environment variables. Please check your Vercel configuration.
          </p>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-left">
            <h2 className="font-semibold text-red-800 mb-2">Required Variables:</h2>
            <ul className="text-sm text-red-700 space-y-1">
              <li>• NOTION_CLIENT_ID</li>
              <li>• NOTION_REDIRECT_URI</li>
              <li>• NOTION_CLIENT_SECRET</li>
              <li>• NOTION_DATABASE_ID</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // Construct the Notion OAuth URL
  const notionAuthUrl = new URL('https://api.notion.com/v1/oauth/authorize');
  notionAuthUrl.searchParams.set('client_id', clientId);
  notionAuthUrl.searchParams.set('redirect_uri', redirectUri);
  notionAuthUrl.searchParams.set('response_type', 'code');
  notionAuthUrl.searchParams.set('owner', 'user');

  // Redirect to Notion's authorization page
  redirect(notionAuthUrl.toString());
}
