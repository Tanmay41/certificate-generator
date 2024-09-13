/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        'clash-display': ['Clash Display', 'sans-serif'],
        'style-script': ['Style Script', 'cursive'],
      },
    },
  },
  plugins: [],
}

