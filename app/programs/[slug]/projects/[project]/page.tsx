import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, CheckCircle2, Circle } from 'lucide-react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { aquaSmart, avantechProjects } from '@/lib/avantech-projects'
import { cmsUsesFirestore, getMediaUrl, getPublishedBySlug, getPublicSettings } from '@/lib/firebase/content'
import type { CmsRecord } from '@/lib/firebase/types'

type PageProps = { params: Promise<{ slug: string; project: string }> }

function CmsProjectDetail({ project }: Readonly<{ project: CmsRecord }>) {
  const imagePath = String(project.featuredImage || '')
  const imageUrl = imagePath ? getMediaUrl('projects', project.id, imagePath) : ''
  const technologies = Array.isArray(project.technologies) ? project.technologies.map(String) : []
  return (
    <div className="w-full"><Header /><main>
      <div className="bg-muted/30 py-4"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><Link href="/programs/avantech#projects" className="inline-flex items-center gap-2 text-secondary hover:underline"><ArrowLeft aria-hidden="true" size={17} /> Back to AvanTech projects</Link></div></div>
      <section className="bg-primary text-primary-foreground"><div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20"><div><p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-secondary">{String(project.category || 'Project')}</p><h1 className="mb-5 text-4xl font-bold leading-tight sm:text-5xl">{String(project.title || '')}</h1><p className="text-lg leading-relaxed text-primary-foreground/85">{String(project.description || '')}</p></div>{imageUrl ? <div className="relative aspect-[4/3] overflow-hidden rounded-2xl"><Image src={imageUrl} alt={String(project.imageAlt || project.title || '')} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" unoptimized /></div> : <div className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-white/20 bg-white/5 p-8 text-center text-primary-foreground/75">No project image has been published.</div>}</div></section>
      <section className="py-16 sm:py-20"><div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8"><h2 className="text-3xl font-bold">Project overview</h2><p className="mt-5 whitespace-pre-wrap text-lg leading-relaxed text-muted-foreground">{String(project.overview || project.description || '')}</p>{typeof project.opportunity === 'string' && project.opportunity ? <section className="mt-10"><h3 className="text-xl font-bold">The opportunity</h3><p className="mt-3 whitespace-pre-wrap leading-relaxed text-muted-foreground">{String(project.opportunity)}</p></section> : null}{typeof project.build === 'string' && project.build ? <section className="mt-8"><h3 className="text-xl font-bold">What students set out to build</h3><p className="mt-3 whitespace-pre-wrap leading-relaxed text-muted-foreground">{String(project.build)}</p></section> : null}{technologies.length ? <section className="mt-10"><h3 className="text-xl font-bold">Technologies and concepts</h3><ul className="mt-4 grid gap-3 sm:grid-cols-2">{technologies.map((item) => <li key={item} className="rounded-lg bg-muted/50 p-4">{item}</li>)}</ul></section> : null}{typeof project.learning === 'string' && project.learning ? <section className="mt-10"><h3 className="text-xl font-bold">Learning outcomes</h3><p className="mt-3 whitespace-pre-wrap leading-relaxed text-muted-foreground">{String(project.learning)}</p></section> : null}{typeof project.status === 'string' && project.status ? <p className="mt-10 rounded-xl bg-muted/40 p-4 text-sm text-muted-foreground">Development status: {String(project.status)}</p> : null}</div></section>
    </main><Footer /></div>
  )
}

export async function generateMetadata({ params }: PageProps) {
  const { project } = await params
  const cmsProject = await getPublishedBySlug('projects', project)
  if (cmsProject) return { title: `${String(cmsProject.title)} | AvanTech`, description: String(cmsProject.description || '') }
  if (project === 'aquasmart') return { title: 'AquaSmart | AvanTech', description: aquaSmart.description }
  const item = avantechProjects.find((entry) => entry.slug === project)
  return item ? { title: `${item.title} | AvanTech`, description: item.description } : { title: 'Project not found | AvanTech' }
}

export default async function AvanTechProjectPage({ params }: PageProps) {
  const { slug, project: projectSlug } = await params
  if (slug !== 'avantech') notFound()
  const [settings, cmsProject] = await Promise.all([getPublicSettings(), getPublishedBySlug('projects', projectSlug)])
  if (cmsProject) return <CmsProjectDetail project={cmsProject} />
  if (cmsUsesFirestore(settings)) notFound()
  const isAquaSmart = projectSlug === 'aquasmart'
  const project = avantechProjects.find((entry) => entry.slug === projectSlug)
  if (!isAquaSmart && !project) notFound()

  return (
    <div className="w-full">
      <Header />
      <main>
        <div className="bg-muted/30 py-4">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Link href="/programs/avantech" className="inline-flex items-center gap-2 text-secondary hover:underline"><ArrowLeft aria-hidden="true" size={17} /> Back to AvanTech projects</Link>
          </div>
        </div>

        {isAquaSmart ? (
          <>
            <section className="bg-primary text-primary-foreground">
              <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
                <div>
                  <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-secondary">Ongoing innovation initiative</p>
                  <h1 className="mb-5 text-4xl font-bold leading-tight sm:text-5xl">{aquaSmart.title} — Engineering Better Water Solutions.</h1>
                  <p className="mb-5 text-lg leading-relaxed text-primary-foreground/85">{aquaSmart.description}</p>
                  <p className="leading-relaxed text-primary-foreground/75">Access to safe and reliable water remains a significant challenge in communities such as Kakuma Refugee Camp. AquaSmart explores how adaptable water-treatment systems can help address different water-quality challenges through modular engineering and practical innovation.</p>
                </div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image src={aquaSmart.image} alt={aquaSmart.alt} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                  <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-bold text-primary">Illustrative concept — not a completed prototype photograph</span>
                </div>
              </div>
            </section>

            <section className="py-16 sm:py-20">
              <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:px-8">
                <div>
                  <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-secondary">Development focus</p>
                  <h2 className="mb-7 text-3xl font-bold sm:text-4xl">What we are developing</h2>
                  <div className="grid gap-4 sm:grid-cols-2">{aquaSmart.areas.map((area, index) => <article key={area.title} className="rounded-xl border border-border bg-card p-5"><span className="mb-3 inline-flex size-8 items-center justify-center rounded-full bg-secondary/10 text-sm font-bold text-secondary">{index + 1}</span><h3 className="mb-2 font-bold">{area.title}</h3><p className="text-sm leading-relaxed text-foreground/70">{area.description}</p></article>)}</div>
                  <p className="mt-6 rounded-xl border border-accent/30 bg-accent/5 p-4 text-sm leading-relaxed text-foreground/75">AquaSmart is still under development. No certification, independent laboratory testing or contaminant-removal performance is claimed.</p>
                </div>
                <figure>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl"><Image src="/aquasmart-water-testing.png" alt="Illustrative water-sample testing setup with sample vials and a basic test kit" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" /><span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-bold text-primary">Illustrative testing visual</span></div>
                  <figcaption className="mt-3 text-sm text-foreground/60">Representative visual for the water-quality testing pathway; not a photograph of completed AquaSmart testing.</figcaption>
                </figure>
              </div>
            </section>

            <section className="bg-muted/30 py-16 sm:py-20">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-secondary">A work in progress</p><h2 className="mb-10 text-3xl font-bold sm:text-4xl">AquaSmart development journey</h2>
                <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{aquaSmart.timeline.map((step, index) => <li key={step.title} className="rounded-xl border border-border bg-background p-5"><div className="mb-4 flex items-center gap-3">{index < 3 ? <CheckCircle2 aria-hidden="true" className="text-secondary" /> : <Circle aria-hidden="true" className="text-muted-foreground" />}<span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Stage {String(index + 1).padStart(2, '0')}</span></div><h3 className="mb-2 font-bold">{step.title}</h3><p className="text-sm leading-relaxed text-foreground/70">{step.description}</p></li>)}</ol>
                <p className="mt-6 text-sm text-foreground/60">This timeline describes the initiative&apos;s development pathway, not a claim that each stage is complete.</p>
              </div>
            </section>
          </>
        ) : project ? (
          <>
            <section className="bg-primary text-primary-foreground">
              <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
                <div><p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-secondary">{project.category}</p><h1 className="mb-5 text-4xl font-bold leading-tight sm:text-5xl">{project.title}</h1><p className="text-lg leading-relaxed text-primary-foreground/85">{project.description}</p></div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl"><Image src={project.image} alt={project.alt} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" /><span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-bold text-primary">Illustrative prototype concept</span></div>
              </div>
            </section>
            <section className="py-16 sm:py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-10 max-w-3xl"><p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-secondary">Project overview</p><h2 className="mb-4 text-3xl font-bold">Learning through exploration</h2><p className="text-lg leading-relaxed text-foreground/75">{project.overview}</p></div>
              <div className="grid gap-5 md:grid-cols-2"><article className="rounded-xl border border-border p-6"><h3 className="mb-3 text-lg font-bold">The opportunity</h3><p className="leading-relaxed text-foreground/70">{project.opportunity}</p></article><article className="rounded-xl border border-border p-6"><h3 className="mb-3 text-lg font-bold">What students set out to build</h3><p className="leading-relaxed text-foreground/70">{project.build}</p></article></div>
              <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_0.8fr]"><div><h2 className="mb-5 text-2xl font-bold">Technologies and concepts</h2><ul className="grid gap-3 sm:grid-cols-2">{project.technologies.map((item) => <li key={item} className="rounded-lg bg-muted/50 p-4 text-sm text-foreground/75">{item}</li>)}</ul><p className="mt-6 text-sm text-foreground/60">Specific components and implementation details are not yet documented; descriptions are intentionally limited to the information available.</p></div><article className="rounded-2xl bg-primary p-7 text-primary-foreground"><p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-secondary">Learning outcomes</p><h2 className="mb-4 text-2xl font-bold">What students explored</h2><p className="mb-7 leading-relaxed text-primary-foreground/80">{project.learning}</p><p className="mb-2 text-sm font-bold">Development status</p><p className="text-sm leading-relaxed text-primary-foreground/75">{project.status}</p></article></div>
              <p className="mt-10 text-xs text-foreground/50">Illustrative AI-generated visual. It represents the project concept and is not a photograph of an Avan student or a completed project.</p>
            </div></section>
          </>
        ) : null}
        <section className="bg-muted/30 py-10"><div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8"><div><h2 className="text-xl font-bold">Explore more AvanTech projects</h2><p className="mt-1 text-sm text-foreground/70">Discover more ideas explored by young innovators.</p></div><Link href="/programs/avantech#projects" className="inline-flex items-center gap-2 font-semibold text-secondary hover:gap-3">All projects <ArrowRight aria-hidden="true" size={17} /></Link></div></section>
      </main>
      <Footer />
    </div>
  )
}
