"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useTheme } from "next-themes";
import { FaSun, FaMoon, FaLaptop, FaCog, FaTimes } from "react-icons/fa";

// Drag boundaries as percentage of viewport height
const DRAG_MIN_Y = 2; // 2% from top
const DRAG_MAX_Y = 90; // 90% from top

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  // Vertical position in viewport percentage
  const [positionY, setPositionY] = useState(4);

  const [isDragging, setIsDragging] = useState(false);
  const toggleRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  // --- Drag handlers ---
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (toggleRef.current && toggleRef.current.contains(e.target as Node)) {
      setIsDragging(true);
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      const viewportHeight = window.innerHeight;
      let newTopPercent = (e.clientY / viewportHeight) * 100;
      newTopPercent = Math.max(DRAG_MIN_Y, Math.min(DRAG_MAX_Y, newTopPercent));
      setPositionY(newTopPercent);
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  if (!mounted) return null;

  const tooltipClass =
    "absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-gray-800 text-white dark:bg-gray-100 dark:text-gray-800 text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none";

  const mainContainerClasses = `fixed right-4 z-50 transition-all duration-300 ease-in-out ${
    isDragging ? "cursor-grabbing" : "cursor-grab"
  }`;

  const themeButtonContainerClasses = `flex items-center space-x-2 p-1 rounded-full shadow-inner bg-ug-neutral-light dark:bg-ug-neutral-dark transition-all duration-300 ease-out overflow-hidden ${
    isOpen ? "flex" : "hidden md:flex"
  }`;

  const buttonGroupRetractClasses = `flex transition-opacity duration-200 ease-out ${
    !isOpen && !isDragging ? "md:opacity-0 md:group-hover:opacity-100" : ""
  }`;

  return (
    <div
      ref={toggleRef}
      className={mainContainerClasses}
      style={{ top: `${positionY}%` }}
      onMouseDown={handleMouseDown}
    >
      {/* Mobile Cog Toggle */}
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
        <span className={tooltipClass}>{isOpen ? "Close" : "Themes"}</span>
      </div>

      {/* Desktop / Open Theme Buttons */}
      <div className={`group relative ${themeButtonContainerClasses}`}>
        <div className={buttonGroupRetractClasses}>
          {/* Desktop Drag Cog */}
          <div className="group relative hidden md:block">
            <button
              aria-label="Theme Settings"
              className="p-2 rounded-full transition-colors duration-200 text-ug-text-dark dark:text-ug-text-light"
            >
              <FaCog className="w-5 h-5" />
            </button>
            <span className={tooltipClass}>Drag to move</span>
          </div>

          {/* Light Theme */}
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
            <span className={tooltipClass}>Light</span>
          </div>

          {/* Dark Theme */}
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
            <span className={tooltipClass}>Dark</span>
          </div>

          {/* System Theme */}
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
            <span className={tooltipClass}>System</span>
          </div>
        </div>
      </div>
    </div>
  );
}
