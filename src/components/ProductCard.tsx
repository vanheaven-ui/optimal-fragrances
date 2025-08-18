"use client";

import React, { useState } from "react";
import { Product } from "../data/product";
import { FaEye, FaStar, FaStarHalfAlt } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isLoading, setIsLoading] = useState(true); // State to track image loading

  const imageSrc =
    product.imageUrl && product.imageUrl !== "/.jpeg" // Ensure valid image before using
      ? product.imageUrl
      : `https://placehold.co/300x300/E0BBE4/FFFFFF?text=${encodeURIComponent(
          product.name
        )}`;

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
    <Link href={`/perfumes/${product.id}`} className="block h-full">
      <div
        className="bg-white dark:bg-ug-neutral-light rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out
                   overflow-hidden flex flex-col h-full transform hover:-translate-y-1 group relative"
      >
        {/* Product Image Container */}
        <div className="relative w-full" style={{ paddingBottom: "100%" }}>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 z-10">
              {/* Modern Spinner */}
              <div
                className="w-10 h-10 border-4 border-ug-purple-primary border-t-transparent rounded-full animate-spin"
                role="status"
              >
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )}

          <Image
            src={imageSrc}
            alt={product.name}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`absolute inset-0 transform group-hover:scale-105 transition-transform duration-300 ease-in-out
                         ${isLoading ? "opacity-0" : "opacity-100"}`}
            onLoadingComplete={() => setIsLoading(false)}
            onError={(e) => {
              setIsLoading(false);
              (
                e.currentTarget as HTMLImageElement
              ).src = `https://placehold.co/300x300/CCCCCC/000000?text=${encodeURIComponent(
                product.name
              )}`;
            }}
          />

          {/* NEW: Theme-aware Hover Overlay */}
          {/* This div uses the image-overlay-on-hover class from globals.css */}
          <div className="image-overlay-on-hover"></div>

          {/* Existing Hover Content (FaEye Icon) - Ensure it's above the overlay */}
          <div
            className="absolute inset-0 flex items-center justify-center
                       opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" // z-index: 20 keeps it above the overlay (z-index: 1)
          >
            <FaEye className="text-white text-5xl md:text-6xl" />
          </div>
        </div>

        {/* Product Details */}
        <div className="p-4 flex flex-col flex-grow bg-white dark:bg-ug-neutral-light">
          <h3 className="text-xl font-bold text-ug-text-heading mb-1 leading-tight">
            {product.name}
          </h3>
          <p className="text-ug-text-dark text-sm mb-2">{product.brand}</p>
          {product.rating && (
            <div className="flex items-center mt-auto">
              <div className="flex text-lg">{renderStars(product.rating)}</div>
              <span className="ml-2 text-ug-text-dark text-sm">
                ({product.rating.toFixed(1)})
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
