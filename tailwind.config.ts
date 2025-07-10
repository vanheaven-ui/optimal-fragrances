// tailwind.config.js
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",

  theme: {
    extend: {
      keyframes: {
        // ... (your existing keyframes)
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
        // ... (your existing animations)
        moveBike: "moveBike 6s ease-in-out infinite",
        "mist-diffusion": "mist-diffusion 3s ease-out infinite forwards",
        "particle-1": "particle-float 4s ease-in-out infinite",
        "particle-2": "particle-float 3.5s ease-in-out infinite",
        "particle-3": "particle-float 4.2s ease-in-out infinite",
        "particle-4": "particle-float 3.8s ease-in-out infinite",
        "pulse-light": "pulse-light 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in-down": "fadeInDown 1s ease-out forwards",
        "fade-in-up": "fadeInUp 1s ease-out forwards 0.2s",
        "pulse-fade": "pulseFade 3s infinite ease-in-out",
        "fade-in": "fadeIn 1s ease-out forwards",
      },
      colors: {
        // Define your colors using CSS variables (e.g., 'var(--color-primary)')
        // These keys will be used in your Tailwind classes (e.g., `bg-primary`)
        "ug-purple-primary": "var(--color-ug-purple-primary)",
        "ug-purple-accent": "var(--color-ug-purple-accent)",
        "ug-neutral-bg": "var(--color-ug-neutral-bg)",
        "ug-neutral-light": "var(--color-ug-neutral-light)",
        "ug-text-dark": "var(--color-ug-text-dark)",
        "ug-text-heading": "var(--color-ug-text-heading)",
        "ug-success": "var(--color-ug-success)",
        "ug-error": "var(--color-ug-error)",
        // Keep standard Tailwind colors like 'white', 'gray-300', 'yellow-400', 'green-600', 'red-600' etc. if you use them directly.
        // For example, if you use 'white' for text on buttons:
        white: "var(--color-white)", // Add a variable for white too for consistency
        black: "var(--color-black)", // Add a variable for black
        // If you still want to use non-variable colors like 'gray-300', you can leave them as is
        // Or define them as variables for complete control.
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
