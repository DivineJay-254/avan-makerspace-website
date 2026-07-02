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
          <p className="text-accent uppercase text-sm font-semibold tracking-wide mb-2">MVP Results</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Real Impact in Kakuma
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Through our pilot programs, we&apos;ve already transformed the lives of over 115 young people.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-8">
          <AnimatedStat end={30} label="Fashion & Modeling Trained" suffix="" />
          <AnimatedStat end={45} label="Robotics Bootcamp Participants" suffix="" />
          <AnimatedStat end={40} label="Visual Arts Trainees (I Am Art)" suffix="" />
        </div>

        {/* Additional Info */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-border pt-12">
          <div>
            <p className="text-3xl font-bold text-primary mb-2">115</p>
            <p className="text-muted">Total Youth Empowered</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary mb-2">6</p>
            <p className="text-muted">Core Programs</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary mb-2">Proven</p>
            <p className="text-muted">Impact & Feasibility</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary mb-2">Ready</p>
            <p className="text-muted">To Scale</p>
          </div>
        </div>
      </div>
    </section>
  );
}
