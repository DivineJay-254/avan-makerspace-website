import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export function MarkdownContent({ markdown }: { markdown: string }) {
  return (
    <div className="mt-8 space-y-5 leading-8 text-muted-foreground [&_h1]:mt-8 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-foreground [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-foreground [&_li]:ml-5 [&_ol]:list-decimal [&_p]:whitespace-pre-wrap [&_table]:block [&_table]:max-w-full [&_table]:overflow-x-auto [&_ul]:list-disc">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => <a className="font-semibold text-primary underline underline-offset-4" href={href} target={href?.startsWith('http') ? '_blank' : undefined} rel={href?.startsWith('http') ? 'noreferrer noopener' : undefined}>{children}</a>,
          blockquote: ({ children }) => <blockquote className="border-l-2 border-primary/40 pl-4 italic">{children}</blockquote>,
          code: ({ children }) => <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground">{children}</code>,
          strong: ({ children }) => <strong className="font-bold text-foreground">{children}</strong>,
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  )
}
