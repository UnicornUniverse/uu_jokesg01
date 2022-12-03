const { buildQueries, within } = require("@testing-library/react");

const queryAllFormSelect = (container, label) =>
  within(container)
    .queryAllByText(label)
    .map((element) => within(element.parentElement).getByRole("combobox"));
const getMultipleError = (container, label) =>
  `Found multiple clear buttons for Uu5Forms.FormSelect elements with the label of: ${label}`;
const getMissingError = (container, label) =>
  `Unable to find a clear button for Uu5Forms.FormSelect element with the label of: ${label}`;

const [queryFormSelect, getAllFormSelect, getFormSelect, findAllFormSelect, findFormSelect] = buildQueries(
  queryAllFormSelect,
  getMultipleError,
  getMissingError
);

module.exports = {
  queryAllFormSelect,
  queryFormSelect,
  getAllFormSelect,
  getFormSelect,
  findAllFormSelect,
  findFormSelect,
};
