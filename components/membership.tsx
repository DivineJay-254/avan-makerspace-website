'use client';

import { Button } from '@/components/ui/button';

const plans = [
  {
    id: 1,
    name: 'Casual',
    price: '$49',
    period: '/month',
    description: 'Perfect for occasional makers',
    features: [
      'Access during business hours',
      'Basic tool training included',
      'Community member access',
      'Member events',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    id: 2,
    name: 'Pro',
    price: '$129',
    period: '/month',
    description: 'For serious makers and creators',
    features: [
      '24/7 facility access',
      'Advanced tool certification',
      'Private locker space',
      'Priority workshop registration',
      'Monthly member showcase',
      'Mentorship program access',
    ],
    cta: 'Start Building',
    highlighted: true,
  },
  {
    id: 3,
    name: 'Studio',
    price: '$249',
    period: '/month',
    description: 'Dedicated workspace for professionals',
    features: [
      'Dedicated studio space',
      'All Pro benefits included',
      'Premium equipment access',
      '1-on-1 mentorship sessions',
      'Business networking events',
      'First access to new equipment',
    ],
    cta: 'Reserve Studio',
    highlighted: false,
  },
];

export default function Membership() {
  return (
    <section id="membership" className="py-16 sm:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-accent uppercase text-sm font-semibold tracking-wide mb-2">Join Our Community</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Simple, Flexible Pricing
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Choose the membership that fits your creative journey. All memberships include community access and support.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-lg overflow-hidden transition-all duration-300 ${
                plan.highlighted
                  ? 'md:scale-105 bg-primary text-primary-foreground shadow-2xl'
                  : 'bg-background border border-border hover:shadow-lg'
              }`}
            >
              {/* Highlight Badge */}
              {plan.highlighted && (
                <div className="absolute top-0 right-0 bg-accent text-accent-foreground px-4 py-1 text-sm font-semibold rounded-bl-lg">
                  Most Popular
                </div>
              )}

              <div className="p-8">
                {/* Plan Name */}
                <h3 className={`text-2xl font-bold mb-2 ${!plan.highlighted && 'text-foreground'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-6 ${plan.highlighted ? 'text-primary-foreground/80' : 'text-muted'}`}>
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-8">
                  <span className={`text-4xl font-bold ${!plan.highlighted && 'text-foreground'}`}>
                    {plan.price}
                  </span>
                  <span className={`text-sm ml-2 ${plan.highlighted ? 'text-primary-foreground/80' : 'text-muted'}`}>
                    {plan.period}
                  </span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <svg
                        className={`w-5 h-5 mr-3 flex-shrink-0 ${
                          plan.highlighted ? 'text-accent' : 'text-primary'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className={`text-sm ${plan.highlighted ? 'text-primary-foreground' : 'text-foreground'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  className={`w-full ${
                    plan.highlighted
                      ? 'bg-accent hover:bg-accent/90 text-accent-foreground'
                      : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                  }`}
                >
                  {plan.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
            Common Questions
          </h3>
          <div className="space-y-6">
            <details className="group rounded-lg border border-border p-6 hover:bg-muted/50 transition-colors cursor-pointer">
              <summary className="flex items-center justify-between font-semibold text-foreground">
                <span>Can I upgrade or downgrade my membership?</span>
                <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </summary>
              <p className="text-muted mt-4">
                Yes! You can change your membership plan at any time. Changes will be reflected in your next billing cycle.
              </p>
            </details>

            <details className="group rounded-lg border border-border p-6 hover:bg-muted/50 transition-colors cursor-pointer">
              <summary className="flex items-center justify-between font-semibold text-foreground">
                <span>Is there a commitment period?</span>
                <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </summary>
              <p className="text-muted mt-4">
                No! All memberships are month-to-month with no long-term commitment. Cancel anytime.
              </p>
            </details>

            <details className="group rounded-lg border border-border p-6 hover:bg-muted/50 transition-colors cursor-pointer">
              <summary className="flex items-center justify-between font-semibold text-foreground">
                <span>What training is included?</span>
                <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </summary>
              <p className="text-muted mt-4">
                All memberships include basic safety and tool training. Pro and Studio members get access to advanced certifications and workshops.
              </p>
            </details>
          </div>
        </div>
      </div>
    </section>
  );
}
