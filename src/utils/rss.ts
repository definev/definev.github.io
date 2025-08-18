import type { BlogPost } from './blog'
import { getAllPosts } from './blog'

/**
 * Generate RSS XML feed from blog posts
 */
export async function generateRSSFeed(): Promise<string> {
  const posts = await getAllPosts()
  const publishedPosts = posts.filter(post => post.published !== false)
  const sortedPosts = publishedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const siteUrl = 'https://definev.github.io'
  const feedUrl = `${siteUrl}/rss.xml`
  const buildDate = new Date().toUTCString()

  const rssItems = sortedPosts.map(post => {
    const postUrl = `${siteUrl}/blog/${post.slug}`
    const postDate = new Date(post.date).toUTCString()
    
    // Clean content for RSS - remove markdown and limit length
    const cleanContent = post.content
      .replace(/^#+ /gm, '') // Remove markdown headers
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold markdown
      .replace(/\*(.*?)\*/g, '$1') // Remove italic markdown
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links, keep text
      .replace(/```[\s\S]*?```/g, '[Code block]') // Replace code blocks
      .replace(/`([^`]+)`/g, '$1') // Remove inline code markdown
      .replace(/\n+/g, ' ') // Replace newlines with spaces
      .trim()
    
    const description = post.excerpt || cleanContent.substring(0, 200) + '...'

    return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid>${postUrl}</guid>
      <description><![CDATA[${description}]]></description>
      <pubDate>${postDate}</pubDate>
      <author>daiduong.workmail@gmail.com (Bùi Đại Dương - Zennn.mind)</author>
      ${post.tags.map(tag => `<category>${tag}</category>`).join('\n      ')}
      ${post.series ? `<category>Series: ${post.series}</category>` : ''}
    </item>`
  }).join('\n')

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Bùi Đại Dương (Zennn.mind) - Technical Blog</title>
    <link>${siteUrl}</link>
    <description>Technical blog posts about software development, programming, and technology insights from a young developer passionate about understanding how machines think.</description>
    <language>en-us</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <pubDate>${buildDate}</pubDate>
    <ttl>1440</ttl>
    <managingEditor>daiduong.workmail@gmail.com (Bùi Đại Dương - Zennn.mind)</managingEditor>
    <webMaster>daiduong.workmail@gmail.com (Bùi Đại Dương - Zennn.mind)</webMaster>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`

  return rssXml
}

/**
 * Generate RSS feed for a specific series
 */
export async function generateSeriesRSSFeed(seriesName: string): Promise<string> {
  const allPosts = await getAllPosts()
  const seriesPosts = allPosts
    .filter(post => post.series?.toLowerCase() === seriesName.toLowerCase() && post.published !== false)
    .sort((a, b) => (a.seriesOrder || 0) - (b.seriesOrder || 0))

  if (seriesPosts.length === 0) {
    throw new Error(`No posts found for series: ${seriesName}`)
  }

  const siteUrl = 'https://definev.github.io'
  const feedUrl = `${siteUrl}/rss/series/${encodeURIComponent(seriesName.toLowerCase())}.xml`
  const buildDate = new Date().toUTCString()

  const rssItems = seriesPosts.map(post => {
    const postUrl = `${siteUrl}/blog/${post.slug}`
    const postDate = new Date(post.date).toUTCString()
    
    const cleanContent = post.content
      .replace(/^#+ /gm, '')
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/```[\s\S]*?```/g, '[Code block]')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\n+/g, ' ')
      .trim()
    
    const description = post.excerpt || cleanContent.substring(0, 200) + '...'
    const seriesInfo = post.seriesOrder ? ` (Part ${post.seriesOrder} of ${seriesPosts.length})` : ''

    return `
    <item>
      <title><![CDATA[${post.title}${seriesInfo}]]></title>
      <link>${postUrl}</link>
      <guid>${postUrl}</guid>
      <description><![CDATA[${description}]]></description>
      <pubDate>${postDate}</pubDate>
      <author>daiduong.workmail@gmail.com (Bùi Đại Dương - Zennn.mind)</author>
      ${post.tags.map(tag => `<category>${tag}</category>`).join('\n      ')}
      <category>Series: ${post.series}</category>
    </item>`
  }).join('\n')

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Bùi Đại Dương (Zennn.mind) - ${seriesName} Series</title>
    <link>${siteUrl}</link>
    <description>Posts from the "${seriesName}" series - Technical insights about software development and programming.</description>
    <language>en-us</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <pubDate>${buildDate}</pubDate>
    <ttl>1440</ttl>
    <managingEditor>daiduong.workmail@gmail.com (Bùi Đại Dương - Zennn.mind)</managingEditor>
    <webMaster>daiduong.workmail@gmail.com (Bùi Đại Dương - Zennn.mind)</webMaster>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`

  return rssXml
}
