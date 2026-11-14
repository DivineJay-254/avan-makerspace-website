import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '@/components/header'
import Footer from '@/components/footer'
import ProgramDetailLegacy from '@/components/program-detail-legacy'
import AvanTechPage from '@/components/avantech-page'
import { cmsUsesFirestore, getPublishedBySlug, getPublicSettings } from '@/lib/firebase/content'
import type { CmsRecord } from '@/lib/firebase/types'

type PageProps = { params: Promise<{ slug: string }> }

function CmsProgramDetail({ program }: Readonly<{ program: CmsRecord }>) {
  const details = Array.isArray(program.details) ? program.details.map(String) : []
  const featuredImage = typeof program.featuredImage === 'string' ? program.featuredImage : ''
  const image = featuredImage.startsWith('content/')
    ? `/api/media/programs/${program.id}?path=${encodeURIComponent(featuredImage)}`
    : featuredImage

  return (
    <div className="w-full">
      <Header />
      <main>
        <section className="bg-primary py-16 text-primary-foreground sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <Link href="/programs" className="text-sm font-semibold text-primary-foreground/80 underline-offset-4 hover:underline">← All programs</Link>
            <p className="mt-8 text-sm font-bold uppercase tracking-[0.18em] text-secondary">{String(program.category || 'Program')}</p>
            <h1 className="mt-3 text-4xl font-bold sm:text-5xl">{String(program.title || '')}</h1>
            {typeof program.tagline === 'string' && program.tagline ? <p className="mt-3 text-xl text-primary-foreground/80">{program.tagline}</p> : null}
          </div>
        </section>
        <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          {image ? <Image src={image} alt={String(program.imageAlt || '')} width={1200} height={720} unoptimized className="mb-8 max-h-[32rem] w-full rounded-2xl object-cover" /> : null}
          {typeof program.description === 'string' && program.description ? <p className="whitespace-pre-wrap text-lg leading-relaxed text-muted-foreground">{program.description}</p> : null}
          {details.length ? <section className="mt-10"><h2 className="text-2xl font-bold">Program details</h2><ul className="mt-4 flex flex-col gap-3">{details.map((detail) => <li key={detail} className="rounded-lg border border-border p-4">{detail}</li>)}</ul></section> : null}
          {typeof program.impact === 'string' && program.impact ? <section className="mt-10 rounded-2xl bg-muted/40 p-6"><h2 className="text-xl font-bold">Impact</h2><p className="mt-3 whitespace-pre-wrap leading-relaxed text-muted-foreground">{program.impact}</p></section> : null}
        </section>
      </main>
      <Footer />
    </div>
  )
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const program = await getPublishedBySlug('programs', slug)
  return program ? { title: `${String(program.title)} | Avan Makerspace`, description: String(program.description || '') } : { title: 'Programs | Avan Makerspace' }
}

export default async function ProgramDetailRoute({ params }: PageProps) {
  const { slug } = await params
  if (slug === 'avantech') return <AvanTechPage />
  const [settings, program] = await Promise.all([getPublicSettings(), getPublishedBySlug('programs', slug)])
  if (program) return <CmsProgramDetail program={program} />
  if (cmsUsesFirestore(settings)) notFound()
  return <ProgramDetailLegacy />
}
