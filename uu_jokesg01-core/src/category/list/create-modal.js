//@@viewOn:imports
import { createVisualComponent, Utils, PropTypes, useLsi, Lsi } from "uu5g05";
import { Form, FormText, FormIcon, SubmitButton, CancelButton } from "uu5g05-forms";
import { Modal } from "uu5g05-elements";
import Category from "../../utils/category";
import Config from "./config/config";
import importLsi from "../../lsi/import-lsi";
//@@viewOff:imports

export const CreateModal = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "CreateModal",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    onSubmit: PropTypes.func.isRequired,
    onSubmitted: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render({ onSubmit, onSubmitted, onCancel, ...propsToPass }) {
    //@@viewOn:private
    const categoryLsi = useLsi(importLsi, [Category.APP_TYPE]);
    const viewLsi = useLsi(importLsi, [CreateModal.uu5Tag]);

    const { elementProps } = Utils.VisualComponent.splitProps(propsToPass);
    //@@viewOff:private

    //@@viewOn:render
    const formControls = (
      <div className={Config.Css.css({ display: "flex", gap: 8, justifyContent: "flex-end" })}>
        <CancelButton onClick={onCancel}>{viewLsi.cancel}</CancelButton>
        <SubmitButton>{viewLsi.submit}</SubmitButton>
      </div>
    );

    return (
      <Form.Provider onSubmit={onSubmit} onSubmitted={onSubmitted} lsiError={{ import: importLsi, path: ["Errors"] }}>
        <Modal {...elementProps} header={viewLsi.header} info={<Lsi lsi={viewLsi.info} />} footer={formControls} open>
          <Form.View gridLayout="name icon">
            <FormText name="name" label={categoryLsi.keys.name} inputAttrs={{ maxLength: 255 }} autoFocus required />
            <FormIcon name="icon" label={categoryLsi.keys.icon} />
          </Form.View>
        </Modal>
      </Form.Provider>
    );
    //@@viewOff:render
  },
});

export default CreateModal;
