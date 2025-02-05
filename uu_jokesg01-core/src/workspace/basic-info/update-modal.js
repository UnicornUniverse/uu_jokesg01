//@@viewOn:imports
import { createVisualComponent, Utils, PropTypes, useLsi, Lsi } from "uu5g05";
import { Form, FormText, SubmitButton, CancelButton } from "uu5g05-forms";
import { Modal } from "uu5g05-elements";
import Workspace from "../../utils/workspace";
import Config from "./config/config";
import importLsi from "../../lsi/import-lsi";
//@@viewOff:imports

export const UpdateModal = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "UpdateModal",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    workspace: PropTypes.object.isRequired,
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

  render({ workspace, open, onSubmit, onSubmitted, onCancel, ...propsToPass }) {
    //@@viewOn:private
    const workspaceLsi = useLsi(importLsi, [Workspace.APP_TYPE]);
    const viewLsi = useLsi(importLsi, [UpdateModal.uu5Tag]);
    //@@viewOff:private

    //@@viewOn:render
    const { elementProps } = Utils.VisualComponent.splitProps(propsToPass);

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
          <Form.View gridLayout="name">
            <FormText label={workspaceLsi.keys.name} name="name" initialValue={workspace.name} autoFocus />
          </Form.View>
        </Modal>
      </Form.Provider>
    );
    //@@viewOff:render
  },
});

export default UpdateModal;
