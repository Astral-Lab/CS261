/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "fira-code": ["Fira Code", "serif"],
        "poetsen-one": ["Poetsen One", "serif"]
      }
    },
  },
  plugins: [],
}

