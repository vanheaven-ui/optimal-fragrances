"use client";

import { useState, useMemo, useEffect } from "react";
import { useProducts } from "../../hooks/useProducts";
import ProductCard from "../../components/ProductCard";
import FragranceLoader from "../../components/FragranceLoader";
import Image from "next/image";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

// Helper function to shuffle an array (Fisher-Yates algorithm)
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
const shuffleArray = <T extends unknown>(array: T[]): T[] => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

export default function PerfumesPage() {
  const { products: allProducts, loading, error } = useProducts();

  const [selectedBrand, setSelectedBrand] = useState("All Brands");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All Categories"); // New state for category
  const [selectedTopNote, setSelectedTopNote] = useState("All Top Notes"); // New state for top notes
  const [selectedHeartNote, setSelectedHeartNote] = useState("All Heart Notes"); // New state for heart notes
  const [selectedBaseNote, setSelectedBaseNote] = useState("All Base Notes"); // New state for base notes

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const [featuredImageLoading, setFeaturedImageLoading] = useState<{
    [id: string]: boolean;
  }>({});

  const topFeaturedProducts = useMemo(() => {
    const featured = allProducts.filter((p) => p.featured);
    const shuffledFeatured = shuffleArray(featured);
    return shuffledFeatured.slice(0, 2);
  }, [allProducts]);

  useEffect(() => {
    const initialLoadingState: { [id: string]: boolean } = {};
    topFeaturedProducts.forEach((product) => {
      initialLoadingState[product.id] = true;
    });
    setFeaturedImageLoading(initialLoadingState);
  }, [topFeaturedProducts]);

  const mainCollectionProducts = useMemo(() => {
    const featuredIds = new Set(topFeaturedProducts.map((p) => p.id));
    return allProducts.filter((p) => !featuredIds.has(p.id));
  }, [allProducts, topFeaturedProducts]);

  const uniqueBrands = useMemo(() => {
    const brands = new Set<string>();
    allProducts.forEach((product) => brands.add(product.brand));
    return ["All Brands", ...Array.from(brands).sort()];
  }, [allProducts]);

  const uniqueCategories = useMemo(() => {
    const categories = new Set<string>();
    allProducts.forEach(
      (product) => product.category && categories.add(product.category)
    );
    return ["All Categories", ...Array.from(categories).sort()];
  }, [allProducts]);

  const uniqueTopNotes = useMemo(() => {
    const notes = new Set<string>();
    allProducts.forEach((product) =>
      product.scentNotes?.topNotes
        .split(",")
        .forEach((note) => notes.add(note.trim()))
    );
    return ["All Top Notes", ...Array.from(notes).sort()];
  }, [allProducts]);

  const uniqueHeartNotes = useMemo(() => {
    const notes = new Set<string>();
    allProducts.forEach((product) =>
      product.scentNotes?.heartNotes
        .split(",")
        .forEach((note) => notes.add(note.trim()))
    );
    return ["All Heart Notes", ...Array.from(notes).sort()];
  }, [allProducts]);

  const uniqueBaseNotes = useMemo(() => {
    const notes = new Set<string>();
    allProducts.forEach((product) =>
      product.scentNotes?.baseNotes
        .split(",")
        .forEach((note) => notes.add(note.trim()))
    );
    return ["All Base Notes", ...Array.from(notes).sort()];
  }, [allProducts]);

  const ratingOptions = useMemo(
    () => [
      { label: "All Ratings", value: 0 },
      { label: "4 Stars & Up", value: 4 },
      { label: "3 Stars & Up", value: 3 },
      { label: "2 Stars & Up", value: 2 },
      { label: "1 Star & Up", value: 1 },
    ],
    []
  );

  const filteredProducts = useMemo(() => {
    let productsToDisplay = mainCollectionProducts;

    const lowerCaseSearchTerm = searchTerm.trim().toLowerCase();
    if (lowerCaseSearchTerm) {
      productsToDisplay = productsToDisplay.filter(
        (product) =>
          product.name.toLowerCase().includes(lowerCaseSearchTerm) ||
          product.description.toLowerCase().includes(lowerCaseSearchTerm) ||
          product.brand.toLowerCase().includes(lowerCaseSearchTerm) ||
          (product.scentNotes?.topNotes &&
            product.scentNotes.topNotes
              .toLowerCase()
              .includes(lowerCaseSearchTerm)) ||
          (product.scentNotes?.heartNotes &&
            product.scentNotes.heartNotes
              .toLowerCase()
              .includes(lowerCaseSearchTerm)) ||
          (product.scentNotes?.baseNotes &&
            product.scentNotes.baseNotes
              .toLowerCase()
              .includes(lowerCaseSearchTerm))
      );
    }

    if (selectedBrand !== "All Brands") {
      productsToDisplay = productsToDisplay.filter(
        (product) => product.brand === selectedBrand
      );
    }

    if (selectedRating > 0) {
      productsToDisplay = productsToDisplay.filter(
        (product) => product.rating && product.rating >= selectedRating
      );
    }

    // New: Filter by category
    if (selectedCategory !== "All Categories") {
      productsToDisplay = productsToDisplay.filter(
        (product) => product.category === selectedCategory
      );
    }

    // New: Filter by top notes
    if (selectedTopNote !== "All Top Notes") {
      productsToDisplay = productsToDisplay.filter((product) =>
        product.scentNotes?.topNotes.includes(selectedTopNote)
      );
    }

    // New: Filter by heart notes
    if (selectedHeartNote !== "All Heart Notes") {
      productsToDisplay = productsToDisplay.filter((product) =>
        product.scentNotes?.heartNotes.includes(selectedHeartNote)
      );
    }

    // New: Filter by base notes
    if (selectedBaseNote !== "All Base Notes") {
      productsToDisplay = productsToDisplay.filter((product) =>
        product.scentNotes?.baseNotes.includes(selectedBaseNote)
      );
    }

    return productsToDisplay;
  }, [
    selectedBrand,
    searchTerm,
    selectedRating,
    selectedCategory,
    selectedTopNote,
    selectedHeartNote,
    selectedBaseNote,
    mainCollectionProducts,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedBrand,
    searchTerm,
    selectedRating,
    selectedCategory,
    selectedTopNote,
    selectedHeartNote,
    selectedBaseNote,
  ]);

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
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const clearFilters = () => {
    setSelectedBrand("All Brands");
    setSearchTerm("");
    setSelectedRating(0);
    setSelectedCategory("All Categories"); // Reset category filter
    setSelectedTopNote("All Top Notes"); // Reset top note filter
    setSelectedHeartNote("All Heart Notes"); // Reset heart note filter
    setSelectedBaseNote("All Base Notes"); // Reset base note filter
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
        pageNumbers.push("...");
      }

      let startPage = Math.max(
        2,
        currentPage - Math.floor(maxPagesToShow / 2) + 1
      );
      let endPage = Math.min(
        totalPages - 1,
        currentPage + Math.floor(maxPagesToShow / 2) - 1
      );

      if (currentPage <= Math.ceil(maxPagesToShow / 2)) {
        endPage = Math.min(totalPages - 1, maxPagesToShow - 1);
        startPage = 2;
      } else if (currentPage > totalPages - Math.ceil(maxPagesToShow / 2)) {
        startPage = Math.max(2, totalPages - (maxPagesToShow - 2));
        endPage = totalPages - 1;
      }

      for (let i = startPage; i <= endPage; i++) {
        if (i > 1 && i < totalPages) {
          pageNumbers.push(i);
        }
      }

      if (
        currentPage < totalPages - Math.floor(maxPagesToShow / 2) &&
        totalPages > maxPagesToShow
      ) {
        pageNumbers.push("...");
      }
      if (totalPages > 1) {
        pageNumbers.push(totalPages);
      }
    }

    return Array.from(new Set(pageNumbers)).sort((a: any, b: any) => {
      if (a === "...") return 1;
      if (b === "...") return -1;
      return a - b;
    });
  };

  if (loading) {
    return <FragranceLoader message="Loading perfume catalog..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ug-neutral-bg">
        <p className="text-2xl text-red-600">{error}</p>
      </div>
    );
  }

  const areFiltersActive =
    selectedBrand !== "All Brands" ||
    searchTerm.trim() !== "" ||
    selectedRating > 0 ||
    selectedCategory !== "All Categories" ||
    selectedTopNote !== "All Top Notes" ||
    selectedHeartNote !== "All Heart Notes" ||
    selectedBaseNote !== "All Base Notes";

  return (
    <div className="container mx-auto p-4 md:p-8 min-h-[calc(100vh-200px)]">
      <section className="text-center mb-12 md:mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold text-ug-text-heading mb-4 leading-tight bg-gradient-to-r from-ug-purple-primary via-ug-text-dark to-ug-text-heading text-transparent bg-clip-text">
          Our Perfume Collection
        </h1>
        <p className="text-xl text-ug-text-dark max-w-2xl mx-auto">
          Explore a curated selection of fragrances crafted to evoke unique
          emotions and memories.
        </p>
      </section>

      <div className="bg-ug-neutral-bg rounded-xl shadow-lg p-6 md:p-8 mb-12 flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6 flex-wrap">
        {/* Search Bar */}
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search perfumes..."
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
          className="block w-full max-w-md p-3 border border-ug-neutral-light rounded-lg shadow-sm
                        focus:ring-ug-purple-primary focus:border-ug-purple-primary text-lg
                        bg-white text-ug-text-dark cursor-pointer"
        >
          {uniqueBrands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>

        {/* Rating Filter Dropdown */}
        <label htmlFor="rating-filter" className="sr-only">
          Filter by Rating
        </label>
        <select
          id="rating-filter"
          value={selectedRating}
          onChange={(e) => setSelectedRating(Number(e.target.value))}
          className="block w-full max-w-md p-3 border border-ug-neutral-light rounded-lg shadow-sm
                        focus:ring-ug-purple-primary focus:border-ug-purple-primary text-lg
                        bg-white text-ug-text-dark cursor-pointer"
        >
          {ratingOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* New: Category Filter Dropdown */}
        <label htmlFor="category-filter" className="sr-only">
          Filter by Category
        </label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="block w-full max-w-md p-3 border border-ug-neutral-light rounded-lg shadow-sm
                        focus:ring-ug-purple-primary focus:border-ug-purple-primary text-lg
                        bg-white text-ug-text-dark cursor-pointer"
        >
          {uniqueCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* New: Top Note Filter Dropdown */}
        <label htmlFor="top-note-filter" className="sr-only">
          Filter by Top Note
        </label>
        <select
          id="top-note-filter"
          value={selectedTopNote}
          onChange={(e) => setSelectedTopNote(e.target.value)}
          className="block w-full max-w-md p-3 border border-ug-neutral-light rounded-lg shadow-sm
                        focus:ring-ug-purple-primary focus:border-ug-purple-primary text-lg
                        bg-white text-ug-text-dark cursor-pointer"
        >
          {uniqueTopNotes.map((note) => (
            <option key={note} value={note}>
              {note}
            </option>
          ))}
        </select>

        {/* New: Heart Note Filter Dropdown */}
        <label htmlFor="heart-note-filter" className="sr-only">
          Filter by Heart Note
        </label>
        <select
          id="heart-note-filter"
          value={selectedHeartNote}
          onChange={(e) => setSelectedHeartNote(e.target.value)}
          className="block w-full max-w-md p-3 border border-ug-neutral-light rounded-lg shadow-sm
                        focus:ring-ug-purple-primary focus:border-ug-purple-primary text-lg
                        bg-white text-ug-text-dark cursor-pointer"
        >
          {uniqueHeartNotes.map((note) => (
            <option key={note} value={note}>
              {note}
            </option>
          ))}
        </select>

        {/* New: Base Note Filter Dropdown */}
        <label htmlFor="base-note-filter" className="sr-only">
          Filter by Base Note
        </label>
        <select
          id="base-note-filter"
          value={selectedBaseNote}
          onChange={(e) => setSelectedBaseNote(e.target.value)}
          className="block w-full max-w-md p-3 border border-ug-neutral-light rounded-lg shadow-sm
                        focus:ring-ug-purple-primary focus:border-ug-purple-primary text-lg
                        bg-white text-ug-text-dark cursor-pointer"
        >
          {uniqueBaseNotes.map((note) => (
            <option key={note} value={note}>
              {note}
            </option>
          ))}
        </select>

        {/* Clear Filters Button */}
        {areFiltersActive && (
          <button
            onClick={clearFilters}
            className="w-full md:w-auto bg-ug-neutral-light text-ug-text-dark hover:bg-ug-text-heading hover:text-white px-6 py-3 rounded-lg text-lg font-semibold transition duration-300 ease-in-out"
          >
            Clear Filters
          </button>
        )}
      </div>

      {topFeaturedProducts.length > 0 && (
        <section className="mb-12 border-b border-ug-neutral-light pb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-ug-purple-primary text-center mb-8 bg-gradient-to-r from-ug-purple-primary via-ug-text-dark to-ug-text-heading text-transparent bg-clip-text">
            Special Highlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
            {topFeaturedProducts.map((product) => (
              <div
                key={product.id}
                className="relative bg-white rounded-lg shadow-xl overflow-hidden group hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  {featuredImageLoading[product.id] && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10 rounded-lg">
                      <div
                        className="w-10 h-10 border-4 border-ug-purple-primary border-t-transparent rounded-full animate-spin"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  )}
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                    className={`absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300 ease-in-out
                                ${
                                  featuredImageLoading[product.id]
                                    ? "opacity-0"
                                    : "opacity-100"
                                }`}
                    onLoadingComplete={() =>
                      setFeaturedImageLoading((prev) => ({
                        ...prev,
                        [product.id]: false,
                      }))
                    }
                    onError={(e) => {
                      setFeaturedImageLoading((prev) => ({
                        ...prev,
                        [product.id]: false,
                      }));
                      e.currentTarget.src =
                        "https://placehold.co/400x300/CCCCCC/000000?text=Image+Not+Found";
                    }}
                  />
                  <div className="absolute inset-0 bg-ug-purple-primary opacity-20 group-hover:opacity-30 transition-opacity duration-300 rounded-lg z-[5]"></div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-xl font-bold text-ug-text-heading mb-2">
                    {product.name}
                  </h3>
                  <p className="text-ug-text-dark text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  {product.rating && (
                    <div className="flex items-center justify-center mt-3">
                      <div className="flex text-lg">
                        {(() => {
                          const stars = [];
                          for (let i = 1; i <= 5; i++) {
                            if (i <= product.rating) {
                              stars.push(
                                <FaStar key={i} className="text-yellow-400" />
                              );
                            } else if (i - 0.5 === product.rating) {
                              stars.push(
                                <FaStarHalfAlt
                                  key={i}
                                  className="text-yellow-400"
                                />
                              );
                            } else {
                              stars.push(
                                <FaStar key={i} className="text-gray-300" />
                              );
                            }
                          }
                          return stars;
                        })()}
                      </div>
                      <span className="ml-2 text-ug-text-dark text-sm">
                        ({product.rating.toFixed(1)})
                      </span>
                    </div>
                  )}
                  <div className="mt-4">
                    <a
                      href={`/perfumes/${product.id}`}
                      className="inline-block bg-ug-purple-primary text-white hover:bg-ug-purple-accent px-6 py-2 rounded-full text-sm font-semibold shadow-md transition duration-300 ease-in-out transform hover:scale-105"
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

      {currentProducts.length === 0 ? (
        <div className="text-center py-10 bg-ug-neutral-light rounded-xl shadow-inner mt-8">
          <p className="text-2xl text-ug-text-dark mb-4">
            No perfumes found matching your criteria.
          </p>
          <p className="text-lg text-ug-text-dark mb-6">
            Try adjusting your search term or filters.
          </p>
          <button
            onClick={clearFilters}
            className="inline-block bg-ug-purple-primary text-white hover:bg-ug-purple-accent px-8 py-4 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

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
