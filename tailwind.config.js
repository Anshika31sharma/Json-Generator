/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode:"class",
  theme: {
    extend: {},
    extend: {
      colors:{
        night:{
          DEFAULT: "#0D1120",
          50 : "#171E2C",
          500 : "#0D1120"
        }
      }
    },
  },
  plugins: [],
}