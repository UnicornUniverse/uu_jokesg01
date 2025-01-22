//@@viewOn:imports
import { createVisualComponent, Utils, PropTypes, useLsi, Lsi } from "uu5g05";
import { Form, FormText, FormTextArea, SubmitButton, CancelButton } from "uu5g05-forms";
import { FormImageInput } from "uu5imagingg01";
import { Modal } from "uu5g05-elements";
import { FormSelect as FormCategorySelect } from "../../category/select";
import Config from "./config/config";
import Joke from "../../utils/joke";
import importLsi from "../../lsi/import-lsi";
//@@viewOff:imports

export const UpdateModal = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "UpdateModal",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    joke: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onSubmitted: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    open: PropTypes.bool,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    open: false,
  },
  //@@viewOff:defaultProps

  render({ joke, open, onSubmit, onSubmitted, onCancel, ...propsToPass }) {
    //@@viewOn:private
    const jokeLsi = useLsi(importLsi, [Joke.APP_TYPE]);
    const viewLsi = useLsi(importLsi, [UpdateModal.uu5Tag]);
    const { elementProps } = Utils.VisualComponent.splitProps(propsToPass);

    async function handleSubmit(event) {
      const values = { ...event.data.value };

      // Form with image is sent as multipart/form-data by AppClient
      // The empty array can't be sent in such a case and placeholder must be used
      if (!values.categoryIdList) {
        values.categoryIdList = "[]";
      }

      if (!values.image) {
        delete values.image;
        values.deleteImage = true;
      }

      return onSubmit(new Utils.Event({ value: values }, event));
    }

    function handleValidate(event) {
      const { text, image } = event.data.value;

      if (!text && !image) {
        return {
          message: viewLsi.textOrFile,
        };
      }
    }
    //@@viewOff:private

    //@@viewOn:render
    const formControls = (
      <div className={Config.Css.css({ display: "flex", gap: 8, justifyContent: "flex-end" })}>
        <CancelButton onClick={onCancel}>{viewLsi.cancel}</CancelButton>
        <SubmitButton icon="uugds-check">{viewLsi.submit}</SubmitButton>
      </div>
    );

    return (
      <Form.Provider
        onSubmit={handleSubmit}
        onSubmitted={(event) => event.data.submitResult && onSubmitted(event)}
        onValidate={handleValidate}
        lsiError={{ import: importLsi, path: ["Errors"] }}
      >
        <Modal
          {...elementProps}
          header={viewLsi.header}
          info={<Lsi lsi={viewLsi.info} />}
          footer={formControls}
          onClose={onCancel}
          open={open}
        >
          <Form.View gridLayout="name, categoryIdList, image, text">
            <FormText
              name="name"
              label={jokeLsi.keys.name}
              initialValue={joke.name}
              inputAttrs={{ maxLength: 255 }}
              autoFocus
              required
            />

            <FormCategorySelect
              name="categoryIdList"
              label={jokeLsi.keys.categoryIdList}
              initialValue={joke.categoryIdList}
              initialList={joke.categoryList}
              multiple
            />

            <FormImageInput label={jokeLsi.keys.image} name="image" initialValue={joke.imageFile} />

            <FormTextArea
              label={jokeLsi.keys.text}
              name="text"
              initialValue={joke.text}
              inputAttrs={{ maxLength: 4000 }}
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
