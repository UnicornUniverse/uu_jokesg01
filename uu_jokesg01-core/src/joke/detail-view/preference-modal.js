//@@viewOn:imports
import { createVisualComponent, Utils, PropTypes, Lsi } from "uu5g05";
import { Modal } from "uu5g05-elements";
import { Form, FormCheckbox, SubmitButton, CancelButton } from "uu5g05-forms";
import { getErrorLsi } from "../../errors/errors";
import Config from "./config/config";
import PreferenceErrorsLsi from "../../preference/errors-lsi";
import LsiData from "./preference-modal-lsi";
//@@viewOff:imports

export const PreferenceModal = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "PreferenceModal",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    preferenceDataObject: PropTypes.object.isRequired,
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
    async function handleSubmit(event) {
      try {
        // The modal window remains opened during operation and shows possible errors
        // (pessimistic approach). The parent component is responsible to close modal
        // window after operation has been successfuly done and show some global success
        // alert if needed.
        await props.preferenceDataObject.handlerMap.save(event.data.value);
        props.onSaveDone();
      } catch (error) {
        console.error(error);
        throw new Utils.Error.Message(getErrorLsi(error, PreferenceErrorsLsi), error);
      }
    }
    //@@viewOff:private

    //@@viewOn:render
    const preference = props.preferenceDataObject.data;
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
      <Form.Provider onSubmit={handleSubmit} layout="1:2">
        <Modal
          header={<Lsi lsi={LsiData.header} />}
          info={<Lsi lsi={LsiData.info} />}
          open={props.shown}
          footer={formControls}
        >
          <Form.View>
            <FormCheckbox
              label={LsiData.showCategories}
              name="showCategories"
              initialValue={preference.showCategories}
              className={formInputCss}
              autoFocus
            />
            <FormCheckbox
              label={LsiData.showAuthor}
              name="showAuthor"
              initialValue={preference.showAuthor}
              className={formInputCss}
            />
            <FormCheckbox
              label={LsiData.showCreationTime}
              name="showCreationTime"
              initialValue={preference.showCreationTime}
              className={formInputCss}
            />
          </Form.View>
        </Modal>
      </Form.Provider>
    );
    //@@viewOff:render
  },
});

export default PreferenceModal;
