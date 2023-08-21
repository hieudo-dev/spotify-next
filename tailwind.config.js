/** @type {import('tailwindcss').Config} */

const headerBgSafeList = [...[...Array(101).keys()].map(i => `bg-gray-700/[${i === 100 ? "1" : `.${i}`}]`)]
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    ...headerBgSafeList,
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
