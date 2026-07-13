'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import PartnershipModal from '@/components/partnership-modal';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
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
            <Link href="/programs" className="text-foreground hover:text-secondary transition font-medium">
              Programs
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
            
            {/* More Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                className="text-foreground hover:text-secondary transition font-medium flex items-center gap-1"
              >
                More
                <svg className={`w-4 h-4 transition ${isMoreOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
              {isMoreOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg z-50">
                  <Link
                    href="/context"
                    className="block px-4 py-2 text-foreground hover:bg-muted rounded-t-lg transition"
                    onClick={() => setIsMoreOpen(false)}
                  >
                    Context
                  </Link>
                  <Link
                    href="/approach"
                    className="block px-4 py-2 text-foreground hover:bg-muted rounded-b-lg transition border-t border-border"
                    onClick={() => setIsMoreOpen(false)}
                  >
                    Our Approach
                  </Link>
                </div>
              )}
            </div>
            
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
              href="/programs"
              className="block px-3 py-2 rounded-lg hover:bg-muted transition font-medium"
              onClick={() => setIsOpen(false)}
            >
              Programs
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
            
            {/* Mobile More Dropdown */}
            <button 
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-muted transition font-medium flex items-center justify-between"
            >
              More
              <svg className={`w-4 h-4 transition ${isMoreOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
            {isMoreOpen && (
              <div className="pl-3 space-y-2">
                <Link
                  href="/context"
                  className="block px-3 py-2 rounded-lg hover:bg-muted transition font-medium text-sm"
                  onClick={() => {
                    setIsOpen(false);
                    setIsMoreOpen(false);
                  }}
                >
                  Context
                </Link>
                <Link
                  href="/approach"
                  className="block px-3 py-2 rounded-lg hover:bg-muted transition font-medium text-sm"
                  onClick={() => {
                    setIsOpen(false);
                    setIsMoreOpen(false);
                  }}
                >
                  Our Approach
                </Link>
              </div>
            )}
            
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
