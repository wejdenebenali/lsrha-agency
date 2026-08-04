/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#B80D12",
          redDeep: "#940A0E",
          gold: "#D9B65A",
          goldLight: "#F0D57C",
          ink: "#181818",
          muted: "#666666",
          bgLight: "#F8F5F1",
          dark: "#140a08",
        },
      },
      fontFamily: {
        heading: ["'Bebas Neue'", "sans-serif"],
        body: ["'Space Grotesk'", "sans-serif"],
        display: ["'Poppins'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
