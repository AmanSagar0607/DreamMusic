/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg1: "#0e0e0e", // Dark background color
        bg2: "#3c0202", // Gradient top color
        bg3: "#250505", // Gradient bottom color
        bg4: "#210909", // Gradient bottom color
        bg5: "#6b0000", // Gradient bottom color
        accent: "#ff5656", // Accent color for 'Dream' text or icons
        primary: "#ff5656", // Primary color, same as accent for consistency
        textLight: "#f5f5f5", // Light text for dark backgrounds
        textDark: "#333333", // Dark text for lighter backgrounds
        bgFocus: "#520000", // Focus color (e.g., for input fields)
      },
      backgroundImage: {
        "custom-gradient": "linear-gradient(to bottom, #480504, #150909)",
      },
    },
  },
  plugins: [],
};
