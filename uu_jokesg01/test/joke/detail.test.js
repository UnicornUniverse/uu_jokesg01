import UuJokes from "uu_jokesg01";
import { render } from "../tools";

const oid = "joke-1";

const mockDetail = jest.fn();
jest.mock("uu_jokesg01-core", () => {
  const originalModule = jest.requireActual("uu_jokesg01-core");

  const Joke = {
    ...originalModule.Joke,
    Detail: (props) => {
      mockDetail(props);
      return null;
    },
  };

  return {
    ...originalModule,
    Joke,
  };
});

function getDefaultProps() {
  return { oid: "joke-1" };
}

function setup(props = getDefaultProps()) {
  mockDetail.mockClear();

  const view = render(<UuJokes.Joke.Detail {...props} />);
  return { props, view };
}

describe(`UuJokes.Joke.Detail`, () => {
  it(`default props`, () => {
    setup();

    expect(mockDetail).toBeCalledWith(
      expect.objectContaining({
        oid,
      })
    );
  });
});
