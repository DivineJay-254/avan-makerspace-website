'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import PartnershipModal from '@/components/partnership-modal';
import Image from 'next/image';

const programs = [
  {
    id: 1,
    name: 'AvanTech: Digital Innovation',
    tagline: 'Technology, AI, Robotics & Coding',
    description: 'Comprehensive STEM education empowering youth to become digital innovators. From robotics and coding to AI and cybersecurity, AvanTech builds foundational and advanced technical skills with real-world applications.',
    details: [
      'Robotics & mechanical engineering (LEGO, Arduino)',
      'Web and mobile app development',
      'AI fundamentals and machine learning basics',
      'Cybersecurity and digital safety',
      'Freelancing platforms and digital entrepreneurship',
      'Hackathons and innovation competitions',
    ],
    impact: 'Participants gain access to in-demand digital economy skills, create income opportunities through freelancing, and position themselves as innovators solving community problems.',
    images: ['/real-robotics.jpg', '/real-robotics1.jpg', '/real-robotics2.jpg'],
    color: 'text-primary',
  },
  {
    id: 2,
    name: 'Pekee Models: Professional Performance',
    tagline: 'Runway Training & Talent Development',
    description: 'Professional modeling and performance program focused on runway training, confidence building, personal branding, and talent development. Exclusively dedicated to modeling and performance—not fashion design.',
    details: [
      'Professional runway technique and posture',
      'Portfolio development and photography',
      'Personal branding and public speaking',
      'Confidence building and stage presence',
      'Industry networking and connections',
      'Fashion show and event opportunities',
    ],
    impact: 'Youth develop professional presentation skills, build income through modeling opportunities, and gain confidence in their ability to present themselves globally.',
    images: ['/sector-models.png', '/sector-models.png'],
    color: 'text-secondary',
  },
  {
    id: 3,
    name: 'Miradede: Fashion & Design',
    tagline: 'Garment Making & Sustainable Fashion',
    description: 'Creative program focused on fashion design, garment production, tailoring, and sustainable fashion innovation. From design to production, youth learn end-to-end fashion entrepreneurship.',
    details: [
      'Fashion design and sketching fundamentals',
      'Garment construction and tailoring',
      'Sustainable and eco-friendly design',
      'Upcycling and textile innovation',
      'Fashion business and entrepreneurship',
      'Collection development and showcases',
    ],
    impact: 'Participants develop marketable fashion skills, create income through tailoring and design services, and launch sustainable fashion businesses.',
    images: ['/sector-fashion.png', '/sector-fashion.png'],
    color: 'text-secondary',
  },
  {
    id: 4,
    name: 'I Am Art: Visual & Creative Expression',
    tagline: 'Painting, Sculpture, Digital Art & More',
    description: 'Dedicated visual arts program exploring drawing, painting, sculpture, photography, digital art, murals, and community art projects. A space for emotional expression, healing, and creative development.',
    details: [
      'Drawing, painting, and sculpture techniques',
      'Photography and digital art',
      'Mural and community public art',
      'Art exhibitions and showcases',
      'Art-based therapy and healing',
      'Gallery representation and artist development',
    ],
    impact: 'Youth process trauma through creative expression, build confidence and self-worth, develop professional art practices, and contribute to community cultural vibrancy.',
    images: ['/real-art.jpg', '/real-art1.jpg', '/real-art3.jpg'],
    color: 'text-accent',
  },
  {
    id: 5,
    name: 'Music & Performing Arts',
    tagline: 'Production, Performance & Storytelling',
    description: 'Comprehensive program in music production, vocal performance, instrumental training, dance, acting, and spoken word. A platform for youth to discover their artistic voice and build performance careers.',
    details: [
      'Music production and beat-making',
      'Vocal performance and training',
      'Instrumental instruction (various instruments)',
      'Dance, choreography, and movement',
      'Acting and theatrical performance',
      'Spoken word, rap, and songwriting',
    ],
    impact: 'Participants develop professional performance skills, create music for healing and income, build live performance opportunities, and express their cultural identity.',
    images: ['/sector-music.png', '/sector-music.png'],
    color: 'text-accent',
  },
  {
    id: 6,
    name: 'Media & Digital Storytelling',
    tagline: 'Video, Photography, Content & Branding',
    description: 'Program focused on photography, videography, documentary production, content creation, graphic design, and digital marketing. Youth become storytellers and digital communicators.',
    details: [
      'Photography and photojournalism',
      'Videography and documentary production',
      'Content creation and social media strategy',
      'Graphic design and visual branding',
      'Digital marketing and social campaigns',
      'Podcast production and audio storytelling',
    ],
    impact: 'Youth master digital communication tools, build portfolios as content creators, create income through freelance media work, and amplify community stories.',
    images: ['/sector-media.png', '/sector-media.png'],
    color: 'text-primary',
  },
  {
    id: 7,
    name: 'Entrepreneurship & Livelihoods',
    tagline: 'Startup Support & Economic Empowerment',
    description: 'Business incubation and livelihood program equipping youth with financial literacy, business planning, career readiness, and mentorship. Building sustainable income pathways and economic independence.',
    details: [
      'Business plan development and incubation',
      'Financial literacy and accounting basics',
      'Freelancing and remote work skills',
      'Job placement and career readiness',
      'Mentorship from successful entrepreneurs',
      'Startup funding and resource access',
    ],
    impact: 'Participants create sustainable income streams, launch viable businesses, access formal or remote employment, and become financially independent.',
    images: ['/sector-business.png', '/sector-business.png'],
    color: 'text-primary',
  },
];

export default function ProgramsPage() {
  const [isPartnershipModalOpen, setIsPartnershipModalOpen] = useState(false);
  const [imageIndices, setImageIndices] = useState(programs.map(() => 0));

  useEffect(() => {
    const intervals = programs.map((program, idx) => {
      return setInterval(() => {
        setImageIndices((prev) => {
          const newIndices = [...prev];
          newIndices[idx] = (newIndices[idx] + 1) % program.images.length;
          return newIndices;
        });
      }, 3000); // Change image every 3 seconds
    });

    return () => {
      intervals.forEach((interval) => clearInterval(interval));
    };
  }, []);

  return (
    <div className="w-full">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-background to-muted/30 py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-secondary uppercase text-sm font-bold tracking-widest mb-4">Seven Signature Programs</p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Pathways to <span className="text-secondary">Innovation & Opportunity</span>
              </h1>
              <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
                Every program is rooted in youth voice, community need, and proven impact. We combine creativity, technology, and entrepreneurship to build dignified futures for displaced and underserved youth in Kakuma.
              </p>
            </div>
          </div>
        </section>

        {/* Programs Grid */}
        <section className="py-16 sm:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-20">
              {programs.map((program, index) => (
                <div
                  key={program.id}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:grid-cols-2' : ''
                  }`}
                >
                  {/* Image - alternating sides */}
                  <div className={index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}>
                    <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
                      {program.images.map((img, imgIdx) => (
                        <div
                          key={imgIdx}
                          className={`absolute inset-0 transition-opacity duration-700 ${
                            imgIdx === imageIndices[index - 1] ? 'opacity-100' : 'opacity-0'
                          }`}
                        >
                          <Image
                            src={img}
                            alt={program.name}
                            fill
                            className="object-cover"
                            priority={imgIdx === 0}
                          />
                        </div>
                      ))}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}>
                    <p className={`${program.color} uppercase text-sm font-bold tracking-widest mb-3`}>
                      Program {program.id}
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                      {program.name}
                    </h2>
                    <p className={`${program.color} text-lg font-semibold mb-4`}>
                      {program.tagline}
                    </p>

                    <p className="text-lg text-foreground/70 mb-6 leading-relaxed">
                      {program.description}
                    </p>

                    {/* Details List */}
                    <div className="mb-6">
                      <h3 className="font-semibold text-foreground mb-3">What&apos;s Included:</h3>
                      <ul className="space-y-2">
                        {program.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className={`${program.color} mr-3 font-bold`}>✓</span>
                            <span className="text-foreground/75">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Impact */}
                    <div className="bg-muted/50 rounded-lg p-6 border border-border">
                      <h3 className="font-semibold text-foreground mb-2">Impact</h3>
                      <p className="text-foreground/75 leading-relaxed">
                        {program.impact}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Our Programs Work */}
        <section className="py-16 sm:py-24 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                Our Approach to Change
              </h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Every program embodies refugee-led, equitable, and outcome-focused principles designed for lasting impact.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-background rounded-lg p-8 border border-border">
                <div className="text-4xl text-secondary mb-4">👥</div>
                <h3 className="text-xl font-bold text-foreground mb-3">Refugee-Led Leadership</h3>
                <p className="text-foreground/70">
                  Programs are designed by and for refugee and host community youth. We center lived experience and community voice in all decisions.
                </p>
              </div>

              <div className="bg-background rounded-lg p-8 border border-border">
                <div className="text-4xl text-accent mb-4">🌈</div>
                <h3 className="text-xl font-bold text-foreground mb-3">Radical Inclusion</h3>
                <p className="text-foreground/70">
                  Everyone is welcome. We actively create safe, affirming spaces for refugee and host-community youth regardless of identity or background.
                </p>
              </div>

              <div className="bg-background rounded-lg p-8 border border-border">
                <div className="text-4xl text-primary mb-4">💪</div>
                <h3 className="text-xl font-bold text-foreground mb-3">Livelihoods & Dignity</h3>
                <p className="text-foreground/70">
                  Every program builds toward income generation, economic independence, and the opportunity to build dignified, sustainable futures.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-24 bg-primary text-primary-foreground">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Help Us Scale Youth Empowerment
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8">
              Your partnership, mentorship, or investment in refugee-led innovation helps us reach more young people and transform the future of Kakuma and the broader region.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setIsPartnershipModalOpen(true)}
                className="px-8 py-3 rounded-lg bg-accent hover:bg-accent/90 text-white font-semibold transition"
              >
                Support Our Mission
              </button>
              <button 
                onClick={() => setIsPartnershipModalOpen(true)}
                className="px-8 py-3 rounded-lg bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground font-semibold border border-primary-foreground/30 transition"
              >
                Get Involved
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <PartnershipModal 
        isOpen={isPartnershipModalOpen} 
        onClose={() => setIsPartnershipModalOpen(false)} 
      />
    </div>
  );
}
