"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

// --- Interfaces ---
export interface PerfumeNote {
  id: string;
  name: string;
  year?: string;
  description: string;
  details: string[];
}

interface PerfumeNotesCarouselProps {
  perfumes: PerfumeNote[];
  title: string;
  carouselId: string;
  autoplayInterval?: number;
}

// --- Component ---
const PerfumeNotesCarousel: React.FC<PerfumeNotesCarouselProps> = ({
  perfumes,
  title,
  carouselId,
  autoplayInterval = 7000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === perfumes.length - 1 ? 0 : prevIndex + 1
    );
  }, [perfumes.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? perfumes.length - 1 : prevIndex - 1
    );
  }, [perfumes.length]);

  const startAutoplay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (perfumes.length > 1 && autoplayInterval > 0) {
      intervalRef.current = setInterval(goToNext, autoplayInterval);
    }
  }, [goToNext, autoplayInterval, perfumes.length]);

  const stopAutoplay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAutoplay();
    return () => {
      stopAutoplay();
    };
  }, [startAutoplay, stopAutoplay]);

  const handleMouseEnter = () => stopAutoplay();
  const handleMouseLeave = () => startAutoplay();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        goToPrevious();
      } else if (event.key === "ArrowRight") {
        goToNext();
      }
    },
    [goToPrevious, goToNext]
  );

  useEffect(() => {
    const carouselElement = carouselRef.current;
    if (carouselElement) {
      carouselElement.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      if (carouselElement) {
        carouselElement.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [handleKeyDown]);

  if (!perfumes || perfumes.length === 0) {
    return null;
  }

  const currentPerfume = perfumes[currentIndex];

  return (
    <div
      id={carouselId}
      ref={carouselRef}
      className="relative bg-gradient-to-br from-ug-purple-primary/10 to-ug-neutral-light/10 rounded-xl shadow-2xl p-6 md:p-10 lg:p-12 overflow-hidden group border border-ug-purple-primary/20 focus:outline-none focus-visible:ring-4 focus-visible:ring-ug-purple-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ug-background"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label={`${title} Perfume Notes Carousel`}
    >
      {/* --- Title Section --- */}
      <h3 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-center mb-4 md:mb-6 leading-tight bg-gradient-to-r from-ug-purple-primary via-ug-text-dark to-ug-text-heading text-transparent bg-clip-text drop-shadow-md">
        {title}
      </h3>
      <p className="text-ug-text-dark text-center text-md md:text-lg lg:text-xl mb-6 md:mb-8 bg-gradient-to-r from-ug-purple-primary via-ug-text-dark to-ug-text-heading text-transparent bg-clip-text font-medium">
        (A Concise Overview by #Optimalfragrances +256702889253)
      </p>

      {/* --- Carousel Content Area --- */}
      <div className="flex items-center justify-center relative min-h-[300px] md:min-h-[280px] lg:min-h-[250px] my-6">
        {/* Previous Button */}
        {perfumes.length > 1 && (
          <button
            onClick={goToPrevious}
            className="absolute left-0 lg:-left-4 z-20 p-3 md:p-4 rounded-full bg-ug-purple-primary text-white text-xl md:text-2xl opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300 transform -translate-y-1/2 top-1/2 focus:outline-none focus-visible:ring-4 focus-visible:ring-ug-purple-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ug-background"
            aria-label="Previous Perfume Note"
          >
            <HiOutlineChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
          </button>
        )}

        {/* Perfume Note Content */}
        <div
          className="w-full max-w-4xl mx-auto text-center px-4 md:px-8 py-4 transition-transform duration-500 ease-in-out transform hover:scale-[1.01]"
          aria-live="polite"
        >
          <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold text-ug-text-heading mb-2 md:mb-3 leading-snug">
            {currentPerfume.name}{" "}
            {currentPerfume.year && (
              <span className="text-ug-purple-primary/80 text-xl md:text-2xl lg:text-3xl font-normal">
                ({currentPerfume.year})
              </span>
            )}
          </h4>
          <p className="text-ug-text-dark text-md md:text-lg lg:text-xl mb-4 md:mb-6 leading-relaxed">
            {currentPerfume.description}
          </p>
          <ul className="text-ug-text-dark list-disc list-inside text-sm md:text-base lg:text-lg space-y-2 text-left mx-auto max-w-lg md:max-w-xl p-4 bg-white/5 rounded-lg shadow-inner border border-ug-neutral-light/20">
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
        {perfumes.length > 1 && (
          <button
            onClick={goToNext}
            className="absolute right-0 lg:-right-4 z-20 p-3 md:p-4 rounded-full bg-ug-purple-primary text-white text-xl md:text-2xl opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300 transform -translate-y-1/2 top-1/2 focus:outline-none focus-visible:ring-4 focus-visible:ring-ug-purple-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ug-background"
            aria-label="Next Perfume Note"
          >
            <HiOutlineChevronRight className="w-6 h-6 md:w-7 md:h-7" />
          </button>
        )}
      </div>

      {/* --- Dots Navigation --- */}
      {perfumes.length > 1 && (
        <div
          className="flex justify-center mt-6 md:mt-8 space-x-2 md:space-x-3"
          role="tablist"
          aria-label="Perfume Note Navigation"
        >
          {perfumes.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ease-in-out
                ${
                  currentIndex === idx
                    ? "bg-ug-purple-primary scale-125 shadow-md" // Larger, more prominent active dot
                    : "bg-ug-neutral-light/70 hover:bg-ug-neutral-light"
                }
                focus:outline-none focus-visible:ring-2 focus-visible:ring-ug-purple-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ug-background`}
              aria-label={`Go to note ${idx + 1}`}
              role="tab"
              aria-selected={currentIndex === idx}
              id={`${carouselId}-tab-${idx}`}
              aria-controls={`${carouselId}-panel`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PerfumeNotesCarousel;
