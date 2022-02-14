//@@viewOn:imports
import { createVisualComponent, PropTypes, Lsi, useLsiValues, useState } from "uu5g05";
import { Modal } from "uu5g05-elements";
import { Form, FormCheckbox, SubmitButton, CancelButton } from "uu5g05-forms";
import { Error } from "../../core/core";
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
          {error && <Error errorData={error} className={formInputCss} />}
          <Form.View>
            <FormCheckbox
              label={inputLsi.showCategories}
              name="showCategories"
              initialValue={preference.showCategories}
              className={formInputCss}
            />
            <FormCheckbox
              label={inputLsi.showAuthor}
              name="showAuthor"
              initialValue={preference.showAuthor}
              className={formInputCss}
            />
            <FormCheckbox
              label={inputLsi.showCreationTime}
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
