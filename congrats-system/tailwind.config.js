/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FFF9F2",
        ink: "#2D2523",
        gold: "#D4A84F",
        rose: "#C9828C",
        burgundy: "#7B3545",
        card: "#FFFFFF",
        muted: "#766C68",
        highlight: "#F4E3B2",
      },
      fontFamily: {
        serif: ["'Fraunces'", "serif"],
        sans: ["'Inter'", "sans-serif"],
      },
      keyframes: {
        "confetti-fall": {
          "0%": { transform: "translateY(-10%) translateX(0) rotate(0deg)", opacity: 0 },
          "10%": { opacity: 1 },
          "100%": { transform: "translateY(520px) translateX(var(--drift)) rotate(200deg)", opacity: 0 },
        },
        "card-in": {
          "0%": { opacity: 0, transform: "translateY(10px) scale(0.98)" },
          "100%": { opacity: 1, transform: "translateY(0) scale(1)" },
        },
      },
      animation: {
        "confetti-fall": "confetti-fall ease-in forwards",
        "card-in": "card-in 0.5s ease-out",
      },
    },
  },
  plugins: [],
};