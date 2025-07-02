// src/app/perfumes/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useProducts } from "../../../hooks/useProducts";
import { Product } from "../../../data/product1"; // Ensure this path is correct
import { FaWhatsapp, FaStar, FaStarHalfAlt } from "react-icons/fa"; // Import star icons
import FragranceLoader from "../../../components/FragranceLoader";
import Link from "next/link";
import Image from "next/image"; // Ensure Image is imported

export default function PerfumeDetail() {
  const { id } = useParams(); // Get the product ID from the URL
  const { products, loading, error } = useProducts();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (products.length > 0 && id) {
      // Find the product by ID from the fetched products
      const foundProduct = products.find((p) => p.id === id);
      setProduct(foundProduct || null);
    }
  }, [products, id]); // Re-run when products or id change

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

  // Determine WhatsApp link
  // Use a default WhatsApp number if no specific channel link is provided
  const defaultWhatsappNumber = "256702889253"; // Dr. Enok's number
  const whatsappMessage = product
    ? `Hello, I'm interested in ordering the "${product.name}" perfume. Could you provide more details?`
    : "Hello, I'm interested in a perfume from your catalog. Could you provide more details?";

  const whatsappLink = `https://wa.me/${defaultWhatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  // Check if product is available
  if (loading) {
    return <FragranceLoader message="Loading perfume details..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ug-neutral-bg">
        <p className="text-2xl text-red-600">{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ug-neutral-bg">
        <p className="text-2xl text-ug-text-dark">Perfume not found.</p>
      </div>
    );
  }

  // Determine image source, using a placeholder if `imageUrl` is not available
  const imageSrc =
    product.imageUrl ||
    `https://placehold.co/600x600/E0BBE4/FFFFFF?text=${encodeURIComponent(
      product.name
    )}`;

  return (
    <div className="container mx-auto px-4 py-8 md:py-16 bg-ug-neutral-bg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row gap-8 lg:gap-16 items-center md:items-start bg-white p-6 md:p-10 rounded-2xl shadow-xl"
      >
        {/* Product Image */}
        {/* Added overflow-hidden to the parent for smooth zoom and hover:scale-105 for the zoom effect */}
        <div className="w-full md:w-1/2 lg:w-2/5 relative aspect-[3/4] rounded-lg overflow-hidden shadow-2xl flex-shrink-0 cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105">
          <Image
            src={imageSrc}
            alt={product.name}
            fill // Use fill to make it responsive within the parent div's aspect ratio
            style={{ objectFit: "cover" }} // Ensure image covers the area, maintaining aspect ratio
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Optimize image loading
            className="rounded-lg" // Apply border-radius directly to the Image for consistency
            onError={(e) => {
              e.currentTarget.src =
                "https://placehold.co/300x400/CCCCCC/000000?text=Image+Not+Found"; // Fallback image
            }}
          />
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 lg:w-3/5 flex flex-col justify-center space-y-5 text-ug-text-dark">
          {/* Applied gradient to product name H1 */}
          <h1 className="text-4xl lg:text-5xl font-extrabold text-ug-text-heading leading-tight mb-2 bg-gradient-to-r from-ug-purple-primary via-ug-text-dark to-ug-text-heading text-transparent bg-clip-text">
            {product.name}
          </h1>
          <p className="text-2xl text-ug-purple-primary font-semibold border-b pb-3 border-ug-neutral-light">
            {product.brand}
          </p>

          {/* Product Rating */}
          {product.rating && (
            <div className="flex items-center space-x-2 mt-2">
              <div className="flex text-2xl">{renderStars(product.rating)}</div>
              <span className="text-xl font-semibold text-ug-text-heading">
                {product.rating.toFixed(1)}
              </span>
              {product.ratingSource && (
                <span className="text-sm text-ug-text-dark">
                  (Source:{" "}
                  {product.ratingSource.split(",")[0].split("(")[0].trim()})
                </span>
              )}
            </div>
          )}

          <p className="text-lg leading-relaxed mt-4">{product.description}</p>

          {/* Volume and Category details */}
          <div className="flex flex-col sm:flex-row sm:space-x-8 space-y-4 sm:space-y-0 mt-4">
            <div>
              <p className="font-semibold text-ug-text-heading">Volume:</p>
              <p className="text-md">{product.volume || "N/A"} ml</p>
            </div>
            <div>
              <p className="font-semibold text-ug-text-heading">Category:</p>
              <p className="text-md capitalize">{product.category}</p>
            </div>
          </div>

          <motion.a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-3 bg-ug-success hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full text-lg shadow-xl mt-6 transition-all duration-300 ease-in-out"
          >
            <FaWhatsapp size={24} />
            Order via WhatsApp
          </motion.a>
        </div>
      </motion.div>

      {/* Scent Notes Section */}
      {product.scentNotes && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl mt-12 border border-ug-neutral-light">
          {/* Applied gradient to Scent Notes H3 */}
          <h3 className="text-2xl font-semibold text-ug-text-heading mb-4 border-b pb-3 border-ug-neutral-light bg-gradient-to-r from-ug-purple-primary via-ug-text-dark to-ug-text-heading text-transparent bg-clip-text">
            Scent Notes
          </h3>
          <ul className="text-ug-text-dark grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 text-base">
            {product.scentNotes.topNotes && (
              <li className="flex items-center">
                <span className="font-bold mr-2 text-ug-purple-primary text-xl">
                  &bull;
                </span>{" "}
                <strong>Top Notes:</strong> {product.scentNotes.topNotes}
              </li>
            )}
            {product.scentNotes.heartNotes && (
              <li className="flex items-center">
                <span className="font-bold mr-2 text-ug-purple-primary text-xl">
                  &bull;
                </span>{" "}
                <strong>Heart Notes:</strong> {product.scentNotes.heartNotes}
              </li>
            )}
            {product.scentNotes.baseNotes && (
              <li className="flex items-center">
                <span className="font-bold mr-2 text-ug-purple-primary text-xl">
                  &bull;
                </span>{" "}
                <strong>Base Notes:</strong> {product.scentNotes.baseNotes}
              </li>
            )}
          </ul>
        </div>
      )}

      {/* Our Commitment / Why Choose Optimal Fragrance Section */}
      <div className="bg-white border border-ug-neutral-light p-6 sm:p-8 rounded-2xl shadow-xl mt-12">
        {/* Applied gradient to Why Choose H3 */}
        <h3 className="text-2xl font-semibold text-ug-text-heading mb-4 border-b pb-3 border-ug-neutral-light bg-gradient-to-r from-ug-purple-primary via-ug-text-dark to-ug-text-heading text-transparent bg-clip-text">
          Why Choose Optimal Fragrance?
        </h3>
        <div className="space-y-6 text-ug-text-dark text-base">
          <p className="leading-relaxed">
            At <strong>Optimal Fragrance</strong>, we are committed to providing you with
            <strong>100% authentic, high-quality perfumes</strong> sourced directly from
            trusted distributors. Every bottle we offer is meticulously
            inspected to ensure it meets our rigorous standards for excellence.
          </p>
          <p className="leading-relaxed">
            We believe in creating an exceptional experience, from Browse our
            curated collection to the moment your chosen scent arrives. Your
            satisfaction is our top priority, and we stand by the integrity of
            every product. Discover true luxury and peace of mind with Optimal
            Fragrance.
          </p>
        </div>
      </div>

      {/* Back Button */}
      <div className="mt-10 text-center">
        <Link
          href="/perfumes"
          className="inline-block text-ug-purple-primary font-medium hover:underline text-lg transition-colors duration-200"
        >
          ← Back to catalog
        </Link>
      </div>
    </div>
  );
}
