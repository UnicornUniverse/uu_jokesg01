//@@viewOn:imports
import { createVisualComponent, PropTypes, useLsi, Utils } from "uu5g05";
import { InfoGroup } from "uu5g05-elements";
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

  render({ workspace, nestingLevel }) {
    //@@viewOn:private
    const workspaceLsi = useLsi(importLsi, [Workspace.APP_TYPE]);
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel({ nestingLevel }, Content);

    function getInfoItemList() {
      const itemList = [];

      itemList.push({
        subtitle: workspaceLsi.keys.name,
        title: workspace.name,
      });

      itemList.push({
        subtitle: workspaceLsi.keys.state,
        title: <StateBadge value={workspace.state} />,
      });

      return itemList;
    }
    //@@viewOff:private

    //@@viewOn:render
    if (currentNestingLevel === "inline") {
      return null;
    }

    return <InfoGroup itemList={getInfoItemList()} auroResize={false} />;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Content };
export default Content;
//@@viewOff:exports
