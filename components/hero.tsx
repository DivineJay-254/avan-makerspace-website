'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-background flex items-center justify-center overflow-hidden py-12 sm:py-20 lg:py-0">
      {/* Background accent elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Logo Section - Left */}
          <div className="flex justify-center lg:justify-start order-2 lg:order-1 animate-slide-in-left">
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden bg-gradient-to-br from-secondary/10 to-accent/10 shadow-lg hover:shadow-2xl transition-shadow duration-300 group">
              <Image
                src="/avan-logo.png"
                alt="Avan Makerspace"
                width={300}
                height={300}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>

          {/* Text Section - Right */}
          <div className="flex flex-col justify-center order-1 lg:order-2 animate-slide-in-right">
            {/* Tagline */}
            <p className="text-secondary text-xs sm:text-sm font-bold uppercase tracking-widest mb-4 animate-fade-in">
              Refugee-Led Innovation Hub
            </p>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight animate-fade-in">
              Empowering Youth Through <span className="text-secondary">Innovation & Creativity</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-foreground/75 mb-8 leading-relaxed animate-fade-in">
              Avan Makerspace is a queer-led, refugee-led nonprofit transforming lives in Kakuma Refugee Camp. We create safe, inclusive spaces where displaced youth discover their talents, develop digital and creative skills, and build sustainable futures through innovation, entrepreneurship, and community.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-10 py-8 border-y border-border/50">
              <div>
                <p className="text-3xl sm:text-4xl font-bold text-accent mb-1">120+</p>
                <p className="text-xs sm:text-sm font-medium text-foreground/60">Youth Trained</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-bold text-secondary mb-1">7</p>
                <p className="text-xs sm:text-sm font-medium text-foreground/60">Signature Programs</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-bold text-primary mb-1">∞</p>
                <p className="text-xs sm:text-sm font-medium text-foreground/60">Unlimited Potential</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 animate-fade-in">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-white font-semibold text-base rounded-lg transform hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl"
              >
                Support Our Mission
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary/5 font-semibold text-base rounded-lg transform hover:scale-105 transition-transform duration-300"
              >
                Discover Our Work
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
