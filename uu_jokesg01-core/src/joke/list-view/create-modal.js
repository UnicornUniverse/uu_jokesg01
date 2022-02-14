//@@viewOn:imports
import { createVisualComponent, PropTypes, Lsi, useLsiValues, useState } from "uu5g05";
import { Modal } from "uu5g05-elements";
import { Form, FormText, FormTextArea, FormSelect, FormFile, SubmitButton, CancelButton } from "uu5g05-forms";
import { Error } from "../../core/core";
import PreventLeaveController from "../../core/prevent-leave-controller";
import Config from "../config/config";
import LsiData from "./create-modal-lsi";
//@@viewOff:imports

export const CreateModal = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "CreateModal",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    jokeDataList: PropTypes.object.isRequired,
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

    async function handleSubmit(event) {
      try {
        // The modal window remains opened during operation and shows possible errors
        // (pessimistic approach). The parent component is responsible to close modal
        // window after operation has been successfuly done and show some global success
        // alert if needed.
        const values = { ...event.data.value };

        // ISSUE Plus4U5.Utils.AppClient - Different behaviour for request multiform vs. json
        // https://uuapp.plus4u.net/uu-sls-maing01/558dcc308da34b82bbe044d94074802f/issueDetail?id=61eec09357296100296a8748
        if (values.categoryIdList === undefined) {
          delete values.categoryIdList; // joke/create command supports only non-empty array;
        }

        if (values.text === undefined) {
          delete values.text; // check issue above
        }

        error && setError(null);
        const joke = await props.jokeDataList.handlerMap.create(values);
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
                inputAttrs={{ maxLength: 255 }}
                onBlur={handleChange}
                className={formInputCss}
                required
              />

              <FormSelect
                label={inputLsi.category}
                name="categoryIdList"
                itemList={getCategoryItemList()}
                className={formInputCss}
                multiple
              />

              <FormFile label={inputLsi.image} name="image" accept="image/*" className={formInputCss} />

              <FormTextArea
                label={inputLsi.text}
                name="text"
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
                <CancelButton onClick={handleClose}>
                  <Lsi lsi={LsiData.cancel} />
                </CancelButton>
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

export default CreateModal;
