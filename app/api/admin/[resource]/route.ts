import type { NextRequest } from 'next/server'
import { createManagedRecord, listAdminResource } from '@/lib/firebase/admin-data'
import { requireAdminSession } from '@/lib/firebase/auth'
import { apiErrorResponse, assertSameOrigin, verifyAppCheck } from '@/lib/firebase/security'
import { cmsResourceNames, type CmsResource } from '@/lib/firebase/types'

export async function GET(request: NextRequest, { params }: { params: Promise<{ resource: string }> }) {
  try {
    const { resource } = await params
    if (!cmsResourceNames.includes(resource as CmsResource)) return Response.json({ error: 'Resource not found.' }, { status: 404 })
    await requireAdminSession()
    const records = await listAdminResource(resource as CmsResource, {
      query: request.nextUrl.searchParams.get('q') ?? undefined,
      status: request.nextUrl.searchParams.get('status') ?? undefined,
      eventId: request.nextUrl.searchParams.get('eventId') ?? undefined,
    })
    return Response.json({ records })
  } catch (error) {
    return apiErrorResponse(error)
  }
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ resource: string }> }) {
  try {
    assertSameOrigin(request)
    await requireAdminSession()
    await verifyAppCheck(request)
    const { resource } = await params
    if (resource !== 'settings' && !['events', 'programs', 'projects', 'posts', 'gallery', 'impact'].includes(resource)) {
      return Response.json({ error: 'This resource cannot be created here.' }, { status: 404 })
    }
    const body = await request.json()
    const record = await createManagedRecord(resource as 'settings' | 'events' | 'programs' | 'projects' | 'posts' | 'gallery' | 'impact', body)
    return Response.json({ record }, { status: 201 })
  } catch (error) {
    return apiErrorResponse(error)
  }
}
