import { buildQueries, within } from "@testing-library/react";

const queryAllFormText = (container, label) => {
  const nodeList = within(container)
    .queryAllByText(label)
    .map((node) => within(node.nextSibling).getByRole("textbox"));
  return Array.from(nodeList);
};
const getMultipleError = (container, label) => `Found multiple Uu5Forms.FormText elements with the label of: ${label}`;
const getMissingError = (container, label) => `Unable to find an element Uu5Forms.FormText with the label of: ${label}`;

const [queryFormText, getAllFormText, getFormText, findAllFormText, findFormText] = buildQueries(
  queryAllFormText,
  getMultipleError,
  getMissingError
);

export { queryAllFormText, queryFormText, getAllFormText, getFormText, findAllFormText, findFormText };
