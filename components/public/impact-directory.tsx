import type { CmsRecord } from '@/lib/firebase/types'

export function ImpactDirectory({ metrics }: Readonly<{ metrics: CmsRecord[] }>) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto mb-12 max-w-3xl text-center"><p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary">Our impact</p><h1 className="mt-3 text-4xl font-bold sm:text-5xl">Learning through opportunity</h1><p className="mt-4 text-lg leading-relaxed text-muted-foreground">Published outcomes and measures shared by the Avan Makerspace team.</p></div>
      {metrics.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{metrics.map((metric) => <article key={metric.id} className="rounded-2xl border border-border bg-card p-7"><p className="text-sm font-bold uppercase tracking-[0.16em] text-secondary">{String(metric.title || 'Impact')}</p><p className="mt-4 text-4xl font-bold text-primary">{String(metric.value ?? '')}</p><h2 className="mt-3 text-lg font-semibold">{String(metric.label || '')}</h2>{typeof metric.description === 'string' && metric.description ? <p className="mt-2 leading-relaxed text-muted-foreground">{metric.description}</p> : null}</article>)}</div> : <div className="rounded-2xl border border-dashed border-border p-10 text-center"><h2 className="text-xl font-semibold">No impact measures published yet</h2><p className="mt-2 text-muted-foreground">Published measures will appear here when they are ready to share.</p></div>}
      <p className="mt-10 text-center text-sm text-muted-foreground">Figures shown here are entered and approved by Avan Makerspace administrators.</p>
    </section>
  )
}
