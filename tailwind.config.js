/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors: {
         mainBgclr: '#1b1a17',
         lightBgclr: '#1f1e1b',
         markHoverclr:'#A3570',
         markclr:'#FF8303',
         mainTextclr:'#F0E3CA',
         sidebarClr:'#37342B'
      },
    },
  },
  plugins: [],
}

