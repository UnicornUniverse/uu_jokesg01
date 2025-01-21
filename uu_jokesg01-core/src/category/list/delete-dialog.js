//@@viewOn:imports
import { createVisualComponent, PropTypes, useLsi, useState, Utils } from "uu5g05";
import { useAlertBus } from "uu_plus4u5g02-elements";
import { Dialog, Pending, Svg } from "uu5g05-elements";
import Config from "./config/config.js";
import importLsi from "../../lsi/import-lsi.js";
//@@viewOff:imports

const DeleteDialog = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "DeleteDialog",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    category: PropTypes.object.isRequired,
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

  render({ category, open, onSubmit, onSubmitted, onCancel, ...propsToPass }) {
    //@@viewOn:private
    const viewLsi = useLsi(importLsi, [DeleteDialog.uu5Tag]);
    const { showError } = useAlertBus({ import: importLsi, path: ["Errors"] });
    const [isPending, setIsPending] = useState(false);

    const { elementProps } = Utils.VisualComponent.splitProps(propsToPass);

    async function handleSubmit(event) {
      let submitResult;

      try {
        setIsPending(true);
        submitResult = await onSubmit(event);
      } catch (error) {
        showError(error);
        return;
      } finally {
        setIsPending(false);
      }

      onSubmitted(new Utils.Event({ submitResult }));
    }
    //@@viewOff:private

    //@@viewOn:render
    return (
      <Dialog
        {...elementProps}
        header={Utils.String.format(viewLsi.header, { name: category.name })}
        info={viewLsi.info}
        icon={<Svg code="uugdssvg-svg-delete" />}
        open={open}
        actionDirection="horizontal"
        actionList={[
          {
            children: viewLsi.cancel,
            onClick: onCancel,
            disabled: isPending,
          },
          {
            children: isPending ? <Pending size="xs" colorScheme={null} /> : viewLsi.submit,
            onClick: handleSubmit,
            colorScheme: "negative",
            significance: "highlighted",
            disabled: isPending,
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
