import React from "react";

interface FragranceLoaderProps {
  message?: string; // Make the message prop optional
}

const FragranceLoader: React.FC<FragranceLoaderProps> = ({
  message = "Unveiling exquisite scents...",
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ug-neutral-bg">
      <div className="flex flex-col items-center">
        {/* Main "bottle" shape */}
        <div className="relative w-24 h-32 md:w-32 md:h-40 bg-gradient-to-br from-ug-purple-primary to-ug-purple-accent rounded-t-xl rounded-b-3xl shadow-2xl overflow-hidden">
          {/* Subtle sheen effect */}
          <div className="absolute inset-0 bg-white opacity-10 blur-sm animate-pulse-light"></div>

          {/* Fragrance "mist" particles */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-20 md:w-28 md:h-28 animate-mist-diffusion">
            <div className="absolute w-6 h-6 bg-white rounded-full opacity-50 blur-md animate-particle-1"></div>
            <div
              className="absolute w-8 h-8 bg-pink-300 rounded-full opacity-40 blur-md animate-particle-2"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className="absolute w-5 h-5 bg-purple-200 rounded-full opacity-60 blur-md animate-particle-3"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute w-7 h-7 bg-white rounded-full opacity-45 blur-md animate-particle-4"
              style={{ animationDelay: "1.5s" }}
            ></div>
          </div>

          {/* Cap */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-8 md:w-20 md:h-10 bg-ug-text-heading rounded-t-lg rounded-b-sm shadow-md"></div>
        </div>

        <p className="mt-8 text-2xl md:text-3xl font-semibold text-ug-text-dark animate-pulse bg-gradient-to-r from-ug-purple-primary via-ug-text-dark to-ug-text-heading text-transparent bg-clip-text">
          {message}
        </p>
        <p className="mt-2 text-lg text-ug-text-dark opacity-80">
          Optimal Fragrance is preparing for you.
        </p>
      </div>
    </div>
  );
};

export default FragranceLoader;
