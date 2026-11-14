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
        {!configured ? (
          <div role="status" className="mb-4 rounded-xl border border-secondary/30 bg-secondary/10 p-4 text-sm">
            <p className="font-bold">Firebase Admin credentials are still needed</p>
            <p className="mt-1 text-muted-foreground">The web app config is set. Admin sign-in needs the server-only service-account credentials and rate-limit secret; production also requires App Check. A Storage bucket is optional.</p>
            <Link href="/admin/setup" className="mt-3 inline-flex font-semibold text-secondary hover:underline">Open secure setup</Link>
          </div>
        ) : (
          <AdminLoginForm />
        )}
      </div>
    </main>
  )
}
