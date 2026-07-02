'use client';

import { Button } from '@/components/ui/button';

const partnerships = [
  {
    id: 1,
    name: 'Financial Support',
    icon: '💰',
    description: 'Fund program expansion, events, and material acquisition',
    benefits: [
      'Tax-deductible contributions',
      'Impact reporting',
      'Recognition on website',
      'Annual donor recognition event',
    ],
  },
  {
    id: 2,
    name: 'Space & Infrastructure',
    icon: '🏢',
    description: 'Provide safe, consistent locations for activities',
    benefits: [
      'Secure dedicated space',
      'Regular program access',
      'Youth-centered facilities',
      'Community hub impact',
    ],
    highlighted: true,
  },
  {
    id: 3,
    name: 'Mentorship & Skills',
    icon: '👥',
    description: 'Share expertise and guide youth development',
    benefits: [
      'Industry mentorship',
      'Skill training delivery',
      'Career guidance',
      'Professional networking',
    ],
  },
];

export default function Membership() {
  return (
    <section id="support" className="py-16 sm:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-accent uppercase text-sm font-semibold tracking-wide mb-2">How You Can Help</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Partnership Opportunities
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Join us in scaling Avan Makerspace. We&apos;re seeking financial support, infrastructure, partnerships, and mentorship to unlock youth potential in Kakuma.
          </p>
        </div>

        {/* Partnership Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {partnerships.map((partnership) => (
            <div
              key={partnership.id}
              className={`relative rounded-lg overflow-hidden transition-all duration-300 ${
                partnership.highlighted
                  ? 'md:scale-105 bg-primary text-primary-foreground shadow-2xl'
                  : 'bg-background border border-border hover:shadow-lg'
              }`}
            >
              {/* Highlight Badge */}
              {partnership.highlighted && (
                <div className="absolute top-0 right-0 bg-accent text-accent-foreground px-4 py-1 text-sm font-semibold rounded-bl-lg">
                  Critical Need
                </div>
              )}

              <div className="p-8">
                {/* Icon */}
                <div className="text-5xl mb-4">{partnership.icon}</div>

                {/* Name */}
                <h3 className={`text-2xl font-bold mb-2 ${!partnership.highlighted && 'text-foreground'}`}>
                  {partnership.name}
                </h3>
                <p className={`text-sm mb-6 ${partnership.highlighted ? 'text-primary-foreground/80' : 'text-muted'}`}>
                  {partnership.description}
                </p>

                {/* Benefits */}
                <ul className="space-y-3 mb-8">
                  {partnership.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg
                        className={`w-5 h-5 mr-3 flex-shrink-0 mt-0.5 ${
                          partnership.highlighted ? 'text-accent' : 'text-primary'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className={`text-sm ${partnership.highlighted ? 'text-primary-foreground' : 'text-foreground'}`}>
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  className={`w-full ${
                    partnership.highlighted
                      ? 'bg-accent hover:bg-accent/90 text-accent-foreground'
                      : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                  }`}
                >
                  Learn More
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-primary text-primary-foreground rounded-lg p-12 text-center mb-16">
          <h3 className="text-3xl font-bold mb-4">Ready to Transform Lives?</h3>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Avan Makerspace has proven success with youth in Kakuma. Together, we can scale this initiative and unlock potential for hundreds more young people.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Get in Touch
            </Button>
            <Button variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
              Download Proposal
            </Button>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
            Frequently Asked Questions
          </h3>
          <div className="space-y-6">
            <details className="group rounded-lg border border-border p-6 hover:bg-muted/50 transition-colors cursor-pointer">
              <summary className="flex items-center justify-between font-semibold text-foreground">
                <span>How is Avan Makerspace currently operating?</span>
                <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </summary>
              <p className="text-muted mt-4">
                We have successfully piloted multiple programs (Fashion, Visual Arts, AvanTech Robotics) with over 115 youth trained. We&apos;re now seeking support to establish a permanent, fully operational creative hub.
              </p>
            </details>

            <details className="group rounded-lg border border-border p-6 hover:bg-muted/50 transition-colors cursor-pointer">
              <summary className="flex items-center justify-between font-semibold text-foreground">
                <span>Who benefits from Avan Makerspace?</span>
                <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </summary>
              <p className="text-muted mt-4">
                Primarily youth aged 12-25 in Kakuma Refugee Camp who lack access to creative opportunities. The programs focus on those facing vulnerability, isolation, and limited pathways to self-reliance and income generation.
              </p>
            </details>

            <details className="group rounded-lg border border-border p-6 hover:bg-muted/50 transition-colors cursor-pointer">
              <summary className="flex items-center justify-between font-semibold text-foreground">
                <span>What is your sustainability plan?</span>
                <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </summary>
              <p className="text-muted mt-4">
                Partnerships, creative services, biannual showcase events, and building a strong network of creatives. We&apos;re also developing pathways for youth to generate income through freelancing and creative services.
              </p>
            </details>

            <details className="group rounded-lg border border-border p-6 hover:bg-muted/50 transition-colors cursor-pointer">
              <summary className="flex items-center justify-between font-semibold text-foreground">
                <span>How can I stay updated on Avan&apos;s progress?</span>
                <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </summary>
              <p className="text-muted mt-4">
                Sign up for our newsletter to receive monthly impact reports, program updates, and partnership opportunities. We provide transparent documentation of our progress and youth outcomes.
              </p>
            </details>
          </div>
        </div>
      </div>
    </section>
  );
}
