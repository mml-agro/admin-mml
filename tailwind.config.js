export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"','system-ui','sans-serif'],
        display: ['"Plus Jakarta Sans"','sans-serif'],
      },
      colors: {
        brand: {50:'#fdf4ff',100:'#fae8ff',200:'#f5d0fe',300:'#f0abfc',400:'#e879f9',500:'#d946ef',600:'#c026d3',700:'#a21caf',800:'#86198f',900:'#701a75'},
        gold: {50:'#fffbeb',100:'#fef3c7',200:'#fde68a',300:'#fcd34d',400:'#fbbf24',500:'#f59e0b',600:'#d97706',700:'#b45309',800:'#92400e'},
        slate: {50:'#f8fafc',100:'#f1f5f9',200:'#e2e8f0',300:'#cbd5e1',400:'#94a3b8',500:'#64748b',600:'#475569',700:'#334155',800:'#1e293b',900:'#0f172a',950:'#020617'},
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-in-left': 'slideInLeft 0.3s ease-out',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {from:{opacity:'0'},to:{opacity:'1'}},
        slideUp: {from:{opacity:'0',transform:'translateY(12px)'},to:{opacity:'1',transform:'translateY(0)'}},
        slideInLeft: {from:{opacity:'0',transform:'translateX(-16px)'},to:{opacity:'1',transform:'translateX(0)'}},
        shimmer: {'0%':{backgroundPosition:'-200% 0'},'100%':{backgroundPosition:'200% 0'}},
      },
    },
  },
  plugins: [],
}
