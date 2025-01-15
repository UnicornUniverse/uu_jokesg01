//@@viewOn:imports
import { createVisualComponent, Utils, PropTypes, useLsi, Lsi } from "uu5g05";
import { Form, FormText, FormIcon, SubmitButton, CancelButton } from "uu5g05-forms";
import { Modal } from "uu5g05-elements";
import Category from "../../utils/category";
import Config from "./config/config";
import importLsi from "../../lsi/import-lsi";
//@@viewOff:imports

export const UpdateModal = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "UpdateModal",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
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

  render({ open, category, onSubmit, onSubmitted, onCancel, ...propsToPass }) {
    //@@viewOn:private
    const categoryLsi = useLsi(importLsi, [Category.APP_TYPE]);
    const viewLsi = useLsi(importLsi, [UpdateModal.uu5Tag]);

    const { elementProps } = Utils.VisualComponent.splitProps(propsToPass);
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
        onSubmit={onSubmit}
        onSubmitted={(event) => event.data.submitResult && onSubmitted(event)}
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
          <Form.View gridLayout="name icon">
            <FormText
              name="name"
              initialValue={category.name}
              label={categoryLsi.keys.name}
              inputAttrs={{ maxLength: 255 }}
              autoFocus
              required
            />
            <FormIcon name="icon" initialValue={category.icon} label={categoryLsi.keys.icon} />
          </Form.View>
        </Modal>
      </Form.Provider>
    );
    //@@viewOff:render
  },
});

export default UpdateModal;
