// src/components/CuratedProductsSection.tsx
"use client"; // If this component is used in a Next.js App Router client component context

import React, { useState } from "react";
import Link from "next/link"; 
import { Product } from "../data/product"; 
import ProductCard from "./ProductCard";

// Define the props interface for this component
interface CuratedProductsSectionProps {
  curatedProducts: Product[]; 
}

const CuratedProductsSection: React.FC<CuratedProductsSectionProps> = ({
  curatedProducts,
}) => {
  const [isViewingAllPerfumes, setIsViewingAllPerfumes] = useState(false);

  const handleViewAllPerfumesClick = () => {
    // In a real application, you might navigate using router.push
    // or trigger a loading state for a full page transition.
    setIsViewingAllPerfumes(true);
    // Simulate a delay for demonstration, remove in production if not needed
    setTimeout(() => {
      // You would typically use router.push('/perfumes'); here
      // For this example, we'll just reset the loading state
      setIsViewingAllPerfumes(false);
    }, 1500);
  };

  if (curatedProducts.length === 0) {
    return null; // Don't render the section if there are no products
  }

  return (
    <section className="container mx-auto py-6 md:py-12 px-4 bg-ug-neutral-bg">
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-ug-purple-primary via-ug-text-dark to-ug-text-heading text-transparent bg-clip-text text-center mb-12 md:mb-16 drop-shadow-md">
        Explore More from Our Collection
        <span className="block w-32 h-1 bg-ug-purple-primary mx-auto mt-4 rounded-full animate-pulse-fade"></span>{" "}
        {/* Animated underline */}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
        {curatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="text-center mt-16 md:mt-20">
        <Link
          href="/perfumes"
          onClick={handleViewAllPerfumesClick}
          className={`inline-flex items-center justify-center bg-ug-purple-primary text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg transition duration-300 ease-in-out
            ${
              isViewingAllPerfumes
                ? "opacity-70 cursor-not-allowed animate-pulse" // Added animate-pulse for loading feedback
                : "hover:bg-ug-purple-accent transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-ug-purple-light focus:ring-offset-2 focus:ring-offset-ug-purple-primary"
            }
          `}
          aria-disabled={isViewingAllPerfumes}
        >
          {isViewingAllPerfumes ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Loading...
            </>
          ) : (
            "View All Perfumes"
          )}
        </Link>
      </div>
    </section>
  );
};

export default CuratedProductsSection;
