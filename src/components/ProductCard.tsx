// src/components/ProductCard.tsx
import React from "react";
import { formatPrice } from "../utils/currencyFormatter"; 
import { Product } from "../data/product"

interface ProductCardProps {
  product: Product; // Explicitly type the product prop
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const imageSrc =
    product.imageUrl ||
    `https://placehold.co/300x300/E0BBE4/FFFFFF?text=${encodeURIComponent(
      product.name
    )}`;

  return (
    <a href={`/perfumes/${product.id}`} className="block h-full">
      <div
        className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out
                      overflow-hidden flex flex-col h-full transform hover:-translate-y-1"
      >
        {/* Product Image */}
        <div className="relative w-full" style={{ paddingBottom: "100%" }}>
          {" "}
          {/* 1:1 Aspect Ratio */}
          <img
            src={imageSrc}
            alt={product.name}
            width={300} // Explicit width
            height={300} // Explicit height
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = `https://placehold.co/300x300/CCCCCC/000000?text=${encodeURIComponent(
                product.name
              )}`;
            }} // Fallback
          />
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
    </a>
  );
};

export default ProductCard;
