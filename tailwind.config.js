/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: { 50:'#fdf8ef', 100:'#f9edda', 200:'#f2d7b0', 300:'#e8bc7d', 400:'#d4a055', 500:'#c8a97e', 600:'#b08a4f', 700:'#8f6d3e', 800:'#765734', 900:'#61472d' },
        noir: { 50:'#f6f6f6', 100:'#e7e7e7', 200:'#d1d1d1', 300:'#b0b0b0', 400:'#888888', 500:'#6d6d6d', 600:'#5d5d5d', 700:'#4f4f4f', 800:'#3a3a3a', 900:'#1a1a1a', 950:'#0a0a0a' },
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.6s ease-out forwards',
        'slide-right': 'slideRight 1s ease-out forwards',
        'gold-glow': 'goldGlow 3s ease-in-out infinite',
        'ken-burns': 'kenBurns 20s ease-in-out infinite alternate',
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        fadeUp: { '0%': { opacity: '0', transform: 'translateY(30px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        scaleIn: { '0%': { opacity: '0', transform: 'scale(0.9)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
        slideRight: { '0%': { opacity: '0', transform: 'translateX(-50px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
        goldGlow: { '0%,100%': { boxShadow: '0 0 20px rgba(200,169,126,0.3)' }, '50%': { boxShadow: '0 0 40px rgba(200,169,126,0.6)' } },
        kenBurns: { '0%': { transform: 'scale(1)' }, '100%': { transform: 'scale(1.1)' } },
      },
    },
  },
  plugins: [],
}
