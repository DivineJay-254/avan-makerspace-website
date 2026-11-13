import { notFound } from 'next/navigation'
import { ContentManager } from '@/components/admin/content-manager'
import { SubmissionsManager } from '@/components/admin/submissions-manager'
import { listAdminResource } from '@/lib/firebase/admin-data'
import { requireAdminSession } from '@/lib/firebase/auth'
import { adminResourceConfig } from '@/lib/firebase/resource-config'
import { cmsResourceNames, isManagedResource, type CmsResource } from '@/lib/firebase/types'

export default async function AdminResourcePage({ params }: { params: Promise<{ resource: string }> }) {
  const { resource } = await params
  if (!cmsResourceNames.includes(resource as CmsResource)) notFound()
  await requireAdminSession()
  const name = resource as CmsResource
  const initialRecords = await listAdminResource(name)

  if (name === 'messages' || name === 'registrations') {
    const events = name === 'registrations' ? await listAdminResource('events') : []
    return <SubmissionsManager resource={name} initialRecords={initialRecords} events={events} />
  }

  if (!isManagedResource(name) || !adminResourceConfig[name]) notFound()
  return <ContentManager resource={name} initialRecords={initialRecords} />
}
