/** @type {import('tailwindcss').Config} */

const ROTATE_360 = { ...Array.from({ length: 361 }, (_, i) => `${i}deg`) };

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/utils/size.ts',
  ],
  theme: {
    extend: {
      fontFamily: {
        sincer: ['var(--font-sincVariable'],
      },
      colors: {
        accent: 'rgb(252 165 165)',
        main: 'rgb(252 165 165)',
        h_black: 'rgb(10, 10, 10)',
        h_gray: 'rgb(161, 161, 161)',
      },
      rotate: ROTATE_360,
    },
  },
  plugins: [],
};
