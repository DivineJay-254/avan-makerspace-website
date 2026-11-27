import type { ContentResource } from './types'

export function getMediaUrl(resource: ContentResource, id: string, path: string) {
  if (!path) return ''
  if (path.startsWith('/') && !path.startsWith('//')) return path
  if (!path.startsWith('content/') || path.includes('..')) return ''
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') ?? ''
  return `${apiBase}/api/media/${resource}/${encodeURIComponent(id)}?path=${encodeURIComponent(path)}`
}
