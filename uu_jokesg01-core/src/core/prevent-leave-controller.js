//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils, Lsi, useRef, useState } from "uu5g05";
import { Dialog, Text } from "uu5g05-elements";
import Config from "./config/config";
import LsiData from "./prevent-leave-controller-lsi";
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
    onConfirmLeave: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    onConfirmLeave: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [isDialog, setIsDialog] = useState(false);
    const formRef = useRef();
    const initialValues = useRef();

    function handleInit(opt) {
      initialValues.current = opt.component.getValues();
      formRef.current = opt;
    }

    function handleClose() {
      const formValues = formRef.current.component.getValues();
      const valuesChanged = !Utils.Object.deepEqual(formValues, initialValues.current);
      if (valuesChanged) {
        setIsDialog(true);
      } else {
        props.onConfirmLeave();
      }
    }
    //@@viewOff:private

    //@@viewOn:render
    return (
      <>
        {props.children({ handleInit, handleClose })}
        {isDialog && (
          <Dialog
            open={isDialog}
            header={<Lsi lsi={LsiData.closeModalConfirmHeader} />}
            onClose={() => setIsDialog(false)}
            actionDirection="horizontal"
            actionList={[
              {
                children: <Lsi lsi={LsiData.closeModalRefuseButton} />,
              },
              {
                children: <Lsi lsi={LsiData.closeModalConfirmButton} />,
                colorScheme: "negative",
                significance: "highlighted",
                onClick: props.onConfirmLeave,
              },
            ]}
          >
            <div className={Config.Css.css`margin:32px`}>
              <Lsi lsi={LsiData.closeModalConfirm} />
            </div>
          </Dialog>
        )}
      </>
    );
    //@@viewOff:render
  },
});

export default PreventLeaveController;
