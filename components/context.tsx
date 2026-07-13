'use client';

import Image from 'next/image';

export default function Context() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-background to-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-secondary uppercase text-sm font-bold tracking-widest mb-4">Why We Exist</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              The <span className="text-secondary">Kakuma Context</span>
            </h1>
            <p className="text-xl text-foreground/70">
              To understand Avan Makerspace, you need to understand Kakuma Refugee Camp—one of the world&apos;s largest and longest-running displacement settings, and home to exceptional young people facing extraordinary constraints.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="py-16 sm:py-24 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-secondary mb-2">30+</div>
              <p className="text-foreground/70">Years Since Establishment (since 1992)</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-accent mb-2">100K+</div>
              <p className="text-foreground/70">Refugees & Asylum Seekers from Multiple Nations</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">60%</div>
              <p className="text-foreground/70">Population Under 25 Years Old</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-secondary mb-2">Severe</div>
              <p className="text-foreground/70">Movement Restrictions & Economic Constraints</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Kakuma */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative h-96 sm:h-full min-h-96 order-2 lg:order-1">
              <Image
                src="/real-robotics2.jpg"
                alt="Kakuma youth learning"
                fill
                className="object-cover rounded-xl shadow-lg"
              />
              <div className="absolute inset-0 rounded-xl border-2 border-secondary/20" />
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-bold text-foreground mb-6">About Kakuma Refugee Camp</h2>
              <div className="space-y-4 text-foreground/75 leading-relaxed">
                <p>
                  Kakuma Refugee Camp was established in 1992 in northwestern Turkana County, Kenya, initially to host unaccompanied minors fleeing conflict in Sudan. More than three decades later, it remains one of the largest and longest-running refugee hosting areas in the world.
                </p>
                <p>
                  The camp is home to several hundred thousand refugees and asylum seekers from South Sudan, Somalia, Ethiopia, the Democratic Republic of Congo, Burundi, and elsewhere. Many residents were born in the camp and have known no other home; others have lived there for two or three decades.
                </p>
                <p>
                  Turkana County itself is among the poorest and most arid regions of Kenya. Decades of coexistence between refugees and host Turkana communities have produced both friction over resources and a genuinely mixed local economy, with refugees and host-community members increasingly working and collaborating together.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Youth Opportunity Gap */}
      <section className="py-16 sm:py-24 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">The Opportunity Gap</h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              For young people growing up in Kakuma, opportunity is scarce. Here&apos;s why Avan Makerspace exists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Challenge 1 */}
            <div className="bg-background rounded-xl p-8 border border-accent/20">
              <div className="text-3xl mb-4">💼</div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Limited Formal Employment</h3>
              <p className="text-foreground/70">
                Job opportunities within Kakuma are extremely limited. Most income-generating activities are informal, small-scale, and low-wage, leaving youth with few pathways to dignified livelihoods.
              </p>
            </div>

            {/* Challenge 2 */}
            <div className="bg-background rounded-xl p-8 border border-secondary/20">
              <div className="text-3xl mb-4">🚫</div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Restricted Movement</h3>
              <p className="text-foreground/70">
                Movement outside the camp is restricted. Youth cannot freely explore opportunities in Kenya or beyond, limiting their ability to study, work, or build networks beyond camp boundaries.
              </p>
            </div>

            {/* Challenge 3 */}
            <div className="bg-background rounded-xl p-8 border border-primary/20">
              <div className="text-3xl mb-4">🌍</div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Rare Resettlement Pathways</h3>
              <p className="text-foreground/70">
                Resettlement to a third country—once a common pathway out—has become rare. Most young people must build their futures within the camp, not outside it.
              </p>
            </div>

            {/* Challenge 4 */}
            <div className="bg-background rounded-xl p-8 border border-accent/20">
              <div className="text-3xl mb-4">🎓</div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Aid-Focused Programming</h3>
              <p className="text-foreground/70">
                Humanitarian assistance, while essential for survival, is not designed to build careers, launch enterprises, or nurture creative talent. The gap is where Avan Makerspace steps in.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Matters */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">Why This Matters for Partners</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Point 1 */}
            <div className="flex gap-6">
              <div className="text-4xl font-bold text-secondary min-w-fit">01</div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Largest Youth Concentration</h3>
                <p className="text-foreground/70">
                  Kakuma hosts one of the world&apos;s largest concentrations of displaced youth, with a substantial share of the population under 25. The need for opportunity is enormous and proven.
                </p>
              </div>
            </div>

            {/* Point 2 */}
            <div className="flex gap-6">
              <div className="text-4xl font-bold text-accent min-w-fit">02</div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Locally Rooted Livelihoods</h3>
                <p className="text-foreground/70">
                  Restricted movement and formal employment means locally rooted livelihood pathways—through technology, creativity, and entrepreneurship—are essential. This is not aspirational; it&apos;s necessary.
                </p>
              </div>
            </div>

            {/* Point 3 */}
            <div className="flex gap-6">
              <div className="text-4xl font-bold text-primary min-w-fit">03</div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Bridge-Building Potential</h3>
                <p className="text-foreground/70">
                  A genuine, if sometimes strained, host-community relationship exists. Programs that intentionally bring refugee and Turkana youth together create meaningful relationships and economic interdependence.
                </p>
              </div>
            </div>

            {/* Point 4 */}
            <div className="flex gap-6">
              <div className="text-4xl font-bold text-secondary min-w-fit">04</div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Unmet Demand at Scale</h3>
                <p className="text-foreground/70">
                  Very few technology, fashion, and creative-arts programs operate at scale in Kakuma. The demand vastly exceeds current supply—Avan Makerspace helps close that critical gap.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Response */}
      <section className="py-16 sm:py-24 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-foreground mb-6">Our Response</h2>
            <p className="text-xl text-foreground/70 mb-8">
              Avan Makerspace exists to transform how Kakuma&apos;s youth experience possibility and opportunity.
            </p>
            <div className="bg-background rounded-xl p-12 border-2 border-secondary/30">
              <p className="text-2xl font-bold text-foreground leading-relaxed">
                We&apos;re turning a place too often defined by what it lacks into a place recognized for what its young people can build.
              </p>
              <p className="text-lg text-foreground/70 mt-6">
                Through technology, creativity, entrepreneurship, and practical learning—delivered by and for the community—we&apos;re building pathways to dignity, resilience, and lasting transformation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
