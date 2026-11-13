import type { NextRequest } from 'next/server'
import { FieldValue } from 'firebase-admin/firestore'
import { getFirebaseAdmin, isFirebaseServerConfigured } from '@/lib/firebase/admin'
import { aquaSmart } from '@/lib/avantech-projects'
import { ApiError, apiErrorResponse, assertSameOrigin, enforceRateLimit, secureCompare, verifyAppCheck } from '@/lib/firebase/security'

export async function POST(request: NextRequest) {
  try {
    assertSameOrigin(request)
    await verifyAppCheck(request)
    await enforceRateLimit(request, 'admin-bootstrap', 3, 60 * 60 * 1000)
    if (!isFirebaseServerConfigured()) throw new ApiError('Firebase is not configured for this deployment.', 503, 'FIREBASE_NOT_CONFIGURED')

    const expectedEmail = process.env.FIREBASE_ADMIN_BOOTSTRAP_EMAIL?.trim().toLowerCase()
    const expectedSecret = process.env.FIREBASE_ADMIN_BOOTSTRAP_SECRET
    if (!expectedEmail || !expectedSecret) throw new ApiError('First-administrator setup is disabled. Configure the bootstrap email and secret temporarily.', 503, 'BOOTSTRAP_NOT_CONFIGURED')

    const body = await request.json().catch(() => { throw new ApiError('The setup request is invalid.', 400, 'INVALID_JSON') })
    if (typeof body?.email !== 'string' || typeof body?.secret !== 'string' || !secureCompare(body.email.trim().toLowerCase(), expectedEmail) || !secureCompare(body.secret, expectedSecret)) {
      throw new ApiError('The setup details are not valid.', 403, 'BOOTSTRAP_REJECTED')
    }

    const { auth, db } = getFirebaseAdmin()
    const user = await auth.getUserByEmail(expectedEmail)
    if (!user.emailVerified) throw new ApiError('Verify the administrator email in Firebase Authentication before continuing.', 409, 'ADMIN_EMAIL_NOT_VERIFIED')
    const lock = db.collection('settings').doc('adminBootstrap')
    const existing = await lock.get()
    if (existing.exists && (existing.data()?.uid !== user.uid || existing.data()?.status === 'active')) {
      throw new ApiError('Administrator setup has already been completed.', 409, 'BOOTSTRAP_ALREADY_USED')
    }

    if (!existing.exists) {
      await lock.create({ uid: user.uid, status: 'pending', createdAt: FieldValue.serverTimestamp() })
    }

    await auth.setCustomUserClaims(user.uid, { ...user.customClaims, admin: true })
    await db.collection('users').doc(user.uid).set({
      uid: user.uid,
      email: expectedEmail,
      displayName: user.displayName ?? '',
      role: 'admin',
      updatedAt: FieldValue.serverTimestamp(),
      createdAt: FieldValue.serverTimestamp(),
    }, { merge: true })
    const existingAquaSmart = await db.collection('projects').where('slug', '==', 'aquasmart').limit(1).get()
    if (existingAquaSmart.empty) {
      await db.collection('projects').doc('aquasmart').create({
        title: aquaSmart.title,
        slug: 'aquasmart',
        description: aquaSmart.description,
        category: 'AquaSmart',
        technologies: [],
        featuredImage: aquaSmart.image,
        additionalImages: [],
        developmentStatus: 'Ongoing innovation initiative',
        status: 'published',
        featured: true,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      })
    }

    await lock.set({ uid: user.uid, status: 'active', completedAt: FieldValue.serverTimestamp() }, { merge: true })
    return Response.json({ success: true })
  } catch (error) {
    return apiErrorResponse(error)
  }
}
