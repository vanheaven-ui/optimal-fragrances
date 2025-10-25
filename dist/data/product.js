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
        id: "38",
        name: "Petra by Lattafa",
        brand: "Lattafa",
        imageUrl: "/Petra-by-Lattafa-2025.jpeg",
        description: "**Petra by Lattafa (2025)** is a captivating unisex blend. It opens with juicy **rum and plum** notes, gracefully wrapped in creamy **coconut and tuberose**. The scent then settles on a warm, inviting base of **vanilla, praline, and musk**. Highly rated for its seductive depth and elegant sweetness, Petra offers **long-lasting wear** (7–10 hours on skin, even longer on clothes) and a **strong projection** in the initial hours before softening to a smooth, skin-close trail. It's perfect for summer evenings, romantic date nights, or as a signature scent for those who love unique gourmand blends.",
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
        description: "**Signorina Unica by Ferragamo (2023)** is a chic woody-gourmand floral with true Italian flair 🇮🇹. The top notes feature refreshing **Mandarin, Sea Notes, Sugar Cane, and Bergamot**. Its heart blooms with **Violet, Azalea, Blackcurrant, and Cashmere Wood**. The cozy base settles into delicious notes of **Tiramisu, Vanilla, Tonka, Patchouli, and Ambroxan**. This refined and cozy scent is perfect for gifting or adding a touch of daily elegance. The **set includes** a 100ml EDP, a 5ml mini spray, and a 50ml body lotion.",
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
        description: "**Montblanc Signature Absolue** is a golden, elegant fragrance designed to leave a lasting charm. This luxurious **set includes** a 90ml Eau de Parfum, a 7.5ml mini travel spray, and a 100ml body lotion, making it a perfect gift.",
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
        imageUrl: "/Azaro-The-Most_Wanted-ED.jpeg",
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
        id: "5",
        name: "Montblanc Legend EDT",
        brand: "Montblanc",
        imageUrl: "/Montblanc-Legend-EDT.jpeg",
        description: "**Montblanc Legend EDT** is a timeless fragrance that embodies elegance and sophistication. A truly classic scent for the modern man. **200ml size available**.",
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
        description: "**Gucci Intense Oud** is a rich, opulent, and highly captivating oriental fragrance. It features a powerful and luxurious blend centered around the mystical **oud wood**, complemented by notes of **frankincense, leather, and amber**. This unisex scent is known for its deep, smoky, and resinous character, making a bold statement.",
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
    {
        id: "1",
        name: "Burberry Her Elixir EDP (2022)",
        brand: "Burberry",
        imageUrl: "/Burberry-Her-Elixir-EDP-2022.jpeg",
        description: "A bold and captivating new chapter for Burberry Her. Elixir de Parfum is an intense interpretation of the original, offering a rich, fruity gourmand scent with dark red berries, jasmine, and warm vanilla.",
        category: "women",
        featured: true,
        scentNotes: {
            topNotes: "Strawberry, Blackberry – juicy burst",
            heartNotes: "Jasmine – creamy floral sophistication",
            baseNotes: "Vanilla, Amber, Sandalwood – warm, cozy, long-lasting",
        },
        volume: 100, // Common volume
        rating: 4.6, // Average of multiple sources
        ratingSource: "Fragrantica (4.14/5), Ulta (4.6/5), Sephora (4.6/5)",
    },
    {
        id: "2",
        name: "Prada Paradoxe Intense (2023)",
        brand: "Prada",
        imageUrl: "/Prada-Paradoxe-Intense-2023.jpeg",
        description: "An amplified, rich, and sensual interpretation of the original Paradoxe. This floral amber fragrance boasts a vibrant woody addiction, with a powerful blend of Ambrofix, Jasmine, and Moss.",
        category: "women",
        featured: true,
        scentNotes: {
            topNotes: "Bergamot, Neroli, Pear",
            heartNotes: "Neroli, Jasmine, Moss Accord",
            baseNotes: "Vanilla, Amber, White Musk",
        },
        volume: 90, // Common volume
        rating: 4.4, // Average of multiple sources
        ratingSource: "Fragrantica (4.12/5), Prada Beauty (4.6/5), Boots (4.8/5), Sephora (4.7/5)",
    },
    {
        id: "3",
        name: "YSL Libre L’Absolu Platine (2023)",
        brand: "Yves Saint Laurent",
        imageUrl: "/YSL-Libre-LAbsolu-Platine-2023.jpeg",
        description: "The most intense and captivating interpretation of Libre, featuring a new metallic intensity. This floral amber fragrance combines the signature lavender with white floral notes and a unique, chilling platinum accord.",
        category: "women",
        featured: true,
        scentNotes: {
            topNotes: "Aldehydes, Bergamot, Mandarin Orange",
            heartNotes: "White Lavender, Orange Blossom, Diva Lavender",
            baseNotes: "Vanilla, Amber, Cedarwood",
        },
        volume: 90, // Common volume
        rating: 4.4, // Average of multiple sources
        ratingSource: "Fragrantica (3.76/5), YSL Beauty US (4.7/5), YSL Beauty CA (4.7/5)",
    },
    {
        id: "4",
        name: "Jimmy Choo – I Want Choo Forever (2022)",
        brand: "Jimmy Choo",
        imageUrl: "/Jimmy-Choo–I-Want-Choo-Forever-2022.jpeg",
        description: "An enchanting and glamorous chypre amber gourmand, embodying a sense of mystery and allure. It's a powerful fragrance perfect for evening wear and special occasions, with notes of rose, black cherry, and vanilla.",
        category: "women",
        featured: true,
        scentNotes: {
            topNotes: "Rose, Pink Peppercorn, Bitter Almond",
            heartNotes: "Black Cherry, Jasmine Sambac, Vetiver",
            baseNotes: "Vanilla, Tonka Bean, Oakmoss",
        },
        volume: 100, // Common volume
        rating: 4.4, // Average of Fragrantica and a retailer
        ratingSource: "Fragrantica (4.07/5), Women's Health Shop (4.7/5)",
    },
    {
        id: "5",
        name: "Jimmy Choo – I Want Choo",
        brand: "Jimmy Choo",
        imageUrl: "/Jimmy-Choo–I-Want-Choo.jpeg",
        description: "A sparkling and joyful floral gourmand fragrance that perfectly embodies a confident, playful spirit. It opens with vibrant mandarin and peach, leading to a dazzling red lily and jasmine heart, grounded by vanilla and benzoin.",
        category: "women",
        featured: false,
        scentNotes: {
            topNotes: "Mandarin Juice, Velvet Peach",
            heartNotes: "Red Spider Lily, Jasmine Sambac",
            baseNotes: "Vanilla, Benzoin",
        },
        volume: 100, // Common volume
        rating: 4.3, // Based on general positive sentiment on retailers/Fragrantica
        ratingSource: "General consensus on beauty retailers and Fragrantica (approx. 4.3/5)",
    },
    {
        id: "6",
        name: "Alien Goddess – Thierry Mugler (Vanilla Floral Woody)",
        brand: "Mugler",
        imageUrl: "/Alien-Goddess-Thierry- Mugler-Vanilla-Floral-Woody.jpeg",
        description: "A divine solar floral fragrance, Alien Goddess is a radiant celebration of femininity. It blends sparkling bergamot, Indian Jasmine Grandiflorum, and a luxurious Bourbon Vanilla for a warm, luminous trail.",
        category: "women",
        featured: false,
        scentNotes: {
            topNotes: "Bergamot",
            heartNotes: "Jasmine Grandiflorum",
            baseNotes: "Bourbon Vanilla, Cashmeran",
        },
        volume: 90, // Common volume
        rating: 4.1, // Based on Fragrantica and retailers
        ratingSource: "Fragrantica (3.92/5), Sephora (4.3/5)",
    },
    {
        id: "16",
        name: "Désir du Cœur – Thomas Kosmala (Unisex, came out in 2020)",
        brand: "Thomas Kosmala",
        imageUrl: "/Desir-du-Cœur–Thomas-Kosmala-Unisex-came-out-in-2020.jpeg",
        description: "An enchanting and sensual fragrance that plays on the desires of the heart. This captivating scent combines floral and musky notes with a hint of warm amber, creating an intimate and long-lasting trail.",
        category: "unisex",
        featured: false,
        scentNotes: {
            topNotes: "Lemon Zest, Spices",
            heartNotes: "Aromatic Notes, Amber",
            baseNotes: "Musk, Woods",
        },
        volume: 100, // Common volume
        rating: 4.2, // Estimated based on other Kosmala offerings and niche reviews
        ratingSource: "General niche fragrance community sentiment",
    },
    {
        id: "17",
        name: "Encre Noire",
        brand: "Lalique",
        imageUrl: "/encre-noire.jpeg",
        description: "A cult classic for men, Encre Noire is a woody aromatic fragrance built around the powerful and earthy note of vetiver. It's dark, mysterious, and sophisticated, ideal for those who appreciate unique and bold scents.",
        category: "men",
        featured: false,
        scentNotes: {
            topNotes: "Cypress",
            heartNotes: "Vetiver (Haitian, Bourbon)",
            baseNotes: "Musk, Cashmere Wood",
        },
        volume: 100, // Common volume
        rating: 4.1,
        ratingSource: "Fragrantica (4.06/5)",
    },
    {
        id: "18",
        name: "Hawas for Him",
        brand: "Rasasi",
        imageUrl: "/hawas.jpeg",
        description: "A captivating aquatic, amber, and woody fragrance for men that is fresh, elegant, and powerful. Hawas is known for its incredible projection and longevity, making it a popular choice for all seasons.",
        category: "men",
        featured: false,
        scentNotes: {
            topNotes: "Apple, Bergamot, Lemon, Cinnamon",
            heartNotes: "Orange Blossom, Cardamom, Plum",
            baseNotes: "Ambergris, Musk, Driftwood, Patchouli",
        },
        volume: 100, // Common volume
        rating: 4.3,
        ratingSource: "Fragrantica (4.29/5)",
    },
    {
        id: "19a",
        name: "Versace Bright Crystal",
        brand: "Versace",
        imageUrl: "/versace-bright-crystal.png",
        description: "A sparkling and luminous floral-fruity fragrance, Bright Crystal is a fresh and sensual scent perfect for daily wear. It combines notes of yuzu, pomegranate, peony, and musk for a radiant and feminine aura.",
        category: "women",
        featured: false,
        scentNotes: {
            topNotes: "Yuzu, Pomegranate, Water Notes",
            heartNotes: "Peony, Lotus, Magnolia",
            baseNotes: "Musk, Amber, Mahogany",
        },
        volume: 90, // Common volume
        rating: 4.5,
        ratingSource: "Sephora (4.5/5), Ulta (4.5/5)",
    },
    {
        id: "19b",
        name: "Jaguar Classic Black",
        brand: "Jaguar",
        imageUrl: "/jaguar-classic-black.jpeg",
        description: "A classic and sophisticated oriental-fougere fragrance for men. It's a powerful yet elegant scent with notes of mandarin, green apple, sandalwood, and musk, perfect for the modern gentleman.",
        category: "men",
        featured: false,
        scentNotes: {
            topNotes: "Green Apple, Mandarin Orange, Bitter Orange",
            heartNotes: "Cardamom, Nutmeg, Black Tea, Geranium",
            baseNotes: "Sandalwood, Cedarwood, Oakmoss, Vetiver, Musk",
        },
        volume: 100, // Common volume
        rating: 3.9,
        ratingSource: "Fragrantica (3.92/5)",
    },
    {
        id: "20",
        name: "Armaf Club de Nuit Intense Man",
        brand: "Armaf",
        imageUrl: "/Armaf-clude-de-nuit-intense-man.jpeg",
        description: "A highly popular and often compared alternative to Creed Aventus, offering a bold and smoky pineapple scent. It's a robust, long-lasting fragrance for men, known for its strong sillage and versatility.",
        category: "men",
        featured: true,
        scentNotes: {
            topNotes: "Lemon, Blackcurrant, Apple, Bergamot, Pineapple",
            heartNotes: "Rose, Jasmine, Birch",
            baseNotes: "Vanilla, Ambergris, Musk, Patchouli",
        },
        volume: 105, // Common volume for this specific product
        rating: 4.3,
        ratingSource: "Fragrantica (4.29/5)",
    },
    {
        id: "21",
        name: "Bentley For Men Intense",
        brand: "Bentley",
        imageUrl: "/Bentley-Intense.jpeg",
        description: "An intense and sophisticated oriental woody fragrance designed for the discerning man. It offers a rich blend of spices, rum, and woody notes, exuding luxury and power, ideal for cooler weather and evening wear.",
        category: "men",
        featured: false,
        scentNotes: {
            topNotes: "Bergamot, Black Pepper, Incense",
            heartNotes: "Rum, Woody Notes, Cinnamon, Clary Sage",
            baseNotes: "Leather, Benzoin, Cedarwood, Patchouli",
        },
        volume: 100, // Common volume
        rating: 4.2,
        ratingSource: "Fragrantica (4.22/5)",
    },
    {
        id: "22",
        name: "Scandal by Jean Paul Gaultier",
        brand: "Jean Paul Gaultier",
        imageUrl: "/Scandal-Jean-paul-Gaultter.jpeg",
        description: "A modern and elegant chypre floral fragrance for women. Scandal is designed to be scandalous, evoking the sensual and exciting atmosphere of Paris nightlife with a blend of honey, gardenia, and patchouli.",
        category: "women",
        featured: false,
        scentNotes: {
            topNotes: "Blood Orange, Gardenia",
            heartNotes: "Honey",
            baseNotes: "Patchouli",
        },
        volume: 80, // Common volume
        rating: 4.1,
        ratingSource: "Fragrantica (4.13/5)",
    },
    {
        id: "23",
        name: "Armani Code Eau de Parfum",
        brand: "Giorgio Armani",
        imageUrl: "/Armani-Code.jpeg",
        description: "An iconic and seductive oriental-spicy fragrance for men. Armani Code offers a captivating blend of lemon, star anise, olive blossom, and tonka bean, creating a timeless and elegant aura.",
        category: "men",
        featured: false,
        scentNotes: {
            topNotes: "Lemon, Bergamot",
            heartNotes: "Star Anise, Olive Blossom",
            baseNotes: "Tonka Bean, Guaiac Wood, Leather",
        },
        volume: 75, // Common volume
        rating: 4.1,
        ratingSource: "Fragrantica (4.06/5)",
    },
    {
        id: "24",
        name: "Dior Sauvage Eau de Parfum",
        brand: "Dior",
        imageUrl: "/Dior-Sauvage.jpeg",
        description: "A radically fresh, raw, and noble composition. Sauvage EDP is an aromatic fougère fragrance for men, inspired by wild, open spaces, with notes of bergamot, Sichuan pepper, and ambroxan.",
        category: "men",
        featured: false,
        scentNotes: {
            topNotes: "Bergamot",
            heartNotes: "Sichuan Pepper, Star Anise, Nutmeg",
            baseNotes: "Ambroxan, Vanilla",
        },
        volume: 100, // Common volume
        rating: 4.2,
        ratingSource: "Sephora (4.6/5), Fragrantica (4.2/5)",
    },
    {
        id: "25",
        name: "Versace Eros Eau de Parfum (2020)",
        brand: "Versace",
        imageUrl: "/Versace-Eros-EDP-2020.jpeg",
        description: "An intoxicating and passionate fougère oriental fragrance for men, Eros EDP is a more intense version of the original. It combines fresh citrus, mint, and apple with warm amber, tonka bean, and vanilla.",
        category: "men",
        featured: false,
        scentNotes: {
            topNotes: "Mint, Candied Apple, Lemon, Mandarin Orange",
            heartNotes: "Ambroxan, Geranium, Clary Sage",
            baseNotes: "Vanilla, Cedarwood, Sandalwood, Patchouli, Leather",
        },
        volume: 100, // Common volume
        rating: 4.4,
        ratingSource: "Fragrantica (4.38/5)",
    },
    {
        id: "26",
        name: "La Vie Est Belle Eau de Parfum (2012)",
        brand: "Lancôme",
        imageUrl: "/La-Vie-Est-Belle-Eau-de-Parfum-2012.jpeg",
        description: "A timeless and iconic gourmand iris fragrance that celebrates joy and happiness. This elegant scent combines sweet iris, patchouli, and spun sugar with a hint of fruity freshness, embodying a radiant femininity.",
        category: "women",
        featured: false,
        scentNotes: {
            topNotes: "Blackcurrant, Pear",
            heartNotes: "Iris, Jasmine, Orange Blossom",
            baseNotes: "Patchouli, Tonka Bean, Vanilla, Praline",
        },
        volume: 100, // Common volume
        rating: 4.4,
        ratingSource: "Ulta (4.5/5), Sephora (4.5/5), Fragrantica (4.4/5)",
    },
    {
        id: "27",
        name: "Stronger With You Intensely (2019)",
        brand: "Giorgio Armani",
        imageUrl: "/Stronger-With-You-Intensely-2019.jpeg",
        description: "An intense and addictive amber woody fragrance for men, designed to capture the energy of intense love. It features notes of spicy pink pepper, warm vanilla, and captivating amber wood for a truly memorable trail.",
        category: "men",
        featured: false,
        scentNotes: {
            topNotes: "Pink Pepper, Juniper, Violet",
            heartNotes: "Toffee, Cinnamon, Lavender, Sage",
            baseNotes: "Vanilla, Tonka Bean, Amberwood, Suede",
        },
        volume: 100, // Common volume
        rating: 4.4,
        ratingSource: "Fragrantica (4.37/5)",
    },
    {
        id: "28",
        name: "The One by Dolce & Gabbana",
        brand: "Dolce & Gabbana",
        imageUrl: "/The-One-by-Dolce-&-Gabbana.jpeg",
        description: "A warm, floral-oriental scent with bergamot, jasmine, amber & vanilla.⏳ Lasts 8–10 hours with soft, skin-close sillage.💬 “Elegant… my go-to for any occasion.”🎁 Set: 75ml EDP + 15ml Mini + 50ml Perfumed Body Lotion",
        category: "women",
        featured: false,
        scentNotes: {
            topNotes: "Bergamot, Mandarin Orange, Lychee, Peach",
            heartNotes: "Madonna Lily, Jasmine, Lily-of-the-Valley",
            baseNotes: "Vanilla, Amber, Musk, Vetiver",
        },
        volume: 75, // Common volume mentioned in description
        rating: 4.2,
        ratingSource: "Fragrantica (4.24/5)",
    },
    {
        id: "29",
        name: "Q by Dolce & Gabbana (2023)",
        brand: "Dolce & Gabbana",
        imageUrl: "/Q-by-Dolce-&-Gabbana-2023.jpeg",
        description: "A royal burst of lemon, cherry & musk — soft, fresh, and elegant.🌸 Lasts up to 8+ hours with a subtle, skin-like finish.💬 “Versatile… seductive, sweet, and light.”🎁 Set: 100ml + 10ml Travel + 5ml Mini",
        category: "women",
        featured: false,
        scentNotes: {
            topNotes: "Sicilian Lemon, Blood Orange, Jasmine",
            heartNotes: "Cherry, Heliotrope, Tuberose",
            baseNotes: "Cedarwood, Musk, Patchouli",
        },
        volume: 100, // Common volume mentioned in description
        rating: 3.9,
        ratingSource: "Fragrantica (3.92/5)",
    },
    {
        id: "30",
        name: "Ariana Grande Cloud",
        brand: "Ariana Grande",
        imageUrl: "/Ariana-Grande-Cloud.jpeg",
        description: "A dreamy and uplifting gourmand fragrance, reminiscent of a sweet, fluffy cloud. It blends creamy coconut, sweet praline, and warm vanilla with delicate lavender and musk for a comforting and addictive scent.",
        category: "women",
        featured: false,
        scentNotes: {
            topNotes: "Lavender, Pear, Bergamot",
            heartNotes: "Whipped Cream, Praline, Coconut, Vanilla Orchid",
            baseNotes: "Musk, Woody Notes",
        },
        volume: 100, // Common volume
        rating: 4.4,
        ratingSource: "Ulta (4.6/5), Sephora (4.6/5), Fragrantica (4.43/5)",
    },
    {
        id: "31",
        name: "Boss Bottled Elixir – Hugo Boss (2023)",
        brand: "Hugo Boss",
        imageUrl: "/Boss-Bottled-Elixir–Hugo-Boss-2023.jpeg",
        description: "A rich, highly concentrated interpretation of the iconic Boss Bottled, offering deep, warm, and woody notes with a captivating amber signature. It's a powerful and charismatic fragrance for the modern man.",
        category: "men",
        featured: false,
        scentNotes: {
            topNotes: "Frankincense, Cardamom",
            heartNotes: "Vetiver, Patchouli",
            baseNotes: "Cedarwood, Labdanum",
        },
        volume: 100, // Common volume
        rating: 4.2,
        ratingSource: "Fragrantica (4.22/5)",
    },
    {
        id: "32",
        name: "ACQUA DI GIÒ PARFUM GIFT SET",
        brand: "Giorgio Armani",
        imageUrl: "/ACQUA-DI-GIÒ-PARFUM-GIFT-SET.jpeg",
        description: "A sophisticated and intense marine woody fragrance, representing the true essence of Acqua di Giò. The Parfum version offers a deeper and more mysterious interpretation with notes of frankincense and marine accords.",
        category: "men",
        featured: false,
        scentNotes: {
            topNotes: "Marine Notes, Bergamot",
            heartNotes: "Geranium, Rosemary, Clary Sage",
            baseNotes: "Patchouli, Incense",
        },
        volume: 75, // Common volume for the main bottle in such a set
        rating: 4.4,
        ratingSource: "Fragrantica (4.37/5)",
    },
    {
        id: "33",
        name: "GENTLEMAN SOCIETY",
        brand: "Givenchy",
        imageUrl: "/gentleman-society.jpeg",
        description: "A bold and sophisticated woody floral fragrance that redefines modern masculinity. It blends fresh sage with wild daffodil, vetiver, and warm vanilla, creating a multifaceted and charismatic signature.",
        category: "men",
        featured: false,
        scentNotes: {
            topNotes: "Sage, Cardamom",
            heartNotes: "Wild Daffodil, Vetiver",
            baseNotes: "Vanilla, Cedarwood, Sandalwood",
        },
        volume: 100, // Common volume
        rating: 4.1,
        ratingSource: "Fragrantica (4.13/5)",
    },
    {
        id: "34",
        name: "OLYMPEA GIFT SET",
        brand: "Paco Rabanne",
        imageUrl: "/OYMPEA-GIFT-SET.jpeg",
        description: "A divine and powerful oriental floral fragrance, Olympea is a captivating blend of salty vanilla and fresh floral notes. This gift set offers the full experience of strength and femininity, inspired by a modern goddess.",
        category: "women",
        featured: false,
        scentNotes: {
            topNotes: "Green Mandarin, Water Jasmine, Ginger Lily",
            heartNotes: "Salted Vanilla",
            baseNotes: "Ambergris, Cashmere Wood, Sandalwood",
        },
        volume: 80, // Common volume for the main bottle in such a set
        rating: 4.2,
        ratingSource: "Fragrantica (4.19/5)",
    },
    {
        id: "35",
        name: "Gucci Guilty Pour Homme",
        brand: "Gucci",
        imageUrl: "/Gucci-Guilty-Pour-Homme.jpeg",
        description: "A modern and charismatic aromatic fougère fragrance for men, designed for the man who defines his own sensuality. It features notes of pink pepper, lemon, orange blossom, and patchouli.",
        category: "men",
        featured: false,
        scentNotes: {
            topNotes: "Lemon, Pink Pepper",
            heartNotes: "Orange Blossom, Neroli, French Lavender",
            baseNotes: "Cedarwood, Patchouli",
        },
        volume: 90, // Common volume
        rating: 3.9,
        ratingSource: "Fragrantica (3.92/5)",
    },
    {
        id: "36",
        name: "Dolce & Gabbana Pour Homme Intenso",
        brand: "Dolce & Gabbana",
        imageUrl: "/Intenso-by-Dolce-&-Gabbana.jpeg",
        description: "A powerful and masculine woody aromatic fragrance that evokes pure instinct. Intenso is a unique blend of fresh aquatic notes, basil, lavender, and the groundbreaking Moepel wood accord, creating a deep and captivating signature.",
        category: "men",
        featured: false,
        scentNotes: {
            topNotes: "Basil, Lavender, Water Notes, Marigold, Geranium",
            heartNotes: "Tobacco, Hay, Moepel Accord, Bran, Clary Sage",
            baseNotes: "Sandalwood, Cypress, Musk, Amber",
        },
        volume: 125, // Common volume
        rating: 4.1,
        ratingSource: "Fragrantica (4.06/5)",
    },
    {
        id: "7",
        name: "Khamrah Qahwa",
        brand: "Lattafa",
        imageUrl: "/Khamrah-Qahwa.jpeg",
        description: "A warm, inviting, and addictive gourmand fragrance, Khamrah Qahwa is a rich blend of spices, candied fruits, and creamy coffee. It's a luxurious and comforting scent perfect for colder months and evening wear.",
        category: "unisex",
        featured: true,
        scentNotes: {
            topNotes: "Cinnamon, Cardamom, Ginger",
            heartNotes: "Praline, Candied Fruits, White Flowers",
            baseNotes: "Arabic Coffee, Vanilla, Tonka Bean, Musk",
        },
        volume: 100, // Common volume for Lattafa
        rating: 4.4,
        ratingSource: "Fragrantica (4.44/5)",
    },
    {
        id: "8",
        name: "Black Opium Over Red By YSL (2024)",
        brand: "Yves Saint Laurent",
        imageUrl: "/Black-Opium-Over-Red-By-YSL-2024.jpeg",
        description: "🌸 Floral • Fruity • Gourmand\n\n✨ *Top*: Cherry, Green Mandarin\n🌼 *Heart*: Jasmine, Orange Blossom, Black Tea\n☕ *Base*: Coffee, Patchouli, Vanilla\n\n💃 Bold, sweet & sensual\n❤️ Cherry spark meets creamy vanilla\n🌙 Perfect for all weather but best in nights & cooler days\n🔴 Sleek red bottle = instant statement",
        category: "women",
        featured: true,
        scentNotes: {
            topNotes: "Cherry Accord, Green Mandarin",
            heartNotes: "Jasmine Grandiflorum, Orange Blossom, Black Tea",
            baseNotes: "Coffee Accord, Patchouli, Vanilla",
        },
        volume: 90, // Common volume
        rating: 4.1,
        ratingSource: "Fragrantica (4.13/5)",
    },
    {
        id: "9",
        name: "Dolce&Gabbana Q (2023)",
        brand: "Dolce&Gabbana",
        imageUrl: "/DG-Q-2023.jpeg",
        description: "🌸✨ D&G Q (2023) – A scent that flirts with spring & summer 🍋🌿. Bursting with citrus, fruity & woody notes, it brings elegance, energy & adventure – perfect for daytime charm or a night to remember 💃🏽🔥",
        category: "women",
        featured: false,
        scentNotes: {
            topNotes: "Sicilian Lemon, Blood Orange, Jasmine",
            heartNotes: "Cherry, Heliotrope, Tuberose",
            baseNotes: "Cedarwood, Musk, Patchouli",
        },
        volume: 100, // Common volume
        rating: 3.9,
        ratingSource: "Fragrantica (3.92/5)", // Note: This is a placeholder as the rating is lower on Fragrantica than the previous 4.3 example.
    },
    {
        id: "10",
        name: "Estée Lauder Pleasures",
        brand: "Estée Lauder",
        imageUrl: "/Estée-Lauder-Pleasures.jpeg",
        description: "A fresh floral 🌸 scent that feels like spring rain 🌦️\nPerfect for garden tours 🌿 & summer gatherings ☀️\n\n🌸 Top: Pink pepper, red berries\n🌺 Heart: White peony, lily, lilac\n🌲 Base: Cedar, patchouli, sandalwood\n\n✨ Soft, sheer & elegant — your daily dose of beauty 🌼\n#Pleasures #FloralVibes #EverydayElegance",
        category: "women",
        featured: false,
        scentNotes: {
            topNotes: "White Lily, Violet Leaves, Green Accords",
            heartNotes: "Black Lilac, White Peony, Karan Karounde",
            baseNotes: "Sandalwood, Patchouli, Amber",
        },
        volume: 100, // Common volume
        rating: 4.3,
        ratingSource: "Macy's (4.4/5), Estée Lauder (4.2/5)",
    },
    {
        id: "11",
        name: "Oud Wood",
        brand: "Tom Ford",
        imageUrl: "/Oud-wood.jpeg",
        description: "A groundbreaking and luxurious woody fragrance. Oud Wood is an exotic and smoky blend of rare oud, sandalwood, and vetiver, creating a rich, opulent, and highly coveted scent that balances tradition with modern appeal.",
        category: "unisex",
        featured: false,
        scentNotes: {
            topNotes: "Rare Oud Wood, Brazilian Rosewood, Cardamom",
            heartNotes: "Sandalwood, Vetiver, Chinese Pepper",
            baseNotes: "Tonka Bean, Vanilla, Amber",
        },
        volume: 50, // Common volume for Tom Ford Private Blend
        rating: 4.2,
        ratingSource: "Sephora (4.5/5), Fragrantica (4.16/5)",
    },
    {
        id: "12",
        name: "Prada Luna Rossa Black (2018)",
        brand: "Prada",
        imageUrl: "/prada.jpg",
        description: "An urban and sophisticated amber woody fragrance for men, Luna Rossa Black evokes the excitement of exploring a city at night. It's warm, sensual, and powdery with notes of bergamot, patchouli, and amber.",
        category: "men",
        featured: false,
        scentNotes: {
            topNotes: "Bergamot, Angelica",
            heartNotes: "Patchouli, Amberwood",
            baseNotes: "Musk, Coumarin",
        },
        volume: 100, // Common volume
        rating: 4.3,
        ratingSource: "Fragrantica (4.32/5)",
    },
    {
        id: "13",
        name: "Bvlgari Man Wood Neroli (2018)",
        brand: "Bvlgari",
        imageUrl: "/Bvlgari-Man-Wood-Neroli-2018.jpeg",
        description: "A vibrant and woody floral fragrance inspired by nature's vital force. Man Wood Neroli blends the radiant freshness of neroli with deep woody accords, creating a powerful and invigorating scent for men.",
        category: "men",
        featured: false,
        scentNotes: {
            topNotes: "Neroli, Bergamot, Orange Blossom",
            heartNotes: "Cypress, Vetiver, Cedarwood",
            baseNotes: "Ambroxan, Ambergris, White Musk",
        },
        volume: 100, // Common volume
        rating: 4.0,
        ratingSource: "Fragrantica (4.04/5)",
    },
    {
        id: "14",
        name: "Bvlgari Man in Black",
        brand: "Bvlgari",
        imageUrl: "/Bvlgari-Man-in-Black.jpeg",
        description: "A bold and charismatic fragrance inspired by the myth of the birth of Vulcan, the Roman god of the earth. This powerful neo-oriental Eau de Parfum is an alluring and masculine blend of amber, leather, and spices.",
        category: "men",
        featured: false,
        scentNotes: {
            topNotes: "Spices, Amber Rum",
            heartNotes: "Leather Accord, Tuberose, Iris",
            baseNotes: "Benzoin, Tonka Bean, Guaiac Wood",
        },
        volume: 100, // Common volume
        rating: 4.4,
        ratingSource: "Fragrantica (4.4/5)",
    },
    {
        id: "15",
        name: "MontBlanc Explorer Ultra Blue",
        brand: "MontBlanc",
        imageUrl: "/MontBlanc-Explorer-Ultra-Blue.jpeg",
        description: "An adventurous and fresh citrus marine fragrance for men, inspired by the blue of the sky and the oceans. It offers a cool and invigorating escape with notes of Sicilian bergamot, marine accords, and patchouli.",
        category: "men",
        featured: false,
        scentNotes: {
            topNotes: "Sicilian Bergamot, Pink Peppercorn, Exotic Fruits",
            heartNotes: "Marine Accord, Ambergris",
            baseNotes: "Patchouli, Woody Notes, Leather",
        },
        volume: 100, // Common volume
        rating: 3.9,
        ratingSource: "Fragrantica (3.94/5)",
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
