import Image from 'next/image'
import Link from 'next/link'
import { getMediaUrl } from '@/lib/firebase/media-url'
import type { CmsRecord } from '@/lib/firebase/types'

export function ProgramDirectory({ programs, title = 'Programs' }: Readonly<{ programs: CmsRecord[]; title?: string }>) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="mb-10"><p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary">Learn by doing</p><h1 className="mt-3 text-4xl font-bold sm:text-5xl">{title}</h1><p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">Explore learning opportunities and creative programs offered by Avan Makerspace.</p></div>
      {programs.length ? <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{programs.map((program) => <article key={program.id} className="overflow-hidden rounded-2xl border border-border bg-card">
        {typeof program.featuredImage === 'string' && program.featuredImage ? <Image src={getMediaUrl('programs', program.id, program.featuredImage)} alt={String(program.imageAlt || '')} width={800} height={500} unoptimized className="h-52 w-full object-cover" /> : <div aria-hidden="true" className="h-52 bg-gradient-to-br from-primary/15 via-secondary/10 to-background" />}
        <div className="p-6"><p className="text-xs font-bold uppercase tracking-[0.16em] text-secondary">{String(program.category || 'Program')}</p><h2 className="mt-2 text-2xl font-bold">{String(program.title || 'Untitled program')}</h2>{typeof program.tagline === 'string' && program.tagline ? <p className="mt-2 font-medium">{program.tagline}</p> : null}<p className="mt-3 leading-relaxed text-muted-foreground">{String(program.description || '')}</p><Link href={`/programs/${program.slug}`} className="mt-5 inline-flex font-semibold text-primary underline-offset-4 hover:underline">Explore program</Link></div>
      </article>)}</div> : <div className="rounded-2xl border border-dashed border-border p-10 text-center"><h2 className="text-xl font-semibold">No programs published yet</h2><p className="mt-2 text-muted-foreground">Check back as the program team shares new learning opportunities.</p></div>}
    </section>
  )
}
