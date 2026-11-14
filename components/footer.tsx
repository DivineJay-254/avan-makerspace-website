'use client';

import { useState } from 'react';
import Link from 'next/link';
import PartnershipModal from '@/components/partnership-modal';
import { useSiteSettings } from '@/components/site-settings-provider';
import { defaultSocialLinks } from '@/lib/firebase/types'
import { NewsletterForm } from '@/components/public/newsletter-form'
;

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [isPartnershipModalOpen, setIsPartnershipModalOpen] = useState(false);
  const settings = useSiteSettings();
  const socialLinks = [
    { label: 'TikTok', href: settings?.socialTikTok ?? defaultSocialLinks.socialTikTok },
    { label: 'Facebook', href: settings?.socialFacebook ?? defaultSocialLinks.socialFacebook },
    { label: 'Instagram', href: settings?.socialInstagram ?? defaultSocialLinks.socialInstagram },
    { label: 'LinkedIn', href: settings?.socialLinkedin ?? defaultSocialLinks.socialLinkedin },
  ].filter((link) => Boolean(link.href));

  return (
    <footer className="bg-footer-background text-footer-foreground" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Newsletter Section */}
        <div className="mb-16 pb-16 border-b border-footer-foreground/20">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-4">Stay Connected to Our Impact</h3>
            <p className="text-footer-foreground/80 mb-6">
              Subscribe to receive monthly impact updates, program innovations, partnership opportunities, and stories of transformation from Kakuma youth.
            </p>
            <NewsletterForm />
            <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/news" className="rounded-lg border border-footer-foreground/40 px-6 py-3 font-semibold transition hover:bg-footer-foreground/10">Read our news</Link>
              <Link href="/events" className="rounded-lg border border-footer-foreground/40 px-6 py-3 font-semibold transition hover:bg-footer-foreground/10">Explore events</Link>
            </div>
          </div>
        </div>

        {/* Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold">A</span>
              </div>
              <span className="font-bold text-lg">Avan Makerspace</span>
            </div>
            <p className="text-footer-foreground/80 text-sm mb-6">
              {settings?.footerText || 'Create. Express. Belong. Avan Makerspace is a refugee-led, inclusive innovation and creativity hub based in Kakuma Refugee Camp, Kenya. We empower young people from refugee and host communities through technology, robotics, entrepreneurship, arts, and creative learning.'}
            </p>
            <nav className="flex items-center gap-4" aria-label="Avan Makerspace social profiles">
              {socialLinks.map(({ label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-footer-foreground/75 transition hover:text-footer-foreground hover:underline hover:underline-offset-4" aria-label={label}>
                  {label}
                </a>
              ))}
            </nav>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-semibold text-footer-foreground mb-4">Our Programs</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/programs" className="text-footer-foreground/75 hover:text-footer-foreground transition">
                  AvanTech: Digital Innovation
                </Link>
              </li>
              <li>
                <Link href="/programs" className="text-footer-foreground/75 hover:text-footer-foreground transition">
                  Miradede: Fashion & Design
                </Link>
              </li>
              <li>
                <Link href="/programs" className="text-footer-foreground/75 hover:text-footer-foreground transition">
                  I Am Art: Visual Arts
                </Link>
              </li>
              <li>
                <Link href="/programs" className="text-footer-foreground/75 hover:text-footer-foreground transition">
                  Entrepreneurship & Livelihoods
                </Link>
              </li>
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h4 className="font-semibold text-footer-foreground mb-4">Ways to Help</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/get-involved" className="text-footer-foreground/75 hover:text-footer-foreground transition">
                  Donate
                </Link>
              </li>
              <li>
                <Link href="/get-involved" className="text-footer-foreground/75 hover:text-footer-foreground transition">
                  Become a Mentor
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => setIsPartnershipModalOpen(true)}
                  className="text-footer-foreground/75 hover:text-footer-foreground transition text-left"
                >
                  Partner With Us
                </button>
              </li>
              <li>
                <Link href="/get-involved" className="text-footer-foreground/75 hover:text-footer-foreground transition">
                  Volunteer
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-footer-foreground mb-4">Contact</h4>
            <ul className="space-y-4 text-footer-foreground/75 text-sm">
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{settings?.location || 'Kakuma Refugee Camp, Kenya'}</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href={`mailto:${settings?.contactEmail || 'info@avanmakerspace.org'}`} className="hover:text-footer-foreground transition">
                  {settings?.contactEmail || 'info@avanmakerspace.org'}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-footer-foreground/20 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center text-footer-foreground/75 text-sm">
            <p>&copy; {currentYear} Avan Makerspace. A refugee-led, inclusive innovation and creativity hub. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <Link href="/privacy-policy" className="hover:text-footer-foreground transition">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="hover:text-footer-foreground transition">
                Terms of Service
              </Link>
              <Link href="/impact-report" className="hover:text-footer-foreground transition">
                Impact Report
              </Link>
            </div>
          </div>
        </div>
      </div>
      <PartnershipModal 
        isOpen={isPartnershipModalOpen} 
        onClose={() => setIsPartnershipModalOpen(false)} 
      />
    </footer>
  );
}
