import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { getPostsBySeries, getSeriesMetaBySlug } from '~/utils/blog'

// Server function to retrieve posts for a series
const getSeriesPostsServer = createServerFn({ method: 'GET' })
  .validator((seriesSlug: string) => seriesSlug)
  .handler(async ({ data: seriesSlug }) => {
    const seriesMeta = await getSeriesMetaBySlug(seriesSlug)
    if (!seriesMeta) {
      throw notFound()
    }
    if (seriesMeta.published === false) {
      throw notFound()
    }
    const posts = await getPostsBySeries(seriesMeta.slug)
    if (!posts || posts.length === 0) {
      throw notFound()
    }
    return { seriesMeta, posts }
  })

export const Route = createFileRoute('/blog/series/$series')({
  component: SeriesDetail,
  loader: async ({ params }) => {
    const data = await getSeriesPostsServer({ data: params.series })
    return data
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.seriesMeta.title} (Zennn.mind)` },
      {
        name: 'description',
        content: `Posts in the ${loaderData?.seriesMeta.title} series with reading order and dates.`,
      },
      {
        name: 'keywords',
        content: `${loaderData?.seriesMeta.title}, series, blog`,
      },
    ],
  }),
})

function SeriesDetail() {
  const { seriesMeta, posts } = Route.useLoaderData()

  return (
    <div className="min-h-screen paper-texture">
      <div className="section-padding pt-12 pb-28">
        <div className="container-max">
          {/* Nav */}
          <div className="mb-8 flex justify-between items-start gap-4 max-w-4xl mx-auto">
            <div className="flex items-center gap-2">
              <Link
                to="/blog/series"
                className="inline-flex items-center gap-2 btn-brutal-outline text-sm uppercase tracking-wider"
              >
                {"<"} ALL SERIES
              </Link>
              <Link
                to="/blog/posts"
                className="inline-flex items-center gap-2 btn-brutal-outline text-sm uppercase tracking-wider"
              >
                {"<"} BLOG
              </Link>
            </div>

            <div className="inline-flex items-center gap-2 btn-brutal text-sm uppercase tracking-wider">
              [SERIES]
            </div>
          </div>

          {/* Header */}
          <div className="max-w-4xl mx-auto mb-6">
            <div className="bg-paper border-2 border-border-brutal shadow-lg p-6 mb-3">
              <h1 className="text-2xl md:text-3xl font-display font-bold text-ink uppercase tracking-tight mb-3">
                {seriesMeta.title}
              </h1>
              <p className="text-ink font-bold text-sm md:text-sm leading-relaxed">
                {seriesMeta.description}
              </p>
            </div>
            {/* Divider */}
            <div className="h-px bg-border-brutal my-6"></div>
          </div>

          {/* Posts in series */}
          <div className="max-w-4xl mx-auto">
            <ol className="flex flex-col gap-6 list-decimal">
              {posts.map((post) => (
                <ul key={post.slug} className="bg-paper-dark border-2 border-border-brutal shadow-lg">
                  <div className="p-6">
                    <h3 className="font-display font-bold text-ink uppercase tracking-tight mb-3 text-lg md:text-lg">
                      <Link to="/blog/posts/$slug" params={{ slug: post.slug }} className="hover:text-accent transition-colors">
                        {post.title}
                      </Link>
                    </h3>
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <div className="flex items-center gap-3 text-ink-light text-sm font-bold">
                        <div className="bg-accent border border-accent px-3 py-1 text-white">
                          <time className="uppercase tracking-wider">
                            {new Date(post.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </time>
                        </div>
                        {typeof post.readTime === 'number' && (
                          <div className="bg-paper border border-border-brutal px-3 py-1">
                            <span className="uppercase tracking-wider">{post.readTime} MIN READ</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-ink leading-relaxed text-sm font-medium">
                      {post.excerpt}
                    </p>
                  </div>
                </ul>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}


