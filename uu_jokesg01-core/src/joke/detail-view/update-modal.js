//@@viewOn:imports
import { createVisualComponent, Utils, PropTypes, Lsi } from "uu5g05";
import { Modal } from "uu5g05-elements";
import { Form, FormText, FormTextArea, FormSelect, FormFile, SubmitButton, CancelButton } from "uu5g05-forms";
import { getErrorLsi } from "../../errors/errors";
import Config from "./config/config";
import JokeErrorsLsi from "../errors-lsi";
import LsiData from "./update-modal-lsi";
//@@viewOff:imports

export const UpdateModal = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "UpdateModal",
  //@@viewOff:statics

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
        await props.jokeDataObject.handlerMap.update({ id: props.jokeDataObject.data.id, ...values });
        props.onSaveDone(joke);
      } catch (error) {
        console.error(error);
        throw new Utils.Error.Message(getErrorLsi(error, JokeErrorsLsi));
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
      <Form.Provider onSubmit={handleSubmit} onValidate={handleValidate}>
        <Modal
          header={<Lsi lsi={LsiData.header} />}
          info={<Lsi lsi={LsiData.info} />}
          open={props.shown}
          footer={formControls}
        >
          <Form.View>
            <FormText
              label={LsiData.name}
              name="name"
              initialValue={joke.name}
              inputAttrs={{ maxLength: 255 }}
              className={formInputCss}
              required
            />

            <FormSelect
              label={LsiData.category}
              name="categoryIdList"
              initialValue={joke.categoryIdList}
              itemList={getCategoryItemList()}
              className={formInputCss}
              multiple
            />

            <FormFile
              label={LsiData.image}
              name="image"
              initialValue={joke.imageFile}
              accept="image/*"
              className={formInputCss}
            />

            <FormTextArea
              label={LsiData.text}
              name="text"
              initialValue={joke.text}
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

export default UpdateModal;
