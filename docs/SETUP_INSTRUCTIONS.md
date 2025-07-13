# 🚀 Quick Setup Instructions

Your blog system has been updated with environment-based URL configuration! Here's how to complete the setup:

## Step 1: Environment Files (Already Created)

I've created basic environment files for you:

- ✅ `.env.local` - for development
- ✅ `.env.production` - for production (GitHub Pages)

## Step 2: Update Production URL (If Needed)

Check your `.env.production` file and update the URL if needed:

```bash
# Edit .env.production
VITE_APP_URL=https://definev.github.io
VITE_NODE_ENV=production
```

If your site uses a different URL, update it accordingly:
- GitHub Pages project: `https://definev.github.io/repository-name`
- Custom domain: `https://your-domain.com`
- Cloudflare Pages: `https://your-app.pages.dev`

## Step 3: Test Development

```bash
bun run dev
```

You should see logs like:
```
Loading blog data from: http://localhost:3000/blog-data.json
Successfully loaded 2 blog posts
```

## Step 4: Deploy to Production

```bash
bun run deploy:cloudflare
```

## What's Fixed

- ✅ **Correct URLs**: Blog data loads from the right URL in both dev and prod
- ✅ **Environment-aware**: Automatically detects development vs production
- ✅ **Better debugging**: Clear error messages and logging
- ✅ **Cloudflare ready**: Works perfectly with Cloudflare deployment

## Troubleshooting

If you see "404 Not Found" errors:

1. **Check environment file**:
   ```bash
   cat .env.local
   ```

2. **Rebuild blog data**:
   ```bash
   bun run build:blog
   ```

3. **Restart dev server**:
   ```bash
   bun run dev
   ```

## For Different Hosting Platforms

### Cloudflare Pages
In your Cloudflare dashboard, set:
```
VITE_APP_URL = https://your-app.pages.dev
VITE_NODE_ENV = production
```

### Vercel
In Vercel dashboard:
```
VITE_APP_URL = https://your-app.vercel.app
VITE_NODE_ENV = production
```

### Netlify
In Netlify dashboard:
```
VITE_APP_URL = https://your-app.netlify.app
VITE_NODE_ENV = production
```

Your blog system is now properly configured for both development and production! 🎉 