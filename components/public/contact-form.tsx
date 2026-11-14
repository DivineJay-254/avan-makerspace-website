'use client'

import { useState } from 'react'
import { getAppCheckToken, isFirebaseClientConfigured } from '@/lib/firebase/client'

export function ContactForm() {
  const [pending, setPending] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const configured = isFirebaseClientConfigured()

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    const nativeEvent = event.nativeEvent as KeyboardEvent
    if (nativeEvent.isComposing || nativeEvent.keyCode === 229) return
    event.preventDefault()
    if (!configured) return
    setPending(true)
    setStatus('idle')
    setMessage('')
    const form = new FormData(event.currentTarget)
    try {
      const appCheckToken = await getAppCheckToken()
      const response = await fetch('/api/public/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(appCheckToken ? { 'X-Firebase-AppCheck': appCheckToken } : {}) },
        body: JSON.stringify({ fullName: form.get('fullName'), email: form.get('email'), subject: form.get('subject'), message: form.get('message'), company: form.get('company') }),
      })
      const result = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(result.error || 'Your message could not be sent.')
      setStatus('success')
      setMessage('Thank you. Your message has been sent to the team.')
      event.currentTarget.reset()
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Your message could not be sent. Please try again later.')
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-5">
      {!configured && <p role="status" className="rounded-lg border border-secondary/30 bg-secondary/5 p-4 text-sm text-foreground">Contact submissions are paused until Firebase is configured.</p>}
      <div className="sr-only" aria-hidden="true"><label htmlFor="contact-company">Company</label><input id="contact-company" name="company" tabIndex={-1} autoComplete="off" /></div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2"><label htmlFor="contact-name" className="text-sm font-medium">Full name</label><input id="contact-name" name="fullName" required maxLength={120} autoComplete="name" disabled={!configured || pending} className="rounded-lg border border-input bg-background px-3 py-2.5 outline-none focus-visible:ring-2 focus-visible:ring-ring" /></div>
        <div className="flex flex-col gap-2"><label htmlFor="contact-email" className="text-sm font-medium">Email</label><input id="contact-email" name="email" type="email" required maxLength={254} autoComplete="email" disabled={!configured || pending} className="rounded-lg border border-input bg-background px-3 py-2.5 outline-none focus-visible:ring-2 focus-visible:ring-ring" /></div>
      </div>
      <div className="flex flex-col gap-2"><label htmlFor="contact-subject" className="text-sm font-medium">Subject</label><input id="contact-subject" name="subject" required maxLength={160} disabled={!configured || pending} className="rounded-lg border border-input bg-background px-3 py-2.5 outline-none focus-visible:ring-2 focus-visible:ring-ring" /></div>
      <div className="flex flex-col gap-2"><label htmlFor="contact-message" className="text-sm font-medium">Message</label><textarea id="contact-message" name="message" required maxLength={5000} rows={6} disabled={!configured || pending} className="resize-y rounded-lg border border-input bg-background px-3 py-2.5 outline-none focus-visible:ring-2 focus-visible:ring-ring" /></div>
      <p className="text-xs leading-relaxed text-muted-foreground">Your message is stored privately for the Avan Makerspace team to review.</p>
      {message && <p role={status === 'error' ? 'alert' : 'status'} className={status === 'error' ? 'text-sm text-destructive' : 'text-sm text-primary'}>{message}</p>}
      <button type="submit" disabled={!configured || pending} className="w-fit rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50">{pending ? 'Sending…' : 'Send message'}</button>
    </form>
  )
}
