'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import { getAppCheckToken } from '@/lib/firebase/client'
import { adminResourceConfig, type AdminField } from '@/lib/firebase/resource-config'
import type { CmsRecord, ManagedResource } from '@/lib/firebase/types'

type ContentManagerProps = {
  resource: ManagedResource
  initialRecords: CmsRecord[]
}

type ApiResult = { items?: CmsRecord[]; item?: CmsRecord; error?: string }

function defaultValue(field: AdminField) {
  if (field.name === 'status') return 'draft'
  if (field.type === 'toggle') return false
  if (field.type === 'images') return [] as string[]
  if (field.name === 'displayOrder') return 0
  return ''
}

function displayValue(value: unknown) {
  if (Array.isArray(value)) return value.join('\n')
  if (value === undefined || value === null) return ''
  return String(value)
}

function imageUrl(resource: ManagedResource, record: CmsRecord | null, path: string) {
  if (path.startsWith('/') && !path.startsWith('//')) return path
  if (!record?.id || !path.startsWith('content/')) return ''
  return `/api/media/${resource}/${record.id}?path=${encodeURIComponent(path)}`
}

export function ContentManager({ resource, initialRecords }: ContentManagerProps) {
  const config = adminResourceConfig[resource]
  const fields = config?.fields ?? []
  const [records, setRecords] = useState(initialRecords)
  const [selected, setSelected] = useState<CmsRecord | null>(null)
  const [form, setForm] = useState<Record<string, unknown>>({})
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [busy, setBusy] = useState(false)
  const [notice, setNotice] = useState<{ kind: 'success' | 'error'; text: string } | null>(null)
  const [preview, setPreview] = useState<Record<string, string[]>>({})

  const visibleRecords = useMemo(() => records.filter((record) => {
    const matchesSearch = !search || JSON.stringify(record).toLocaleLowerCase().includes(search.toLocaleLowerCase())
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter
    return matchesSearch && matchesStatus
  }), [records, search, statusFilter])

  if (!config) return <p role="alert" className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">This content area is unavailable.</p>

  function setField(name: string, value: unknown) {
    setForm((current) => ({ ...current, [name]: value }))
  }

  function startNew() {
    setSelected(null)
    setForm(Object.fromEntries(fields.map((field) => [field.name, defaultValue(field)])))
    setPreview({})
    setNotice(null)
  }

  function startEdit(record: CmsRecord) {
    setSelected(record)
    setForm(Object.fromEntries(fields.map((field) => [field.name, record[field.name] ?? defaultValue(field)])))
    setPreview({})
    setNotice(null)
  }

  async function requestHeaders() {
    const headers = new Headers({ 'Content-Type': 'application/json' })
    const token = await getAppCheckToken()
    if (token) headers.set('X-Firebase-AppCheck', token)
    return headers
  }

  async function save(nextStatus?: string) {
    setBusy(true)
    setNotice(null)
    try {
      const payload = { ...form, ...(nextStatus ? { status: nextStatus } : {}) }
      const headers = await requestHeaders()
      const url = selected ? `/api/admin/${resource}/${selected.id}` : `/api/admin/${resource}`
      const response = await fetch(url, { method: selected ? 'PATCH' : 'POST', headers, body: JSON.stringify(payload) })
      const result = await response.json() as ApiResult
      if (!response.ok || !result.item) throw new Error(result.error ?? 'The item could not be saved.')
      setRecords((current) => selected
        ? current.map((item) => item.id === result.item?.id ? result.item! : item)
        : [result.item!, ...current])
      setSelected(result.item)
      setForm(Object.fromEntries(fields.map((field) => [field.name, result.item?.[field.name] ?? defaultValue(field)])))
      setNotice({ kind: 'success', text: nextStatus === 'published' ? 'Published changes are now saved.' : 'Changes saved.' })
    } catch (cause) {
      setNotice({ kind: 'error', text: cause instanceof Error ? cause.message : 'The item could not be saved.' })
    } finally {
      setBusy(false)
    }
  }

  async function removeRecord(record: CmsRecord) {
    if (!window.confirm(`Delete “${String(record.title ?? record.id)}”? This cannot be undone.`)) return
    setBusy(true)
    setNotice(null)
    try {
      const headers = await requestHeaders()
      const response = await fetch(`/api/admin/${resource}/${record.id}`, { method: 'DELETE', headers })
      const result = await response.json() as ApiResult
      if (!response.ok) throw new Error(result.error ?? 'The item could not be deleted.')
      setRecords((current) => current.filter((item) => item.id !== record.id))
      if (selected?.id === record.id) startNew()
      setNotice({ kind: 'success', text: 'Item deleted.' })
    } catch (cause) {
      setNotice({ kind: 'error', text: cause instanceof Error ? cause.message : 'The item could not be deleted.' })
    } finally {
      setBusy(false)
    }
  }

  async function uploadImages(field: AdminField, files: FileList | null) {
    if (!files?.length) return
    setBusy(true)
    setNotice(null)
    try {
      const uploaded: { path: string; url: string }[] = []
      for (const file of Array.from(files)) {
        const body = new FormData()
        body.set('file', file)
        const token = await getAppCheckToken()
        const headers = new Headers()
        if (token) headers.set('X-Firebase-AppCheck', token)
        const response = await fetch('/api/admin/media', { method: 'POST', headers, body })
        const result = await response.json() as { uploads?: { path: string; url: string }[]; error?: string }
        if (!response.ok || !result.uploads?.[0]) throw new Error(result.error ?? 'Image upload failed.')
        uploaded.push(result.uploads[0])
      }
      if (field.type === 'images') {
        const current = Array.isArray(form[field.name]) ? form[field.name] as string[] : []
        setField(field.name, [...current, ...uploaded.map((item) => item.path)])
      } else {
        setField(field.name, uploaded[0].path)
      }
      setPreview((current) => ({ ...current, [field.name]: [...(current[field.name] ?? []), ...uploaded.map((item) => item.url)] }))
      setNotice({ kind: 'success', text: 'Image uploaded. Save the record to keep it.' })
    } catch (cause) {
      setNotice({ kind: 'error', text: cause instanceof Error ? cause.message : 'Image upload failed.' })
    } finally {
      setBusy(false)
    }
  }

  async function refresh() {
    setBusy(true)
    try {
      const response = await fetch(`/api/admin/${resource}`, { cache: 'no-store' })
      const result = await response.json() as ApiResult
      if (!response.ok || !result.items) throw new Error(result.error ?? 'Could not refresh records.')
      setRecords(result.items)
    } catch (cause) {
      setNotice({ kind: 'error', text: cause instanceof Error ? cause.message : 'Could not refresh records.' })
    } finally {
      setBusy(false)
    }
  }

  function renderField(field: AdminField) {
    const value = form[field.name]
    const fieldId = `field-${field.name}`
    const helpId = `${fieldId}-help`
    const className = 'mt-1 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20'

    if (field.type === 'toggle') {
      return (
        <label key={field.name} className="flex items-start gap-3 rounded-lg border border-border p-3">
          <input id={fieldId} type="checkbox" checked={Boolean(value)} onChange={(event) => setField(field.name, event.target.checked)} className="mt-1 size-4 accent-primary" />
          <span><span className="block text-sm font-semibold">{field.label}</span>{field.help && <span className="mt-1 block text-xs text-muted-foreground">{field.help}</span>}</span>
        </label>
      )
    }

    if (field.type === 'image' || field.type === 'images') {
      const paths = field.type === 'images' ? (Array.isArray(value) ? value as string[] : []) : (typeof value === 'string' && value ? [value] : [])
      const previews = preview[field.name] ?? []
      return (
        <div key={field.name}>
          <label htmlFor={fieldId} className="block text-sm font-semibold">{field.label}{field.required ? ' *' : ''}</label>
          {field.type === 'images' ? (
            <textarea id={fieldId} rows={3} value={displayValue(value)} onChange={(event) => setField(field.name, event.target.value.split('\n').map((path) => path.trim()).filter(Boolean))} placeholder="/images/project-one.jpg" aria-describedby={helpId} className={className} />
          ) : (
            <input id={fieldId} type="text" required={field.required} value={displayValue(value)} onChange={(event) => setField(field.name, event.target.value)} placeholder="/images/project.jpg" aria-describedby={helpId} className={className} />
          )}
          <p id={helpId} className="mt-1 text-xs text-muted-foreground">{field.help ?? 'Use an existing image path under /public. Uploading new images requires a Firebase Storage bucket.'}</p>
          <label htmlFor={`${fieldId}-upload`} className="mt-3 block text-sm font-medium">Upload {field.type === 'images' ? 'images' : 'an image'} (requires Firebase Storage)</label>
          <input id={`${fieldId}-upload`} type="file" accept="image/jpeg,image/png,image/webp,image/avif" multiple={field.type === 'images'} disabled={busy} onChange={(event) => { void uploadImages(field, event.currentTarget.files); event.currentTarget.value = '' }} className={`${className} file:mr-3 file:rounded-md file:border-0 file:bg-muted file:px-3 file:py-1.5 file:text-xs file:font-semibold`} />
          {paths.length > 0 && <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">{paths.map((path, index) => {
            const url = previews[index] ?? imageUrl(resource, selected, path)
            return <div key={`${path}-${index}`} className="relative overflow-hidden rounded-lg border border-border bg-muted">{url ? <Image src={url} alt={`${field.label} preview ${index + 1}`} width={480} height={360} unoptimized className="aspect-[4/3] w-full object-cover" /> : <p className="p-3 text-xs text-muted-foreground">Image available after this record is saved.</p>}<button type="button" onClick={() => setField(field.name, field.type === 'images' ? paths.filter((_, pathIndex) => pathIndex !== index) : '')} className="absolute right-2 top-2 rounded-md bg-background/90 px-2 py-1 text-xs font-semibold text-destructive">Remove</button></div>
          })}</div>}
        </div>
      )
    }

    if (field.type === 'textarea') {
      return <div key={field.name}><label htmlFor={fieldId} className="block text-sm font-semibold">{field.label}{field.required ? ' *' : ''}</label><textarea id={fieldId} required={field.required} rows={field.name === 'content' || field.name === 'description' ? 7 : 4} value={displayValue(value)} onChange={(event) => setField(field.name, event.target.value.split('\n').length > 1 && ['details', 'technologies'].includes(field.name) ? event.target.value.split('\n').filter(Boolean) : event.target.value)} aria-describedby={field.help ? helpId : undefined} className={className} />{field.help && <p id={helpId} className="mt-1 text-xs text-muted-foreground">{field.help}</p>}</div>
    }

    if (field.type === 'select') {
      return <div key={field.name}><label htmlFor={fieldId} className="block text-sm font-semibold">{field.label}{field.required ? ' *' : ''}</label><select id={fieldId} required={field.required} value={displayValue(value) || (field.name === 'status' ? 'draft' : '')} onChange={(event) => setField(field.name, event.target.value)} className={className}><option value="" disabled>Select an option</option>{field.options?.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></div>
    }

    return <div key={field.name}><label htmlFor={fieldId} className="block text-sm font-semibold">{field.label}{field.required ? ' *' : ''}</label><input id={fieldId} type={field.type} required={field.required} value={displayValue(value)} onChange={(event) => setField(field.name, field.type === 'number' ? Number(event.target.value) : event.target.value)} aria-describedby={field.help ? helpId : undefined} className={className} />{field.help && <p id={helpId} className="mt-1 text-xs text-muted-foreground">{field.help}</p>}</div>
  }

  return (
    <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(350px,0.85fr)]">
      <div className="rounded-2xl border border-border bg-background p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div><h1 className="text-2xl font-bold">{config.title}</h1><p className="mt-1 text-sm text-muted-foreground">{config.description}</p></div>
          <div className="flex gap-2"><button type="button" disabled={busy} onClick={() => void refresh()} className="rounded-lg border border-border px-3 py-2 text-sm font-semibold hover:bg-muted disabled:opacity-50">Refresh</button><button type="button" onClick={startNew} className="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">New item</button></div>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_180px]">
          <label className="text-sm font-medium">Search<input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search titles and content" className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm" /></label>
          {resource !== 'settings' && <label className="text-sm font-medium">Status<select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm"><option value="all">All statuses</option><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select></label>}
        </div>
        <div className="mt-5 space-y-2">
          {visibleRecords.length === 0 ? <div className="rounded-xl border border-dashed border-border p-8 text-center"><p className="font-semibold">No {config.title.toLocaleLowerCase()} yet</p><p className="mt-1 text-sm text-muted-foreground">Create the first item to get started. Draft items stay hidden from visitors.</p></div> : visibleRecords.map((record) => (
            <article key={record.id} className={`flex flex-col gap-3 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between ${selected?.id === record.id ? 'border-primary bg-primary/5' : 'border-border'}`}>
              <button type="button" onClick={() => startEdit(record)} className="min-w-0 text-left"><span className="block truncate font-semibold">{String(record.title ?? record.organizationName ?? record.id)}</span><span className="mt-1 block text-xs text-muted-foreground">{String(record.slug ?? record.email ?? record.id)}{record.status ? ` · ${String(record.status)}` : ''}</span></button>
              <div className="flex gap-2"><button type="button" onClick={() => startEdit(record)} className="rounded-md border border-border px-3 py-1.5 text-xs font-semibold hover:bg-muted">Edit</button>{resource !== 'settings' && <button type="button" onClick={() => void removeRecord(record)} disabled={busy} className="rounded-md border border-destructive/30 px-3 py-1.5 text-xs font-semibold text-destructive hover:bg-destructive/5 disabled:opacity-50">Delete</button>}</div>
            </article>
          ))}
        </div>
      </div>

      <div className="h-fit rounded-2xl border border-border bg-background p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4"><div><h2 className="text-lg font-bold">{selected ? 'Edit item' : resource === 'settings' ? 'Public website settings' : 'Create item'}</h2><p className="mt-1 text-xs text-muted-foreground">Changes save directly to Firestore.</p></div>{selected && <button type="button" onClick={startNew} className="text-sm font-semibold text-secondary hover:underline">New</button>}</div>
        {notice && <p role={notice.kind === 'error' ? 'alert' : 'status'} className={`mt-4 rounded-lg p-3 text-sm ${notice.kind === 'error' ? 'bg-destructive/10 text-destructive' : 'bg-secondary/10 text-foreground'}`}>{notice.text}</p>}
        <form className="mt-5 grid gap-4" onSubmit={(event) => { event.preventDefault(); void save() }}>
          {fields.map(renderField)}
          <div className="sticky bottom-0 flex flex-wrap gap-2 border-t border-border bg-background py-3">
            <button type="submit" disabled={busy} className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-50">{busy ? 'Saving…' : 'Save changes'}</button>
            {resource !== 'settings' && <>
              <button type="button" disabled={busy} onClick={() => void save('draft')} className="rounded-lg border border-border px-4 py-2.5 text-sm font-semibold disabled:opacity-50">Save draft</button>
              <button type="button" disabled={busy} onClick={() => void save('published')} className="rounded-lg bg-secondary px-4 py-2.5 text-sm font-semibold text-secondary-foreground disabled:opacity-50">Publish</button>
              {selected && <button type="button" disabled={busy} onClick={() => void save('archived')} className="rounded-lg border border-border px-4 py-2.5 text-sm font-semibold disabled:opacity-50">Archive</button>}
            </>}
          </div>
        </form>
      </div>
    </section>
  )
}
