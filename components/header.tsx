'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Tagline - Left */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <Image
              src="/avan-logo.png"
              alt="Avan Makerspace"
              width={50}
              height={50}
              className="h-12 w-auto"
            />
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-foreground">AVAN</h1>
              <p className="text-xs text-foreground/60">Refugee-Led Innovation</p>
            </div>
          </Link>

          {/* Desktop Navigation - Center/Right */}
          <div className="hidden lg:flex items-center gap-8">
            <Link href="/" className="text-foreground hover:text-secondary font-medium text-sm">
              Home
            </Link>
            <Link href="/about" className="text-foreground hover:text-secondary font-medium text-sm">
              About
            </Link>
            <Link href="/programs" className="text-foreground hover:text-secondary font-medium text-sm">
              Programs
            </Link>
            <Link href="/impact" className="text-foreground hover:text-secondary font-medium text-sm">
              Impact
            </Link>
            <Link href="/approach" className="text-foreground hover:text-secondary font-medium text-sm">
              Approach
            </Link>
            <Link href="/get-involved" className="text-foreground hover:text-secondary font-medium text-sm">
              Get Involved
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
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
          <div className="lg:hidden mt-4 space-y-2 pb-4 border-t border-gray-200 pt-4">
            <Link
              href="/"
              className="block px-3 py-2 rounded-lg hover:bg-gray-100 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 rounded-lg hover:bg-gray-100 font-medium"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/programs"
              className="block px-3 py-2 rounded-lg hover:bg-gray-100 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Programs
            </Link>
            <Link
              href="/impact"
              className="block px-3 py-2 rounded-lg hover:bg-gray-100 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Impact
            </Link>
            <Link
              href="/approach"
              className="block px-3 py-2 rounded-lg hover:bg-gray-100 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Approach
            </Link>
            <Link
              href="/get-involved"
              className="block px-3 py-2 rounded-lg hover:bg-gray-100 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Get Involved
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
