import { z } from 'zod'
import type { ContentResource, ManagedResource } from './types'

const requiredText = (maximum = 300) => z.string().trim().min(1).max(maximum)
const optionalText = (maximum = 2000) => z.string().trim().max(maximum).optional().default('')
const slugSchema = z.string().trim().min(2).max(90).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use a lowercase URL slug with hyphens.')
const statusSchema = z.enum(['draft', 'published', 'archived'])
const stringList = z.array(z.string().trim().min(1).max(300)).max(30).default([])
const imageReference = z.string().trim().min(1).max(1000).refine((value) => {
  const safePath = !value.includes('..') && !value.startsWith('//') && !/[?#%\\]/.test(value)
  return safePath && (value.startsWith('content/') || value.startsWith('/'))
}, 'Use an existing /public image path or a Firebase Storage content path.')
const optionalImageReference = z.union([z.literal(''), imageReference]).default('')
const socialUrl = z.union([
  z.literal(''),
  z.string().trim().url().max(500).refine((value) => value.startsWith('https://'), 'Use an HTTPS social profile URL.'),
]).default('')

const eventSchema = z.object({
  title: requiredText(140),
  slug: slugSchema,
  description: requiredText(5000),
  eventDate: requiredText(40),
  startTime: optionalText(20),
  endTime: optionalText(20),
  timeZone: optionalText(80),
  venue: requiredText(240),
  featuredImage: optionalImageReference,
  registrationEnabled: z.boolean().default(false),
  registrationDeadline: optionalText(40),
  status: statusSchema,
  featured: z.boolean().default(false),
})

const programSchema = z.object({
  title: requiredText(140),
  slug: slugSchema,
  description: requiredText(5000),
  category: requiredText(100),
  tagline: optionalText(240),
  targetAudience: optionalText(500),
  featuredImage: optionalImageReference,
  details: stringList,
  impact: optionalText(1500),
  status: statusSchema,
  featured: z.boolean().default(false),
})

const projectSchema = z.object({
  title: requiredText(140),
  slug: slugSchema,
  description: requiredText(5000),
  category: requiredText(100),
  technologies: stringList,
  featuredImage: optionalImageReference,
  additionalImages: z.array(imageReference).max(20).default([]),
  developmentStatus: optionalText(500),
  status: statusSchema,
  featured: z.boolean().default(false),
})

const postSchema = z.object({
  title: requiredText(160),
  slug: slugSchema,
  excerpt: requiredText(500),
  content: requiredText(20000),
  featuredImage: optionalImageReference,
  author: requiredText(120),
  category: requiredText(100),
  status: statusSchema,
  featured: z.boolean().default(false),
  publishedAt: optionalText(40),
})

const gallerySchema = z.object({
  title: requiredText(140),
  imageUrl: optionalImageReference,
  imagePath: imageReference,
  caption: optionalText(1000),
  category: requiredText(100),
  alt: requiredText(240),
  uploadedAt: optionalText(40),
  status: statusSchema,
})

const impactSchema = z.object({
  title: requiredText(140),
  value: requiredText(80),
  description: requiredText(500),
  displayOrder: z.number().int().min(0).max(999).default(0),
  status: statusSchema,
})

const settingsSchema = z.object({
  organizationName: optionalText(140),
  contactEmail: z.union([z.literal(''), z.string().trim().email().max(254)]).default(''),
  contactPhone: optionalText(40),
  location: optionalText(240),
  socialTikTok: socialUrl,
  socialFacebook: socialUrl,
  socialInstagram: socialUrl,
  socialLinkedin: socialUrl,
  whatsappNumber: optionalText(30),
  footerText: optionalText(1000),
  aboutDescription: optionalText(3000),
  homepageAnnouncement: optionalText(1000),
  cmsEnabled: z.boolean().default(false),
})

export const messageSubmissionSchema = z.object({
  fullName: requiredText(120),
  email: z.string().trim().email().max(254),
  subject: requiredText(180),
  message: requiredText(5000),
  company: z.string().max(200).optional().default(''),
})

export const registrationSubmissionSchema = z.object({
  eventId: requiredText(140),
  fullName: requiredText(120),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().min(7).max(32).regex(/^[+()0-9.\s-]+$/, 'Enter a valid phone number.'),
  participantCategory: z.enum(['student', 'educator', 'community-member', 'organization', 'other']),
  organisation: optionalText(160),
  additionalInformation: optionalText(1000),
  company: z.string().max(200).optional().default(''),
})

export const registrationStatusSchema = z.enum(['pending', 'confirmed', 'waitlisted', 'cancelled'])
export const messageStatusSchema = z.enum(['unread', 'read', 'archived'])

const resourceSchemas = {
  events: eventSchema,
  programs: programSchema,
  projects: projectSchema,
  posts: postSchema,
  gallery: gallerySchema,
  impact: impactSchema,
  settings: settingsSchema,
}

export function validateManagedResource(resource: ManagedResource, value: unknown) {
  return resourceSchemas[resource].parse(value)
}

export function managedResourceSchema(resource: ContentResource | 'settings') {
  return resourceSchemas[resource]
}
