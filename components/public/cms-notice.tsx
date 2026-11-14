export function CmsNotice({ configured, children }: Readonly<{ configured: boolean; children: React.ReactNode }>) {
  if (!configured) {
    return (
      <div role="status" className="rounded-2xl border border-secondary/30 bg-secondary/5 p-6 text-sm">
        <p className="font-semibold text-foreground">This section is not connected to Firebase yet.</p>
        <p className="mt-1 text-muted-foreground">Published content will appear here after Firebase is configured and an administrator publishes it.</p>
      </div>
    )
  }
  return <>{children}</>
}
