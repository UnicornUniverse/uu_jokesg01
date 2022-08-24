import { omitConsoleLogs } from "uu5g05-test";
import { render, screen, userEvent } from "../../tools";
import UpdateModal from "../../../src/joke/detail-view/update-modal";
import { UuJokesError } from "../../../src/errors/errors";
import enLsi from "../../../src/lsi/en.json";

const lsi = enLsi[UpdateModal.uu5Tag];

function getDefaultProps() {
  const categoryList = [
    { id: "1", name: "Category 1" },
    { id: "2", name: "Category 2" },
    { id: "3", name: "Category 3" },
  ];

  const jokeDataObject = {
    state: "ready",
    data: {
      id: "123",
      name: "Test joke",
      visibility: false,
      text: "Best joke ever",
      image: "image-1",
      imageFile: new File([], "image-1.jpg", { type: "image/jpeg" }),
      ratingCount: 5,
      averageRating: 2.5,
      categoryIdList: ["1", "2"],
      sys: {
        cts: "2020-01-01T00:00:00.000Z",
      },
    },
    handlerMap: {
      update: jest.fn(),
    },
  };

  return { jokeDataObject, categoryList, onSaveDone: jest.fn(), onCancel: jest.fn(), shown: true };
}

function setup() {
  global.URL.createObjectURL = jest.fn();

  const user = userEvent.setup();
  const props = getDefaultProps();
  const view = render(<UpdateModal {...props} />);

  const submitBtn = screen.getByRole("button", { name: lsi.submit });
  const cancelBtn = screen.getByRole("button", { name: lsi.cancel });

  const inputs = {
    name: view.getFormText(lsi.name),
    imageClearBtn: view.getFormFileClearBtn(lsi.image),
    text: view.getFormTextArea(lsi.text),
    category: screen.getByLabelText(lsi.category),
    categoryClearBtn: view.getFormSelectClearBtn(lsi.category),
  };

  return { user, props, submitBtn, cancelBtn, inputs };
}

describe(`UuJokesCore.Joke.DetailView.UpdateModal`, () => {
  it("submits form without changes", async () => {
    const { user, props, submitBtn } = setup();

    await user.click(submitBtn);

    expect(props.jokeDataObject.handlerMap.update).toHaveBeenCalledTimes(1);
    expect(props.jokeDataObject.handlerMap.update.mock.lastCall[0]).toMatchSnapshot();
    expect(props.onSaveDone).toHaveBeenCalledTimes(1);
  });

  it("submits form with changes", async () => {
    const { user, props, submitBtn, inputs } = setup();

    await user.clear(inputs.name);
    await user.type(inputs.name, "Updated name");

    await user.click(inputs.imageClearBtn);

    await user.clear(inputs.text);
    await user.type(inputs.text, "Updated text");

    await user.click(inputs.categoryClearBtn);
    await user.click(inputs.category);
    const item = screen.getByRole("option", { name: "Category 3" });
    await user.click(item);

    await user.click(submitBtn);

    expect(props.jokeDataObject.handlerMap.update).toHaveBeenCalledTimes(1);
    expect(props.jokeDataObject.handlerMap.update.mock.lastCall[0]).toMatchSnapshot();
    expect(props.onSaveDone).toHaveBeenCalledTimes(1);
  });

  it("submits form with error", async () => {
    const { user, props, submitBtn } = setup();

    UpdateModal.logger.error = jest.fn();
    props.jokeDataObject.handlerMap.update.mockImplementation(() => {
      throw new UuJokesError("baseNetworkError", "Test update error");
    });

    await user.click(submitBtn);

    expect(screen.getByText(enLsi.Errors.baseNetworkError)).toBeVisible();
    expect(UpdateModal.logger.error.mock.lastCall).toMatchSnapshot();
    expect(props.jokeDataObject.handlerMap.update).toHaveBeenCalledTimes(1);
    expect(props.onSaveDone).toHaveBeenCalledTimes(0);
  });

  it("stops submition due to invalid text and image", async () => {
    const { user, props, submitBtn, inputs } = setup();

    // ISSUE - uu5g05 - Uu5Forms.Form.View - invalid propTypes of Lsi
    // https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=62f67d7f0b17bf002af36cfc
    omitConsoleLogs(
      "Warning: Failed prop type: Invalid prop `lsi` of type `string` supplied to `Uu5g05.Lsi`, expected `object`"
    );

    await user.click(inputs.imageClearBtn);
    await user.clear(inputs.text);
    await user.click(submitBtn);

    expect(screen.getByText(lsi.textOrFile)).toBeVisible();
    expect(props.jokeDataObject.handlerMap.update).toHaveBeenCalledTimes(0);
    expect(props.onSaveDone).toHaveBeenCalledTimes(0);
  });

  it("cancels form", async () => {
    const { user, props, cancelBtn } = setup();

    await user.click(cancelBtn);

    expect(props.jokeDataObject.handlerMap.update).toHaveBeenCalledTimes(0);
    expect(props.onCancel).toHaveBeenCalledTimes(1);
  });
});
