/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      screens: { sm: '640px', md: '768px', lg: '1024px', xl: '1200px', '2xl': '1280px' },
    },
    extend: {
      colors: {
        background: 'rgb(var(--color-bg) / <alpha-value>)',
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        'accent-hover': 'rgb(var(--color-accent-hover) / <alpha-value>)',
        text: 'rgb(var(--color-text) / <alpha-value>)',
        'text-secondary': 'rgb(var(--color-text-secondary) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',

        ink: {
          950: 'rgb(var(--color-ink-950) / <alpha-value>)',
          900: 'rgb(var(--color-ink-900) / <alpha-value>)',
          800: 'rgb(var(--color-ink-800) / <alpha-value>)',
          700: 'rgb(var(--color-ink-700) / <alpha-value>)',
          600: 'rgb(var(--color-ink-600) / <alpha-value>)',
          500: 'rgb(var(--color-ink-500) / <alpha-value>)',
        },
        brand: {
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
        },
        violet: { DEFAULT: '#A855F7', soft: '#C084FC' },
        gold: { DEFAULT: '#F5B301', soft: '#FFC53D', deep: '#B45309' },
        cyan: { DEFAULT: '#22D3EE', deep: '#0891B2' },
        rose: { DEFAULT: '#F43F5E', soft: '#FB7185' },
        emerald: { DEFAULT: '#34D399', deep: '#059669' },
        cream: '#F6F4EF',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-sora)', 'var(--font-inter)', 'ui-sans-serif', 'sans-serif'],
        editorial: ['var(--font-instrument)', 'Georgia', 'serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.35rem, 4.5vw + 1rem, 5.25rem)', { lineHeight: '1.05', letterSpacing: '-0.035em' }],
        'display-lg': ['clamp(2.1rem, 4.2vw, 3.4rem)', { lineHeight: '1.08', letterSpacing: '-0.03em' }],
        'display-md': ['clamp(1.6rem, 2.6vw, 2.25rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
      },
      boxShadow: {
        xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        glow: '0 0 0 1px rgba(99,102,241,0.35), 0 18px 60px -18px rgba(99,102,241,0.55)',
        'glow-gold': '0 0 0 1px rgba(245,179,1,0.35), 0 18px 60px -18px rgba(245,179,1,0.45)',
        card: '0 1px 0 0 rgba(255,255,255,0.04) inset, 0 24px 60px -30px rgba(0,0,0,0.9)',
        lift: '0 30px 80px -32px rgba(0,0,0,0.95), 0 0 0 1px rgba(129,140,248,0.28)',
        plate: '0 10px 30px -12px rgba(0,0,0,0.7)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(120deg, #1D4ED8 0%, #2563EB 45%, #3B82F6 100%)',
        'gold-gradient': 'linear-gradient(120deg, #F5B301 0%, #FF8A3D 100%)',
        'aurora-gradient': 'linear-gradient(135deg, #22D3EE 0%, #6366F1 50%, #A855F7 100%)',
        'fade-down': 'linear-gradient(180deg, rgba(var(--color-bg) / 0) 0%, rgb(var(--color-bg)) 100%)',
      },
      keyframes: {
        aurora: {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '33%': { transform: 'translate3d(6%, -4%, 0) scale(1.12)' },
          '66%': { transform: 'translate3d(-5%, 5%, 0) scale(0.94)' },
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'floaty-slow': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-22px) rotate(1.5deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shine: {
          '0%': { transform: 'translateX(-120%) skewX(-18deg)' },
          '100%': { transform: 'translateX(220%) skewX(-18deg)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.85)', opacity: '0.7' },
          '100%': { transform: 'scale(2.1)', opacity: '0' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
        'gradient-pan': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'scroll-dot': {
          '0%': { transform: 'translateY(0)', opacity: '0' },
          '30%': { opacity: '1' },
          '100%': { transform: 'translateY(14px)', opacity: '0' },
        },
      },
      animation: {
        aurora: 'aurora 22s ease-in-out infinite',
        'aurora-slow': 'aurora 34s ease-in-out infinite reverse',
        floaty: 'floaty 7s ease-in-out infinite',
        'floaty-slow': 'floaty-slow 11s ease-in-out infinite',
        marquee: 'marquee 38s linear infinite',
        shine: 'shine 2.6s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.22,1,0.36,1) infinite',
        'spin-slow': 'spin-slow 26s linear infinite',
        'gradient-pan': 'gradient-pan 8s ease infinite',
        'scroll-dot': 'scroll-dot 1.8s ease-in-out infinite',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};