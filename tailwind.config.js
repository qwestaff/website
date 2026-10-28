export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0072BC',
        'primary-light': '#E6F2FA',
        purple: '#7B4FA8',
        orange: '#F58220',
        red: '#E31E24',
        'text-dark': '#2C2C2C',
        'text-muted': '#6B7280',
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1200px',
        theory: '1100px',
      },
    },
  },
  plugins: [],
};
