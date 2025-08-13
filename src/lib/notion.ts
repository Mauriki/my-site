/**
 * Notion Utility Functions
 * 
 * This file contains utility functions for Notion integration,
 * reading tokens from environment variables instead of local files.
 */

// Get token from environment variables
export function getStoredToken() {
  const accessToken = process.env.NOTION_ACCESS_TOKEN;
  
  if (!accessToken) {
    return null;
  }

  // For now, we'll assume the token is valid if it exists
  // In a production environment, you might want to validate the token
  // or implement proper refresh token handling
  return {
    access_token: accessToken,
    token_type: 'bearer',
    workspace_id: process.env.NOTION_WORKSPACE_ID || 'unknown',
    workspace_name: process.env.NOTION_WORKSPACE_NAME || 'Unknown Workspace',
    expires_at: Date.now() + (24 * 60 * 60 * 1000), // Assume 24 hours validity
    created_at: Date.now()
  };
}

// Check if token needs refresh (placeholder for future implementation)
export function isTokenExpired(token: { expires_at?: number } | null) {
  if (!token || !token.expires_at) {
    return true;
  }
  
  // Check if token expires within the next 5 minutes
  return token.expires_at <= Date.now() + 300000;
}
