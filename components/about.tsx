'use client';

import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="py-16 sm:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:order-2">
          {/* Image */}
          <div className="relative h-96 sm:h-full min-h-96 order-2 lg:order-1">
            <Image
              src="/avan-community.png"
              alt="Avan Makerspace community"
              fill
              className="object-cover rounded-xl shadow-lg"
            />
            <div className="absolute inset-0 rounded-xl border-2 border-secondary/20" />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <p className="text-secondary uppercase text-sm font-bold tracking-widest mb-3">Our Mission</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 leading-tight">
              Unlocking Youth <span className="text-secondary">Potential</span>
            </h2>

            <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
              In Kakuma Refugee Camp, thousands of young people have untapped talent and creativity—but lack safe spaces and opportunities to develop them. Avan Makerspace transforms creativity into a pathway for healing, expression, confidence, and economic opportunity.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-6 w-6 rounded-full bg-secondary text-white flex-shrink-0">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-foreground">Safe Creative Space</h3>
                  <p className="text-foreground/70 mt-1">A welcoming environment where youth feel seen, heard, and valued</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-6 w-6 rounded-full bg-accent text-white flex-shrink-0">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-foreground">Skills & Mentorship</h3>
                  <p className="text-foreground/70 mt-1">Structured training leading to income-generating opportunities</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-6 w-6 rounded-full bg-primary text-white flex-shrink-0">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-foreground">Community & Belonging</h3>
                  <p className="text-foreground/70 mt-1">Strengthen social cohesion and reduce vulnerability to risk</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
