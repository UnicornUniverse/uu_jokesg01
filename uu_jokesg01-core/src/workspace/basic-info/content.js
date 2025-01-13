//@@viewOn:imports
import { createVisualComponent, PropTypes, useLsi, Utils } from "uu5g05";
import { ListLayout } from "uu5g05-elements";
import Config from "./config/config.js";
import Workspace from "../../utils/workspace.js";
import StateBadge from "./state-badge.js";
import importLsi from "../../lsi/import-lsi.js";
//@@viewOff:imports

const Content = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Content",
  nestingLevel: ["area", "inline"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    workspace: PropTypes.object,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render({ workspace, onNameClick, onStateClick, nestingLevel }) {
    //@@viewOn:private
    const viewLsi = useLsi(importLsi, [Content.uu5Tag]);
    const workspaceLsi = useLsi(importLsi, [Workspace.APP_TYPE]);
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel({ nestingLevel }, Content);
    //@@viewOff:private

    //@@viewOn:render
    if (currentNestingLevel === "inline") {
      return null;
    }

    return (
      <ListLayout
        itemList={[
          {
            label: workspaceLsi.keys.name,
            children: workspace.name,
            actionList: [{ icon: "uugds-pencil", onClick: onNameClick, tooltip: viewLsi.nameTooltip }],
          },
          {
            label: workspaceLsi.keys.state,
            children: <StateBadge value={workspace.state} />,
            actionList: [{ icon: "uugds-pencil", onClick: onStateClick, tooltip: viewLsi.stateTooltip }],
          },
        ]}
      />
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Content };
export default Content;
//@@viewOff:exports
