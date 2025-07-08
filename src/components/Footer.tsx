// src/components/Footer.tsx
"use client";

import Link from "next/link";
import RotatingFooterTagline from "./RotatingFooterTagline"; // Import the new component
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa"; // Import social media icons

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-ug-purple-primary to-ug-text-heading text-white py-10 md:py-16 mt-16 shadow-2xl">
      <div className="container mx-auto px-4 md:px-8 text-center">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center justify-between mb-8">
          {/* Navigation Links */}
          <div className="flex flex-col md:flex-row justify-center md:justify-start space-y-2 md:space-y-0 md:space-x-6 text-lg font-medium">
            <Link
              href="/"
              className="hover:text-ug-purple-accent transition-colors duration-300 transform hover:-translate-y-0.5"
            >
              Home
            </Link>
            <Link
              href="/perfumes"
              className="hover:text-ug-purple-accent transition-colors duration-300 transform hover:-translate-y-0.5"
            >
              Perfumes
            </Link>
            <Link
              href="/about-us"
              className="hover:text-ug-purple-accent transition-colors duration-300 transform hover:-translate-y-0.5"
            >
              Our Story
            </Link>
            <Link
              href="/contact"
              className="hover:text-ug-purple-accent transition-colors duration-300 transform hover:-translate-y-0.5"
            >
              Contact
            </Link>
            <Link
              href="/privacy"
              className="hover:text-ug-purple-accent transition-colors duration-300 transform hover:-translate-y-0.5"
            >
              Privacy Policy
            </Link>
          </div>

          {/* Rotating Tagline (Central on larger screens) */}
          <div className="md:col-span-1 flex justify-center order-first md:order-none mb-4 md:mb-0">
            <RotatingFooterTagline />
          </div>

          {/* Social Media Icons (Right aligned on larger screens) */}
          <div className="flex justify-center md:justify-end space-x-6 text-2xl">
            <a
              href="https://facebook.com/your-optimal-fragrance-page" // Replace with actual Facebook URL
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-ug-purple-accent transition-colors duration-300 transform hover:scale-110"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com/your-optimal-fragrance-page" // Replace with actual Twitter URL
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-ug-purple-accent transition-colors duration-300 transform hover:scale-110"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com/your-optimal-fragrance-page" // Replace with actual Instagram URL
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-ug-purple-accent transition-colors duration-300 transform hover:scale-110"
            >
              <FaInstagram />
            </a>
            <a
              href="https://wa.me/256702889253?text=Hello%2C%20I%27m%20interested%20in%20Optimal%20Fragrance." // WhatsApp number for Uganda
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="hover:text-ug-purple-accent transition-colors duration-300 transform hover:scale-110"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-ug-neutral-dark pt-6 mt-6">
          <p className="text-ug-neutral-light text-sm md:text-base">
            &copy; {currentYear} Optimal Fragrance. All rights reserved. Crafted
            with passion in Uganda.
          </p>
        </div>
      </div>
    </footer>
  );
}
