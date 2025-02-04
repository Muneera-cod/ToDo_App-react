/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '300px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors: {
        lightModelightBg: '#e7e0da',
        lightModeMainBg:'white',
         mainBgclr: '#1b1a17',
         lightBgclr: '#1f1e1b',
         markHoverclr:'#A3570',
         markclr:'#FF8303',
         darkmainTextclr:'#F0E3CA',
         lightmodemainTextclr:'#543012',
         darksidebarClr:'#37342B',
         sidebarClr:'rgb(164, 139, 125)',
         darkTextClr:'',
         textClr:'#b2998a'
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}

