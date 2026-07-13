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
    <>
      {/* Main Stats Section */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="text-secondary uppercase text-sm font-bold tracking-widest mb-3">Our Impact</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Transforming Lives in Kakuma
            </h2>
            <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
              Since our founding, and before securing any external funding, we&apos;ve reached 200+ young people through community-led initiatives. Here&apos;s what that impact represents.
            </p>
          </div>

          {/* Key Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-8 mb-16">
            <AnimatedStat end={200} label="Youth Reached" suffix="+" />
            <AnimatedStat end={7} label="Program Pillars" suffix="" />
            <AnimatedStat end={0} label="External Funding Used" suffix="$" />
          </div>

          {/* Program-Specific Impact */}
          <div className="bg-muted/30 rounded-xl p-12 border border-border mb-16">
            <h3 className="text-2xl font-bold text-foreground mb-8 text-center">What This Impact Represents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <span className="text-2xl font-bold text-primary flex-shrink-0">💻</span>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">AvanTech</h4>
                  <p className="text-foreground/70">Young people gaining first exposure to coding, robotics, and digital tools</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-2xl font-bold text-secondary flex-shrink-0">👗</span>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Miradede</h4>
                  <p className="text-foreground/70">Aspiring designers and tailors trained in sustainable fashion practices</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-2xl font-bold text-accent flex-shrink-0">🎭</span>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Pekee Models</h4>
                  <p className="text-foreground/70">Participants building confidence and public presentation skills</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-2xl font-bold text-primary flex-shrink-0">🎨</span>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">I Am Art</h4>
                  <p className="text-foreground/70">Illustrators, writers, and storytellers supported in creative expression</p>
                </div>
              </div>
              <div className="flex gap-4 md:col-span-2">
                <span className="text-2xl font-bold text-secondary flex-shrink-0">🤝</span>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Community Building</h4>
                  <p className="text-foreground/70">Refugee and host-community youth learning and creating side by side, building bridges across traditional divides</p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Impact Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-border pt-12">
            <div>
              <p className="text-3xl font-bold text-secondary mb-2">50%</p>
              <p className="text-foreground/70 font-medium">Women & Girls Represented</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-accent mb-2">2</p>
              <p className="text-foreground/70 font-medium">Major Public Showcases</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary mb-2">4</p>
              <p className="text-foreground/70 font-medium">Established Programs</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-secondary mb-2">3</p>
              <p className="text-foreground/70 font-medium">Emerging Initiatives</p>
            </div>
          </div>
        </div>
      </section>

      {/* Theory of Change Section */}
      <section className="py-16 sm:py-24 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Our Theory of Change</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Our approach rests on a simple logic: if young people are given consistent access to relevant skills, mentorship, creative space, and platforms to showcase their work, they will build confidence, develop marketable skills, and access livelihood opportunities—even within camp constraints.
            </p>
          </div>

          <div className="space-y-6">
            {/* Inputs */}
            <div className="bg-background rounded-xl p-8 border-l-4 border-primary">
              <div className="flex items-start gap-4">
                <span className="text-4xl font-bold text-primary min-w-fit">1</span>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">Inputs</h3>
                  <ul className="text-foreground/70 space-y-2">
                    <li>Physical and social space for training, creation, and gathering</li>
                    <li>Volunteer and partner-provided mentorship, coaching, and technical expertise</li>
                    <li>Equipment and materials, from laptops to sewing machines to art supplies</li>
                    <li>Community trust, built through refugee- and queer-led leadership</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Activities */}
            <div className="bg-background rounded-xl p-8 border-l-4 border-secondary">
              <div className="flex items-start gap-4">
                <span className="text-4xl font-bold text-secondary min-w-fit">2</span>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">Activities</h3>
                  <ul className="text-foreground/70 space-y-2">
                    <li>Workshops, boot camps, and structured courses across program pillars</li>
                    <li>Mentorship, guest lectures, and one-on-one coaching</li>
                    <li>Showcases, exhibitions, runway events that give participants public platforms</li>
                    <li>Community events bringing refugee and host-community youth together</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Outputs */}
            <div className="bg-background rounded-xl p-8 border-l-4 border-accent">
              <div className="flex items-start gap-4">
                <span className="text-4xl font-bold text-accent min-w-fit">3</span>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">Outputs</h3>
                  <ul className="text-foreground/70 space-y-2">
                    <li>Young people trained in technology, fashion, performance, and the arts</li>
                    <li>Portfolios, products, and creative works produced by participants</li>
                    <li>Public showcases and exhibitions connecting youth talent to wider audiences</li>
                    <li>A growing, trained volunteer and mentor network</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Outcomes */}
            <div className="bg-background rounded-xl p-8 border-l-4 border-primary">
              <div className="flex items-start gap-4">
                <span className="text-4xl font-bold text-primary min-w-fit">4</span>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">Outcomes</h3>
                  <ul className="text-foreground/70 space-y-2">
                    <li>Increased digital literacy, technical, and creative skills among participants</li>
                    <li>Greater confidence, self-expression, and personal branding</li>
                    <li>Early-stage entrepreneurship and income-generating activity</li>
                    <li>Strengthened relationships between refugee and host-community youth</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Long-Term Impact */}
            <div className="bg-background rounded-xl p-8 border-l-4 border-secondary">
              <div className="flex items-start gap-4">
                <span className="text-4xl font-bold text-secondary min-w-fit">5</span>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">Long-Term Impact</h3>
                  <p className="text-foreground/70">
                    A stronger, more inclusive ecosystem of innovation and creativity in Kakuma—one in which refugee and host-community youth are recognized as producers of value, not only recipients of aid, and where displacement is no longer a barrier to a meaningful career or creative life.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Building Fuller Impact Picture */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-6">Building a Fuller Impact Picture</h2>
            <p className="text-lg text-foreground/70 mb-6">
              As Avan Makerspace formalizes its registration and expands with partner support, we&apos;re strengthening our data collection and monitoring practices. We want to tell our partners—and ourselves—honestly what is working and where your support makes the most difference.
            </p>
            <div className="bg-muted/50 rounded-lg p-6 border border-border space-y-3">
              <p className="text-foreground font-semibold">We are working toward:</p>
              <ul className="text-foreground/75 space-y-2">
                <li>Standardized participant registration and attendance tracking across all programs</li>
                <li>Pre- and post-program skills assessments for each pillar</li>
                <li>Simple livelihood follow-up (income, employment, enterprise) for program graduates</li>
                <li>Annual reporting to partners on both achievements and challenges</li>
                <li>Disaggregated participation data by program, gender, age, and community</li>
              </ul>
            </div>
            <p className="text-foreground/70 mt-6 italic">
              Partners interested in supporting this measurement and evaluation capacity are warmly welcomed. This work strengthens our learning and helps us serve participants even better.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
