import { Utils } from "uu5g05";
import { wait } from "uu5g05-test";
import { Client } from "uu_appg01";
import { render, screen, within, userEvent } from "../tools";
import DetailView from "../../src/joke/detail-view.js";
import { UuJokesError } from "../../src/errors/errors";
import enLsi from "../../src/lsi/en.json";

const lsi = enLsi[DetailView.uu5Tag];

function getDefaultProps() {
  const joke = {
    id: "123",
    name: "Test joke",
    visibility: false,
    text: "Best joke ever",
    imageUrl: "https://via.placeholder.com/300x300",
    image: "1234",
    ratingCount: 5,
    averageRating: 2.5,
    categoryIdList: ["1", "2"],
    uuIdentity: "9-9",
    uuIdentityName: "Test User",
    sys: {
      cts: "2020-01-01T00:00:00.000Z",
    },
  };

  const jokeDataObject = {
    state: "ready",
    data: joke,
    handlerMap: {
      load: jest.fn(),
      update: jest.fn(),
      updateVisibility: jest.fn(),
      addRating: jest.fn(),
    },
  };

  const jokesPermission = {
    joke: {
      canAddRating: () => true,
      canManage: () => true,
      canUpdateVisibility: () => true,
    },
  };

  const jokesDataObject = {
    state: "ready",
    data: {
      categoryList: [
        { id: "1", name: "Category 1" },
        { id: "2", name: "Category 2" },
        { id: "3", name: "Category 3" },
      ],
    },
    handlerMap: {
      load: jest.fn(),
    },
  };

  const awscDataObject = {
    state: "ready",
    data: {
      data: {
        artifact: {
          uuAppWorkspaceUri: "",
        },
      },
    },
  };

  const preferenceDataObject = {
    state: "ready",
    data: {
      showCategories: true,
      showAuthor: true,
      showCreationTime: true,
      disableUserPreference: false,
    },
    handlerMap: {
      load: jest.fn(),
      save: jest.fn(),
    },
  };

  return {
    jokesDataObject,
    jokesPermission,
    jokeDataObject,
    awscDataObject,
    preferenceDataObject,
    onOpenToNewTab: jest.fn(),
    onCopyComponent: jest.fn(),
  };
}

async function setup(props = getDefaultProps()) {
  Client.get.mockImplementation(() => ({ data: {} }));
  const user = userEvent.setup();
  const view = render(<DetailView {...props} />);
  await wait();
  return { props, view, user };
}

describe(`UuJokesCore.Joke.DetailView`, () => {
  it(`checks AreaView is rendered`, async () => {
    const { props } = await setup();

    const joke = props.jokeDataObject.data;
    expect(screen.getByText(joke.name, { exact: false })).toBeVisible();
    expect(screen.getByText(`${joke.ratingCount} votes`)).toBeVisible();
  });

  it(`checks BoxView is rendered`, async () => {
    const props = { ...getDefaultProps(), nestingLevel: "box" };
    await setup(props);

    const joke = props.jokeDataObject.data;
    expect(screen.getByText(joke.name, { exact: false })).toBeVisible();
    expect(screen.queryByText(`${joke.ratingCount} votes`)).not.toBeInTheDocument();
  });

  it(`checks SpotView is rendered`, async () => {
    const props = { ...getDefaultProps(), nestingLevel: "spot" };
    await setup(props);

    const joke = props.jokeDataObject.data;
    expect(screen.getByRole("button", { name: new RegExp(`.*${joke.name}`) })).toBeVisible();
  });

  it(`checks InlineView is rendered`, async () => {
    const props = { ...getDefaultProps(), nestingLevel: "inline" };
    const { view } = await setup(props);

    const joke = props.jokeDataObject.data;
    const link = view.getUu5Link(new RegExp(`.*${joke.name}`));
    expect(link).toBeVisible();
  });

  it(`opens and submits UpdateModal`, async () => {
    const { user, props } = await setup();

    const updateBtn = screen.getByRole("button", { name: "Update" });
    await user.click(updateBtn);

    const updateModal = screen.getByRole("dialog");
    const submitBtn = within(updateModal).getByRole("button", { name: "Update" });
    await user.click(submitBtn);

    expect(props.jokeDataObject.handlerMap.update).toHaveBeenCalledTimes(1);
    expect(updateModal).not.toBeInTheDocument();
  });

  it(`opens and cancels UpdateModal`, async () => {
    const { user, props } = await setup();

    const updateBtn = screen.getByRole("button", { name: "Update" });
    await user.click(updateBtn);

    const updateModal = screen.getByRole("dialog");
    const cancelBtn = within(updateModal).getByRole("button", { name: "Cancel" });
    await user.click(cancelBtn);

    expect(props.jokeDataObject.handlerMap.update).toHaveBeenCalledTimes(0);
    expect(updateModal).not.toBeInTheDocument();
  });

  it(`opens and submits PreferenceModal`, async () => {
    const { user, props, view } = await setup();

    const menuBtn = view.getUu5WrapperMenu();
    await user.click(menuBtn);
    const configureBtn = screen.getByRole("menuitem", { name: "Configure component" });
    await user.click(configureBtn);

    const preferenceModal = screen.getByRole("dialog");
    const submitBtn = within(preferenceModal).getByRole("button", { name: "Save" });
    await user.click(submitBtn);

    expect(props.preferenceDataObject.handlerMap.save).toHaveBeenCalledTimes(1);
    expect(preferenceModal).not.toBeInTheDocument();
  });

  it(`opens and cancels PreferenceModal`, async () => {
    const { user, props, view } = await setup();

    const menuBtn = view.getUu5WrapperMenu();
    await user.click(menuBtn);
    const configureBtn = screen.getByRole("menuitem", { name: "Configure component" });
    await user.click(configureBtn);

    const preferenceModal = screen.getByRole("dialog");
    const cancelBtn = within(preferenceModal).getByRole("button", { name: "Cancel" });
    await user.click(cancelBtn);

    expect(props.preferenceDataObject.handlerMap.save).toHaveBeenCalledTimes(0);
    expect(preferenceModal).not.toBeInTheDocument();
  });

  it(`opens and closes detail`, async () => {
    const props = { ...getDefaultProps(), nestingLevel: "inline" };
    const { user } = await setup(props);

    const name = screen.getByText(props.jokeDataObject.data.name, { exact: false });
    await user.click(name);

    const detailModal = screen.getByRole("dialog");
    const closeBtn = detailModal.querySelector(".mdi-close");
    await user.click(closeBtn);

    expect(detailModal).not.toBeInTheDocument();
  });

  it(`open detail to new tab`, async () => {
    const props = { ...getDefaultProps(), nestingLevel: "inline" };
    const { user } = await setup(props);

    const name = screen.getByText(props.jokeDataObject.data.name, { exact: false });

    await user.pointer({ target: name, keys: "[MouseMiddle]" });

    const detailModal = screen.queryByRole("dialog");
    expect(detailModal).not.toBeInTheDocument();
    expect(props.onOpenToNewTab).toBeCalledTimes(1);

    await user.keyboard("{Control>}");
    await user.click(name);

    expect(detailModal).not.toBeInTheDocument();
    expect(props.onOpenToNewTab).toBeCalledTimes(2);
  });

  it(`reloads data`, async () => {
    const { user, props, view } = await setup();

    const menuBtn = view.getUu5WrapperMenu();
    await user.click(menuBtn);
    const reloadBtn = screen.getByRole("menuitem", { name: lsi.reloadData });
    await user.click(reloadBtn);

    expect(props.jokesDataObject.handlerMap.load).toHaveBeenCalledTimes(1);
    expect(props.jokeDataObject.handlerMap.load).toHaveBeenCalledTimes(1);
    expect(props.preferenceDataObject.handlerMap.load).toHaveBeenCalledTimes(1);
  });

  it(`reloads data with error`, async () => {
    const props = getDefaultProps();

    DetailView.logger.error = jest.fn();
    props.jokesDataObject.handlerMap.load.mockImplementation(() => {
      throw new UuJokesError("baseNetworkError", "Test update error");
    });

    const { user, view } = await setup(props);

    const menuBtn = view.getUu5WrapperMenu();
    await user.click(menuBtn);
    const reloadBtn = screen.getByRole("menuitem", { name: lsi.reloadData });
    await user.click(reloadBtn);

    expect(screen.getByText(enLsi.Errors.baseNetworkError)).toBeVisible();
    expect(DetailView.logger.error).toHaveBeenCalledTimes(1);
    expect(DetailView.logger.error.mock.lastCall).toMatchSnapshot();
  });

  it(`adds rating`, async () => {
    const { user, props, view } = await setup();

    const ratingBtn = view.getUu5Rating();
    await user.click(ratingBtn);

    expect(props.jokeDataObject.handlerMap.addRating).toHaveBeenCalledTimes(1);
  });

  it(`adds rating with error`, async () => {
    const { user, props, view } = await setup();

    DetailView.logger.error = jest.fn();
    const errorCode = "uu-jokes-main/joke/addRating/userNotAuthorized";
    props.jokeDataObject.handlerMap.addRating.mockImplementation(() => {
      throw new UuJokesError(errorCode, "Test rating error");
    });

    const ratingBtn = view.getUu5Rating();
    await user.click(ratingBtn);

    expect(screen.getByText(enLsi.Errors[errorCode])).toBeVisible();
    expect(DetailView.logger.error).toHaveBeenCalledTimes(1);
    expect(DetailView.logger.error.mock.lastCall).toMatchSnapshot();
    expect(props.jokeDataObject.handlerMap.addRating).toHaveBeenCalledTimes(1);
  });

  it(`publishes joke`, async () => {
    const { user, props } = await setup();

    const publishBtn = screen.getByRole("button", { name: lsi.show });
    await user.click(publishBtn);

    expect(props.jokeDataObject.handlerMap.updateVisibility).toHaveBeenCalledTimes(1);
  });

  it(`unpublishes joke`, async () => {
    const props = getDefaultProps();
    props.jokeDataObject.data.visibility = true;

    const { user } = await setup(props);

    const unpublishBtn = screen.getByRole("button", { name: lsi.hide });
    await user.click(unpublishBtn);

    expect(props.jokeDataObject.handlerMap.updateVisibility).toHaveBeenCalledTimes(1);
  });

  it(`publishes joke with error`, async () => {
    const { user, props } = await setup();

    DetailView.logger.error = jest.fn();
    const errorCode = "baseNetworkError";
    props.jokeDataObject.handlerMap.updateVisibility.mockImplementation(() => {
      throw new UuJokesError(errorCode, "Test update visibility error");
    });

    const publishBtn = screen.getByRole("button", { name: lsi.show });
    await user.click(publishBtn);

    expect(screen.getByText(enLsi.Errors[errorCode])).toBeVisible();
    expect(DetailView.logger.error).toHaveBeenCalledTimes(1);
    expect(DetailView.logger.error.mock.lastCall).toMatchSnapshot();
    expect(props.jokeDataObject.handlerMap.updateVisibility).toHaveBeenCalledTimes(1);
  });

  it(`copies component`, async () => {
    const { user, props, view } = await setup();
    const clipboardSpy = jest.spyOn(Utils.Clipboard, "write");
    props.onCopyComponent.mockImplementationOnce(() => "<div>Test</div>");

    const menuBtn = view.getUu5WrapperMenu();
    await user.click(menuBtn);
    const copyBtn = screen.getByRole("menuitem", { name: lsi.copyComponent });
    await user.click(copyBtn);

    expect(screen.getByText(lsi.copyComponentSuccess)).toBeVisible();
    expect(props.onCopyComponent).toBeCalledTimes(1);
    expect(clipboardSpy.mock.lastCall[0]).toBe("<div>Test</div>");
  });

  it(`checks some actions are hidden until data are loaded`, async () => {
    const jokeDataObject = {
      state: "pendingNoData",
      data: null,
    };
    const props = { ...getDefaultProps(), jokeDataObject };

    const { user, view } = await setup(props);

    const menuBtn = view.getUu5WrapperMenu();
    await user.click(menuBtn);

    expect(screen.queryByRole("button", { name: lsi.show })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: lsi.update })).not.toBeInTheDocument();
    expect(screen.queryByRole("menuitem", { name: lsi.configure })).not.toBeInTheDocument();
    expect(screen.queryByRole("menuitem", { name: lsi.reloadData })).toBeVisible();
    expect(screen.queryByRole("menuitem", { name: lsi.copyComponent })).toBeVisible();
  });

  it("checks actions availability according permissions", async () => {
    const jokesPermission = {
      joke: {
        canAddRating: () => false,
        canManage: () => false,
        canUpdateVisibility: () => false,
      },
    };
    const props = { ...getDefaultProps(), jokesPermission };
    await setup(props);

    expect(screen.queryByRole("button", { name: lsi.show })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: lsi.update })).not.toBeInTheDocument();
  });
});
