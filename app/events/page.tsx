import type { Metadata } from 'next'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { ContentCard, ContentError, ContentPageHeader } from '@/components/public/content-card'
import { CmsNotice } from '@/components/public/cms-notice'
import { getMediaUrl, getPublishedContent } from '@/lib/firebase/content'
import { isFirebaseServerConfigured } from '@/lib/firebase/admin'
import type { CmsRecord } from '@/lib/firebase/types'

export const metadata: Metadata = { title: 'Events | Avan Makerspace', description: 'Explore events and workshops at Avan Makerspace.' }

export default async function EventsPage() {
  const configured = isFirebaseServerConfigured()
  let events: CmsRecord[] | null = null
  let failed = false
  if (configured) {
    try { events = await getPublishedContent('events') } catch { failed = true }
  }

  return (
    <>
      <Header />
      <main>
        <ContentPageHeader eyebrow="Events & workshops" title="Learn, build, and connect" description="Find upcoming opportunities to explore technology, creativity, and community at Avan Makerspace." />
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <CmsNotice configured={configured}>
            {failed ? <ContentError /> : events?.length ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {events.map((event) => <ContentCard key={event.id} href={`/events/${event.slug}`} title={String(event.title || 'Untitled event')} excerpt={String(event.description || '')} meta={[event.eventDate, event.location].filter(Boolean).join(' · ')} label="Event" image={event.featuredImage ? getMediaUrl('events', event.id, String(event.featuredImage)) : undefined} imageAlt={String(event.imageAlt || '')} />)}
              </div>
            ) : <div className="rounded-2xl border border-dashed border-border p-10 text-center"><h2 className="text-xl font-semibold">No events published yet</h2><p className="mt-2 text-muted-foreground">Please check back for the next community event.</p></div>}
          </CmsNotice>
        </section>
      </main>
      <Footer />
    </>
  )
}
