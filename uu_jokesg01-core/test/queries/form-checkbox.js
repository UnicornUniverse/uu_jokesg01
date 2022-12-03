const { buildQueries, within } = require("@testing-library/react");

const queryAllFormCheckbox = (container, label) =>
  within(container)
    .queryAllByRole("checkbox", { name: label })
    .map((element) => element.parentElement);
const getMultipleError = (container, label) =>
  `Found multiple clear buttons for Uu5Forms.FormCheckbox elements with the label of: ${label}`;
const getMissingError = (container, label) =>
  `Unable to find a clear button for Uu5Forms.FormCheckbox element with the label of: ${label}`;

const [queryFormCheckbox, getAllFormCheckbox, getFormCheckbox, findAllFormCheckbox, findFormCheckbox] = buildQueries(
  queryAllFormCheckbox,
  getMultipleError,
  getMissingError
);

module.exports = {
  queryAllFormCheckbox,
  queryFormCheckbox,
  getAllFormCheckbox,
  getFormCheckbox,
  findAllFormCheckbox,
  findFormCheckbox,
};
