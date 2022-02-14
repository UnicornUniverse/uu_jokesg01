//@@viewOn:imports
import { createVisualComponent, Utils, PropTypes, Lsi, useLsiValues } from "uu5g05";
import { Modal } from "uu5g05-elements";
import { Form, FormText, SubmitButton, CancelButton } from "uu5g05-forms";
import { getErrorLsi } from "../../errors/errors";
import Config from "./config/config";
import JokesErrorsLsi from "../errors-lsi";
import LsiData from "./update-modal-lsi";
//@@viewOff:imports

export const UpdateModal = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "UpdateModal",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    jokesDataObject: PropTypes.object.isRequired,
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
    const inputLsi = useLsiValues(LsiData);

    async function handleSubmit(event) {
      try {
        // The modal window remains opened during operation and shows possible errors
        // (pessimistic approach). The parent component is responsible to close modal
        // window after operation has been successfuly done and show some global success
        // alert if needed.
        await props.jokesDataObject.handlerMap.update({ name: event.data.value.name });
        props.onSaveDone();
      } catch (error) {
        console.error(error);
        throw new Utils.Error.Message(getErrorLsi(error, JokesErrorsLsi));
      }
    }
    //@@viewOff:private

    //@@viewOn:render
    const formInputCss = Config.Css.css`margin-bottom:16px`;

    const formControls = (
      <div className={Config.Css.css({ display: "flex", gap: 8, justifyContent: "flex-end" })}>
        <CancelButton onClick={props.onCancel}>
          <Lsi lsi={LsiData.cancel} />
        </CancelButton>
        <SubmitButton>
          <Lsi lsi={LsiData.submit} />
        </SubmitButton>
      </div>
    );

    return (
      <Form.Provider onSubmit={handleSubmit}>
        <Modal
          header={<Lsi lsi={LsiData.header} />}
          info={<Lsi lsi={LsiData.info} />}
          open={props.shown}
          footer={formControls}
        >
          <Form.View onSubmit={handleSubmit}>
            <FormText
              label={inputLsi.name}
              name="name"
              initialValue={props.jokesDataObject.data.name}
              inputAttrs={{ maxLength: 255 }}
              className={formInputCss}
              required
            />
          </Form.View>
        </Modal>
      </Form.Provider>
    );
    //@@viewOff:render
  },
});

export default UpdateModal;
