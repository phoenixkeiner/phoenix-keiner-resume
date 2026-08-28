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
          navy:   '#163a5f',
          mint:   '#edf7f6',
          orange: '#f19953',
          gold:   '#d9a441',
          rust:   '#c47335',
          dark:   '#1f1f1f',
        },
      },
      fontFamily: {
        sans: ['"Geist"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};
