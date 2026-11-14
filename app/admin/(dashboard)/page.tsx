import Link from 'next/link'
import { getAdminOverview } from '@/lib/firebase/admin-data'

export const metadata = { title: 'Dashboard | Avan Makerspace' }

export default async function AdminOverviewPage() {
  const overview = await getAdminOverview()
  const metrics = [
    { label: 'Published events', value: overview.publishedEvents, href: '/admin/events' },
    { label: 'Programs', value: overview.programs, href: '/admin/programs' },
    { label: 'AvanTech projects', value: overview.projects, href: '/admin/projects' },
    { label: 'Registrations', value: overview.registrations, href: '/admin/registrations' },
    { label: 'Unread messages', value: overview.unreadMessages, href: '/admin/messages' },
  ]

  return (
    <div className="grid gap-6">
      <header><p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">Overview</p><h1 className="mt-1 text-3xl font-bold">Welcome to the CMS</h1><p className="mt-2 text-sm text-muted-foreground">Manage published content and review visitor submissions.</p></header>
      <section aria-label="Content summary" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">{metrics.map((metric) => <Link key={metric.label} href={metric.href} className="rounded-2xl border border-border bg-background p-5 transition hover:border-primary/50 hover:shadow-sm"><p className="text-sm text-muted-foreground">{metric.label}</p><p className="mt-2 text-3xl font-bold">{metric.value}</p></Link>)}</section>
      <section className="rounded-2xl border border-border bg-background p-5 sm:p-6"><div className="flex items-center justify-between gap-4"><div><h2 className="text-lg font-bold">Recent content updates</h2><p className="mt-1 text-sm text-muted-foreground">Latest changes saved by the administrator.</p></div><Link href="/admin/posts" className="text-sm font-semibold text-secondary hover:underline">Manage news</Link></div><div className="mt-4 divide-y divide-border">{overview.recentUpdates.length === 0 ? <p className="py-6 text-sm text-muted-foreground">No content records yet. Create an event, program, project, or news post to get started.</p> : overview.recentUpdates.map((item) => <div key={`${item.id}-${String(item.title)}`} className="flex flex-wrap items-center justify-between gap-3 py-3"><span className="font-semibold">{String(item.title ?? item.slug ?? item.id)}</span><span className="text-xs text-muted-foreground">{String(item.status ?? 'updated')} · {String(item.updatedAt ?? 'Recently')}</span></div>)}</div></section>
    </div>
  )
}
