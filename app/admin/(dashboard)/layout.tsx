import { redirect } from 'next/navigation'
import { AdminShell } from '@/components/admin/admin-shell'
import { getAdminSession } from '@/lib/firebase/auth'
import { isFirebaseServerConfigured } from '@/lib/firebase/admin'

export default async function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  if (!isFirebaseServerConfigured()) redirect('/admin/login?setup=missing')
  const user = await getAdminSession()
  if (!user) redirect('/admin/login')
  return <AdminShell user={user}>{children}</AdminShell>
}
