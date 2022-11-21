import { Client } from "uu_appg01";
import { Test, VisualComponent } from "uu5g05-test";
import Content from "../../../src/joke/detail-view/content.js";

const { screen } = Test;

function getDefaultProps() {
  const jokeDataObject = {
    state: "ready",
    data: {
      id: "123",
      name: "Test joke",
      visibility: false,
      text: "Best joke ever",
      imageUrl: "https://via.placeholder.com/300x300",
      image: "1234",
      ratingCount: 5,
      averageRating: 2.5,
      categoryIdList: ["1", "2"],
      categoryList: [
        { id: "1", name: "Category 1" },
        { id: "2", name: "Category 2" },
      ],
      uuIdentity: "9-9",
      uuIdentityName: "Test User",
      sys: {
        cts: "2020-01-01T00:00:00.000Z",
      },
    },
  };

  const jokesPermission = {
    joke: {
      canAddRating: () => true,
      canManage: () => true,
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

  const parentStyle = {
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 8,
    paddingBottom: 8,
  };
  return { jokeDataObject, parentStyle, jokesPermission, preferenceDataObject, onAddRating: jest.fn() };
}

async function setup(props, options) {
  Client.get.mockImplementationOnce(() => ({ data: {} })); // personCard/load
  return VisualComponent.setup(Content, { ...getDefaultProps(), ...props }, options);
}

describe(`UuJokesCore.Joke.DetailView.Content`, () => {
  // TODO MFA Fix data-testid
  // VisualComponent.testProperties(setup);

  it(`renders joke and check content`, async () => {
    const { props } = await setup();
    const joke = props.jokeDataObject.data;

    expect(screen.getByText(joke.text)).toBeVisible();
  });

  it(`rates the joke`, async () => {
    const { user, view, props } = await setup();

    // eslint-disable-next-line testing-library/no-container
    const rating = view.container.querySelector(".mdi-star");
    await user.click(rating);

    expect(props.onAddRating).toHaveBeenCalledTimes(1);
  });

  it(`checks rating can't be added without permission`, async () => {
    const props = getDefaultProps();
    props.jokesPermission.joke.canAddRating = () => false;
    const { user, view } = await setup(props);

    // eslint-disable-next-line testing-library/no-container
    const rating = view.container.querySelector(".mdi-star");
    await user.click(rating);

    expect(props.onAddRating).toHaveBeenCalledTimes(0);
  });
});
