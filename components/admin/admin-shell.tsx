'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { signOut } from 'firebase/auth'
import { getFirebaseAuth, getAppCheckToken } from '@/lib/firebase/client'
import type { AdminSession } from '@/lib/firebase/auth'

const links = [
  { href: '/admin', label: 'Overview' },
  { href: '/admin/events', label: 'Events' },
  { href: '/admin/programs', label: 'Programs' },
  { href: '/admin/projects', label: 'AvanTech projects' },
  { href: '/admin/posts', label: 'News & announcements' },
  { href: '/admin/gallery', label: 'Gallery' },
  { href: '/admin/impact', label: 'Impact statistics' },
  { href: '/admin/messages', label: 'Contact messages' },
  { href: '/admin/registrations', label: 'Registrations' },
  { href: '/admin/settings', label: 'Website settings' },
]

export function AdminShell({ children, user }: Readonly<{ children: React.ReactNode; user: AdminSession }>) {
  const pathname = usePathname()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [error, setError] = useState('')

  async function handleLogout() {
    setError('')
    try {
      const token = await getAppCheckToken()
      const headers = new Headers()
      if (token) headers.set('X-Firebase-AppCheck', token)
      const response = await fetch('/api/admin/session', { method: 'DELETE', headers })
      if (!response.ok) throw new Error('Unable to end the admin session.')
      await signOut(getFirebaseAuth()).catch(() => undefined)
      router.replace('/admin/login')
      router.refresh()
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Unable to log out.')
    }
  }

  return (
    <div className="min-h-screen bg-muted/20 text-foreground lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="hidden border-r border-border bg-background lg:flex lg:flex-col">
        <div className="border-b border-border px-6 py-6">
          <Link href="/" className="text-lg font-bold text-primary">Avan Makerspace</Link>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Content management</p>
        </div>
        <nav aria-label="Admin navigation" className="flex flex-1 flex-col gap-1 p-4">
          {links.map((link) => {
            const active = link.href === '/admin' ? pathname === link.href : pathname.startsWith(link.href)
            return (
              <Link key={link.href} href={link.href} className={`rounded-lg px-3 py-2.5 text-sm font-medium transition ${active ? 'bg-primary text-primary-foreground' : 'text-foreground/75 hover:bg-muted'}`}>
                {link.label}
              </Link>
            )
          })}
        </nav>
        <div className="border-t border-border p-4 text-sm">
          <p className="truncate font-semibold">{user.displayName}</p>
          <p className="truncate text-xs text-muted-foreground">{user.email}</p>
          <button onClick={handleLogout} className="mt-3 text-sm font-semibold text-secondary hover:underline">Sign out</button>
        </div>
      </aside>

      <div className="min-w-0">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/95 px-4 py-3 backdrop-blur sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button type="button" className="rounded-md border border-border px-3 py-2 text-sm lg:hidden" aria-expanded={menuOpen} aria-controls="admin-mobile-menu" onClick={() => setMenuOpen((open) => !open)}>
              {menuOpen ? 'Close menu' : 'Menu'}
            </button>
            <div>
              <p className="font-bold text-primary">Create. Express. Belong.</p>
              <p className="hidden text-xs text-muted-foreground sm:block">Administrator workspace</p>
            </div>
          </div>
          <Link href="/" className="text-sm font-semibold text-secondary hover:underline">View website</Link>
        </header>

        {menuOpen && (
          <nav id="admin-mobile-menu" aria-label="Admin navigation" className="grid gap-1 border-b border-border bg-background p-4 sm:grid-cols-2 lg:hidden">
            {links.map((link) => <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className={`rounded-lg px-3 py-2 text-sm font-medium ${pathname === link.href ? 'bg-primary text-primary-foreground' : 'text-foreground/75 hover:bg-muted'}`}>{link.label}</Link>)}
            <button onClick={handleLogout} className="rounded-lg px-3 py-2 text-left text-sm font-semibold text-secondary">Sign out</button>
          </nav>
        )}

        {error && <p role="alert" className="border-b border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive sm:px-8">{error}</p>}
        <main className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
