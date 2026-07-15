'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Hero() {
  const [imageIndex, setImageIndex] = useState(0);
  const [avanTechImageIndex, setAvanTechImageIndex] = useState(0);
  const [prideGalaImageIndex, setPrideGalaImageIndex] = useState(0);

  const heroImages = [
    '/pekee-team-showcase.jpg',
    '/pekee-runway-training.jpg',
    '/pride-gala-runway.png',
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avan3-Jwap2S2QBj8r6eDH8X0wnSc1APVE8y.png',
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avan8-4eVFgwBHUNnX3ZlghjMtRK4E2GTEK7.png',
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avan2-CYqp8YlkxLFQwk3V3ZREkKqLiW19CX.png',
  ];

  const avanTechImages = [
    '/robotics-bootcamp-1.jpg',
    '/robotics-bootcamp-2.jpg',
    '/robotics-bootcamp-3.jpg',
  ];

  const prideGalaImages = [
    '/pride-gala-group.jpg',
    '/pride-gala-celebration.jpg',
    '/pride-gala-speaker.jpg',
    '/pride-gala-moment.jpg',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setAvanTechImageIndex((prev) => (prev + 1) % avanTechImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrideGalaImageIndex((prev) => (prev + 1) % prideGalaImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full">
      {/* Hero Section - Full Width Background with Content Overlay */}
      <div className="relative w-full min-h-screen lg:min-h-[600px] flex items-center overflow-hidden">
        {/* Background Images - Rotating */}
        <div className="absolute inset-0 z-0">
          {heroImages.map((img, idx) => (
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
              Avan Makerspace
            </p>

            {/* Main Heading */}
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Empowering Youth Through Innovation & Creativity
            </h1>

            {/* Description */}
            <p className="text-lg text-white/85 mb-8 leading-relaxed">
              Avan is a queer-led, refugee-led nonprofit in Kakuma Refugee Camp that creates safe, inclusive spaces where displaced youth discover talents, develop digital and creative skills, and build sustainable futures through innovation, entrepreneurship, and community.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href="/programs"
                className="inline-flex items-center justify-center px-8 py-3 bg-secondary text-white font-semibold rounded-full hover:bg-secondary/90 transition"
              >
                Explore Programs
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Programs Section - Robotics/AvanTech */}
      <div className="bg-white py-16 lg:py-24 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-12">
            <p className="text-secondary uppercase tracking-wider font-bold text-xs mb-4">
              Our Programs
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              AvanTech: Digital Innovation & Robotics
            </h2>
            <p className="text-lg text-foreground/70 mb-8 max-w-2xl">
              Comprehensive STEM education empowering youth to become digital innovators. From robotics and coding to AI and cybersecurity, AvanTech builds foundational and advanced technical skills with real-world applications.
            </p>
            <Link href="/programs/avantech" className="inline-flex items-center text-secondary font-semibold hover:gap-2 transition-all gap-1">
              Explore AvanTech
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Robotics Image - Rotating */}
          <div className="relative h-80 md:h-96 rounded-xl overflow-hidden shadow-lg">
            {avanTechImages.map((img, idx) => (
              <Image
                key={idx}
                src={img}
                alt="AvanTech innovation and robotics training"
                fill
                className={`object-cover transition-opacity duration-700 ${
                  idx === avanTechImageIndex ? 'opacity-100' : 'opacity-0'
                }`}
                priority={idx === 0}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Pride Gala Event Showcase */}
      <div className="bg-gradient-to-br from-primary/5 to-secondary/5 py-16 lg:py-24 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-12">
            <p className="text-secondary uppercase tracking-wider font-bold text-xs mb-4">
              Celebration & Community
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Pride Gala Dinner Recap
            </h2>
            <p className="text-lg text-foreground/70 mb-8 max-w-2xl">
              A celebration of LGBTQ+ youth leadership, cultural pride, and community belonging. Our June 29, 2026 event showcased runway performances, cultural expression, and the vibrant spirit of Kakuma&apos;s queer community.
            </p>
          </div>

          {/* Image Gallery - Rotating Single Image */}
          <div className="relative h-96 md:h-[500px] rounded-xl overflow-hidden shadow-xl">
            {prideGalaImages.map((img, idx) => (
              <Image
                key={idx}
                src={img}
                alt="Pride Gala celebration and runway moments"
                fill
                className={`object-cover transition-opacity duration-700 ${
                  idx === prideGalaImageIndex ? 'opacity-100' : 'opacity-0'
                }`}
                priority={idx === 0}
              />
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <p className="text-foreground/70 mb-6">
              Celebrating LGBTQ+ youth leadership, cultural pride, and community belonging in Kakuma.
            </p>
            <Link href="/impact" className="inline-flex items-center text-secondary font-semibold hover:gap-2 transition-all gap-1">
              Learn About Our Impact
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Explore Section */}
      <div className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-12">
            <p className="text-secondary uppercase tracking-wider font-bold text-xs mb-4">
              Explore Avan
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Deepen your understanding of our work
            </h2>
            <p className="text-lg text-foreground/70">
              Each page shares the details—mission, programs, impact, values, and ways to connect. Explore our work to continue your journey.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* About Card */}
            <Link href="/about" className="group">
              <div className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-md transition h-full">
                <h3 className="text-xl font-bold text-secondary mb-3">About Us</h3>
                <p className="text-foreground/70 mb-6">Meet the Avan team and vision rooted in Kakuma.</p>
                <span className="inline-flex items-center text-secondary font-semibold group-hover:gap-2 transition-all gap-1">
                  Read our story
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* Programs Card */}
            <Link href="/programs" className="group">
              <div className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-md transition h-full">
                <h3 className="text-xl font-bold text-secondary mb-3">Programs</h3>
                <p className="text-foreground/70 mb-6">Explore AvanTech, Pekee, Miradede, and more creative initiatives.</p>
                <span className="inline-flex items-center text-secondary font-semibold group-hover:gap-2 transition-all gap-1">
                  See programs
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* Impact Card */}
            <Link href="/impact" className="group">
              <div className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-md transition h-full">
                <h3 className="text-xl font-bold text-secondary mb-3">Impact</h3>
                <p className="text-foreground/70 mb-6">Review our achievements and community-led milestones.</p>
                <span className="inline-flex items-center text-secondary font-semibold group-hover:gap-2 transition-all gap-1">
                  View impact
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* Approach Card */}
            <Link href="/approach" className="group">
              <div className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-md transition h-full">
                <h3 className="text-xl font-bold text-secondary mb-3">Our Approach</h3>
                <p className="text-foreground/70 mb-6">Learn the principles guiding our work in the community.</p>
                <span className="inline-flex items-center text-secondary font-semibold group-hover:gap-2 transition-all gap-1">
                  Explore approach
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* Context Card */}
            <Link href="/context" className="group">
              <div className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-md transition h-full">
                <h3 className="text-xl font-bold text-secondary mb-3">Context</h3>
                <p className="text-foreground/70 mb-6">Understand the broader context of Kakuma and our communities.</p>
                <span className="inline-flex items-center text-secondary font-semibold group-hover:gap-2 transition-all gap-1">
                  Learn more
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* Support Card */}
            <Link href="/get-involved" className="group">
              <div className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-md transition h-full">
                <h3 className="text-xl font-bold text-secondary mb-3">Get Involved</h3>
                <p className="text-foreground/70 mb-6">Discover ways to support, partner, or volunteer with Avan.</p>
                <span className="inline-flex items-center text-secondary font-semibold group-hover:gap-2 transition-all gap-1">
                  Join us
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* At A Glance Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <p className="text-secondary uppercase tracking-wider font-bold text-xs mb-4">
          At A Glance
        </p>
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
          Youth leading innovation in Kakuma
        </h2>
        <p className="text-lg text-foreground/70 mb-12">
          Avan equips young people with creative, digital, and entrepreneurial skills across our seven signature programs.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-gray-50 rounded-xl p-6">
            <p className="text-3xl lg:text-4xl font-bold text-secondary mb-2">200+</p>
            <p className="text-sm text-foreground/60">Youth trained across programs</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-6">
            <p className="text-3xl lg:text-4xl font-bold text-secondary mb-2">7</p>
            <p className="text-sm text-foreground/60">Signature programs</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-6">
            <p className="text-3xl lg:text-4xl font-bold text-secondary mb-2">60%</p>
            <p className="text-sm text-foreground/60">Women and girls</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-6">
            <p className="text-3xl lg:text-4xl font-bold text-secondary mb-2">100%</p>
            <p className="text-sm text-foreground/60">Community-led</p>
          </div>
        </div>
      </div>
    </section>
  );
}
