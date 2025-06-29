// src/components/ProductCard.tsx
"use client"; 

import React from "react";
import { formatPrice } from "../utils/currencyFormatter";
import { Product } from "../data/product"; 
import { FaEye } from "react-icons/fa";
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

  return (
    <Link href={`/perfumes/${product.id}`} className="block h-full">
      <div
        className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out
                   overflow-hidden flex flex-col h-full transform hover:-translate-y-1 group relative"
      >
        {/* Product Image */}
        <div className="relative w-full" style={{ paddingBottom: "100%" }}>
          {/* Replaced <img> with <Image /> */}
          <Image
            src={imageSrc}
            alt={product.name}
            fill // Use 'fill' to make it responsive within the parent div's padding-bottom trick
            style={{ objectFit: "cover" }} // Use style prop for objectFit with 'fill'
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Optimize based on common viewport sizes
            className="absolute inset-0 transform group-hover:scale-105 transition-transform duration-300 ease-in-out" // Added hover effect to Image
            onError={(e) => {
              // Note: For Next.js Image component, directly setting src on currentTarget
              // is generally discouraged. A better approach is to manage a fallback state.
              // However, to mimic the original behavior as closely as possible:
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
                       opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer z-10" // Added z-10 to ensure overlay is above image
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
          <p className="text-ug-purple-primary font-semibold text-lg mt-auto">
            {formatPrice(product.price, "UGX", 0)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
