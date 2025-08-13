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

  if (!code) {
    return NextResponse.json({ error: "Missing code" }, { status: 400 });
  }

  try {
    const response = await fetch("https://api.notion.com/v1/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " +
          Buffer.from(
            `${process.env.NOTION_CLIENT_ID}:${process.env.NOTION_CLIENT_SECRET}`
          ).toString("base64"),
      },
      body: JSON.stringify({
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.NOTION_REDIRECT_URI,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: errorText }, { status: 500 });
    }

    const data = await response.json();
    
    // Store the token securely
    storeToken(data);
    
    return NextResponse.json({ 
      ok: true, 
      message: "Successfully connected to Notion!",
      workspace: data.workspace_name,
      token_stored: true
    });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
