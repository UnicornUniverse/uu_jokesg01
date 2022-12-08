//@@viewOn:imports
import { createVisualComponent, Utils, PropTypes, useLsi, Lsi } from "uu5g05";
import { Modal } from "uu5g05-elements";
import { Form, FormCheckbox, SubmitButton, CancelButton } from "uu5g05-forms";
import { getErrorLsi } from "../../errors/errors";
import Config from "./config/config";
import importLsi from "../../lsi/import-lsi";
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
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const lsi = useLsi(importLsi, [PreferenceModal.uu5Tag]);
    const errorsLsi = useLsi(importLsi, ["Errors"]);

    async function handleSubmit(event) {
      try {
        // The modal window remains opened during operation and shows possible errors
        // (pessimistic approach). The parent component is responsible to close modal
        // window after operation has been successfuly done and show some global success
        // alert if needed.
        await props.preferenceDataObject.handlerMap.save(event.data.value);
        props.onSaveDone();
      } catch (error) {
        PreferenceModal.logger.error("Error while saving preference", error);
        throw new Utils.Error.Message(getErrorLsi(error, errorsLsi), error);
      }
    }
    //@@viewOff:private

    //@@viewOn:render
    const preference = props.preferenceDataObject.data;
    const formInputCss = Config.Css.css`margin-bottom:16px`;

    const formControls = (
      <div className={Config.Css.css({ display: "flex", gap: 8, justifyContent: "flex-end" })}>
        <CancelButton onClick={props.onCancel}>{lsi.cancel}</CancelButton>
        <SubmitButton>{lsi.submit}</SubmitButton>
      </div>
    );

    return (
      <Form.Provider onSubmit={handleSubmit} layout="1:2">
        <Modal header={lsi.header} info={<Lsi lsi={lsi.info} />} open={props.shown} footer={formControls}>
          <Form.View>
            <FormCheckbox
              label={lsi.showCategories}
              name="showCategories"
              initialValue={preference.showCategories}
              className={formInputCss}
              autoFocus
            />
            <FormCheckbox
              label={lsi.showAuthor}
              name="showAuthor"
              initialValue={preference.showAuthor}
              className={formInputCss}
            />
            <FormCheckbox
              label={lsi.showCreationTime}
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
