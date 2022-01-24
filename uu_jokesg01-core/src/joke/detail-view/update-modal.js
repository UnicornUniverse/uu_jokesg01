//@@viewOn:imports
import { createVisualComponent, PropTypes, Lsi, useLsiValues, useState } from "uu5g05";
import { Modal, Button } from "uu5g05-elements";
import { Form, FormText, FormTextArea, FormSelect, FormFile, SubmitButton } from "uu5g05-forms";
import { Error } from "../../core/core";
import PreventLeaveController from "../../core/prevent-leave-controller";
import Config from "./config/config";
import LsiData from "./update-modal-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "UpdateModal",
  //@@viewOff:statics
};

export const UpdateModal = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    jokeDataObject: PropTypes.object.isRequired,
    categoryList: PropTypes.array.isRequired,
    baseUri: PropTypes.string,
    shown: PropTypes.bool,
    onSaveDone: PropTypes.func,
    onCancel: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    categoryList: [],
    shown: false,
    onSaveDone: () => {},
    onCancel: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const inputLsi = useLsiValues(LsiData);
    const [error, setError] = useState();
    const isPending = props.jokeDataObject.state === "pending";

    async function handleSubmit(event) {
      const values = { ...event.data.value };

      if (!values.image) {
        delete values.image;
        values.deleteImage = true;
      }

      try {
        // The modal window remains opened during operation and shows possible errors
        // (pessimistic approach). The parent component is responsible to close modal
        // window after operation has been successfuly done and show some global success
        // alert if needed.
        error && setError(null);
        await props.jokeDataObject.handlerMap.update({ id: props.jokeDataObject.data.id, ...values });
        props.onSaveDone(joke);
      } catch (error) {
        console.error(error);
        // ISSUE Uu5Forms.Form - Doesn't support user-friendly errors
        // https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=61ed0efc57296100296a0785
        //throw e;
        setError(error);
      }
    }

    // ISSUE Uu5Forms - FormInputs dont support validation against other form input values
    // https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=61ed2ddf57296100296a09d7
    function handleValidate(event) {
      const { text, image } = event.data.value;

      if (!text && !image) {
        return {
          message: LsiData.textOrFile,
        };
      }
    }

    function getCategoryItemList() {
      return props.categoryList.map((category) => {
        return { value: category.id, children: category.name };
      });
    }
    //@@viewOff:private

    //@@viewOn:render
    const joke = props.jokeDataObject.data;
    const formInputCss = Config.Css.css`margin-bottom:16px`;

    return (
      <PreventLeaveController onConfirmLeave={props.onCancel}>
        {({ handleChange, handleClose }) => (
          <Modal header={<Lsi lsi={LsiData.header} />} info={<Lsi lsi={LsiData.info} />} open={props.shown}>
            {error && <Error errorData={error} className={formInputCss} />}
            <Form onSubmit={handleSubmit} onValidate={handleValidate}>
              <FormText
                label={inputLsi.name}
                name="name"
                value={joke.name}
                inputAttrs={{ maxLength: 255 }}
                onBlur={handleChange}
                className={formInputCss}
                required
              />

              <FormSelect
                label={inputLsi.category}
                name="categoryIdList"
                value={joke.categoryIdList}
                itemList={getCategoryItemList()}
                className={formInputCss}
                multiple
              />

              {/* FIXME MFA Create image File and pass as the value */}
              <FormFile
                label={inputLsi.image}
                name="image"
                value={joke.imageFile}
                accept="image/*"
                className={formInputCss}
              />

              <FormTextArea
                label={inputLsi.text}
                name="text"
                value={joke.text}
                inputAttrs={{ maxLength: 4000 }}
                className={formInputCss}
                rows={10}
                autoResize
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

export default UpdateModal;
