// HomePage.tsx
"use client";

import { useMemo, useState } from "react"; // Import useState
import { useProducts } from "../hooks/useProducts";
import SpotlightProduct from "../components/SpotLightProduct";
import ProductCard from "../components/ProductCard";
import FragranceLoader from "../components/FragranceLoader";
import Link from "next/link";

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
  // State to manage the loading status of the "View All Perfumes" button
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

  // Handler for the "View All Perfumes" button click
  const handleViewAllPerfumesClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Prevent default navigation if we are already loading or to simulate async
    if (isViewingAllPerfumes) {
      e.preventDefault();
      return; // Do nothing if already loading
    }
    
    e.preventDefault(); // Prevent default link behavior initially
    setIsViewingAllPerfumes(true); // Set loading state to true

    // Simulate an async operation (e.g., fetching more data, navigation)
    // In a real app, this would be replaced by actual data fetching or router.push
    setTimeout(() => {
      window.location.href = "/perfumes"; // Navigate after a delay
      // In a real application, you might reset the loading state if navigation fails,
      // or if you're fetching data on the current page before rendering something new.
    }, 1500); // Simulate 1.5 seconds of loading
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
      {/* 1. Concise Introduction Banner */}
      <section className="bg-gradient-to-r from-ug-purple-primary to-ug-purple-accent text-white py-16 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight bg-gradient-to-r from-ug-neutral-bg via-white to-pink-400 text-transparent bg-clip-text">
            Discover Your Signature Scent
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            Welcome to Optimal Fragrance – where luxury meets individuality.
          </p>
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
              onClick={handleViewAllPerfumesClick} // Attach the click handler
              // Conditionally apply classes for visual feedback and disable effect
              className={`inline-block bg-ug-purple-primary text-white px-10 py-4 rounded-lg text-lg font-semibold shadow-lg transition duration-300 ease-in-out
                ${
                  isViewingAllPerfumes // If loading
                    ? 'opacity-70 cursor-not-allowed' // Dim and prevent clicks
                    : 'hover:bg-ug-purple-accent transform hover:scale-105' // Normal state
                }
              `}
              aria-disabled={isViewingAllPerfumes} // For accessibility
            >
              {/* Conditional text rendering */}
              {isViewingAllPerfumes ? 'Loading...' : 'View All Perfumes'}
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