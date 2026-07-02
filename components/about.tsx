'use client';

import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="py-16 sm:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative h-96 sm:h-full min-h-96">
            <Image
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=600&fit=crop"
              alt="Makerspace workshop"
              fill
              className="object-cover rounded-lg"
            />
          </div>

          {/* Content */}
          <div>
            <p className="text-accent uppercase text-sm font-semibold tracking-wide mb-3">About Us</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 leading-tight">
              Empowering Makers & Creators
            </h2>

            <p className="text-lg text-muted mb-6 leading-relaxed">
              Avan Makerspace was founded on the belief that everyone should have access to creative tools and a supportive community. We provide a welcoming environment for makers of all skill levels to learn, build, and innovate.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-6 w-6 rounded-full bg-primary text-primary-foreground">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-foreground">Professional Equipment</h3>
                  <p className="text-muted mt-1">Access to industry-grade tools and machinery</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-6 w-6 rounded-full bg-primary text-primary-foreground">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-foreground">Expert Community</h3>
                  <p className="text-muted mt-1">Learn from experienced makers and mentors</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-6 w-6 rounded-full bg-primary text-primary-foreground">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-foreground">Collaborative Space</h3>
                  <p className="text-muted mt-1">Connect with like-minded creators and innovators</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
