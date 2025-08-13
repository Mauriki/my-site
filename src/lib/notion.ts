/**
 * Notion Utility Functions
 * 
 * This file contains utility functions for Notion integration,
 * including token storage and retrieval.
 */

import { writeFileSync, readFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

// Token storage file path
const TOKEN_FILE = join(process.cwd(), "data", "notion-token.json");

// Ensure data directory exists
export function ensureDataDir() {
  const dataDir = join(process.cwd(), "data");
  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true });
  }
}

// Store token securely
export function storeToken(tokenData: {
  access_token: string;
  token_type: string;
  bot_id: string;
  workspace_id: string;
  workspace_name: string;
  workspace_icon?: string;
  workspace_owner: string;
  expires_in: number;
}) {
  ensureDataDir();
  const tokenInfo = {
    access_token: tokenData.access_token,
    token_type: tokenData.token_type,
    bot_id: tokenData.bot_id,
    workspace_id: tokenData.workspace_id,
    workspace_name: tokenData.workspace_name,
    workspace_icon: tokenData.workspace_icon,
    workspace_owner: tokenData.workspace_owner,
    expires_at: Date.now() + (tokenData.expires_in * 1000), // Convert to timestamp
    created_at: Date.now()
  };
  
  writeFileSync(TOKEN_FILE, JSON.stringify(tokenInfo, null, 2));
  return tokenInfo;
}

// Get stored token
export function getStoredToken() {
  try {
    if (existsSync(TOKEN_FILE)) {
      const tokenData = JSON.parse(readFileSync(TOKEN_FILE, "utf8"));
      // Check if token is expired (with 5 minute buffer)
      if (tokenData.expires_at > Date.now() + 300000) {
        return tokenData;
      }
    }
    return null;
  } catch (err) {
    return null;
  }
}
