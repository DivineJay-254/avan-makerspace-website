'use client'

import { useState, type FormEvent } from 'react'
import { getAppCheckToken } from '@/lib/firebase/client'

type SignupNotice = { type: 'success' | 'error'; message: string } | null

export function NewsletterForm() {
  const [pending, setPending] = useState(false)
  const [notice, setNotice] = useState<SignupNotice>(null)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (pending) return

    const form = event.currentTarget
    const data = new FormData(form)
    setPending(true)
    setNotice(null)

    try {
      const appCheckToken = await getAppCheckToken()
      const response = await fetch('/api/public/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(appCheckToken ? { 'X-Firebase-AppCheck': appCheckToken } : {}),
        },
        body: JSON.stringify({
          email: data.get('email'),
          consent: data.get('consent') === 'on',
          company: data.get('company'),
        }),
      })
      const result = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(result.error || 'We could not complete your signup. Please try again.')

      setNotice({
        type: 'success',
        message: result.duplicate ? 'You are already on the list. Thanks for staying connected.' : 'Thanks for signing up. You are on the list.',
      })
      form.reset()
    } catch (error) {
      setNotice({
        type: 'error',
        message: error instanceof Error ? error.message : 'We could not complete your signup. Please try again.',
      })
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={submit} className="mx-auto flex max-w-xl flex-col gap-3 text-left">
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">Email address</label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          maxLength={254}
          autoComplete="email"
          placeholder="Your email address"
          disabled={pending}
          className="min-h-12 min-w-0 flex-1 rounded-lg border border-footer-foreground/25 bg-footer-foreground/5 px-4 text-footer-foreground outline-none transition placeholder:text-footer-foreground/55 focus-visible:border-secondary focus-visible:ring-2 focus-visible:ring-secondary/60 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={pending}
          className="min-h-12 rounded-lg bg-secondary px-6 font-semibold text-secondary-foreground transition hover:bg-secondary/90 disabled:cursor-wait disabled:opacity-60"
        >
          {pending ? 'Signing you up…' : 'Join the newsletter'}
        </button>
      </div>
      <label className="flex items-start gap-2 text-xs leading-relaxed text-footer-foreground/75">
        <input name="consent" type="checkbox" required className="mt-0.5 size-4 shrink-0 accent-secondary" />
        <span>I agree to receive occasional email updates from Avan Makerspace. To request removal, email info@avanmakerspace.org.</span>
      </label>
      <p className="text-xs text-footer-foreground/60">Your email is stored securely and used only for Avan Makerspace updates.</p>
      <label aria-hidden="true" className="sr-only" htmlFor="newsletter-company">Company</label>
      <input id="newsletter-company" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="sr-only" />
      {notice && (
        <p role={notice.type === 'error' ? 'alert' : 'status'} aria-live={notice.type === 'error' ? 'assertive' : 'polite'} className={notice.type === 'error' ? 'text-sm text-red-200' : 'text-sm text-footer-foreground'}>
          {notice.message}
        </p>
      )}
    </form>
  )
}
