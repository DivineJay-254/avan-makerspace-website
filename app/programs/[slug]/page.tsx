'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Header from '@/components/header';
import Footer from '@/components/footer';
import PartnershipModal from '@/components/partnership-modal';
import Image from 'next/image';

const programsData = {
  avantech: {
    id: 1,
    name: 'AvanTech: Digital Innovation',
    tagline: 'Technology, AI, Robotics & Coding',
    description: 'Comprehensive STEM education empowering youth to become digital innovators. From robotics and coding to AI and cybersecurity, AvanTech builds foundational and advanced technical skills with real-world applications.',
    fullDescription: 'AvanTech is our flagship program designed to provide refugee and host-community youth with access to cutting-edge technology and digital skills. In a camp with limited connectivity and no coding infrastructure, we\'re building pathways to the digital economy. Our program combines hands-on robotics projects, web development, AI fundamentals, and cybersecurity training—all delivered by mentors from within our community.',
    details: [
      'Robotics & mechanical engineering (LEGO, Arduino)',
      'Web and mobile app development',
      'AI fundamentals and machine learning basics',
      'Cybersecurity and digital safety',
      'Freelancing platforms and digital entrepreneurship',
      'Hackathons and innovation competitions',
    ],
    impact: 'Participants gain access to in-demand digital economy skills, create income opportunities through freelancing, and position themselves as innovators solving community problems.',
    fullImpact: 'Youth in AvanTech develop marketable skills that are in high demand globally. Many participants have already generated income through freelance web development and digital work. The program builds not just technical skills but confidence, creativity, and entrepreneurial mindset—preparing participants for success in an increasingly digital world.',
    images: ['/robotics-bootcamp-1.jpg', '/robotics-bootcamp-2.jpg', '/robotics-bootcamp-3.jpg'],
    color: 'text-primary',
    slug: 'avantech',
    curriculum: [
      { phase: 'Phase 1: Foundations', duration: '4 weeks', content: 'Introduction to circuits, basic programming concepts, and problem-solving' },
      { phase: 'Phase 2: Building', duration: '6 weeks', content: 'Robotics projects, Arduino programming, and real-world applications' },
      { phase: 'Phase 3: Expansion', duration: '8 weeks', content: 'Web development, UI/UX design, and digital entrepreneurship' },
      { phase: 'Phase 4: Mastery', duration: 'Ongoing', content: 'Advanced projects, mentorship, and freelancing pathways' },
    ],
  },
  pekee: {
    id: 2,
    name: 'Pekee Models: Professional Performance',
    tagline: 'Runway Training & Talent Development',
    description: 'Professional modeling and performance program focused on runway training, confidence building, personal branding, and talent development. Exclusively dedicated to modeling and performance—not fashion design. Our cohort is 60% women and girls.',
    fullDescription: 'Pekee Models is a professional performance platform where young people from Kakuma learn runway skills, build confidence, and develop personal brands. Our program celebrates diversity, challenges traditional beauty standards, and creates economic opportunities through modeling and talent management. With 60% women and girls in our cohort, we\'re creating affirming spaces for underrepresented voices.',
    details: [
      'Professional runway technique and posture',
      'Portfolio development and photography',
      'Personal branding and public speaking',
      'Confidence building and stage presence',
      'Industry networking and connections',
      'Fashion show and event opportunities',
    ],
    impact: 'Youth develop professional presentation skills, build income through modeling opportunities, and gain confidence in their ability to present themselves globally.',
    fullImpact: 'Our models have performed at Pride galas, community events, and fashion shows. They\'re developing portfolios, earning income, and building networks with designers, photographers, and event organizers. Most importantly, they\'re reclaiming their narratives and celebrating their bodies and identities on their own terms.',
    images: ['/pekee-model1.jpg', '/pekee-model2.jpg', '/pekee-model3.jpg', '/pekee-model4.jpg', '/pekee-showcase.jpg', '/models-gala-additional.jpg'],
    color: 'text-secondary',
    slug: 'pekee',
    curriculum: [
      { phase: 'Foundation', duration: '3 weeks', content: 'Runway basics, posture, confidence building, and personal styling' },
      { phase: 'Portfolio', duration: '4 weeks', content: 'Professional photography shoots and portfolio development' },
      { phase: 'Performance', duration: '6 weeks', content: 'Live shows, event appearances, and branded collaborations' },
      { phase: 'Mastery', duration: 'Ongoing', content: 'Brand partnerships and income generation' },
    ],
  },
  miradede: {
    id: 3,
    name: 'Miradede: Fashion & Design',
    tagline: 'Garment Making & Sustainable Fashion',
    description: 'Creative program focused on fashion design, garment production, tailoring, and sustainable fashion innovation. From design to production, youth learn end-to-end fashion entrepreneurship.',
    fullDescription: 'Miradede brings fashion design and sustainable production to Kakuma. Our program teaches youth to design, cut, and produce quality garments using both traditional and modern techniques. We emphasize sustainable practices, ethical production, and building profitable fashion businesses.',
    details: [
      'Fashion design and sketching fundamentals',
      'Garment construction and tailoring',
      'Sustainable and eco-friendly design',
      'Upcycling and textile innovation',
      'Fashion business and entrepreneurship',
      'Collection development and showcases',
    ],
    impact: 'Participants develop marketable fashion skills, create income through tailoring and design services, and launch sustainable fashion businesses.',
    fullImpact: 'Miradede participants are producing collections of geometric-patterned bottoms and garments that showcase African design aesthetics. Many have launched their own tailoring businesses and are generating consistent income. The program demonstrates how cultural creativity can become economic opportunity.',
    images: ['/miradede-product-1.jpg', '/miradede-product-2.jpg', '/miradede-product-3.jpg'],
    color: 'text-secondary',
    slug: 'miradede',
    curriculum: [
      { phase: 'Design Fundamentals', duration: '3 weeks', content: 'Sketching, pattern-making, and design principles' },
      { phase: 'Production', duration: '5 weeks', content: 'Cutting, sewing, construction, and quality control' },
      { phase: 'Collections', duration: '6 weeks', content: 'Developing themed collections and sustainable practices' },
      { phase: 'Enterprise', duration: 'Ongoing', content: 'Running a tailoring business and expanding markets' },
    ],
  },
  'i-am-art': {
    id: 4,
    name: 'I Am Art: Visual & Creative Expression',
    tagline: 'Painting, Sculpture, Digital Art & More',
    description: 'Dedicated visual arts program exploring drawing, painting, sculpture, photography, digital art, murals, and community art projects. A space for emotional expression, healing, and creative development.',
    fullDescription: 'I Am Art is our healing and creative expression program. We provide space, materials, and mentorship for visual artists to process experiences, build identity, and contribute to community aesthetics. Our work includes studio practice, public murals, photography projects, and exhibitions.',
    details: [
      'Drawing, painting, and sculpture techniques',
      'Photography and digital art',
      'Mural and community public art',
      'Art exhibitions and showcases',
      'Art-based therapy and healing',
      'Gallery representation and artist development',
    ],
    impact: 'Youth process trauma through creative expression, build confidence and self-worth, develop professional art practices, and contribute to community cultural vibrancy.',
    fullImpact: 'Our artists are creating stunning visual work that documents community life, challenges narratives, and brings beauty to Kakuma. Several have exhibited work and received commissions for community murals.',
    images: ['/pekee-runway-training.jpg', '/pekee-mentorship.jpg', '/pekee-team-showcase.jpg'],
    color: 'text-accent',
    slug: 'i-am-art',
    curriculum: [
      { phase: 'Expression', duration: '4 weeks', content: 'Drawing, painting basics, and finding your voice' },
      { phase: 'Technique', duration: '6 weeks', content: 'Advanced skills in multiple mediums' },
      { phase: 'Community', duration: '6 weeks', content: 'Public art projects and mural work' },
      { phase: 'Exhibition', duration: 'Ongoing', content: 'Gallery shows and commissioned work' },
    ],
  },
  dance: {
    id: 5,
    name: 'Dance',
    tagline: 'Training, Choreography & Performance',
    description: 'After our performers stole the show at our June Pride event, we\'re formalizing Dance as its own program pillar. Our dancers deserve dedicated training time, choreography development, and a consistent performance platform.',
    fullDescription: 'Dance is a powerful form of expression and cultural celebration in our community. This emerging program provides structured training, choreography development, and performance opportunities. Our dancers performed beautifully at Pride and continue to inspire through movement.',
    details: [
      'Dance training across styles from the community',
      'Choreography development for showcases',
      'Rehearsal space and structured practice time',
      'Performance opportunities at Avan events',
      'Cross-collaboration with Music Studio',
      'Confidence and creative expression through movement',
    ],
    impact: 'Dancers develop professional performance skills, gain platforms for cultural expression, build community connections through shared movement, and explore dance as a livelihood path.',
    fullImpact: 'Our dancers connect body, mind, and spirit while sharing their cultural narratives. They\'re building performance skills and exploring dance as both personal practice and potential livelihood.',
    images: ['/pride-gala-runway.png', '/pekee-team-showcase.jpg'],
    color: 'text-accent',
    slug: 'dance',
    isEmerging: true,
    curriculum: [
      { phase: 'Foundations', duration: '3 weeks', content: 'Basic technique and body awareness' },
      { phase: 'Choreography', duration: '5 weeks', content: 'Developing original choreography' },
      { phase: 'Performance', duration: '4 weeks', content: 'Rehearsals and live performances' },
      { phase: 'Mastery', duration: 'Ongoing', content: 'Advanced technique and mentorship' },
    ],
  },
  'music-studio': {
    id: 6,
    name: 'Music Studio',
    tagline: 'Production, Songwriting & Recording',
    description: 'Our musicians performed at Pride, but had nowhere to record their work. We\'re building a fully equipped music studio so our musicians can turn live performance into lasting recorded material and income.',
    fullDescription: 'Music Studio is where our musicians transform live performance into recorded artistry. We\'re building recording infrastructure and production skills so young people can create professional-quality music, build portfolios, and generate income through their artistry.',
    details: [
      'Songwriting and composition training',
      'Recording, mixing, and music production',
      'Instrumental instruction across genres',
      'Collaboration with dancers and visual artists',
      'Portfolio development for income opportunities',
      'Studio equipment access and technical training',
    ],
    impact: 'Musicians create professional recordings, develop music production skills, build portfolios for income, and establish themselves as recording artists within and beyond Kakuma.',
    fullImpact: 'Our musicians are moving from one-time performances to recorded bodies of work. They\'re learning production, collaborating across programs, and positioning themselves as professional recording artists.',
    images: ['/music-gala-1.jpg', '/music-gala-2.jpg'],
    color: 'text-accent',
    slug: 'music-studio',
    isEmerging: true,
    curriculum: [
      { phase: 'Songwriting', duration: '4 weeks', content: 'Composition, lyrics, and arrangement basics' },
      { phase: 'Recording', duration: '6 weeks', content: 'Studio techniques, microphone placement, and sound design' },
      { phase: 'Production', duration: '6 weeks', content: 'Mixing, mastering, and post-production' },
      { phase: 'Release', duration: 'Ongoing', content: 'Distribution and income generation' },
    ],
  },
  'storytelling-podcast': {
    id: 7,
    name: 'Storytelling & Podcast',
    tagline: 'Narrative, Audio, & Oral History',
    description: 'Building on the storytelling work in I Am Art, we\'re creating a dedicated podcast room where writers, storytellers, and podcasters can record and share their stories in audio form.',
    fullDescription: 'Storytelling & Podcast amplifies refugee and host-community voices by capturing personal narratives, community histories, and cultural knowledge in audio format. We\'re building infrastructure and skills for storytellers to share their truth with wider audiences.',
    details: [
      'Podcast recording and production',
      'Oral storytelling and narrative writing',
      'Story development and curation',
      'Audio equipment and technical training',
      'Distribution and audience building',
      'Collaboration with I Am Art writers',
    ],
    impact: 'Writers and podcasters share their stories with wider audiences, develop audio production skills, build platforms for refugee and host-community voices, and create income opportunities through content.',
    fullImpact: 'Our storytellers are preserving community memory, challenging global narratives about displacement, and building platforms for authentic voices. Audio allows our stories to reach audiences beyond Kakuma.',
    images: ['/pekee-mentorship.jpg', '/pekee-runway-training.jpg'],
    color: 'text-accent',
    slug: 'storytelling-podcast',
    isEmerging: true,
    curriculum: [
      { phase: 'Story Development', duration: '3 weeks', content: 'Story structure, interviewing, and script writing' },
      { phase: 'Audio Production', duration: '4 weeks', content: 'Recording, editing, and sound design' },
      { phase: 'Curation', duration: '4 weeks', content: 'Episode sequencing and season planning' },
      { phase: 'Distribution', duration: 'Ongoing', content: 'Publishing, audience building, and growth' },
    ],
  },
};

export default function ProgramDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [isPartnershipModalOpen, setIsPartnershipModalOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const program = programsData[slug as keyof typeof programsData];

  useEffect(() => {
    if (!program) return;
    
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % program.images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [program]);

  if (!program) {
    return (
      <div className="w-full">
        <Header />
        <main className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Program Not Found</h1>
            <Link href="/programs">
              <button className="px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition">
                Back to Programs
              </button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="w-full">
      <Header />
      <main>
        {/* Breadcrumb */}
        <div className="bg-muted/30 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/programs" className="text-secondary hover:underline">
              ← Back to Programs
            </Link>
          </div>
        </div>

        {/* Hero Section with Image */}
        <section className="relative h-96 sm:h-[500px] overflow-hidden">
          {program.images.map((img, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-700 ${
                idx === imageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={img}
                alt={program.name}
                fill
                className="object-cover"
                priority={idx === 0}
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-12 text-white">
            <p className={`${program.color} uppercase text-sm font-bold tracking-widest mb-2`}>
              Program Details
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">{program.name}</h1>
            <p className="text-xl text-white/90">{program.tagline}</p>
          </div>
        </section>

        {/* Program Overview */}
        <section className="py-12 sm:py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">Overview</h2>
                <p className="text-lg text-foreground/75 mb-6 leading-relaxed">
                  {program.fullDescription}
                </p>

                {/* What's Included */}
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-foreground mb-6">What&apos;s Included</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {program.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start p-4 rounded-lg bg-muted/30 border border-border">
                        <span className={`${program.color} mr-3 font-bold text-lg mt-1`}>✓</span>
                        <span className="text-foreground/75">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Curriculum */}
                {program.curriculum && (
                  <div className="mb-12">
                    <h3 className="text-2xl font-bold text-foreground mb-6">Program Curriculum</h3>
                    <div className="space-y-4">
                      {program.curriculum.map((phase, idx) => (
                        <div key={idx} className="border-l-4 border-secondary pl-6 py-2">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-foreground">{phase.phase}</h4>
                            <span className="text-secondary text-sm font-semibold">{phase.duration}</span>
                          </div>
                          <p className="text-foreground/70">{phase.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Impact Section */}
                <div className="bg-muted/50 rounded-lg p-8 border border-border">
                  <h3 className="text-2xl font-bold text-foreground mb-4">Impact & Outcomes</h3>
                  <p className="text-lg text-foreground/75 leading-relaxed">
                    {program.fullImpact}
                  </p>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                {(program as any).isEmerging && (
                  <div className="bg-accent/20 rounded-lg p-6 border border-accent/30 mb-6">
                    <span className="inline-block bg-accent text-white px-4 py-2 rounded-full text-sm font-semibold mb-3">
                      Emerging Initiative
                    </span>
                    <p className="text-foreground/80">This program is newly launched and expanding. Your support helps us grow this initiative.</p>
                  </div>
                )}

                <div className="bg-primary/10 rounded-lg p-6 border border-primary/30">
                  <h3 className="font-bold text-foreground mb-4">Get Involved</h3>
                  <p className="text-foreground/75 mb-6">Interested in supporting this program through mentorship, skills training, or resources?</p>
                  <button
                    onClick={() => setIsPartnershipModalOpen(true)}
                    className="w-full px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition"
                  >
                    Let&apos;s Talk
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 bg-secondary text-secondary-foreground">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Support {program.name}
            </h2>
            <p className="text-lg text-secondary-foreground/90 mb-8">
              Help us expand this program, invest in equipment and materials, or mentor our participants.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setIsPartnershipModalOpen(true)}
                className="px-8 py-3 rounded-lg bg-white text-secondary font-semibold hover:bg-secondary-foreground/10 transition"
              >
                Partner With Us
              </button>
              <Link href="/programs">
                <button className="px-8 py-3 rounded-lg border-2 border-secondary-foreground text-secondary-foreground font-semibold hover:bg-secondary-foreground/10 transition">
                  View All Programs
                </button>
              </Link>
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
