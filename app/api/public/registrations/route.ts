import { createHmac } from 'node:crypto'
import type { NextRequest } from 'next/server'
import { FieldValue } from 'firebase-admin/firestore'
import { getFirebaseAdmin } from '@/lib/firebase/admin'
import { registrationSubmissionSchema } from '@/lib/firebase/schema'
import { ApiError, apiErrorResponse, assertSameOrigin, enforceRateLimit, verifyAppCheck } from '@/lib/firebase/security'

export async function POST(request: NextRequest) {
  try {
    assertSameOrigin(request)
    await verifyAppCheck(request)
    await enforceRateLimit(request, 'registration', 8, 15 * 60 * 1000)
    const body = await request.json().catch(() => { throw new ApiError('The registration data is invalid.', 400, 'INVALID_JSON') })
    const submission = registrationSubmissionSchema.parse(body)
    if (submission.company.trim()) return Response.json({ success: true })

    const secret = process.env.FIREBASE_RATE_LIMIT_SECRET
    if (!secret) throw new ApiError('Event registration protection is not configured.', 503, 'RATE_LIMIT_NOT_CONFIGURED')
    const { db } = getFirebaseAdmin()
    const eventRef = db.collection('events').doc(submission.eventId)
    const eventSnapshot = await eventRef.get()
    if (!eventSnapshot.exists || eventSnapshot.data()?.status !== 'published') {
      throw new ApiError('This event is not available for registration.', 404, 'EVENT_NOT_FOUND')
    }
    const event = eventSnapshot.data() ?? {}
    if (event.registrationEnabled !== true) {
      throw new ApiError('Registration for this event is closed.', 409, 'REGISTRATION_CLOSED')
    }

    const cutoff = event.registrationDeadline
      ? new Date(`${String(event.registrationDeadline).slice(0, 10)}T23:59:59.999Z`)
      : new Date(`${String(event.eventDate).slice(0, 10)}T23:59:59.999Z`)
    if (Number.isNaN(cutoff.getTime()) || cutoff.getTime() < Date.now()) {
      throw new ApiError('The registration deadline has passed.', 409, 'REGISTRATION_CLOSED')
    }

    const email = submission.email.toLowerCase()
    const registrationId = createHmac('sha256', secret).update(`registration:${submission.eventId}:${email}`).digest('hex')
    const registrationRef = db.collection('registrations').doc(registrationId)
    await db.runTransaction(async (transaction) => {
      const existing = await transaction.get(registrationRef)
      if (existing.exists) throw new ApiError('This email is already registered for the event.', 409, 'ALREADY_REGISTERED')
      transaction.create(registrationRef, {
        eventId: submission.eventId,
        eventTitle: event.title,
        fullName: submission.fullName,
        email,
        phone: submission.phone,
        participantCategory: submission.participantCategory,
        organisation: submission.organisation,
        additionalInformation: submission.additionalInformation,
        status: 'pending',
        submittedAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      })
    })

    return Response.json({ success: true }, { status: 201 })
  } catch (error) {
    return apiErrorResponse(error)
  }
}
