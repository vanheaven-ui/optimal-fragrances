import React from "react";
import { Product } from "../data/product";
import SpotlightProduct from "./SpotLightProduct";

// Props Interface
interface HandpickedSectionProps {
  spotlightProducts: Product[]; // Expects an array of Product objects
}

const HandpickedSection: React.FC<HandpickedSectionProps> = ({
  spotlightProducts,
}) => {
  return (
    <section className="relative container mx-auto py-6 md:py-12 px-4 overflow-hidden bg-ug-neutral-bg">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-ug-purple-light opacity-5 rounded-full filter blur-3xl animate-blob-one"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-ug-purple-accent opacity-5 rounded-full filter blur-3xl animate-blob-two"></div>
      </div>

      <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-center mb-12 md:mb-16 relative z-10">
        <span className="bg-gradient-to-r from-ug-purple-primary via-ug-text-dark to-ug-text-heading text-transparent bg-clip-text drop-shadow-md">
          Handpicked for You
        </span>
        <span className="block w-24 h-1 bg-ug-purple-primary mx-auto mt-4 rounded-full animate-pulse-fade"></span>
      </h2>

      <div className="space-y-6 md:space-y-12 relative z-10">
        {spotlightProducts.length > 0 ? (
          <>
            {/* Display the first product */}
            <SpotlightProduct product={spotlightProducts[0]} />

            {/* Display the second product only if it exists, with reversed layout */}
            {spotlightProducts.length > 1 && (
              <SpotlightProduct
                product={spotlightProducts[1]}
                reverseLayout={true}
              />
            )}
          </>
        ) : (
          <p className="text-center text-xl md:text-2xl font-semibold text-ug-text-dark animate-fade-in">
            No captivating fragrances to highlight at the moment. Please check
            back soon!
          </p>
        )}
      </div>
    </section>
  );
};

export default HandpickedSection;
