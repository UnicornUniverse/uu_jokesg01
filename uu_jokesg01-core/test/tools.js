import { render, queries } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { SubAppProvider } from "uu_plus4u5g02";
import { AlertBus } from "uu5g05-elements";
import * as customQueries from "./custom-queries/custom-queries.js";

const AllTheProviders = ({ children }) => {
  return (
    <SubAppProvider>
      <AlertBus>{children}</AlertBus>
    </SubAppProvider>
  );
};

const customRender = (ui, options) =>
  render(ui, { queries: { ...queries, ...customQueries }, wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render, userEvent };
