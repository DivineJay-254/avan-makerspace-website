'use client';

import Image from 'next/image';

const equipmentList = [
  {
    id: 1,
    name: '3D Printers',
    description: 'Advanced FDM and resin printing technology',
    image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=400&fit=crop',
  },
  {
    id: 2,
    name: 'Laser Cutter',
    description: 'Precision CO2 laser cutting and engraving',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=400&fit=crop',
  },
  {
    id: 3,
    name: 'CNC Machine',
    description: 'Professional-grade computer numerical control',
    image: 'https://images.unsplash.com/photo-1637960826022-3e3c01c4da87?w=400&h=400&fit=crop',
  },
  {
    id: 4,
    name: 'Woodworking Shop',
    description: 'Complete set of tools and machinery',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=400&fit=crop',
  },
  {
    id: 5,
    name: 'Welding Station',
    description: 'MIG, TIG, and stick welding equipment',
    image: 'https://images.unsplash.com/photo-1581092162562-40038282dd27?w=400&h=400&fit=crop',
  },
  {
    id: 6,
    name: 'Electronics Lab',
    description: 'Soldering tools, oscilloscopes, and components',
    image: 'https://images.unsplash.com/photo-1563220570-c2e1c0c4b5f5?w=400&h=400&fit=crop',
  },
];

export default function Equipment() {
  return (
    <section id="equipment" className="py-16 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-accent uppercase text-sm font-semibold tracking-wide mb-2">What We Offer</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            State-of-the-Art Equipment
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Our diverse range of tools and machines empowers you to bring any creative vision to life.
          </p>
        </div>

        {/* Equipment Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {equipmentList.map((item) => (
            <div
              key={item.id}
              className="group rounded-lg overflow-hidden bg-muted/50 hover:shadow-lg transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden bg-muted">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {item.name}
                </h3>
                <p className="text-muted">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-lg text-muted mb-6">
            Want to learn more about our equipment? Schedule a tour today!
          </p>
          <button className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition">
            Schedule a Tour
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
