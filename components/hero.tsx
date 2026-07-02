'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1920&h=1080&fit=crop"
          alt="Makerspace workshop"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Logo Circle */}
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-4xl">A</span>
            </div>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-accent text-sm font-semibold uppercase tracking-wide mb-4">
          Kakuma Refugee Camp
        </p>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Create. Express. Belong.
        </h1>

        {/* Description */}
        <p className="text-lg sm:text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
          Empowering youth through creativity, expression, and community. Transform talent into opportunity, purpose, and sustainable livelihoods.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground text-base"
          >
            Explore Programs
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-white/10 hover:bg-white/20 text-white border-white"
          >
            Learn Our Story
          </Button>
        </div>

        {/* Stats Preview */}
        <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-accent mb-2">115+</div>
            <p className="text-sm text-gray-200">Youth Trained</p>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-accent mb-2">6</div>
            <p className="text-sm text-gray-200">Programs</p>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-accent mb-2">Proven</div>
            <p className="text-sm text-gray-200">MVP Impact</p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
