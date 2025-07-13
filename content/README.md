# Blog Content Management

This directory contains the markdown files for your blog posts. The blog system processes these files at build time and generates a static JSON file that works seamlessly with Cloudflare deployment.

## 🚀 Quick Start

1. **Add a new blog post** by creating a markdown file in this directory
2. **Run the development server** with `bun run dev`
3. **Deploy to Cloudflare** with `bun run deploy:cloudflare`

## How It Works

### Build-Time Processing
The blog system processes all markdown files during the build phase and generates a static `blog-data.json` file. This approach ensures:
- ✅ **Cloudflare Compatible**: No filesystem access needed at runtime
- ✅ **Fast Loading**: Pre-processed content served from edge locations
- ✅ **SEO Friendly**: All content available for static generation
- ✅ **Development Friendly**: Automatic rebuilds when content changes

### JSON-Based Architecture
Instead of reading markdown files at runtime, the system:
1. **Build Time**: Processes all `.md` files → generates `blog-data.json`
2. **Runtime**: Loads blog data from the static JSON file
3. **Deployment**: JSON file is included in the Cloudflare deployment

## How to Add a New Blog Post

1. **Create a new markdown file** in the `content/blog/` directory
2. **Use the filename as the URL slug** (e.g., `my-awesome-post.md` becomes `/blog/my-awesome-post`)
3. **Add frontmatter** at the top of the file with metadata
4. **Write your content** in Markdown format

## Frontmatter Format

Every blog post must start with YAML frontmatter enclosed in `---`:

```yaml
---
title: "Your Post Title"
excerpt: "A brief description of your post that appears in the blog listing"
date: "2025-01-16"
tags: ["tag1", "tag2", "tag3"]
published: true
author: "Your Name"
---
```

### Required Fields
- `title`: The post title
- `date`: Publication date in YYYY-MM-DD format

### Optional Fields
- `excerpt`: Brief description (auto-generated if not provided)
- `tags`: Array of tags for categorization
- `published`: Set to `false` to hide in production
- `author`: Author name
- `image`: Featured image URL

## Development Workflow

### Standard Development
```bash
bun run dev
```
This generates the blog data once and starts the development server.

### Watch Mode Development
```bash
bun run dev:watch
```
This watches for changes to markdown files and automatically rebuilds the blog data.

### Manual Blog Data Generation
```bash
bun run build:blog
```
This processes all markdown files and generates the `blog-data.json` file.

## Deployment

### Cloudflare Deployment
```bash
bun run deploy:cloudflare
```

This command:
1. Processes all markdown files → generates `blog-data.json`
2. Builds the application with Vite
3. Deploys to Cloudflare Workers

The `blog-data.json` file is automatically included in the deployment and served from Cloudflare's edge locations.

## Supported Markdown Features

The blog system supports:
- **Headers** (H1-H6)
- **Bold** and *italic* text
- `Inline code` and code blocks
- [Links](https://example.com)
- Lists (ordered and unordered)
- Tables
- Blockquotes
- Task lists
- GitHub Flavored Markdown (GFM)

## Example Blog Post

```markdown
---
title: "Getting Started with Flutter"
excerpt: "A beginner's guide to building mobile apps with Flutter framework"
date: "2025-01-16"
tags: ["flutter", "mobile", "tutorial"]
published: true
author: "Bùi Đại Dương (Zennn.mind)"
---

# Getting Started with Flutter

Flutter is Google's UI toolkit for building applications...

## Installation

To get started with Flutter:

1. Download Flutter SDK
2. Set up your editor
3. Create your first project

```dart
void main() {
  runApp(MyApp());
}
```

## Next Steps

- Try the Flutter tutorial
- Explore the widget catalog
- Join the Flutter community
```

## Automatic Features

The blog system automatically:
- **Processes at build time** - no runtime filesystem access needed
- **Calculates reading time** based on content length
- **Generates excerpts** if not provided in frontmatter
- **Sorts posts** by date (newest first)
- **Creates SEO-friendly URLs** from filenames
- **Handles draft posts** (set `published: false`)
- **Includes all content** in the deployment bundle

## File Structure

```
content/
└── blog/
    ├── welcome-to-my-blog.md
    ├── building-modern-react-applications-with-tanstack.md
    └── README.md (this file)

scripts/
├── build-blog.js              # Build-time processor
└── dev-blog-watcher.js        # Development watcher

public/
└── blog-data.json             # Generated blog data (auto-generated)
```

## Troubleshooting

### Common Issues

1. **Blog posts not appearing**:
   - Ensure you've run `bun run build:blog`
   - Check `published: true` in frontmatter
   - Verify proper frontmatter format

2. **Development server not loading posts**:
   - Run `bun run build:blog` to generate the JSON file
   - Check that `public/blog-data.json` exists
   - Restart the development server

3. **Cloudflare deployment issues**:
   - Verify `blog-data.json` is in the build output
   - Check build logs for errors
   - Ensure all markdown files have valid frontmatter

### Debug Commands

```bash
# Generate blog data
bun run build:blog

# Check generated data
cat public/blog-data.json

# Development with auto-rebuild
bun run dev:watch

# Full build test
bun run build
```

## Performance Benefits

- **Zero Runtime Processing**: All content processed at build time
- **Cloudflare Edge Caching**: Blog data served from global edge locations
- **Reduced Bundle Size**: Content separated from JavaScript bundles
- **Fast Loading**: Pre-processed and optimized content
- **SEO Optimized**: All content available for static generation

Your blog system is now fully optimized for Cloudflare deployment with excellent performance and developer experience! 