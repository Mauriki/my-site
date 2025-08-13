/**
 * Notion OAuth Callback Handler
 * 
 * This endpoint handles the OAuth callback from Notion after user authorization.
 * It exchanges the authorization code for an access token and logs it to the console.
 * Copy the token from the console and add it as NOTION_ACCESS_TOKEN in your Vercel environment variables.
 */

import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  // Handle OAuth errors
  if (error) {
    return NextResponse.json({ 
      error: `OAuth error: ${error}`,
      description: searchParams.get("error_description") || "Unknown error occurred"
    }, { status: 400 });
  }

  if (!code) {
    return NextResponse.json({ error: "Missing authorization code" }, { status: 400 });
  }

  // Validate required environment variables
  const clientId = process.env.NOTION_CLIENT_ID;
  const clientSecret = process.env.NOTION_CLIENT_SECRET;
  const redirectUri = process.env.NOTION_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    return NextResponse.json({ 
      error: "Missing required environment variables",
      details: "NOTION_CLIENT_ID, NOTION_CLIENT_SECRET, or NOTION_REDIRECT_URI not configured"
    }, { status: 500 });
  }

  try {
    // Exchange authorization code for access token
    const response = await fetch("https://api.notion.com/v1/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      },
      body: JSON.stringify({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Notion OAuth error:", errorText);
      return NextResponse.json({ 
        error: "Failed to exchange authorization code for token",
        details: errorText
      }, { status: 500 });
    }

    const data = await response.json();
    
    // Log the access token to console for manual copying
    console.log('🔐 NOTION ACCESS TOKEN (copy this to Vercel environment variables):');
    console.log('NOTION_ACCESS_TOKEN=' + data.access_token);
    console.log('📋 Token details:');
    console.log('- Workspace:', data.workspace_name);
    console.log('- Workspace ID:', data.workspace_id);
    console.log('- Bot ID:', data.bot_id);
    console.log('- Token expires in:', data.expires_in, 'seconds');
    console.log('⚠️  IMPORTANT: Copy the NOTION_ACCESS_TOKEN above and add it to your Vercel environment variables!');
    
    return NextResponse.json({ 
      ok: true, 
      message: "Successfully connected to Notion! Check your console for the access token.",
      workspace: data.workspace_name,
      workspace_id: data.workspace_id,
      token_logged: true,
      instructions: "Copy the NOTION_ACCESS_TOKEN from your console and add it to Vercel environment variables",
      redirect_url: "/auth/notion/success"
    });
  } catch (err) {
    console.error("OAuth callback error:", err);
    return NextResponse.json({ 
      error: "Internal server error during OAuth process",
      details: (err as Error).message
    }, { status: 500 });
  }
}
