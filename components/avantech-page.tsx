import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowRight, Cpu, Lightbulb, Radio, Settings2, ShieldCheck, Sparkles, Waves, Wifi, Zap } from 'lucide-react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { aquaSmart, avantechProjects } from '@/lib/avantech-projects'
import { cmsUsesFirestore, getMediaUrl, getPublishedContent, getPublicSettings } from '@/lib/firebase/content'

const learningAreas = [
  { title: 'Robotics', description: 'Explore how machines move, sense and respond.', icon: Settings2 },
  { title: 'Arduino & Microcontrollers', description: 'Experiment with small, programmable control boards.', icon: Cpu },
  { title: 'Electronics', description: 'Build familiarity with circuits and electronic components.', icon: Zap },
  { title: 'Sensors & Automation', description: 'Discover how inputs can trigger useful actions.', icon: Radio },
  { title: 'Programming & Computational Thinking', description: 'Practice breaking a challenge into logical steps.', icon: Lightbulb },
  { title: 'Wireless Control', description: 'Explore communication between a controller and a device.', icon: Wifi },
  { title: 'Artificial Intelligence', description: 'Get introduced to emerging ideas in intelligent technology.', icon: Sparkles },
  { title: 'Engineering & Prototyping', description: 'Turn an idea into a model that can be explored and improved.', icon: Settings2 },
  { title: 'Problem-Solving', description: 'Learn through curiosity, testing and iteration.', icon: ShieldCheck },
]

const futureAreas = ['Advanced robotics', 'Smart agriculture', 'Environmental monitoring', 'Assistive technologies', 'AI-powered community solutions', 'Renewable energy systems', 'Water monitoring and automation']

export default async function AvanTechPage() {
  const [settings, publishedProjects] = await Promise.all([getPublicSettings(), getPublishedContent('projects')])
  const cmsEnabled = cmsUsesFirestore(settings)
  const cmsProjects = (publishedProjects ?? []).map((project) => ({
    id: project.id,
    slug: String(project.slug || project.id),
    image: project.featuredImage ? getMediaUrl('projects', project.id, String(project.featuredImage)) : '',
    alt: String(project.imageAlt || project.title || 'Project image'),
    category: String(project.category || 'Project'),
    title: String(project.title || 'Untitled project'),
    description: String(project.description || ''),
  }))
  const projectMap = new Map<string, { id: string; slug: string; image: string; alt: string; category: string; title: string; description: string }>()
  for (const project of avantechProjects) projectMap.set(project.slug, { id: project.slug, slug: project.slug, image: project.image, alt: project.alt, category: project.category, title: project.title, description: project.description })
  for (const project of cmsProjects) projectMap.set(project.slug, project)
  const displayedProjects = cmsEnabled ? cmsProjects : Array.from(projectMap.values())

  return (
    <div className="w-full">
      <Header />
      <main>
        <div className="bg-muted/30 py-4">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Link href="/programs" className="text-secondary hover:underline">← Back to Programs</Link>
          </div>
        </div>

        <section className="relative overflow-hidden bg-primary text-primary-foreground">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:px-8 lg:py-24">
            <div className="relative z-10">
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-secondary">AvanTech · Learn by doing</p>
              <h1 className="mb-6 max-w-2xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">Technology Is Better When We Build It.</h1>
              <p className="mb-5 max-w-2xl text-lg leading-relaxed text-primary-foreground/85">AvanTech is the technology and innovation division of Avan Makerspace, an inclusive innovation and creativity hub based in Kakuma Refugee Camp, Kenya. Avan Makerspace is refugee-led and empowers young people from refugee and host communities through technology, robotics, entrepreneurship, arts, and creative learning. We believe young people should not only learn about technology but also have the opportunity to build it. Through robotics, electronics, automation and hands-on engineering, we create opportunities for young innovators to transform ideas into practical solutions.</p>
              <p className="mb-8 max-w-2xl leading-relaxed text-primary-foreground/75">From smart homes and automated doors to voice-controlled vehicles and robotic rovers, our students are exploring how technology can solve real-world problems.</p>
              <Link href="#projects" className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-accent-foreground transition hover:bg-accent/90">See what we&apos;ve built <ArrowDown aria-hidden="true" size={18} /></Link>
            </div>
            <div className="relative min-h-[300px] overflow-hidden rounded-2xl border border-white/15 shadow-2xl sm:min-h-[420px]">
              <Image src="/robotics-bootcamp-1.jpg" alt="AvanTech learners exploring robotics together in a hands-on workshop" fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
              <p className="absolute bottom-5 left-5 max-w-sm text-sm font-medium text-white">AvanTech is Avan Makerspace&apos;s technology and innovation division, supporting refugee- and host-community youth in Kakuma.</p>
            </div>
          </div>
        </section>

        <section id="projects" className="scroll-mt-8 bg-background py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-2xl">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-secondary">Built by exploring</p>
              <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Projects We&apos;ve Built</h2>
              <p className="text-lg text-foreground/70">From imagination to experimentation, our students are turning ideas into technology.</p>
              <p className="mt-3 text-sm text-foreground/55">Project images are illustrative AI-generated concepts, not photographs of Avan students or completed projects.</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {displayedProjects.map((project, index) => (
                <article key={project.slug} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <Link href={`/programs/avantech/projects/${project.slug}`} className="relative block aspect-[4/3] overflow-hidden" aria-label={`View ${project.title} project`}>
                    {project.image ? <Image src={project.image} alt={project.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" unoptimized /> : <div className="flex h-full items-center justify-center bg-muted p-8 text-center font-semibold text-muted-foreground">{project.title}</div>}
                    <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-bold tracking-wide text-primary">PROJECT {String(index + 1).padStart(2, '0')}</span>
                  </Link>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="mb-2 text-xs font-bold uppercase leading-relaxed tracking-wider text-secondary">{project.category}</p>
                    <h3 className="mb-3 text-2xl font-bold">{project.title}</h3>
                    <p className="mb-6 flex-1 leading-relaxed text-foreground/70">{project.description}</p>
                    <Link href={`/programs/avantech/projects/${project.slug}`} className="inline-flex w-fit items-center gap-2 font-semibold text-secondary transition hover:gap-3">View Project <ArrowRight aria-hidden="true" size={17} /></Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {!cmsEnabled && (
          <section className="bg-muted/30 py-16 sm:py-20">
            <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.15fr] lg:px-8">
            <div className="relative min-h-[320px] overflow-hidden rounded-2xl bg-primary">
              <Image src={aquaSmart.image} alt={aquaSmart.alt} fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" />
              <div className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">Illustrative project concept</div>
            </div>
            <div className="flex flex-col justify-center">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-secondary">Ongoing innovation initiative</p>
              <h2 className="mb-5 text-3xl font-bold sm:text-4xl">AquaSmart — Engineering Better Water Solutions.</h2>
              <p className="mb-4 leading-relaxed text-foreground/75">{aquaSmart.description}</p>
              <p className="mb-6 leading-relaxed text-foreground/70">Access to safe and reliable water remains a significant challenge in communities such as Kakuma Refugee Camp. AquaSmart explores how adaptable water-treatment systems can help address different water-quality challenges through modular engineering and practical innovation.</p>
              <div className="mb-7 grid gap-3 sm:grid-cols-2">
                {aquaSmart.areas.map((area) => <div key={area.title} className="rounded-xl border border-border bg-background p-4"><h3 className="mb-1 font-bold">{area.title}</h3><p className="text-sm leading-relaxed text-foreground/70">{area.description}</p></div>)}
              </div>
              <p className="mb-6 text-sm text-foreground/60">AquaSmart is under development. No certification, independent laboratory testing or contaminant-removal performance is claimed.</p>
              <Link href="/programs/avantech/projects/aquasmart" className="inline-flex w-fit items-center gap-2 rounded-full bg-secondary px-6 py-3 font-semibold text-secondary-foreground transition hover:bg-secondary/90">Explore AquaSmart <ArrowRight aria-hidden="true" size={18} /></Link>
            </div>
            </div>
          </section>
        )}

        <section className="bg-background py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-2xl"><p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-secondary">Learning through making</p><h2 className="mb-4 text-3xl font-bold sm:text-4xl">Skills Behind the Innovation</h2><p className="text-foreground/70">These are areas AvanTech introduces for learning and experimentation. Every learner&apos;s journey is different.</p></div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {learningAreas.map(({ title, description, icon: Icon }) => <div key={title} className="rounded-xl border border-border bg-card p-5 transition hover:border-secondary/50 hover:shadow-md"><Icon aria-hidden="true" className="mb-4 text-secondary" size={24} /><h3 className="mb-2 font-bold">{title}</h3><p className="text-sm leading-relaxed text-foreground/70">{description}</p></div>)}
            </div>
          </div>
        </section>

        <section className="bg-primary py-16 text-primary-foreground sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
            <div><p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-secondary">Looking ahead</p><h2 className="mb-4 text-3xl font-bold sm:text-4xl">What&apos;s Next?</h2><p className="leading-relaxed text-primary-foreground/75">AvanTech intends to continue expanding practical technology and robotics opportunities for young people. These are future exploration areas, not completed projects.</p></div>
            <div className="flex flex-wrap content-start gap-3">{futureAreas.map((area) => <span key={area} className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-primary-foreground/90">{area}</span>)}</div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
