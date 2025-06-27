// src/app/perfumes/page.tsx
'use client';

import { useState, useMemo, useEffect } from "react";
import { formatPrice } from "../../utils/currencyFormatter"; 
import { useProducts } from '../../hooks/useProducts'; 
import ProductCard from "../../components/ProductCard";

// Helper function to shuffle an array (Fisher-Yates algorithm)
const shuffleArray = <T extends unknown>(array: T[]): T[] => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

export default function PerfumesPage() {
  const { products: allProducts, loading, error } = useProducts(); // Use the custom hook to fetch all products

  const [selectedBrand, setSelectedBrand] = useState("All Brands");
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; // Two rows of 4 columns = 8 products per page

  // Select two random featured products to display prominently
  const topFeaturedProducts = useMemo(() => {
    const featured = allProducts.filter(p => p.featured);
    const shuffledFeatured = shuffleArray(featured);
    return shuffledFeatured.slice(0, 2);
  }, [allProducts]); // Re-shuffle only if allProducts changes

  // Filter out the top featured products from the main collection to avoid duplicates
  const mainCollectionProducts = useMemo(() => {
    const featuredIds = new Set(topFeaturedProducts.map(p => p.id));
    return allProducts.filter(p => !featuredIds.has(p.id));
  }, [allProducts, topFeaturedProducts]);

  const uniqueBrands = useMemo(() => {
    const brands = new Set<string>();
    allProducts.forEach((product) => brands.add(product.brand));
    return ["All Brands", ...Array.from(brands).sort()];
  }, [allProducts]);

  const filteredProducts = useMemo(() => {
    let productsToDisplay = mainCollectionProducts; // Start with products excluding top featured

    const lowerCaseSearchTerm = searchTerm.trim().toLowerCase();
    if (lowerCaseSearchTerm) {
      productsToDisplay = productsToDisplay.filter(
        (product) =>
          product.name.toLowerCase().includes(lowerCaseSearchTerm) ||
          product.description.toLowerCase().includes(lowerCaseSearchTerm) ||
          product.brand.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    if (selectedBrand !== 'All Brands') {
      productsToDisplay = productsToDisplay.filter(
        (product) => product.brand === selectedBrand
      );
    }

    const parsedMinPrice = parseFloat(minPrice);
    const parsedMaxPrice = parseFloat(maxPrice);

    if (!isNaN(parsedMinPrice)) {
      productsToDisplay = productsToDisplay.filter(
        (product) => product.price >= parsedMinPrice
      );
    }
    if (!isNaN(parsedMaxPrice)) {
      productsToDisplay = productsToDisplay.filter(
        (product) => product.price <= parsedMaxPrice
      );
    }
    return productsToDisplay;
  }, [selectedBrand, searchTerm, minPrice, maxPrice, mainCollectionProducts]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedBrand, searchTerm, minPrice, maxPrice]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const clearFilters = () => {
    setSelectedBrand("All Brands");
    setSearchTerm("");
    setMinPrice("");
    setMaxPrice("");
    setCurrentPage(1);
  };

  const getPaginationNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);

      if (currentPage > maxPagesToShow - 2 && totalPages > maxPagesToShow) {
        pageNumbers.push('...');
      }

      let startPage = Math.max(2, currentPage - Math.floor(maxPagesToShow / 2) + 1);
      let endPage = Math.min(totalPages - 1, currentPage + Math.floor(maxPagesToShow / 2) - 1);

      // Adjust range if near start or end
      if (currentPage <= Math.ceil(maxPagesToShow / 2)) {
        endPage = Math.min(totalPages -1, maxPagesToShow - 1);
        startPage = 2; // Make sure it doesn't go below 2
      } else if (currentPage > totalPages - Math.ceil(maxPagesToShow / 2)) {
        startPage = Math.max(2, totalPages - (maxPagesToShow - 2));
        endPage = totalPages - 1; // Make sure it doesn't go above totalPages - 1
      }

      for (let i = startPage; i <= endPage; i++) {
        if (i > 1 && i < totalPages) { // Ensure we don't duplicate first/last page
          pageNumbers.push(i);
        }
      }

      if (currentPage < totalPages - Math.floor(maxPagesToShow / 2) && totalPages > maxPagesToShow) {
        pageNumbers.push('...');
      }
      if (totalPages > 1) { // Only push last page if there's more than one page
        pageNumbers.push(totalPages);
      }
    }

    // Remove duplicates from pagination numbers
    return Array.from(new Set(pageNumbers)).sort((a: any, b: any) => {
        if (a === '...') return 1;
        if (b === '...') return -1;
        return a - b;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ug-neutral-bg">
        <p className="text-2xl text-ug-text-dark">Loading perfume catalog...</p>
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
    <div className="container mx-auto p-4 md:p-8 min-h-[calc(100vh-200px)]">
      <h1 className="text-5xl md:text-6xl font-extrabold text-ug-text-heading text-center mb-6">
        Our Perfume Collection
      </h1>
      <p className="text-xl text-ug-text-dark text-center max-w-2xl mx-auto mb-8">
        Explore a curated selection of fragrances crafted to evoke unique emotions and memories.
      </p>

      {/* Dynamic Featured Products Section */}
      {topFeaturedProducts.length > 0 && (
        <section className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-ug-purple-primary text-center mb-8">
            Special Highlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
            {topFeaturedProducts.map((product) => (
              <div key={product.id} className="relative bg-white rounded-lg shadow-lg overflow-hidden group">
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300 ease-in-out"
                    onError={(e) => {
                        e.currentTarget.src = 'https://placehold.co/400x300/CCCCCC/000000?text=Image+Not+Found'; // Fallback image
                    }}
                  />
                  <div className="absolute inset-0 bg-ug-purple-primary opacity-20 group-hover:opacity-30 transition-opacity duration-300 rounded-lg"></div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-xl font-bold text-ug-text-heading mb-2">
                    {product.name}
                  </h3>
                  <p className="text-ug-text-dark text-sm mb-3">
                    {product.description.substring(0, 100)}...
                  </p>
                  <span className="text-2xl font-extrabold text-ug-purple-primary">
                    {formatPrice(product.price, "UGX", 0)}
                  </span>
                  <div className="mt-4">
                    <a
                      href={`/perfumes/${product.id}`}
                      className="inline-block bg-ug-purple-primary text-white hover:bg-ug-purple-accent px-6 py-2 rounded-lg text-sm font-semibold shadow-md transition duration-300 ease-in-out"
                    >
                      View Details
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Filtering Controls */}
      <div className="bg-ug-neutral-bg rounded-lg shadow-md p-6 mb-12 flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6 flex-wrap">
        {/* Search Bar */}
        <div className="relative w-full max-w-sm md:max-w-xs">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full p-3 pl-10 border border-ug-neutral-light rounded-lg shadow-sm
                       focus:ring-ug-purple-primary focus:border-ug-purple-primary text-lg
                       bg-white text-ug-text-dark placeholder-ug-text-dark/70"
          />
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ug-text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>

        {/* Brand Filter Dropdown */}
        <label htmlFor="brand-filter" className="sr-only">
          Filter by Brand
        </label>
        <select
          id="brand-filter"
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="block w-full max-w-sm md:max-w-xs p-3 border border-ug-neutral-light rounded-lg shadow-sm
                     focus:ring-ug-purple-primary focus:border-ug-purple-primary text-lg
                     bg-white text-ug-text-dark cursor-pointer"
        >
          {uniqueBrands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>

        {/* Price Range Filters */}
        <div className="flex w-full max-w-sm md:max-w-xs gap-4">
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="block w-1/2 p-3 border border-ug-neutral-light rounded-lg shadow-sm
                       focus:ring-ug-purple-primary focus:border-ug-purple-primary text-lg
                       bg-white text-ug-text-dark placeholder-ug-text-dark/70"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="block w-1/2 p-3 border border-ug-neutral-light rounded-lg shadow-sm
                       focus:ring-ug-purple-primary focus:border-ug-purple-primary text-lg
                       bg-white text-ug-text-dark placeholder-ug-text-dark/70"
          />
        </div>

        {/* Clear Filters Button */}
        {(selectedBrand !== "All Brands" || searchTerm.trim() !== "" || minPrice !== "" || maxPrice !== "") && (
          <button
            onClick={clearFilters}
            className="w-full md:w-auto bg-ug-neutral-light text-ug-text-dark hover:bg-ug-text-heading hover:text-white px-6 py-3 rounded-lg text-lg font-semibold transition duration-300 ease-in-out"
          >
            Clear Filters
          </button>
        )}
      </div>

      {currentProducts.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-2xl text-ug-text-dark mb-4">
            No perfumes found matching your criteria.
          </p>
          <p className="text-lg text-ug-text-dark mb-6">
            Try adjusting your search term or filters.
          </p>
          <button
            onClick={clearFilters}
            className="inline-block bg-ug-purple-primary text-white hover:bg-ug-purple-accent px-8 py-4 rounded-lg text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <>
          {/* Product Grid (Paginated) - Two rows of 4 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination Controls - Modernized */}
          {totalPages > 1 && (
            <nav
              className="flex justify-center items-center space-x-2 mt-12"
              aria-label="Pagination"
            >
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-3 rounded-lg bg-ug-neutral-light text-ug-text-dark hover:bg-ug-purple-primary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 text-base"
              >
                Previous
              </button>
              {getPaginationNumbers().map((pageNumber, index) => (
                typeof pageNumber === 'number' ? (
                  <button
                    key={index}
                    onClick={() => paginate(pageNumber)}
                    className={`p-3 min-w-[40px] rounded-lg font-semibold transition-colors duration-200 text-base
                      ${
                        currentPage === pageNumber
                          ? "bg-ug-purple-primary text-white shadow-md"
                          : "bg-ug-neutral-bg text-ug-text-dark hover:bg-ug-neutral-light"
                      }`}
                  >
                    {pageNumber}
                  </button>
                ) : (
                  <span key={index} className="p-3 text-ug-text-dark">
                    {pageNumber}
                  </span>
                )
              ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-3 rounded-lg bg-ug-neutral-light text-ug-text-dark hover:bg-ug-purple-primary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 text-base"
              >
                Next
              </button>
            </nav>
          )}
        </>
      )}
    </div>
  );
}
