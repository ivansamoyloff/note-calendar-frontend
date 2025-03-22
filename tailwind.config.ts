/** @type {import('tailwindcss').Config}  */
const config: import('tailwindcss').Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        saira: ['var(--font-saira)', 'sans-serif'],
        mono: ['var(--font-roboto-mono)', 'monospace'],
      }
    }
  },
  plugins: [],
};

export default config;