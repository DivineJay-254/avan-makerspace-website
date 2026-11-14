import type { Metadata } from 'next'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { ContentCard, ContentError, ContentPageHeader } from '@/components/public/content-card'
import { CmsNotice } from '@/components/public/cms-notice'
import { getMediaUrl, getPublishedContent } from '@/lib/firebase/content'
import { isFirebaseServerConfigured } from '@/lib/firebase/admin'
import type { CmsRecord } from '@/lib/firebase/types'

export const metadata: Metadata = { title: 'News | Avan Makerspace', description: 'Updates and stories from Avan Makerspace.' }

export default async function NewsPage() {
  const configured = isFirebaseServerConfigured()
  let posts: CmsRecord[] | null = null
  let failed = false
  if (configured) {
    try { posts = await getPublishedContent('posts') } catch { failed = true }
  }
  return (
    <>
      <Header />
      <main>
        <ContentPageHeader eyebrow="News & stories" title="Updates from the makerspace" description="Stories, announcements, and reflections from our learners and community." />
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <CmsNotice configured={configured}>
            {failed ? <ContentError /> : posts?.length ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {posts.map((post) => <ContentCard key={post.id} href={`/news/${post.slug}`} title={String(post.title || 'Untitled story')} excerpt={String(post.excerpt || '')} meta={String(post.publishedAt || '')} label={String(post.category || 'Story')} image={post.featuredImage ? getMediaUrl('posts', post.id, String(post.featuredImage)) : undefined} imageAlt={String(post.imageAlt || '')} />)}
              </div>
            ) : <div className="rounded-2xl border border-dashed border-border p-10 text-center"><h2 className="text-xl font-semibold">No stories published yet</h2><p className="mt-2 text-muted-foreground">New updates will appear here.</p></div>}
          </CmsNotice>
        </section>
      </main>
      <Footer />
    </>
  )
}
