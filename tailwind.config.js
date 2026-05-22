/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
    },
    extend: {
      fontFamily: {
        cinzel: ["Cinzel", "serif"],
        cormorant: ["Cormorant Garamond", "serif"],
      },
      colors: {
        mystic: {
          50: "#e8e0f0",
          100: "#d1c0e0",
          200: "#b3a0d0",
          300: "#8b5cf6",
          400: "#7c3aed",
          500: "#6d28d9",
          600: "#5b21b6",
          700: "#4c1d95",
          800: "#2e1065",
          900: "#1a1040",
          950: "#0a0e1a",
        },
        gold: {
          50: "#fdf8e8",
          100: "#f9edc5",
          200: "#f3da8e",
          300: "#ecc455",
          400: "#d4a853",
          500: "#c4943a",
          600: "#a67a2e",
          700: "#7a5a22",
          800: "#523d17",
          900: "#2a1f0c",
        },
      },
      animation: {
        "twinkle": "twinkle 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "card-flip": "cardFlip 0.8s ease-in-out",
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
        "typewriter": "typewriter 0.05s steps(1) forwards",
      },
      keyframes: {
        twinkle: {
          "0%, 100%": { opacity: "0.3", transform: "scale(0.8)" },
          "50%": { opacity: "1", transform: "scale(1.2)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(212, 168, 83, 0.3)" },
          "100%": { boxShadow: "0 0 20px rgba(212, 168, 83, 0.6), 0 0 40px rgba(212, 168, 83, 0.3)" },
        },
        cardFlip: {
          "0%": { transform: "rotateY(0deg)" },
          "50%": { transform: "rotateY(90deg)" },
          "100%": { transform: "rotateY(0deg)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};