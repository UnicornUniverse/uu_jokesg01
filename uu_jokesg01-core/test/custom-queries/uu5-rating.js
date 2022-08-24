import { buildQueries } from "@testing-library/react";

const queryAllUu5Rating = (container) => {
  // IT WILL NOT WORK FOR MORE THAN 1 RATING ON THE SCREEN
  const node = container.querySelector(".mdi-star");
  return node ? [node] : [];
};

const getMultipleError = () => `Found multiple UU5.Bricks.Rating elements`;
const getMissingError = () => `Unable to find an element UU5.Bricks.Rating`;

const [queryUu5Rating, getAllUu5Rating, getUu5Rating, findAllUu5Rating, findUu5Rating] = buildQueries(
  queryAllUu5Rating,
  getMultipleError,
  getMissingError
);

export { queryAllUu5Rating, queryUu5Rating, getAllUu5Rating, getUu5Rating, findAllUu5Rating, findUu5Rating };
