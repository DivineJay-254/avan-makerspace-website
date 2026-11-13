import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'
import { getFirebaseAdmin, isFirebaseServerConfigured } from '@/lib/firebase/admin'
import { ApiError, apiErrorResponse, assertSameOrigin, verifyAppCheck } from '@/lib/firebase/security'

const cookieName = '__session'
const maxAgeMs = 5 * 24 * 60 * 60 * 1000

export async function POST(request: NextRequest) {
  try {
    assertSameOrigin(request)
    await verifyAppCheck(request)
    if (!isFirebaseServerConfigured()) throw new ApiError('Firebase is not configured for this deployment.', 503, 'FIREBASE_NOT_CONFIGURED')
    const body = await request.json().catch(() => { throw new ApiError('The sign-in request is invalid.', 400, 'INVALID_JSON') })
    if (typeof body?.idToken !== 'string' || body.idToken.length > 10_000) throw new ApiError('The sign-in request is invalid.', 400, 'INVALID_ID_TOKEN')

    const { auth, db } = getFirebaseAdmin()
    const decoded = await auth.verifyIdToken(body.idToken, true)
    if (decoded.admin !== true || decoded.email_verified !== true) {
      throw new ApiError('This account is not authorized to access the CMS.', 403, 'ADMIN_ACCESS_REQUIRED')
    }
    const profile = await db.collection('users').doc(decoded.uid).get()
    if (profile.data()?.role !== 'admin') throw new ApiError('This account is not authorized to access the CMS.', 403, 'ADMIN_ACCESS_REQUIRED')

    const sessionCookie = await auth.createSessionCookie(body.idToken, { expiresIn: maxAgeMs })
    const cookieStore = await cookies()
    cookieStore.set(cookieName, sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: maxAgeMs / 1000,
    })
    return Response.json({ success: true })
  } catch (error) {
    return apiErrorResponse(error)
  }
}

export async function DELETE(request: NextRequest) {
  try {
    assertSameOrigin(request)
    const cookieStore = await cookies()
    cookieStore.set(cookieName, '', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 0 })
    return Response.json({ success: true })
  } catch (error) {
    return apiErrorResponse(error)
  }
}
