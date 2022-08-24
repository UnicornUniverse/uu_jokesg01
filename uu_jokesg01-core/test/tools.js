import { render, queries } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { AlertBus } from "uu5g05-elements";
import * as customQueries from "./custom-queries/custom-queries.js";

const AllTheProviders = ({ children }) => {
  return <AlertBus>{children}</AlertBus>;
};

const customRender = (ui, options) =>
  render(ui, { queries: { ...queries, ...customQueries }, wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render, userEvent };
