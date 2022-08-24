import { buildQueries, within } from "@testing-library/react";

const queryAllFormFileClearBtn = (container, label) =>
  within(container)
    .queryAllByLabelText(label)
    .map((element) => within(element.previousSibling).getByRole("button"));
const getMultipleError = (container, label) =>
  `Found multiple clear buttons for Uu5Forms.FormSelect elements with the label of: ${label}`;
const getMissingError = (container, label) =>
  `Unable to find a clear button for Uu5Forms.FormSelect element with the label of: ${label}`;

const [
  queryFormFileClearBtn,
  getAllFormFileClearBtn,
  getFormFileClearBtn,
  findAllFormFileClearBtn,
  findFormFileClearBtn,
] = buildQueries(queryAllFormFileClearBtn, getMultipleError, getMissingError);

export {
  queryAllFormFileClearBtn,
  queryFormFileClearBtn,
  getAllFormFileClearBtn,
  getFormFileClearBtn,
  findAllFormFileClearBtn,
  findFormFileClearBtn,
};
