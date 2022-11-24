/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        tvShopTheme: {
          primary: '#6D08A0',
          secondary: "#E228E2",
          accent: "#ffffff",
          neutral: "#3A4256",
          "base-100": "#ffffff",
        },
      },
    ],
  },
  theme: {
    extend: {},
  },
   plugins: [require("daisyui")],
}