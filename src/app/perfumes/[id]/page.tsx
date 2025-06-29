"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useProducts } from "../../../hooks/useProducts";
import { Product } from "../../../data/product";
import { formatPrice } from "../../../utils/currencyFormatter";
import { FaWhatsapp } from "react-icons/fa";
import FragranceLoader from "../../../components/FragranceLoader";
import Link from "next/link";
import Image from "next/image";

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
        className="flex flex-col md:flex-row gap-8 lg:gap-16 items-center"
      >
        {/* Product Image */}
        <div className="w-full md:flex-1 relative aspect-[3/4] rounded-lg overflow-hidden shadow-lg">
          <Image
            src={imageSrc}
            alt={product.name}
            width={100}
            height={100}
            className="w-full h-full object-cover" // Use object-cover for fill effect without next/image
            onError={(e) => {
              e.currentTarget.src =
                "https://placehold.co/300x400/CCCCCC/000000?text=Image+Not+Found"; // Fallback image
            }}
          />
        </div>

        {/* Product Details */}
        <div className="w-full md:flex-1 flex flex-col justify-center space-y-4 text-ug-text-dark">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-ug-text-heading leading-tight">
            {product.name}
          </h1>
          <p className="text-xl text-ug-purple-primary font-semibold">
            {product.brand}
          </p>
          <p className="text-3xl font-bold text-ug-primary mb-2">
            {formatPrice(product.price, "UGX", 0)}
          </p>
          <p className="text-lg leading-relaxed">{product.description}</p>

          {/* Volume and Category details (retained from previous version, adjusted styling slightly) */}
          <div className="flex flex-col sm:flex-row sm:space-x-8 space-y-4 sm:space-y-0 mt-4">
            <div>
              <p className="font-semibold text-ug-text-heading">Volume:</p>
              <p className="text-md">{product.volume || "N/A"} ml</p>{" "}
              {/* Added fallback for volume */}
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
            className="flex items-center justify-center gap-3 bg-ug-success hover:bg-green-600 text-white font-bold py-4 px-8 rounded-2xl text-lg shadow-md"
          >
            <FaWhatsapp size={22} />
            Order via WhatsApp
          </motion.a>
        </div>
      </motion.div>

      {/* Scent Notes Section - Conditionally rendered from user's provided code */}
      {product.scentNotes && (
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow mt-12 border border-ug-neutral-light">
          <h3 className="text-2xl font-semibold text-ug-text-heading mb-4">
            Scent Notes
          </h3>
          <ul className="text-ug-text-dark grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm sm:text-base">
            {product.scentNotes.topNotes && (
              <li>
                <strong>Top Notes:</strong> {product.scentNotes.topNotes}
              </li>
            )}
            {product.scentNotes.heartNotes && (
              <li>
                <strong>Heart Notes:</strong> {product.scentNotes.heartNotes}
              </li>
            )}
            {product.scentNotes.baseNotes && (
              <li>
                <strong>Base Notes:</strong> {product.scentNotes.baseNotes}
              </li>
            )}
          </ul>
        </div>
      )}

      {/* Testimonials Section - From user's provided code */}
      <div className="bg-white border border-ug-neutral-light p-6 sm:p-8 rounded-xl shadow-sm mt-12">
        <h3 className="text-2xl font-semibold text-ug-text-heading mb-4">
          What Our Customers Say
        </h3>
        <div className="space-y-4 text-ug-text-dark text-sm sm:text-base">
          <blockquote className="border-l-4 border-ug-purple-accent pl-4 italic">
            “Absolutely stunning scent. It lasts all day and turns heads every
            time!”
            <span className="block mt-2 font-semibold">– Brenda K.</span>
          </blockquote>
          <blockquote className="border-l-4 border-ug-purple-accent pl-4 italic">
            “A perfect blend of elegance and sweetness. My go-to perfume.”
            <span className="block mt-2 font-semibold">– Daniel M.</span>
          </blockquote>
        </div>
      </div>

      {/* Back Button */}
      <div className="mt-10 text-center">
        <Link
          href="/perfumes"
          className="inline-block text-ug-purple-primary font-medium hover:underline text-base"
        >
          ← Back to catalog
        </Link>
      </div>
    </div>
  );
}
