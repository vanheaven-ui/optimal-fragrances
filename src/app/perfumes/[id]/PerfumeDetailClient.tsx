"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import type { Product } from "@/product"; // Assuming @/product points to src/data/products.ts
import { formatPrice } from "utils/currencyFormatter";

export default function PerfumeDetailClient({ perfume }: { perfume: Product }) {
  // Use a default WhatsApp number, perhaps from a config or environment variable
  // For now, using a placeholder number as it's not defined elsewhere in the context.
  const defaultWhatsappNumber = "256758071512"; // Replace with Dr. Enok's actual number

  const whatsappMessage = `Hello, I'm interested in ordering the "${perfume.name}" perfume. Could you provide more details?`;
  // Use a product-specific WhatsApp channel link if available, otherwise fallback to the default number
  const whatsappLink = perfume.whatsappChannelLink
    ? perfume.whatsappChannelLink // Use product-specific channel link
    : `https://wa.me/${defaultWhatsappNumber}?text=${encodeURIComponent(
        whatsappMessage
      )}`;

  return (
    <div className="container mx-auto p-6 sm:p-8 max-w-7xl min-h-[calc(100vh-100px)] flex flex-col gap-12">
      {/* Product Overview */}
      <div className="flex flex-col md:flex-row gap-10">
        <div className="md:flex-1 w-full relative aspect-[3/4] rounded-lg overflow-hidden shadow-lg">
          <Image
            src={perfume.imageUrl}
            alt={perfume.name}
            fill
            objectFit="fill"
            className="object-cover"
            onError={(e) => {
              e.currentTarget.src =
                "https://placehold.co/300x400/CCCCCC/000000?text=Image+Not+Found"; // Fallback image
            }}
          />
        </div>

        <div className="md:flex-1 flex flex-col justify-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ug-text-heading mb-4">
            {perfume.name}
          </h1>
          <h2 className="text-lg sm:text-xl text-ug-text-dark mb-4">
            {perfume.brand}
          </h2>
          <p className="text-base sm:text-lg text-ug-text-dark leading-relaxed mb-6">
            {perfume.description}
          </p>

          <div className="text-3xl sm:text-4xl font-bold text-ug-purple-primary mb-8">
            UGX {formatPrice(perfume.price, "UGX", 0)}
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
      </div>

      {/* Scent Notes Section - Conditionally rendered */}
      {perfume.scentNotes && (
        <div className="bg-ug-neutral-bg p-6 sm:p-8 rounded-xl shadow">
          <h3 className="text-2xl font-semibold text-ug-text-heading mb-4">
            Scent Notes
          </h3>
          <ul className="text-ug-text-dark grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm sm:text-base">
            {perfume.scentNotes.topNotes && (
              <li>
                <strong>Top Notes:</strong> {perfume.scentNotes.topNotes}
              </li>
            )}
            {perfume.scentNotes.heartNotes && (
              <li>
                <strong>Heart Notes:</strong> {perfume.scentNotes.heartNotes}
              </li>
            )}
            {perfume.scentNotes.baseNotes && (
              <li>
                <strong>Base Notes:</strong> {perfume.scentNotes.baseNotes}
              </li>
            )}
          </ul>
        </div>
      )}

      {/* Testimonials Section */}
      <div className="bg-white border border-ug-neutral-light p-6 sm:p-8 rounded-xl shadow-sm">
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
        <a
          href="/perfumes"
          className="inline-block text-ug-purple-primary font-medium hover:underline text-base"
        >
          ← Back to catalog
        </a>
      </div>
    </div>
  );
}
