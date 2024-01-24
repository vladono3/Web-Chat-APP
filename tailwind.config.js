/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
    },
    colors :{
      'custom-color' : '#092635',
      //'custom-color' : '#FFFFFF',
      'navbar-color' : '#66FCF1',
      'avatar-color' : '#757575',
      'discussions-color' : '#FFFFFF',
      'discussions-text-color' : '#000000',
      'white' : '#ffffff'
    }
  },
  plugins: [],
}
