// src/data/blogPosts.ts

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  author: string;
  date: string; // Format: YYYY-MM-DD
  image: string; // URL to the blog post's main image
  excerpt: string; // A short summary of the post
  content: string; // The full content of the blog post (Markdown or HTML string)
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "the-art-of-perfume-layering",
    title: "The Art of Perfume Layering: Create Your Signature Scent",
    author: "Sophia Scent",
    date: "2023-10-26",
    // Changed to .png format for compatibility
    image:
      "https://placehold.co/600x400/9333ea/ffffff.png?text=Perfume+Layering",
    excerpt:
      "Discover the secret to crafting a truly unique fragrance by mastering the art of perfume layering. Learn how to combine different scents to create a personalized aroma that reflects your style.",
    content: `
      ## Unlocking Your Unique Scent Profile
      Perfume layering is more than just combining two fragrances; it's an artistic expression that allows you to create a scent entirely your own. The goal is to blend complementary notes to enhance, deepen, or subtly shift an existing aroma, resulting in a complex and captivating signature scent.

      ### Why Layer Perfumes?
      1.  **Individuality:** Stand out from the crowd with a scent no one else has.
      2.  **Versatility:** Adapt your favorite fragrances for different occasions or seasons.
      3.  **Longevity:** Layering can sometimes help scents last longer on your skin.
      4.  **Creativity:** Experiment with different combinations and discover new favorites.

      ### The Basics of Layering
      * **Start with a Clean Slate:** Apply fragrances to clean, moisturized skin. Hydrated skin holds scent better.
      * **Light to Heavy:** Begin with lighter, more volatile scents (e.g., citrus, fresh notes) and then apply heavier, more intense ones (e.g., woody, oriental).
      * **Complementary Notes:** Look for common notes or families. For example, a floral perfume might pair well with a woody base or a musk.
      * **Don't Overdo It:** A little goes a long way. Start with one spray of each and adjust.

      ### Popular Layering Combinations:
      * **Fresh Citrus + Woody Vetiver:** A bright, uplifting start with an earthy, grounding finish.
      * **Soft Floral + Warm Vanilla/Amber:** Adds depth and warmth to a delicate floral.
      * **Spicy Oriental + Clean Musk:** Balances the intensity of spices with a smooth, comforting base.

      Experiment and have fun with it! Your perfect signature scent is just a few sprays away.
    `,
    seoTitle:
      "Perfume Layering Guide: Create Unique Fragrances | Optimal Fragrance Blog",
    seoDescription:
      "Learn the art of perfume layering to craft your unique signature scent. Explore tips for combining fragrances for individuality and longevity.",
    keywords: [
      "perfume layering",
      "signature scent",
      "fragrance tips",
      "how to layer perfume",
      "unique perfume",
      "scent combining",
    ],
  },
  {
    id: "2",
    slug: "top-fragrance-trends-2024",
    title: "Top Fragrance Trends for 2024: What's Hot in the World of Scent?",
    author: "Aroma Expert",
    date: "2024-01-15",
    // Changed to .png format for compatibility
    image:
      "https://placehold.co/600x400/805AD5/ffffff.png?text=Fragrance+Trends",
    excerpt:
      "Stay ahead of the curve with our comprehensive guide to the top fragrance trends expected to dominate 2024. From gourmand delights to sustainable notes, find your next favorite. ",
    content: `
      ## The Future of Fragrance: Bold, Sustainable, and Personal
      2024 is set to be a transformative year in the world of perfumery, with a strong emphasis on innovation, sustainability, and deeply personal olfactory experiences. Here’s what’s predicted to be trending:

      ### 1. Eco-Conscious & Sustainable Scents
      Consumers are increasingly demanding transparency and sustainability. Expect to see more fragrances featuring ethically sourced ingredients, refillable bottles, and eco-friendly packaging. Brands are focusing on reducing their environmental footprint, from seed to spray.

      ### 2. Mood-Boosting Aromas (Aromachology)
      The pandemic accelerated interest in wellness, and this extends to fragrance. Scents designed to uplift, calm, or energize are gaining traction. Ingredients known for their aromatherapeutic properties, like lavender, chamomile, and citrus, will be prominent.

      ### 3. Hyper-Realistic Nature Notes
      Forget abstract interpretations; 2024 will celebrate raw, authentic natural scents. Think "rain-soaked earth," "wet forest," "sun-warmed concrete," and even "salt air" captured with stunning realism. This trend aims to reconnect wearers with nature.

      ### 4. Elevated Gourmands
      Gourmand fragrances are evolving beyond simple sweetness. Expect more sophisticated and nuanced interpretations, incorporating savory notes, spices, dark chocolate, and even smoky undertones, making them less saccharine and more complex.

      ### 5. Genderless & Fluid Fragrances
      The traditional boundaries between "masculine" and "feminine" scents continue to blur. Perfumers are creating more ambiguous, universal fragrances that appeal to a broader audience, focusing on notes rather than gender classifications.

      ### 6. Artificially Intelligent Scents
      AI is entering perfumery, assisting perfumers in identifying novel combinations and optimizing formulas. While human artistry remains key, AI tools are helping to push creative boundaries and discover unique olfactory profiles.

      Stay tuned as these exciting trends unfold throughout the year!
    `,
    seoTitle:
      "2024 Fragrance Trends: Eco-Scents, Gourmands & More | Optimal Fragrance Blog",
    seoDescription:
      "Explore the top perfume trends for 2024, including sustainable fragrances, mood-boosting aromas, realistic nature notes, and genderless scents.",
    keywords: [
      "fragrance trends 2024",
      "perfume trends",
      "sustainable fragrance",
      "gourmand perfumes",
      "genderless scents",
      "aromatherapy fragrance",
      "future of perfume",
    ],
  },
  {
    id: "3",
    slug: "how-to-choose-your-perfect-perfume",
    title: "How to Choose Your Perfect Perfume: A Step-by-Step Guide",
    author: "Scent Seeker",
    date: "2023-11-05",
    // Changed to .png format for compatibility
    image: "https://placehold.co/600x400/9333ea/ffffff.png?text=Choose+Perfume",
    excerpt:
      "Finding your signature scent can be a delightful journey. Our guide helps you navigate fragrance families, understand notes, and test perfumes like a pro.",
    content: `
      ## Your Guide to Finding "The One"
      Choosing a perfume is a deeply personal experience, and with countless options available, it can feel overwhelming. This guide will help you narrow down your choices and find a fragrance that truly resonates with you.

      ### Step 1: Understand Fragrance Families
      Perfumes are generally categorized into families based on their dominant notes. Knowing these can help you identify what you typically enjoy:
      * **Floral:** Sweet and flowery, often with notes like rose, jasmine, lily.
      * **Oriental:** Warm, spicy, and exotic, with notes like vanilla, amber, musk, spices.
      * **Woody:** Earthy and warm, with notes like sandalwood, cedarwood, vetiver.
      * **Fresh:** Citrusy, green, or aquatic, with notes like lemon, bergamot, cut grass, sea spray.
      * **Gourmand:** Sweet, food-inspired scents like vanilla, caramel, chocolate.

      ### Step 2: Learn About Scent Notes
      Fragrances evolve over time on your skin, revealing different "notes":
      * **Top Notes:** The initial impression, light and fleeting (e.g., citrus, light florals).
      * **Middle Notes (Heart Notes):** Emerge after top notes fade, forming the "heart" of the perfume (e.g., heavier florals, spices).
      * **Base Notes:** The longest-lasting and deepest notes, forming the foundation (e.g., woods, musks, resins, vanilla).

      ### Step 3: Test Perfumes Properly
      * **Start with a Clean Slate:** Apply fragrances to clean, moisturized skin. Hydrated skin holds scent better.
      * **Apply to Skin:** If you like it on the strip, spray a small amount on your pulse points (wrist, inner elbow).
      * **Wear It:** Give the perfume time to develop (at least 30 minutes, ideally a few hours) to experience all the notes and how it interacts with your body chemistry.
      * **Don't Test Too Many at Once:** Limit yourself to 2-3 perfumes at a time to avoid "nose fatigue."
      * **Take Samples Home:** If possible, get samples to try in different environments and over a full day.

      ### Step 4: Consider the Occasion & Season
      * **Day vs. Night:** Lighter scents for day, richer for evening.
      * **Season:** Fresh/citrus for summer, warm/spicy for winter.
      * **Your Lifestyle:** Consider your daily activities and how the scent fits.

      By following these steps, you'll be well on your way to discovering your perfect perfume!
    `,
    seoTitle: "How to Choose Your Perfect Perfume: A Comprehensive Guide",
    seoDescription:
      "Step-by-step guide to choosing your ideal perfume. Learn about fragrance families, scent notes, and proper testing techniques.",
    keywords: [
      "choose perfume",
      "fragrance guide",
      "perfume notes",
      "fragrance families",
      "signature scent",
      "perfume tips",
    ],
  },
  {
    id: "4",
    slug: "the-history-of-perfume",
    title:
      "From Ancient Rituals to Modern Luxury: A Journey Through Perfume History",
    author: "History Buff",
    date: "2023-09-20",
    // Changed to .png format for compatibility
    image:
      "https://placehold.co/600x400/805AD5/ffffff.png?text=Perfume+History",
    excerpt:
      "Embark on a captivating journey through time to explore the rich and aromatic history of perfume, from its ancient origins to its status as a luxury staple today.",
    content: `
      ## A Whiff Through Time: The Fascinating History of Perfume
      The history of perfume is as rich and complex as its most exquisite blends. For millennia, scents have been intertwined with human culture, serving purposes from spiritual rituals to expressions of wealth and personal allure.

      ### Ancient Origins: Mesopotamia and Egypt
      The earliest evidence of perfume dates back over 4,000 years to **Mesopotamia**, where the first chemist, Tapputi, created aromatic substances. However, it was **Ancient Egypt** where perfume truly flourished. Used in religious ceremonies, mummification, and daily life, Egyptian perfumes were primarily resin-based concoctions, often burned as incense. Cleopatra famously used scents to captivate Mark Antony.

      ### The Rise in Rome and Greece
      The **Greeks** embraced perfumes for personal hygiene and medicinal purposes, believing scents had healing powers. The **Romans** took it further, integrating perfume into every aspect of their lavish lives, from public baths to scenting their homes and even pets.

      ### The Islamic Golden Age
      The **Islamic world** played a pivotal role in the development of perfumery during the Middle Ages. Arab chemists, notably **Al-Kindi** and **Ibn Sina**, perfected the distillation process, making it possible to extract essential oils from flowers, leading to the creation of alcohol-based perfumes. This innovation was crucial for modern perfumery.

      ### Renaissance Europe: Perfume and Privilege
      Perfume arrived in **Europe** largely through crusaders and trade routes. During the Renaissance, especially in Italy and France, it became a symbol of status and wealth. **Catherine de' Medici** is credited with bringing perfumery expertise from Italy to France in the 16th century, establishing Grasse as the world's perfume capital. Initially, perfumes were also used to mask unpleasant body odors due to infrequent bathing.

      ### The Modern Era: From Artisan to Industry
      The 19th century brought synthetic ingredients, revolutionizing the industry and making perfumes more accessible. Companies like Guerlain, Chanel, and Dior emerged in the 20th century, cementing perfume's status as an art form and a global luxury industry.

      Today, perfume continues to evolve, blending ancient traditions with cutting-edge science to create an endless symphony of scents.
    `,
    seoTitle:
      "History of Perfume: Ancient Egypt to Modern Luxury | Optimal Fragrance",
    seoDescription:
      "Explore the fascinating history of perfume, from ancient Mesopotamian rituals and Egyptian use to its evolution into a modern luxury industry.",
    keywords: [
      "history of perfume",
      "ancient perfume",
      "perfume origins",
      "fragrance history",
      "Grasse perfume",
      "perfumery evolution",
    ],
  },
];
