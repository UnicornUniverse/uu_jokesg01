//@@viewOn:imports
import { createVisualComponent, PropTypes, Lsi, Utils } from "uu5g05";
import { Modal } from "uu5g05-elements";
import { Form, FormText, FormTextArea, FormSelect, FormFile, SubmitButton, CancelButton } from "uu5g05-forms";
import { getErrorLsi } from "../../errors/errors";
import Config from "../config/config";
import JokeErrorsLsi from "../errors-lsi";
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

        const joke = await props.jokeDataList.handlerMap.create(values);
        props.onSaveDone(joke);
      } catch (error) {
        console.error(error);
        throw new Utils.Error.Message(getErrorLsi(error, JokeErrorsLsi));
      }
    }

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
              inputAttrs={{ maxLength: 255 }}
              className={formInputCss}
              required
              autoFocus
            />

            <FormSelect
              label={LsiData.category}
              name="categoryIdList"
              itemList={getCategoryItemList()}
              className={formInputCss}
              multiple
            />

            <FormFile label={LsiData.image} name="image" accept="image/*" className={formInputCss} />

            <FormTextArea
              label={LsiData.text}
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
