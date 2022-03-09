module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'backdrop-overlay': 'rgba(255, 255, 255, 0.8)'
      },
      fontFamily: {
        'sans': ['Rubik', 'sans-serif']
      },
      maxHeight: {
        '3/4': '75vh',
        '90': '90vh',
      }
    },
  },
  plugins: [],
}
