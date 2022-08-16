const path = require("path");

// TODO Sent request to uuAppDevkit to extend default configuration
let config = {
  extends: [path.relative(".", require.resolve("uu_appg01_devkit/src/config/.eslintrc.js")).replace(/\\/g, "/")],
};

module.exports = config;
