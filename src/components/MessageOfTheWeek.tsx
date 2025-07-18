// src/components/MessageOfTheWeek.tsx
import React from "react";

export default function MessageOfTheWeek() {
  const weeklyMessage = (
    <>
      <p className="text-base md:text-lg lg:text-xl font-medium text-ug-text-dark leading-relaxed">
        <strong className="text-ug-text-heading">Happy New Week!</strong> May it
        be layered with{" "}
        <strong className="text-ug-text-heading">top notes of success</strong>,
        anchored on{" "}
        <strong className="text-ug-text-heading">
          base notes of steady and rising productivity
        </strong>
        , and may the sillage of happiness linger throughout this{" "}
        <strong className="text-text-ug-heading">fragrant week</strong>.
      </p>
    </>
  );

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-ug-purple-primary/5 to-ug-neutral-light/5 p-6 md:p-8 lg:p-10 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-2xl mx-auto my-8 md:my-12 border border-ug-purple-primary/20">
      <h2 className="sr-only">New Week Message from OptimalFragrances</h2>

      <div className="text-center">
        {/* Main Heading */}
        <p className="text-xl md:text-2xl lg:text-3xl font-extrabold text-ug-text-heading mb-4 md:mb-5 leading-tight bg-gradient-to-r from-ug-purple-primary via-ug-text-dark to-ug-text-heading text-transparent bg-clip-text drop-shadow-md animate-fade-in-up">
          🌟 Happy New Week! 🌟
        </p>

        {/* Core Message */}
        <div className="mb-6 md:mb-8">{weeklyMessage}</div>

        {/* Signature */}
        <p className="text-ug-text-dark text-sm md:text-base opacity-90 italic mt-6">
          — #OptimalFragrances
        </p>
      </div>

      {/* Optional: Subtle background animation/element for extra appeal */}
      <div className="absolute inset-0 z-[-1] opacity-5 animate-pulse-slow">
        <span className="text-8xl md:text-9xl lg:text-9xl text-ug-purple-primary/30 absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 rotate-12">
          🌸
        </span>
        <span className="text-7xl md:text-8xl lg:text-8xl text-ug-neutral-light/30 absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 -rotate-12">
          ✨
        </span>
      </div>
    </section>
  );
}
