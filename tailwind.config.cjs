/* @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      xxsm: "0.6rem",
      xsm: "0.7rem",
      sm: "1.25rem",
      base: "1.60rem",
      md: "2rem",
      xl: "2.5rem",
      xxl: "3rem",
    },
    extend: {
      boxShadow: {
        sm: "0 3px currentcolor",
        md: "0 4px rgba(7, 29, 12, 0.8)",
      },
    },
  },
  plugins: [],
};
