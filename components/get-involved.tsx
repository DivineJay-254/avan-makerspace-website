'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function GetInvolved() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-background to-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-secondary uppercase text-sm font-bold tracking-widest mb-4">Take Action</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Get <span className="text-secondary">Involved</span>
            </h1>
            <p className="text-xl text-foreground/70">
              There are many ways to support Avan Makerspace and help unlock possibility for young people in Kakuma. Choose what works best for you.
            </p>
          </div>
        </div>
      </section>

      {/* Ways to Get Involved */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Donate */}
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-8 border border-primary/20 hover:border-primary/40 transition">
              <div className="text-5xl mb-4">💝</div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Donate</h3>
              <p className="text-foreground/70 mb-6">
                Financial contributions fund program expansion, equipment purchases, and youth scholarships. Every gift directly strengthens opportunity for young people in Kakuma.
              </p>
              <ul className="space-y-2 text-foreground/75 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-1">✓</span>
                  <span>Tax-deductible donations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-1">✓</span>
                  <span>Monthly giving options</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-1">✓</span>
                  <span>Corporate giving programs</span>
                </li>
              </ul>
              <Button className="w-full bg-primary hover:bg-primary/90">Donate Now</Button>
            </div>

            {/* Volunteer */}
            <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-xl p-8 border border-secondary/20 hover:border-secondary/40 transition">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Volunteer</h3>
              <p className="text-foreground/70 mb-6">
                Contribute your skills—whether teaching, mentoring, design, communications, or event management. Your expertise makes programs possible and youth dreams real.
              </p>
              <ul className="space-y-2 text-foreground/75 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold mt-1">✓</span>
                  <span>Flexible time commitments</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold mt-1">✓</span>
                  <span>Virtual or in-person options</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold mt-1">✓</span>
                  <span>Skills-based opportunities</span>
                </li>
              </ul>
              <Button className="w-full bg-secondary hover:bg-secondary/90">Learn About Roles</Button>
            </div>

            {/* Partner */}
            <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl p-8 border border-accent/20 hover:border-accent/40 transition">
              <div className="text-5xl mb-4">🏢</div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Partner with Us</h3>
              <p className="text-foreground/70 mb-6">
                Bring infrastructure, equipment, expertise, or a sustained commitment to co-creating opportunity. We welcome partners who share our vision for youth transformation.
              </p>
              <ul className="space-y-2 text-foreground/75 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold mt-1">✓</span>
                  <span>Equipment or space donations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold mt-1">✓</span>
                  <span>Multi-year partnerships</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold mt-1">✓</span>
                  <span>Co-designed programs</span>
                </li>
              </ul>
              <Button className="w-full bg-accent hover:bg-accent/90">Explore Partnerships</Button>
            </div>

            {/* Sponsor */}
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-8 border border-primary/20 hover:border-primary/40 transition">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Sponsor an Event</h3>
              <p className="text-foreground/70 mb-6">
                Sponsor a specific program, showcase, bootcamp, or initiative. Your investment in a program creates direct, visible impact youth can celebrate.
              </p>
              <ul className="space-y-2 text-foreground/75 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-1">✓</span>
                  <span>Named sponsorship recognition</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-1">✓</span>
                  <span>Event visibility & branding</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-1">✓</span>
                  <span>One-time or multi-year options</span>
                </li>
              </ul>
              <Button className="w-full bg-primary hover:bg-primary/90">Explore Sponsorships</Button>
            </div>

            {/* Mentor */}
            <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-xl p-8 border border-secondary/20 hover:border-secondary/40 transition">
              <div className="text-5xl mb-4">👥</div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Mentor Youth</h3>
              <p className="text-foreground/70 mb-6">
                Be a guide, advisor, and role model. Whether in tech, fashion, entrepreneurship, or the arts, your mentorship helps young people see their potential and claim it.
              </p>
              <ul className="space-y-2 text-foreground/75 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold mt-1">✓</span>
                  <span>One-on-one or group mentorship</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold mt-1">✓</span>
                  <span>Career guidance & networking</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold mt-1">✓</span>
                  <span>Industry expertise shared</span>
                </li>
              </ul>
              <Button className="w-full bg-secondary hover:bg-secondary/90">Become a Mentor</Button>
            </div>

            {/* Research */}
            <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl p-8 border border-accent/20 hover:border-accent/40 transition">
              <div className="text-5xl mb-4">🔬</div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Research & Study</h3>
              <p className="text-foreground/70 mb-6">
                Join us in strengthening evidence about community-led youth development, refugee inclusion, and creative industries in displacement settings.
              </p>
              <ul className="space-y-2 text-foreground/75 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold mt-1">✓</span>
                  <span>Academic partnerships</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold mt-1">✓</span>
                  <span>Co-authored publications</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold mt-1">✓</span>
                  <span>Field research support</span>
                </li>
              </ul>
              <Button className="w-full bg-accent hover:bg-accent/90">Collaborate on Research</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Hope to Work With */}
      <section className="py-16 sm:py-24 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">Who We Hope to Work With</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              We're seeking partners who share our commitment to refugee empowerment, youth development, and community-led social change.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <span className="text-3xl flex-shrink-0">🌍</span>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Impact Organizations & Nonprofits</h3>
                <p className="text-foreground/70">That work in refugee settings, youth development, or creative industries</p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="text-3xl flex-shrink-0">🏢</span>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Corporate Partners</h3>
                <p className="text-foreground/70">Looking for authentic social impact aligned with your brand values</p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="text-3xl flex-shrink-0">🎓</span>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Universities & Research Institutions</h3>
                <p className="text-foreground/70">Interested in refugee-led models, youth development, or creative innovation</p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="text-3xl flex-shrink-0">💡</span>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Foundations & Donors</h3>
                <p className="text-foreground/70">Committed to long-term, community-rooted youth empowerment</p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="text-3xl flex-shrink-0">🛠️</span>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Tech Companies & Equipment Providers</h3>
                <p className="text-foreground/70">With equipment, expertise, or platforms to share</p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="text-3xl flex-shrink-0">👥</span>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Individual Advocates</h3>
                <p className="text-foreground/70">Passionate about refugee youth and willing to support or amplify our work</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Get in Touch</h2>
            <p className="text-lg text-foreground/70">
              Ready to get involved? Have questions? We'd love to hear from you and explore how we can work together.
            </p>
          </div>

          <div className="bg-muted/50 rounded-xl p-12 border border-border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="text-3xl mb-3">📧</div>
                <p className="text-foreground/70 mb-2">Email</p>
                <Link href="mailto:hello@avanmakerspace.org" className="font-semibold text-primary hover:text-primary/80 transition">
                  hello@avanmakerspace.org
                </Link>
              </div>

              <div className="text-center border-l border-r border-border">
                <div className="text-3xl mb-3">📱</div>
                <p className="text-foreground/70 mb-2">Phone</p>
                <Link href="tel:+254700000000" className="font-semibold text-primary hover:text-primary/80 transition">
                  +254 700 000 000
                </Link>
              </div>

              <div className="text-center">
                <div className="text-3xl mb-3">📍</div>
                <p className="text-foreground/70 mb-2">Location</p>
                <p className="font-semibold text-foreground">Kakuma Refugee Camp, Turkana County, Kenya</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3">
                Send us an Email
              </Button>
              <Button variant="outline" className="border-2 border-primary text-primary hover:bg-primary/10 font-semibold px-8 py-3">
                Download Our Profile
              </Button>
            </div>
          </div>

          <div className="mt-12 bg-secondary/10 rounded-xl p-8 border border-secondary/20">
            <p className="text-foreground/75 leading-relaxed text-center italic">
              &quot;We&apos;re not looking for saviors. We&apos;re looking for partners—people and organizations willing to listen, learn, and invest in refugee-led solutions. Together, we can transform possibility into reality.&quot;
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
