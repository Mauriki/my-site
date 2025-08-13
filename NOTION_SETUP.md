# 🚀 Notion Integration Setup Guide

This guide will help you set up your Notion database and integrate it with your website for automatic blog syncing.

## 📋 **Prerequisites**

- A Notion account
- Your website deployed on Vercel
- Environment variables configured

## 🗄️ **Step 1: Create Notion Database**

### **Database Structure**
Create a new database in Notion with these exact properties:

| Property Name | Type | Description | Required |
|---------------|------|-------------|----------|
| **Title** | Title | The title of your blog post | ✅ Yes |
| **Slug** | Text | URL-friendly version of the title (e.g., "my-first-post") | ✅ Yes |
| **Date** | Date | Publication date | ✅ Yes |
| **Tags** | Multi-select | Categories/topics (e.g., Programming, Career, Technology) | ❌ No |
| **Published** | Checkbox | Set to true when ready to publish | ✅ Yes |
| **Cover Image** | Files & media | Featured image for the post | ❌ No |
| **Excerpt** | Text | Short description/summary | ❌ No |
| **Content** | Page content | The main body of your blog post | ✅ Yes |

### **Database Template**
1. Go to [Notion](https://notion.so)
2. Create a new page
3. Type `/database` and select "Table - Full page"
4. Rename the database to "Blog Posts"
5. Add the properties listed above
6. Set "Title" as the primary property

### **Content Guidelines**
- **Title**: Keep it descriptive and engaging
- **Slug**: Use lowercase, hyphens instead of spaces, no special characters
- **Date**: Use the date you want the post to appear
- **Tags**: Use consistent, relevant tags (e.g., "Programming", "Next.js", "TypeScript")
- **Published**: Only check this when the post is ready to go live
- **Cover Image**: Upload images directly to Notion or use external URLs
- **Excerpt**: Write 1-2 sentences summarizing the post
- **Content**: Write your full blog post using Notion's rich text editor

## 🔐 **Step 2: Set Up Notion Integration**

### **Create Notion App**
1. Go to [Notion Developers](https://developers.notion.com/)
2. Click "New integration"
3. Fill in the details:
   - **Name**: `Maurik's Blog Integration`
   - **Associated workspace**: Select your workspace
   - **Capabilities**: 
     - ✅ Read content
     - ✅ Read user information without email
4. Click "Submit"

### **Get Integration Details**
After creating the integration, you'll get:
- **Internal Integration Token** (Client Secret)
- **Integration ID** (Client ID)

## 🌐 **Step 3: Configure Environment Variables**

In your Vercel dashboard:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add these variables:

```
NOTION_CLIENT_ID=your_integration_id_here
NOTION_CLIENT_SECRET=your_internal_integration_token_here
NOTION_REDIRECT_URI=https://maurik.vercel.app/api/notion/callback
NOTION_DATABASE_ID=your_database_id_here
```

### **Get Database ID**
1. Open your Notion database
2. Copy the URL from the address bar
3. The database ID is the part after the last slash and before the question mark
4. Example: `https://notion.so/workspace/1234567890abcdef` → ID is `1234567890abcdef`

## 🔗 **Step 4: Authorize Integration**

### **Add Integration to Database**
1. Open your Notion database
2. Click the "..." menu in the top right
3. Select "Add connections"
4. Find and select your integration
5. Click "Confirm"

### **Authorize OAuth**
1. Visit: `https://maurik.vercel.app/api/notion/callback`
2. You'll be redirected to Notion for authorization
3. Click "Allow access"
4. You'll see a success message

## ✍️ **Step 5: Create Your First Blog Post**

### **In Notion:**
1. Add a new row to your database
2. Fill in all required fields:
   - **Title**: "My First Blog Post"
   - **Slug**: "my-first-blog-post"
   - **Date**: Today's date
   - **Tags**: ["Programming", "Getting Started"]
   - **Published**: ✅ (check this)
   - **Excerpt**: "Welcome to my blog! This is my first post."
   - **Content**: Write your blog post content
3. Save the page

### **On Your Website:**
1. Visit `/blog` to see your post
2. Click on the post to view the full content
3. The post should automatically appear with proper formatting

## 🔄 **How It Works**

1. **Automatic Sync**: Your website fetches posts from Notion every time someone visits
2. **Real-time Updates**: Changes in Notion appear on your website immediately
3. **SEO Optimized**: Each post gets proper meta tags and structured data
4. **Responsive Design**: Posts look great on all devices

## 🛠️ **Troubleshooting**

### **Posts Not Appearing**
- Check that "Published" is checked in Notion
- Verify environment variables are set correctly
- Ensure the integration has access to the database
- Check the browser console for errors

### **OAuth Issues**
- Verify redirect URI matches exactly
- Check that integration is added to the database
- Ensure environment variables are correct

### **Content Formatting Issues**
- Use Notion's built-in formatting (headings, lists, etc.)
- Avoid complex layouts or custom blocks
- Images should be uploaded directly to Notion

## 📱 **Mobile Writing Workflow**

1. **Write in Notion**: Use the Notion mobile app to write posts on the go
2. **Draft Mode**: Leave "Published" unchecked while writing
3. **Publish**: Check "Published" when ready to go live
4. **Instant Update**: Your website updates automatically

## 🎯 **Best Practices**

- **Consistent Tags**: Use the same tags across posts for better organization
- **Regular Publishing**: Post consistently to keep your blog active
- **SEO Titles**: Write titles that people would search for
- **Quality Content**: Focus on providing value to your readers
- **Image Optimization**: Use appropriately sized images for web

## 🔗 **Useful Links**

- [Notion Developers Documentation](https://developers.notion.com/)
- [Notion API Reference](https://developers.notion.com/reference)
- [Your Blog](https://maurik.vercel.app/blog)
- [Your Admin Dashboard](https://maurik.vercel.app/admin)

## 📞 **Need Help?**

If you encounter any issues:
1. Check the browser console for error messages
2. Verify all environment variables are set correctly
3. Ensure the Notion integration has proper permissions
4. Check that your database structure matches the requirements

---

**Happy blogging! 🎉**

Your Notion database is now your content management system. Write in Notion, publish instantly on your website!
