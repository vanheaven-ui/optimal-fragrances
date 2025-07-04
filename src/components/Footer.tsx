// src/components/Footer.tsx
"use client";

import Link from "next/link";
import RotatingFooterTagline from "./RotatingFooterTagline"; // Import the new component

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ug-text-heading text-white py-8 mt-12">
      <div className="container mx-auto text-center">
        <div className="flex justify-center space-x-6 mb-4">
          <Link
            href="/"
            className="hover:text-ug-purple-primary transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            href="/perfumes"
            className="hover:text-ug-purple-primary transition-colors duration-300"
          >
            Perfumes
          </Link>
          <Link
            href="/about-us"
            className="hover:text-ug-purple-primary transition-colors duration-300"
          >
            Our Story
          </Link>
          <Link
            href="/contact"
            className="hover:text-ug-purple-primary transition-colors duration-300"
          >
            Contact
          </Link>
          <Link
            href="/privacy"
            className="hover:text-ug-purple-primary transition-colors duration-300"
          >
            Privacy Policy
          </Link>
        </div>
        {/* Place the RotatingFooterTagline component here */}
        <RotatingFooterTagline />
        <p className="text-ug-neutral-light text-sm">
          &copy; {currentYear} Optimal Fragrance. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
