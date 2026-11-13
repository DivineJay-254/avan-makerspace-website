import Link from 'next/link'
import { AdminLoginForm } from '@/components/admin/login-form'
import { isFirebaseServerConfigured } from '@/lib/firebase/admin'

export const metadata = { title: 'Administrator sign in | Avan Makerspace' }

export default function AdminLoginPage() {
  const configured = isFirebaseServerConfigured()
  return (
    <main className="flex min-h-screen items-center justify-center bg-primary/5 px-4 py-12">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-6 inline-flex text-sm font-semibold text-secondary hover:underline">← Back to Avan Makerspace</Link>
        {!configured && <div role="status" className="mb-4 rounded-xl border border-secondary/30 bg-secondary/10 p-4 text-sm"><p className="font-bold">Firebase is not configured yet</p><p className="mt-1 text-muted-foreground">The login form will work after the Firebase web settings, Admin service-account credentials, and Storage bucket are added to the project environment and redeployed.</p></div>}
        <AdminLoginForm />
      </div>
    </main>
  )
}
