/**
 * Notion OAuth Callback Handler
 * 
 * This endpoint handles the OAuth callback from Notion after user authorization.
 * It exchanges the authorization code for an access token and stores it securely.
 * The token is stored in a JSON file for persistence across deployments.
 */

import { NextResponse } from "next/server";
import { storeToken } from "@/lib/notion";

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
    
    // Store the token securely
    storeToken(data);
    
    // Return success response with redirect to blog
    return NextResponse.json({ 
      ok: true, 
      message: "Successfully connected to Notion!",
      workspace: data.workspace_name,
      workspace_id: data.workspace_id,
      token_stored: true,
      redirect_url: "/blog"
    });
  } catch (err) {
    console.error("OAuth callback error:", err);
    return NextResponse.json({ 
      error: "Internal server error during OAuth process",
      details: (err as Error).message
    }, { status: 500 });
  }
}
