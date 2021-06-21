const path = require("path");

let config = {
  extends: ["./" + path.relative(".", require.resolve("uu_appg01_devkit/src/config/.eslintrc.js")).replace(/\\/g, "/")],
};

// TODO Sent request to uuAppDevkit to extend default configuration
config.settings = {};
config.settings.react = {};
config.settings.react.version = "detect";

module.exports = config;
