/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'vg-bg': '#0F172A',
        'vg-card': '#1E293B',
        'vg-sidebar': '#0B1120',
        'vg-border': '#334155',
        'vg-accent': '#3B82F6',
        'vg-accent-light': '#60A5FA',
        'vg-success': '#22C55E',
        'vg-danger': '#EF4444',
        'vg-warning': '#F59E0B',
        'vg-text': '#F8FAFC',
        'vg-text-secondary': '#94A3B8',
        'vg-text-muted': '#64748B',
      },
      fontFamily: {
        'inter': ['Inter', 'system-ui', 'sans-serif'],
        'poppins': ['Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
