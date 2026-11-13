import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getFirebaseAdmin } from '@/lib/firebase/admin'
import { getAdminSession } from '@/lib/firebase/auth'
import { isContentResource } from '@/lib/firebase/types'

export async function GET(request: NextRequest, { params }: { params: Promise<{ resource: string; id: string }> }) {
  const { resource, id } = await params
  const path = request.nextUrl.searchParams.get('path')
  if (!isContentResource(resource) || !path || !path.startsWith('content/') || path.includes('..')) {
    return Response.json({ error: 'Image not found.' }, { status: 404 })
  }

  try {
    const { db, bucket } = getFirebaseAdmin()
    const snapshot = await db.collection(resource).doc(id).get()
    if (!snapshot.exists) return Response.json({ error: 'Image not found.' }, { status: 404 })
    const data = snapshot.data() ?? {}
    const allowed = [data.featuredImage, data.imagePath, ...(Array.isArray(data.additionalImages) ? data.additionalImages : [])]
      .some((value) => value === path)
    const admin = await getAdminSession()
    if (!allowed || (data.status !== 'published' && !admin)) return Response.json({ error: 'Image not found.' }, { status: 404 })

    const [url] = await bucket.file(path).getSignedUrl({ action: 'read', expires: Date.now() + 2 * 60 * 1000 })
    return NextResponse.redirect(url, { status: 302, headers: { 'Cache-Control': admin ? 'private, no-store' : 'public, max-age=30' } })
  } catch {
    return Response.json({ error: 'Image service is not available.' }, { status: 503 })
  }
}
