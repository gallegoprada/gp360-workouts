/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "peleador": "url('/brazosenalto.jpg')",
        "punio": "url('/bg-our-class.jpg')",
        "ejercicio": "url('/bg-about-us.jpg')",
        "services":  "url('/bg_services.jpg')",
        "preparacion":  "url('/bg_2.jpg')",
        "gym-old":  "url('/fondo.jpg')",
      },
      colors: {
        'rojo': '#EB3642',
        'fondo': '#42423F',
        'gris-header': '#141414',
        'letras-header': '#828282',
        'gris-boton': '#555555',
        'violeta': '#9A526D',
        'beige': '#B89C70',
        'beige-oscuro': '#a58c64',
        'gris-beige': '#42423F',
        'beige-boton': '#E0CEB3',

      },
      fontFamily: {
        montserrat: ['Montserrat'],
        titulo: ['Advent Pro'],
        roboto: ['Roboto'],
      }
    },
  },
  plugins: [],
};
