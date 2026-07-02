'use client';

import Image from 'next/image';

const programsList = [
  {
    id: 1,
    name: 'Fashion & Modeling',
    description: 'Catwalk training, styling, and confidence building. 30 youth trained with showcase opportunities.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
  },
  {
    id: 2,
    name: 'Visual Arts',
    description: 'Drawing, creative design, and artistic expression. 40 young artists trained through I Am Art.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=400&fit=crop',
  },
  {
    id: 3,
    name: 'AvanTech - Robotics & Digital',
    description: 'LEGO robotics, Arduino programming. 45 children trained in foundational tech innovation.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=400&fit=crop',
  },
  {
    id: 4,
    name: 'Writing & Spoken Word',
    description: 'Poetry, storytelling, and creative expression through the written and spoken word.',
    image: 'https://images.unsplash.com/photo-1507842217343-583f20270319?w=400&h=400&fit=crop',
  },
  {
    id: 5,
    name: 'Music & Performance',
    description: 'Training in music production, performance skills, and stage presence.',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
  },
  {
    id: 6,
    name: 'Digital Skills & Freelancing',
    description: 'Remote work training, digital literacy, and income-generation opportunities.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=400&fit=crop',
  },
];

export default function Equipment() {
  return (
    <section id="programs" className="py-16 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-accent uppercase text-sm font-semibold tracking-wide mb-2">What We Offer</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Our Programs
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Six core programs transforming youth talent into creative skills, confidence, and economic opportunity.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {programsList.map((item) => (
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
            Ready to support youth transformation? Join us in scaling Avan Makerspace.
          </p>
          <button className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition">
            Get Involved
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
