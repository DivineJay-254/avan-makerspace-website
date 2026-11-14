import 'server-only'

import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { getAppCheck } from 'firebase-admin/app-check'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'
import { getStorage } from 'firebase-admin/storage'

const defaultFirebaseProjectId = 'avanmakerspace-52efe'

function getFirebaseProjectId() {
  return process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || defaultFirebaseProjectId
}

export class FirebaseSetupError extends Error {
  readonly status = 503
  readonly code = 'FIREBASE_NOT_CONFIGURED'

  constructor(message = 'Firebase is not configured for this deployment.') {
    super(message)
    this.name = 'FirebaseSetupError'
  }
}

export function isFirebaseServerConfigured() {
  return Boolean(
    getFirebaseProjectId()
    && process.env.FIREBASE_CLIENT_EMAIL
    && process.env.FIREBASE_PRIVATE_KEY,
  )
}

export function assertFirebaseServerConfigured() {
  if (!isFirebaseServerConfigured()) {
    throw new FirebaseSetupError(
      'Add the Firebase service-account email and private key to the server environment before using CMS features.',
    )
  }

  if (
    process.env.FIREBASE_PROJECT_ID
    && process.env.FIREBASE_PROJECT_ID !== getFirebaseProjectId()
  ) {
    throw new FirebaseSetupError('The public and Admin SDK Firebase project IDs do not match.')
  }
}

export function getFirebaseAdmin() {
  assertFirebaseServerConfigured()

  const existing = getApps().find((app) => app.name === 'avan-makerspace-admin')
  const app = existing ?? initializeApp({
    credential: cert({
      projectId: getFirebaseProjectId(),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    ...(process.env.FIREBASE_STORAGE_BUCKET ? { storageBucket: process.env.FIREBASE_STORAGE_BUCKET } : {}),
  }, 'avan-makerspace-admin')

  return {
    app,
    auth: getAuth(app),
    appCheck: getAppCheck(app),
    db: getFirestore(app),
    bucket: process.env.FIREBASE_STORAGE_BUCKET
      ? getStorage(app).bucket(process.env.FIREBASE_STORAGE_BUCKET)
      : null,
  }
}
