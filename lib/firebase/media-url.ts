import type { ContentResource } from './types'

export function getMediaUrl(resource: ContentResource, id: string, path: string) {
  if (!path) return ''
  if (path.startsWith('/') && !path.startsWith('//')) return path
  if (path.startsWith('https://')) return path
  return `/api/media/${resource}/${encodeURIComponent(id)}?path=${encodeURIComponent(path)}`
}
