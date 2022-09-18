module.exports = {
    env: {
        browser: true,
        node: true,
    },
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    parser: "vue-eslint-parser",
    root: true,
    extends: ["eslint:recommended", "plugin:vue/vue3-recommended", "prettier"],
    ignorePatterns: ["dist/**", "node_modules/**"],
    rules: {},
};
