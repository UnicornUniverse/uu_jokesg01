//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useRef } from "uu5g04-hooks";
import Config from "./config/config";
import Lsi from "./prevent-leave-controller-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "PreventLeaveController",
  //@@viewOff:statics
};

export const PreventLeaveController = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    onConfirmLeave: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    onConfirmLeave: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const formRef = useRef();
    const confirmModalRef = useRef();
    const initialValues = useRef();

    function handleInit(opt) {
      initialValues.current = opt.component.getValues();
      formRef.current = opt;
    }

    function handleClose() {
      const formValues = formRef.current.component.getValues();
      const valuesChanged = !UU5.Common.Tools.deepEqual(formValues, initialValues.current);
      if (valuesChanged) {
        confirmModalRef.current.open({
          content: <CloseConfirmContent />,
          confirmButtonProps: { content: <UU5.Bricks.Lsi lsi={Lsi.closeModalConfirmButton} />, colorSchema: "danger" },
          refuseButtonProps: { content: <UU5.Bricks.Lsi lsi={Lsi.closeModalRefuseButton} /> },
          onConfirm: props.onConfirmLeave,
        });
      } else {
        props.onConfirmLeave();
      }
    }
    //@@viewOff:private

    //@@viewOn:render
    return (
      <>
        <UU5.Bricks.ConfirmModal ref_={confirmModalRef} size="auto" className="center" />
        {props.children({ handleInit, handleClose })}
      </>
    );
    //@@viewOff:render
  },
});

function CloseConfirmContent() {
  return (
    <>
      <UU5.Bricks.Header level="6">
        <UU5.Bricks.Lsi lsi={Lsi.closeModalConfirmHeader} />
      </UU5.Bricks.Header>
      <UU5.Bricks.Lsi lsi={Lsi.closeModalConfirm} />
    </>
  );
}

export default PreventLeaveController;
