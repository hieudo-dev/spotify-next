/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: "CircularSP",
    },
    extend: {
      boxShadow: {
        "3xl": "0 4px 60px rgba(0,0,0,.5)",
      },
    },
  },
  plugins: [],
};
