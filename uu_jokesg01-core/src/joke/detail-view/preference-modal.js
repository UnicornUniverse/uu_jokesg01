//@@viewOn:imports
import UU5 from "uu5g04";
// FIXME MFA Migrate form
import { createVisualComponent, PropTypes, useLsiValues, Lsi } from "uu5g05";
import { Error } from "../../core/core";
import PreventLeaveController from "../../core/prevent-leave-controller";
import Config from "./config/config";
import LsiData from "./preference-modal-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "PreferenceModal",
  //@@viewOff:statics
};

export const PreferenceModal = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    preferenceDataObject: PropTypes.object.isRequired,
    shown: PropTypes.bool,
    onSaveDone: PropTypes.func,
    onCancel: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    shown: false,
    onSaveDone: () => {},
    onCancel: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const inputLsi = useLsiValues(LsiData);

    async function handleSave(opt) {
      const values = { ...opt.values };

      try {
        // The modal window remains opened during operation and shows possible errors
        // in local alertBus of the form (pessimistic approach). The parent component
        // is responsible to close modal window after operation has been successfuly done
        // and show some global success alert if needed.
        await props.preferenceDataObject.handlerMap.save(values);
        opt.component.saveDone();
      } catch (error) {
        console.error(error);
        opt.component.saveFail();
        opt.component.getAlertBus().addAlert({
          content: <Error errorData={error} />,
          colorSchema: "danger",
        });
      }
    }

    function handleReset() {
      props.preferenceDataObject.handlerMap.reset();
    }
    //@@viewOff:private

    //@@viewOn:render
    const preferences = props.preferenceDataObject.data;

    const header = <UU5.Forms.ContextHeader content={<Lsi lsi={LsiData.header} />} info={<Lsi lsi={LsiData.info} />} />;

    const footer = <UU5.Forms.ContextControls buttonSubmitProps={{ content: <Lsi lsi={LsiData.submit} /> }} />;

    // All form inputs MUST be set as uncontrolled to hold content during componen't update (React update).
    // For example, when there is error during server call everything from provider to this form is re-rendered
    // to have chance properly show error details and allow user to try it again.
    return (
      <PreventLeaveController onConfirmLeave={props.onCancel}>
        {({ handleInit, handleClose }) => (
          <UU5.Forms.ContextModal
            header={header}
            footer={footer}
            shown={props.shown}
            offsetTop="auto"
            location="portal"
            onClose={handleClose}
            overflow
          >
            <UU5.Forms.ContextForm
              onSave={handleSave}
              onSaveDone={() => props.onSaveDone()}
              onSaveFail={() => {}}
              onCancel={handleClose}
              onReset={handleReset}
              onInit={handleInit}
            >
              <UU5.Forms.Checkbox
                label={inputLsi.showCategories}
                name="showCategories"
                value={preferences.showCategories}
                bgStyleChecked="filled"
                labelColWidth="xs-6"
                inputColWidth="xs-6"
                controlled={false}
              />
              <UU5.Forms.Checkbox
                label={inputLsi.showAuthor}
                name="showAuthor"
                value={preferences.showAuthor}
                bgStyleChecked="filled"
                labelColWidth="xs-6"
                inputColWidth="xs-6"
                controlled={false}
              />
              <UU5.Forms.Checkbox
                label={inputLsi.showCreationTime}
                name="showCreationTime"
                value={preferences.showCreationTime}
                bgStyleChecked="filled"
                labelColWidth="xs-6"
                inputColWidth="xs-6"
                controlled={false}
              />
            </UU5.Forms.ContextForm>
          </UU5.Forms.ContextModal>
        )}
      </PreventLeaveController>
    );
    //@@viewOff:render
  },
});

export default PreferenceModal;
