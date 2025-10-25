// src/app/about-us/page.tsx
// This is a Server Component for the dedicated About Us page.

import React from "react";

export default function AboutUsPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24 bg-ug-neutral-bg min-h-screen flex flex-col items-center">
      <section className="bg-white p-8 sm:p-10 lg:p-16 rounded-3xl shadow-2xl border border-ug-neutral-light text-center max-w-5xl mx-auto transform transition-all duration-500 ease-in-out hover:scale-[1.005] hover:shadow-3xl">
        {/* Main Heading with enhanced gradient and shadow */}
        <h1
          className="text-5xl md:text-6xl font-extrabold mb-8 md:mb-12
                       bg-gradient-to-r from-ug-purple-primary via-ug-text-dark to-ug-text-heading
                       text-transparent bg-clip-text drop-shadow-lg animate-fade-in-down"
        >
          Our Story
        </h1>

        {/* Sub-heading for the specific story, also with gradient */}
        <h2
          className="text-3xl md:text-4xl font-bold mb-8 text-ug-purple-primary
                       bg-gradient-to-r from-ug-purple-primary via-ug-text-dark to-ug-text-heading
                       text-transparent bg-clip-text animate-fade-in delay-200"
        >
          The Journey of Optimal Fragrances
        </h2>

        {/* Story Paragraphs - Improved readability and subtle animations */}
        <p className="text-lg md:text-xl text-ug-text-dark leading-relaxed mb-6 animate-fade-in delay-400">
          It all began in **1997**, while I was seated next to someone having
          lunch. He kept complimenting my scent and eventually asked for my
          number. His interest was genuine—so much so that he drove all the way
          to Bukoto, Uganda, that very evening to meet me again and inquire more
          about the perfume. He even called his plug to check availability.
          Unfortunately, they didn’t have it.
        </p>

        <p className="text-lg md:text-xl text-ug-text-dark leading-relaxed mb-6 animate-fade-in delay-600">
          I was wearing **Perry Ellis 360° Black**, and he insisted on buying
          the bottle off me. I named a price, and he bought it right there! Not
          only that, he placed an order for **three more of the same**, and
          **two others for his wife**—all from the same brand. That’s how it all
          started. I ordered seven bottles, and within a month, they were all
          sold.
        </p>

        {/* A thematic divider */}
        <div className="w-24 h-1 bg-ug-purple-primary mx-auto my-10 rounded-full animate-fade-in delay-800"></div>

        <p className="text-lg md:text-xl text-ug-text-dark leading-relaxed mb-6 animate-fade-in delay-1000">
          After the events of **September 11**, importing fragrances, especially
          liquid products, became significantly complicated. Airlifting from the
          U.S. was nearly impossible, and delays became common. But we
          adapted—studying value chains, understanding markets, and evolving
          with time to overcome these challenges.
        </p>

        {/* Concluding statement with enhanced styling and animation */}
        <p className="text-xl md:text-2xl font-semibold text-ug-text-heading leading-relaxed mt-10 animate-fade-in-up delay-1200">
          Today, **Optimal Fragrances** stands strong, built on a foundation of
          passion and resilience.
          <br />
          **Your scent needs, our unwavering commitment to outserve.**
        </p>
      </section>
    </div>
  );
}
