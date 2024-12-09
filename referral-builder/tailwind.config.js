import { info } from "autoprefixer";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "rgb(0 0 0)",
        dark2: "rgb(26 42 58)",
        base: "rgb(245 245 245)",
        primary: "rgb(170 170 170)",
        secondary: "rgb(201 201 201)",
        muted: "rgb(234 234 234)",
        accent: "rgb(26 115 232)",
        success: "rgb(102 220 125)",
        warning: "rgb(255 152 0)",
        danger: "rgb(244 67 54)",
      },
    },
  },
  plugins: [],
};
