import { mount, wait, omitConsoleLogs } from "uu5g05-test";
import AreaView from "../../../src/joke/detail-view/area-view.js";

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

const jokesDataObject = {
  state: "ready",
  data: {
    categoryList: [
      { id: "1", name: "Category 1" },
      { id: "2", name: "Category 2" },
      { id: "3", name: "Category 3" },
    ],
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
};

describe(`UuJokesCore.Joke.DetailView.AreaView`, () => {
  it(`default props`, () => {
    const wrapper = mount(
      <AreaView
        jokesDataObject={jokesDataObject}
        jokeDataObject={jokeDataObject}
        jokesPermission={jokesPermission}
        awscDataObject={awscDataObject}
        preferenceDataObject={preferenceDataObject}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it(`preferences not loaded`, async () => {
    const errorMessage = "Test error :-)";
    const preferenceDataObject = {
      state: "readyNoData",
      data: null,
      handlerMap: {
        load: jest.fn(() => {
          throw new Error(errorMessage);
        }),
      },
    };

    omitConsoleLogs(errorMessage);

    const wrapper = mount(
      <AreaView
        jokesDataObject={jokesDataObject}
        jokeDataObject={jokeDataObject}
        jokesPermission={jokesPermission}
        awscDataObject={awscDataObject}
        preferenceDataObject={preferenceDataObject}
      />
    );

    expect(wrapper).toMatchSnapshot();

    await wait();
    expect(preferenceDataObject.handlerMap.load).toHaveBeenCalledTimes(1);
  });
});
