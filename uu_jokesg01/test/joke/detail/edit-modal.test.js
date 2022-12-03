import { Test, VisualComponent } from "uu5g05-test";
import Detail from "../../../src/joke/detail";
import EditModal from "../../../src/joke/detail/edit-modal";

const { screen } = Test;

const Fallback = jest.fn(() => <div>Loading...</div>);

function getDefaultProps() {
  return {
    componentType: Detail,
    componentProps: { baseUri: "http://localhost", oid: "joke-1" },
    fallback: <Fallback />,
    onSave: jest.fn(),
    onClose: jest.fn(),
    onReady: jest.fn(),
  };
}

async function setup(props, options) {
  Fallback.mockClear();
  return VisualComponent.setup(EditModal, { ...getDefaultProps(), ...props }, options);
}

describe(`UuJokes.Joke.Detail.EditModal`, () => {
  // Fallback test must be first test in test suite!
  // Then EditModalLazy is downloaded, and fallback is not used anymore.
  it(`checks fallback is called`, async () => {
    await setup();
    expect(Fallback).toHaveBeenCalledTimes(1);
  });

  //TODO MFA Fix Uu5Editing.EditModal
  //VisualComponent.testProperties(setup);

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
