// src/data/products.ts

// This file now primarily serves as the type definition for Product.
// The actual product data will be fetched from Firestore.

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  imageUrl: string;
  description: string;
  category: "men" | "women" | "unisex";
  featured: boolean;
  scentNotes?: {
    topNotes: string;
    heartNotes: string;
    baseNotes: string;
  };
  volume?: number | 100
  createdAt?: Date; // Added for Firestore timestamps
  updatedAt?: Date; // Added for Firestore timestamps
}

// The 'products' array is now defined here primarily for the 'uploadData.ts' script
// and as a fallback structure. In the actual React components, data will be fetched from Firestore.
const initialProducts: Product[] = [
  {
    id: "1",
    name: "Sensual Bloom",
    brand: "Fragrance Haven",
    price: 120000,
    imageUrl:
      "https://placehold.co/300x300/6B46C1/FFFFFF.png?text=Sensual+Bloom",
    description:
      "A captivating blend of jasmine and vanilla, perfect for evening wear. Long-lasting and luxurious.",
    category: "women",
    featured: true,
    scentNotes: {
      topNotes: "Italian Bergamot, Pink Peppercorn",
      heartNotes: "Indian Jasmine, Tahitian Vanilla, Cashmere Wood",
      baseNotes: "Amber, Sandalwood, White Musk",
    },
  },
  {
    id: "2",
    name: "Urban Explorer",
    brand: "City Scents",
    price: 95000,
    imageUrl:
      "https://placehold.co/300x300/2D3748/FFFFFF.png?text=Urban+Explorer",
    description:
      "Fresh and invigorating with notes of citrus and cedarwood. Ideal for the modern man on the go.",
    category: "men",
    featured: true,
    scentNotes: {
      topNotes: "Grapefruit, Lemon Zest, Cardamom",
      heartNotes: "Cedarwood, Vetiver, Sea Salt",
      baseNotes: "Oakmoss, Amberwood, Patchouli",
    },
  },
  {
    id: "3",
    name: "Mystic Elixir",
    brand: "Ancient Aromas",
    price: 150000,
    imageUrl:
      "https://placehold.co/300x300/805AD5/FFFFFF.png?text=Mystic+Elixir",
    description:
      "An enchanting unisex fragrance with hints of amber, musk, and exotic spices. Unleash your inner mystery.",
    category: "unisex",
    featured: true,
    scentNotes: {
      topNotes: "Black Pepper, Saffron, Coriander",
      heartNotes: "Bulgarian Rose, Oud Wood, Patchouli",
      baseNotes: "Amber Resin, Musk, Incense",
    },
  },
  {
    id: "4",
    name: "Morning Dew",
    brand: "Nature's Essence",
    price: 80000,
    imageUrl: "https://placehold.co/300x300/CBD5E0/4A5568.png?text=Morning+Dew",
    description:
      "Light and airy, reminiscent of a crisp morning. Features notes of green tea and subtle florals. Perfect for daily wear.",
    category: "women",
    featured: false,
    scentNotes: {
      topNotes: "Green Tea Leaf, Bergamot, Freesia",
      heartNotes: "Water Lily, Jasmine Petals, Muguet",
      baseNotes: "White Musk, Cedarwood, Ambrette Seed",
    },
  },
  {
    id: "5",
    name: "Bold Statement",
    brand: "Signature Collection",
    price: 130000,
    imageUrl:
      "https://placehold.co/300x300/4A5568/FFFFFF.png?text=Bold+Statement",
    description:
      "A powerful and long-lasting scent for those who command attention. Leather, tobacco, and oud notes.",
    category: "men",
    featured: false,
    scentNotes: {
      topNotes: "Black Pepper, Cardamom, Rum Accord",
      heartNotes: "Leather, Tobacco Leaf, Oud",
      baseNotes: "Benzoin, Vanilla Pod, Tonka Bean",
    },
  },
  {
    id: "6",
    name: "Golden Hour",
    brand: "Sunset Scents",
    price: 110000,
    imageUrl: "https://placehold.co/300x300/6B46C1/FFFFFF.png?text=Golden+Hour",
    description:
      "Warm and inviting, like the last rays of sun. A blend of vanilla, sandalwood, and sweet orange.",
    category: "unisex",
    featured: false,
    scentNotes: {
      topNotes: "Blood Orange, Mandarin, Neroli",
      heartNotes: "Jasmine Sambac, Tuberose, Ylang-Ylang",
      baseNotes: "Sandalwood, Cashmeran, Vanilla Absolute",
    },
  },
  {
    id: "7",
    name: "Khamrah Qahwa",
    brand: "Lattafa",
    imageUrl: "/Khamrah-Qahwa-by-Lattafa.jpg",
    description:
      "I wouldn’t have tried *Khamrah Qahwa* by Lattafa if it hadn’t unexpectedly won Best Niche Perfume in Fragrantica’s 2024 Readers' Choice Awards. Inspired by Saudi Qahwa coffee, I expected a sharp, bitter brew — but instead, it surprised me with warm notes of cardamom, saffron, ginger, and a rich praline heart. It’s more spiced dessert than coffee, wrapped in boozy sweetness and cozy spice. A bold gourmand, not for everyone — but unforgettable once it settles on the skin.",
    price: 200000,
    category: "unisex",
    featured: true,
    scentNotes: {
      topNotes: "Cinnamon, Cardamom, Ginger",
      heartNotes: "Praline, Candied Fruits, White Flowers",
      baseNotes: "Arabic Coffee, Vanilla, Tonka Bean, Musk",
    },
  },
  {
    id: "8",
    name: "Black Opium",
    brand: "Yves Saint Laurent",
    imageUrl: "/Black-Opium-Over-Red-By-YSL-2024.jpg",
    description:
      "🌸 Floral • Fruity • Gourmand\n\n✨ *Top*: Cherry, Green Mandarin\n🌼 *Heart*: Jasmine, Orange Blossom, Black Tea\n☕ *Base*: Coffee, Patchouli, Vanilla💃 Bold, sweet & sensual\n❤️ Cherry spark meets creamy vanilla\n🌙 Perfect for all weather but best in nights & cooler days\n🔴 Sleek red bottle = instant statement",
    price: 250000,
    category: "women",
    featured: true,
    scentNotes: {
      topNotes: "Cherry Accord, Green Mandarin",
      heartNotes: "Jasmine Grandiflorum, Orange Blossom, Black Tea",
      baseNotes: "Coffee Accord, Patchouli, Vanilla",
    },
  },
  {
    id: "9",
    name: "Dolce&Gabbana Q (2023)",
    brand: "Dolce&Gabbana",
    imageUrl: "/DG-Q-2023.jpg",
    description:
      "🌸✨ D&G Q (2023) – A scent that flirts with spring & summer 🍋🌿. Bursting with citrus, fruity & woody notes, it brings elegance, energy & adventure – perfect for daytime charm or a night to remember 💃🏽🔥",
    price: 180000,
    category: "women",
    featured: false,
    scentNotes: {
      topNotes: "Sicilian Lemon, Blood Orange, Jasmine",
      heartNotes: "Cherry, Heliotrope, Tuberose",
      baseNotes: "Cedarwood, Musk, Patchouli",
    },
  },
  {
    id: "10",
    name: "Estée Lauder Pleasures",
    brand: "Estée Lauder",
    imageUrl: "/Estée-Lauder-Pleasures.jpg",
    description:
      "A fresh floral 🌸 scent that feels like spring rain 🌦️\nPerfect for garden tours 🌿 & summer gatherings ☀️🌸 Top: Pink pepper, red berries\n🌺 Heart: White peony, lily, lilac\n🌲 Base: Cedar, patchouli, sandalwood\n\n✨ Soft, sheer & elegant — your daily dose of beauty 🌼\n#Pleasures #FloralVibes #EverydayElegance",
    price: 300000,
    category: "women",
    featured: false,
    scentNotes: {
      topNotes: "White Lily, Violet Leaves, Green Accords",
      heartNotes: "Black Lilac, White Peony, Karan Karounde",
      baseNotes: "Sandalwood, Patchouli, Amber",
    },
  },
  {
    id: "11",
    name: "Oud wood",
    brand: "Various",
    imageUrl: "/Oud-wood.jpg",
    description:
      "Oud wood seems to be back in the spotlight, often used with a light hand to please the more Western perfume style. Perfumers seem to be going for a less animalic idea these days, combining it more often with fresh or fruity notes. Some examples are Amber Oud Haramain, Tomford oud wood, Initio oud for greatness, Lataffa oud for Glory, Stronger with you oud Armani,   Oud Excelsa by Caron, Oud Alezan by Hermes, Under the Sars by Margiela, Oud Cadenza by Crivelli, Sensual Oud by Zara, Madness by Franck Broclet, Aoud Extraordinaire by Roja Parfums, I Wanna Be Loved By You by HFC, and Voluptuous Oud by Francesca Bianchi. My personal goal for 2025 is to further enjoy  the oud notes which I truly fully enjoy!",
    price: 220000,
    category: "unisex",
    featured: false,
    scentNotes: {
      topNotes: "Rare Oud Wood, Brazilian Rosewood, Cardamom",
      heartNotes: "Sandalwood, Vetiver, Chinese Pepper",
      baseNotes: "Tonka Bean, Vanilla, Amber",
    },
  },
  {
    id: "12",
    name: "Prada Luna Rossa Black (2018)",
    brand: "Prada",
    imageUrl: "/prada.jpg",
    description:
      "* ⭐ 4.36/5 from 6,284 votes\n* 🌿 Notes: Bergamot, Angelica, Patchouli, Amber, Musk, Coumarin\n* 🕒 Lasts 6–10 hrs, moderate projection\n* 🌙 Best for all day wear\n* 👍 Smooth, powdery, amber-warm scent – ideal for close settings & compliments",
    price: 320000,
    category: "men",
    featured: false,
    scentNotes: {
      topNotes: "Bergamot, Angelica",
      heartNotes: "Patchouli, Amberwood",
      baseNotes: "Musk, Coumarin",
    },
  },
  {
    id: "13",
    name: "Bvlgari Man Wood Neroli 2018",
    brand: "Bvlgari",
    imageUrl: "/Bvlgari-Man-Wood-Neroli-2018.jpg",
    description:
      "* 🌿 Fresh neroli & bergamot top\n* 🌲 Woody heart: cedar & orange blossom\n* 🐚 Warm base: amber, musk, ambergris\n* 💧 Clean, light, everyday wear\n* 🌞 Best for spring & summer\n* ⏳ Lasts 6–8+ hrs like most edps, soft projection",
    price: 350000,
    category: "men",
    featured: false,
    scentNotes: {
      topNotes: "Neroli, Bergamot, Orange Blossom",
      heartNotes: "Cypress, Vetiver, Cedarwood",
      baseNotes: "Ambroxan, Ambergris, White Musk",
    },
  },
  {
    id: "14",
    name: "Bvlgari Man in Black",
    brand: "Bvlgari",
    imageUrl: "/Bvlgari-Man-in-Black.jpg",
    description:
      "A bold and charismatic fragrance inspired by the myth of the birth of Vulcan, the Roman god of the earth.",
    price: 280000,
    category: "men",
    featured: false,
    scentNotes: {
      topNotes: "Spices, Amber Rum",
      heartNotes: "Leather Accord, Tuberose, Iris",
      baseNotes: "Benzoin, Tonka Bean, Guaiac Wood",
    },
  },
  {
    id: "15",
    name: "MontBlanc Explorer Ultra Blue",
    brand: "MontBlanc",
    imageUrl: "/MontBlanc-Explorer-Ultra-Blue.jpg",
    description:
      "Slightly fresher and sweeter than the original Explorer, this Ultra Blue version adds sea notes and exotic fruits to give it an oceanic vibe. Think of sitting on the beach enjoying a crisp ocean breeze and a crisper tropical cocktail and you’ve basically got it. It’s extremely fresh but tempered a bit with a base of woody notes, patchouli, and leather.",
    price: 240000,
    category: "men",
    featured: false,
    scentNotes: {
      topNotes: "Sicilian Bergamot, Pink Peppercorn, Exotic Fruits",
      heartNotes: "Marine Accord, Ambergris",
      baseNotes: "Patchouli, Woody Notes, Leather",
    },
  },
];

// Now all initial products should have either local image paths or placehold.co.
// The filtering logic below will separate them.
const productsWithRealImages: Product[] = initialProducts.filter(
  (product) => !product.imageUrl.includes("placehold.co")
);
const productsWithPlaceholders = initialProducts.filter((product) =>
  product.imageUrl.includes("placehold.co")
);

// Reconstruct the products array: products with local images first, then all placeholders
const products = [...productsWithRealImages, ...productsWithPlaceholders];

// console.log(products) // Removed this console.log as it's for debug

// Changed to named export to match import { products } in other files
export { products };
