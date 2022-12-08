import { buildQueries, within } from "@testing-library/react";

const queryAllFormTextArea = (container, label) => {
  const nodeList = within(container)
    .queryAllByText(label)
    .map((node) => within(node.nextSibling).getByRole("textbox"));
  return Array.from(nodeList);
};
const getMultipleError = (container, label) =>
  `Found multiple Uu5Forms.FormTextArea elements with the label of: ${label}`;
const getMissingError = (container, label) =>
  `Unable to find an element Uu5Forms.FormTextArea with the label of: ${label}`;

const [queryFormTextArea, getAllFormTextArea, getFormTextArea, findAllFormTextArea, findFormTextArea] = buildQueries(
  queryAllFormTextArea,
  getMultipleError,
  getMissingError
);

export {
  queryAllFormTextArea,
  queryFormTextArea,
  getAllFormTextArea,
  getFormTextArea,
  findAllFormTextArea,
  findFormTextArea,
};
