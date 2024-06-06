/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js,ts}"],
  theme: {
    extend: {
      keyframes: {
        opacityUp: {
          "0%": { opacity: 0, transform: "translateY(20px)"},
          "100%": { opacity: 1, transform: "translateY(0)"},
        },
      },
      animation: {
        appear: 'opacityUp 1s ease-in-out',
      },
    },
  },
  plugins: [],
};
