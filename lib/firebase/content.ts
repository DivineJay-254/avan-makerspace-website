import 'server-only'

import { Timestamp, type DocumentData } from 'firebase-admin/firestore'
import { getFirebaseAdmin, isFirebaseServerConfigured } from './admin'
import { defaultSocialLinks, type CmsRecord, type ContentResource, type SiteSettings } from './types'

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

function socialLink(value: unknown, fallback: string, domain: string) {
  if (typeof value !== 'string' || !value.trim()) return fallback
  try {
    const url = new URL(value)
    const host = url.hostname.toLowerCase()
    return url.protocol === 'https:' && (host === domain || host.endsWith(`.${domain}`)) ? url.toString() : fallback
  } catch {
    return fallback
  }
}

export async function getPublicSettings(): Promise<SiteSettings | null> {
  if (!isFirebaseServerConfigured()) return null
  const { db } = getFirebaseAdmin()
  const snapshot = await db.collection('settings').doc('public').get()
  if (!snapshot.exists) return { cmsEnabled: false, ...defaultSocialLinks }
  const data = snapshot.data() ?? {}
  return {
    organizationName: typeof data.organizationName === 'string' ? data.organizationName : undefined,
    contactEmail: typeof data.contactEmail === 'string' ? data.contactEmail : undefined,
    contactPhone: typeof data.contactPhone === 'string' ? data.contactPhone : undefined,
    location: typeof data.location === 'string' ? data.location : undefined,
    socialTikTok: socialLink(data.socialTikTok, defaultSocialLinks.socialTikTok, 'tiktok.com'),
    socialFacebook: socialLink(data.socialFacebook, defaultSocialLinks.socialFacebook, 'facebook.com'),
    socialInstagram: socialLink(data.socialInstagram, defaultSocialLinks.socialInstagram, 'instagram.com'),
    socialLinkedin: socialLink(data.socialLinkedin, defaultSocialLinks.socialLinkedin, 'linkedin.com'),
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
