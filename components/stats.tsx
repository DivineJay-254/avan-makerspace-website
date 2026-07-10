'use client';

import { useEffect, useState } from 'react';

function AnimatedStat({ end, label, suffix = '+' }: { end: number; label: string; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepValue = end / steps;
    let current = 0;

    const interval = setInterval(() => {
      current += stepValue;
      if (current >= end) {
        setCount(end);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [end]);

  return (
    <div className="text-center">
      <div className="text-5xl sm:text-6xl font-bold text-primary mb-3">{count}{suffix}</div>
      <p className="text-foreground text-lg">{label}</p>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-secondary uppercase text-sm font-bold tracking-widest mb-3">Our Impact</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Transforming Lives in Kakuma
          </h2>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
            Since 2024, we&apos;ve empowered 120+ young people through innovation, creativity, and inclusive leadership, building pathways to dignified futures.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-8">
          <AnimatedStat end={120} label="Youth Trained" suffix="+" />
          <AnimatedStat end={7} label="Signature Programs" suffix="" />
          <AnimatedStat end={100} label="% Belong to Refugee or Host Community" suffix="%" />
        </div>

        {/* Additional Info */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-border pt-12">
          <div>
            <p className="text-3xl font-bold text-secondary mb-2">45%</p>
            <p className="text-foreground/70 font-medium">Women & Girls</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-accent mb-2">12+</p>
            <p className="text-foreground/70 font-medium">Nationalities Served</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary mb-2">15+</p>
            <p className="text-foreground/70 font-medium">Partner Organizations</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-secondary mb-2">∞</p>
            <p className="text-foreground/70 font-medium">Possibilities Ahead</p>
          </div>
        </div>
      </div>
    </section>
  );
}
