import type { CmsResource } from './types'

export type AdminField = {
  name: string
  label: string
  type: 'text' | 'textarea' | 'date' | 'time' | 'number' | 'select' | 'toggle' | 'image' | 'images' | 'url' | 'email'
  required?: boolean
  help?: string
  options?: { label: string; value: string }[]
}

const statusOptions = [
  { label: 'Draft', value: 'draft' },
  { label: 'Published', value: 'published' },
  { label: 'Archived', value: 'archived' },
]

export const adminResourceConfig: Partial<Record<CmsResource, { title: string; description: string; fields: AdminField[] }>> = {
  events: {
    title: 'Events',
    description: 'Create and publish events, set registration windows, and manage event details.',
    fields: [
      { name: 'title', label: 'Event title', type: 'text', required: true },
      { name: 'slug', label: 'URL slug', type: 'text', required: true, help: 'Lowercase words separated by hyphens.' },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'eventDate', label: 'Event date', type: 'date', required: true },
  { name: 'startTime', label: 'Start time', type: 'time' },
  { name: 'endTime', label: 'End time', type: 'time' },
  { name: 'timeZone', label: 'Time zone', type: 'text', help: 'Use an IANA zone such as Africa/Nairobi.' },
      { name: 'venue', label: 'Venue', type: 'text', required: true },
      { name: 'featuredImage', label: 'Featured image', type: 'image', help: 'Use an existing image path under /public. Uploading new images requires a Firebase Storage bucket.' },
      { name: 'registrationEnabled', label: 'Accept registrations', type: 'toggle' },
      { name: 'registrationDeadline', label: 'Registration deadline', type: 'date' },
      { name: 'featured', label: 'Feature on homepage', type: 'toggle' },
      { name: 'status', label: 'Publication status', type: 'select', required: true, options: statusOptions },
    ],
  },
  programs: {
    title: 'Programs',
    description: 'Manage programs and the descriptions visitors see on the public site.',
    fields: [
      { name: 'title', label: 'Program title', type: 'text', required: true },
      { name: 'slug', label: 'URL slug', type: 'text', required: true },
      { name: 'category', label: 'Category', type: 'text', required: true },
      { name: 'tagline', label: 'Tagline', type: 'text' },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'targetAudience', label: 'Target audience', type: 'textarea' },
      { name: 'details', label: 'Program highlights', type: 'textarea', help: 'One item per line.' },
      { name: 'impact', label: 'Impact description', type: 'textarea' },
      { name: 'featuredImage', label: 'Featured image', type: 'image', help: 'Use an existing image path under /public. Uploading new images requires a Firebase Storage bucket.' },
      { name: 'featured', label: 'Feature on homepage', type: 'toggle' },
      { name: 'status', label: 'Publication status', type: 'select', required: true, options: statusOptions },
    ],
  },
  projects: {
    title: 'AvanTech projects',
    description: 'Document project work carefully. Only publish achievements and technical details that have been verified.',
    fields: [
      { name: 'title', label: 'Project title', type: 'text', required: true },
      { name: 'slug', label: 'URL slug', type: 'text', required: true },
      { name: 'category', label: 'Project category', type: 'select', required: true, options: [
        { label: 'Smart Homes', value: 'Smart Homes' },
        { label: 'Automatic Doors', value: 'Automatic Doors' },
        { label: 'Voice Command Cars', value: 'Voice Command Cars' },
        { label: 'Remote Control Rovers', value: 'Remote Control Rovers' },
        { label: 'Firefighting Rovers', value: 'Firefighting Rovers' },
        { label: 'AquaSmart', value: 'AquaSmart' },
      ] },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'technologies', label: 'Technologies and concepts', type: 'textarea', help: 'One item per line. Do not list unverified components.' },
      { name: 'developmentStatus', label: 'Development status', type: 'textarea', help: 'State what has been built or tested; distinguish concepts from verified results.' },
      { name: 'featuredImage', label: 'Featured image', type: 'image', help: 'Use an existing image path under /public. Uploading new images requires a Firebase Storage bucket.' },
      { name: 'additionalImages', label: 'Additional images', type: 'images', help: 'Enter one existing /public image path per line. Uploading new images requires a Firebase Storage bucket.' },
      { name: 'featured', label: 'Feature on homepage', type: 'toggle' },
      { name: 'status', label: 'Publication status', type: 'select', required: true, options: statusOptions },
    ],
  },
  posts: {
    title: 'News and announcements',
    description: 'Publish news stories and announcements for the public website.',
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'slug', label: 'URL slug', type: 'text', required: true },
      { name: 'excerpt', label: 'Summary', type: 'textarea', required: true },
      { name: 'content', label: 'Article content (Markdown)', type: 'textarea', required: true, help: 'Supports headings, bold, links and lists. Raw HTML is not rendered.' },
      { name: 'author', label: 'Author', type: 'text', required: true },
      { name: 'category', label: 'Category', type: 'text', required: true },
      { name: 'publishedAt', label: 'Publication date', type: 'date' },
      { name: 'featuredImage', label: 'Featured image', type: 'image', help: 'Use an existing image path under /public. Uploading new images requires a Firebase Storage bucket.' },
      { name: 'featured', label: 'Feature on homepage', type: 'toggle' },
      { name: 'status', label: 'Publication status', type: 'select', required: true, options: statusOptions },
    ],
  },
  gallery: {
    title: 'Gallery',
    description: 'Upload, caption, and publish photographs and creative work.',
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'alt', label: 'Image description', type: 'text', required: true, help: 'Describe the image for visitors using screen readers.' },
      { name: 'imagePath', label: 'Image', type: 'image', required: true, help: 'Use an existing image path under /public. Uploading new images requires a Firebase Storage bucket.' },
      { name: 'caption', label: 'Caption', type: 'textarea' },
      { name: 'category', label: 'Category', type: 'text', required: true },
      { name: 'uploadedAt', label: 'Image date', type: 'date' },
      { name: 'status', label: 'Publication status', type: 'select', required: true, options: statusOptions },
    ],
  },
  impact: {
    title: 'Impact statistics',
    description: 'Only publish figures that Avan Makerspace has verified.',
    fields: [
      { name: 'title', label: 'Statistic title', type: 'text', required: true },
      { name: 'value', label: 'Value', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'displayOrder', label: 'Display order', type: 'number' },
      { name: 'status', label: 'Publication status', type: 'select', required: true, options: statusOptions },
    ],
  },
  settings: {
    title: 'Website settings',
    description: 'Update contact details, social links, footer text, and selected editable descriptions. Existing visual branding remains in the codebase.',
    fields: [
      { name: 'organizationName', label: 'Organization name', type: 'text' },
      { name: 'contactEmail', label: 'Contact email', type: 'email' },
      { name: 'contactPhone', label: 'Contact phone', type: 'text' },
      { name: 'location', label: 'Location', type: 'text' },
      { name: 'whatsappNumber', label: 'WhatsApp number', type: 'text' },
      { name: 'socialTikTok', label: 'TikTok URL', type: 'url' },
      { name: 'socialFacebook', label: 'Facebook URL', type: 'url' },
      { name: 'socialInstagram', label: 'Instagram URL', type: 'url' },
      { name: 'socialLinkedin', label: 'LinkedIn URL', type: 'url' },
      { name: 'footerText', label: 'Footer description', type: 'textarea' },
      { name: 'aboutDescription', label: 'About page description', type: 'textarea' },
      { name: 'homepageAnnouncement', label: 'Homepage announcement', type: 'textarea' },
      { name: 'cmsEnabled', label: 'Use Firestore for existing programs, projects and impact pages', type: 'toggle', help: 'Enable after the matching content has been added in the dashboard. When enabled, those sections stop using their current static fallback.' },
    ],
  },
}

export const publicContentRoutes: Record<string, string> = {
  events: '/events',
  programs: '/programs',
  projects: '/programs/avantech',
  posts: '/news',
  gallery: '/gallery',
  impact: '/impact',
  messages: '/get-involved',
  registrations: '/events',
  settings: '/',
}
