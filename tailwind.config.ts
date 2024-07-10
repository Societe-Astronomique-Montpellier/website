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
        fontFamily: {
            raleway: '"Raleway", sans-serif'
        },
        extend: { },
    },
    darkMode: "class",
    plugins: [require("tw-elements/plugin.cjs")],
};