/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      sunglow: '#FECB2E',
      jet: '#333333',
      sky: '#74C7D3',
      prussian: '#00384D',
      white: '#FFFFFF'
    },
    fontFamily: {
      nadpis: ["Lalezar", "sans-serif"],
      odstavec: ['"Open Sans"', "sans-serif"]
    },
    extend: {},
  },
  plugins: [],
}
