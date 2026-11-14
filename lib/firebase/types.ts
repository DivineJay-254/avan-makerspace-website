export const cmsResourceNames = [
  'events',
  'programs',
  'projects',
  'posts',
  'gallery',
  'impact',
  'messages',
  'registrations',
  'settings',
] as const

export type CmsResource = (typeof cmsResourceNames)[number]
export type ContentResource = 'events' | 'programs' | 'projects' | 'posts' | 'gallery' | 'impact'
export type ManagedResource = ContentResource | 'settings'
export type ContentStatus = 'draft' | 'published' | 'archived'

export type CmsRecord = {
  id: string
  [key: string]: unknown
}

export const defaultSocialLinks = {
  socialTikTok: 'https://www.tiktok.com/@avanmakerspace',
  socialFacebook: 'https://www.facebook.com/avanmakerspace',
  socialInstagram: 'https://www.instagram.com/avanmakerspace',
  socialLinkedin: 'https://www.linkedin.com/company/avanmakerspace/',
}

export type SiteSettings = {
  organizationName?: string
  contactEmail?: string
  contactPhone?: string
  location?: string
  socialTikTok?: string
  socialFacebook?: string
  socialInstagram?: string
  socialLinkedin?: string
  whatsappNumber?: string
  footerText?: string
  aboutDescription?: string
  homepageAnnouncement?: string
  cmsEnabled?: boolean
}

export const projectCategories = [
  'Smart Homes',
  'Automatic Doors',
  'Voice Command Cars',
  'Remote Control Rovers',
  'Firefighting Rovers',
  'AquaSmart',
] as const

export function isContentResource(value: string): value is ContentResource {
  return ['events', 'programs', 'projects', 'posts', 'gallery', 'impact'].includes(value)
}

export function isManagedResource(value: string): value is ManagedResource {
  return isContentResource(value) || value === 'settings'
}
