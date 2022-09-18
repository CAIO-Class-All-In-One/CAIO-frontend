module.exports = {
    plugins: [
        require("postcss-preset-env")({
            minimumVendorImplementations: 2,
            stage: 3,
            features: {
                "nesting-rules": true,
            },
        }),
        require("cssnano")({ preset: "default" }),
    ],
};
