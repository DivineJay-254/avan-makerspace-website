import Header from '@/components/header'
import Footer from '@/components/footer'
import Stats from '@/components/stats'
import { ImpactDirectory } from '@/components/public/impact-directory'
import { cmsUsesFirestore, getPublishedContent, getPublicSettings } from '@/lib/firebase/content'

export const metadata = {
  title: 'Our Impact | Avan Makerspace',
  description: 'Explore published learning outcomes and impact measures from Avan Makerspace.',
}

export default async function ImpactPage() {
  const [settings, metrics] = await Promise.all([getPublicSettings(), getPublishedContent('impact')])
  const cmsEnabled = cmsUsesFirestore(settings)

  return (
    <div className="w-full">
      <Header />
      <main>
        {cmsEnabled ? <ImpactDirectory metrics={metrics ?? []} /> : <><Stats />{metrics?.length ? <ImpactDirectory metrics={metrics} /> : null}</>}
      </main>
      <Footer />
    </div>
  )
}
