import Header from '@/components/header'
import About from '@/components/about'
import Footer from '@/components/footer'
import { getPublicSettings } from '@/lib/firebase/content'

export const metadata = {
  title: 'About | Avan Makerspace',
  description: 'Learn about Avan Makerspace, its mission, and its community-focused approach to STEM learning.',
}

export default async function AboutPage() {
  const settings = await getPublicSettings()

  return (
    <div className="w-full">
      <Header />
      <main>
        <About />
        {settings?.aboutDescription ? (
          <section className="bg-muted/30 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary">Our story</p>
              <h2 className="mt-3 text-3xl font-bold">About Avan Makerspace</h2>
              <p className="mt-6 whitespace-pre-wrap text-lg leading-relaxed text-muted-foreground">{settings.aboutDescription}</p>
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </div>
  )
}
