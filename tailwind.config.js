const flowbite = require('flowbite-react/tailwind');

/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', flowbite.content()],
  theme: {
    extend: {
      colors: {
        primaryGreen: '#638578',
        secondaryGreen: '#d5f7e7',
        letras: '#8b9f94',
        fondoCat: '#d9d9d9',
      },
      fontWeight: {
        600: 600,
        400: 400,
        800: 800,
        500: 500,
        700: 700,
      },
      fontFamily: {
        poppins: "'Poppins', sans-serif",
        inter: "'Inter', sans-serif",
      },
      borderRadius: {
        22: '22px',
        44: '44px',
        8: '8px',
        4: '4px',
      },
    },
    plugins: [flowbite.plugin()],
  },
};
