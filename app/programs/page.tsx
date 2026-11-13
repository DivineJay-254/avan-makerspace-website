import ProgramsPage from '@/components/programs-legacy-page'
import { getPublishedContent, getPublicSettings, cmsUsesFirestore } from '@/lib/firebase/content'

export const metadata = {
  title: 'Programs | Avan Makerspace',
  description: 'Explore Avan Makerspace programs in technology, creative arts, performance, and community learning.',
}

export default async function ProgramsRoute() {
  const [settings, publishedPrograms] = await Promise.all([getPublicSettings(), getPublishedContent('programs')])
  const cmsEnabled = cmsUsesFirestore(settings)
  return <ProgramsPage cmsPrograms={publishedPrograms ?? []} cmsEnabled={cmsEnabled} />
}
