import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import WhatsAppWidget from '@/components/whatsapp-widget'
import { SiteSettingsProvider } from '@/components/site-settings-provider'
import { getPublicSettings } from '@/lib/firebase/content'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Avan Makerspace | Refugee-Led Creativity & Innovation in Kakuma',
  description: 'Avan Makerspace is a refugee-led, inclusive innovation and creativity hub based in Kakuma Refugee Camp, Kenya. We empower young people from refugee and host communities through technology, robotics, entrepreneurship, arts, and creative learning.',
  generator: 'v0.app',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F8FBFC' },
    { media: '(prefers-color-scheme: dark)', color: '#111B25' },
  ],
}

export const dynamic = 'force-dynamic'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const settings = await getPublicSettings().catch(() => null)
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        <SiteSettingsProvider settings={settings}>
          {children}
          <WhatsAppWidget />
        </SiteSettingsProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
