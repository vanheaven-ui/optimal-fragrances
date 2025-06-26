"use client";

import { Product } from "@/product";
import Link from "next/link";
import { formatPrice } from "utils/currencyFormatter";

// Define an interface for the Spotlight product
interface SpotlightProductProps {
  product: Product;
  reverseLayout?: boolean; // For alternating image/text layout
}

const SpotlightProduct: React.FC<SpotlightProductProps> = ({
  product,
  reverseLayout = false,
}) => (
  <div
    className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 md:p-6 rounded-lg ${
      reverseLayout ? "md:flex-row-reverse" : ""
    }`}
  >
    <div className="relative w-full md:w-1/2 h-80 md:h-[400px] rounded-lg overflow-hidden shadow-lg transform hover:scale-[1.01] transition-transform duration-300 ease-in-out">
      {/* Replaced Next.js Image component with standard <img> tag */}
      <img
        src={product.imageUrl}
        alt={product.name}
        // Tailwind classes to mimic 'layout="fill"' and 'objectFit="cover"' behavior
        className="absolute inset-0 w-full h-full object-cover rounded-lg"
      />
      {/* Transparent overlay */}
      <div className="absolute inset-0 bg-ug-purple-primary opacity-20 rounded-lg"></div>
    </div>
    <div className="w-full md:w-1/2 text-center md:text-left">
      <h3 className="text-3xl md:text-4xl font-bold text-ug-text-heading mb-4 leading-tight">
        {product.name}{" "}
        <span className="block text-ug-purple-primary text-xl md:text-2xl font-semibold mt-1">
          {product.brand}
        </span>
      </h3>
      <p className="text-ug-text-dark leading-relaxed mb-6">
        {/* Shorten description for spotlight, or add a dedicated 'shortDescription' to Product */}
        {product.description.length > 200
          ? product.description.substring(0, 200) + "..."
          : product.description}
      </p>
      <div className="flex items-baseline justify-center md:justify-start mb-6">
        <span className="text-4xl font-extrabold text-ug-purple-primary mr-2">
          UGX {formatPrice(product.price, "UGX", 0)} {/* Format price */}
        </span>
      </div>
      {/* Replaced Next.js Link component with standard <a> tag */}
      <Link
        href={`/perfumes/${product.id}`}
        className="inline-block bg-ug-purple-primary text-white hover:bg-ug-purple-accent px-8 py-3 rounded-lg text-lg font-semibold shadow-md transition duration-300 ease-in-out transform hover:scale-105"
      >
        View Details
      </Link>
    </div>
  </div>
);

export default SpotlightProduct;
