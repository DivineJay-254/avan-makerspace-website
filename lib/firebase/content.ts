import 'server-only'

import { Timestamp, type DocumentData } from 'firebase-admin/firestore'
import { getFirebaseAdmin, isFirebaseServerConfigured } from './admin'
import type { CmsRecord, ContentResource, SiteSettings } from './types'

function normalizeValue(value: unknown): unknown {
  if (value instanceof Timestamp) return value.toDate().toISOString()
  if (Array.isArray(value)) return value.map(normalizeValue)
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, normalizeValue(entry)]))
  }
  return value
}

function toRecord(id: string, data: DocumentData): CmsRecord {
  return { id, ...normalizeValue(data) as Record<string, unknown> }
}

export async function getPublicSettings(): Promise<SiteSettings | null> {
  if (!isFirebaseServerConfigured()) return null
  const { db } = getFirebaseAdmin()
  const snapshot = await db.collection('settings').doc('public').get()
  if (!snapshot.exists) return { cmsEnabled: false }
  const data = snapshot.data() ?? {}
  return {
    organizationName: typeof data.organizationName === 'string' ? data.organizationName : undefined,
    contactEmail: typeof data.contactEmail === 'string' ? data.contactEmail : undefined,
    contactPhone: typeof data.contactPhone === 'string' ? data.contactPhone : undefined,
    location: typeof data.location === 'string' ? data.location : undefined,
    socialFacebook: typeof data.socialFacebook === 'string' ? data.socialFacebook : undefined,
    socialInstagram: typeof data.socialInstagram === 'string' ? data.socialInstagram : undefined,
    socialLinkedin: typeof data.socialLinkedin === 'string' ? data.socialLinkedin : undefined,
    whatsappNumber: typeof data.whatsappNumber === 'string' ? data.whatsappNumber : undefined,
    footerText: typeof data.footerText === 'string' ? data.footerText : undefined,
    aboutDescription: typeof data.aboutDescription === 'string' ? data.aboutDescription : undefined,
    homepageAnnouncement: typeof data.homepageAnnouncement === 'string' ? data.homepageAnnouncement : undefined,
    cmsEnabled: data.cmsEnabled === true,
  }
}

export async function getPublishedContent(
  resource: ContentResource,
  limit = 100,
): Promise<CmsRecord[] | null> {
  if (!isFirebaseServerConfigured()) return null
  const { db } = getFirebaseAdmin()
  const snapshot = await db.collection(resource).where('status', '==', 'published').limit(limit).get()
  const records = snapshot.docs.map((doc) => toRecord(doc.id, doc.data()))

  return records.sort((left, right) => {
    const leftDate = String(left.publishedAt ?? left.eventDate ?? left.uploadedAt ?? left.updatedAt ?? '')
    const rightDate = String(right.publishedAt ?? right.eventDate ?? right.uploadedAt ?? right.updatedAt ?? '')
    if (resource === 'impact') return Number(left.displayOrder ?? 0) - Number(right.displayOrder ?? 0)
    return rightDate.localeCompare(leftDate)
  })
}

export async function getPublishedBySlug(resource: ContentResource, slug: string): Promise<CmsRecord | null> {
  if (!isFirebaseServerConfigured()) return null
  const { db } = getFirebaseAdmin()
  const snapshot = await db.collection(resource).where('slug', '==', slug).limit(2).get()
  const doc = snapshot.docs.find((item) => item.data().status === 'published')
  return doc ? toRecord(doc.id, doc.data()) : null
}

export async function getPublicDocument(resource: ContentResource, id: string): Promise<CmsRecord | null> {
  if (!isFirebaseServerConfigured()) return null
  const { db } = getFirebaseAdmin()
  const doc = await db.collection(resource).doc(id).get()
  if (!doc.exists || doc.data()?.status !== 'published') return null
  return toRecord(doc.id, doc.data() ?? {})
}

export function cmsUsesFirestore(settings: SiteSettings | null) {
  return settings?.cmsEnabled === true
}

export { getMediaUrl } from './media-url'
