//@@viewOn:imports
import { createVisualComponent, useLsi, useState, Utils, PropTypes, Content } from "uu5g05";
import { useAlertBus } from "uu_plus4u5g02-elements";
import { Dialog, Pending, Svg } from "uu5g05-elements";
import Config from "./config/config.js";
import importLsi from "../../lsi/import-lsi.js";
//@@viewOff:imports

const RestrictDialog = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "RestrictDialog",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    workspace: PropTypes.object.isRequired,
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

  render({ workspace, open, onSubmit, onSubmitted, onCancel, ...propsToPass }) {
    //@@viewOn:private
    const viewLsi = useLsi(importLsi, [RestrictDialog.uu5Tag]);
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
        header={Utils.String.format(viewLsi.header, { name: workspace.name })}
        info={<Content>{viewLsi.info}</Content>}
        icon={<Svg code="uugdssvg-svg-lock" />}
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
            colorScheme: "warning",
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
export { RestrictDialog };
export default RestrictDialog;
//@@viewOff:exports
