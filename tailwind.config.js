/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['JetBrains Mono', 'Courier New', 'monospace'],
        'display': ['Space Grotesk', 'Arial Black', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        'paper': '#faf8f5',
        'paper-dark': '#f5f1ea',
        'paper-aged': '#f0ede6',
        'ink': '#1a1a1a',
        'ink-light': '#333333',
        'accent': '#ff6b35',
        'accent-dark': '#e55a2b',
        'shadow': '#00000020',
        'border-brutal': '#000000',
        'grain': '#00000008',
      },
      boxShadow: {
        'brutal': '4px 4px 0px 0px rgba(0,0,0,0.8)',
        'brutal-lg': '6px 6px 0px 0px rgba(0,0,0,0.8)',
        'paper': '4px 4px 12px rgba(0,0,0,0.1)',
        'paper-lg': '8px 8px 24px rgba(0,0,0,0.15)',
      },
      borderWidth: {
        '3': '3px',
        '4': '4px',
        '6': '6px',
      }
    },
  },
  plugins: [],
} 