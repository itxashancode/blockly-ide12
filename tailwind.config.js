/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  important: true, // Add this to increase specificity
  theme: {
    extend: {
      colors: {
        'ide-bg': '#1E1E1E',
        'ide-accent': '#C586C0',
        'ide-highlight': '#9CDCFE',
        'ide-primary': '#007ACC',
        'ide-secondary': '#252526',
        'ide-error': '#CE9178',
        'ide-success': '#5CA65C',
        'ide-warning': '#DCDCAA',
      },
      fontFamily: {
        'mono': ['"Fira Code"', 'Consolas', 'Monaco', 'monospace'],
        'display': ['"Fira Code"', 'Consolas', 'Monaco', 'monospace'],
      },
      animation: {
        'bounce': 'bounce 1s infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping': 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
        'spin': 'spin 1s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'glow': 'glow 2s infinite',
        'wobble': 'wobble 3s ease-in-out infinite',
        'block-snap': 'blockSnap 0.3s ease-out',
        'press': 'press 0.2s ease-out',
        'neon-pulse': 'neon-pulse 2s infinite alternate',
        'slide-in': 'slideIn 0.3s ease-out',
        'slide-out': 'slideOut 0.3s ease-in',
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-out': 'fadeOut 0.5s ease-in',
        'zoom-in': 'zoomIn 0.3s ease-out',
        'zoom-out': 'zoomOut 0.3s ease-in',
        'bounce-in': 'bounceIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'shake': 'shake 0.5s ease-in-out',
        'typewriter': 'typewriter 4s steps(40) 1s 1 normal both',
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        glow: {
          '0%, 100%': { 
            boxShadow: '0 0 5px #007ACC, 0 0 10px #007ACC' 
          },
          '50%': { 
            boxShadow: '0 0 20px #007ACC, 0 0 30px #007ACC' 
          },
        },
        wobble: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(1deg)' },
          '50%': { transform: 'rotate(-1deg)' },
          '75%': { transform: 'rotate(0.5deg)' },
        },
        blockSnap: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '70%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        press: {
          '0%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(4px) scale(0.98)' },
          '100%': { transform: 'translateY(0) scale(1)' },
        },
        'neon-pulse': {
          '0%': { 
            filter: 'drop-shadow(0 0 2px currentColor)',
            opacity: '0.8'
          },
          '100%': { 
            filter: 'drop-shadow(0 0 8px currentColor)',
            opacity: '1'
          },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideOut: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        zoomIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        zoomOut: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.9)', opacity: '0' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
        },
        typewriter: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        blink: {
          '0%, 100%': { borderColor: 'transparent' },
          '50%': { borderColor: 'currentColor' },
        },
      },
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
        'tiny': '320px',
        'mobile': '480px',
        'tablet': '768px',
        'desktop': '1024px',
        'wide': '1440px',
        'ultrawide': '2560px',
      },
      boxShadow: {
        'blocky': '4px 4px 0 0 rgba(0, 0, 0, 0.3)',
        'blocky-lg': '8px 8px 0 0 rgba(0, 0, 0, 0.3)',
        'blocky-sm': '2px 2px 0 0 rgba(0, 0, 0, 0.3)',
        'neon': '0 0 5px theme(colors.ide-primary), 0 0 10px theme(colors.ide-primary)',
        'neon-accent': '0 0 5px theme(colors.ide-accent), 0 0 10px theme(colors.ide-accent)',
        'inner-blocky': 'inset 4px 4px 0 0 rgba(0, 0, 0, 0.3)',
      },
      borderWidth: {
        '3': '3px',
        '5': '5px',
        '6': '6px',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true, // Make sure this is true
  }
}