import type { Metadata } from 'next'
import Header from '@/components/header'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Terms of Service | Avan Makerspace',
  description: 'Terms for using the Avan Makerspace website and participating in its online services.',
}

type LegalSection = { title: string; paragraphs: string[]; items?: string[] }

const sections: LegalSection[] = [
  {
    title: '1. Acceptance of Terms',
    paragraphs: ['By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.'],
  },
  {
    title: '2. Use License',
    paragraphs: ["Permission is granted to temporarily download one copy of the materials (information or software) on Avan Makerspace's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:"],
    items: [
      'Modifying or copying the materials',
      'Using the materials for any commercial purpose or for any public display',
      'Attempting to decompile or reverse engineer any software contained on the website',
      'Removing any copyright or other proprietary notations from the materials',
      'Transferring the materials to another person or "mirroring" the materials on any other server',
    ],
  },
  {
    title: '3. Disclaimer',
    paragraphs: [
      "The materials on Avan Makerspace's website are provided \"as is\". Avan Makerspace makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.",
    ],
  },
  {
    title: '4. Limitations',
    paragraphs: [
      'In no event shall Avan Makerspace or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the Avan Makerspace website.',
    ],
  },
  {
    title: '5. Accuracy of Materials',
    paragraphs: [
      "The materials appearing on Avan Makerspace's website could include technical, typographical, or photographic errors. Avan Makerspace does not warrant that any of the materials on the website are accurate, complete, or current. Avan Makerspace may make changes to the materials contained on the website at any time without notice.",
    ],
  },
  {
    title: '6. Links',
    paragraphs: [
      "Avan Makerspace has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Avan Makerspace of the site. Use of any such linked website is at the user's own risk.",
    ],
  },
  {
    title: '7. Modifications',
    paragraphs: [
      'Avan Makerspace may revise these terms of service at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.',
    ],
  },
  {
    title: '8. Governing Law',
    paragraphs: [
      'These terms and conditions are governed by and construed in accordance with the laws of Kenya, and you irrevocably submit to the exclusive jurisdiction of the courts located in that state or location.',
    ],
  },
  {
    title: '9. Code of Conduct',
    paragraphs: [
      'All users of Avan Makerspace programs and website commit to upholding our values of inclusion, respect, and community. We do not tolerate discrimination, harassment, or abuse based on any identity or characteristic. Violations may result in removal from programs or website access.',
    ],
  },
  {
    title: '10. Contact Information',
    paragraphs: ['If you have any questions about these Terms of Service, please contact us at info@avanmakerspace.org.'],
  },
]

export default function TermsOfServicePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-muted/40 px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary">Avan Makerspace</p>
            <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Terms of Service</h1>
            <p className="mt-4 text-sm text-muted-foreground">Last reviewed: January 2026</p>
          </div>
        </section>
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-12 sm:px-6 sm:py-16">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-2xl font-bold">{section.title}</h2>
              <div className="mt-3 flex flex-col gap-3 leading-relaxed text-muted-foreground">
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.items ? <ul className="list-disc space-y-2 pl-6">{section.items.map((item) => <li key={item}>{item}</li>)}</ul> : null}
              </div>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
