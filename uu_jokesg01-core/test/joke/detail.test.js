import { mount } from "uu5g05-test";
import Detail from "../../src/joke/detail.js";

const subAppDataObject = {
  state: "pendingNoData",
  data: null,
};

const systemDataObject = {
  state: "pendingNoData",
  data: null,
};

const jokeDataObject = {
  state: "pendingNoData",
  data: null,
};

const appWorkspace = { isHome: false };

let mockJokesProvider;
jest.mock("../../src/jokes/jokes", () => {
  let Provider = (props) => {
    mockJokesProvider(props);
    return props.children({ subAppDataObject, systemDataObject, appWorkspace });
  };

  let PermissionProvider = (props) => {
    return props.children({});
  };

  return { Provider, PermissionProvider };
});

jest.mock("../../src/joke/detail-view.js", () => (props) => (
  <>
    <button id="copyComponent" onClick={props.onCopyComponent} />
    <button id="openToNewTab" onClick={props.onOpenToNewTab} />
  </>
));

jest.mock("../../src/joke/provider.js", () => {
  let mock = (props) => props.children({ jokeDataObject });
  mock.propTypes = new Proxy(
    {},
    {
      get() {
        return () => null;
      },
    }
  );
  return mock;
});

let mockCreateCopyTag;
let mockRedirectToPlus4UGo;
jest.mock("../../src/utils/utils", () => ({
  createCopyTag: () => mockCreateCopyTag(),
  redirectToPlus4UGo: () => mockRedirectToPlus4UGo(),
}));

beforeEach(() => {
  mockJokesProvider = jest.fn();
  mockCreateCopyTag = jest.fn();
  mockRedirectToPlus4UGo = jest.fn();
});

describe(`UuJokesCore.Joke.Detail`, () => {
  it(`default props`, () => {
    mount(<Detail oid="joke-1" />);
    expect(mockJokesProvider).toHaveBeenCalledTimes(1);
  });

  it("open to new tab", () => {
    const wrapper = mount(<Detail oid="joke-1" />);

    wrapper.find("#openToNewTab").simulate("click");

    expect(mockRedirectToPlus4UGo).toHaveBeenCalledTimes(1);
  });

  it("create copy tag", () => {
    const wrapper = mount(<Detail oid="joke-1" />);

    wrapper.find("#copyComponent").simulate("click");

    expect(mockCreateCopyTag).toHaveBeenCalledTimes(1);
  });
});
