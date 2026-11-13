import 'server-only'

import { FieldValue, Timestamp, type DocumentData } from 'firebase-admin/firestore'
import { getFirebaseAdmin } from './admin'
import type { CmsRecord } from './types'

export function serializeFirestore(value: unknown): unknown {
  if (value instanceof Timestamp) return value.toDate().toISOString()
  if (Array.isArray(value)) return value.map(serializeFirestore)
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, serializeFirestore(item)]))
  }
  return value
}

export function toCmsRecord(id: string, data: DocumentData): CmsRecord {
  return { id, ...serializeFirestore(data) as Record<string, unknown> }
}

export function serverTimestamps(createdAt?: unknown) {
  return { createdAt: createdAt ?? FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() }
}

export async function setAdminLock(uid: string) {
  const { db } = getFirebaseAdmin()
  const lock = db.collection('settings').doc('adminBootstrap')
  let alreadyActive = false

  await db.runTransaction(async (transaction) => {
    const current = await transaction.get(lock)
    if (current.exists) {
      if (current.data()?.uid !== uid || current.data()?.status === 'active') {
        throw new Error('The administrator bootstrap has already been used.')
      }
      return
    }
    transaction.create(lock, { uid, status: 'pending', createdAt: FieldValue.serverTimestamp() })
  }).catch((error) => {
    if (error instanceof Error && error.message.includes('already been used')) alreadyActive = true
    else throw error
  })

  if (alreadyActive) throw new Error('The administrator bootstrap has already been used.')
  return lock
}
