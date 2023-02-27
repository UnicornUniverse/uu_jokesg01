const FormsCheckbox = require("./forms-checkbox");
const FormsFileClearBtn = require("./forms-file-clear-btn");
const FormsSelect = require("./forms-select");
const FormsSelectClearBtn = require("./forms-select-clear-btn");

module.exports = {
  ...FormsCheckbox,
  ...FormsFileClearBtn,
  ...FormsSelect,
  ...FormsSelectClearBtn,
};
