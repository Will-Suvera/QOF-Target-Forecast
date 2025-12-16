/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Color System - Semantic palette extracted from current usage
      colors: {
        brand: {
          dark: '#0f1b38',
          gray: '#717182',
          blue: '#2075FF',
          green: '#1EBA4A',
          purple: '#9B63FF',
        },
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2075FF', // Brand blue
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        glass: {
          white: 'rgba(255, 255, 255, 0.7)',
          'white-dark': 'rgba(255, 255, 255, 0.5)',
          'white-lighter': 'rgba(255, 255, 255, 0.9)',
        },
      },
      // Golden Ratio Typography Scale (Base: 14px / 0.875rem, φ = 1.618)
      fontSize: {
        'xs': ['0.54rem', { lineHeight: '1.382', letterSpacing: '0.01em' }],     // 8.65px
        'sm': ['0.875rem', { lineHeight: '1.618', letterSpacing: '0' }],         // 14px - BASE
        'base': ['1.416rem', { lineHeight: '1.618', letterSpacing: '0' }],       // 22.65px
        'lg': ['2.29rem', { lineHeight: '1.236', letterSpacing: '-0.01em' }],    // 36.65px
        'xl': ['3.71rem', { lineHeight: '1.236', letterSpacing: '-0.02em' }],    // 59.3px
        '2xl': ['6rem', { lineHeight: '1.236', letterSpacing: '-0.03em' }],      // 96px
      },
      // Line heights using golden ratio
      lineHeight: {
        'tight': '1.236',      // 1/φ²
        'snug': '1.382',       // 1/φ^1.5
        'normal': '1.618',     // φ
        'relaxed': '2.618',    // φ²
      },
      // Letter spacing with golden ratio principles
      letterSpacing: {
        'tighter': '-0.03em',
        'tight': '-0.02em',
        'normal': '0',
        'wide': '0.01em',
        'wider': '0.02em',
      },
      // Frosted Glass Utilities
      backdropBlur: {
        'frosted': '12px',
        'frosted-heavy': '20px',
      },
      backgroundColor: theme => ({
        ...theme('colors'),
        'glass': 'rgba(255, 255, 255, 0.7)',
        'glass-dark': 'rgba(255, 255, 255, 0.5)',
        'glass-lighter': 'rgba(255, 255, 255, 0.9)',
      }),
      // Standardized shadows
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        'glass-lg': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'card-hover': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      },
      // Standardized borders
      borderColor: theme => ({
        ...theme('colors'),
        'glass': 'rgba(255, 255, 255, 0.2)',
      }),
      // Background colors
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(176deg, rgba(252, 252, 252, 0.00) 43.7%, #FCFCFC 78.86%), url(/assets/background-gradient.png)',
      },
      backgroundSize: {
        'hero': '100.05% 291.727%',
      },
      backgroundPosition: {
        'hero': '0.356px -201.219px',
      },
    },
  },
  plugins: [],
};
