import UuJokes from "uu_jokesg01";
import { VisualComponent, Test } from "uu5g05-test";

const { screen, waitFor } = Test;
const oid = "joke-1";

const mockDetail = jest.fn((props) => <div data-testid={props.testId} />);
jest.mock("uu_jokesg01-core", () => {
  const originalModule = jest.requireActual("uu_jokesg01-core");

  const Joke = {
    ...originalModule.Joke,
    Detail: (props) => mockDetail(props),
  };

  return {
    ...originalModule,
    Joke,
  };
});

function getDefaultProps() {
  return { oid: "joke-1" };
}

async function setup(props, options) {
  mockDetail.mockClear();
  return VisualComponent.setup(UuJokes.Joke.Detail, { ...getDefaultProps(), ...props }, options);
}

describe(`UuJokes.Joke.Detail`, () => {
  it(`default props`, async () => {
    await setup();

    expect(mockDetail).toBeCalledWith(
      expect.objectContaining({
        oid,
      })
    );
  });

  it(`editMode is defined`, async () => {
    const editMode = { edit: true, onReady: jest.fn(), onEditEnd: jest.fn(), onCancel: jest.fn() };
    const props = { ...getDefaultProps(), editMode };
    await setup(props);
    await waitFor(() => expect(screen.getByText("Edit Joke.Detail")).toBeVisible());
  });
});
