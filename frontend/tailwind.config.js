/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1079px',  // Customize the lg breakpoint to 1024px
      'xl': '1280px',
    },
    extend: {},
  },
  plugins: [],
};
