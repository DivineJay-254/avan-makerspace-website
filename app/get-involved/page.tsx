import Header from '@/components/header';
import GetInvolved from '@/components/get-involved';
import Footer from '@/components/footer';
import { ContactForm } from '@/components/public/contact-form';

export const metadata = {
  title: 'Get Involved - Support Avan Makerspace | Avan Makerspace',
  description: 'Multiple ways to support Avan Makerspace: donate, volunteer, partner, mentor, or collaborate on research to empower youth in Kakuma Refugee Camp.',
};

export default function GetInvolvedPage() {
  return (
    <div className="w-full">
      <Header />
      <main>
        <GetInvolved />
        <section id="contact-form" className="bg-muted/20 py-14 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
            <div><p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary">Get in touch</p><h1 className="mt-3 text-3xl font-bold sm:text-4xl">Start a conversation</h1><p className="mt-4 leading-relaxed text-muted-foreground">Send a question or partnership enquiry. Messages are reviewed by the Avan Makerspace team.</p></div>
            <div className="rounded-2xl border border-border bg-background p-6 sm:p-8"><ContactForm /></div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
