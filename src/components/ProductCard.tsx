// src/components/ProductCard.tsx
// This component does NOT need 'use client' if it doesn't use client hooks directly.
// But if other parts of it (like onError) require it, keep it.
// Assuming it needs 'use client' for now due to your original snippet.
"use client";

import React from "react";
import { formatPrice } from "../utils/currencyFormatter";
import { Product } from "../data/product";
import { FaEye } from "react-icons/fa";
import Link from "next/link"; // Revert to using standard next/link

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
    // Use standard Link from next/link. The global loader will be handled by layout.tsx
    <Link href={`/perfumes/${product.id}`} className="block h-full">
      <div
        className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out
                   overflow-hidden flex flex-col h-full transform hover:-translate-y-1 group relative"
      >
        {/* Product Image */}
        <div className="relative w-full" style={{ paddingBottom: "100%" }}>
          <img
            src={imageSrc}
            alt={product.name}
            width={300}
            height={300}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = `https://placehold.co/300x300/CCCCCC/000000?text=${encodeURIComponent(
                product.name
              )}`;
            }}
          />

          {/* Hover Overlay with FaEye Icon */}
          <div
            className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center
                       opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
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
