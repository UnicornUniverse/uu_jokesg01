//@@viewOn:imports
import { createVisualComponent, PropTypes, Lsi, useLsiValues, useState } from "uu5g05";
import { Modal, Button } from "uu5g05-elements";
import { Form, FormCheckbox, SubmitButton } from "uu5g05-forms";
import { Error } from "../../core/core";
import PreventLeaveController from "../../core/prevent-leave-controller";
import Config from "./config/config";
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
    const inputLsi = useLsiValues(LsiData);
    const [error, setError] = useState();
    const isPending = props.preferenceDataObject.state === "pending";

    async function handleSubmit(event) {
      try {
        // The modal window remains opened during operation and shows possible errors
        // (pessimistic approach). The parent component is responsible to close modal
        // window after operation has been successfuly done and show some global success
        // alert if needed.
        error && setError(null);
        await props.preferenceDataObject.handlerMap.save(event.data.value);
        props.onSaveDone();
      } catch (error) {
        console.error(error);
        // ISSUE Uu5Forms.Form - Doesn't support user-friendly errors
        // https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=61ed0efc57296100296a0785
        //throw e;
        setError(error);
      }
    }
    //@@viewOff:private

    //@@viewOn:render
    const preference = props.preferenceDataObject.data;
    const formInputCss = Config.Css.css`margin-bottom:16px`;

    return (
      <PreventLeaveController onConfirmLeave={props.onCancel}>
        {({ handleChange, handleClose }) => (
          <Modal header={<Lsi lsi={LsiData.header} />} info={<Lsi lsi={LsiData.info} />} open={props.shown}>
            {error && <Error errorData={error} className={formInputCss} />}
            <Form onSubmit={handleSubmit}>
              {/* FIXME MFA Center checkboxes */}
              <FormCheckbox
                label={inputLsi.showCategories}
                name="showCategories"
                value={preference.showCategories}
                onChange={handleChange}
                className={formInputCss}
              />
              <FormCheckbox
                label={inputLsi.showAuthor}
                name="showAuthor"
                value={preference.showAuthor}
                onChange={handleChange}
                className={formInputCss}
              />
              <FormCheckbox
                label={inputLsi.showCreationTime}
                name="showCreationTime"
                value={preference.showCreationTime}
                onChange={handleChange}
                className={formInputCss}
              />
              {
                // ISSUE Uu5Forms - No possibility to add form buttons into modal footer
                // https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=61ed143157296100296a085a
              }
              <div className={Config.Css.css({ display: "flex", gap: 8, justifyContent: "flex-end" })}>
                {
                  // ISSUE Uu5Forms.Form - Missing CancelButton
                  // https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=61ed1c8b57296100296a08d1
                }
                <Button onClick={handleClose} disabled={isPending}>
                  <Lsi lsi={LsiData.cancel} />
                </Button>
                <SubmitButton>
                  <Lsi lsi={LsiData.submit} />
                </SubmitButton>
              </div>
            </Form>
          </Modal>
        )}
      </PreventLeaveController>
    );
    //@@viewOff:render
  },
});

export default PreferenceModal;
