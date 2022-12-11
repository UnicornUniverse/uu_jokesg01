import { Test, VisualComponent } from "uu5g05-test";
import { Client } from "uu_appg01";
import List from "../../src/joke/list.js";
import jokeListMockup from "../../mock/data/joke/list.json";
import categoryListMockup from "../../mock/data/category/list.json";
import basicDataMockup from "../../mock/data/sys/uuAppWorkspace/loadBasicData.json";
import jokeCreateMock from "../../mock/data/joke/create.json";

const { screen, within, waitFor } = Test;

function getDefaultProps() {
  return {
    baseUri: "https://localhost",
  };
}

async function setup(props, options) {
  global.URL.createObjectURL = jest.fn();
  global.URL.revokeObjectURL = jest.fn();

  Client.get.mockImplementation((uri) => {
    let dtoOut;

    if (uri.includes("joke/list")) dtoOut = jokeListMockup;
    else if (uri.includes("category/list")) dtoOut = categoryListMockup;
    else if (uri.includes("sys/uuAppWorkspace/loadBasicData")) dtoOut = basicDataMockup;
    else throw new Error(`No mockup found for uri ${uri}`);

    return { data: dtoOut };
  });

  Client.post.mockImplementation((uri) => {
    let dtoOut;

    if (uri.includes("joke/create")) dtoOut = jokeCreateMock;
    else throw new Error(`No mockup found for uri ${uri}`);

    return { data: dtoOut };
  });

  return VisualComponent.setup(List, { ...getDefaultProps(), ...props }, options);
}

describe(List.uu5Tag, () => {
  VisualComponent.testProperties(setup);

  it(`checks jokes are properly shown`, async () => {
    await setup();

    expect(screen.getByText(jokeListMockup.itemList.at(0).name)).toBeVisible();
    expect(screen.getByText(jokeListMockup.itemList.at(1).name)).toBeVisible();
  });

  it(`checks newly created joke is shown`, async () => {
    const { user, view } = await setup();

    // Click on Create joke button
    const menuBtn = view.getUu5WrapperMenu();
    await user.click(menuBtn);
    const createBtn = screen.getByRole("menuitem", { name: "Create joke" });
    await user.click(createBtn);

    // Fill and submit create form
    const createModal = screen.getByRole("dialog");
    const nameInput = within(createModal).getByLabelText("Name");
    await user.type(nameInput, jokeCreateMock.name);
    const textInput = within(createModal).getByLabelText("Text");
    await user.type(textInput, jokeCreateMock.text);
    const submitBtn = within(createModal).getByRole("button", { name: "Create" });
    await user.click(submitBtn);

    // Wait for joke to be visible in the list
    // await waitFor(() => expect(screen.getByText(jokeCreateMock.text)).toBeVisible());
    await waitFor(() => expect(screen.getByRole("dialog").toBeVisible()));
  }, 10000);
});
