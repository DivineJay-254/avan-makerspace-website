import Link from 'next/link'
import { AdminBootstrapForm } from '@/components/admin/bootstrap-form'
import { isFirebaseServerConfigured } from '@/lib/firebase/admin'

export const metadata = { title: 'Set up administrator | Avan Makerspace' }

export default function AdminSetupPage() {
  const configured = isFirebaseServerConfigured()
  return (
    <main className="flex min-h-screen items-center justify-center bg-primary/5 px-4 py-12">
      <div className="w-full max-w-xl">
        <Link href="/" className="mb-6 inline-flex text-sm font-semibold text-secondary hover:underline">← Back to Avan Makerspace</Link>
        {!configured && <div role="status" className="mb-4 rounded-xl border border-secondary/30 bg-secondary/10 p-4 text-sm"><p className="font-bold">Firebase setup is required</p><p className="mt-1 text-muted-foreground">Configure the Firebase project and the server environment variables in the Firebase setup guide before provisioning an administrator.</p></div>}
        <AdminBootstrapForm />
      </div>
    </main>
  )
}
