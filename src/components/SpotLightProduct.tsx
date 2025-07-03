// src/components/SpotlightProduct.tsx
"use client";
import React, { useState } from "react"; 
import Link from "next/link";
import { Product } from "../data/product"; 
import Image from "next/image";
import { FaStar, FaStarHalfAlt } from "react-icons/fa"; // Import star icons

// Define an interface for the Spotlight product
interface SpotlightProductProps {
  product: Product; // Explicitly type the product prop
  reverseLayout?: boolean; // Optional prop to reverse image/text layout
}

const SpotlightProduct: React.FC<SpotlightProductProps> = ({
  product,
  reverseLayout = false,
}) => {
  const [isLoading, setIsLoading] = useState(true); // State to track image loading

  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i - 0.5 === rating) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaStar key={i} className="text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <div
      className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 p-6 rounded-lg ${
        reverseLayout ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="relative w-full md:w-1/2 h-80 md:h-[400px] rounded-lg overflow-hidden shadow-lg transform hover:scale-[1.01] transition-transform duration-300 ease-in-out">
        {isLoading && ( // Show spinner only when isLoading is true
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10 rounded-lg">
            {/* Modern Spinner */}
            <div
              className="w-12 h-12 border-4 border-ug-purple-primary border-t-transparent rounded-full animate-spin"
              role="status"
            >
              <span className="sr-only">Loading...</span>{" "}
              {/* For accessibility */}
            </div>
          </div>
        )}
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill // Use 'fill' to ensure image covers the parent div and maintains aspect ratio
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Optimize image loading
          style={{ objectFit: "cover" }} // Ensure proper fitting
          className={`absolute inset-0 w-full h-full object-cover rounded-lg transition-opacity duration-300 ease-in-out ${
            isLoading ? "opacity-0" : "opacity-100" // Hide image until loaded
          }`}
          onLoadingComplete={() => setIsLoading(false)} // Hide spinner when image is loaded
          onError={(e) => {
            setIsLoading(false); // Hide spinner even on error
            e.currentTarget.src =
              "https://placehold.co/400x300/CCCCCC/000000?text=Image+Not+Found"; // Fallback image
          }}
        />
        {/* Transparent overlay - ensure it's above the image but below potential interactive elements */}
        <div className="absolute inset-0 bg-ug-purple-primary opacity-20 rounded-lg z-[5]"></div>{" "}
        {/* Adjusted z-index */}
      </div>

      <div className="w-full md:w-1/2 text-center md:text-left">
        <h3 className="text-3xl md:text-4xl font-bold text-ug-text-heading mb-4 leading-tight">
          {product.name}{" "}
          <span className="block text-ug-purple-primary text-xl md:text-2xl font-semibold mt-1">
            {product.brand}
          </span>
        </h3>
        {product.rating && (
          <div className="flex items-center justify-center md:justify-start mb-4">
            <div className="flex text-xl">{renderStars(product.rating)}</div>
            <span className="ml-2 text-ug-text-dark text-lg">
              ({product.rating.toFixed(1)})
            </span>
            {product.ratingSource && (
              <span className="ml-2 text-ug-text-dark text-sm hidden sm:inline">
                (Source:{" "}
                {product.ratingSource.split(",")[0].split("(")[0].trim()})
              </span>
            )}
          </div>
        )}
        <p className="text-ug-text-dark leading-relaxed mb-6">
          {product.description.length > 200
            ? product.description.substring(0, 200) + "..."
            : product.description}
        </p>
        <Link
          href={`/perfumes/${product.id}`}
          className="inline-block bg-ug-purple-primary text-white hover:bg-ug-purple-accent px-8 py-3 rounded-lg text-lg font-semibold shadow-md transition duration-300 ease-in-out transform hover:scale-105"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default SpotlightProduct;
