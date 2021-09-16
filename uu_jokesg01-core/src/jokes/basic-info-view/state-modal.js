//@@viewOn:imports
import UU5 from "uu5g04";
import UuP from "uu_pg01";
import { createVisualComponent, useLsiValues } from "uu5g04-hooks";
import Config from "./config/config";
import { Error } from "../../core/core";
import Lsi from "./state-modal-lsi";
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
    jokesDataObject: UU5.PropTypes.object.isRequired,
    shown: UU5.PropTypes.bool,
    onSave: UU5.PropTypes.func,
    onCancel: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    jokeDataObject: undefined,
    shown: false,
    onSave: () => {},
    onCancel: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const inputLsi = useLsiValues(Lsi);

    async function handleSave(opt) {
      try {
        await props.jokesDataObject.handlerMap.setState({ state: opt.values.state });
        opt.component.saveDone();
        props.onSave(props.jokesDataObject);
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

    const header = (
      <UU5.Forms.ContextHeader content={<UU5.Bricks.Lsi lsi={Lsi.header} />} info={<UU5.Bricks.Lsi lsi={Lsi.info} />} />
    );

    const footer = <UU5.Forms.ContextControls buttonSubmitProps={{ content: <UU5.Bricks.Lsi lsi={Lsi.submit} /> }} />;

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
          onSaveDone={() => {}}
          onSaveFail={() => {}}
          onCancel={props.onCancel}
        >
          <UU5.Forms.Select
            value={props.jokesDataObject.data.state}
            label={inputLsi.name}
            name="state"
            controlled={false}
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
