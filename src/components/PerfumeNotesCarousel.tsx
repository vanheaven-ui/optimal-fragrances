// components/PerfumeNotesCarousel.tsx
"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";

// Simplified interface for just the notes
export interface PerfumeNote {
  id: string;
  name: string; // e.g., "Dior Sauvage"
  year?: string; // Optional year/versions
  description: string; // The main description for the perfume
  details: string[]; // List of bullet points or specific details
}

interface PerfumeNotesCarouselProps {
  perfumes: PerfumeNote[];
  title: string;
  carouselId: string; // Unique ID for each carousel instance
}

const PerfumeNotesCarousel: React.FC<PerfumeNotesCarouselProps> = ({
  perfumes,
  title,
  carouselId,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === perfumes.length - 1 ? 0 : prevIndex + 1
    );
  }, [perfumes.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? perfumes.length - 1 : prevIndex - 1
    );
  };

  const startAutoplay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    // Set a longer interval since these are more detailed text slides
    intervalRef.current = setInterval(goToNext, 7000); // Auto-play every 7 seconds
  }, [goToNext]);

  const stopAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay(); // Cleanup on unmount
  }, [startAutoplay]);

  // Pause autoplay on hover
  const handleMouseEnter = () => stopAutoplay();
  const handleMouseLeave = () => startAutoplay();

  if (!perfumes || perfumes.length === 0) {
    return null; // Or a message indicating no perfumes/notes
  }

  const currentPerfume = perfumes[currentIndex];

  return (
    <div
      id={carouselId}
      // CHANGED: bg-white to bg-white/90 for 90% opacity (adjust the number as needed)
      className="relative bg-white/10 rounded-lg shadow-xl p-6 md:p-8 overflow-hidden group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <h3 className="text-3xl md:text-4xl font-extrabold text-center mb-6 leading-tight bg-gradient-to-r from-ug-purple-primary via-ug-text-dark to-ug-text-heading text-transparent bg-clip-text">
        {title}
      </h3>
      <p className="text-ug-text-dark text-center text-lg md:text-xl mb-4 bg-gradient-to-r from-ug-purple-primary via-ug-text-dark to-ug-text-heading text-transparent bg-clip-text">
        (A Concise Overview by #Optimalfragrances +256702889253)
      </p>

      <div className="flex items-center justify-center relative min-h-[350px] md:min-h-[250px]">
        {" "}
        {/* Added min-height for consistent sizing */}
        {/* Previous Button */}
        <button
          onClick={goToPrevious}
          className="absolute left-0 z-10 p-2 rounded-full bg-ug-purple-primary text-white text-2xl opacity-75 hover:opacity-100 transition-opacity duration-300 transform -translate-y-1/2 top-1/2 focus:outline-none focus:ring-2 focus:ring-ug-purple-accent"
          aria-label="Previous Perfume Note"
        >
          &larr;
        </button>
        {/* Perfume Note Content */}
        <div className="w-full max-w-4xl mx-auto text-center px-4">
          <h4 className="text-2xl md:text-3xl font-bold text-ug-text-heading mb-3">
            {currentPerfume.name}{" "}
            {currentPerfume.year && `(${currentPerfume.year})`}
          </h4>
          <p className="text-ug-text-dark text-md md:text-lg mb-4 leading-relaxed">
            {currentPerfume.description}
          </p>
          <ul className="text-ug-text-dark list-disc list-inside text-sm md:text-base space-y-2 text-left mx-auto max-w-lg">
            {currentPerfume.details.map((detail, idx) => (
              <li
                key={idx}
                className="bg-gradient-to-r from-ug-text-dark to-ug-purple-primary text-transparent bg-clip-text"
              >
                {detail}
              </li>
            ))}
          </ul>
        </div>
        {/* Next Button */}
        <button
          onClick={goToNext}
          className="absolute right-0 z-10 p-2 rounded-full bg-ug-purple-primary text-white text-2xl opacity-75 hover:opacity-100 transition-opacity duration-300 transform -translate-y-1/2 top-1/2 focus:outline-none focus:ring-2 focus:ring-ug-purple-accent"
          aria-label="Next Perfume Note"
        >
          &rarr;
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center mt-8 space-x-2">
        {perfumes.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === idx
                ? "bg-ug-purple-primary"
                : "bg-ug-neutral-light"
            } transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-ug-purple-accent`}
            aria-label={`Go to note ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PerfumeNotesCarousel;
