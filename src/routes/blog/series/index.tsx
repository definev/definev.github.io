import { createFileRoute, Link } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { getAllSeries, getAllSeriesMeta } from '~/utils/blog'

// Server function to retrieve all series with counts and latest date
const getAllSeriesServer = createServerFn({ method: 'GET' }).handler(async () => {
  const all = await getAllSeriesMeta()
  // Hide unpublished series; sort by latest date desc
  const series = all
    .filter((s) => s.published !== false)
    .sort((a, b) => new Date(b.latestDate || 0).getTime() - new Date(a.latestDate || 0).getTime())
  return series
})

export const Route = createFileRoute('/blog/series/')({
  component: SeriesIndex,
  loader: async () => {
    const series = await getAllSeriesServer()
    return { series }
  },
  head: () => ({
    meta: [
      { title: 'Blog Series - Bùi Đại Dương (Zennn.mind)' },
      {
        name: 'description',
        content: 'Browse blog posts grouped by series with reading order.',
      },
    ],
  }),
})

function SeriesIndex() {
  const { series } = Route.useLoaderData()

  return (
    <div className="min-h-screen paper-texture">
      <div className="section-padding pt-12 pb-28">
        <div className="container-max">
          {/* Back to Blog/Home Buttons */}
          <div className="mb-8 flex justify-between items-start gap-4 max-w-4xl mx-auto">
            <Link
              to="/"
              className="inline-flex items-center gap-2 btn-brutal-outline text-sm uppercase tracking-wider"
            >
              {"<"} HOME
            </Link>


            <Link
              className="inline-flex items-center gap-2 btn-brutal text-sm uppercase tracking-wider"
              to="/blog/posts"
            >
              [POSTS]
            </Link>
          </div>

          {/* Header */}
          <div className="text-center max-w-4xl mx-auto mb-10">
            <div className="bg-accent border-2 border-border-brutal shadow-md p-4 max-w-4xl mx-auto">
              <p className="text-ink text-sm font-bold">
                {">>>"} Explore posts organized into series with suggested reading order.
              </p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            {series.length === 0 ? (
              <div className="text-center py-16">
                <div className="bg-paper border-2 border-border-brutal shadow-lg p-8 max-w-lg mx-auto">
                  <h3 className="text-xl font-display font-bold text-ink uppercase tracking-tight mb-4">
                    NO SERIES YET
                  </h3>
                  <p className="text-ink font-bold text-sm">
                    Check back later when new series are published.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {series.map(s => (
                  <article key={s.title} className="w-full bg-paper-dark border-2 border-border-brutal shadow-lg hover:shadow-xl transition-all">
                    <div className="p-6 md:p-8">
                      <h3 className="font-display font-bold text-ink uppercase tracking-tight mb-3 text-lg md:text-xl">
                        <Link to="/blog/series/$series" params={{ series: s.slug }} className="hover:text-accent transition-colors">
                          {s.title}
                        </Link>
                      </h3>
                      <p className="text-ink font-bold text-sm">{s.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}


