// src/components/MessageOfTheWeek.tsx
import React from "react";

export default function MessageOfTheWeek() {
  const prayerContent = (
    <>
      <p className="text-lg font-serif text-ug-text-heading mb-3">
        🌸 A Fragrant Prayer for the Week
      </p>
      <ul className="list-none p-0 m-0 space-y-2 text-ug-text-dark text-base">
        <li>✨ Fresh with purpose,</li>
        <li>🌿 Grounded in peace,</li>
        <li>💐 Wrapped in grace,</li>
        <li>🔥 And lasting in impact.</li>
      </ul>
      <p className="text-ug-text-dark text-base mt-4 mb-2">
        May every step leave a trail of favour,
        <br />
        like the perfect sillage that lingers kindly.
      </p>
      <p className="text-ug-text-heading font-semibold text-lg mb-2">Amen.</p>
      <p className="text-ug-text-dark text-sm opacity-80 italic">
        *#OptimalFragrances*
      </p>
    </>
  );

  return (
    // Changed bg-white to bg-transparent
    <section className="bg-transparent p-6 md:p-8 rounded-lg max-w-2xl mx-auto my-8 border border-ug-neutral-light">
      <h2 className="sr-only">Message of the Week</h2> {/* For accessibility */}
      {prayerContent}
    </section>
  );
}
