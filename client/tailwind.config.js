/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      nadpis: ["Lalezar", "sans-serif"],
      odstavec: ['"Open Sans"', "sans-serif"]
    },
    screens: {
      '2xl': { 'max': '1535px' },
      // => @media (max-width: 1535px) { ... }

      'xl': { 'max': '1279px' },
      // => @media (max-width: 1279px) { ... }

      'lg': { 'max': '1023px' },
      // => @media (max-width: 1023px) { ... }

      'md': { 'max': '767px' },
      // => @media (max-width: 767px) { ... }

      'sm': { 'max': '639px' },
      // => @media (max-width: 639px) { ... }
    },
    extend: {
      colors: {
        transparent: {50: 'transparent'},
        current:{50: 'currentColor'},
        sunglow:{50: '#FECB2E'},
        jet:{50: '#333333'},
        sky:{50: '#74C7D3'},
        prussian:{50: '#00384D'},
        white:{50: '#FFFFFF'},
      },
    },
  },
  plugins: [],
}
