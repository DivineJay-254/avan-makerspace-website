import { randomUUID } from 'node:crypto'
import type { NextRequest } from 'next/server'
import { getFirebaseAdmin } from '@/lib/firebase/admin'
import { requireAdminSession } from '@/lib/firebase/auth'
import { ApiError, apiErrorResponse, assertSameOrigin, verifyAppCheck } from '@/lib/firebase/security'

const maximumBytes = 5 * 1024 * 1024
const imageTypes = new Map([
  ['image/jpeg', { extension: 'jpg', signature: (bytes: Buffer) => bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff }],
  ['image/png', { extension: 'png', signature: (bytes: Buffer) => bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])) }],
  ['image/webp', { extension: 'webp', signature: (bytes: Buffer) => bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WEBP' }],
  ['image/avif', { extension: 'avif', signature: (bytes: Buffer) => bytes.toString('ascii', 4, 12).includes('avif') }],
])

export async function POST(request: NextRequest) {
  try {
    assertSameOrigin(request)
    const admin = await requireAdminSession()
    await verifyAppCheck(request)
    const form = await request.formData()
    const file = form.get('file')
    if (!(file instanceof File)) throw new ApiError('Choose an image file to upload.', 400, 'IMAGE_REQUIRED')
    if (file.size === 0 || file.size > maximumBytes) throw new ApiError('Images must be smaller than 5 MB.', 413, 'IMAGE_TOO_LARGE')
    const descriptor = imageTypes.get(file.type)
    if (!descriptor) throw new ApiError('Upload a JPEG, PNG, WebP, or AVIF image.', 415, 'IMAGE_TYPE_NOT_ALLOWED')

    const bytes = Buffer.from(await file.arrayBuffer())
    if (!descriptor.signature(bytes)) throw new ApiError('The selected file does not match its image type.', 415, 'IMAGE_SIGNATURE_INVALID')
    const path = `content/${admin.uid}/${randomUUID()}.${descriptor.extension}`
    const { bucket } = getFirebaseAdmin()
    if (!bucket) throw new ApiError('Image uploads require a Firebase Storage bucket. Use an existing image path from /public until Storage is enabled.', 503, 'FIREBASE_STORAGE_NOT_CONFIGURED')
    const object = bucket.file(path)
    await object.save(bytes, { resumable: false, metadata: { contentType: file.type, cacheControl: 'private, no-store' } })
    const [previewUrl] = await object.getSignedUrl({ action: 'read', expires: Date.now() + 15 * 60 * 1000 })
    return Response.json({ uploads: [{ path, url: previewUrl }] }, { status: 201 })
  } catch (error) {
    return apiErrorResponse(error)
  }
}
