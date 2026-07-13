'use client';

import Image from 'next/image';

export default function Approach() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-background to-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-secondary uppercase text-sm font-bold tracking-widest mb-4">How We Work</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Our Approach in <span className="text-secondary">Practice</span>
            </h1>
            <p className="text-xl text-foreground/70">
              Across all our programs, several design principles shape how Avan Makerspace delivers its work—rooted in community leadership, practical skills, and a commitment to showcasing youth talent.
            </p>
          </div>
        </div>
      </section>

      {/* Principle 1: Peer & Mentor-Led Delivery */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full font-semibold mb-4">
                Principle 1
              </div>
              <h2 className="text-4xl font-bold text-foreground mb-6">Peer & Mentor-Led Delivery</h2>
              <p className="text-lg text-foreground/70 mb-6 leading-relaxed">
                Much of our training is delivered by community members and mentors who share participants' backgrounds and experiences. This isn't coincidental—it&apos;s by design.
              </p>
              <ul className="space-y-4 text-foreground/75">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold text-xl flex-shrink-0">✓</span>
                  <span>Mentors understand the constraints participants face—restricted movement, limited resources, trauma of displacement</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold text-xl flex-shrink-0">✓</span>
                  <span>Shared identity and experience build trust and relevance faster than external instructors</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold text-xl flex-shrink-0">✓</span>
                  <span>Peer mentors become role models—tangible proof that the path is possible</span>
                </li>
              </ul>
            </div>

            {/* Image */}
            <div className="relative h-96 sm:h-full min-h-96">
              <Image
                src="/real-robotics1.jpg"
                alt="Mentor-led training"
                fill
                className="object-cover rounded-xl shadow-lg"
              />
              <div className="absolute inset-0 rounded-xl border-2 border-primary/20" />
            </div>
          </div>
        </div>
      </section>

      {/* Principle 2: Showcasing, Not Just Training */}
      <section className="py-16 sm:py-24 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:auto-cols-max">
            {/* Image */}
            <div className="relative h-96 sm:h-full min-h-96 order-2 lg:order-1">
              <Image
                src="/real-art3.jpg"
                alt="Youth showcase"
                fill
                className="object-cover rounded-xl shadow-lg"
              />
              <div className="absolute inset-0 rounded-xl border-2 border-secondary/20" />
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <div className="inline-block bg-secondary/10 text-secondary px-4 py-2 rounded-full font-semibold mb-4">
                Principle 2
              </div>
              <h2 className="text-4xl font-bold text-foreground mb-6">Showcasing, Not Just Training</h2>
              <p className="text-lg text-foreground/70 mb-6 leading-relaxed">
                Every program culminates in a public moment where participants display their work and build recognition. Training is important, but a public stage changes everything.
              </p>
              <div className="bg-secondary/10 rounded-lg p-6 mb-6 border border-secondary/20">
                <p className="text-foreground font-semibold mb-3">Real examples from Avan:</p>
                <ul className="space-y-2 text-foreground/70">
                  <li>Miradede collection showcases at fashion shows</li>
                  <li>Pekee Models runway performances</li>
                  <li>I Am Art exhibitions and gallery events</li>
                  <li>Pride event performances by dancers and musicians</li>
                  <li>Tech boot camp demo days and hackathon competitions</li>
                </ul>
              </div>
              <p className="text-foreground/75">
                These aren't extras—they&apos;re central to the program. A showcase gives participants something concrete to work toward, builds portfolio pieces, and lets them experience themselves as creators worthy of an audience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Principle 3: Cross-Pillar Collaboration */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <div className="inline-block bg-accent/10 text-accent px-4 py-2 rounded-full font-semibold mb-4">
                Principle 3
              </div>
              <h2 className="text-4xl font-bold text-foreground mb-6">Cross-Pillar Collaboration</h2>
              <p className="text-lg text-foreground/70 mb-6 leading-relaxed">
                Because AvanTech, Miradede, Pekee Models, and I Am Art operate under one hub—not as separate silos—participants constantly collaborate across disciplines.
              </p>
              <div className="bg-accent/10 rounded-lg p-6 border border-accent/20">
                <p className="text-foreground font-semibold mb-3">How this plays out:</p>
                <ul className="space-y-3 text-foreground/70 text-sm">
                  <li>Technologists build websites for Miradede fashion showcases</li>
                  <li>Illustrators design print and visual branding for collections</li>
                  <li>Media creators produce promotional content for all program showcases</li>
                  <li>Dancers and musicians collaborate on original performances</li>
                  <li>Entrepreneurship participants develop business models for creative work</li>
                </ul>
              </div>
              <p className="text-foreground/75 mt-6">
                This cross-pollination mimics real-world creative and tech industries, where collaboration across disciplines is the norm, not the exception.
              </p>
            </div>

            {/* Image */}
            <div className="relative h-96 sm:h-full min-h-96">
              <Image
                src="/real-robotics2.jpg"
                alt="Cross-pillar collaboration"
                fill
                className="object-cover rounded-xl shadow-lg"
              />
              <div className="absolute inset-0 rounded-xl border-2 border-accent/20" />
            </div>
          </div>
        </div>
      </section>

      {/* Principle 4: Bridging Communities */}
      <section className="py-16 sm:py-24 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:auto-cols-max">
            {/* Image */}
            <div className="relative h-96 sm:h-full min-h-96 order-2 lg:order-1">
              <Image
                src="/real-art1.jpg"
                alt="Community building"
                fill
                className="object-cover rounded-xl shadow-lg"
              />
              <div className="absolute inset-0 rounded-xl border-2 border-primary/20" />
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full font-semibold mb-4">
                Principle 4
              </div>
              <h2 className="text-4xl font-bold text-foreground mb-6">Bridging Refugee & Host Communities</h2>
              <p className="text-lg text-foreground/70 mb-6 leading-relaxed">
                Kakuma has experienced friction between refugee and Turkana host communities. All Avan programs are intentionally open to both groups, using shared creative and technical work as a bridge.
              </p>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <span className="text-2xl font-bold text-primary flex-shrink-0">→</span>
                  <div>
                    <p className="font-semibold text-foreground mb-1">Low-Friction Connection</p>
                    <p className="text-foreground/70 text-sm">Working together on a design project or coding challenge is less charged than formal community dialogue</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-2xl font-bold text-secondary flex-shrink-0">→</span>
                  <div>
                    <p className="font-semibold text-foreground mb-1">Shared Recognition</p>
                    <p className="text-foreground/70 text-sm">When refugee and host youth create something together and present it publicly, both groups see themselves as creators and contributors</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-2xl font-bold text-accent flex-shrink-0">→</span>
                  <div>
                    <p className="font-semibold text-foreground mb-1">Economic Interdependence</p>
                    <p className="text-foreground/70 text-sm">As participants launch businesses and enterprises, they source from and sell to each other, creating mutual benefit</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Principle 5: Resource-Conscious Design */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <div className="inline-block bg-secondary/10 text-secondary px-4 py-2 rounded-full font-semibold mb-4">
                Principle 5
              </div>
              <h2 className="text-4xl font-bold text-foreground mb-6">Resource-Conscious Design</h2>
              <p className="text-lg text-foreground/70 mb-6 leading-relaxed">
                We reached 200+ young people without external funding. That constraint was also our strength—it forced us to build efficient, scalable programs from the ground up.
              </p>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">What this means:</h4>
                  <ul className="space-y-2 text-foreground/75">
                    <li className="flex items-start gap-3">
                      <span className="text-secondary font-bold flex-shrink-0">•</span>
                      <span>We maximize borrowed, donated, and volunteer resources</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-secondary font-bold flex-shrink-0">•</span>
                      <span>We design programs that work at different scales—small groups or large cohorts</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-secondary font-bold flex-shrink-0">•</span>
                      <span>We treat every resource entrusted to us as an opportunity to be maximized, not simply spent</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-secondary/10 rounded-lg p-6 border border-secondary/20">
                  <p className="text-foreground/70 italic">
                    &quot;Having delivered 200+ youth without external funding, our programs are built to make efficient use of whatever equipment, space, and volunteer time is available, scaling up smoothly as additional resources are secured.&quot;
                  </p>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="relative h-96 sm:h-full min-h-96">
              <Image
                src="/real-art.jpg"
                alt="Resource-conscious design"
                fill
                className="object-cover rounded-xl shadow-lg"
              />
              <div className="absolute inset-0 rounded-xl border-2 border-secondary/20" />
            </div>
          </div>
        </div>
      </section>

      {/* Summary Section */}
      <section className="py-16 sm:py-24 bg-muted/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-background rounded-xl p-12 border-2 border-accent/30">
            <h2 className="text-3xl font-bold text-foreground mb-6 text-center">These Principles Together</h2>
            <p className="text-lg text-foreground/75 leading-relaxed text-center">
              These five principles—peer mentorship, showcasing, collaboration, community-bridging, and resourcefulness—work together to create a learning environment where displaced youth aren't treated as beneficiaries waiting for help, but as capable innovators and creators with something valuable to contribute. That shift in perspective changes everything.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
