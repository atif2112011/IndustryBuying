// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // include your Vite source files
  ],
  theme: {
    extend: {
      colors: {
        brand: "#0F172A", // custom dark navy
        highlight: "#FBBF24", // amber
      }
    }
  },
  plugins: [],
}
