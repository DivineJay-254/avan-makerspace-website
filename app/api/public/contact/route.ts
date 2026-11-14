import { createHmac } from 'node:crypto'
import type { NextRequest } from 'next/server'
import { FieldValue } from 'firebase-admin/firestore'
import { getFirebaseAdmin } from '@/lib/firebase/admin'
import { messageSubmissionSchema } from '@/lib/firebase/schema'
import { ApiError, apiErrorResponse, assertSameOrigin, enforceRateLimit, verifyAppCheck } from '@/lib/firebase/security'

export async function POST(request: NextRequest) {
  try {
    assertSameOrigin(request)
    await verifyAppCheck(request)
    await enforceRateLimit(request, 'contact', 5, 15 * 60 * 1000)
    const body = await request.json().catch(() => { throw new ApiError('The contact form data is invalid.', 400, 'INVALID_JSON') })
    const submission = messageSubmissionSchema.parse(body)

    if (submission.company.trim()) return Response.json({ success: true })
    const secret = process.env.FIREBASE_RATE_LIMIT_SECRET
    if (!secret) throw new ApiError('Contact form protection is not configured.', 503, 'RATE_LIMIT_NOT_CONFIGURED')

    const day = new Date().toISOString().slice(0, 10)
    const key = createHmac('sha256', secret)
      .update(`contact:${day}:${submission.email.toLowerCase()}:${submission.subject}:${submission.message}`)
      .digest('hex')
    const { db } = getFirebaseAdmin()
    const ref = db.collection('messages').doc(key)
    const duplicate = await db.runTransaction(async (transaction) => {
      const current = await transaction.get(ref)
      if (current.exists) return true
      transaction.create(ref, {
        fullName: submission.fullName,
        email: submission.email.toLowerCase(),
        subject: submission.subject,
        message: submission.message,
        status: 'unread',
        submittedAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      })
      return false
    })

    return Response.json({ success: true, duplicate })
  } catch (error) {
    return apiErrorResponse(error)
  }
}
