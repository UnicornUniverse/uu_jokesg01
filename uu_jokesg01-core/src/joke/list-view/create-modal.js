//@@viewOn:imports
import { createVisualComponent, PropTypes, useLsi, Lsi, Utils } from "uu5g05";
import { Modal } from "uu5g05-elements";
import { Form, FormText, FormTextArea, FormFile, SubmitButton, CancelButton } from "uu5g05-forms";
import { getErrorLsi } from "../../errors/errors";
import CategorySelect from "../../category/form-select";
import Config from "./config/config";
import importLsi from "../../lsi/import-lsi";
//@@viewOff:imports

export const CreateModal = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "CreateModal",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    jokeDataList: PropTypes.object.isRequired,
    baseUri: PropTypes.string,
    shown: PropTypes.bool,
    onSaveDone: PropTypes.func,
    onCancel: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    shown: false,
    onSaveDone: () => {},
    onCancel: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const lsi = useLsi(importLsi, [CreateModal.uu5Tag]);
    const errorsLsi = useLsi(importLsi, ["Errors"]);

    async function handleSubmit(event) {
      try {
        // The modal window remains opened during operation and shows possible errors
        // (pessimistic approach). The parent component is responsible to close modal
        // window after operation has been successfuly done and show some global success
        // alert if needed.
        const joke = await props.jokeDataList.handlerMap.create(event.data.value);
        props.onSaveDone(joke);
      } catch (error) {
        CreateModal.logger.error("Error submitting form", error);
        throw new Utils.Error.Message(getErrorLsi(error, errorsLsi), error);
      }
    }

    function handleValidate(event) {
      const { text, image } = event.data.value;

      if (!text && !image) {
        return {
          message: lsi.textOrFile,
        };
      }
    }
    //@@viewOff:private

    //@@viewOn:render
    const formInputCss = Config.Css.css`margin-bottom:16px`;

    const formControls = (
      <div className={Config.Css.css({ display: "flex", gap: 8, justifyContent: "flex-end" })}>
        <CancelButton onClick={props.onCancel}>{lsi.cancel}</CancelButton>
        <SubmitButton>{lsi.submit}</SubmitButton>
      </div>
    );

    return (
      <Form.Provider onSubmit={handleSubmit} onValidate={handleValidate}>
        <Modal header={lsi.header} info={<Lsi lsi={lsi.info} />} open={props.shown} footer={formControls}>
          <Form.View>
            <FormText
              label={lsi.name}
              name="name"
              inputAttrs={{ maxLength: 255 }}
              className={formInputCss}
              required
              autoFocus
            />

            <CategorySelect
              baseUri={props.baseUri}
              label={lsi.category}
              name="categoryIdList"
              className={formInputCss}
              multiple
            />

            <FormFile label={lsi.image} name="image" accept="image/*" className={formInputCss} />

            <FormTextArea
              label={lsi.text}
              name="text"
              inputAttrs={{ maxLength: 4000 }}
              className={formInputCss}
              rows={10}
              autoResize
            />
          </Form.View>
        </Modal>
      </Form.Provider>
    );
    //@@viewOff:render
  },
});

export default CreateModal;
