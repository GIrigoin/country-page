/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "main-text": "#D2D5DA",
      "secondary-text": "#6C727F",
      "checked-item": "#4E80EE",
      "input-bg": "#282B30",
      background: "#1B1D1F",
    },
    fontFamily: {
      sans: ["Be Vietnam Pro", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        "app-bg": "url('./assets/hero-image-wr.jpg')",
      },
      fontSize: {
        large: "2rem",
        title: "1rem",
        body: "0.875rem",
        small: "0.75rem",
      },
    },
  },
  plugins: [],
};
