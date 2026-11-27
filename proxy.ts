import { NextRequest, NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
  const isPublicApi = request.nextUrl.pathname.startsWith('/api/public/')
  const response = isPublicApi && request.method === 'OPTIONS'
    ? new NextResponse(null, { status: 204 })
    : NextResponse.next()

  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Strict-Transport-Security', 'max-age=63072000')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')

  if (isPublicApi) {
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, X-Firebase-AppCheck')
    response.headers.set('Access-Control-Max-Age', '86400')
  }

  return response
}

export const config = {
  matcher: ['/:path*'],
}
