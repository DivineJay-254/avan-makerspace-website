'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">A</span>
            </div>
            <span className="hidden sm:inline font-bold text-lg">Avan Makerspace</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#about" className="text-foreground hover:text-primary transition">
              About
            </Link>
            <Link href="#equipment" className="text-foreground hover:text-primary transition">
              Equipment
            </Link>
            <Link href="#membership" className="text-foreground hover:text-primary transition">
              Membership
            </Link>
            <Link href="#contact" className="text-foreground hover:text-primary transition">
              Contact
            </Link>
          </div>

          {/* CTA Button */}
          <Button className="hidden sm:inline-flex bg-accent hover:bg-accent/90 text-accent-foreground">
            Join Now
          </Button>

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
              href="#about"
              className="block px-3 py-2 rounded-lg hover:bg-muted transition"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="#equipment"
              className="block px-3 py-2 rounded-lg hover:bg-muted transition"
              onClick={() => setIsOpen(false)}
            >
              Equipment
            </Link>
            <Link
              href="#membership"
              className="block px-3 py-2 rounded-lg hover:bg-muted transition"
              onClick={() => setIsOpen(false)}
            >
              Membership
            </Link>
            <Link
              href="#contact"
              className="block px-3 py-2 rounded-lg hover:bg-muted transition"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Button className="w-full mt-2 bg-accent hover:bg-accent/90 text-accent-foreground">
              Join Now
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
}
