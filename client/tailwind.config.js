/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pinky: "#ff4c76",
        purpy: "#9B60AF",
        darkPruple: "#690e88",
      },
    },
  },
  plugins: [],
};
