"use client"; 

import Link from "next/link"; 

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
            Shop
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
        <p className="text-ug-neutral-light text-sm">
          &copy; {currentYear} Optimal Fragrance. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
