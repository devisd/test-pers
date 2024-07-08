const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  important: true,
  theme: {
    screens: {
      'max-lg': { max: '1023px' },
      'max-xl': { max: '1279px' },
      'max-2xl': { max: '1599px' },
      ...defaultTheme.screens,
    },
    fontSize: {
      s: '12px',
      m: '16px',
      l: '20px',
      xl: '40px',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        violet: 'rgba(255, 255, 255, 0.05)',
        'violet-01': 'rgba(255, 255, 255, 0.1)',
        'violet-02': 'rgba(255, 255, 255, 0.2)',
        'violet-08': 'rgba(255, 255, 255, 0.8)',
        'dark-04': 'rgba(0, 0, 0, 0.4)',
        black: '#000000',
        'black-60': 'rgba(0, 0, 0, 0.6)',
        'gray-10': 'rgba(255, 255, 255, 0.1)',
      },
      boxShadow: {
        '0.4xl': '4px 0px 16px 0px rgba(0, 0, 0, 0.04)',
        '2.4xl': '0px 8px 16px 0px rgba(0, 0, 0, 0.24)',
      },
    },
  },
  plugins: [],
}
