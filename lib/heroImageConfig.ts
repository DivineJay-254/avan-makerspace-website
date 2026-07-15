/**
 * Centralized hero image configuration
 * Easily add, remove, or update images without modifying component code
 * Each image includes descriptive alt text for accessibility
 */

export interface HeroImage {
  src: string;
  alt: string;
  program?: string;
}

export const HERO_IMAGES: HeroImage[] = [
  // Pekee Models - Fashion & Runway
  {
    src: '/pekee-team-showcase.jpg',
    alt: 'Pekee Models team showcase on runway',
    program: 'Pekee Models',
  },
  {
    src: '/pekee-runway-training.jpg',
    alt: 'Pekee Models training session on runway',
    program: 'Pekee Models',
  },
  {
    src: '/pekee-mentorship.jpg',
    alt: 'Pekee Models mentorship moment',
    program: 'Pekee Models',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avan3-Jwap2S2QBj8r6eDH8X0wnSc1APVE8y.png',
    alt: 'Pekee Models performer in purple ensemble with geometric patterns',
    program: 'Pekee Models',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avan8-4eVFgwBHUNnX3ZlghjMtRK4E2GTEK7.png',
    alt: 'Pekee Models runway presentation with white textured dress',
    program: 'Pekee Models',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avan2-CYqp8YlkxLFQwk3V3ZREkKqLiW19CX.png',
    alt: 'Pekee Models striking pose in colorful multi-patterned outfit',
    program: 'Pekee Models',
  },

  // AvanTech - Robotics & Innovation
  {
    src: '/robotics-bootcamp-1.jpg',
    alt: 'AvanTech robotics bootcamp hands-on learning session',
    program: 'AvanTech',
  },
  {
    src: '/robotics-bootcamp-2.jpg',
    alt: 'AvanTech youth coding and innovation workshop',
    program: 'AvanTech',
  },
  {
    src: '/robotics-bootcamp-3.jpg',
    alt: 'AvanTech innovation and robotics training demonstration',
    program: 'AvanTech',
  },

  // Pride Gala Dinner - Community & Celebration
  {
    src: '/pride-gala-runway.png',
    alt: 'Pride Gala Dinner runway performance celebrating LGBTQ+ youth',
    program: 'Pride Gala Dinner',
  },
  {
    src: '/pride-gala-group.jpg',
    alt: 'Pride Gala Dinner youth celebration with golden masks',
    program: 'Pride Gala Dinner',
  },
  {
    src: '/pride-gala-celebration.jpg',
    alt: 'Pride Gala Dinner community gathering and celebration',
    program: 'Pride Gala Dinner',
  },
  {
    src: '/pride-gala-speaker.jpg',
    alt: 'Pride Gala Dinner youth speaker with geometric patterns',
    program: 'Pride Gala Dinner',
  },
  {
    src: '/pride-gala-moment.jpg',
    alt: 'Pride Gala Dinner intimate moment during dinner event',
    program: 'Pride Gala Dinner',
  },
];

/**
 * Get a randomized order of hero images
 * Ensures the rotation doesn't always start with the same images
 */
export function getRandomizedHeroImages(): HeroImage[] {
  const shuffled = [...HERO_IMAGES];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Get images filtered by program (optional for future use)
 */
export function getImagesByProgram(program: string): HeroImage[] {
  return HERO_IMAGES.filter((img) => img.program === program);
}
