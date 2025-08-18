// Type definitions
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  slug: string;
  tags: string[];
  readTime: number;
  published?: boolean;
  author?: string;
  image?: string;
  series?: string;
  seriesOrder?: number;
}

export interface BlogPostFrontmatter {
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  published?: boolean;
  author?: string;
  image?: string;
  series?: string;
  seriesOrder?: number;
}

export interface BlogData {
  posts: BlogPost[];
  generatedAt: string;
  totalPosts: number;
}

// Import the embedded blog data
import blogData from "~/data/blog-data";

/**
 * Get all blog posts
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  return blogData.posts;
}

/**
 * Get a single blog post by slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  return blogData.posts.find((post) => post.slug === slug) || null;
}

/**
 * Get all posts by tag
 */
export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  return blogData.posts.filter((post) =>
    post.tags.some((postTag) => postTag.toLowerCase() === tag.toLowerCase())
  );
}

/**
 * Get all unique tags from all posts
 */
export async function getAllTags(): Promise<string[]> {
  const allTags = blogData.posts.flatMap((post) => post.tags);
  const uniqueTags = [...new Set(allTags)];
  return uniqueTags.sort();
}

/**
 * Search posts by title, content, or tags
 */
export async function searchPosts(query: string): Promise<BlogPost[]> {
  const searchTerm = query.toLowerCase();

  return blogData.posts.filter((post) => {
    const titleMatch = post.title.toLowerCase().includes(searchTerm);
    const contentMatch = post.content.toLowerCase().includes(searchTerm);
    const tagMatch = post.tags.some((tag) =>
      tag.toLowerCase().includes(searchTerm)
    );
    const excerptMatch = post.excerpt.toLowerCase().includes(searchTerm);

    return titleMatch || contentMatch || tagMatch || excerptMatch;
  });
}

/**
 * Get related posts based on shared tags
 */
export async function getRelatedPosts(
  currentPost: BlogPost,
  limit: number = 3,
): Promise<BlogPost[]> {
  const currentTags = currentPost.tags;

  const relatedPosts = blogData.posts
    .filter((post) => post.slug !== currentPost.slug) // Exclude current post
    .map((post) => {
      const sharedTags = post.tags.filter((tag) => currentTags.includes(tag));
      return {
        post,
        sharedTagsCount: sharedTags.length,
      };
    })
    .filter((item) => item.sharedTagsCount > 0) // Only posts with shared tags
    .sort((a, b) => b.sharedTagsCount - a.sharedTagsCount) // Sort by relevance
    .slice(0, limit)
    .map((item) => item.post);

  return relatedPosts;
}

/**
 * Get all posts in a specific series
 */
export async function getPostsBySeries(
  seriesName: string,
): Promise<BlogPost[]> {
  return blogData.posts
    .filter((post) => post.series?.toLowerCase() === seriesName.toLowerCase())
    .sort((a, b) => (a.seriesOrder || 0) - (b.seriesOrder || 0));
}

/**
 * Get all unique series from all posts
 */
export async function getAllSeries(): Promise<
  { name: string; postCount: number; latestDate: string }[]
> {
  const seriesMap = new Map<
    string,
    { posts: BlogPost[]; latestDate: string }
  >();

  blogData.posts
    .filter((post) => post.series)
    .forEach((post) => {
      const seriesName = post.series!;
      if (!seriesMap.has(seriesName)) {
        seriesMap.set(seriesName, { posts: [], latestDate: post.date });
      }
      const seriesData = seriesMap.get(seriesName)!;
      seriesData.posts.push(post);
      if (new Date(post.date) > new Date(seriesData.latestDate)) {
        seriesData.latestDate = post.date;
      }
    });

  return Array.from(seriesMap.entries()).map((
    [name, { posts, latestDate }],
  ) => ({
    name,
    postCount: posts.length,
    latestDate,
  }));
}

/**
 * Get series navigation for a specific post
 */
export async function getSeriesNavigation(currentPost: BlogPost): Promise<
  {
    series: string;
    currentIndex: number;
    totalPosts: number;
    previousPost?: BlogPost;
    nextPost?: BlogPost;
    allPosts: BlogPost[];
  } | null
> {
  if (!currentPost.series) {
    return null;
  }

  const seriesPosts = await getPostsBySeries(currentPost.series);
  const currentIndex = seriesPosts.findIndex((post) =>
    post.slug === currentPost.slug
  );

  if (currentIndex === -1) {
    return null;
  }

  return {
    series: currentPost.series,
    currentIndex: currentIndex + 1,
    totalPosts: seriesPosts.length,
    previousPost: currentIndex > 0 ? seriesPosts[currentIndex - 1] : undefined,
    nextPost: currentIndex < seriesPosts.length - 1
      ? seriesPosts[currentIndex + 1]
      : undefined,
    allPosts: seriesPosts,
  };
}
