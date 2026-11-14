import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { ContentError, ContentPageHeader } from '@/components/public/content-card'
import { CmsNotice } from '@/components/public/cms-notice'
import { getMediaUrl, getPublishedContent } from '@/lib/firebase/content'
import { isFirebaseServerConfigured } from '@/lib/firebase/admin'
import type { CmsRecord } from '@/lib/firebase/types'

export const metadata: Metadata = { title: 'Gallery | Avan Makerspace', description: 'Explore moments and projects from Avan Makerspace.' }

export default async function GalleryPage() {
  const configured = isFirebaseServerConfigured()
  let entries: CmsRecord[] | null = null
  let failed = false
  if (configured) {
    try { entries = await getPublishedContent('gallery') } catch { failed = true }
  }
  return (
    <>
      <Header />
      <main>
        <ContentPageHeader eyebrow="Gallery" title="A community that makes" description="A growing collection of moments, experiments, and finished work from our learning community." />
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <CmsNotice configured={configured}>
            {failed ? <ContentError /> : entries?.length ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {entries.map((entry) => <figure key={entry.id} className="overflow-hidden rounded-2xl border border-border bg-card">
                  <Image src={getMediaUrl('gallery', entry.id, String(entry.imagePath || ''))} alt={String(entry.alt || entry.title || '')} width={900} height={700} unoptimized className="aspect-[4/3] w-full object-cover" />
                  <figcaption className="p-5"><h2 className="font-semibold">{String(entry.title || 'Makerspace moment')}</h2>{typeof entry.caption === 'string' && entry.caption ? <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{entry.caption}</p> : null}</figcaption>
                </figure>)}
              </div>
            ) : <div className="rounded-2xl border border-dashed border-border p-10 text-center"><h2 className="text-xl font-semibold">The gallery is getting started</h2><p className="mt-2 text-muted-foreground">Published photos will appear here.</p></div>}
          </CmsNotice>
        </section>
      </main>
      <Footer />
    </>
  )
}
