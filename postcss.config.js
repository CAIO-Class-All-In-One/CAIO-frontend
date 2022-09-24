module.exports = {
  plugins: [
    require("postcss-preset-env")({
      minimumVendorImplementations: 2,
      stage: 3,
      browsers: "last 10 Chrome versions, last 1 years",
      features: {
        "nesting-rules": true,
      },
    }),
    require("cssnano")({ preset: "default" }),
  ],
};
