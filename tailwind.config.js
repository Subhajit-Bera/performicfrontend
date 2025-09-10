/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0D1B2A',
        primary: '#1B263B',
        secondary: '#415A77',
        accent: '#00A896',
        'accent-hover': '#02C39A',
        text: '#E0E1DD',
        'text-secondary': '#778DA9',
      },
    },
  },
  plugins: [],
};



// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         background: '#F4F4F2', /* Soft off-white */
//         primary: '#495464', /* Deep slate blue */
//         secondary: '#BBBFCA', /* Muted blue-gray */
//         accent: '#BBBFCA', /* Muted blue-gray for consistency */
//         'accent-hover': '#C8CCD8', /* Lighter muted blue-gray for hover */
//         text: '#495464', /* Deep slate blue */
//         'text-secondary': '#7A8296', /* Slightly darker blue-gray for secondary text */
//       },
//     },
//   },
//   plugins: [],
// };