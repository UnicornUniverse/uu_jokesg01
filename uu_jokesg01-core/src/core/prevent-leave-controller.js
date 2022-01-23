//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils, Lsi, useRef, useState } from "uu5g05";
import { Dialog } from "uu5g05-elements";
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
    initValues: PropTypes.object,
    onConfirmLeave: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    initValues: {},
    onConfirmLeave: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [isDialog, setIsDialog] = useState(false);
    //const [initValues] = useState(props.initValues);

    function handleChange(e) {
      //console.log(e);
    }

    function handleClose() {
      // ISSUE Uu5Forms - Inputs don't return value in onBlur parameters
      // https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=61ed115f57296100296a0800

      // ISSUE Uu5Forms - FormInputs don't return name in onChange parameters
      // https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=61ed128457296100296a0829

      // const formValues = formRef.current.component.getValues();
      // const valuesChanged = !Utils.Object.deepEqual(formValues, initialValues.current);
      const valuesChanged = true;

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
        {props.children({ handleChange, handleClose })}
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
