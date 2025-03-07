//@@viewOn:imports
import { createVisualComponent, Utils, useLsi } from "uu5g05";
import Plus4U5Elements from "uu_plus4u5g02-elements";
import Config from "./config/config.js";
import Workspace from "../../utils/workspace.js";
import importLsi from "../../lsi/import-lsi.js";
//@@viewOff:imports

const StateBadge = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "StateBadge",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    value: Workspace.Types.Keys.state.isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const stateLsi = useLsi(importLsi, [Workspace.APP_TYPE, Workspace.Keys.STATE]);
    const attrs = Utils.VisualComponent.getAttrs(props);
    //@@viewOff:private

    //@@viewOn:render
    return (
      <span {...attrs}>
        <Plus4U5Elements.StateBadge icon={Workspace.State.getIcon(props.value)} size="l">
          {` ${stateLsi[props.value]}`}
        </Plus4U5Elements.StateBadge>
      </span>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { StateBadge };
export default StateBadge;
//@@viewOff:exports
