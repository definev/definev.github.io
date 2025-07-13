# Blog Content Management

This directory contains the markdown files for your blog posts. The blog system automatically reads these files and generates your website's blog pages.

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
- **Calculates reading time** based on content length
- **Generates excerpts** if not provided in frontmatter
- **Sorts posts** by date (newest first)
- **Creates SEO-friendly URLs** from filenames
- **Handles draft posts** (set `published: false`)

## Deployment

When you deploy your site, the blog system will:
1. Read all `.md` files from `content/blog/`
2. Parse frontmatter and content
3. Generate static pages for each post
4. Create the blog index page
5. Enable search functionality

## Tips for Writing

1. **Use descriptive filenames** - they become your URL slugs
2. **Add meaningful tags** - they help with organization and discovery
3. **Write good excerpts** - they appear in social media previews
4. **Use relative dates** - the system will format them properly
5. **Preview locally** - run `bun run dev` to test your posts

## File Structure

```
content/
└── blog/
    ├── welcome-to-my-blog.md
    ├── building-modern-react-applications-with-tanstack.md
    ├── flutter-mobile-development-tips.md
    └── README.md (this file)
```

## Need Help?

- Check existing posts for examples
- The blog system is fault-tolerant - errors will be logged
- All markdown files are automatically picked up on restart 