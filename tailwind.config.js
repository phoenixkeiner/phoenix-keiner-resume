/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue:   '#2660a4',
          mint:   '#edf7f6',
          orange: '#f19953',
          rust:   '#c47335',
          dark:   '#1f1f1f',
        },
      },
    },
  },
  plugins: [],
};
