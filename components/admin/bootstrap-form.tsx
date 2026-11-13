'use client'

import Link from 'next/link'
import { useState } from 'react'
import { getAppCheckToken, isFirebaseClientConfigured } from '@/lib/firebase/client'

export function AdminBootstrapForm() {
  const [email, setEmail] = useState('')
  const [secret, setSecret] = useState('')
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null)
  const firebaseClientReady = isFirebaseClientConfigured()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setBusy(true)
    setMessage(null)
    try {
      if (!isFirebaseClientConfigured()) throw new Error('Firebase web configuration is missing. Add the environment variables from the setup guide first.')
      const token = await getAppCheckToken()
      const headers = new Headers({ 'Content-Type': 'application/json' })
      if (token) headers.set('X-Firebase-AppCheck', token)
      const response = await fetch('/api/admin/bootstrap', { method: 'POST', headers, body: JSON.stringify({ email: email.trim().toLowerCase(), secret }) })
      const result = await response.json() as { error?: string }
      if (!response.ok) throw new Error(result.error ?? 'Administrator setup could not be completed.')
      setSecret('')
      setMessage({ type: 'success', text: 'The administrator account is provisioned. Remove the bootstrap environment variables, then sign in.' })
    } catch (cause) {
      setMessage({ type: 'error', text: cause instanceof Error ? cause.message : 'Administrator setup could not be completed.' })
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-background p-6 shadow-xl sm:p-8">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">One-time administrator setup</p>
      <h1 className="mt-2 text-3xl font-bold">Provision the main administrator</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Create and verify the administrator account in Firebase Authentication first. Configure the matching bootstrap email and a temporary secret in Vercel. This endpoint can grant exactly one administrator and becomes unusable after bootstrap.</p>
      {!firebaseClientReady && <p role="status" className="mt-5 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-sm">Firebase is not configured yet. Add the documented Vercel variables and redeploy before setup.</p>}
      {message && <p role={message.type === 'error' ? 'alert' : 'status'} className={`mt-5 rounded-lg p-3 text-sm ${message.type === 'error' ? 'bg-destructive/10 text-destructive' : 'bg-secondary/10 text-foreground'}`}>{message.text}</p>}
      <form onSubmit={handleSubmit} className="mt-5 grid gap-4">
        <div><label htmlFor="bootstrap-email" className="text-sm font-semibold">Administrator email</label><input id="bootstrap-email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" /></div>
        <div><label htmlFor="bootstrap-secret" className="text-sm font-semibold">Temporary bootstrap secret</label><input id="bootstrap-secret" type="password" autoComplete="off" minLength={32} required value={secret} onChange={(event) => setSecret(event.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" /><p className="mt-1 text-xs text-muted-foreground">Use the exact value configured as FIREBASE_ADMIN_BOOTSTRAP_SECRET. Never send it in chat.</p></div>
        <button type="submit" disabled={busy || !firebaseClientReady} className="rounded-lg bg-primary px-4 py-3 font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50">{busy ? 'Provisioning…' : 'Provision administrator'}</button>
      </form>
      <p className="mt-6 border-t border-border pt-4 text-sm text-muted-foreground"><Link href="/admin/login" className="font-semibold text-secondary hover:underline">Back to sign in</Link></p>
    </div>
  )
}
