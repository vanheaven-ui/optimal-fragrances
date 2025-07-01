// src/app/page.tsx
"use client";

import { useMemo, useState } from "react";
import { useProducts } from "../hooks/useProducts";
import SpotlightProduct from "../components/SpotLightProduct";
import ProductCard from "../components/ProductCard";
import FragranceLoader from "../components/FragranceLoader";
import Link from "next/link";

// Helper function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = [...array.reverse()];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

export default function HomePage() {
  const { products, loading, error } = useProducts();
  const [isViewingAllPerfumes, setIsViewingAllPerfumes] = useState(false);

  const allFeaturedProducts = useMemo(() => {
    return products.filter((p) => p.featured);
  }, [products]);

  const spotlightProducts = useMemo(() => {
    return shuffleArray(allFeaturedProducts).slice(0, 2);
  }, [allFeaturedProducts]);

  const nonSpotlightProducts = useMemo(() => {
    const spotlightIds = new Set(spotlightProducts.map((p) => p.id));
    return products.filter((product) => !spotlightIds.has(product.id));
  }, [products, spotlightProducts]);

  const curatedProducts = useMemo(() => {
    return shuffleArray(nonSpotlightProducts).slice(0, 4);
  }, [nonSpotlightProducts]);

  const handleViewAllPerfumesClick = (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    if (isViewingAllPerfumes) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    setIsViewingAllPerfumes(true);
    setTimeout(() => {
      window.location.href = "/perfumes";
    }, 1500);
  };

  if (loading) {
    return <FragranceLoader message="Unveiling exquisite scents..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ug-neutral-bg">
        <p className="text-2xl text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* 1. Concise Introduction Banner (Hero Section) */}
      <section className="bg-gradient-to-r from-ug-purple-primary to-ug-purple-accent text-white py-16 text-center relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight bg-gradient-to-r from-ug-neutral-bg via-white to-pink-400 text-transparent bg-clip-text">
            Discover Your Signature Scent
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            Welcome to Optimal Fragrance – where luxury meets individuality.
          </p>
        </div>

        {/* Inlined SVG for Spraying Perfume Bottle */}
        <div className="absolute inset-0 z-0 opacity-20">
          {/* SVG Code Starts Here */}
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 250 250"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full transform scale-150 md:scale-125 lg:scale-100 xl:scale-90 -rotate-12 translate-x-1/3 translate-y-1/4 md:translate-x-1/4 md:translate-y-0"
          >
            <title>Perfume Bottle Spray</title>

            {/* Bottle Body */}
            <rect
              x="75"
              y="70"
              width="100"
              height="130"
              rx="15"
              fill="#E0BBE4"
            />
            <rect
              x="75"
              y="70"
              width="100"
              height="130"
              rx="15"
              stroke="#9A6FA6"
              strokeWidth="2"
            />

            {/* Bottle Neck/Sprayer Top */}
            <rect x="115" y="45" width="20" height="25" rx="5" fill="#C29DCC" />
            <rect
              x="115"
              y="45"
              width="20"
              height="25"
              rx="5"
              stroke="#9A6FA6"
              strokeWidth="1.5"
            />

            {/* Sprayer Nozzle */}
            <circle cx="125" cy="40" r="5" fill="#6A4E7A" />

            <path
              d="M125 35 C130 15, 145 5, 155 15 C160 20, 150 30, 145 35 C140 40, 130 40, 125 35Z"
              fill="url(#sprayGradient)"
              opacity="0.8"
            />
            <path
              d="M125 35 C120 15, 105 5, 95 15 C90 20, 100 30, 105 35 C110 40, 120 40, 125 35Z"
              fill="url(#sprayGradient)"
              opacity="0.8"
            />
            <path
              d="M125 35 C125 10, 125 0, 125 15 C125 25, 125 30, 125 35Z"
              fill="url(#sprayGradient)"
              opacity="0.8"
            />

            <defs>
              <linearGradient
                id="sprayGradient"
                x1="125"
                y1="5"
                x2="125"
                y2="35"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="white" stopOpacity="0.8" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
          {/* SVG Code Ends Here */}
        </div>
      </section>

      {/* 2. Featured Spotlight / Hero Perfume Section */}
      <section className="container mx-auto py-16 px-4 bg-ug-neutral-bg">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-ug-purple-primary via-ug-text-dark to-ug-text-heading text-transparent bg-clip-text">
          Handpicked for You
        </h2>
        <div className="space-y-20">
          {spotlightProducts.length > 0 ? (
            <>
              <SpotlightProduct product={spotlightProducts[0]} />
              {spotlightProducts.length > 1 && (
                <SpotlightProduct
                  product={spotlightProducts[1]}
                  reverseLayout={true}
                />
              )}
            </>
          ) : (
            <p className="text-center text-xl bg-gradient-to-r from-ug-purple-primary via-ug-text-dark to-ug-text-heading text-transparent bg-clip-text">
              No spotlight perfumes available at the moment.
            </p>
          )}
        </div>
      </section>

      {/* 3. Curated Selection Grid */}
      {curatedProducts.length > 0 && (
        <section className="container mx-auto py-6 px-4">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-ug-purple-primary via-ug-text-dark to-ug-text-heading text-transparent bg-clip-text text-center mb-12">
            Explore More from Our Collection
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {curatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-16">
            <Link
              href="/perfumes"
              onClick={handleViewAllPerfumesClick}
              className={`inline-block bg-ug-purple-primary text-white px-10 py-4 rounded-lg text-lg font-semibold shadow-lg transition duration-300 ease-in-out
                ${
                  isViewingAllPerfumes
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:bg-ug-purple-accent transform hover:scale-105"
                }
              `}
              aria-disabled={isViewingAllPerfumes}
            >
              {isViewingAllPerfumes ? "Loading..." : "View All Perfumes"}
            </Link>
          </div>
        </section>
      )}

      {/* 4. Our Vision/Story Section */}
      <section className="bg-ug-neutral-bg py-6 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-ug-purple-primary via-ug-text-dark to-ug-text-heading text-transparent bg-clip-text">
            Our Vision
          </h2>
          <p className="text-lg text-ug-text-dark leading-relaxed mb-4">
            At Optimal Fragrance, we believe that a scent is more than just a
            fragrance; it&lsquo;s an extension of your personality, a memory, a
            feeling. We meticulously curate a collection of the finest perfumes
            from around the world, ensuring authenticity and unparalleled
            quality.
          </p>
          <p className="text-lg text-ug-text-dark leading-relaxed">
            Our passion is to help you discover the perfect aroma that speaks to
            your soul and leaves a lasting impression. Explore our collection
            and embark on a sensory journey unlike any other.
          </p>
        </div>
      </section>
    </div>
  );
}
