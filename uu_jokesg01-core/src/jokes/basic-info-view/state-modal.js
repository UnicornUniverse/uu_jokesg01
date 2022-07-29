//@@viewOn:imports
import { createVisualComponent, Utils, PropTypes, useLsi } from "uu5g05";
import { Modal } from "uu5g05-elements";
import { Form, FormSelect, SubmitButton, CancelButton } from "uu5g05-forms";
import UuP from "uu_pg01";
import { getErrorLsi } from "../../errors/errors";
import Config from "./config/config";
import importLsi from "../../lsi/import-lsi";
//@@viewOff:imports

export const StateModal = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "StateModal",
  //@@viewOff:statics

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
    const lsi = useLsi(importLsi, [StateModal.uu5Tag]);
    const errorsLsi = useLsi(importLsi, ["Errors"]);

    async function handleSubmit(event) {
      try {
        // The modal window remains opened during operation and shows possible errors
        // (pessimistic approach). The parent component is responsible to close modal
        // window after operation has been successfuly done and show some global success
        // alert if needed.
        // FIXME MFA Fix error on the server and test
        await props.jokesDataObject.handlerMap.setState({ state: event.data.value.state });
        props.onSaveDone();
      } catch (error) {
        StateModal.logger.error("Error submitting form", error);
        throw new Utils.Error.Message(getErrorLsi(error, importLsi), error);
      }
    }
    //@@viewOff:private

    //@@viewOn:render
    function getStateItemList() {
      return Config.JOKES_STATE_LIST.map((state) => {
        return {
          value: state.code,
          children: <UuP.Bricks.State stateType={state.uuBmlState} stateName={state.code} type="button" />,
        };
      });
    }

    const formInputCss = Config.Css.css`margin-bottom:16px`;

    const formControls = (
      <div className={Config.Css.css({ display: "flex", gap: 8, justifyContent: "flex-end" })}>
        <CancelButton onClick={props.onCancel}>{lsi.cancel}</CancelButton>
        <SubmitButton>{lsi.submit}</SubmitButton>
      </div>
    );

    return (
      <Form.Provider onSubmit={handleSubmit}>
        <Modal header={lsi.header} info={lsi.info} open={props.shown} footer={formControls}>
          <Form.View>
            <FormSelect
              label={lsi.state}
              name="state"
              initialValue={props.jokesDataObject.data.state}
              itemList={getStateItemList()}
              className={formInputCss}
              autoFocus
            />
          </Form.View>
        </Modal>
      </Form.Provider>
    );
    //@@viewOff:render
  },
});

//viewOn:helpers

//viewOff:helpers
export default StateModal;
