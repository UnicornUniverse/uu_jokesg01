const { buildQueries, within } = require("@testing-library/react");

const queryAllFormSelectClearBtn = (container, label) =>
  within(container)
    .queryAllByText(label)
    .map((element) => within(element.parentElement).getByTestId("icon").parentElement);
const getMultipleError = (container, label) =>
  `Found multiple clear buttons for Uu5Forms.FormSelect elements with the label of: ${label}`;
const getMissingError = (container, label) =>
  `Unable to find a clear button for Uu5Forms.FormSelect element with the label of: ${label}`;

const [
  queryFormSelectClearBtn,
  getAllFormSelectClearBtn,
  getFormSelectClearBtn,
  findAllFormSelectClearBtn,
  findFormSelectClearBtn,
] = buildQueries(queryAllFormSelectClearBtn, getMultipleError, getMissingError);

module.exports = {
  queryAllFormSelectClearBtn,
  queryFormSelectClearBtn,
  getAllFormSelectClearBtn,
  getFormSelectClearBtn,
  findAllFormSelectClearBtn,
  findFormSelectClearBtn,
};
