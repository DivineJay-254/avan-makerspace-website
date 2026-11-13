import type { NextRequest } from 'next/server'
import { deleteAdminRecord, updateManagedRecord, updateSubmission } from '@/lib/firebase/admin-data'
import { requireAdminSession } from '@/lib/firebase/auth'
import { apiErrorResponse, assertSameOrigin, verifyAppCheck } from '@/lib/firebase/security'
import { cmsResourceNames, type CmsResource } from '@/lib/firebase/types'

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ resource: string; id: string }> }) {
  try {
    assertSameOrigin(request)
    await requireAdminSession()
    await verifyAppCheck(request)
    const { resource, id } = await params
    if (!cmsResourceNames.includes(resource as CmsResource)) return Response.json({ error: 'Resource not found.' }, { status: 404 })
    const body = await request.json()
    if (resource === 'messages' || resource === 'registrations') {
      return Response.json({ record: await updateSubmission(resource, id, body) })
    }
    if (!['settings', 'events', 'programs', 'projects', 'posts', 'gallery', 'impact'].includes(resource)) {
      return Response.json({ error: 'This resource cannot be edited here.' }, { status: 404 })
    }
    return Response.json({ record: await updateManagedRecord(resource as 'settings' | 'events' | 'programs' | 'projects' | 'posts' | 'gallery' | 'impact', id, body) })
  } catch (error) {
    return apiErrorResponse(error)
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ resource: string; id: string }> }) {
  try {
    assertSameOrigin(request)
    await requireAdminSession()
    await verifyAppCheck(request)
    const { resource, id } = await params
    if (!cmsResourceNames.includes(resource as CmsResource)) return Response.json({ error: 'Resource not found.' }, { status: 404 })
    await deleteAdminRecord(resource as CmsResource, id)
    return Response.json({ success: true })
  } catch (error) {
    return apiErrorResponse(error)
  }
}
