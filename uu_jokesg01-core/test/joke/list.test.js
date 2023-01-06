import { Test, VisualComponent } from "uu5g05-test";
import { Client } from "uu_appg01";
import List from "../../src/joke/list.js";
import listMock from "../../mock/data/joke/list.json";
import categoryListMock from "../../mock/data/category/list.json";
import basicDataMock from "../../mock/data/sys/uuAppWorkspace/loadBasicData.json";
import createMock from "../../mock/data/joke/create.json";
import updateMock from "../../mock/data/joke/update.json";
import updateVisibilityMock from "../../mock/data/joke/updateVisibility.json";
import deleteMock from "../../mock/data/joke/delete.json";
const { screen, within, waitFor } = Test;

// TODO MFA Add configura to Test export
// configure({
//   defaultHidden: true,
// });

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

    if (uri.includes("joke/list")) dtoOut = listMock;
    else if (uri.includes("category/list")) dtoOut = categoryListMock;
    else if (uri.includes("sys/uuAppWorkspace/loadBasicData")) dtoOut = basicDataMock;
    else if (uri.includes("personalCard/load")) dtoOut = null;
    else throw new Error(`No mockup found for uri ${uri}`);

    return { data: dtoOut };
  });

  Client.post.mockImplementation((uri) => {
    let dtoOut;

    if (uri.includes("joke/create")) dtoOut = createMock;
    else if (uri.includes("joke/updateVisibility")) dtoOut = updateVisibilityMock;
    else if (uri.includes("joke/update")) dtoOut = updateMock;
    else if (uri.includes("joke/delete")) dtoOut = deleteMock;
    else throw new Error(`No mockup found for uri ${uri}`);

    return { data: dtoOut };
  });

  return VisualComponent.setup(List, { ...getDefaultProps(), ...props }, options);
}

describe(List.uu5Tag, () => {
  VisualComponent.testProperties(setup);

  it(`checks jokes are properly shown`, async () => {
    await setup();

    expect(screen.getByText(listMock.itemList.at(0).name)).toBeVisible();
    expect(screen.getByText(listMock.itemList.at(1).name)).toBeVisible();
  });

  it(`checks newly created joke is shown in list and detail link in confirmation alert is working`, async () => {
    const { user, view } = await setup();

    // Next joke/list call will return also added joke
    Client.get.mockReturnValueOnce({
      data: {
        itemList: [...listMock.itemList, { ...createMock }],
        pageInfo: { ...listMock.pageInfo, total: listMock.pageInfo.total + 1 },
        uuAppErrorMap: {},
      },
    });

    // Clicks on Create joke menu item
    const menuBtn = view.getUu5WrapperMenu();
    await user.click(menuBtn);
    const createBtn = screen.getByRole("menuitem", { name: "Create joke" });
    await user.click(createBtn);

    // Fills and submits create form
    const createModal = screen.getByRole("dialog");
    const nameInput = within(createModal).getByLabelText("Name");
    await user.type(nameInput, createMock.name);
    const textInput = within(createModal).getByLabelText("Text");
    await user.type(textInput, createMock.text);
    const submitBtn = within(createModal).getByRole("button", { name: "Create" });
    await user.click(submitBtn);

    // Waits for joke to be visible in the list
    await waitFor(() => expect(screen.getByText(createMock.text)).toBeVisible());

    // Clicks on detail link in confirmation alert
    const confirmAlert = screen.getByRole("alertdialog");
    const detailLink = within(confirmAlert).getByRole("link");
    await user.click(detailLink);
    const detailModal = screen.getByRole("dialog");

    // Checks detail modal contains newly added joke
    expect(within(detailModal).getByText(`Joke - ${createMock.name}`)).toBeVisible();
  }, 20000);

  it(`cancels joke creation and checks create modal was properly closed`, async () => {
    const { user, view } = await setup();

    // Clicks on Create joke menu item
    const menuBtn = view.getUu5WrapperMenu();
    await user.click(menuBtn);
    const createBtn = screen.getByRole("menuitem", { name: "Create joke" });
    await user.click(createBtn);

    // Clicks on Cancel button
    const createModal = screen.getByRole("dialog");
    const cancelBtn = within(createModal).getByRole("button", { name: "Cancel" });
    await user.click(cancelBtn);

    // Checks create modal is not shown
    expect(createModal).not.toBeInTheDocument();
  }, 20000);

  it(`updates jokes and checks modifications are properly sent and shown`, async () => {
    const { user } = await setup();

    // Opens update modal of first joke
    const joke = listMock.itemList.at(0);
    const tile = screen.getByRole("listitem", { name: joke.name });

    const updateBtn = within(tile).getByRole("button", { name: "Update" });
    await user.click(updateBtn);

    // Modifies joke's name and submit form
    const updateModal = screen.getByRole("dialog");
    const nameInput = within(updateModal).getByLabelText("Name");
    await user.clear(nameInput);
    await user.type(nameInput, updateMock.name);
    const submitBtn = within(updateModal).getByRole("button", { name: "Update" });
    await user.click(submitBtn);

    // Checks modified joke's name is visible in the tile
    await waitFor(() => expect(within(tile).getByText(updateMock.name)).toBeVisible());
  }, 20000);

  it(`cancels joke update and checks update modal was properly closed`, async () => {
    const { user } = await setup();

    // Opens update modal of first joke
    const joke = listMock.itemList.at(0);
    const tile = screen.getByRole("listitem", { name: joke.name });

    const updateBtn = within(tile).getByRole("button", { name: "Update" });
    await user.click(updateBtn);

    // Modifies joke's name and submit form
    const updateModal = screen.getByRole("dialog");
    const cancelBtn = within(updateModal).getByRole("button", { name: "Cancel" });
    await user.click(cancelBtn);

    // Checks update modal is not shown
    expect(updateModal).not.toBeInTheDocument();
  }, 20000);

  it(`clicks on item and checks the detail modal is opened and then closed`, async () => {
    const { user } = await setup();

    // Opens detail modal of first joke
    const joke = listMock.itemList.at(0);
    const tile = screen.getByRole("listitem", { name: joke.name });

    const detailBtn = within(tile).getByRole("button", { name: "Detail" });
    await user.click(detailBtn);
    const detailModal = screen.getByRole("dialog");

    // Checks  joke's name is visible in the detail modal
    await waitFor(() => expect(within(detailModal).getByText(joke.name, { exact: false })).toBeVisible());

    // Closes detail modal via Close button
    // TODO MFA Add title to modal's close button
    const closeBtn = detailModal.querySelector(".mdi-close").parentNode;
    await user.click(closeBtn);

    // Checks detail modal is not visisible anymore
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  }, 20000);

  it(`toogles visibility of joke and checks it is properly modified`, async () => {
    const { user } = await setup();

    // Click on Unpublish button of the first item
    const joke = listMock.itemList.at(0);
    const tile = screen.getByRole("listitem", { name: joke.name });

    const unpublishBtn = within(tile).getByRole("button", { name: "Unpublish" });
    await user.click(unpublishBtn);

    // Checks the button name was switched from Unpublish to Publish
    await waitFor(() => expect(within(tile).getByRole("button", { name: "Publish" })));
  }, 20000);

  it(`deletes joke and checks it was removed from list`, async () => {
    const { user } = await setup();

    // Clicks on Delete button of the first list item
    const joke = listMock.itemList.at(0);
    const tile = screen.getByRole("listitem", { name: joke.name });
    // MFA TODO Add aria-label to Tile component
    const menuBtn = tile.querySelector(".mdi-dots-vertical").parentNode;
    await user.click(menuBtn);
    const deleteBtn = screen.getByRole("menuitem", { name: "Delete" });
    await user.click(deleteBtn);

    // Clicks on Delete button in the confirmation dialog
    const confirmDialog = screen.getByRole("dialog");
    const confirmBtn = within(confirmDialog).getByRole("button", { name: "Delete" });
    await user.click(confirmBtn);

    // Checks the confirmation dialog was closed
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    // Checks the item was removed from list
    await waitFor(() => expect(screen.queryByRole("listitem", { name: joke.name })).not.toBeInTheDocument());
  }, 20000);

  it(`cancels joke's deletion and checks it was not removed from list`, async () => {
    const { user } = await setup();

    // Clicks on Delete button of the first list item
    const joke = listMock.itemList.at(0);
    const tile = screen.getByRole("listitem", { name: joke.name });
    // MFA TODO Add aria-label to Tile component
    const menuBtn = tile.querySelector(".mdi-dots-vertical").parentNode;
    await user.click(menuBtn);
    const deleteBtn = screen.getByRole("menuitem", { name: "Delete" });
    await user.click(deleteBtn);

    // Clicks on Cancel button in the confirmation dialog
    const confirmDialog = screen.getByRole("dialog");
    const confirmBtn = within(confirmDialog).getByRole("button", { name: "Cancel" });
    await user.click(confirmBtn);

    // Checks the confirmation dialog was closed
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    // Check the item was not removed from list
    expect(screen.getByRole("listitem", { name: joke.name })).toBeVisible();
  }, 20000);

  it(`changes filters and checks empy list is shown`, async () => {
    const { user } = await setup();

    // The next joke/list command will return 0 items
    Client.get.mockReturnValueOnce({
      data: {
        itemList: [],
        pageInfo: { pageIndex: 0, pageSize: 100, total: 0 },
        uuAppErrorMap: {},
      },
    });

    // Clicks on Filter button
    const filterBtn = screen.getByRole("button", { name: "Filter" });
    await user.click(filterBtn);

    // Selects category from filter menu and clicks Apply button
    // TODO MFA Fix aria-label of filter buttons
    const categoryBtn = screen.getByText("Category").parentNode.parentNode;
    await user.click(categoryBtn);
    const category = categoryListMock.itemList.at(0);
    const categoryItem = screen.getByRole("menuitem", { name: category.name });
    await user.click(categoryItem);
    const applyBtn = screen.getByRole("button", { name: "Apply" });
    await user.click(applyBtn);

    // Wait for empty list is shown
    await waitFor(() => expect(screen.getByText("There are no items here")).toBeVisible());
  }, 50000);

  it(`sorts list by rating`, async () => {
    const { user } = await setup();

    // The next joke/list command will return 0 items
    Client.get.mockReturnValueOnce({
      data: {
        itemList: [],
        pageInfo: { pageIndex: 0, pageSize: 100, total: 0 },
        uuAppErrorMap: {},
      },
    });

    // Clicks on Sorting button
    const sortingBtn = screen.getByRole("button", { name: "Sorting" });
    await user.click(sortingBtn);

    // Clicks on Rating button
    // TODO MFA Fix aria-label of filter buttons
    const ratingBtn = screen.getByText("Rating").parentNode.parentNode;
    await user.click(ratingBtn);

    // Wait for empty list is shown to check it rerenders
    await waitFor(() => expect(screen.getByText("There are no items here")).toBeVisible());
  }, 30000);

  it(`refreshes data and checks all calls have been called`, async () => {
    const { user, view } = await setup();
    const initCallsTotal = Client.get.mock.calls.length;

    // Clicks on Refresh data menu item
    const menuBtn = view.getUu5WrapperMenu();
    await user.click(menuBtn);
    const refreshBtn = screen.getByRole("menuitem", { name: "Refresh data" });
    await user.click(refreshBtn);

    // Checks all calls have been  called
    const finalCallsTotal = Client.get.mock.calls.length;
    const callsDiff = finalCallsTotal - initCallsTotal;
    expect(callsDiff).toBe(4); // 2x category/list
  }, 20000);

  it(`copies component`, async () => {
    const { user, view } = await setup();

    // Clicks on Copy component menu item
    const menuBtn = view.getUu5WrapperMenu();
    await user.click(menuBtn);
    const copyBtn = screen.getByRole("menuitem", { name: "Copy component" });
    await user.click(copyBtn);

    // TODO MFA Check clipboard
  }, 20000);

  it(`copies one joke`, async () => {
    const { user } = await setup();

    // Finds first joke in the list
    const joke = listMock.itemList.at(0);
    const tile = screen.getByRole("listitem", { name: joke.name });

    // Clicks on Copy button in tile's menu
    // MFA TODO Add aria-label to Tile component
    const menuBtn = tile.querySelector(".mdi-dots-vertical").parentNode;
    await user.click(menuBtn);
    const copyBtn = screen.getByRole("menuitem", { name: "Copy" });
    await user.click(copyBtn);

    // TODO MFA Check clipboard
  }, 20000);

  it(`renders list for inline nesting level and opens the list to modal window`, async () => {
    const { user } = await setup({ nestingLevel: "inline" });

    // Clicks on link
    const link = screen.getByText(`Jokes - ${basicDataMock.data.name}`);
    await user.click(link);
    const modal = screen.getByRole("dialog");
    await user.click(modal);

    // Checks first joke is visible
    const joke = listMock.itemList.at(0);
    await waitFor(() => expect(within(modal).getByText(joke.name)).toBeVisible());

    // Closes  modal via Close button
    // TODO MFA Add title to modal's close button
    const closeBtn = modal.querySelector(".mdi-close").parentNode;
    await user.click(closeBtn);

    // Checks detail modal is not visisible anymore
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  }, 20000);
});
