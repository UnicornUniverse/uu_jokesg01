//@@viewOn:imports
import Uu5, { createVisualComponent, PropTypes, useLsi, Utils } from "uu5g05";
import { PersonItem } from "uu_plus4u5g02-elements";
import { InfoGroup } from "uu5g05-elements";
import { useAwscData } from "uu_plus4u5g02";
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
    const { data: territoryData } = useAwscData();

    const currentNestingLevel = Utils.NestingLevel.getNestingLevel({ nestingLevel }, Content);

    function getInfoItemList() {
      const itemList = [];

      itemList.push({
        component: (
          <PersonItem
            uuIdentity={territoryData.data.context.responsibleRole.mainUuIdentity}
            subtitle={workspaceLsi.artifact.responsibleRole}
            title={<Uu5.Content>{territoryData.data.context.responsibleRole.name}</Uu5.Content>}
            direction="vertical-reverse"
          />
        ),
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
