import { buildQueries, within } from "@testing-library/react";

const queryAllFormCheckbox = (container, label) => {
  const nodeList = within(container)
    .queryAllByRole("checkbox", { name: label })
    .map((node) => node.parentElement);
  return Array.from(nodeList);
};
const getMultipleError = (container, label) =>
  `Found multiple Uu5Forms.FormCheckbox elements with the label of: ${label}`;
const getMissingError = (container, label) =>
  `Unable to find an element Uu5Forms.FormCheckbox with the label of: ${label}`;

const [queryFormCheckbox, getAllFormCheckbox, getFormCheckbox, findAllFormCheckbox, findFormCheckbox] = buildQueries(
  queryAllFormCheckbox,
  getMultipleError,
  getMissingError
);

export {
  queryAllFormCheckbox,
  queryFormCheckbox,
  getAllFormCheckbox,
  getFormCheckbox,
  findAllFormCheckbox,
  findFormCheckbox,
};
