/**
 * Notion Integration Status Check
 * 
 * This endpoint checks the current status of the Notion integration,
 * including token validity and database connectivity.
 */

import { NextResponse } from "next/server";
import { getStoredToken } from "@/lib/notion";

export async function GET() {
  try {
    const token = getStoredToken();
    
    if (!token) {
      return NextResponse.json({
        connected: false,
        status: "not_connected",
        message: "No valid Notion token found",
        action_required: "Add NOTION_ACCESS_TOKEN to your Vercel environment variables"
      });
    }

    // Check if token is expired
    const now = Date.now();
    const expiresAt = token.expires_at;
    const isExpired = expiresAt <= now;
    
    if (isExpired) {
      return NextResponse.json({
        connected: false,
        status: "token_expired",
        message: "Notion token has expired",
        action_required: "Update NOTION_ACCESS_TOKEN in your Vercel environment variables"
      });
    }

    // Check if database ID is configured
    const databaseId = process.env.NOTION_DATABASE_ID;
    if (!databaseId) {
      return NextResponse.json({
        connected: false,
        status: "database_not_configured",
        message: "NOTION_DATABASE_ID not configured",
        action_required: "Add NOTION_DATABASE_ID to your Vercel environment variables"
      });
    }

    // Test database connectivity
    try {
      const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}`, {
        headers: {
          'Authorization': `Bearer ${token.access_token}`,
          'Notion-Version': '2022-06-28',
        }
      });

      if (!response.ok) {
        return NextResponse.json({
          connected: false,
          status: "database_access_denied",
          message: "Cannot access Notion database",
          action_required: "Check database permissions and integration settings"
        });
      }

      const databaseInfo = await response.json();
      
      return NextResponse.json({
        connected: true,
        status: "fully_connected",
        message: "Successfully connected to Notion",
        workspace: {
          name: token.workspace_name,
          id: token.workspace_id
        },
        database: {
          id: databaseId,
          title: databaseInfo.title?.[0]?.plain_text || "Untitled Database"
        },
        token_expires_at: new Date(expiresAt).toISOString(),
        token_expires_in: Math.floor((expiresAt - now) / 1000) // seconds
      });

    } catch (dbError) {
      return NextResponse.json({
        connected: false,
        status: "database_error",
        message: "Error testing database connectivity",
        details: (dbError as Error).message,
        action_required: "Check your Notion database settings"
      });
    }

  } catch (error) {
    return NextResponse.json({
      connected: false,
      status: "error",
      message: "Error checking integration status",
      details: (error as Error).message
    }, { status: 500 });
  }
}
