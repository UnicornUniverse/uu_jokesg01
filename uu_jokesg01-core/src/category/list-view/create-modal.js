//@@viewOn:imports
import { createVisualComponent, Utils, PropTypes, Lsi, useLsiValues } from "uu5g05";
import { Modal } from "uu5g05-elements";
import { Form, FormText, SubmitButton, CancelButton } from "uu5g05-forms";
import { getErrorLsi } from "../../errors/errors";
import Config from "./config/config";
import CategoryErrorsLsi from "../list-errors-lsi";
import LsiData from "./create-modal-lsi";
//@@viewOff:imports

export const CreateModal = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "CreateModal",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    categoryDataList: PropTypes.object.isRequired,
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
        const category = await props.categoryDataList.handlerMap.create(event.data.value);
        props.onSaveDone(category);
      } catch (error) {
        console.error(error);
        throw new Utils.Error.Message(getErrorLsi(error, CategoryErrorsLsi));
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
          <Form.View>
            <FormText
              label={inputLsi.name}
              name="name"
              inputAttrs={{ maxLength: 255 }}
              className={formInputCss}
              required
            />
            {
              // ISSUE Uu5Forms - No alternative for UU5.Forms.IconPicker
              // https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=61ed102d57296100296a07d9
            }
            <FormText label={inputLsi.icon} name="icon" className={formInputCss} />
          </Form.View>
        </Modal>
      </Form.Provider>
    );
    //@@viewOff:render
  },
});

export default CreateModal;
