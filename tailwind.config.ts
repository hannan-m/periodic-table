import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      gridTemplateColumns: {
        '18': 'repeat(18, minmax(0, 1fr))',
        '15': 'repeat(15, minmax(0, 1fr))',
      },
      colors: {
        element: {
          alkali: {
            light: '#f87171', // red-400
            dark: '#991b1b', // red-800
          },
          alkaline: {
            light: '#fdba74', // orange-300
            dark: '#9a3412', // orange-800
          },
          transition: {
            light: '#fef08a', // yellow-200
            dark: '#854d0e', // yellow-800
          },
          postTransition: {
            light: '#99f6e4', // teal-200
            dark: '#115e59', // teal-800
          },
          metalloid: {
            light: '#86efac', // green-300
            dark: '#166534', // green-800
          },
          nonmetal: {
            light: '#bfdbfe', // blue-200
            dark: '#1e40af', // blue-800
          },
          halogen: {
            light: '#93c5fd', // blue-300
            dark: '#1e3a8a', // blue-900
          },
          noble: {
            light: '#e9d5ff', // purple-200
            dark: '#581c87', // purple-900
          },
          lanthanide: {
            light: '#fbcfe8', // pink-200
            dark: '#831843', // pink-800
          },
          actinide: {
            light: '#f9a8d4', // pink-300
            dark: '#9d174d', // pink-900
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
