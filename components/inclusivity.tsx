export default function Inclusivity() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-r from-secondary/5 to-accent/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-secondary uppercase text-sm font-bold tracking-widest mb-3">Our Commitment</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            LGBTQ+-Affirming & Inclusive
          </h2>
          <p className="text-foreground/85 font-medium text-lg max-w-3xl mx-auto leading-relaxed">
            Avan Makerspace is proudly LGBTQ+-affirming and celebrates the diverse identities within our community. We have queer and trans team members across all departments, and we actively work to create safe, welcoming spaces for all youth.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Safety & Respect */}
          <div className="bg-background rounded-xl p-8 border-2 border-secondary/30 hover:border-secondary hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-4xl mb-4">🏳️‍🌈</div>
            <h3 className="text-xl font-bold text-foreground mb-3">Safety & Respect</h3>
            <p className="text-foreground/85 font-medium">
              All youth—regardless of sexual orientation or gender identity—are safe, respected, and celebrated at Avan Makerspace.
            </p>
          </div>

          {/* Authentic Expression */}
          <div className="bg-background rounded-xl p-8 border-2 border-accent/30 hover:border-accent hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-4xl mb-4">✨</div>
            <h3 className="text-xl font-bold text-foreground mb-3">Authentic Expression</h3>
            <p className="text-foreground/85 font-medium">
              We encourage youth to express their true selves through creative work, free from judgment or discrimination.
            </p>
          </div>

          {/* Diverse Leadership */}
          <div className="bg-background rounded-xl p-8 border-2 border-primary/30 hover:border-primary hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-xl font-bold text-foreground mb-3">Diverse Leadership</h3>
            <p className="text-foreground/85 font-medium">
              Our team includes LGBTQ+ leaders and mentors across all departments, providing role models and advocacy.
            </p>
          </div>

          {/* Community Care */}
          <div className="bg-background rounded-xl p-8 border-2 border-secondary/30 hover:border-secondary hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-bold text-foreground mb-3">Community Care</h3>
            <p className="text-foreground/85 font-medium">
              We actively support LGBTQ+ youth, including those facing vulnerability, discrimination, or social isolation.
            </p>
          </div>

          {/* Education & Advocacy */}
          <div className="bg-background rounded-xl p-8 border-2 border-accent/30 hover:border-accent hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-foreground mb-3">Education & Advocacy</h3>
            <p className="text-foreground/85 font-medium">
              We work to build allyship and understanding across communities, challenging discrimination and promoting equality.
            </p>
          </div>

          {/* Intersection & Solidarity */}
          <div className="bg-background rounded-xl p-8 border-2 border-primary/30 hover:border-primary hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-4xl mb-4">💪</div>
            <h3 className="text-xl font-bold text-foreground mb-3">Intersectionality</h3>
            <p className="text-foreground/85 font-medium">
              We recognize and honor the complex identities of our community, supporting youth across race, gender, sexuality, and background.
            </p>
          </div>
        </div>

        {/* Call-to-Action */}
        <div className="bg-primary text-primary-foreground rounded-xl p-12 text-center animate-fade-in">
          <h3 className="text-3xl font-bold mb-4">Everyone Belongs Here</h3>
          <p className="text-primary-foreground/90 font-medium text-lg mb-8 max-w-2xl mx-auto">
            If you are LGBTQ+, questioning, or an ally seeking a space to create and belong, Avan Makerspace is for you. Join our community and transform your talent into opportunity.
          </p>
          <button className="inline-flex items-center px-8 py-3 rounded-lg bg-accent hover:bg-accent/90 text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Join Our Community
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
