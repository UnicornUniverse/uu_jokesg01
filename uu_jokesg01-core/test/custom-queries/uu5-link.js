import { buildQueries, within } from "@testing-library/react";

const queryAllUu5Link = (container, text) => {
  const nodeList = Array.from(container.querySelectorAll("a"));
  return nodeList.map((node) => within(node).getByText(text));
};

const getMultipleError = (container, text) => `Found multiple Uu5Forms.Uu5Link elements with the text of: ${text}`;
const getMissingError = (container, text) => `Unable to find an element Uu5Forms.Uu5Link with the text of: ${text}`;

const [queryUu5Link, getAllUu5Link, getUu5Link, findAllUu5Link, findUu5Link] = buildQueries(
  queryAllUu5Link,
  getMultipleError,
  getMissingError
);

export { queryAllUu5Link, queryUu5Link, getAllUu5Link, getUu5Link, findAllUu5Link, findUu5Link };
