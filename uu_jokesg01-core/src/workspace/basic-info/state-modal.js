//@@viewOn:imports
import { createVisualComponent, Utils, PropTypes, useLsi, Lsi } from "uu5g05";
import { Form, FormSelect, SubmitButton, CancelButton } from "uu5g05-forms";
import { Modal } from "uu5g05-elements";
import Workspace from "../../utils/workspace";
import StateBadge from "./state-badge";
import Config from "./config/config";
import importLsi from "../../lsi/import-lsi";
//@@viewOff:imports

export const StateModal = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "StateModal",
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
    const lsi = useLsi(importLsi, [StateModal.uu5Tag]);
    const { elementProps } = Utils.VisualComponent.splitProps(propsToPass);

    function handleSubmit(event) {
      const value = event.data.value.state;
      const newEvent = new Utils.Event({ value }, event);
      return onSubmit(newEvent);
    }
    //@@viewOff:private

    //@@viewOn:render
    const formControls = (
      <div className={Config.Css.css({ display: "flex", gap: 8, justifyContent: "flex-end" })}>
        <CancelButton onClick={onCancel}>{lsi.cancel}</CancelButton>
        <SubmitButton>{lsi.submit}</SubmitButton>
      </div>
    );

    return (
      <Form.Provider
        onSubmit={handleSubmit}
        onSubmitted={onSubmitted}
        lsiError={{ import: importLsi, path: ["Errors"] }}
      >
        <Modal
          {...elementProps}
          header={lsi.header}
          info={<Lsi lsi={lsi.info} />}
          footer={formControls}
          onClose={onCancel}
          open={open}
        >
          <Form.View gridLayout="state">
            <FormSelect
              name="state"
              autoFocus
              initialValue={workspace.state}
              itemList={Workspace.State.list().map((state) => ({
                value: state,
                children: <StateBadge value={state} />,
              }))}
            />
          </Form.View>
        </Modal>
      </Form.Provider>
    );
    //@@viewOff:render
  },
});

export default StateModal;
