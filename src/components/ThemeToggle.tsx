"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { FaSun, FaMoon, FaLaptop, FaCog, FaTimes } from "react-icons/fa";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Adjusted tooltipClass to be theme-aware
  const tooltipClass =
    "absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-gray-800 text-white dark:bg-gray-100 dark:text-gray-800 text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none";

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Mobile Toggle Button */}
      <div className="group relative md:hidden">
        <button
          aria-label="Toggle Theme Menu"
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-full transition-colors duration-200 bg-ug-neutral-light dark:bg-ug-neutral-dark shadow-md text-ug-text-dark dark:text-ug-text-light"
        >
          {isOpen ? (
            <FaTimes className="w-5 h-5" />
          ) : (
            <FaCog className="w-5 h-5" />
          )}
        </button>
        <span className={`${tooltipClass}`}>{isOpen ? "Close" : "Themes"}</span>
      </div>

      {/* Theme Buttons with Tooltips */}
      <div
        className={`
  flex items-center space-x-2 p-1 rounded-full shadow-inner
  bg-ug-neutral-light dark:bg-ug-neutral-dark
  md:flex
  ${isOpen ? "flex" : "hidden"}
  `}
      >
        {/* Light Theme Button */}
        <div className="group relative">
          <button
            aria-label="Toggle Light Theme"
            onClick={() => {
              setTheme("light");
              setIsOpen(false);
            }}
            className={`p-2 rounded-full transition-colors duration-200 ${
              theme === "light"
                ? "bg-ug-purple-primary text-white shadow-md"
                : "text-ug-text-dark hover:text-ug-purple-primary dark:text-ug-text-dark dark:hover:text-ug-purple-accent"
            }`}
          >
            <FaSun className="w-5 h-5" />
          </button>
          <span className={`${tooltipClass}`}>Light</span>
        </div>

        {/* Dark Theme Button */}
        <div className="group relative">
          <button
            aria-label="Toggle Dark Theme"
            onClick={() => {
              setTheme("dark");
              setIsOpen(false);
            }}
            className={`p-2 rounded-full transition-colors duration-200 ${
              theme === "dark"
                ? "bg-ug-purple-primary text-white shadow-md"
                : "text-ug-text-dark hover:text-ug-purple-primary dark:text-ug-text-dark dark:hover:text-ug-purple-accent"
            }`}
          >
            <FaMoon className="w-5 h-5" />
          </button>
          <span className={`${tooltipClass}`}>Dark</span>
        </div>

        {/* System Theme Button */}
        <div className="group relative">
          <button
            aria-label="Toggle System Theme"
            onClick={() => {
              setTheme("system");
              setIsOpen(false);
            }}
            className={`p-2 rounded-full transition-colors duration-200 ${
              theme === "system"
                ? "bg-ug-purple-primary text-white shadow-md"
                : "text-ug-text-dark hover:text-ug-purple-primary dark:text-ug-text-dark dark:hover:text-ug-purple-accent"
            }`}
          >
            <FaLaptop className="w-5 h-5" />
          </button>
          <span className={`${tooltipClass}`}>System</span>
        </div>
      </div>
    </div>
  );
}
