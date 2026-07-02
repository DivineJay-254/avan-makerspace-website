import Header from '@/components/header';
import Footer from '@/components/footer';
import Image from 'next/image';

const programs = [
  {
    id: 1,
    name: 'Fashion & Modeling',
    tagline: 'Building Confidence Through Style',
    description: 'Our fashion program teaches runway training, styling techniques, and personal branding to help youth develop confidence and presentation skills.',
    details: [
      'Professional catwalk and posture training',
      '30 youth successfully trained',
      'Showcase events and portfolio building',
      'Connection to local fashion industry',
      'Income-generating opportunities',
    ],
    impact: 'Participants report increased confidence, improved self-image, and opportunities for income through modeling and styling services.',
    image: '/programs-fashion.png',
    color: 'text-secondary',
  },
  {
    id: 2,
    name: 'Visual Arts (I Am Art)',
    tagline: 'Expressing Through Creativity',
    description: 'A comprehensive visual arts program focusing on drawing, painting, digital design, and artistic expression to develop technical skills and emotional resilience.',
    details: [
      'Drawing and painting fundamentals',
      '40 young artists trained',
      'Digital design introduction',
      'Portfolio development',
      'Exhibition and showcase opportunities',
      'Art-based mental health and healing',
    ],
    impact: 'Youth develop technical artistic skills while processing emotions and trauma through creative expression, building self-worth and community recognition.',
    image: '/programs-arts.png',
    color: 'text-accent',
  },
  {
    id: 3,
    name: 'AvanTech - Robotics & Digital',
    tagline: 'Innovation for Tomorrow',
    description: 'Hands-on STEM education introducing youth to robotics, coding, and digital innovation through LEGO and Arduino-based projects.',
    details: [
      'LEGO robotics and engineering',
      '45 children trained in foundational tech',
      'Arduino programming basics',
      'Problem-solving and critical thinking',
      'Pathway to digital career opportunities',
      'Youth tech mentorship network',
    ],
    impact: 'Young people gain foundational tech skills, improved analytical thinking, and access to digital economy opportunities in an increasingly tech-driven world.',
    image: '/programs-robotics.png',
    color: 'text-primary',
  },
  {
    id: 4,
    name: 'Writing & Spoken Word',
    tagline: 'Finding Your Voice',
    description: 'Programs in poetry, storytelling, and spoken word performance that help youth articulate their experiences and build communication skills.',
    details: [
      'Poetry and creative writing workshops',
      'Storytelling and narrative development',
      'Spoken word performance training',
      'Public speaking confidence building',
      'Publishing and sharing platforms',
      'Connection to youth activism',
    ],
    impact: 'Youth discover their voice, process personal narratives, build communication confidence, and connect with audiences through powerful storytelling.',
    image: '/avan-community.png',
    color: 'text-secondary',
  },
  {
    id: 5,
    name: 'Music & Performance',
    tagline: 'Rhythm and Expression',
    description: 'Music training including instrumental instruction, vocal performance, music production basics, and stage presence development for aspiring young musicians.',
    details: [
      'Basic instrumental training',
      'Vocal performance coaching',
      'Music production fundamentals',
      'Stage presence and performance skills',
      'Live showcase opportunities',
      'Community and cultural performances',
    ],
    impact: 'Music becomes a healing tool and income source, allowing youth to process emotions, build community, and develop viable creative careers.',
    image: '/programs-music.png',
    color: 'text-accent',
  },
  {
    id: 6,
    name: 'Digital Skills & Freelancing',
    tagline: 'Economic Opportunity',
    description: 'Remote work and digital literacy training preparing youth for freelance opportunities, online income generation, and digital entrepreneurship.',
    details: [
      'Digital literacy and online safety',
      'Remote freelancing platforms training',
      'Content creation and social media',
      'E-commerce and online business basics',
      'Graphic design fundamentals',
      'Virtual assistance and administrative skills',
    ],
    impact: 'Youth gain access to global digital economy opportunities, creating sustainable income streams and economic independence from home.',
    image: '/programs-digital.png',
    color: 'text-primary',
  },
];

export default function ProgramsPage() {
  return (
    <div className="w-full">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-background to-muted/30 py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-secondary uppercase text-sm font-bold tracking-widest mb-4">Our Programs</p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Six Pathways to <span className="text-secondary">Opportunity</span>
              </h1>
              <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
                Each program is carefully designed to develop specific skills while building confidence, community, and pathways to sustainable livelihoods.
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
                      <Image
                        src={program.image}
                        alt={program.name}
                        fill
                        className="object-cover"
                      />
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
                Why Our Programs Work
              </h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Every program is built on research, community input, and proven methodologies for youth empowerment in refugee settings.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-background rounded-lg p-8 border border-border">
                <div className="text-4xl text-secondary mb-4">🎯</div>
                <h3 className="text-xl font-bold text-foreground mb-3">Youth-Centered Design</h3>
                <p className="text-foreground/70">
                  Programs are developed with direct input from young people in Kakuma about what they need and aspire to.
                </p>
              </div>

              <div className="bg-background rounded-lg p-8 border border-border">
                <div className="text-4xl text-accent mb-4">🤝</div>
                <h3 className="text-xl font-bold text-foreground mb-3">Community Integration</h3>
                <p className="text-foreground/70">
                  All programs foster belonging, social cohesion, and break down isolation within the refugee community.
                </p>
              </div>

              <div className="bg-background rounded-lg p-8 border border-border">
                <div className="text-4xl text-primary mb-4">💼</div>
                <h3 className="text-xl font-bold text-foreground mb-3">Livelihoods Focus</h3>
                <p className="text-foreground/70">
                  Every program builds toward income generation and sustainable economic opportunity for participants.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-24 bg-primary text-primary-foreground">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Support Youth Transformation?
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8">
              Your partnership, mentorship, or financial support can help us scale these programs and reach hundreds more young people in Kakuma.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 rounded-lg bg-accent hover:bg-accent/90 text-white font-semibold transition">
                Partner With Us
              </button>
              <button className="px-8 py-3 rounded-lg bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground font-semibold border border-primary-foreground/30 transition">
                Learn More
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
