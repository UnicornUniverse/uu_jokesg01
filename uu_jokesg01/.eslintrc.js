let config = {
  plugins: ["testing-library", "jest-dom"],
  extends: [
    "../node_modules/uu_appg01_devkit/src/config/.eslintrc.js",
    "plugin:testing-library/react",
    "plugin:jest-dom/recommended",
  ],
  rules: {
    "testing-library/no-node-access": "off",
  },
};

module.exports = config;
