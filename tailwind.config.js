/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        blue: {
          1: 'var(--blue-1)',
          2: 'var(--blue-2)',
          3: 'var(--blue-3)',
          4: 'var(--blue-4)',
          5: 'var(--blue-5)',
          6: 'var(--blue-6)',
          7: 'var(--blue-7)',
          8: 'var(--blue-8)',
        },
        abyss: 'var(--abyss)',
        ember: 'var(--ember)',
        light: 'var(--light)',
        ink: 'var(--ink-on-light)',
        accent: 'var(--accent)',
      },
      fontFamily: {
        display: ['Jost', 'sans-serif'],
        script: ['"Great Vibes"', 'cursive'],
      },
      fontSize: {
        h1: 'var(--h1)',
        h2: 'var(--h2)',
        h3: 'var(--h3)',
        body: 'var(--body)',
        label: 'var(--label)',
      },
      borderRadius: {
        base: 'var(--radius)',
      },
      transitionTimingFunction: {
        profundo: 'var(--ease)',
      },
      screens: {
        xs: '480px',
      },
    },
  },
  plugins: [],
};
