/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      whitespace: {
        "pre-wrap": "pre-wrap",
      },
    },
    colors: {
      "blue-100": "#E7EEFF",
      "blue-200": "#D2DFFC",
      "blue-300": "#A6BFFA",
      "blue-400": "#799FF7",
      "blue-500": "#4C7FF4",
      "blue-600": "#336DF2",
      "blue-700": "#1852D6",
      "blue-800": "#0E3FB0",
      "blue-900": "#022B87",
      "blue-950": "#001C59",
      "gray-50": "#E5E5E5",
      "gray-100": "#EFEFF2",
      "gray-200": "#E6E7EB",
      "gray-300": "#CCD0D7",
      "gray-400": "#B3B8C4",
      "gray-500": "#9AA1B0",
      "gray-600": "#80899C",
      "gray-700": "#646C80",
      "gray-800": "#4B5160",
      "gray-900": "#323640",
      "gray-950": "#232630",
      "purple-100": "#ECE6FF",
      "purple-900": "#4512B4",
      "yellow-100": "#FFF3D4",
      "yellow-900": "#6E5000",
      "green-100": "#DFF9F6",
      "green-900": "#00596C",
      black: "#000000",
      white: "#FFFFFF",
      red: "#C82438",
      BG: "#F3F4F6",
    },
    fontFamily: {
      sans: ["Prompt", "sans-serif"],
      serif: ["Prompt", "serif"],
      mono: ["Prompt", "monospace"],
    },
  },
  plugins: [],
};
