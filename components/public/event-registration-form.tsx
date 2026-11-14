'use client'

import { useState } from 'react'
import { getAppCheckToken } from '@/lib/firebase/client'

export function EventRegistrationForm({ eventId }: Readonly<{ eventId: string }>) {
  const [pending, setPending] = useState(false)
  const [notice, setNotice] = useState('')
  const [values, setValues] = useState({ fullName: '', email: '', phone: '', participantCategory: 'student', organisation: '', additionalInformation: '', company: '' })

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    const nativeEvent = event.nativeEvent as SubmitEvent & { isComposing?: boolean; keyCode?: number }
    if (nativeEvent.isComposing || nativeEvent.keyCode === 229) return
    event.preventDefault()
    setPending(true)
    setNotice('')
    try {
      const appCheckToken = await getAppCheckToken()
      const response = await fetch('/api/public/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(appCheckToken ? { 'X-Firebase-AppCheck': appCheckToken } : {}) },
        body: JSON.stringify({ ...values, eventId }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error ?? 'Registration could not be submitted.')
      setNotice('Registration received. The event team will review your details.')
      setValues({ fullName: '', email: '', phone: '', participantCategory: 'student', organisation: '', additionalInformation: '', company: '' })
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Registration could not be submitted. Please try again.')
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={submit} className="grid gap-4" aria-describedby="registration-status">
      <label className="grid gap-2 text-sm font-semibold">Full name<input autoComplete="name" required maxLength={120} value={values.fullName} onChange={(event) => setValues({ ...values, fullName: event.target.value })} className="rounded-lg border border-border bg-background px-4 py-3 font-normal" /></label>
      <label className="grid gap-2 text-sm font-semibold">Email<input type="email" autoComplete="email" required maxLength={254} value={values.email} onChange={(event) => setValues({ ...values, email: event.target.value })} className="rounded-lg border border-border bg-background px-4 py-3 font-normal" /></label>
      <label className="grid gap-2 text-sm font-semibold">Phone<input type="tel" autoComplete="tel" required minLength={7} maxLength={32} value={values.phone} onChange={(event) => setValues({ ...values, phone: event.target.value })} className="rounded-lg border border-border bg-background px-4 py-3 font-normal" /></label>
      <label className="grid gap-2 text-sm font-semibold">Participant category<select value={values.participantCategory} onChange={(event) => setValues({ ...values, participantCategory: event.target.value })} className="rounded-lg border border-border bg-background px-4 py-3 font-normal"><option value="student">Student</option><option value="educator">Educator</option><option value="community-member">Community member</option><option value="organization">Organization</option><option value="other">Other</option></select></label>
      <label className="grid gap-2 text-sm font-semibold">Organization (optional)<input maxLength={160} value={values.organisation} onChange={(event) => setValues({ ...values, organisation: event.target.value })} className="rounded-lg border border-border bg-background px-4 py-3 font-normal" /></label>
      <label className="grid gap-2 text-sm font-semibold">Additional information (optional)<textarea rows={3} maxLength={1000} value={values.additionalInformation} onChange={(event) => setValues({ ...values, additionalInformation: event.target.value })} className="resize-y rounded-lg border border-border bg-background px-4 py-3 font-normal" /></label>
      <label className="sr-only" aria-hidden="true">Company<input tabIndex={-1} autoComplete="off" name="company" value={values.company} onChange={(event) => setValues({ ...values, company: event.target.value })} /></label>
      <p id="registration-status" aria-live="polite" className="text-sm text-muted-foreground">{notice}</p>
      <button type="submit" disabled={pending} className="min-h-12 rounded-lg bg-secondary px-6 py-3 font-semibold text-secondary-foreground transition hover:bg-secondary/90 disabled:cursor-not-allowed disabled:opacity-60">{pending ? 'Submitting…' : 'Register for this event'}</button>
      <p className="text-xs text-muted-foreground">Registrations are reviewed by the event team. Duplicate registrations for the same event and email are prevented.</p>
    </form>
  )
}
