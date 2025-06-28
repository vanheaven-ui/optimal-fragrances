// src/components/DrawerNavigation.tsx
"use client"; // This is a client component as it manages state and user interaction

import Link from "next/link";
import { useState } from "react";
// Using standard <a> tags for navigation instead of Next.js Link

// Replaced react-icons/fa with inline SVG equivalents to resolve import issues
const IconBars = () => (
  <svg
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4 6h16M4 12h16m-7 6h7"
    ></path>
  </svg>
);

const IconTimes = () => (
  <svg
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M6 18L18 6M6 6l12 12"
    ></path>
  </svg>
);

export default function DrawerNavigation() {
  const [isOpen, setIsOpen] = useState(false); // State to control drawer open/close

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const closeDrawer = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger Icon / Menu Button with Tooltip */}
      <div className="relative group">
        {/* Wrapper for tooltip */}
        <button
          onClick={toggleDrawer}
          // Changed background back to ug-purple-primary
          // Added a white border for contrast
          className="fixed top-4 left-4 z-50 p-3 rounded-full bg-ug-purple-primary text-white shadow-lg
                     border-2 border-white // Added border for visibility
                     hover:bg-ug-purple-accent focus:outline-none focus:ring-2 focus:ring-ug-purple-accent
                     transition-all duration-300 transform hover:scale-110"
          aria-label="Open navigation menu"
        >
          <IconBars /> {/* Using inline SVG icon */}
        </button>
        {/* Tooltip content */}
        {/* Adjusted text content */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-1 bg-ug-text-heading text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          Click to open menu {/* Changed text here */}
          <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-ug-text-heading"></div>
        </div>
      </div>

      {/* Drawer Overlay (to dim background when open) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" // Hidden on medium screens and up
          onClick={closeDrawer}
        ></div>
      )}

      {/* Drawer Content */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-ug-neutral-bg shadow-2xl z-50
                    transform transition-transform duration-300 ease-in-out
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-between items-center p-6 bg-ug-purple-primary text-white">
          <Link
            href="/"
            className="text-2xl font-bold text-white"
            onClick={closeDrawer}
          >
            Optimal Fragrance
          </Link>
          <button
            onClick={closeDrawer}
            className="text-white hover:text-ug-neutral-light text-3xl focus:outline-none"
            aria-label="Close navigation menu"
          >
            <IconTimes /> {/* Using inline SVG icon */}
          </button>
        </div>

        <nav className="p-6">
          <ul className="space-y-4">
            <li>
              <Link
                href="/"
                className="block text-xl text-ug-text-heading hover:text-ug-purple-primary font-semibold py-2 px-3 rounded-lg transition-colors duration-200"
                onClick={closeDrawer}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/perfumes"
                className="block text-xl text-ug-text-heading hover:text-ug-purple-primary font-semibold py-2 px-3 rounded-lg transition-colors duration-200"
                onClick={closeDrawer}
              >
                Perfumes
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="block text-xl text-ug-text-heading hover:text-ug-purple-primary font-semibold py-2 px-3 rounded-lg transition-colors duration-200"
                onClick={closeDrawer}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className={`block text-xl font-semibold py-2 px-3 rounded-lg transition-colors duration-200 text-ug-text-heading hover:text-ug-purple-primary`}
                onClick={closeDrawer}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/admin/login"
                className={`block text-xl font-semibold py-2 px-3 rounded-lg transition-colors duration-200 text-ug-text-heading hover:text-ug-purple-primary`}
                onClick={closeDrawer}
              >
                Admin Login
              </Link>
            </li>
            {/* Add more links here as needed */}
          </ul>
        </nav>
      </div>
    </>
  );
}
