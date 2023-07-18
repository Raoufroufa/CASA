/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#30A2FF",
        primaryH: "#077bdb",
        primaryR: "#81c5fc",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};

