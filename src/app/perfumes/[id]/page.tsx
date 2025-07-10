// src/app/perfumes/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { useParams } from "next/navigation";
import { useProducts } from "../../../hooks/useProducts";
import { Product } from "../../../data/product1";
import {
  FaWhatsapp,
  FaStar,
  FaStarHalfAlt,
  FaChevronLeft,
} from "react-icons/fa";
import FragranceLoader from "../../../components/FragranceLoader";
import Link from "next/link";
import Image from "next/image";

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function PerfumeDetail() {
  const { id } = useParams();
  const { products, loading, error } = useProducts();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (products.length > 0 && id) {
      const foundProduct = products.find((p) => p.id === id);
      setProduct(foundProduct || null);
    }
  }, [products, id]);

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        // text-yellow-400 and text-gray-300 should map to CSS variables now
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i - 0.5 === rating) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaStar key={i} className="text-gray-300" />);
      }
    }
    return stars;
  };

  const defaultWhatsappNumber = "256702889253";
  const whatsappMessage = product
    ? `Hello, I'm interested in ordering the "${product.name}" perfume. Could you provide more details?`
    : "Hello, I'm interested in a perfume from your catalog. Could you provide more details?";

  const whatsappLink = `https://wa.me/${defaultWhatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  if (loading) {
    return <FragranceLoader message="Loading exquisite details..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ug-neutral-bg">
        <p className="text-2xl text-ug-error font-semibold">
          Error loading perfume: {error}
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-ug-neutral-bg p-4">
        <p className="text-2xl text-ug-text-dark mb-4">Perfume not found.</p>
        <Link
          href="/perfumes"
          className="inline-flex items-center text-ug-purple-primary font-medium hover:underline text-lg transition-colors duration-200"
        >
          <FaChevronLeft className="mr-2" /> Back to catalog
        </Link>
      </div>
    );
  }

  const imageSrc =
    product.imageUrl ||
    `https://placehold.co/600x600/E0BBE4/FFFFFF?text=${encodeURIComponent(
      product.name
    )}`;

  return (
    <div className="container mx-auto px-4 py-8 md:py-16 bg-ug-neutral-bg min-h-screen">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        // No dark: prefixes needed here!
        className="flex flex-col md:flex-row gap-8 lg:gap-16 items-center md:items-start
                   bg-white p-6 md:p-10 rounded-3xl
                   shadow-2xl // Shadows can be handled by custom utilities if needed
                   border border-ug-neutral-light
                   overflow-hidden"
      >
        {/* Product Image */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          // No dark: prefixes needed here!
          className="w-full md:w-1/2 lg:w-2/5 relative aspect-[3/4] rounded-xl overflow-hidden
                     shadow-2xl
                     flex-shrink-0 cursor-pointer
                     transform transition-transform duration-300 ease-in-out
                     border-2 border-ug-neutral-light"
        >
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="rounded-xl"
            priority
            onError={(e) => {
              e.currentTarget.src =
                "https://placehold.co/300x400/CCCCCC/000000?text=Image+Not+Found";
            }}
          />
        </motion.div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 lg:w-3/5 flex flex-col justify-center space-y-4 text-ug-text-dark">
          <motion.h1
            variants={itemVariants}
            className="text-4xl lg:text-5xl font-extrabold
                       text-ug-text-heading leading-tight
                       bg-gradient-to-r from-ug-purple-primary via-ug-text-dark to-ug-text-heading
                       text-transparent bg-clip-text drop-shadow-md"
          >
            {product.name}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-2xl text-ug-purple-primary font-semibold border-b pb-3 border-ug-neutral-light"
          >
            {product.brand}
          </motion.p>

          {/* Product Rating */}
          {product.rating && (
            <motion.div
              variants={itemVariants}
              className="flex items-center space-x-2 mt-2"
            >
              <div className="flex text-2xl">{renderStars(product.rating)}</div>
              <span className="text-xl font-semibold text-ug-text-heading">
                {product.rating.toFixed(1)}
              </span>
              {product.ratingSource && (
                <span className="text-sm text-ug-text-dark opacity-80">
                  (Source:{" "}
                  {product.ratingSource.split(",")[0].split("(")[0].trim()})
                </span>
              )}
            </motion.div>
          )}

          <motion.p
            variants={itemVariants}
            className="text-lg leading-relaxed mt-4"
          >
            {product.description}
          </motion.p>

          {/* Volume and Category details */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row sm:space-x-10 space-y-4 sm:space-y-0 mt-4"
          >
            <div>
              <p className="font-semibold text-ug-text-heading text-lg">
                Volume:
              </p>
              <p className="text-md text-ug-text-dark/90">
                {product.volume || "N/A"} ml
              </p>
            </div>
            <div>
              <p className="font-semibold text-ug-text-heading text-lg">
                Category:
              </p>
              <p className="text-md text-ug-text-dark/90 capitalize">
                {product.category}
              </p>
            </div>
          </motion.div>

          <motion.a
            variants={itemVariants}
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            // No dark: prefixes needed here!
            className="flex items-center justify-center gap-3
                       bg-ug-success hover:bg-green-600
                       text-white font-bold py-4 px-8 rounded-full text-lg shadow-xl mt-8
                       transition-all duration-300 ease-in-out
                       focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-offset-2
                       focus:ring-offset-ug-neutral-bg"
          >
            <FaWhatsapp size={24} />
            Order via WhatsApp
          </motion.a>
        </div>
      </motion.div>

      {/* Scent Notes Section */}
      {product.scentNotes && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          // No dark: prefixes needed here!
          className="bg-white p-6 sm:p-8 rounded-3xl
                     shadow-xl mt-12
                     border border-ug-neutral-light"
        >
          <h3
            className="text-2xl md:text-3xl font-semibold
                       text-ug-text-heading mb-4
                       border-b pb-3 border-ug-neutral-light
                       bg-gradient-to-r from-ug-purple-primary via-ug-text-dark to-ug-text-heading
                       text-transparent bg-clip-text drop-shadow-sm"
          >
            Scent Notes
          </h3>
          <ul className="text-ug-text-dark grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 text-lg">
            {product.scentNotes.topNotes && (
              <li className="flex items-center animate-fade-in-left">
                <span className="font-bold mr-3 text-ug-purple-primary text-xl">
                  &bull;
                </span>{" "}
                <strong>Top Notes:</strong> {product.scentNotes.topNotes}
              </li>
            )}
            {product.scentNotes.heartNotes && (
              <li className="flex items-center animate-fade-in-left delay-100">
                <span className="font-bold mr-3 text-ug-purple-primary text-xl">
                  &bull;
                </span>{" "}
                <strong>Heart Notes:</strong> {product.scentNotes.heartNotes}
              </li>
            )}
            {product.scentNotes.baseNotes && (
              <li className="flex items-center animate-fade-in-left delay-200">
                <span className="font-bold mr-3 text-ug-purple-primary text-xl">
                  &bull;
                </span>{" "}
                <strong>Base Notes:</strong> {product.scentNotes.baseNotes}
              </li>
            )}
          </ul>
        </motion.div>
      )}

      {/* Our Commitment / Why Choose Optimal Fragrance Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={itemVariants}
        // No dark: prefixes needed here!
        className="bg-white border border-ug-neutral-light p-6 sm:p-8 rounded-3xl shadow-xl mt-12"
      >
        <h3
          className="text-2xl md:text-3xl font-semibold
                     text-ug-text-heading mb-4
                     border-b pb-3 border-ug-neutral-light
                     bg-gradient-to-r from-ug-purple-primary via-ug-text-dark to-ug-text-heading
                     text-transparent bg-clip-text drop-shadow-sm"
        >
          Why Choose Optimal Fragrance?
        </h3>
        <div className="space-y-6 text-ug-text-dark text-lg leading-relaxed">
          <p className="animate-fade-in-left">
            At **Optimal Fragrance**, we are committed to providing you with
            **100% authentic, high-quality perfumes** sourced directly from
            trusted distributors. Every bottle we offer is meticulously
            inspected to ensure it meets our rigorous standards for excellence.
          </p>
          <p className="animate-fade-in-left delay-100">
            We believe in creating an exceptional experience, from Browse our
            curated collection to the moment your chosen scent arrives. Your
            satisfaction is our top priority, and we stand by the integrity of
            every product. Discover true luxury and peace of mind with Optimal
            Fragrance.
          </p>
        </div>
      </motion.div>

      {/* Back Button */}
      <div className="mt-10 text-center">
        <Link
          href="/perfumes"
          className="inline-flex items-center text-ug-purple-primary font-medium hover:underline text-lg transition-colors duration-200
                     hover:text-ug-purple-accent transform hover:-translate-x-1"
        >
          <FaChevronLeft className="mr-2" /> Back to catalog
        </Link>
      </div>
    </div>
  );
}
