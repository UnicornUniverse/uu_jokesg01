import { render, queries } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as customQueries from "./custom-queries/custom-queries.js";

const customRender = (ui, options) => render(ui, { queries: { ...queries, ...customQueries }, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render, userEvent };
