/** @type {import('next').NextConfig} */
const firebaseApiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY || process.env.apiKey_2 || process.env.apiKey

const staticExport = process.env.STATIC_EXPORT === '1'

const nextConfig = {
  ...(staticExport ? { output: 'export', trailingSlash: true } : {}),
  ...(firebaseApiKey ? { env: { NEXT_PUBLIC_FIREBASE_API_KEY: firebaseApiKey } } : {}),
  images: staticExport
    ? { unoptimized: true, loader: 'custom', loaderFile: './lib/static-image-loader.js' }
    : { unoptimized: true },
}

export default nextConfig
