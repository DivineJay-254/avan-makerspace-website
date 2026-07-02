'use client';

import { useState } from 'react';
import Image from 'next/image';

const programsList = [
  {
    id: 1,
    name: 'Fashion & Modeling',
    description: 'Catwalk training, styling, and confidence building. 30 youth trained with showcase opportunities.',
    image: '/programs-fashion.png',
  },
  {
    id: 2,
    name: 'Visual Arts',
    description: 'Drawing, creative design, and artistic expression. 40 young artists trained through I Am Art.',
    image: '/programs-arts.png',
  },
  {
    id: 3,
    name: 'AvanTech - Robotics & Digital',
    description: 'LEGO robotics, Arduino programming. 45 children trained in foundational tech innovation.',
    image: '/programs-robotics.png',
  },
  {
    id: 4,
    name: 'Writing & Spoken Word',
    description: 'Poetry, storytelling, and creative expression through the written and spoken word.',
    image: '/avan-community.png',
  },
  {
    id: 5,
    name: 'Music & Performance',
    description: 'Training in music production, performance skills, and stage presence.',
    image: '/programs-music.png',
  },
  {
    id: 6,
    name: 'Digital Skills & Freelancing',
    description: 'Remote work training, digital literacy, and income-generation opportunities.',
    image: '/programs-digital.png',
  },
];

export default function Equipment() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="programs" className="py-16 sm:py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-secondary uppercase text-sm font-bold tracking-widest mb-3">What We Offer</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Our Programs
          </h2>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
            Six core programs transforming youth talent into creative skills, confidence, and economic opportunity.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {programsList.map((item, index) => (
            <div
              key={item.id}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`group rounded-xl overflow-hidden bg-background shadow-sm hover:shadow-2xl hover:border-secondary transition-all duration-300 border border-border/50 transform ${
                hoveredId === item.id ? 'scale-105 -translate-y-2' : ''
              }`}
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden bg-primary/10">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Color Accent Bar */}
              <div className={`h-1 ${index % 3 === 0 ? 'bg-secondary' : index % 3 === 1 ? 'bg-accent' : 'bg-primary'}`} />

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-secondary transition-colors duration-300">
                  {item.name}
                </h3>
                <p className="text-foreground/70 leading-relaxed group-hover:text-foreground/90 transition-colors duration-300">
                  {item.description}
                </p>
                <div className="mt-4 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-secondary font-semibold text-sm flex items-center">
                    Learn more
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center animate-fade-in">
          <p className="text-lg text-foreground/70 mb-6">
            Ready to support youth transformation? Join us in scaling Avan Makerspace.
          </p>
          <button className="inline-flex items-center px-8 py-3 rounded-lg bg-accent hover:bg-accent/90 text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Get Involved
            <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
