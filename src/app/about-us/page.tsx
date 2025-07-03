// src/app/about-us/page.tsx
// This is a Server Component for the dedicated About Us page.

import React from "react";

export default function AboutUsPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16 bg-ug-neutral-bg min-h-screen">
      <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-ug-neutral-light text-center max-w-4xl mx-auto">
        {/* Applied gradient to H1 */}
        <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-ug-purple-primary via-ug-text-dark to-ug-text-heading text-transparent bg-clip-text">
          Our Story
        </h1>

        {/* Applied gradient to H2 */}
        <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-ug-purple-primary bg-gradient-to-r from-ug-purple-primary via-ug-text-dark to-ug-text-heading text-transparent bg-clip-text">
          The Story of Optimal Fragrances
        </h2>
        <p className="text-lg text-ug-text-dark leading-relaxed mb-4">
          It all began in 1997, while I was seated next to someone having lunch.
          He kept complimenting my scent and eventually asked for my number. His
          interest was genuine—so much so that he drove all the way to Bukoto
          that very evening to meet me again and inquire more about the perfume.
          He even called his plug to check availability. Unfortunately, they
          didn’t have it.
        </p>
        <p className="text-lg text-ug-text-dark leading-relaxed mb-4">
          I was wearing **Perry Ellis 360° Black**, and he insisted on buying
          the bottle off me. I named a price, and he bought it right there. Not
          only that, he placed an order for **three more of the same**, and
          **two others for his wife**—all from the same brand. That’s how it all
          started. I ordered seven bottles, and within a month, they were all
          sold.
        </p>
        <p className="text-lg text-ug-text-dark leading-relaxed mb-4">
          After **September 11**, importing fragrances, especially liquid
          products, became complicated. Airlifting from the U.S. was nearly
          impossible. Delays became common. But we adapted—studying value
          chains, understanding markets, and evolving with time.
        </p>
        <p className="text-xl font-semibold text-ug-text-heading leading-relaxed mt-6">
          Today, Optimal Fragrances stands strong.
          <br />
          **Your scent needs, our commitment to outserve.**
        </p>
      </section>
    </div>
  );
}
