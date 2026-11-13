'use client'

import Link from 'next/link'
import { useState } from 'react'
import { sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { getAppCheckToken, getFirebaseAuth, isFirebaseClientConfigured } from '@/lib/firebase/client'

export function AdminLoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null)
  const firebaseClientReady = isFirebaseClientConfigured()

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nativeEvent = event.nativeEvent as KeyboardEvent
    if (nativeEvent.isComposing || nativeEvent.keyCode === 229) return
    setBusy(true)
    setMessage(null)

    try {
      if (!isFirebaseClientConfigured()) throw new Error('Firebase web app configuration is missing. Add the NEXT_PUBLIC_FIREBASE values and redeploy.')
      const auth = getFirebaseAuth()
      const credential = await signInWithEmailAndPassword(auth, email.trim(), password)
      const idToken = await credential.user.getIdToken(true)
      const appCheckToken = await getAppCheckToken()
      const headers = new Headers({ 'Content-Type': 'application/json' })
      if (appCheckToken) headers.set('X-Firebase-AppCheck', appCheckToken)
      const response = await fetch('/api/admin/session', { method: 'POST', headers, body: JSON.stringify({ idToken }) })
      const result = await response.json() as { error?: string }
      if (!response.ok) throw new Error(result.error ?? 'This account is not authorized to access the dashboard.')
      await signOut(auth).catch(() => undefined)
      window.location.assign('/admin')
    } catch (cause) {
      await signOut(getFirebaseAuth()).catch(() => undefined)
      setMessage({ type: 'error', text: cause instanceof Error ? cause.message : 'Sign in failed.' })
    } finally {
      setBusy(false)
    }
  }

  async function handlePasswordReset() {
    setMessage(null)
    if (!email.trim()) {
      setMessage({ type: 'error', text: 'Enter your email address first.' })
      return
    }
    try {
      await sendPasswordResetEmail(getFirebaseAuth(), email.trim())
      setMessage({ type: 'success', text: 'If an account exists for that address, password reset instructions have been sent.' })
    } catch {
      setMessage({ type: 'success', text: 'If an account exists for that address, password reset instructions have been sent.' })
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-background p-6 shadow-xl sm:p-8">
      <div className="mb-6"><p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">Administrator access</p><h1 className="mt-2 text-3xl font-bold">Sign in</h1><p className="mt-2 text-sm text-muted-foreground">Use the administrator account created for Avan Makerspace.</p></div>
      {!firebaseClientReady && <p role="status" className="mb-4 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-sm">Firebase is not configured yet. Add the documented Vercel variables and redeploy before signing in.</p>}
      {message && <p role={message.type === 'error' ? 'alert' : 'status'} className={`mb-4 rounded-lg p-3 text-sm ${message.type === 'error' ? 'bg-destructive/10 text-destructive' : 'bg-secondary/10 text-foreground'}`}>{message.text}</p>}
      <form onSubmit={handleLogin} className="grid gap-4">
        <div><label htmlFor="admin-email" className="text-sm font-semibold">Email address</label><input id="admin-email" type="email" autoComplete="username" required value={email} onChange={(event) => setEmail(event.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" /></div>
        <div><label htmlFor="admin-password" className="text-sm font-semibold">Password</label><input id="admin-password" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" /></div>
        <button type="submit" disabled={busy || !firebaseClientReady} className="mt-2 rounded-lg bg-primary px-4 py-3 font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50">{busy ? 'Signing in…' : 'Sign in'}</button>
      </form>
      <button type="button" onClick={() => void handlePasswordReset()} className="mt-4 text-sm font-semibold text-secondary hover:underline">Forgot password?</button>
      <p className="mt-6 border-t border-border pt-4 text-sm text-muted-foreground">First administrator? <Link href="/admin/setup" className="font-semibold text-secondary hover:underline">Open secure setup</Link></p>
    </div>
  )
}
