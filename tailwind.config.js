/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Gold Palette - Refined */
        gold: {
          50: '#faf6f2',
          100: '#f5ecd8',
          200: '#e8d4b8',
          300: '#d4af7a',
          400: '#c9a068',
          500: '#be9258',
          600: '#a87c4a',
          700: '#8f6640',
          800: '#765438',
          900: '#5d4430',
        },
        /* Noir Palette - Better Hierarchy */
        noir: {
          50: '#f5f5f5',
          100: '#e5e5e5',
          200: '#d4d4d4',
          300: '#a3a3a3',
          400: '#737373',
          500: '#525252',
          600: '#404040',
          700: '#262626',
          800: '#171717',
          900: '#0a0a0a',
          950: '#050505',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '84': '21rem',
        '96': '24rem',
        '108': '27rem',
        '128': '32rem',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'slide-right': 'slideRight 0.8s ease-out forwards',
        'gold-glow': 'goldGlow 4s ease-in-out infinite',
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        fadeUp: { '0%': { opacity: '0', transform: 'translateY(24px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        scaleIn: { '0%': { opacity: '0', transform: 'scale(0.95)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
        slideRight: { '0%': { opacity: '0', transform: 'translateX(-40px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
        goldGlow: { '0%,100%': { boxShadow: '0 0 16px rgba(212, 175, 122, 0.2)' }, '50%': { boxShadow: '0 0 32px rgba(212, 175, 122, 0.35)' } },
      },
    },
  },
  plugins: [],
}
