"use strict";
// src/data/products.ts
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.products = void 0;
// The 'products' array is now defined here primarily for the 'uploadData.ts' script
// and as a fallback structure. In the actual React components, data will be fetched from Firestore.
var initialProducts = [
    {
        id: "41",
        name: "Azzaro The Most Wanted Eau de Parfum Intense",
        brand: "Azzaro",
        imageUrl: "/Azaro-The-Most_Wanted-Eau-de-Parfum-Intense.jpeg",
        description: "**Azzaro The Most Wanted Eau de Parfum Intense**, launched in **2021**, is a bold woody aromatic scent crafted for men who dare to stand out. This modern classic has earned glowing reviews for its seductive intensity and commanding presence. Expect **long-lasting performance** that stays with you from day to night. Key notes include energizing and crisp **Green Mediterranean Bergamot**, smooth yet striking **Fiery Lavender**, and a warm, daring, and unforgettable **Liquor Accord**. The **set contents** include a 100ml main bottle and two 10ml travel sprays, perfect for both home rituals and scenting on-the-go.",
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
        id: "42",
        name: "Gaultier",
        brand: "Jean Paul Gaultier",
        imageUrl: "/Gaultier.jpeg",
        description: "Jean Paul Gaultier's iconic fragrances redefine sensuality and boldness. From the legendary 'Classique' for women, known for its voluptuous floral oriental notes, to the captivating 'Le Male' for men with its unique fresh oriental blend of lavender and vanilla. Gaultier's perfumes are characterized by their distinctive torso-shaped bottles and audacious, unforgettable compositions.",
        category: "unisex", // Marked as unisex as Gaultier has iconic men's and women's lines
        featured: false,
        scentNotes: {
            topNotes: "Orange Blossom, Mint, Lavender, Bergamot", // Blend of Classique/Le Male prominent notes
            heartNotes: "Ginger, Cinnamon, Orange Blossom, Caraway",
            baseNotes: "Vanilla, Tonka Bean, Amber, Sandalwood",
        },
        volume: 100, // Common volume in ml
        rating: 4.3,
        ratingSource: "Fragrantica Users",
    },
    {
        id: "43",
        name: "Club de Nuit Precieux (2024)",
        brand: "Armaf",
        imageUrl: "/club-de-nuit-Precieux-2024.jpeg",
        description: "A sophisticated and modern release from Armaf's renowned Club de Nuit line. This 2024 edition offers a refined blend of fresh, spicy, and woody accords, designed for the discerning individual seeking a distinctive and long-lasting scent that leaves a powerful impression.",
        category: "unisex",
        featured: false,
        scentNotes: {
            topNotes: "Bergamot, Pineapple, Apple",
            heartNotes: "Birch, Jasmine, Rose",
            baseNotes: "Musk, Ambergris, Vanilla, Patchouli",
        },
        volume: 105,
        rating: 4.5,
        ratingSource: "Parfumo Community",
    },
    {
        id: "44",
        name: "Burberry Hero",
        brand: "Burberry",
        imageUrl: "/Burberry-Hero.jpeg", // Image URL unchanged per instructions
        description: "Burberry Hero is a powerful and sensual fragrance for men. It captures the spirit of exploration and self-discovery with a captivating blend of invigorating bergamot and three distinct cedarwood oils, grounded by a warm, masculine base.",
        category: "men", // Typically categorized as men's
        featured: false,
        scentNotes: {
            topNotes: "Bergamot",
            heartNotes: "Atlas Cedar, Virginia Cedar, Himalayan Cedar",
            baseNotes: "Juniper, Black Pepper",
        },
        volume: 100,
        rating: 4.0,
        ratingSource: "Sephora Reviews",
    },
    {
        id: "45",
        name: "HUGO DEEP RED",
        brand: "Hugo Boss",
        imageUrl: "/HUGO-DEEP-RED.jpeg",
        description: "Hugo Deep Red is an oriental vanilla fragrance for women who revel in the night. This passionate and sensual scent captures the essence of a strong and independent woman with its blend of fruity top notes, spicy heart, and warm, creamy base.",
        category: "women",
        featured: false,
        scentNotes: {
            topNotes: "Blood Orange, Black Currant, Clementine, Pear",
            heartNotes: "Ginger, Freesia, Tuberose, Hibiscus Seed",
            baseNotes: "Vanilla, Sandalwood, Musk, Cedar",
        },
        volume: 90,
        rating: 4.2,
        ratingSource: "Notino Customer Reviews",
    },
    {
        id: "46",
        name: "Giorgio Armani (2019)", // Assuming a popular 2019 release or general brand style
        brand: "Giorgio Armani",
        imageUrl: "/Giorgio-Armani-2019.jpeg",
        description: "Embodying timeless elegance and modern sophistication, this Giorgio Armani fragrance from 2019 is a harmonious blend of floral and woody notes. It's designed for those who appreciate understated luxury and a confident, refined presence.",
        category: "unisex", // General description, can be unisex for versatility
        featured: false,
        scentNotes: {
            topNotes: "Bergamot, Blackcurrant",
            heartNotes: "Rose, Jasmine",
            baseNotes: "Vanilla, Patchouli",
        },
        volume: 100,
        rating: 4.1,
        ratingSource: "General Customer Reviews",
    },
    {
        id: "47",
        name: "Libre Perfume by Yves Saint Laurent (2019)",
        brand: "Yves Saint Laurent",
        imageUrl: "/Libre-Le-Parfum-Yves-Saint-Laurent-2019.jpeg",
        description: "Libre by Yves Saint Laurent is a bold and captivating floral fragrance that embodies freedom. It fuses the aromatic freshness of French lavender with the burning sensuality of Moroccan orange blossom, creating a unique and addictive signature scent.",
        category: "women",
        featured: false,
        scentNotes: {
            topNotes: "Lavender, Mandarin Orange, Black Currant, Petitgrain",
            heartNotes: "Orange Blossom, Lavender, Jasmine",
            baseNotes: "Madagascar Vanilla, Musk, Cedar, Ambergris",
        },
        volume: 90,
        rating: 4.4,
        ratingSource: "Fragrantica Users",
    },
    {
        id: "48",
        name: "Libre Le Parfum",
        brand: "Yves Saint Laurent",
        imageUrl: "/Libre-Le-Parfum.jpeg",
        description: "Libre Le Parfum is the most intense and luxurious interpretation of the iconic Libre fragrance. It's a fiery twist on the original, with a deeper, spicier, and more sensual composition, emphasizing warm vanilla and honeyed notes for an unforgettable trail.",
        category: "women",
        featured: false,
        scentNotes: {
            topNotes: "Ginger, Saffron, Mandarin Orange, Bergamot",
            heartNotes: "Orange Blossom, Lavender",
            baseNotes: "Bourbon Vanilla, Honey, Tonka Bean, Vetiver",
        },
        volume: 50,
        rating: 4.5,
        ratingSource: "Parfumo Community",
    },
    {
        id: "49",
        name: "My Way perfume by Giorgio Armani (2020)",
        brand: "Giorgio Armani",
        imageUrl: "/My-Way-perfume-by-Giorgio-Armani-2020.jpeg",
        description: "My Way is a radiant and modern floral fragrance by Giorgio Armani, encapsulating the spirit of curiosity and connection. It features bright notes of orange blossom and bergamot, a vibrant heart of tuberose and jasmine, and a warm vanilla and white musk base, representing a journey of self-discovery.",
        category: "women",
        featured: false,
        scentNotes: {
            topNotes: "Orange Blossom, Bergamot",
            heartNotes: "Tuberose, Indian Jasmine",
            baseNotes: "White Musk, Vanilla, Cedar",
        },
        volume: 90,
        rating: 4.3,
        ratingSource: "Sephora Reviews",
    },
    {
        id: "50",
        name: "So Scandal (2020)",
        brand: "Jean Paul Gaultier",
        imageUrl: "/So-Scandal.jpeg",
        description: "So Scandal! is an explosive and deliciously scandalous floral fragrance from Jean Paul Gaultier. It's an overdose of white flowers with a milky gourmand twist, creating a daring and highly addictive scent designed to cause a sensation.",
        category: "women",
        featured: false,
        scentNotes: {
            topNotes: "Orange Blossom",
            heartNotes: "Tuberose, Jasmine Sambac",
            baseNotes: "Milky Notes",
        },
        volume: 80,
        rating: 4.2,
        ratingSource: "Fragrantica Users",
    },
    {
        id: "51",
        name: "Libre Absolu Platine",
        brand: "Yves Saint Laurent",
        imageUrl: "/Libre-Absolu-Platine.jpeg",
        description: "Libre Absolu Platine is a precious and intense interpretation of the iconic Libre, infused with the coolness of platinum. It elevates the signature lavender-orange blossom accord with a metallic, sophisticated edge, creating a truly unique and luxurious scent experience.",
        category: "women",
        featured: false,
        scentNotes: {
            topNotes: "Aldehydes, Bergamot, Mandarin Orange",
            heartNotes: "Lavender, Orange Blossom, White Lavandin",
            baseNotes: "Vanilla, Ambergris",
        },
        volume: 50,
        rating: 4.6,
        ratingSource: "Parfumo Community",
    },
    {
        id: "52",
        name: "Jasmine Wisp",
        brand: "Generic/Artisanal", // Assuming a generic name, could be specific brand if known
        imageUrl: "/Jasmine-wisp.jpeg",
        description: "Jasmine Wisp is a delicate and ethereal fragrance centered around the intoxicating beauty of jasmine. It evokes a soft, airy elegance with subtle hints of supporting florals and a clean, musky drydown, perfect for those who appreciate understated grace.",
        category: "unisex", // Jasmine can be versatile
        featured: false,
        scentNotes: {
            topNotes: "Jasmine, Bergamot",
            heartNotes: "White Flowers, Tuberose",
            baseNotes: "Musk, Amber",
        },
        volume: 100,
        rating: 4.0,
        ratingSource: "User Reviews",
    },
    {
        id: "53",
        name: "Bvlgari Man In Black (2012)",
        brand: "Bvlgari",
        imageUrl: "/Bvlgari-Man-In-Black-2012.jpeg",
        description: "Bvlgari Man In Black is a powerful and charismatic neo-oriental fragrance inspired by the myth of Vulcan, the god of the earth. It's an intense and sensual blend of vibrant spices, warm rum, tuberose, and smoky woods, embodying a daring and magnetic masculinity.",
        category: "men",
        featured: false,
        scentNotes: {
            topNotes: "Spices, Rum, Tobacco",
            heartNotes: "Leather, Iris, Tuberose",
            baseNotes: "Guaiac Wood, Benzoin, Tonka Bean",
        },
        volume: 100,
        rating: 4.4,
        ratingSource: "Fragrantica Users",
    },
    {
        id: "54",
        name: "Libre Le Parfum Yves Saint Laurent", // Duplicate of ID 48, using same info for consistency
        brand: "Yves Saint Laurent",
        imageUrl: "/Libre-Le-Parfum-Yves-Saint-Laurent.jpeg",
        description: "Libre Le Parfum is the most intense and luxurious interpretation of the iconic Libre fragrance. It's a fiery twist on the original, with a deeper, spicier, and more sensual composition, emphasizing warm vanilla and honeyed notes for an unforgettable trail.",
        category: "women",
        featured: false,
        scentNotes: {
            topNotes: "Ginger, Saffron, Mandarin Orange, Bergamot",
            heartNotes: "Orange Blossom, Lavender",
            baseNotes: "Bourbon Vanilla, Honey, Tonka Bean, Vetiver",
        },
        volume: 50,
        rating: 4.5,
        ratingSource: "Parfumo Community",
    },
    {
        id: "55",
        name: "Libre Eau de Parfum Intense",
        brand: "Yves Saint Laurent",
        imageUrl: "/Libre-Eau-de-Parfum-Intense.jpeg",
        description: "Libre Eau de Parfum Intense amplifies the signature Libre accord with a warmer, more sensual interpretation. It fuses the burning floral heart of orange blossom and jasmine with a potent orchid accord and rich vanilla, creating a deeply addictive and powerful scent.",
        category: "women",
        featured: false,
        scentNotes: {
            topNotes: "Mandarin Orange, Bergamot, French Lavender",
            heartNotes: "Orange Blossom, Jasmine Sambac, Orchid",
            baseNotes: "Vanilla, Tonka Bean, Ambergris, Vetiver",
        },
        volume: 90,
        rating: 4.5,
        ratingSource: "Sephora Reviews",
    },
    {
        id: "56",
        name: "Allure Homme Sport Eau Extreme by Chanel",
        brand: "Chanel",
        imageUrl: "/Allure-Homme-Sport-Eau-Extreme-by-Chanel.jpeg",
        description: "Allure Homme Sport Eau Extreme is a vibrant, musky, and aromatic fragrance for men. It combines crisp mint, energetic mandarin, and green cypress with a powerful woody base of cedar and sandalwood, creating a dynamic and effortlessly alluring scent.",
        category: "men",
        featured: false,
        scentNotes: {
            topNotes: "Mandarin Orange, Mint, Cypress, Sage",
            heartNotes: "Pepper",
            baseNotes: "Tonka Bean, Musk, Sandalwood, Cedar",
        },
        volume: 100,
        rating: 4.6,
        ratingSource: "Fragrantica Users",
    },
    {
        id: "57",
        name: "Montblanc Explorer Platinum",
        brand: "Montblanc",
        imageUrl: "/Montblanc-Explorer-Platinum.jpeg",
        description: "Montblanc Explorer Platinum is a fresh and radiant woody-aromatic fragrance that evokes the spirit of adventure. It opens with invigorating violet leaves, leading to a heart of clary sage, and a powerful base of cedarwood, creating a masculine and sophisticated journey.",
        category: "men",
        featured: false,
        scentNotes: {
            topNotes: "Violet Leaves",
            heartNotes: "Clary Sage",
            baseNotes: "Cedarwood",
        },
        volume: 100,
        rating: 4.1,
        ratingSource: "Parfumo Community",
    },
    {
        id: "58",
        name: "Lacoste", // Assuming a popular Lacoste such as L.12.12 Blanc
        brand: "Lacoste",
        imageUrl: "/Lacoste.jpeg",
        description: "Embodying the spirit of the iconic polo shirt, this Lacoste fragrance offers a clean, crisp, and effortlessly elegant aroma. It's a fresh woody-aromatic scent, perfect for everyday wear, exuding a casual yet refined masculinity.",
        category: "men",
        featured: false,
        scentNotes: {
            topNotes: "Grapefruit, Cardamom, Rosemary",
            heartNotes: "Tuberose, Ylang-Ylang",
            baseNotes: "Cedarwood, Vetiver, Suede",
        },
        volume: 100,
        rating: 4.0,
        ratingSource: "General Customer Reviews",
    },
    {
        id: "59",
        name: "Amber Oud (Original/Gold Edition)", // Specified for clarity
        brand: "Al Haramain",
        imageUrl: "/Amber-Oud.jpeg",
        description: "Al Haramain Amber Oud Original (Gold Edition) is a majestic and opulent amber-woody fragrance launched in 2018. It opens with rich amber and oud, evolving into a warm, resinous heart, and settling into a creamy, long-lasting base, creating a truly luxurious and sophisticated statement.",
        category: "unisex",
        featured: false,
        scentNotes: {
            topNotes: "Bergamot, Green Notes",
            heartNotes: "Melon, Pineapple, Amber, Sweet Notes",
            baseNotes: "Woody Notes, Musk, Vanilla",
        },
        volume: 60,
        rating: 4.3,
        ratingSource: "Fragrantica Users",
    },
    {
        id: "60",
        name: "Dior Homme Intense",
        brand: "Dior",
        imageUrl: "/Dior-Homme-Intense.jpeg",
        description: "Dior Homme Intense is an intensely masculine and sophisticated fragrance. With a bold and powdery iris heart, it exudes a unique elegance. The fragrance is deepened by sensual amber and woody notes, creating an enveloping, long-lasting, and highly distinguished aura.",
        category: "men",
        featured: false,
        scentNotes: {
            topNotes: "Lavender",
            heartNotes: "Iris, Ambrette (Musk Mallow), Pear",
            baseNotes: "Virginia Cedar, Vetiver",
        },
        volume: 100,
        rating: 4.7,
        ratingSource: "Parfumo Community",
    },
    {
        id: "61",
        name: "Emporio Armani (Stronger With You)", // Assuming this popular variant
        brand: "Giorgio Armani",
        imageUrl: "/Emporior-Armani.jpeg",
        description: "Emporio Armani Stronger With You is a vibrant and confident fragrance for men. It's an aromatic fougere with a unique spicy accord, blended with a sweet chestnut glaze and infused with vanilla and amberwood, embodying modern masculinity and romantic connection.",
        category: "men",
        featured: false,
        scentNotes: {
            topNotes: "Cardamom, Pink Pepper, Violet Leaves",
            heartNotes: "Sage",
            baseNotes: "Vanilla, Chestnut, Amberwood",
        },
        volume: 100,
        rating: 4.2,
        ratingSource: "Notino Customer Reviews",
    },
    {
        id: "62",
        name: "Bleu de Chanel",
        brand: "Chanel",
        imageUrl: "/Bleu-de-Chanel.jpeg",
        description: "Bleu de Chanel is a timeless aromatic-woody fragrance that embodies male freedom. It comes in three concentrations: the vibrant and fresh Eau de Toilette (EDT), the richer and more intense Eau de Parfum (EDP), and the deepest, most sophisticated Parfum version. Each offers a unique facet of its signature blend of citrus, woods, and amber.",
        category: "men",
        featured: false,
        scentNotes: {
            topNotes: "Grapefruit, Lemon, Mint, Pink Pepper (General)",
            heartNotes: "Ginger, Nutmeg, Jasmine, Iso E Super (General)",
            baseNotes: "Incense, Vetiver, Cedar, Sandalwood, Patchouli, White Musk (General)",
        },
        volume: 100, // Common volume, applies to different concentrations
        rating: 4.6,
        ratingSource: "Fragrantica Users",
    },
    {
        id: "63",
        name: "Armani Acqua Di Gio Profondo",
        brand: "Giorgio Armani",
        imageUrl: "/Armani-Acqua-Di-Gio-Profondo.jpeg",
        description: "Acqua Di Gio Profondo by Giorgio Armani is an intensely aquatic and aromatic fougere fragrance for men. It plunges into the depths of the ocean with marine notes, green mandarin, and rosemary, evolving into a mineral heart and a woody, musky base, capturing a profound and modern masculinity.",
        category: "men",
        featured: false,
        scentNotes: {
            topNotes: "Sea Notes, Aquozone, Bergamot, Green Mandarin",
            heartNotes: "Rosemary, Lavender, Cypress, Mastic or Lentisque",
            baseNotes: "Mineral notes, Musk, Patchouli, Amber",
        },
        volume: 75,
        rating: 4.4,
        ratingSource: "Sephora Reviews",
    },
    {
        id: "64",
        name: "Narciso Rodriguez Musc Noir Perfume",
        brand: "Narciso Rodriguez",
        imageUrl: "/Narciso-Rodriguez-Musc-Noir-Perfume.jpeg",
        description: "Narciso Rodriguez Musc Noir is a mysterious and highly addictive fragrance that reinterprets the iconic musk. It features a luminous plum accord, a captivating heart of heliotrope and musk, settling into a dark, leathery suede base, creating a deeply sensual and elegant aroma.",
        category: "women",
        featured: false,
        scentNotes: {
            topNotes: "Plum",
            heartNotes: "Heliotrope, Musk",
            baseNotes: "Leather Suede Accord",
        },
        volume: 100,
        rating: 4.3,
        ratingSource: "Parfumo Community",
    },
];
// The filtering logic below will separate them.
var productsWithRealImages = initialProducts.filter(function (product) {
    return !product.imageUrl.includes("placehold.co") && product.imageUrl !== "/.jpeg";
});
var productsWithPlaceholders = initialProducts.filter(function (product) {
    return product.imageUrl.includes("placehold.co") || product.imageUrl === "/.jpeg";
});
// Reconstruct the products array: products with local images first, then all placeholders
var products = __spreadArray(__spreadArray([], productsWithRealImages, true), productsWithPlaceholders, true);
exports.products = products;
