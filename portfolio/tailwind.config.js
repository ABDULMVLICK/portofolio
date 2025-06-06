/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'lavender': '#B288C0',
        'custom-green': '#7BC950',
        'dark-bg': 'oklch(0.2 0.02 280)',
        'dark-surface': 'oklch(0.25 0.02 280)',
        'dark-text': 'oklch(0.95 0.02 280)',
      },
    },
  },
  plugins: [],
} 