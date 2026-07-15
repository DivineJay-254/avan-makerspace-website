'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function About() {
  const [imageIndex, setImageIndex] = useState(0);

  const aboutImages = [
    '/pekee-team-showcase.jpg',
    '/pekee-runway-training.jpg',
    '/pride-gala-runway.png',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % aboutImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Main About Section - Full Width Background with Content Overlay */}
      <section id="about" className="relative w-full min-h-screen lg:min-h-[600px] flex items-center overflow-hidden">
        {/* Background Images - Rotating */}
        <div className="absolute inset-0 z-0">
          {aboutImages.map((img, idx) => (
            <Image
              key={idx}
              src={img}
              alt="Avan community"
              fill
              className={`object-cover transition-opacity duration-1000 ${
                idx === imageIndex ? 'opacity-100' : 'opacity-0'
              }`}
              priority={idx === 0}
            />
          ))}
          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content - Positioned Absolutely */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full py-16 lg:py-24">
          <div className="max-w-2xl">
            {/* Tagline */}
            <p className="text-white/90 uppercase tracking-wider font-bold text-xs mb-4">
              About Us
            </p>

            {/* Main Heading */}
            <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Bridging Talent & <span className="text-secondary">Opportunity</span>
            </h2>

            {/* Description */}
            <p className="text-lg text-white/85 mb-8 leading-relaxed">
              Founded in Kakuma Refugee Camp, Avan Makerspace is a refugee-led and queer-led nonprofit innovation hub dedicated to empowering displaced youth. We believe talent exists everywhere—but opportunities do not. We create safe, inclusive, and accessible spaces where young people can learn, create, innovate, and build sustainable futures through creativity, technology, entrepreneurship, and community.
            </p>

            {/* Values Section */}
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-6 w-6 rounded-full bg-secondary text-white flex-shrink-0">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-white">Inclusive & Equitable</h3>
                  <p className="text-white/70 mt-1">Safe spaces welcoming everyone regardless of identity, background, or circumstance</p>
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
                  <h3 className="font-semibold text-white">Skills for Futures</h3>
                  <p className="text-white/70 mt-1">Hands-on training in creativity, technology, and entrepreneurship with mentorship pathways</p>
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
                  <h3 className="font-semibold text-white">Refugee-Led Leadership</h3>
                  <p className="text-white/70 mt-1">Community ownership and voice shape our programs and decisions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-secondary uppercase text-sm font-bold tracking-widest mb-3">Our Purpose</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">Mission & Vision</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-muted/50 rounded-xl p-8 border border-secondary/10">
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
              <p className="text-lg text-foreground/80 leading-relaxed">
                To empower refugees and host-community youth through technology, creativity, entrepreneurship, and practical learning—building pathways to dignity, resilience, and lasting community transformation.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-muted/50 rounded-xl p-8 border border-secondary/10">
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Vision</h3>
              <p className="text-lg text-foreground/80 leading-relaxed">
                A fully equipped makerspace where refugees and host-community youth can learn, create, innovate, and launch sustainable careers and enterprises—expanding access to education, fostering innovation, and empowering the next generation of leaders and changemakers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 sm:py-24 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-secondary uppercase text-sm font-bold tracking-widest mb-3">Our Foundation</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">Core Values</h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              These principles guide everything we do—from program design to partnership to how we treat each other.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Community Leadership */}
            <div className="bg-background rounded-lg p-6 border border-primary/20 hover:border-primary/40 transition">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl text-primary">👥</span>
              </div>
              <h4 className="font-bold text-foreground mb-2">Community Leadership</h4>
              <p className="text-sm text-foreground/70">
                Programs designed and led by the community they serve are more effective, trusted, and sustainable.
              </p>
            </div>

            {/* Inclusion */}
            <div className="bg-background rounded-lg p-6 border border-secondary/20 hover:border-secondary/40 transition">
              <div className="h-12 w-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl text-secondary">🌈</span>
              </div>
              <h4 className="font-bold text-foreground mb-2">Inclusion</h4>
              <p className="text-sm text-foreground/70">
                Safe, welcoming spaces for all young people—regardless of nationality, gender, sexual orientation, or ability.
              </p>
            </div>

            {/* Practical Learning */}
            <div className="bg-background rounded-lg p-6 border border-accent/20 hover:border-accent/40 transition">
              <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl text-accent">🔧</span>
              </div>
              <h4 className="font-bold text-foreground mb-2">Practical Learning</h4>
              <p className="text-sm text-foreground/70">
                Skills matter most when they translate into real opportunity, income, and employment pathways.
              </p>
            </div>

            {/* Transparency */}
            <div className="bg-background rounded-lg p-6 border border-primary/20 hover:border-primary/40 transition">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl text-primary">📊</span>
              </div>
              <h4 className="font-bold text-foreground mb-2">Transparency</h4>
              <p className="text-sm text-foreground/70">
                Honest reporting of achievements and challenges, responsible resource use, and clear communication.
              </p>
            </div>

            {/* Resilience */}
            <div className="bg-background rounded-lg p-6 border border-secondary/20 hover:border-secondary/40 transition">
              <div className="h-12 w-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl text-secondary">💪</span>
              </div>
              <h4 className="font-bold text-foreground mb-2">Resilience</h4>
              <p className="text-sm text-foreground/70">
                We've reached 200+ youth without external funding. We maximize every resource entrusted to us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-secondary uppercase text-sm font-bold tracking-widest mb-3">Our Team</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">Leadership</h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Avan Makerspace is led by a small, hands-on founding team drawn directly from the Kakuma community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Fardose Daud */}
            <div className="text-center">
              <div className="relative h-64 mb-6 rounded-xl overflow-hidden bg-muted">
                <Image
                  src="/fardose-daud.jpg"
                  alt="Fardose Daud"
                  fill
                  className="object-cover"
                />
              </div>
              <h4 className="text-2xl font-bold text-foreground mb-2">Fardose Daud</h4>
              <p className="text-secondary font-semibold mb-3">Founder & CEO</p>
              <p className="text-foreground/70">
                Refugee-led community innovator bringing lived experience and deep relationships to shape Avan's strategic direction and community partnerships.
              </p>
            </div>

            {/* Jonathan Divine */}
            <div className="text-center">
              <div className="relative h-64 mb-6 rounded-xl overflow-hidden bg-muted">
                <Image
                  src="/jonathan-divine-bw.jpg"
                  alt="Jonathan Divine"
                  fill
                  className="object-cover"
                />
              </div>
              <h4 className="text-2xl font-bold text-foreground mb-2">Jonathan Divine</h4>
              <p className="text-secondary font-semibold mb-3">Founder & Program Lead</p>
              <p className="text-foreground/70">
                Driving program delivery and creative excellence across our pillars, ensuring each initiative serves community needs and builds real skills.
              </p>
            </div>

            {/* Peter Kelvins */}
            <div className="text-center">
              <div className="relative h-64 mb-6 rounded-xl overflow-hidden bg-muted">
                <Image
                  src="/peter-kelvins.jpg"
                  alt="Peter Kelvins"
                  fill
                  className="object-cover"
                />
              </div>
              <h4 className="text-2xl font-bold text-foreground mb-2">Peter Kelvins</h4>
              <p className="text-secondary font-semibold mb-3">Co-founder</p>
              <p className="text-foreground/70">
                Building operational foundations and partnerships that enable Avan to deliver quality programming at scale while maintaining community values.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
