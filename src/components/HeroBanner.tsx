import React from "react";

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-ug-purple-primary to-ug-purple-accent text-white py-12 md:py-16 lg:py-20 text-center">
      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 md:mb-4 leading-tight bg-gradient-to-r from-ug-neutral-bg via-white to-ug-purple-light text-transparent bg-clip-text drop-shadow-lg animate-fade-in-down">
          Discover Your Signature Scent
        </h1>
        <p className="text-md md:text-lg lg:text-xl opacity-90 max-w-2xl mx-auto font-light animate-fade-in-up">
          Welcome to{" "}
          <strong className="font-semibold text-white">
            Optimal Fragrance
          </strong>{" "}
          – where luxury meets individuality.
        </p>
      </div>

      {/* Perfume Bottle SVG - Calibrated for all screens */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 250 250"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full transform
                     /* Mobile (Base) */
                     scale-[2.0] translate-x-[40%] translate-y-[10%] rotate-12 opacity-30
                     /* Medium Screens */
                     md:scale-[1.5] md:translate-x-[20%] md:translate-y-[0%] md:rotate-12 md:opacity-25
                     /* Large Screens */
                     lg:scale-[1.2] lg:translate-x-[10%] lg:translate-y-[-5%] lg:rotate-12 lg:opacity-20
                     /* Extra Large Screens */
                     xl:scale-[1.0] xl:translate-x-[0%] xl:translate-y-[-10%] xl:rotate-12 xl:opacity-15
                     animate-float-pulse-and-rotate-subtle origin-bottom-right"
        >
          <title>Perfume Bottle Spray</title>
          {/* Bottle Body */}
          <rect
            x="75"
            y="70"
            width="100"
            height="130"
            rx="15"
            fill="#E0BBE4"
            stroke="#C29DCC"
            strokeWidth="3"
          />
          {/* Reflection/Highlight on Bottle Body */}
          <path
            d="M85 80 Q90 75 95 80 L95 180 Q90 185 85 180 Z"
            fill="rgba(255,255,255,0.2)"
          />

          {/* Bottle Neck/Sprayer Top */}
          <rect x="115" y="45" width="20" height="25" rx="5" fill="#C29DCC" />
          <rect
            x="115"
            y="45"
            width="20"
            height="25"
            rx="5"
            stroke="#9A6FA6"
            strokeWidth="2"
          />
          {/* Sprayer Nozzle */}
          <circle cx="125" cy="40" r="5" fill="#6A4E7A" />

          {/* Spray Particles */}
          <g opacity="0.8" className="animate-spray-burst">
            <circle cx="125" cy="30" r="4" fill="url(#sprayGradient)" />
            <circle cx="135" cy="25" r="3.5" fill="url(#sprayGradient)" />
            <circle cx="115" cy="28" r="3.8" fill="url(#sprayGradient)" />
            <circle cx="140" cy="18" r="3" fill="url(#sprayGradient)" />
            <circle cx="110" cy="20" r="3.2" fill="url(#sprayGradient)" />
            <circle cx="125" cy="15" r="2.5" fill="url(#sprayGradient)" />
          </g>

          <defs>
            <linearGradient
              id="sprayGradient"
              x1="125"
              y1="5"
              x2="125"
              y2="35"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.8" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}
