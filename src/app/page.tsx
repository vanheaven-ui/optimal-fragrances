"use client";

import { useMemo } from "react";
import { useProducts } from "../hooks/useProducts";
import  SpotlightProduct from "../components/SpotLightProduct";
import ProductCard from "../components/ProductCard";

// Helper function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

export default function HomePage() {
  const { products, loading, error } = useProducts(); // Use the custom hook to fetch products

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ug-neutral-bg">
        <p className="text-2xl text-ug-text-dark">Loading perfumes...</p>
      </div>
    );
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
      {/* 1. Concise Introduction Banner */}
      <section className="bg-gradient-to-r from-ug-purple-primary to-ug-purple-accent text-white py-16 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            Discover Your Signature Scent
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            Welcome to Optimal Fragrance – where luxury meets individuality.
          </p>
        </div>
      </section>

      {/* 2. Featured Spotlight / Hero Perfume Section */}
      <section className="container mx-auto py-16 px-4 bg-ug-neutral-bg">
        <h2 className="text-4xl md:text-5xl font-bold text-ug-text-heading text-center mb-16">
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
            <p className="text-center text-xl text-ug-text-dark">
              No spotlight perfumes available at the moment.
            </p>
          )}
        </div>
      </section>

      {/* 3. Curated Selection Grid */}
      {curatedProducts.length > 0 && (
        <section className="container mx-auto py-16 px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-ug-text-heading text-center mb-12">
            Explore More from Our Collection
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {curatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-16">
            <a
              href="/perfumes"
              className="inline-block bg-ug-purple-primary text-white hover:bg-ug-purple-accent px-10 py-4 rounded-lg text-lg font-semibold shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              View All Perfumes
            </a>
          </div>
        </section>
      )}

      {/* 4. Our Vision/Story Section */}
      <section className="bg-ug-neutral-bg py-16 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold text-ug-text-heading mb-6">
            Our Vision
          </h2>
          <p className="text-lg text-ug-text-dark leading-relaxed mb-4">
            At Optimal Fragrance, we believe that a scent is more than just a
            fragrance; it's an extension of your personality, a memory, a
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
