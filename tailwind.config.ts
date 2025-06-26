import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        moveBike: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-10px)' },
        },
      },
      animation: {
        moveBike: 'moveBike 6s ease-in-out infinite',
      },
      colors: {
        // Our custom color palette
        "ug-purple-primary": "#6B46C1", // Primary purple
        "ug-purple-accent": "#805AD5", // Lighter purple for accents
        "ug-neutral-bg": "#F7FAFC", // Off-white for backgrounds
        "ug-neutral-light": "#CBD5E0", // Light grey for borders/dividers
        "ug-text-dark": "#4A5568", // Dark grey for body text
        "ug-text-heading": "#2D3748", // Even darker grey for headings
        "ug-success": "#38A169", // Green for success messages
        "ug-error": "#E53E3E", // Red for error messages
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
