// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E40AF",   // custom blue
        secondary: "#F59E0B", // custom amber
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};