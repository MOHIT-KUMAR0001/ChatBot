/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        "mycalc": "calc(100% - 2.5rem)",
        "eg": "80%",
        "bar":"20%",
        "med":"40%",
        "lrg":"30%"
      },
      fontFamily: {
        "pop": ["Roboto Condensed", "serif"],
        "uniq":["Poppins", "serif"],
      }
    },
    colors: {
      "secondary": "#181A1F",
      "primary": "#25262C",
      "white": "white",
      "sea": "#01A19A",
      "trans":"#FFFFFF1A",
    }

  },
  plugins: [],
}