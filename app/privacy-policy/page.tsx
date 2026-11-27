import type { Metadata } from 'next'
import Header from '@/components/header'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Privacy Policy | Avan Makerspace',
  description: 'How Avan Makerspace collects, uses, and protects information shared through this website.',
}

type LegalSection = { title: string; paragraphs: string[]; items?: string[] }

const sections: LegalSection[] = [
  {
    title: 'Introduction',
    paragraphs: [
      'Avan Makerspace ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and interact with our services.',
    ],
  },
  {
    title: 'Information We Collect',
    paragraphs: ['We may collect information about you in a variety of ways. The information we may collect on the site includes:'],
    items: [
      'Personal Information: Name, email address, phone number, and other contact details you voluntarily provide through forms.',
      "Program Information: Information about programs you're interested in or enrolled in.",
      'Usage Information: Information about how you interact with our website, including pages visited and time spent.',
      'Technical Information: IP address, browser type, device type, and operating system.',
    ],
  },
  {
    title: 'How We Use Your Information',
    paragraphs: ['We use the information we collect to:'],
    items: [
      'Provide and improve our programs and services',
      'Process volunteer and mentor applications',
      'Send program updates and communications',
      'Respond to your inquiries and requests',
      'Protect against fraudulent activity and security threats',
      'Comply with legal obligations',
    ],
  },
  {
    title: 'Data Security',
    paragraphs: [
      'We take the protection of your personal information seriously. We implement appropriate technical and organizational measures to protect your data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.',
    ],
  },
  {
    title: 'Sharing Your Information',
    paragraphs: [
      'We do not sell, trade, or rent your personal information to third parties. We may share information with trusted partners who assist us in operating our website and providing services, provided they agree to keep such information confidential.',
    ],
  },
  {
    title: 'Your Rights',
    paragraphs: ['You have the right to:'],
    items: [
      'Access the personal information we hold about you',
      'Request correction of inaccurate information',
      'Request deletion of your information',
      'Opt-out of marketing communications',
    ],
  },
  {
    title: 'Contact Us',
    paragraphs: ['If you have questions about this Privacy Policy or our privacy practices, please contact us at info@avanmakerspace.org.'],
  },
  {
    title: 'Changes to This Policy',
    paragraphs: [
      'We may update this Privacy Policy from time to time. We will notify you of any changes by updating the "Last Updated" date at the top of this page.',
    ],
  },
]

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-muted/40 px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary">Avan Makerspace</p>
            <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Privacy Policy</h1>
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
