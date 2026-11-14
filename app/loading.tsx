export default function Loading() {
  return (
    <main aria-busy="true" aria-label="Page loading" className="min-h-[70vh]">
      <div role="status" className="sr-only">Loading page content</div>
      <div aria-hidden="true" className="loading-progress h-1 w-full" />
      <div aria-hidden="true" className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
        <div className="loading-block h-7 w-28" />
        <div className="grid gap-8 py-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="flex flex-col gap-4">
            <div className="loading-block h-4 w-32" />
            <div className="loading-block h-12 w-full max-w-xl" />
            <div className="loading-block h-4 w-full max-w-lg" />
            <div className="loading-block h-4 w-4/5 max-w-md" />
            <div className="loading-block mt-3 h-12 w-40" />
          </div>
          <div className="loading-block aspect-[4/3] w-full" />
        </div>
      </div>
    </main>
  )
}
