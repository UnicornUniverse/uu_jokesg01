//@@viewOn:imports
import UU5 from "uu5g04";
// FIXME MFA Refactor form
import { createVisualComponent, PropTypes, useLsiValues, Lsi } from "uu5g05";
import UuP from "uu_pg01";
import Config from "./config/config";
import { Error } from "../../core/core";
import LsiData from "./state-modal-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "StateModal",
  //@@viewOff:statics
};

export const StateModal = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    jokesDataObject: PropTypes.object.isRequired,
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
      try {
        // The modal window remains opened during operation and shows possible errors
        // in local alertBus of the form (pessimistic approach). The parent component
        // is responsible to close modal window after operation has been successfuly done
        // and show some global success alert if needed.
        await props.jokesDataObject.handlerMap.setState({ state: opt.values.state });
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

    //@@viewOff:private

    //@@viewOn:render
    function renderOptions() {
      return Config.JOKES_STATE_LIST.map((state) => {
        const content = <UuP.Bricks.State stateType={state.uuBmlState} stateName={state.code} type={"button"} />;
        return <UU5.Forms.Select.Option value={state.code} content={content} key={state.code} allowedTags={["span"]} />;
      });
    }

    const header = <UU5.Forms.ContextHeader content={<Lsi lsi={LsiData.header} />} info={<Lsi lsi={LsiData.info} />} />;

    const footer = <UU5.Forms.ContextControls buttonSubmitProps={{ content: <Lsi lsi={LsiData.submit} /> }} />;

    // All form inputs MUST be set as uncontrolled to hold content during componen't update (React update).
    // For example, when there is error during server call everything from provider to this form is re-rendered
    // to have chance properly show error details and allow user to try it again.
    return (
      <UU5.Forms.ContextModal
        header={header}
        footer={footer}
        shown={props.shown}
        offsetTop="auto"
        location="portal"
        overflow
        onClose={props.onCancel}
      >
        <UU5.Forms.ContextForm
          onSave={handleSave}
          onSaveDone={() => props.onSaveDone()}
          onSaveFail={() => {}}
          onCancel={props.onCancel}
        >
          <UU5.Forms.Select
            value={props.jokesDataObject.data.state}
            label={inputLsi.name}
            name="state"
            controlled={false}
            popoverLocation="portal"
          >
            {renderOptions()}
          </UU5.Forms.Select>
        </UU5.Forms.ContextForm>
      </UU5.Forms.ContextModal>
    );
    //@@viewOff:render
  },
});

//viewOn:helpers

//viewOff:helpers
export default StateModal;
