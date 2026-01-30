# Firebase Migration Guide for maurik-web

This guide walks you through deploying your site to Firebase Hosting using the terminal.

## Prerequisites

Ensure you have Node.js installed (which you already do).

## Step 1: Install Firebase Tools

Open your terminal and run:

```bash
npm install -g firebase-tools
```

*Note: You might need `sudo` if you get permission errors (e.g., `sudo npm install -g firebase-tools`).*

## Step 2: Login to Firebase

Authenticate the CLI with your Google account:

```bash
firebase login
```

This will open your browser. Log in with the account that has access to the `maurik-web` project.

## Step 3: Link Project (Optional but Recommended)

I have already created `.firebaserc` with the project ID, but running this ensures everything is synced:

```bash
firebase use maurik-web
```

## Step 4: Build and Deploy

Now, build your Next.js site and deploy it to Firebase.

```bash
# 1. Build the static site (creates 'out' folder)
npm run build

# 2. Deploy to Firebase Hosting
npm run deploy
```

*Note: `npm run deploy` runs `firebase deploy` as configured in `package.json`.*

## Troubleshooting

- **Image Issues**: If images are missing, ensure they are in the `public` folder and referenced with a leading slash (e.g., `/image.png`).
- **404 on Refresh**: The `firebase.json` has a rewrite rule to handle this, so client-side routing should work.
- **Permission Denied**: If `firebase deploy` fails with permission errors, try `firebase login --reauth`.

## Verification

After deployment, the terminal will show a Hosting URL (e.g., `https://maurik-web.web.app`). Open it to verify your site is live!
