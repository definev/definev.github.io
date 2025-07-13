# GitHub Actions Deployment Setup

This guide shows you how to properly configure GitHub Actions for deployment with environment variables.

## ⚠️ Important Security Note

**NEVER** upload `.env` files to GitHub repositories! Instead, use GitHub Secrets for sensitive information.

## Setup GitHub Secrets

### 1. Go to Your Repository Settings

1. Navigate to your repository on GitHub
2. Click **Settings** tab
3. Go to **Secrets and variables** → **Actions**

### 2. Add Required Secrets

Click **New repository secret** and add these:

#### Required Secrets:
```
CLOUDFLARE_ACCOUNT_ID = your_cloudflare_account_id
CLOUDFLARE_API_TOKEN = your_cloudflare_api_token
```

#### Optional Secrets:
```
VITE_APP_URL = https://your-custom-domain.com
```

**Note**: If you don't set `VITE_APP_URL`, it defaults to `https://definev.github.io`

### 3. For Different Deployment Targets

#### Cloudflare Pages:
```
VITE_APP_URL = https://your-app.pages.dev
```

#### Custom Domain:
```
VITE_APP_URL = https://your-domain.com
```

#### GitHub Pages:
```
VITE_APP_URL = https://definev.github.io
```

## How the Workflow Works

The updated deployment workflow:

1. **Sets Environment Variables**: Uses GitHub Secrets with fallback defaults
2. **Creates Environment File**: Dynamically generates `.env.production` during build
3. **Builds Blog Data**: Processes markdown files with correct environment
4. **Builds Application**: Uses environment-aware configuration
5. **Deploys**: Uploads to Cloudflare with all assets

### Workflow Environment Variables

```yaml
env:
  VITE_APP_URL: ${{ secrets.VITE_APP_URL || 'https://definev.github.io' }}
  VITE_NODE_ENV: production
```

This means:
- Uses your custom `VITE_APP_URL` secret if set
- Falls back to `https://definev.github.io` if not set
- Always uses `production` environment

## Workflow Steps Explained

### 1. Create Production Environment File
```bash
echo "VITE_APP_URL=${{ env.VITE_APP_URL }}" > .env.production
echo "VITE_NODE_ENV=${{ env.VITE_NODE_ENV }}" >> .env.production
```

This creates the environment file during build time using your secrets.

### 2. Build Blog Data
```bash
bun run build:blog
```

Processes all markdown files with the correct environment configuration.

### 3. Build Application
```bash
bun run build
```

Builds the application with environment-aware settings.

## Testing Your Deployment

### 1. Check Build Logs

After pushing to the `release` branch, check the Actions tab to see:

```
Created .env.production with:
VITE_APP_URL=https://your-domain.com
VITE_NODE_ENV=production
```

### 2. Verify Deployment

Your deployed site should:
- ✅ Load blog data from the correct URL
- ✅ Show all blog posts
- ✅ Have working navigation
- ✅ Display content properly

## Troubleshooting

### Build Fails with "Blog data not found"

**Problem**: Environment variables not set correctly

**Solution**:
1. Check your GitHub Secrets are set correctly
2. Verify the `VITE_APP_URL` format (no trailing slash)
3. Check the workflow logs for the created environment file

### Wrong Blog Data URL

**Problem**: Site loads but blog data fails to load

**Solution**:
1. Check your `VITE_APP_URL` secret matches your actual domain
2. Verify your Cloudflare/hosting setup serves static files correctly
3. Test the blog data URL manually: `https://your-domain.com/blog-data.json`

### Environment Variables Not Available

**Problem**: Build succeeds but environment variables are undefined

**Solution**:
1. Environment variables must start with `VITE_` to be available in the browser
2. Check that secrets are properly referenced in the workflow
3. Verify the environment file creation step shows the correct values

## Local vs Production Differences

### Local Development
- Uses `.env.local` file
- Reads directly from `http://localhost:3000/blog-data.json`
- Hot-reload when markdown files change

### Production Deployment
- Uses GitHub Secrets → creates `.env.production`
- Loads from your production domain
- Pre-built and optimized for edge deployment

## Security Best Practices

### ✅ Do:
- Use GitHub Secrets for sensitive values
- Set `VITE_APP_URL` as a secret if using custom domain
- Keep `.env` files in `.gitignore`
- Use environment-specific configurations

### ❌ Don't:
- Upload `.env` files to git
- Hardcode URLs in source code
- Expose sensitive tokens in logs
- Use production secrets in development

## Example Complete Setup

### 1. GitHub Secrets:
```
CLOUDFLARE_ACCOUNT_ID = abc123...
CLOUDFLARE_API_TOKEN = xyz789...
VITE_APP_URL = https://yourdomain.com
```

### 2. Push to Release Branch:
```bash
git push origin release
```

### 3. Check Deployment:
- Actions tab shows successful build
- Site loads at your configured URL
- Blog data loads correctly

Your deployment is now properly configured with secure environment variable handling! 🚀 