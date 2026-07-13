'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

const partnerships = [
  {
    id: 1,
    name: 'Program Funding',
    icon: '💰',
    description: 'Support workshops, boot camps, community events, and long-term educational programs',
    benefits: [
      'Fund program design & delivery',
      'Support community events',
      'Enable youth scholarships',
      'Impact transparency & reporting',
    ],
  },
  {
    id: 2,
    name: 'Equipment & Infrastructure',
    icon: '💻',
    description: 'Contribute laptops, robotics kits, sewing machines, art materials, music studio equipment, and more',
    benefits: [
      'Direct impact on program quality',
      'Tax-deductible donations',
      'Donor recognition',
      'Tangible results you can see',
    ],
    highlighted: true,
  },
  {
    id: 3,
    name: 'Technical Support & Mentorship',
    icon: '👥',
    description: 'Provide expertise through guest lectures, professional coaching, curriculum development, and business support',
    benefits: [
      'Industry mentorship',
      'Skill training delivery',
      'Career guidance',
      'Professional networking',
    ],
  },
  {
    id: 4,
    name: 'Volunteer Engagement',
    icon: '🤝',
    description: 'Contribute skills in training delivery, communications, graphic design, fundraising, event management, and creative arts',
    benefits: [
      'Direct volunteer opportunities',
      'Skills-based giving',
      'Community impact',
      'Flexible time commitments',
    ],
  },
  {
    id: 5,
    name: 'Research & Innovation',
    icon: '🔬',
    description: 'Collaborate with universities and research institutions to study and strengthen our refugee-led model',
    benefits: [
      'Co-authored publications',
      'Field research opportunities',
      'Evidence-building partnership',
      'Institutional support',
    ],
  },
  {
    id: 6,
    name: 'Sponsorships',
    icon: '🎯',
    description: 'Sponsor specific programs, events, or initiatives—from robotics bootcamps to fashion showcases to music studio development',
    benefits: [
      'Named sponsorship recognition',
      'Event visibility',
      'Brand alignment with youth impact',
      'Multi-year partnership options',
    ],
  },
];

export default function Membership() {
  const [hoveredPartnership, setHoveredPartnership] = useState<number | null>(null);

  return (
    <section id="support" className="py-16 sm:py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-secondary uppercase text-sm font-bold tracking-widest mb-3">How You Can Help</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Partnership Opportunities
          </h2>
          <p className="text-foreground/80 text-lg max-w-3xl mx-auto leading-relaxed">
            Join us in scaling Avan Makerspace. We&apos;re seeking financial support, infrastructure, partnerships, and mentorship to unlock youth potential in Kakuma.
          </p>
        </div>

        {/* Partnership Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {partnerships.map((partnership) => (
            <div
              key={partnership.id}
              onMouseEnter={() => setHoveredPartnership(partnership.id)}
              onMouseLeave={() => setHoveredPartnership(null)}
              className={`relative rounded-xl overflow-hidden transition-all duration-300 transform ${
                partnership.highlighted
                  ? 'md:scale-105 bg-primary text-primary-foreground shadow-2xl hover:shadow-3xl'
                  : 'bg-background border-2 border-border hover:border-secondary hover:shadow-xl'
              } ${hoveredPartnership === partnership.id && !partnership.highlighted ? '-translate-y-2' : ''}`}
            >
              {/* Highlight Badge */}
              {partnership.highlighted && (
                <div className="absolute top-0 right-0 bg-accent text-accent-foreground px-4 py-1 text-sm font-semibold rounded-bl-lg">
                  Critical Need
                </div>
              )}

              <div className="p-8">
                {/* Icon with animation */}
                <div className={`text-5xl mb-4 transition-transform duration-300 ${hoveredPartnership === partnership.id ? 'scale-110' : 'scale-100'}`}>
                  {partnership.icon}
                </div>

                {/* Name */}
                <h3 className={`text-2xl font-bold mb-3 ${!partnership.highlighted && 'text-foreground'}`}>
                  {partnership.name}
                </h3>
                <p className={`text-sm mb-6 leading-relaxed ${partnership.highlighted ? 'text-primary-foreground/90' : 'text-foreground/75'}`}>
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
        <div className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-xl p-12 sm:p-16 text-center mb-16 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          <h3 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Transform Lives?</h3>
          <p className="text-lg mb-8 max-w-3xl mx-auto leading-relaxed">
            Avan Makerspace has proven success with youth in Kakuma. Together, we can scale this initiative and unlock potential for hundreds more young people.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-3 rounded-lg transform hover:scale-105 transition-transform">
              Get in Touch
            </Button>
            <Button variant="outline" className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/20 font-semibold px-8 py-3 rounded-lg transform hover:scale-105 transition-transform">
              Download Proposal
            </Button>
          </div>
        </div>

        {/* Facility & Equipment Requirements */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Facility & Equipment Needs by Program</h3>
          <p className="text-center text-foreground/70 mb-12 max-w-2xl mx-auto">
            Here&apos;s what each program pillar needs to thrive. Some programs share space efficiently to maximize our physical footprint.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* AvanTech */}
            <div className="bg-background rounded-xl p-6 border border-border hover:border-primary/50 transition">
              <h4 className="font-bold text-foreground mb-3 text-lg">AvanTech: Tech Lab</h4>
              <div className="space-y-2 text-foreground/75 text-sm">
                <p><span className="font-semibold">Space:</span> Computer room (20x15 ft min)</p>
                <p><span className="font-semibold">Equipment:</span> Laptops, desktops, robotics kits, internet connectivity</p>
              </div>
            </div>

            {/* Miradede */}
            <div className="bg-background rounded-xl p-6 border border-border hover:border-secondary/50 transition">
              <h4 className="font-bold text-foreground mb-3 text-lg">Miradede: Design & Tailoring</h4>
              <div className="space-y-2 text-foreground/75 text-sm">
                <p><span className="font-semibold">Space:</span> Workshop (25x20 ft min)</p>
                <p><span className="font-semibold">Equipment:</span> Sewing machines, cutting tables, fabric storage, mirrors</p>
              </div>
            </div>

            {/* Pekee Models & Dance */}
            <div className="bg-background rounded-xl p-6 border-2 border-accent/50 rounded-lg shadow-md">
              <h4 className="font-bold text-foreground mb-3 text-lg">Pekee Models & Dance: Shared Studio</h4>
              <div className="space-y-2 text-foreground/75 text-sm">
                <p><span className="font-semibold">Space:</span> Runway & rehearsal studio (30x25 ft min)</p>
                <p><span className="font-semibold">Equipment:</span> Open floor, mirrors, sound system, stage lighting</p>
                <p className="text-accent font-semibold mt-2">Note: These programs share space efficiently</p>
              </div>
            </div>

            {/* I Am Art */}
            <div className="bg-background rounded-xl p-6 border border-border hover:border-accent/50 transition">
              <h4 className="font-bold text-foreground mb-3 text-lg">I Am Art: Studio</h4>
              <div className="space-y-2 text-foreground/75 text-sm">
                <p><span className="font-semibold">Space:</span> Art & writing studio (20x15 ft min)</p>
                <p><span className="font-semibold">Equipment:</span> Easels, art materials, display wall, gallery space</p>
              </div>
            </div>

            {/* Music Studio */}
            <div className="bg-background rounded-xl p-6 border border-border hover:border-secondary/50 transition">
              <h4 className="font-bold text-foreground mb-3 text-lg">Music Studio: Recording Studio</h4>
              <div className="space-y-2 text-foreground/75 text-sm">
                <p><span className="font-semibold">Space:</span> Soundproof studio (15x12 ft min)</p>
                <p><span className="font-semibold">Equipment:</span> Audio interface, monitors, mics, soundproofing, software</p>
              </div>
            </div>

            {/* Storytelling & Podcast */}
            <div className="bg-background rounded-xl p-6 border-2 border-accent/50 shadow-md">
              <h4 className="font-bold text-foreground mb-3 text-lg">Storytelling & Podcast: Podcast Room</h4>
              <div className="space-y-2 text-foreground/75 text-sm">
                <p><span className="font-semibold">Space:</span> Soundproof booth (12x10 ft min)</p>
                <p><span className="font-semibold">Equipment:</span> Mics, mixer, recording software, soundproofing</p>
                <p className="text-accent font-semibold mt-2">Note: Can share soundproof suite with Music Studio</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
            Frequently Asked Questions
          </h3>
          <div className="space-y-6">
            <details className="group rounded-lg border border-border p-6 hover:bg-muted/30 transition-colors cursor-pointer bg-background">
              <summary className="flex items-center justify-between font-semibold text-foreground">
                <span>How is Avan Makerspace currently operating?</span>
                <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </summary>
              <p className="text-foreground/75 mt-4 leading-relaxed">
                We have successfully piloted multiple programs (Fashion, Visual Arts, AvanTech Robotics) with over 115 youth trained. We&apos;re now seeking support to establish a permanent, fully operational creative hub.
              </p>
            </details>

            <details className="group rounded-lg border border-border p-6 hover:bg-muted/30 transition-colors cursor-pointer bg-background">
              <summary className="flex items-center justify-between font-semibold text-foreground">
                <span>Who benefits from Avan Makerspace?</span>
                <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </summary>
              <p className="text-foreground/75 mt-4 leading-relaxed">
                Primarily youth aged 12-25 in Kakuma Refugee Camp who lack access to creative opportunities. The programs focus on those facing vulnerability, isolation, and limited pathways to self-reliance and income generation.
              </p>
            </details>

            <details className="group rounded-lg border border-border p-6 hover:bg-muted/30 transition-colors cursor-pointer bg-background">
              <summary className="flex items-center justify-between font-semibold text-foreground">
                <span>What is your sustainability plan?</span>
                <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </summary>
              <p className="text-foreground/75 mt-4 leading-relaxed">
                Partnerships, creative services, biannual showcase events, and building a strong network of creatives. We&apos;re also developing pathways for youth to generate income through freelancing and creative services.
              </p>
            </details>

            <details className="group rounded-lg border border-border p-6 hover:bg-muted/30 transition-colors cursor-pointer bg-background">
              <summary className="flex items-center justify-between font-semibold text-foreground">
                <span>How can I stay updated on Avan&apos;s progress?</span>
                <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </summary>
              <p className="text-foreground/75 mt-4 leading-relaxed">
                Sign up for our newsletter to receive monthly impact reports, program updates, and partnership opportunities. We provide transparent documentation of our progress and youth outcomes.
              </p>
            </details>
          </div>
        </div>
      </div>
    </section>
  );
}
