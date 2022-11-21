import Uu5Editing from "uu5g05-editing";
import { Test, wait } from "uu5g05-test";
import Detail from "../../../src/joke/detail";
import EditModal from "../../../src/joke/detail/edit-modal";

const { render, screen, userEvent } = Test;

function getDefaultProps() {
  return {
    componentType: Detail,
    componentProps: { baseUri: "http://localhost", oid: "joke-1" },
    onSave: jest.fn(),
    onClose: jest.fn(),
    onReady: jest.fn(),
  };
}

async function setup(props = getDefaultProps()) {
  const user = userEvent.setup();
  const Fallback = jest.fn(() => <div>Loading...</div>);
  const view = render(<EditModal {...props} fallback={<Fallback />} />);
  await wait();
  return { props, view, user, Fallback };
}

describe(`UuJokes.Joke.Detail.EditModal`, () => {
  it(`checks props passed to children`, async () => {
    const spy = jest.spyOn(Uu5Editing, "EditModal");
    const { Fallback } = await setup();

    expect(spy.mock.lastCall[0]).toMatchSnapshot();
    expect(Fallback).toHaveBeenCalledTimes(1);
  });

  it(`opens advanced settings`, async () => {
    const { user } = await setup();

    const advancedSettingsBtn = screen.getByRole("menuitem", { name: "Advanced settings" });
    await user.click(advancedSettingsBtn);

    expect(screen.getByText("Heading size")).toBeVisible();
  });

  it(`saves props`, async () => {
    const { user, props } = await setup();

    const submitBtn = screen.getByRole("button", { name: "Save" });
    await user.click(submitBtn);

    expect(props.onSave).toHaveBeenCalledTimes(1);
  });
});
