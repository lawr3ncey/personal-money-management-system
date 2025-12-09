/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable dark mode with class strategy
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f7f5',
          100: '#b3e8df',
          500: '#34c759',
          600: '#2db04b',
          700: '#25993d',
        },
        secondary: {
          500: '#007aff',
          600: '#0062cc',
        },
        gray: {
          50: '#f9fafb',
          100: '#f4f5f7',
          200: '#e9ecf1',
          800: '#1f2937',
          900: '#111827',
        },
        success: '#34c759',
        warning: '#ffcc00',
        danger: '#ff3b30',
      },
      fontFamily: {
        sans: ['"SF Pro Display"', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '24px',
        '3xl': '32px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        'jar': '0 20px 60px rgba(0, 0, 0, 0.3)',
      },
      backdropBlur: {
        'glass': '20px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
