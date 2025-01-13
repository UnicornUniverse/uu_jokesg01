//@@viewOn:imports
import { createVisualComponent, Utils, PropTypes, useLsi, Lsi } from "uu5g05";
import { Form, SubmitButton, CancelButton, FormSwitchSelect } from "uu5g05-forms";
import { Modal } from "uu5g05-elements";
import Config from "./config/config";
import Joke from "../../utils/joke";
import importLsi from "../../lsi/import-lsi";
//@@viewOff:imports

export const PreferenceModal = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "PreferenceModal",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    preference: PropTypes.object.isRequired,
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

  render({ preference, open, onSubmit, onSubmitted, onCancel, ...propsToPass }) {
    //@@viewOn:private
    const jokeLsi = useLsi(importLsi, [Joke.APP_TYPE]);
    const viewLsi = useLsi(importLsi, [PreferenceModal.uu5Tag]);
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
      <Form.Provider
        initialValue={preference}
        onSubmit={onSubmit}
        onSubmitted={onSubmitted}
        lsiError={{ import: importLsi, path: ["Errors"] }}
      >
        <Modal
          {...elementProps}
          header={viewLsi.header}
          info={<Lsi lsi={viewLsi.info} />}
          footer={formControls}
          open={open}
        >
          <Form.View gridLayout="showAuthor, showCreationTime, showCategories">
            <FormSwitchSelect
              label={jokeLsi.keys.uuIdentity}
              name="showAuthor"
              autoFocus
              itemList={[
                { value: true, children: viewLsi.show },
                { value: false, children: viewLsi.hide },
              ]}
            />
            <FormSwitchSelect
              label={jokeLsi.keys.sys.cts}
              name="showCreationTime"
              itemList={[
                { value: true, children: viewLsi.show },
                { value: false, children: viewLsi.hide },
              ]}
            />
            <FormSwitchSelect
              label={jokeLsi.keys.categoryIdList}
              name="showCategories"
              itemList={[
                { value: true, children: viewLsi.show },
                { value: false, children: viewLsi.hide },
              ]}
            />
          </Form.View>
        </Modal>
      </Form.Provider>
    );
    //@@viewOff:render
  },
});

export default PreferenceModal;
