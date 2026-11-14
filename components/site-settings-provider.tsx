'use client'

import { createContext, useContext, type ReactNode } from 'react'
import type { SiteSettings } from '@/lib/firebase/types'

const SiteSettingsContext = createContext<SiteSettings | null>(null)

export function SiteSettingsProvider({
  children,
  settings,
}: Readonly<{
  children: ReactNode
  settings: SiteSettings | null
}>) {
  return <SiteSettingsContext.Provider value={settings}>{children}</SiteSettingsContext.Provider>
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext)
}
