import 'server-only'

import { createHmac, timingSafeEqual } from 'node:crypto'
import { Timestamp, FieldValue } from 'firebase-admin/firestore'
import type { NextRequest } from 'next/server'
import { getFirebaseAdmin } from './admin'

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly code: string,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export function apiErrorResponse(error: unknown) {
  if (error instanceof ApiError) {
    return Response.json({ error: error.message, code: error.code }, { status: error.status })
  }
  if (error instanceof Error && 'status' in error && typeof error.status === 'number') {
    const code = 'code' in error && typeof error.code === 'string' ? error.code : 'FIREBASE_ERROR'
    return Response.json({ error: error.message, code }, { status: error.status })
  }
  if (error && typeof error === 'object' && 'issues' in error) {
    const issue = Array.isArray(error.issues) ? error.issues[0] : null
    return Response.json({ error: issue?.message ?? 'The submitted information is invalid.', code: 'INVALID_INPUT' }, { status: 400 })
  }
  return Response.json({ error: 'The request could not be completed.', code: 'REQUEST_FAILED' }, { status: 500 })
}

export function assertSameOrigin(request: NextRequest) {
  const origin = request.headers.get('origin')
  if (!origin) return
  try {
    if (new URL(origin).host !== request.nextUrl.host) {
      throw new ApiError('Cross-origin requests are not allowed.', 403, 'ORIGIN_REJECTED')
    }
  } catch (error) {
    if (error instanceof ApiError) throw error
    throw new ApiError('The request origin is invalid.', 403, 'ORIGIN_REJECTED')
  }
}

export async function verifyAppCheck(request: NextRequest) {
  const token = request.headers.get('x-firebase-appcheck')
  if (!token) {
    if (process.env.NODE_ENV === 'production') {
      if (!process.env.NEXT_PUBLIC_FIREBASE_APP_CHECK_SITE_KEY) {
        throw new ApiError('Firebase App Check is not configured for this deployment.', 503, 'APP_CHECK_NOT_CONFIGURED')
      }
      throw new ApiError('App Check verification is required.', 403, 'APP_CHECK_REQUIRED')
    }
    return
  }

  try {
    const { appCheck } = getFirebaseAdmin()
    await appCheck.verifyToken(token, { consume: true })
  } catch {
    throw new ApiError('The app verification token is invalid or expired.', 403, 'APP_CHECK_INVALID')
  }
}

export async function enforceRateLimit(request: NextRequest, scope: string, maximum: number, windowMs: number) {
  const secret = process.env.FIREBASE_RATE_LIMIT_SECRET
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      throw new ApiError('Public form rate limiting is not configured.', 503, 'RATE_LIMIT_NOT_CONFIGURED')
    }
    return
  }

  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  const address = request.headers.get('x-real-ip') ?? forwardedFor ?? 'unknown'
  const bucket = Math.floor(Date.now() / windowMs)
  const key = createHmac('sha256', secret).update(`${scope}:${address}`).digest('hex')
  const ref = getFirebaseAdmin().db.collection('_rate_limits').doc(`${scope}-${bucket}-${key}`)

  await getFirebaseAdmin().db.runTransaction(async (transaction) => {
    const current = await transaction.get(ref)
    const count = Number(current.data()?.count ?? 0)
    if (count >= maximum) {
      throw new ApiError('Too many requests. Please try again later.', 429, 'RATE_LIMITED')
    }
    transaction.set(ref, {
      count: count + 1,
      expiresAt: Timestamp.fromMillis((bucket + 3) * windowMs),
      updatedAt: FieldValue.serverTimestamp(),
    })
  })
}

export function secureCompare(left: string, right: string) {
  const leftBytes = Buffer.from(left)
  const rightBytes = Buffer.from(right)
  return leftBytes.length === rightBytes.length && timingSafeEqual(leftBytes, rightBytes)
}
