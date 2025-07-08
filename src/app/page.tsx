// src/app/page.tsx
"use client";

import { useMemo } from "react";
import { useProducts } from "../hooks/useProducts";
import FragranceLoader from "../components/FragranceLoader";
import PerfumeNotesCarousel, {
  PerfumeNote,
} from "../components/PerfumeNotesCarousel";
import HeroBanner from "../components/HeroBanner";
import HandpickedSection from "../components/HandpickedSection";
import CuratedProductsSection from "../components/CuratedProductsSection";

// Helper function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = [...array.reverse()];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

// --- TOP SELLING MEN'S FRAGRANCES NOTES DATA ---
const TOP_SELLING_MEN_PERFUMES_NOTES: PerfumeNote[] = [
  {
    id: "men-dior-sauvage",
    name: "Dior Sauvage",
    year: "EDT - 2015, EDP - 2018, Parfum - 2019",
    description:
      "A fresh and spicy blend. Inspired by wide-open spaces, it exudes raw and noble masculinity.",
    details: [
      "• Top notes of bergamot, heart notes of Sichuan pepper, and base notes of ambroxan.",
      "• The EDP and Parfum versions deepen the intensity and longevity of the fragrance.",
    ],
  },
  {
    id: "men-bleu-de-chanel",
    name: "Bleu de Chanel",
    year: "EDT - 2010, EDP - 2014, Parfum - 2018",
    description:
      "Sophisticated and refreshing with citrus opening notes, a woody heart, and an aromatic finish.",
    details: [
      "• Key notes include lemon zest, sandalwood, and cedar, making it a refined choice for any occasion.",
      "• The EDP and Parfum versions enhance the depth and richness.",
    ],
  },
  {
    id: "men-bvlgari-man-in-black",
    name: "Bvlgari Man in Black",
    year: "2014",
    description: "Intense and charismatic, featuring rum, leather, and spices.",
    details: [
      "• Warm amber and sweet floral undertones create a powerful and seductive aroma.",
    ],
  },
  {
    id: "men-stronger-with-you-intensely",
    name: "Emporio Armani Stronger With You Intensely",
    year: "2019",
    description:
      "Vibrant and energetic with a sweet and spicy fragrance that captures passionate masculinity.",
    details: ["• Features pink pepper, toffee, and vanilla."],
  },
  {
    id: "men-xerjoff-erba-pura",
    name: "Xerjoff Erba Pura",
    year: "2013",
    description:
      "Luxurious and fruity, combining Mediterranean citrus with sweet vanilla and white musk.",
    details: [
      "• An enchanting and exuberant blend that leaves a lasting impression.",
    ],
  },
  {
    id: "men-yves-saint-laurent-y",
    name: "Yves Saint Laurent Y",
    year: "2017",
    description: "Bold and modern, balancing freshness with intensity.",
    details: [
      "• Notes of bergamot, ginger, sage, and amber, making it a dynamic and youthful fragrance.",
    ],
  },
  {
    id: "men-versace-eros",
    name: "Versace Eros",
    year: "EDP - 2018, Parfum - 2020",
    description:
      "Embodies love, passion, and desire with mint, green apple, and tonka bean.",
    details: [
      "• The Parfum version intensifies these notes, offering a deeper, richer experience.",
    ],
  },
  {
    id: "men-tom-ford-ombre-leather",
    name: "Tom Ford Ombré Leather",
    year: "EDP - 2018, Parfum - 2021",
    description: "Rich and luxurious with leather, floral, and woody notes.",
    details: ["• Evokes the freedom and boldness of the open desert."],
  },
  {
    id: "men-dolce-gabbana-the-one",
    name: "Dolce & Gabbana The One",
    year: "EDT - 2008, EDP - 2015",
    description:
      "Classic and sophisticated with tobacco, spices, and cedarwood.",
    details: [
      "• Balances sensuality and elegance, perfect for the refined gentleman.",
      "• The EDP version enhances the depth and longevity of the fragrance.",
    ],
  },
  {
    id: "men-armani-code-parfum",
    name: "Armani Code Parfum",
    year: "2022",
    description:
      "A modern interpretation of the classic Armani Code, sensual and magnetic.",
    details: [
      "• With fresh bergamot, lavender, and tonka bean, it stands out as a contemporary favorite.",
    ],
  },
];

// --- TOP SELLING WOMEN'S FRAGRANCES NOTES DATA ---
const TOP_SELLING_WOMEN_PERFUMES_NOTES: PerfumeNote[] = [
  {
    id: "women-ysl-libre",
    name: "Yves Saint Laurent - Libre",
    year: "Intense (2019) and Le Parfum (2022)",
    description: "Bold and deeper interpretations of the Libre line.",
    details: [
      "• Intense (2019): Bold notes of lavender, orange blossom, and orchid, creating a deeper, more sultry interpretation.",
      "• Le Parfum (2022): Richer, more concentrated with warm notes of saffron, honey, and ginger.",
    ],
  },
  {
    id: "women-chanel-coco-mademoiselle",
    name: "Chanel - Coco Mademoiselle",
    year: "EDP (2001) and Intense (2018)",
    description: "A fresh oriental with vibrant notes.",
    details: [
      "• EDP (2001): Vibrant notes of orange, jasmine, and rose.",
      "• Intense (2018): Higher concentration of patchouli, tonka bean, and vanilla for a powerful, long-lasting scent.",
    ],
  },
  {
    id: "women-lancome-la-vie-est-belle",
    name: "Lancôme - La Vie Est Belle",
    year: "EDP (2012)",
    description:
      "Sweet and sophisticated with notes of iris, praline, and vanilla.",
    details: ["• Embodying joy and elegance."],
  },
  {
    id: "women-giorgio-armani-si",
    name: "Giorgio Armani - Si",
    year: "EDP (2013) and Intense (2021)",
    description:
      "A modern chypre with notes of blackcurrant, rose, and vanilla.",
    details: [
      "• EDP (2013): Modern chypre with notes of blackcurrant, rose, and vanilla.",
      "• Intense (2021): Deeper notes of blackcurrant nectar, patchouli, and benzoin for an intense, sensual experience.",
    ],
  },
  {
    id: "women-rasasi-jasmine-wisp",
    name: "Rasasi - Jasmine Wisp",
    year: "2016",
    description:
      "Fruity floral with notes of mandarin, grapefruit, and jasmine.",
    details: ["• Combining sweetness and freshness."],
  },
  {
    id: "women-parfums-de-marly-delina-exclusif",
    name: "Parfums de Marly - Delina Exclusif",
    year: "2018",
    description: "Exquisite floral with notes of lychee, rose, and vanilla.",
    details: ["• Rich and creamy."],
  },
  {
    id: "women-dior-miss-dior",
    name: "Dior - Miss Dior",
    year: "Reformulated (2017)",
    description:
      "A modern floral with notes of Grasse rose, bergamot, and rosewood.",
    details: ["• Capturing elegance and romance."],
  },
  {
    id: "women-versace-eros-pour-femme",
    name: "Versace - Eros Pour Femme",
    year: "2014",
    description:
      "Floral woody musk with notes of Sicilian lemon, jasmine, and sandalwood.",
    details: ["• Exuding sensuality and strength."],
  },
  {
    id: "women-paco-rabanne-lady-million",
    name: "Paco Rabanne - Lady Million",
    year: "2010",
    description:
      "Fruity floral with notes of neroli, raspberry, and white honey.",
    details: ["• Embodying luxury and extravagance."],
  },
  {
    id: "women-victorias-secret-bombshell",
    name: "Victoria's Secret – Bombshell",
    year: "2010",
    description:
      "Fruity floral with notes of passion fruit, peony, and vanilla orchid.",
    details: ["• Vibrant and alluring."],
  },
];

export default function HomePage() {
  const { products, loading, error } = useProducts();

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

      <HeroBanner />
      {/* 2. Featured Spotlight / Hero Perfume Section */}
      {/* <section className="container mx-auto py-16 px-4 bg-ug-neutral-bg">
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
      </section> */}
      <HandpickedSection spotlightProducts={spotlightProducts} />

      {/* 3. Curated Selection Grid */}
      {/* {curatedProducts.length > 0 && (
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
      )} */}
      <CuratedProductsSection curatedProducts={curatedProducts} />

      {/* NEW SECTION: Top Selling Perfumes - Carousels (Notes Only) */}
      <section className="container mx-auto py-6 px-4 bg-ug-neutral-bg space-y-16">
        <PerfumeNotesCarousel
          perfumes={TOP_SELLING_MEN_PERFUMES_NOTES}
          title="Top Selling Men's Fragrances in May"
          carouselId="men-fragrances-notes-carousel"
        />
        <PerfumeNotesCarousel
          perfumes={TOP_SELLING_WOMEN_PERFUMES_NOTES}
          title="Top Selling Women's Fragrances in May"
          carouselId="women-fragrances-notes-carousel"
        />
      </section>

      {/* ORIGINAL 4. Our Vision/Story Section (now 5th section) */}
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
