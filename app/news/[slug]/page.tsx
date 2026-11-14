import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { MarkdownContent } from '@/components/public/markdown-content'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { ContentError } from '@/components/public/content-card'
import { CmsNotice } from '@/components/public/cms-notice'
import { getMediaUrl, getPublishedBySlug } from '@/lib/firebase/content'
import { isFirebaseServerConfigured } from '@/lib/firebase/admin'

export const metadata: Metadata = { title: 'Story | Avan Makerspace', description: 'Read the latest story from Avan Makerspace.' }

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const configured = isFirebaseServerConfigured()
  let post: Awaited<ReturnType<typeof getPublishedBySlug>> = null
  let failed = false
  if (configured) {
    try { post = await getPublishedBySlug('posts', slug) } catch { failed = true }
  }
  if (configured && !failed && !post) notFound()
  return (
    <>
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {!configured ? <CmsNotice configured={false}><></></CmsNotice> : failed ? <ContentError /> : post ? (
          <article>
            <Link href="/news" className="text-sm font-semibold text-primary underline-offset-4 hover:underline">← All stories</Link>
            <p className="mt-8 text-sm font-bold uppercase tracking-[0.16em] text-secondary">{String(post.category || 'Story')}</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{String(post.title || '')}</h1>
            <p className="mt-4 text-muted-foreground">{[post.author, post.publishedAt].filter(Boolean).join(' · ')}</p>
            {typeof post.featuredImage === 'string' && post.featuredImage ? <Image src={getMediaUrl('posts', post.id, post.featuredImage)} alt={String(post.imageAlt || '')} width={1200} height={700} unoptimized className="mt-8 max-h-[520px] w-full rounded-2xl object-cover" /> : null}
            {typeof post.excerpt === 'string' && post.excerpt ? <p className="mt-8 text-xl leading-relaxed text-foreground">{post.excerpt}</p> : null}
            <MarkdownContent markdown={String(post.content || '')} />
          </article>
        ) : null}
      </main>
      <Footer />
    </>
  )
}
