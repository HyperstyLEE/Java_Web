/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'amc-red': '#E31837',
        'amc-dark': '#1A1A1A',
      },
    },
  },
  plugins: [],
} 