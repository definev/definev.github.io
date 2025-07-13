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

## Step 3: Embedded Blog Data (No More Fetch Requests!)

✅ **IMPROVED**: The blog system now embeds blog data directly in TypeScript files instead of using external JSON files. This eliminates:
- ❌ No more fetch requests
- ❌ No more 522 errors on Cloudflare
- ❌ No more network dependencies
- ✅ Faster loading
- ✅ Better reliability
- ✅ Type-safe blog data

## Step 4: Test Development

```bash
bun run dev:blog
```

This will:
1. Build the blog data from markdown files
2. Start the development server
3. Load blog data directly from TypeScript imports (no network requests!)

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
✅ **FIXED**: No more 522 errors! Blog data is now embedded directly in TypeScript files, eliminating all network requests.

### Missing Blog Data
If blog posts aren't showing up:

1. **Rebuild blog data**:
   ```bash
   bun run build:blog
   ```

2. **Restart dev server**:
   ```bash
   bun run dev:blog
   ```

3. **Check the generated file**:
   ```bash
   cat src/data/blog-data.ts
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