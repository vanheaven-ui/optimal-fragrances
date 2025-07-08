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
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        pulseFade: {
          "0%, 100%": {
            opacity: "0.6",
            transform: "scaleX(0.8)",
          },
          "50%": {
            opacity: "1",
            transform: "scaleX(1)",
          },
        },
        moveBike: {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(-10px)" },
        },
        "mist-diffusion": {
          "0%": { transform: "translateY(0) scale(0.5)", opacity: "0.7" },
          "100%": { transform: "translateY(-50px) scale(1.2)", opacity: "0" },
        },
        "particle-float": {
          "0%, 100%": { transform: "translateY(0) translateX(0) scale(1)" },
          "25%": { transform: "translateY(-10px) translateX(5px) scale(1.05)" },
          "50%": { transform: "translateY(-20px) translateX(-5px) scale(1.1)" },
          "75%": { transform: "translateY(-15px) translateX(8px) scale(1.02)" },
        },
        "pulse-light": {
          "0%, 100%": { opacity: "0.1" },
          "50%": { opacity: "0.3" },
        },
      },
      animation: {
        moveBike: "moveBike 6s ease-in-out infinite",
        "mist-diffusion": "mist-diffusion 3s ease-out infinite forwards",
        "particle-1": "particle-float 4s ease-in-out infinite",
        "particle-2": "particle-float 3.5s ease-in-out infinite",
        "particle-3": "particle-float 4.2s ease-in-out infinite",
        "particle-4": "particle-float 3.8s ease-in-out infinite",
        "pulse-light": "pulse-light 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in-down": "fadeInDown 1s ease-out forwards",
        "fade-in-up": "fadeInUp 1s ease-out forwards 0.2s",
        "pulse-fade": "pulseFade 3s infinite ease-in-out", // For the animated heading underlines
        "fade-in": "fadeIn 1s ease-out forwards", // For general fade-in
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
