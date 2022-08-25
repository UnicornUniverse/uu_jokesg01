import { Client } from "uu_appg01";
import { wait } from "uu5g05-test";
import { render, screen, userEvent } from "../tools";
import Detail from "../../src/joke/detail.js";

const jokeGet = {
  id: "joke-1",
};

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

const mockDetailView = jest.fn();
jest.mock("../../src/joke/detail-view.js", () => (props) => {
  mockDetailView(props);
  return (
    <>
      <button onClick={props.onCopyComponent}>Copy component</button>
      <button onClick={props.onOpenToNewTab}>Open to new tab</button>
    </>
  );
});

const mockCreateCopyTag = jest.fn();
const mockRedirectToPlus4UGo = jest.fn();

jest.mock("../../src/utils/utils.js", () => ({
  createCopyTag: () => mockCreateCopyTag(),
  redirectToPlus4UGo: () => mockRedirectToPlus4UGo(),
}));

function getDefaultProps() {
  return { baseUri: "https://localhost", oid: "joke-1", uu5Id: "preference-1" };
}

async function setup(props = getDefaultProps()) {
  global.URL.createObjectURL = jest.fn();
  global.URL.revokeObjectURL = jest.fn();

  mockCreateCopyTag.mockClear();
  mockRedirectToPlus4UGo.mockClear();

  Client.get.mockImplementation((uri, dtoIn) => {
    let dtoOut;

    if (uri.includes("joke/get")) dtoOut = jokeGet;
    else if (uri.includes("sys/uuAppWorkspace/load")) dtoOut = workspaceLoad;
    else if (uri.includes("preference/loadFirst")) dtoOut = preferenceLoadFirst;
    else dtoOut = null;

    return { data: dtoOut };
  });

  const user = userEvent.setup();
  const view = render(<Detail {...props} />);
  await wait();
  return { props, view, user };
}

describe(`UuJokesCore.Joke.Detail`, () => {
  it(`checks data are properly passed to DetailView`, async () => {
    await setup();

    expect(mockDetailView).toHaveBeenCalled();
    expect(mockDetailView.mock.lastCall[0]).toMatchSnapshot();
  });

  it(`checks the baseUri is properly read from context`, async () => {
    const props = { ...getDefaultProps(), baseUri: undefined };
    await setup(props);

    expect(mockDetailView.mock.lastCall[0].baseUri).not.toBeUndefined();
  });

  it("opens component to new tab", async () => {
    const { user } = await setup();

    await user.click(screen.getByRole("button", { name: "Copy component" }));

    expect(mockCreateCopyTag).toHaveBeenCalledTimes(1);
  });

  it("creates copy tag", async () => {
    const { user } = await setup();

    await user.click(screen.getByRole("button", { name: "Open to new tab" }));

    expect(mockRedirectToPlus4UGo).toHaveBeenCalledTimes(1);
  });
});
