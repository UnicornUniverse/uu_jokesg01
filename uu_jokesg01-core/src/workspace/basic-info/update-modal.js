//@@viewOn:imports
import { createVisualComponent, Utils, PropTypes, useLsi, Lsi } from "uu5g05";
import { Form, FormText, SubmitButton, CancelButton, FormSwitchSelect } from "uu5g05-forms";
import { FormRoleGroupIfcSelectAdvanced } from "uu_tg01-forms";
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

  render({ workspace, territoryData, permission, open, onSubmit, onSubmitted, onCancel, ...propsToPass }) {
    //@@viewOn:private
    const workspaceLsi = useLsi(importLsi, [Workspace.APP_TYPE]);
    const viewLsi = useLsi(importLsi, [UpdateModal.uu5Tag]);

    const name = workspace.name;
    const state = workspace.state;
    const responsibleRoleId = territoryData.data.artifact.responsibleRole;
    const territoryBaseUri = territoryData.data.context.territory.uuTerritoryBaseUri;
    const artifactId = territoryData.data.artifact.id;

    function handleSubmit(event) {
      const newEvent = new Utils.Event(
        {
          value: event.data.value,
          prevValue: { name, state, responsibleRoleId },
          context: { territoryBaseUri, artifactId },
        },
        event,
      );

      return onSubmit(newEvent);
    }
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
        onSubmit={handleSubmit}
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
          <Form.View gridLayout="name, state, responsibleRoleId">
            <FormText name="name" label={workspaceLsi.keys.name} initialValue={name} required autoFocus />
            {permission.workspace.canSetState() && (
              <FormSwitchSelect
                name="state"
                label={workspaceLsi.keys.state}
                initialValue={state}
                itemList={Workspace.State.list().map((state) => ({
                  value: state,
                  children: workspaceLsi.state[state],
                }))}
              />
            )}
            <FormRoleGroupIfcSelectAdvanced
              name="responsibleRoleId"
              label={workspaceLsi.artifact.responsibleRole}
              header={viewLsi.responsibleRoleHeader}
              baseUri={territoryBaseUri}
              artifactId={artifactId}
              initialValue={responsibleRoleId}
              required
            />
          </Form.View>
        </Modal>
      </Form.Provider>
    );
    //@@viewOff:render
  },
});

export default UpdateModal;
