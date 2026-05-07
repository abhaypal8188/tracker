/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 0 1px rgba(255,255,255,0.08), 0 12px 40px rgba(0,0,0,0.45)',
      },
      backdropBlur: {
        12: '12px',
      },
    },
  },
  plugins: [],
};

