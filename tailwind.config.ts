module.exports = {
  content: [
    "./app/components/**/*.{js,vue,ts}",
    "./app/layouts/**/*.vue",
    "./app/pages/**/*.vue",
    "./app/plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app/app.vue",
    "./node_modules/tw-elements/js/**/*.js",
  ],
  theme: {
    fontFamily: {
      sans: "Raleway",
      serif: "Raleway, serif",
    },
    screens: {
      xs: "320px",
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      keyframes: {
        'fade-in-up': {
          'from': {
            opacity: '0',
            transform: 'translateY(40px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        'scroll-reveal': 'fade-in-up linear both',
      },
    }
  },
  darkMode: "class",
  plugins: [require("tw-elements/plugin.cjs")],
};
