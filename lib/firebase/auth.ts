import 'server-only'

import { cookies } from 'next/headers'
import { getFirebaseAdmin } from './admin'
import { ApiError } from './security'

export const ADMIN_SESSION_COOKIE = '__session'
export const ADMIN_SESSION_MAX_AGE = 5 * 24 * 60 * 60 * 1000

export type AdminSession = {
  uid: string
  email: string
  displayName: string
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get(ADMIN_SESSION_COOKIE)?.value
  if (!sessionCookie) return null

  try {
    const { auth, db } = getFirebaseAdmin()
    const decoded = await auth.verifySessionCookie(sessionCookie, true)
    if (decoded.admin !== true) return null

    const profile = await db.collection('users').doc(decoded.uid).get()
    if (!profile.exists || profile.data()?.role !== 'admin') return null

    return {
      uid: decoded.uid,
      email: decoded.email ?? '',
      displayName: profile.data()?.displayName ?? decoded.name ?? decoded.email ?? 'Administrator',
    }
  } catch {
    return null
  }
}

export async function requireAdminSession() {
  const session = await getAdminSession()
  if (!session) throw new ApiError('Administrator authentication is required.', 401, 'ADMIN_AUTH_REQUIRED')
  return session
}
