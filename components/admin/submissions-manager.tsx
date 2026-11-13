'use client'

import { useMemo, useState } from 'react'
import { getAppCheckToken } from '@/lib/firebase/client'
import type { CmsRecord } from '@/lib/firebase/types'

export function SubmissionsManager({
  resource,
  initialRecords,
  events = [],
}: Readonly<{ resource: 'messages' | 'registrations'; initialRecords: CmsRecord[]; events?: CmsRecord[] }>) {
  const [records, setRecords] = useState(initialRecords)
  const [selected, setSelected] = useState<CmsRecord | null>(null)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')
  const [eventId, setEventId] = useState('all')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [busy, setBusy] = useState(false)
  const title = resource === 'messages' ? 'Contact messages' : 'Event registrations'

  const visibleRecords = useMemo(() => records.filter((record) => {
    const matchesQuery = !query || JSON.stringify(record).toLocaleLowerCase().includes(query.toLocaleLowerCase())
    const matchesStatus = status === 'all' || record.status === status
    const matchesEvent = eventId === 'all' || record.eventId === eventId
    return matchesQuery && matchesStatus && matchesEvent
  }), [records, query, status, eventId])

  async function updateStatus(record: CmsRecord, nextStatus: string) {
    setBusy(true)
    setError('')
    setSuccess('')
    try {
      const token = await getAppCheckToken()
      const headers = new Headers({ 'Content-Type': 'application/json' })
      if (token) headers.set('X-Firebase-AppCheck', token)
      const response = await fetch(`/api/admin/${resource}/${record.id}`, { method: 'PATCH', headers, body: JSON.stringify({ status: nextStatus }) })
      const result = await response.json() as { error?: string; item?: CmsRecord }
      if (!response.ok || !result.item) throw new Error(result.error ?? 'Could not update this item.')
      setRecords((current) => current.map((item) => item.id === record.id ? { ...item, ...result.item } : item))
      setSelected((current) => current?.id === record.id ? { ...current, ...result.item } : current)
      setSuccess('Status updated.')
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Could not update this item.')
    } finally {
      setBusy(false)
    }
  }

  async function deleteRecord(record: CmsRecord) {
    if (!window.confirm(`Delete this ${resource === 'messages' ? 'message' : 'registration'}? This cannot be undone.`)) return
    setBusy(true)
    setError('')
    try {
      const token = await getAppCheckToken()
      const headers = new Headers()
      if (token) headers.set('X-Firebase-AppCheck', token)
      const response = await fetch(`/api/admin/${resource}/${record.id}`, { method: 'DELETE', headers })
      const result = await response.json() as { error?: string }
      if (!response.ok) throw new Error(result.error ?? 'Could not delete this item.')
      setRecords((current) => current.filter((item) => item.id !== record.id))
      if (selected?.id === record.id) setSelected(null)
      setSuccess('Item deleted.')
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Could not delete this item.')
    } finally {
      setBusy(false)
    }
  }

  function exportCsv() {
    const params = new URLSearchParams()
    if (eventId !== 'all') params.set('eventId', eventId)
    if (query) params.set('q', query)
    window.location.assign(`/api/admin/exports/registrations?${params.toString()}`)
  }

  return (
    <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(320px,0.75fr)]">
      <div className="rounded-2xl border border-border bg-background p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4"><div><h1 className="text-2xl font-bold">{title}</h1><p className="mt-1 text-sm text-muted-foreground">Private records are visible only to the administrator.</p></div>{resource === 'registrations' && <button type="button" onClick={exportCsv} className="rounded-lg border border-border px-3 py-2 text-sm font-semibold hover:bg-muted">Export CSV</button>}</div>
        {error && <p role="alert" className="mt-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}{success && <p role="status" className="mt-4 rounded-lg bg-secondary/10 p-3 text-sm">{success}</p>}
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <label className="text-sm font-medium">Search<input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={resource === 'messages' ? 'Name, email, subject' : 'Name, email, phone'} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2.5" /></label>
          <label className="text-sm font-medium">Status<select value={status} onChange={(event) => setStatus(event.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2.5"><option value="all">All statuses</option>{(resource === 'messages' ? ['unread', 'read', 'archived'] : ['pending', 'confirmed', 'waitlisted', 'cancelled']).map((value) => <option key={value} value={value}>{value}</option>)}</select></label>
          {resource === 'registrations' && <label className="text-sm font-medium sm:col-span-2">Event<select value={eventId} onChange={(event) => setEventId(event.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2.5"><option value="all">All events</option>{events.map((event) => <option key={event.id} value={event.id}>{String(event.title ?? event.id)}</option>)}</select></label>}
        </div>
        <div className="mt-5 space-y-2">
          {visibleRecords.length === 0 ? <div className="rounded-xl border border-dashed border-border p-8 text-center"><p className="font-semibold">No {resource === 'messages' ? 'messages' : 'registrations'} yet</p><p className="mt-1 text-sm text-muted-foreground">New submissions will appear here.</p></div> : visibleRecords.map((record) => (
            <article key={record.id} className={`rounded-xl border p-4 ${selected?.id === record.id ? 'border-primary bg-primary/5' : 'border-border'}`}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button type="button" onClick={() => { setSelected(record); if (resource === 'messages' && record.status === 'unread') void updateStatus(record, 'read') }} className="min-w-0 text-left"><span className="block truncate font-semibold">{String(record.fullName ?? 'Visitor')}</span><span className="mt-1 block truncate text-xs text-muted-foreground">{String(record.email ?? '')}{resource === 'messages' ? ` · ${String(record.subject ?? '')}` : ` · ${String(record.eventTitle ?? '')}`}</span></button>
                <div className="flex items-center gap-2"><select aria-label={`Status for ${String(record.fullName ?? 'submission')}`} value={String(record.status ?? (resource === 'messages' ? 'unread' : 'pending'))} disabled={busy} onChange={(event) => void updateStatus(record, event.target.value)} className="rounded-md border border-border bg-background px-2 py-1.5 text-xs"><option value="unread">Unread</option><option value="read">Read</option><option value="archived">Archived</option><option value="pending">Pending</option><option value="confirmed">Confirmed</option><option value="waitlisted">Waitlisted</option><option value="cancelled">Cancelled</option></select><button type="button" disabled={busy} onClick={() => void deleteRecord(record)} className="rounded-md border border-destructive/30 px-2 py-1.5 text-xs font-semibold text-destructive">Delete</button></div>
              </div>
            </article>
          ))}
        </div>
      </div>
      {selected ? <aside className="h-fit rounded-2xl border border-border bg-background p-5 sm:p-6"><div className="flex items-start justify-between gap-4"><div><h2 className="text-lg font-bold">{resource === 'messages' ? String(selected.subject ?? 'Message') : String(selected.eventTitle ?? 'Registration')}</h2><p className="mt-1 text-sm text-muted-foreground">{String(selected.fullName ?? '')} · {String(selected.email ?? '')}</p></div><button type="button" onClick={() => setSelected(null)} className="text-sm font-semibold text-secondary hover:underline">Close</button></div><dl className="mt-5 grid gap-3 text-sm"><div><dt className="font-semibold">Submitted</dt><dd className="text-muted-foreground">{String(selected.submittedAt ?? '')}</dd></div>{resource === 'messages' ? <div><dt className="font-semibold">Message</dt><dd className="mt-1 whitespace-pre-wrap leading-relaxed text-foreground/75">{String(selected.message ?? '')}</dd></div> : <><div><dt className="font-semibold">Phone</dt><dd className="text-muted-foreground">{String(selected.phone ?? '')}</dd></div><div><dt className="font-semibold">Category</dt><dd className="text-muted-foreground">{String(selected.participantCategory ?? '')}</dd></div><div><dt className="font-semibold">Organisation</dt><dd className="text-muted-foreground">{String(selected.organisation ?? '—')}</dd></div><div><dt className="font-semibold">Additional information</dt><dd className="whitespace-pre-wrap text-muted-foreground">{String(selected.additionalInformation ?? '—')}</dd></div></>}</dl></aside> : <aside className="h-fit rounded-2xl border border-dashed border-border p-6 text-sm text-muted-foreground">Select a row to view the full {resource === 'messages' ? 'message' : 'registration'} details.</aside>}
    </section>
  )
}
