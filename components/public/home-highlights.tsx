import Link from 'next/link'
import { getPublishedContent, getPublicSettings, getMediaUrl } from '@/lib/firebase/content'
import { ContentCard } from '@/components/public/content-card'
import type { CmsRecord } from '@/lib/firebase/types'

type FeaturedItem = { kind: 'event' | 'program' | 'project' | 'post'; record: CmsRecord }

export async function HomeHighlights() {
  let settings
  let events
  let programs
  let projects
  let posts
  let metrics

  try {
    ;[settings, events, programs, projects, posts, metrics] = await Promise.all([
      getPublicSettings(),
      getPublishedContent('events'),
      getPublishedContent('programs'),
      getPublishedContent('projects'),
      getPublishedContent('posts'),
      getPublishedContent('impact'),
    ])
  } catch {
    return <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"><p role="status" className="rounded-xl border border-border p-4 text-sm text-muted-foreground">Published updates are temporarily unavailable.</p></section>
  }

  if (events === null) return null

  const featured: FeaturedItem[] = [
    ...(events ?? []).filter((item) => item.featured === true).map((record) => ({ kind: 'event' as const, record })),
    ...(programs ?? []).filter((item) => item.featured === true).map((record) => ({ kind: 'program' as const, record })),
    ...(projects ?? []).filter((item) => item.featured === true).map((record) => ({ kind: 'project' as const, record })),
    ...(posts ?? []).filter((item) => item.featured === true).map((record) => ({ kind: 'post' as const, record })),
  ].slice(0, 4)

  return (
    <section className="bg-muted/20 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {typeof settings?.homepageAnnouncement === 'string' && settings.homepageAnnouncement.trim() ? <div className="mb-8 rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm leading-relaxed">{settings.homepageAnnouncement}</div> : null}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary">From the makerspace</p><h2 className="mt-2 text-3xl font-bold sm:text-4xl">Latest updates</h2><p className="mt-2 max-w-2xl text-muted-foreground">Published events, programs, projects, and stories from Avan Makerspace.</p></div>
          <Link href="/news" className="font-semibold text-secondary underline-offset-4 hover:underline">All news</Link>
        </div>

        {featured.length ? <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">{featured.map(({ kind, record }) => {
          const slug = String(record.slug || record.id)
          const imagePath = typeof record.featuredImage === 'string' ? record.featuredImage : ''
          const image = imagePath ? getMediaUrl(kind === 'event' ? 'events' : kind === 'program' ? 'programs' : kind === 'project' ? 'projects' : 'posts', record.id, imagePath) : undefined
          const href = kind === 'event' ? `/events/${slug}` : kind === 'post' ? `/news/${slug}` : kind === 'program' ? `/programs/${slug}` : `/programs/avantech/projects/${slug}`
          return <ContentCard key={`${kind}-${record.id}`} href={href} title={String(record.title || 'Untitled')} excerpt={String(record.summary || record.excerpt || record.description || '')} meta={kind} image={image} imageAlt={String(record.imageAlt || record.title || '')} />
        })}</div> : <p className="mt-8 rounded-xl border border-dashed border-border p-6 text-sm text-muted-foreground">No featured items are published yet.</p>}

        {(metrics ?? []).filter((metric) => metric.featured === true).length ? <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{(metrics ?? []).filter((metric) => metric.featured === true).slice(0, 4).map((metric) => <article key={metric.id} className="rounded-xl border border-border bg-background p-5"><p className="text-2xl font-bold">{String(metric.value || '')}{String(metric.suffix || '')}</p><h3 className="mt-1 font-semibold">{String(metric.title || '')}</h3>{typeof metric.description === 'string' && metric.description ? <p className="mt-2 text-sm text-muted-foreground">{metric.description}</p> : null}</article>)}</div> : null}
      </div>
    </section>
  )
}
