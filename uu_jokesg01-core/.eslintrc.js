const path = require("path");

// TODO Sent request to uuAppDevkit to extend default configuration
let config = {
  extends: ["./" + path.relative(".", require.resolve("uu_appg01_devkit/src/config/.eslintrc.js")).replace(/\\/g, "/")],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "react/jsx-no-bind": 0,
  },
};

module.exports = config;
