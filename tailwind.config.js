/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF5EB',
          100: '#FFEBD6',
          200: '#FFD7AE',
          300: '#FFC285',
          400: '#FFAD5C',
          500: '#FF9933', // Main primary color (saffron)
          600: '#FF8000',
          700: '#CC6600',
          800: '#994C00',
          900: '#663300',
        },
        secondary: {
          50: '#E6E6F0',
          100: '#CCCCDF',
          200: '#9999BF',
          300: '#66669F',
          400: '#333380',
          500: '#000080', // Navy blue
          600: '#00006B',
          700: '#000055',
          800: '#000040',
          900: '#00002B',
        },
        accent: {
          50: '#E6F7F1',
          100: '#D0EFE4',
          200: '#A1DFCA',
          300: '#71CFAF',
          400: '#42BF95',
          500: '#00A86B', // Jade green
          600: '#008C58',
          700: '#007047',
          800: '#005436',
          900: '#003824',
        },
        success: {
          500: '#10B981',
        },
        warning: {
          500: '#F59E0B',
        },
        error: {
          500: '#EF4444',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      spacing: {
        '2': '8px',
        '4': '16px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
        '20': '80px',
        '24': '96px',
      },
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-in-out',
        'slideUp': 'slideUp 0.6s ease-out',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};