import 'server-only'

import { FieldValue, Timestamp, type DocumentData } from 'firebase-admin/firestore'
import { getFirebaseAdmin } from './admin'
import { validateManagedResource, registrationStatusSchema, messageStatusSchema } from './schema'
import { ApiError } from './security'
import { defaultSocialLinks, isContentResource, isManagedResource, type CmsRecord, type CmsResource, type ContentResource, type ManagedResource } from './types'

function serialize(value: unknown): unknown {
  if (value instanceof Timestamp) return value.toDate().toISOString()
  if (Array.isArray(value)) return value.map(serialize)
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, serialize(item)]))
  }
  return value
}

function record(id: string, data: DocumentData): CmsRecord {
  return { id, ...serialize(data) as Record<string, unknown> }
}

function mediaPaths(data: Record<string, unknown>) {
  const values = [data.featuredImage, data.imagePath, data.imageUrl, ...(Array.isArray(data.additionalImages) ? data.additionalImages : [])]
  return [...new Set(values.filter((value): value is string => typeof value === 'string' && value.startsWith('content/')))]
}

async function deleteUnreferencedMedia(paths: string[]) {
  if (!paths.length) return
  const { db, bucket } = getFirebaseAdmin()
  if (!bucket) return
  const resources: ContentResource[] = ['events', 'programs', 'projects', 'posts', 'gallery']

  for (const path of paths) {
    let isReferenced = false
    for (const resource of resources) {
      const checks = await Promise.all([
        db.collection(resource).where('featuredImage', '==', path).limit(1).get(),
        db.collection(resource).where('imagePath', '==', path).limit(1).get(),
        db.collection(resource).where('additionalImages', 'array-contains', path).limit(1).get(),
      ])
      if (checks.some((snapshot) => !snapshot.empty)) {
        isReferenced = true
        break
      }
    }
    if (!isReferenced) await bucket.file(path).delete({ ignoreNotFound: true }).catch(() => undefined)
  }
}

function containsSearch(recordValue: CmsRecord, query: string) {
  return JSON.stringify(recordValue).toLocaleLowerCase().includes(query)
}

export async function listAdminResource(
  resource: CmsResource,
  options: { query?: string; status?: string; eventId?: string } = {},
): Promise<CmsRecord[]> {
  const { db } = getFirebaseAdmin()
  const normalizedQuery = options.query?.trim().toLocaleLowerCase() ?? ''

  if (resource === 'settings') {
    const snapshot = await db.collection('settings').doc('public').get()
    const settings = snapshot.exists
      ? { ...defaultSocialLinks, ...record(snapshot.id, snapshot.data() ?? {}) }
      : { id: 'public', cmsEnabled: false, ...defaultSocialLinks }
    return !normalizedQuery || containsSearch(settings, normalizedQuery) ? [settings] : []
  }

  if (!isContentResource(resource) && resource !== 'messages' && resource !== 'registrations') {
    throw new ApiError('This content area does not exist.', 404, 'RESOURCE_NOT_FOUND')
  }

  let query: FirebaseFirestore.Query = db.collection(resource).limit(500)
  if (options.status) query = db.collection(resource).where('status', '==', options.status).limit(500)
  if (resource === 'registrations' && options.eventId) {
    query = db.collection(resource).where('eventId', '==', options.eventId).limit(500)
  }

  const snapshot = await query.get()
  const records = snapshot.docs.map((doc) => record(doc.id, doc.data()))
  return records
    .filter((item) => !options.status || item.status === options.status)
    .filter((item) => !options.eventId || item.eventId === options.eventId)
    .filter((item) => !normalizedQuery || containsSearch(item, normalizedQuery))
    .sort((left, right) => {
      const leftDate = String(left.updatedAt ?? left.submittedAt ?? left.createdAt ?? '')
      const rightDate = String(right.updatedAt ?? right.submittedAt ?? right.createdAt ?? '')
      return rightDate.localeCompare(leftDate)
    })
}

export async function getAdminOverview() {
  const [events, programs, projects, registrations, messages] = await Promise.all([
    listAdminResource('events'),
    listAdminResource('programs'),
    listAdminResource('projects'),
    listAdminResource('registrations'),
    listAdminResource('messages'),
  ])
  const publishedEvents = events.filter((item) => item.status === 'published').length
  const recentUpdates = [...events, ...programs, ...projects, ...await listAdminResource('posts')]
    .sort((left, right) => String(right.updatedAt ?? '').localeCompare(String(left.updatedAt ?? '')))
    .slice(0, 6)

  return {
    publishedEvents,
    programs: programs.length,
    projects: projects.length,
    registrations: registrations.length,
    unreadMessages: messages.filter((item) => item.status === 'unread').length,
    recentUpdates,
  }
}

function addSystemFields(resource: ManagedResource, data: Record<string, unknown>, previous?: DocumentData) {
  if (resource === 'settings') return { ...data, updatedAt: FieldValue.serverTimestamp() }
  const publishedAt = resource === 'posts' && data.status === 'published'
    ? (data.publishedAt || previous?.publishedAt || new Date().toISOString())
    : data.publishedAt

  return {
    ...data,
    ...(resource === 'posts' ? { publishedAt } : {}),
    createdAt: previous?.createdAt ?? FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  }
}

async function ensureUniqueSlug(resource: ContentResource, slug: string, currentId?: string) {
  const matches = await getFirebaseAdmin().db.collection(resource).where('slug', '==', slug).limit(2).get()
  if (matches.docs.some((doc) => doc.id !== currentId)) {
    throw new ApiError('That URL slug is already in use in this section.', 409, 'SLUG_ALREADY_EXISTS')
  }
}

export async function createManagedRecord(resource: ManagedResource, value: unknown) {
  if (!isManagedResource(resource)) throw new ApiError('This content area does not exist.', 404, 'RESOURCE_NOT_FOUND')
  const data = validateManagedResource(resource, value) as Record<string, unknown>
  const { db } = getFirebaseAdmin()

  if (resource === 'settings') {
    await db.collection('settings').doc('public').set(addSystemFields(resource, data), { merge: true })
    return { id: 'public', ...data }
  }

  await ensureUniqueSlug(resource, String(data.slug))
  const ref = db.collection(resource).doc()
  await ref.create(addSystemFields(resource, data))
  return { id: ref.id, ...data }
}

export async function updateManagedRecord(resource: ManagedResource, id: string, value: unknown) {
  if (!isManagedResource(resource)) throw new ApiError('This content area does not exist.', 404, 'RESOURCE_NOT_FOUND')
  const data = validateManagedResource(resource, value) as Record<string, unknown>
  const { db } = getFirebaseAdmin()
  const ref = db.collection(resource).doc(resource === 'settings' ? 'public' : id)
  const snapshot = await ref.get()
  if (resource !== 'settings' && !snapshot.exists) throw new ApiError('This item no longer exists.', 404, 'CONTENT_NOT_FOUND')

  if (resource !== 'settings') await ensureUniqueSlug(resource, String(data.slug), id)
  const before = snapshot.data() ?? {}
  const updated = addSystemFields(resource, data, before)
  await ref.set(updated, { merge: true })
  const oldPaths = mediaPaths(before)
  const newPaths = mediaPaths(data)
  await deleteUnreferencedMedia(oldPaths.filter((path) => !newPaths.includes(path)))
  return { id: ref.id, ...data }
}

export async function updateSubmission(resource: 'messages' | 'registrations', id: string, value: unknown) {
  const schema = resource === 'messages' ? messageStatusSchema : registrationStatusSchema
  const status = schema.parse((value as { status?: unknown })?.status)
  const { db } = getFirebaseAdmin()
  const ref = db.collection(resource).doc(id)
  const snapshot = await ref.get()
  if (!snapshot.exists) throw new ApiError('This submission no longer exists.', 404, 'SUBMISSION_NOT_FOUND')
  await ref.update({ status, updatedAt: FieldValue.serverTimestamp() })
  return { id, status }
}

export async function deleteAdminRecord(resource: CmsResource, id: string) {
  const { db } = getFirebaseAdmin()
  if (resource === 'settings') throw new ApiError('Website settings cannot be deleted.', 400, 'SETTINGS_PROTECTED')
  if (!isContentResource(resource) && resource !== 'messages' && resource !== 'registrations') {
    throw new ApiError('This content area does not exist.', 404, 'RESOURCE_NOT_FOUND')
  }
  const ref = db.collection(resource).doc(id)
  const snapshot = await ref.get()
  if (!snapshot.exists) throw new ApiError('This item no longer exists.', 404, 'CONTENT_NOT_FOUND')
  const paths = mediaPaths(snapshot.data() ?? {})
  await ref.delete()
  if (isContentResource(resource)) await deleteUnreferencedMedia(paths)
}
