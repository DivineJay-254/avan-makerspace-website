import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { ContentError } from '@/components/public/content-card'
import { CmsNotice } from '@/components/public/cms-notice'
import { EventRegistrationForm } from '@/components/public/event-registration-form'
import { getMediaUrl, getPublishedBySlug } from '@/lib/firebase/content'
import { isFirebaseServerConfigured } from '@/lib/firebase/admin'

export const metadata: Metadata = { title: 'Event | Avan Makerspace', description: 'Event details and registration at Avan Makerspace.' }

export default async function EventDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const configured = isFirebaseServerConfigured()
  let event: Awaited<ReturnType<typeof getPublishedBySlug>> = null
  let failed = false
  if (configured) {
    try { event = await getPublishedBySlug('events', slug) } catch { failed = true }
  }
  if (configured && !failed && !event) notFound()

  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {!configured ? <CmsNotice configured={false}><></></CmsNotice> : failed ? <ContentError /> : event ? (
          <article>
            <Link href="/events" className="text-sm font-semibold text-primary underline-offset-4 hover:underline">← All events</Link>
            <p className="mt-8 text-sm font-bold uppercase tracking-[0.16em] text-secondary">Event</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{String(event.title || '')}</h1>
            <p className="mt-4 text-muted-foreground">{[event.eventDate, typeof event.timeZone === 'string' ? event.timeZone : '', event.location].filter(Boolean).join(' · ')}</p>
            {typeof event.featuredImage === 'string' && event.featuredImage ? <Image src={getMediaUrl('events', event.id, event.featuredImage)} alt={String(event.imageAlt || '')} width={1200} height={700} unoptimized className="mt-8 max-h-[520px] w-full rounded-2xl object-cover" /> : null}
            <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_0.75fr]">
              <div className="whitespace-pre-wrap leading-relaxed text-muted-foreground">{String(event.description || '')}</div>
              <aside className="rounded-2xl border border-border bg-card p-6">
                {event.registrationEnabled === true ? <EventRegistrationForm eventId={event.id} eventTitle={String(event.title || '')} /> : <p className="text-sm text-muted-foreground">Registration is not open for this event.</p>}
              </aside>
            </div>
          </article>
        ) : null}
      </main>
      <Footer />
    </>
  )
}
