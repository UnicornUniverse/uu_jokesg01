import { Client } from "uu_appg01";
import { Test, VisualComponent } from "uu5g05-test";
import { SubAppProvider } from "uu_plus4u5g02";
import Detail from "../../src/joke/detail.js";

const { screen } = Test;

const jokeGet = {
  id: "123",
  name: "Test joke",
  visibility: false,
  text: "Best joke ever",
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
};

const categoryList = [
  { id: "1", name: "Category 1" },
  { id: "2", name: "Category 2" },
];

const workspaceLoad = {
  data: {
    name: "The best IT jokes",
    state: "active",
  },
  sysData: {
    asidData: {
      asid: "asid-1",
    },
    awidData: {
      awid: "awid-1",
    },
    relatedObjectsMap: {
      someUrl: "http:localhost",
    },
    profileData: {
      uuIdentityProfileList: ["Authorities"],
    },
  },
  territoryData: {
    data: {
      artifact: {
        id: "artifact-1",
        uuTerritoryBaseUri: "http://localhost",
      },
    },
  },
};

const preferenceLoadFirst = {
  showAuthors: false,
};

function getDefaultProps() {
  return { baseUri: "https://localhost", oid: "joke-1", uu5Id: "preference-1" };
}

async function setup(props, options) {
  global.URL.createObjectURL = jest.fn();
  global.URL.revokeObjectURL = jest.fn();

  Client.get.mockImplementation((uri) => {
    let dtoOut;

    if (uri.includes("joke/get")) dtoOut = jokeGet;
    else if (uri.includes("category/list")) dtoOut = { itemList: categoryList };
    else if (uri.includes("sys/uuAppWorkspace/load")) dtoOut = workspaceLoad;
    else if (uri.includes("preference/loadFirst")) dtoOut = preferenceLoadFirst;
    else throw new Error(`No mockup found for uri ${uri}`);

    return { data: dtoOut };
  });

  return VisualComponent.setup(Detail, { ...getDefaultProps(), ...props }, options);
}

const mockCreateCopyTag = jest.fn();
const mockRedirectToPlus4UGo = jest.fn();

jest.mock("../../src/utils/utils.js", () => ({
  createCopyTag: () => mockCreateCopyTag(),
  redirectToPlus4UGo: () => mockRedirectToPlus4UGo(),
}));

const mockDetailView = jest.fn();
jest.mock("../../src/joke/detail-view.js", () => (props) => mockDetailView(props));

describe(`UuJokesCore.Joke.Detail`, () => {
  beforeEach(() => {
    mockDetailView.mockReset();
    mockCreateCopyTag.mockReset();
    mockRedirectToPlus4UGo.mockReset();
  });

  it(`checks data are properly passed to DetailView`, async () => {
    mockDetailView.mockImplementation((props) => <div data-testid={props.testId}></div>);

    await setup();

    expect(mockDetailView).toHaveBeenCalled();
    expect(mockDetailView.mock.lastCall[0]).toMatchSnapshot();
  });

  it(`checks the baseUri is properly read from context`, async () => {
    mockDetailView.mockImplementation((props) => <div data-testid={props.testId}></div>);
    const props = { ...getDefaultProps(), baseUri: undefined };
    await setup(props, { Wrapper: SubAppProvider });

    expect(mockDetailView.mock.lastCall[0].baseUri).not.toBeUndefined();
  });

  it("creates copy tag", async () => {
    mockDetailView.mockImplementation((props) => (
      <button data-testid={props.testId} onClick={props.onCopyComponent}>
        Copy component
      </button>
    ));

    const { user } = await setup();

    await user.click(screen.getByRole("button", { name: "Copy component" }));
    expect(mockCreateCopyTag).toHaveBeenCalledTimes(1);
  });

  it("opens component to new tab", async () => {
    mockDetailView.mockImplementation((props) => (
      <button data-testid={props.testId} onClick={props.onOpenToNewTab}>
        Open to new tab
      </button>
    ));

    const { user } = await setup();

    await user.click(screen.getByRole("button", { name: "Open to new tab" }));

    expect(mockRedirectToPlus4UGo).toHaveBeenCalledTimes(1);
  });
});
