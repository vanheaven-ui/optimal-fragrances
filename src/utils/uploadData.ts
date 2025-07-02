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
    id: "1",
    name: "Petra by Lattafa (2025)",
    brand: "Lattafa",
    imageUrl: "/Petra-by-Lattafa-2025.jpeg",
    description:
      "A captivating **unisex** blend from Lattafa, Petra opens with an alluring burst of juicy **rum and plum**, leading into a creamy heart of **coconut and tuberose**. It settles into a warm, inviting base of **vanilla, praline, and musk**. This fragrance is **highly rated** for its seductive depth and elegant sweetness. It boasts **long-lasting** performance, staying on skin for 7–10 hours, and even longer on clothes. Expect **strong projection** in the initial hours, gradually softening to a smooth, skin-close trail. Perfect for summer evenings, romantic date nights, or as a distinctive signature scent.",
    category: "unisex", // Changed from 'women' to 'unisex' based on description
    featured: true,
    scentNotes: {
      topNotes: "Rum, Plum",
      heartNotes: "Coconut, Tuberose",
      baseNotes: "Vanilla, Praline, Musk",
    },
    volume: 100,
    rating: 4.5,
    ratingSource: "Fragrantica",
  },
  {
    id: "2",
    name: "Signorina Unica by Ferragamo (2023)",
    brand: "Salvatore Ferragamo",
    imageUrl: "/Signorina-Unica-by-Ferragamo-2023.jpeg",
    description:
      "**Signorina Unica by Ferragamo (2023)** is a chic **woody-gourmand floral** fragrance infused with an unmistakable Italian flair. The top notes sparkle with **Mandarin, Sea Notes, Sugar Cane, and Bergamot**, leading into a sophisticated heart of **Violet, Azalea, Blackcurrant, and Cashmere Wood**. The luxurious base features delectable **Tiramisu, Vanilla, Tonka, Patchouli, and Ambroxan**. This refined and cozy scent is presented as a set, including a **100ml EDP**, a **5ml mini spray** for on-the-go, and a **50ml Body Lotion**, making it perfect for gifting or daily elegance.",
    category: "women",
    featured: true,
    scentNotes: {
      topNotes: "Mandarin, Sea Notes, Sugar Cane, Bergamot",
      heartNotes: "Violet, Azalea, Blackcurrant, Cashmere Wood",
      baseNotes: "Tiramisu, Vanilla, Tonka, Patchouli, Ambroxan",
    },
    volume: 100,
    rating: 4.2,
    ratingSource: "Vogue Fragrance Reviews",
  },
  {
    id: "3",
    name: "Montblanc Signature Absolue 💛",
    brand: "Montblanc",
    imageUrl: "/Montblanc-Signature-Absolue.jpeg",
    description:
      "**Montblanc Signature Absolue** is an elegant and radiant fragrance with a lasting golden charm. This luxurious set includes a **90ml Eau de Parfum**, a convenient **7.5ml mini spray**, and a **100ml body lotion**, providing a complete sensory experience. It's designed for the sophisticated woman who appreciates a luminous and memorable scent.",
    category: "women",
    featured: true,
    scentNotes: {
      topNotes: "Pear, Mandarin Orange, Pink Pepper", // Added placeholder notes
      heartNotes: "Frangipani, Tuberose, Ylang-Ylang",
      baseNotes: "Tonka Bean, Cedar",
    },
    volume: 90,
    rating: 4.0,
    ratingSource: "Official Montblanc Site",
  },
  {
    id: "4",
    name: "Azzaro The Most Wanted Eau de Parfum Intense",
    brand: "Azzaro",
    imageUrl: "/Azzaro-The-Most-Wanted-EDP-Intense.jpeg", // Corrected image name from /.jpeg
    description:
      "**Azzaro The Most Wanted Eau de Parfum Intense**, launched in **2021**, is a bold **woody aromatic** scent for men, crafted for those who dare to stand out. This modern classic has earned glowing reviews for its seductive intensity and commanding presence. It delivers **long-lasting performance**, staying with you from day to night. Key notes include an energizing and crisp **Green Mediterranean Bergamot**, a smooth yet striking **Fiery Lavender**, and a warm, daring, and unforgettable **Liquor Accord**. The set includes a **100ml main bottle** and **two 10ml travel sprays**, perfect for both home rituals and scenting on-the-go.",
    category: "men", // Corrected category
    featured: true,
    scentNotes: {
      topNotes: "Bergamot",
      heartNotes: "Lavender",
      baseNotes: "Liquor Accord",
    },
    volume: 100,
    rating: 4.7,
    ratingSource: "Sephora Reviews",
  },
  {
    id: "5",
    name: "Montblanc Legend EDT",
    brand: "Montblanc",
    imageUrl: "/Montblanc-Legend-EDT.jpeg", // Corrected image name
    description:
      "**Montblanc Legend Eau de Toilette** is a timeless and charismatic fragrance for men, embodying sophistication and strength. This iconic scent opens with fresh notes of **Bergamot, Lavender, Pineapple Leaf, and Verbena**, leading to a heart of **Coumarin, Oakmoss, Geranium, Rose, and Red Apple**. The base settles into a warm and sensual blend of **Sandalwood and Tonka Bean**. It offers excellent longevity and a refined sillage, making it perfect for daily wear or special occasions. This particular offering is for the **200ml bottle**, providing a generous supply of this classic scent.",
    category: "men", // Corrected category
    featured: true,
    scentNotes: {
      topNotes: "Bergamot, Lavender, Pineapple Leaf, Verbena",
      heartNotes: "Coumarin, Oakmoss, Geranium, Rose, Red Apple",
      baseNotes: "Sandalwood, Tonka Bean",
    },
    volume: 200,
    rating: 4.3,
    ratingSource: "Amazon Customer Reviews",
  },
  {
    id: "6",
    name: "Gucci Intense Oud",
    brand: "Gucci",
    imageUrl: "/Gucci-Intense-Oud.jpeg",
    description:
      "**Gucci Intense Oud** is a powerful and luxurious **oriental woody** fragrance, designed for both men and women who appreciate deep, resonant scents. It features a rich composition built around the enigmatic note of **Oud**, complemented by warm **Amber**, leathery **Incense**, and woody nuances. This captivating fragrance creates an aura of mystery and sophistication, leaving a memorable trail. Ideal for evening wear or cooler climates, it's a statement scent for those who desire intensity and elegance.",
    category: "unisex", // Changed to unisex as this is commonly marketed
    featured: true,
    scentNotes: {
      topNotes: "Pear, Raspberry", // Placeholder notes
      heartNotes: "Rose, Orange Blossom",
      baseNotes: "Oud, Amber, Incense, Leather",
    },
    volume: 90,
    rating: 4.6,
    ratingSource: "FragranceX Reviews",
  },
];

// The filtering logic below will separate them.
const productsWithRealImages: Product[] = initialProducts.filter(
  (product) => !product.imageUrl.includes("placehold.co")
);
const productsWithPlaceholders = initialProducts.filter((product) =>
  product.imageUrl.includes("placehold.co")
);

// Reconstruct the products array: products with local images first, then all placeholders
const products = [...productsWithRealImages, ...productsWithPlaceholders];

// Changed to named export to match import { products } in other files
export { products };
