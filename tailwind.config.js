
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
 theme: {
  extend: {
  fontFamily: {
  sans: ['Poppins', 'ui-sans-serif', 'system-ui'],
  oleo: ['Oleo Script', 'cursive'],
}
  }
},
  plugins: []
}

