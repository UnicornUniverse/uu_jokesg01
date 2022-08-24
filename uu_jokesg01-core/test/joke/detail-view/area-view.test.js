import { render } from "../../tools";
import AreaView from "../../../src/joke/detail-view/area-view.js";

const mockContent = jest.fn(() => null);
jest.mock("../../../src/joke/detail-view/content.js", () => (props) => mockContent(props));

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
  return { jokesDataObject, jokesPermission, jokeDataObject, awscDataObject, preferenceDataObject };
}

function setup(props = getDefaultProps()) {
  mockContent.mockClear();
  render(<AreaView {...props} />);
  return { props };
}

describe(`UuJokesCore.Joke.DetailView.AreaView`, () => {
  it(`passes right data to Content`, async () => {
    setup();

    expect(mockContent).toBeCalledTimes(1);
    expect(mockContent.mock.lastCall[0]).toMatchSnapshot();
  });

  it(`logs preference loading error`, async () => {
    const defaultProps = getDefaultProps();

    const preferenceDataObject = {
      state: "readyNoData",
      data: null,
      handlerMap: {
        load: jest.fn(() => {
          throw new Error("Test error :-)");
        }),
      },
    };

    const props = { ...defaultProps, preferenceDataObject };
    AreaView.logger.error = jest.fn();

    setup(props);

    expect(AreaView.logger.error.mock.lastCall[0]).toMatchSnapshot();
  });
});
