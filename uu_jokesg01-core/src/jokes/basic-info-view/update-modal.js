//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useLsiValues, useRef } from "uu5g04-hooks";
import Config from "./config/config";
import { Error } from "../../core/core";
import Lsi from "./update-modal-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "UpdateModal",
  //@@viewOff:statics
};

export const UpdateModal = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    jokesDataObject: UU5.PropTypes.object.isRequired,
    shown: UU5.PropTypes.bool,
    onSaveDone: UU5.PropTypes.func,
    onCancel: UU5.PropTypes.func,
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
    const inputLsi = useLsiValues(Lsi);
    const formRef = useRef();
    const confirmModalRef = useRef();
    const initialValues = useRef();

    async function handleSave(opt) {
      try {
        // The modal window remains opened during operation and shows possible errors
        // in local alertBus of the form (pessimistic approach). The parent component
        // is responsible to close modal window after operation has been successfuly done
        // and show some global success alert if needed.
        await props.jokesDataObject.handlerMap.update({ name: opt.values.name });
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

    function handleInit(opt) {
      initialValues.current = opt.component.getValues();
    }

    function handleCancel(opt) {
      handleConfirmClose(opt);
    }

    function handleClose() {
      const formOpt = { component: formRef.current };
      handleConfirmClose(formOpt);
    }

    function handleConfirmClose(opt) {
      const valuesChanged = !UU5.Common.Tools.deepEqual(opt.component.getValues(), initialValues.current);
      if (valuesChanged) {
        confirmModalRef.current.open({
          content: <UU5.Bricks.Lsi lsi={Lsi.closeModalConfirm} />,
          confirmButtonProps: { content: <UU5.Bricks.Lsi lsi={Lsi.closeModalConfirmButton} />, colorSchema: "danger" },
          refuseButtonProps: { content: <UU5.Bricks.Lsi lsi={Lsi.closeModalRefuseButton} /> },
          onConfirm: props.onCancel,
        });
      } else {
        props.onCancel();
      }
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

    const header = (
      <UU5.Forms.ContextHeader content={<UU5.Bricks.Lsi lsi={Lsi.header} />} info={<UU5.Bricks.Lsi lsi={Lsi.info} />} />
    );

    const footer = <UU5.Forms.ContextControls buttonSubmitProps={{ content: <UU5.Bricks.Lsi lsi={Lsi.submit} /> }} />;

    // All form inputs MUST be set as uncontrolled to hold content during componen't update (React update).
    // For example, when there is error during server call everything from provider to this form is re-rendered
    // to have chance properly show error details and allow user to try it again.
    return (
      <>
        <UU5.Bricks.ConfirmModal ref_={confirmModalRef} size="auto" />
        <UU5.Forms.ContextModal
          header={header}
          footer={footer}
          shown={props.shown}
          offsetTop="auto"
          location="portal"
          onClose={handleClose}
          controlled={false}
          overflow
        >
          <UU5.Forms.ContextForm
            onSave={handleSave}
            onSaveDone={() => props.onSaveDone()}
            onSaveFail={() => {}}
            onCancel={handleCancel}
            onInit={handleInit}
            ref={formRef}
          >
            <UU5.Forms.Text
              label={inputLsi.name}
              name="name"
              value={props.jokesDataObject.data.name}
              inputAttrs={{ maxLength: 255 }}
              controlled={false}
              required
            />
          </UU5.Forms.ContextForm>
        </UU5.Forms.ContextModal>
      </>
    );
    //@@viewOff:render
  },
});

export default UpdateModal;
