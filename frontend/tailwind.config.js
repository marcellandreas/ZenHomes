/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#edf1c9",
        secondary: "#8ac243",
        tertiary: "#222",
        secondaryRed: "#f42c37",
        secondaryYellow: "#fdc62c",
        secondaryGreen: "#2dcc6f",
        secondaryBlue: "#1376f4",
        secondaryWhite: "#eee",
        gray: {
          10: "#eee",
          20: "#a2a2a2",
          30: "7b7b7b",
          40: "585858",
          90: "#141414",
        },
      },
      screens: {
        xs: "400px",
        "3xl": "1680px",
        "4xl": "2200px",
      },
      backgroundImage: {
        hero: "url(/src/assets/bg.png)",
      },
    },
  },
  plugins: [],
};
