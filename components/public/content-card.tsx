import Image from 'next/image'
import Link from 'next/link'

export function ContentCard({
  href,
  title,
  excerpt,
  meta,
  image,
  imageAlt,
  label,
}: Readonly<{
  href: string
  title: string
  excerpt: string
  meta?: string
  image?: string
  imageAlt?: string
  label?: string
}>) {
  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      {image ? (
        <Image src={image} alt={imageAlt || ''} width={720} height={440} unoptimized className="h-52 w-full object-cover" />
      ) : (
        <div aria-hidden="true" className="flex h-52 items-end bg-gradient-to-br from-primary/15 via-secondary/10 to-background p-6">
          <span className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Avan Makerspace</span>
        </div>
      )}
      <div className="flex flex-col gap-3 p-6">
        {label && <p className="text-xs font-bold uppercase tracking-[0.16em] text-secondary">{label}</p>}
        <h2 className="text-xl font-bold leading-snug"><Link href={href} className="hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{title}</Link></h2>
        {meta && <p className="text-sm text-muted-foreground">{meta}</p>}
        <p className="line-clamp-3 leading-relaxed text-muted-foreground">{excerpt}</p>
        <Link href={href} className="mt-1 text-sm font-semibold text-primary underline-offset-4 hover:underline">Read more</Link>
      </div>
    </article>
  )
}

export function ContentPageHeader({ eyebrow, title, description }: Readonly<{ eyebrow: string; title: string; description: string }>) {
  return (
    <header className="border-b border-border bg-muted/20 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary">{eyebrow}</p>
        <h1 className="mt-3 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </header>
  )
}

export function ContentError() {
  return <div role="alert" className="rounded-xl border border-destructive/30 bg-destructive/5 p-5 text-sm text-destructive">Content could not be loaded right now. Please try again later.</div>
}
