module.exports = {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./nuxt.config.{js,ts}",
        "./app.vue",
        "./node_modules/tw-elements/js/**/*.js",
    ],
    theme: {
        screens: {
            xs: '320px',
            sm: '480px',
            md: '768px',
            lg: '976px',
            xl: '1440px',
        },
        extend: {
            fontFamily: {
                raleway: ['Raleway', 'sans-serif'],
            },
        },
    },
    darkMode: "class",
    plugins: [require("tw-elements/plugin.cjs")],
};
