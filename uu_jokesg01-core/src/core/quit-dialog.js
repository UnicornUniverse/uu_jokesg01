//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useRef } from "uu5g04-hooks";
import Config from "./config/config";
import Lsi from "./quit-dialog-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "QuitDialog",
  //@@viewOff:statics
};

export const QuitDialog = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    onCancel: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    onCancel: () => {},
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

    function handleCancel(opt) {
      handleConfirmClose(opt);
    }

    function handleClose() {
      handleConfirmClose(formRef.current);
    }

    function handleConfirmClose(opt) {
      const valuesChanged = !UU5.Common.Tools.deepEqual(opt.component.getValues(), initialValues.current);
      if (valuesChanged) {
        confirmModalRef.current.open({
          content: <CloseConfirmContent />,
          confirmButtonProps: { content: <UU5.Bricks.Lsi lsi={Lsi.closeModalConfirmButton} />, colorSchema: "danger" },
          refuseButtonProps: { content: <UU5.Bricks.Lsi lsi={Lsi.closeModalRefuseButton} /> },
          onConfirm: props.onCancel,
        });
      } else {
        props.onCancel();
      }
    }
    //@@viewOff:private

    //@@viewOn:render
    return (
      <>
        <UU5.Bricks.ConfirmModal ref_={confirmModalRef} size="auto" className="center" />
        {props.children({ handleInit, handleCancel, handleClose })}
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

export default QuitDialog;
