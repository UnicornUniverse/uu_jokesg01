const FormCheckbox = require("./form-checkbox");
const FormFileClearBtn = require("./form-file-clear-btn");
const FormSelect = require("./form-select");
const FormSelectClearBtn = require("./form-select-clear-btn");

module.exports = {
  ...FormCheckbox,
  ...FormFileClearBtn,
  ...FormSelect,
  ...FormSelectClearBtn,
};
