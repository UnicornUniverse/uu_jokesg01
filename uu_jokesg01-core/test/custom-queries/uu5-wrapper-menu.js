import { buildQueries } from "@testing-library/react";

const queryAllUu5WrapperMenu = (container, text) => {
  return [container.querySelector(".mdi-dots-vertical")?.parentNode];
};

const getMultipleError = (container, text) =>
  `Found multiple Uu5Forms.Uu5WrapperMenu elements with the text of: ${text}`;
const getMissingError = (container, text) =>
  `Unable to find an element Uu5Forms.Uu5WrapperMenu with the text of: ${text}`;

const [queryUu5WrapperMenu, getAllUu5WrapperMenu, getUu5WrapperMenu, findAllUu5WrapperMenu, findUu5WrapperMenu] =
  buildQueries(queryAllUu5WrapperMenu, getMultipleError, getMissingError);

export {
  queryAllUu5WrapperMenu,
  queryUu5WrapperMenu,
  getAllUu5WrapperMenu,
  getUu5WrapperMenu,
  findAllUu5WrapperMenu,
  findUu5WrapperMenu,
};
