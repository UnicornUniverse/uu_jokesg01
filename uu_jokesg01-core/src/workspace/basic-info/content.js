//@@viewOn:imports
import Uu5, { createVisualComponent, PropTypes, useLsi, Utils } from "uu5g05";
import { PersonItem } from "uu_plus4u5g02-elements";
import { InfoGroup, Line, Text, UuGds } from "uu5g05-elements";
import Config from "./config/config.js";
import Workspace from "../../utils/workspace.js";
import StateBadge from "./state-badge.js";
import List from "../../joke/list.js";
import Joke from "../../utils/joke.js";
import Lsi from "../../utils/lsi.js";
import Filter from "../../utils/filter.js";
import importLsi from "../../lsi/import-lsi.js";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  line: () =>
    Config.Css.css({
      marginTop: UuGds.SpacingPalette.getValue(["fixed", "e"]),
      marginBottom: UuGds.SpacingPalette.getValue(["fixed", "e"]),
    }),
};
//@@viewOff:css

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

  render({ workspace, territoryData, permission, refreshKey, nestingLevel }) {
    //@@viewOn:private
    const viewLsi = useLsi(importLsi, [Content.uu5Tag]);
    const workspaceLsi = useLsi(importLsi, [Workspace.APP_TYPE]);
    const roleName = useLsi(Lsi.parseLsiOrPlainText(territoryData.data.context.responsibleRole.name));

    const mainUuIdentityName = territoryData.data.context.responsibleRole.mainUuIdentityName;
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel({ nestingLevel }, Content);

    function getInfoItemList() {
      const itemList = [];

      itemList.push({
        component: (
          <PersonItem
            uuIdentity={territoryData.data.context.responsibleRole.mainUuIdentity}
            subtitle={workspaceLsi.artifact.responsibleRole}
            title={
              <>
                <Uu5.Content>{roleName}</Uu5.Content>{" "}
                {roleName !== mainUuIdentityName && (
                  <Text colorScheme="building" significance="subdued" bold={false}>
                    {mainUuIdentityName}
                  </Text>
                )}
              </>
            }
            direction="vertical-reverse"
          />
        ),
      });

      itemList.push({
        subtitle: workspaceLsi.keys.state,
        title: <StateBadge value={workspace.state} />,
      });

      itemList.push({
        component: (
          <List
            key={`${refreshKey}_publishedJokes`}
            nestingLevel="spot"
            title={null}
            subtitle={viewLsi.publishedJokes}
            icon={null}
            identificationType="none"
            showInlineSummary
            filterMode={Filter.Mode.HIDDEN}
            filterList={[{ key: Joke.Filter.Keys.VISIBILITY, value: Joke.Filter.Visibility.PUBLISHED, readOnly: true }]}
          />
        ),
      });

      if (permission.joke.canUpdateVisibility()) {
        itemList.push({
          component: (
            <List
              key={`${refreshKey}_unublishedJokes`}
              nestingLevel="spot"
              title={null}
              subtitle={viewLsi.unpublishedJokes}
              icon={null}
              identificationType="none"
              showInlineSummary
              filterMode={Filter.Mode.HIDDEN}
              filterList={[
                { key: Joke.Filter.Keys.VISIBILITY, value: Joke.Filter.Visibility.UNPUBLISHED, readOnly: true },
              ]}
            />
          ),
        });
      }

      return itemList;
    }
    //@@viewOff:private

    //@@viewOn:render
    if (currentNestingLevel === "inline") {
      return null;
    }

    return (
      <>
        <InfoGroup itemList={getInfoItemList()} autoResize={false} />
        {workspace.desc && (
          <>
            <Line significance="subdued" colorScheme="building" className={Css.line()} />
            <Uu5.Content>{workspace.desc}</Uu5.Content>
          </>
        )}
      </>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Content };
export default Content;
//@@viewOff:exports
