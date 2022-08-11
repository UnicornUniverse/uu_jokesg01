import { mount } from "uu5g05-test";
import UuJokes from "uu_jokesg01";

const oid = "joke-1";

let mockDetail;
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

beforeEach(() => {
  mockDetail = jest.fn();
});

describe(`UuJokes.Joke.Detail`, () => {
  it(`default props`, () => {
    mount(<UuJokes.Joke.Detail oid={oid} />);

    expect(mockDetail).toBeCalledWith(
      expect.objectContaining({
        oid,
      })
    );
  });
});
