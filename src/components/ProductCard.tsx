// src/components/ProductCard.tsx
"use client";

import React from "react";
import { Product } from "../data/product1"; // Ensure this path is correct
import { FaEye, FaStar, FaStarHalfAlt } from "react-icons/fa"; // Import star icons
import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const imageSrc =
    product.imageUrl ||
    `https://placehold.co/300x300/E0BBE4/FFFFFF?text=${encodeURIComponent(
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
        className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out
                   overflow-hidden flex flex-col h-full transform hover:-translate-y-1 group relative"
      >
        {/* Product Image */}
        <div className="relative w-full" style={{ paddingBottom: "100%" }}>
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="absolute inset-0 transform group-hover:scale-105 transition-transform duration-300 ease-in-out"
            onError={(e) => {
              (
                e.currentTarget as HTMLImageElement
              ).src = `https://placehold.co/300x300/CCCCCC/000000?text=${encodeURIComponent(
                product.name
              )}`;
            }}
          />

          {/* Hover Overlay with FaEye Icon */}
          <div
            className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center
                       opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer z-10"
          >
            <FaEye className="text-white text-5xl md:text-6xl" />
          </div>
        </div>

        {/* Product Details */}
        <div className="p-4 flex flex-col flex-grow">
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
