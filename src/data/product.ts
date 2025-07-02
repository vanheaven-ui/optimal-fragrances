// src/data/products.ts

// This file now primarily serves as the type definition for Product.
// The actual product data will be fetched from Firestore.

export interface Product {
  id: string;
  name: string;
  brand: string;
  price?: number; // Price is optional for now, as requested to be removed from display
  imageUrl: string;
  description: string;
  category: "men" | "women" | "unisex";
  featured: boolean;
  scentNotes?: {
    topNotes: string;
    heartNotes: string;
    baseNotes: string;
  };
  volume?: number;
  createdAt?: Date; // Added for Firestore timestamps
  updatedAt?: Date; // Added for Firestore timestamps
  rating?: number; // ADDED: Trusted rating for the product (e.g., 1.0 to 5.0)
  ratingSource?: string; // ADDED: Source of the rating for credibility
}

// The 'products' array is now defined here primarily for the 'uploadData.ts' script
// and as a fallback structure. In the actual React components, data will be fetched from Firestore.
const initialProducts: Product[] = [
  {
    id: "38",
    name: "Petra by Lattafa",
    brand: "Lattafa",
    imageUrl: "/Petra-by-Lattafa-2025.jpeg",
    description:
      "**Petra by Lattafa (2025)** is a captivating unisex blend. It opens with juicy **rum and plum** notes, gracefully wrapped in creamy **coconut and tuberose**. The scent then settles on a warm, inviting base of **vanilla, praline, and musk**. Highly rated for its seductive depth and elegant sweetness, Petra offers **long-lasting wear** (7–10 hours on skin, even longer on clothes) and a **strong projection** in the initial hours before softening to a smooth, skin-close trail. It's perfect for summer evenings, romantic date nights, or as a signature scent for those who love unique gourmand blends.",
    category: "unisex",
    featured: true,
    scentNotes: {
      topNotes: "Rum, Plum",
      heartNotes: "Coconut, Tuberose",
      baseNotes: "Vanilla, Praline, Musk",
    },
    volume: 100,
    rating: 4.6,
    ratingSource: "Fragrantica Community",
  },
  {
    id: "39",
    name: "Signorina Unica by Ferragamo",
    brand: "Salvatore Ferragamo",
    imageUrl: "/Signorina-Unica-by-Ferragamo-2023.jpeg",
    description:
      "**Signorina Unica by Ferragamo (2023)** is a chic woody-gourmand floral with true Italian flair 🇮🇹. The top notes feature refreshing **Mandarin, Sea Notes, Sugar Cane, and Bergamot**. Its heart blooms with **Violet, Azalea, Blackcurrant, and Cashmere Wood**. The cozy base settles into delicious notes of **Tiramisu, Vanilla, Tonka, Patchouli, and Ambroxan**. This refined and cozy scent is perfect for gifting or adding a touch of daily elegance. The **set includes** a 100ml EDP, a 5ml mini spray, and a 50ml body lotion.",
    category: "women",
    featured: true,
    scentNotes: {
      topNotes: "Mandarin, Sea Notes, Sugar Cane, Bergamot",
      heartNotes: "Violet, Azalea, Blackcurrant, Cashmere Wood",
      baseNotes: "Tiramisu, Vanilla, Tonka, Patchouli, Ambroxan",
    },
    volume: 100,
    rating: 4.1,
    ratingSource: "Basenotes",
  },
  {
    id: "40",
    name: "Montblanc Signature Absolue",
    brand: "Montblanc",
    imageUrl: "/Montblanc-Signature-Absolue.jpeg",
    description:
      "**Montblanc Signature Absolue** is a golden, elegant fragrance designed to leave a lasting charm. This luxurious **set includes** a 90ml Eau de Parfum, a 7.5ml mini travel spray, and a 100ml body lotion, making it a perfect gift.",
    category: "women",
    featured: true,
    scentNotes: {
      topNotes: "Pear, Mandarin Orange, Pink Pepper", // UPDATED
      heartNotes: "Ylang-Ylang, Frangipani, Tuberose", // UPDATED
      baseNotes: "Tonka Bean, Cedar", // UPDATED
    },
    volume: 90,
    rating: 4.3,
    ratingSource: "Parfumo Reviews",
  },
  {
    id: "41",
    name: "Azzaro The Most Wanted Eau de Parfum Intense",
    brand: "Azzaro",
    imageUrl: "/Azzaro-The-Most-Wanted-EDP-Intense.jpeg",
    description:
      "**Azzaro The Most Wanted Eau de Parfum Intense**, launched in **2021**, is a bold woody aromatic scent crafted for men who dare to stand out. This modern classic has earned glowing reviews for its seductive intensity and commanding presence. Expect **long-lasting performance** that stays with you from day to night. Key notes include energizing and crisp **Green Mediterranean Bergamot**, smooth yet striking **Fiery Lavender**, and a warm, daring, and unforgettable **Liquor Accord**. The **set contents** include a 100ml main bottle and two 10ml travel sprays, perfect for both home rituals and scenting on-the-go.",
    category: "men",
    featured: true,
    scentNotes: {
      topNotes: "Green Mediterranean Bergamot",
      heartNotes: "Fiery Lavender",
      baseNotes: "Liquor Accord",
    },
    volume: 100,
    rating: 4.5,
    ratingSource: "Top Male Fragrance Blogs",
  },
  {
    id: "5",
    name: "Montblanc Legend EDT",
    brand: "Montblanc",
    imageUrl: "/Montblanc-Legend-EDT.jpeg",
    description:
      "**Montblanc Legend EDT** is a timeless fragrance that embodies elegance and sophistication. A truly classic scent for the modern man. **200ml size available**.",
    category: "men",
    featured: true,
    scentNotes: {
      topNotes: "Bergamot, Lavender, Pineapple Leaf",
      heartNotes: "Red Apple, Dried Fruits, Rose, Coumarin, Oakmoss",
      baseNotes: "Tonka Bean, Sandalwood, Ambroxan",
    },
    volume: 200,
    rating: 4.2,
    ratingSource: "Community Polls",
  },
  {
    id: "42",
    name: "Gucci Intense Oud",
    brand: "Gucci",
    imageUrl: "/Gucci-Intense-Oud.jpeg",
    description:
      "**Gucci Intense Oud** is a rich, opulent, and highly captivating oriental fragrance. It features a powerful and luxurious blend centered around the mystical **oud wood**, complemented by notes of **frankincense, leather, and amber**. This unisex scent is known for its deep, smoky, and resinous character, making a bold statement.",
    category: "unisex",
    featured: true,
    scentNotes: {
      topNotes: "Pear, Raspberry, Saffron",
      heartNotes: "Bulgarian Rose, Orange Blossom",
      baseNotes: "Agarwood (Oud), Amber, Musk, Patchouli",
    },
    volume: 90,
    rating: 4.4,
    ratingSource: "Expert Reviewers",
  },
];

// The filtering logic below will separate them.
const productsWithRealImages: Product[] = initialProducts.filter(
  (product) =>
    !product.imageUrl.includes("placehold.co") && product.imageUrl !== "/.jpeg"
);
const productsWithPlaceholders = initialProducts.filter(
  (product) =>
    product.imageUrl.includes("placehold.co") || product.imageUrl === "/.jpeg"
);

// Reconstruct the products array: products with local images first, then all placeholders
const products = [...productsWithRealImages, ...productsWithPlaceholders];

// Changed to named export to match import { products } in other files
export { products };
