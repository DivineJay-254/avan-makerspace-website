'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import PartnershipModal from '@/components/partnership-modal';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPartnershipModalOpen, setIsPartnershipModalOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-transparent border-b-0">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - Left */}
          <Link href="/" className="flex items-center">
            <Image
              src="/avan-logo.png"
              alt="Avan Makerspace"
              width={70}
              height={70}
              className="h-16 w-auto"
            />
          </Link>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Desktop Navigation - Right */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/about" className="text-foreground hover:text-secondary transition font-medium">
              About
            </Link>
            <Link href="/context" className="text-foreground hover:text-secondary transition font-medium">
              Context
            </Link>
            <Link href="/programs" className="text-foreground hover:text-secondary transition font-medium">
              Programs
            </Link>
            <Link href="/approach" className="text-foreground hover:text-secondary transition font-medium">
              Approach
            </Link>
            <Link href="/impact" className="text-foreground hover:text-secondary transition font-medium">
              Impact
            </Link>
            <Link href="/support" className="text-foreground hover:text-secondary transition font-medium">
              Support
            </Link>
            <Link href="/get-involved" className="text-foreground hover:text-secondary transition font-medium">
              Get Involved
            </Link>
            {/* CTA Button */}
            <Button 
              onClick={() => setIsPartnershipModalOpen(true)}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              Partner
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-muted rounded-lg transition"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 space-y-2 pb-4">
            <Link
              href="/about"
              className="block px-3 py-2 rounded-lg hover:bg-muted transition font-medium"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/context"
              className="block px-3 py-2 rounded-lg hover:bg-muted transition font-medium"
              onClick={() => setIsOpen(false)}
            >
              Context
            </Link>
            <Link
              href="/programs"
              className="block px-3 py-2 rounded-lg hover:bg-muted transition font-medium"
              onClick={() => setIsOpen(false)}
            >
              Programs
            </Link>
            <Link
              href="/approach"
              className="block px-3 py-2 rounded-lg hover:bg-muted transition font-medium"
              onClick={() => setIsOpen(false)}
            >
              Approach
            </Link>
            <Link
              href="/impact"
              className="block px-3 py-2 rounded-lg hover:bg-muted transition font-medium"
              onClick={() => setIsOpen(false)}
            >
              Impact
            </Link>
            <Link
              href="/support"
              className="block px-3 py-2 rounded-lg hover:bg-muted transition font-medium"
              onClick={() => setIsOpen(false)}
            >
              Support
            </Link>
            <Link
              href="/get-involved"
              className="block px-3 py-2 rounded-lg hover:bg-muted transition font-medium"
              onClick={() => setIsOpen(false)}
            >
              Get Involved
            </Link>
            <Button 
              onClick={() => {
                setIsPartnershipModalOpen(true);
                setIsOpen(false);
              }}
              className="w-full mt-2 bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              Partner With Us
            </Button>
          </div>
        )}
      </nav>
      <PartnershipModal 
        isOpen={isPartnershipModalOpen} 
        onClose={() => setIsPartnershipModalOpen(false)} 
      />
    </header>
  );
}
