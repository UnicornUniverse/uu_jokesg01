import { omitConsoleLogs } from "uu5g05-test";
import { render, screen, userEvent } from "../../tools";
import PreferenceModal from "../../../src/joke/detail-view/preference-modal";
import { UuJokesError } from "../../../src/errors/errors";
import enLsi from "../../../src/lsi/en.json";

const lsi = enLsi[PreferenceModal.uu5Tag];

function getDefaultProps() {
  const preferenceDataObject = {
    state: "ready",
    data: {
      showAuthor: true,
      showCategories: true,
      showCreationTime: true,
      disableUserPreferences: false,
    },
    handlerMap: {
      save: jest.fn(),
    },
  };

  return { preferenceDataObject, onSaveDone: jest.fn(), onCancel: jest.fn(), shown: true };
}

function setup() {
  // ISSUE - uu5g05 - Uu5Forms.Form.View - invalid propTypes of Lsi
  // https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=62f67d7f0b17bf002af36cfc
  omitConsoleLogs(
    "Warning: Failed prop type: Invalid prop `lsi` of type `string` supplied to `Uu5g05.Lsi`, expected `object`"
  );

  global.URL.createObjectURL = jest.fn();

  const user = userEvent.setup();
  const props = getDefaultProps();
  const view = render(<PreferenceModal {...props} />);

  const submitBtn = screen.getByRole("button", { name: lsi.submit });
  const cancelBtn = screen.getByRole("button", { name: lsi.cancel });

  const inputs = {
    showAuthor: view.getFormCheckbox(lsi.showAuthor),
    showCategories: view.getFormCheckbox(lsi.showCategories),
    showCreationTime: view.getFormCheckbox(lsi.showCreationTime),
  };

  return { user, props, submitBtn, cancelBtn, inputs };
}

describe(`UuJokesCore.Joke.DetailView.PreferenceModal`, () => {
  it("submits form without changes", async () => {
    const { user, props, submitBtn } = setup();

    await user.click(submitBtn);

    expect(props.preferenceDataObject.handlerMap.save).toHaveBeenCalledTimes(1);
    expect(props.preferenceDataObject.handlerMap.save.mock.lastCall[0]).toMatchSnapshot();
    expect(props.onSaveDone).toHaveBeenCalledTimes(1);
  });

  it("submits form with changes", async () => {
    const { user, props, submitBtn, inputs } = setup();

    await user.click(inputs.showAuthor);
    await user.click(inputs.showCategories);
    await user.click(inputs.showCreationTime);
    await user.click(submitBtn);

    expect(props.preferenceDataObject.handlerMap.save).toHaveBeenCalledTimes(1);
    expect(props.preferenceDataObject.handlerMap.save.mock.lastCall[0]).toMatchSnapshot();
    expect(props.onSaveDone).toHaveBeenCalledTimes(1);
  });

  it("submits form with error", async () => {
    const { user, props, submitBtn } = setup();

    PreferenceModal.logger.error = jest.fn();
    props.preferenceDataObject.handlerMap.save.mockImplementation(() => {
      throw new UuJokesError("baseNetworkError", "Test save error");
    });

    await user.click(submitBtn);

    //expect(screen.getByText(enLsi.Errors.baseError)).toBeVisible();
    expect(PreferenceModal.logger.error.mock.lastCall).toMatchSnapshot();
    expect(props.preferenceDataObject.handlerMap.save).toHaveBeenCalledTimes(1);
    expect(props.onSaveDone).toHaveBeenCalledTimes(0);
  });

  it("cancels form", async () => {
    const { user, props, cancelBtn } = setup();

    await user.click(cancelBtn);

    expect(props.preferenceDataObject.handlerMap.save).toHaveBeenCalledTimes(0);
    expect(props.onCancel).toHaveBeenCalledTimes(1);
  });
});
