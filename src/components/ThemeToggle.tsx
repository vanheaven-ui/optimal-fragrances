// src/components/ThemeToggle.tsx
"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { FaSun, FaMoon, FaLaptop } from "react-icons/fa"; // Icons for light, dark, system

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect runs only on the client, so we can safely use useTheme()
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a placeholder or null to avoid hydration mismatch
    return null;
  }

  return (
    <div className="fixed top-12 md:top-4 right-4 z-50 flex items-center space-x-2 p-1 rounded-full bg-ug-neutral-light dark:bg-ug-neutral-dark shadow-inner">
      <button
        aria-label="Toggle Light Theme"
        onClick={() => setTheme("light")}
        className={`p-2 rounded-full transition-colors duration-200 ${
          theme === "light"
            ? "bg-ug-purple-primary text-white shadow-md"
            : "text-ug-text-dark hover:text-ug-purple-primary dark:text-ug-text-dark dark:hover:text-ug-purple-accent"
        }`}
      >
        <FaSun className="w-5 h-5" />
      </button>
      <button
        aria-label="Toggle Dark Theme"
        onClick={() => setTheme("dark")}
        className={`p-2 rounded-full transition-colors duration-200 ${
          theme === "dark"
            ? "bg-ug-purple-primary text-white shadow-md"
            : "text-ug-text-dark hover:text-ug-purple-primary dark:text-ug-text-dark dark:hover:text-ug-purple-accent"
        }`}
      >
        <FaMoon className="w-5 h-5" />
      </button>
      <button
        aria-label="Toggle System Theme"
        onClick={() => setTheme("system")}
        className={`p-2 rounded-full transition-colors duration-200 ${
          theme === "system"
            ? "bg-ug-purple-primary text-white shadow-md"
            : "text-ug-text-dark hover:text-ug-purple-primary dark:text-ug-text-dark dark:hover:text-ug-purple-accent"
        }`}
      >
        <FaLaptop className="w-5 h-5" />
      </button>
    </div>
  );
}
