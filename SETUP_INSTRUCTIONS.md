# 🚀 Quick Setup Instructions

Your blog system has been updated with environment-based URL configuration! Here's how to complete the setup:

## Step 1: Environment Configuration

The project uses environment variables for configuration:

### Development Environment
- Uses `.env.local` (highest priority) or `.env` (fallback)
- Already configured for local development

### Production Environment  
- GitHub Actions sets environment variables directly in the workflow
- Uses `VITE_APP_URL` from GitHub Secrets (defaults to https://zennn.dev)
- No `.env.production` file needed - system environment variables have highest priority

## Step 2: GitHub Actions Deployment

The GitHub Actions workflow automatically:
- Sets production environment variables
- Builds the blog data
- Deploys to Cloudflare Workers

## Step 3: Fixed Cloudflare 522 Error

✅ **FIXED**: The blog system now uses relative paths (`/blog-data.json`) instead of absolute URLs to avoid circular requests that caused 522 errors on Cloudflare Workers.

## Step 4: Test Development

```bash
bun run dev
```

You should see logs like:
```
Loading blog data from: http://localhost:3000/blog-data.json
Successfully loaded 2 blog posts
```

## Step 5: Deploy to Production

For GitHub Actions deployment, just push to the `release` branch:
```bash
git push origin release
```

For manual deployment:
```bash
bun run deploy:cloudflare
```

## What's Fixed

- ✅ **Correct URLs**: Blog data loads from the right URL in both dev and prod
- ✅ **Environment-aware**: Automatically detects development vs production
- ✅ **Better debugging**: Clear error messages and logging
- ✅ **Cloudflare ready**: Works perfectly with Cloudflare deployment

## Troubleshooting

### 522 Connection Timed Out Error (Cloudflare)
✅ **FIXED**: If you were getting 522 errors when fetching blog data, this has been resolved by using relative paths instead of absolute URLs.

### 404 Not Found Errors
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

### Environment Variable Issues
If environment variables aren't working:
- **Development**: Check `.env.local` or `.env` files
- **Production**: Environment variables are set by GitHub Actions, not .env files

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