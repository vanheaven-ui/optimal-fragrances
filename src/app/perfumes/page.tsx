// src/app/perfumes/page.tsx
"use client";

import { products } from "@/product";
import ProductCard from "components/ProductCard";
import { useState, useMemo, useEffect } from "react";

export default function PerfumesPage() {
  const allProducts = products;
  const [selectedBrand, setSelectedBrand] = useState("All Brands");
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState<string>(""); // State for min price input (string for user input)
  const [maxPrice, setMaxPrice] = useState<string>(""); // State for max price input (string for user input)
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; // Two rows of 4 columns = 8 products per page

  const uniqueBrands = useMemo(() => {
    const brands = new Set<string>();
    allProducts.forEach((product) => brands.add(product.brand));
    return ["All Brands", ...Array.from(brands).sort()];
  }, [allProducts]); // Depend on allProducts

  const filteredProducts = useMemo(() => {
    let productsToDisplay = allProducts;

    const lowerCaseSearchTerm = searchTerm.trim().toLowerCase();
    if (lowerCaseSearchTerm) {
      productsToDisplay = productsToDisplay.filter(
        (product) =>
          product.name.toLowerCase().includes(lowerCaseSearchTerm) ||
          product.description.toLowerCase().includes(lowerCaseSearchTerm) ||
          product.brand.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    if (selectedBrand !== "All Brands") {
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

    // This useEffect handles resetting currentPage, removing it from useMemo dependencies
    return productsToDisplay;
  }, [selectedBrand, searchTerm, minPrice, maxPrice, allProducts]);

  // Effect to reset current page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedBrand, searchTerm, minPrice, maxPrice]);

  // Pagination Logic
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
      window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top on page change
    }
  };

  const clearFilters = () => {
    setSelectedBrand("All Brands");
    setSearchTerm("");
    setMinPrice("");
    setMaxPrice("");
    setCurrentPage(1);
  };

  // Logic for displaying pagination numbers (more modern approach)
  const getPaginationNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // e.g., 1 ... 4 5 6 ... 10

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1); // Always show first page

      if (currentPage > maxPagesToShow - 2) {
        // If current page is far enough from start
        pageNumbers.push("...");
      }

      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      // Adjust range if near start or end
      if (currentPage < maxPagesToShow - 1) {
        endPage = Math.min(totalPages - 1, maxPagesToShow - 1);
      } else if (currentPage > totalPages - (maxPagesToShow - 2)) {
        startPage = Math.max(2, totalPages - (maxPagesToShow - 2));
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (currentPage < totalPages - (maxPagesToShow - 2)) {
        // If current page is far enough from end
        pageNumbers.push("...");
      }
      pageNumbers.push(totalPages); // Always show last page
    }
    return pageNumbers;
  };

  return (
    <div className="container mx-auto p-4 md:p-8 min-h-[calc(100vh-200px)]">
      <h1 className="text-5xl md:text-6xl font-extrabold text-ug-text-heading text-center mb-6">
        Our Perfume Collection
      </h1>
      <p className="text-xl text-ug-text-dark text-center max-w-2xl mx-auto mb-8">
        Explore a curated selection of fragrances crafted to evoke unique
        emotions and memories.
      </p>

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
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ug-text-dark"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
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
        {(selectedBrand !== "All Brands" ||
          searchTerm.trim() !== "" ||
          minPrice !== "" ||
          maxPrice !== "") && (
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
              {getPaginationNumbers().map((pageNumber, index) =>
                typeof pageNumber === "number" ? (
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
              )}
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
