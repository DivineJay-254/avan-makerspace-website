import { createHmac } from 'node:crypto'
import type { NextRequest } from 'next/server'
import { FieldValue } from 'firebase-admin/firestore'
import { getFirebaseAdmin } from '@/lib/firebase/admin'
import { newsletterSubmissionSchema } from '@/lib/firebase/schema'
import { ApiError, apiErrorResponse, assertSameOrigin, enforceRateLimit, verifyAppCheck } from '@/lib/firebase/security'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    assertSameOrigin(request)
    await verifyAppCheck(request)
    await enforceRateLimit(request, 'newsletter', 5, 15 * 60 * 1000)
    const body = await request.json().catch(() => { throw new ApiError('The signup data is invalid.', 400, 'INVALID_JSON') })
    const submission = newsletterSubmissionSchema.parse(body)

    if (submission.company.trim()) return Response.json({ success: true })

    const secret = process.env.FIREBASE_RATE_LIMIT_SECRET
    if (!secret) throw new ApiError('Newsletter signup protection is not configured.', 503, 'RATE_LIMIT_NOT_CONFIGURED')

    const { db } = getFirebaseAdmin()
    const subscriberId = createHmac('sha256', secret)
      .update(`newsletter:${submission.email}`)
      .digest('hex')
    const subscriberRef = db.collection('newsletter_subscribers').doc(subscriberId)
    const duplicate = await db.runTransaction(async (transaction) => {
      const existing = await transaction.get(subscriberRef)
      if (existing.exists) return true

      transaction.create(subscriberRef, {
        email: submission.email,
        status: 'active',
        consent: true,
        source: 'website',
        subscribedAt: FieldValue.serverTimestamp(),
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      })
      return false
    })

    return Response.json({ success: true, duplicate }, { status: duplicate ? 200 : 201 })
  } catch (error) {
    return apiErrorResponse(error)
  }
}
