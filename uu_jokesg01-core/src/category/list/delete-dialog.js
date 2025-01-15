//@@viewOn:imports
import { createVisualComponent, PropTypes, useLsi, Utils } from "uu5g05";
import { useAlertBus } from "uu_plus4u5g02-elements";
import { Dialog, Svg } from "uu5g05-elements";
import Config from "./config/config.js";
import importLsi from "../../lsi/import-lsi.js";
//@@viewOff:imports

const DeleteDialog = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "DeleteDialog",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
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

  render({ open, onSubmit, onSubmitted, onCancel, ...propsToPass }) {
    //@@viewOn:private
    const viewLsi = useLsi(importLsi, [DeleteDialog.uu5Tag]);
    const { elementProps } = Utils.VisualComponent.splitProps(propsToPass);
    const { showError } = useAlertBus({ import: importLsi, path: ["Errors"] });

    async function handleSubmit(event) {
      let submitResult;

      try {
        submitResult = await onSubmit(event);
      } catch (error) {
        showError(error);
        return;
      }

      onSubmitted(new Utils.Event({ submitResult }));
    }
    //@@viewOff:private

    //@@viewOn:render
    return (
      <Dialog
        {...elementProps}
        header={viewLsi.header}
        icon={<Svg code="uugdssvg-svg-delete" />}
        open={open}
        actionDirection="horizontal"
        actionList={[
          {
            children: viewLsi.cancel,
            onClick: onCancel,
          },
          {
            children: viewLsi.submit,
            onClick: handleSubmit,
            colorScheme: "negative",
            significance: "highlighted",
          },
        ]}
      />
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { DeleteDialog };
export default DeleteDialog;
//@@viewOff:exports
