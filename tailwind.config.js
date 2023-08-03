/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sincer: ['var(--font-sincVariable'],
      },
      colors: {
        accent: 'rgb(252 165 165)',
        main: 'rgb(252 165 165)',
      },
    },
  },
  plugins: [],
};
