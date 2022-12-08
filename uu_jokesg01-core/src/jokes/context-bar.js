//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils, useLsi } from "uu5g05";
import { Icon } from "uu5g05-elements";
import UuP from "uu_pg01";
import UuTerritory from "uu_territoryg01";
import "uu_territoryg01-bricks";
import Config from "./config/config";
import importLsi from "../lsi/import-lsi";
//@@viewOff:imports

export const ContextBar = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ContextBar",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    jokes: PropTypes.object.isRequired,
    awsc: PropTypes.object.isRequired,
    contextType: PropTypes.oneOf(["none", "basic", "full"]),
    isHome: PropTypes.bool,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    contextType: "basic",
    isHome: false,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const lsi = useLsi(importLsi, [ContextBar.uu5Tag]);
    //@@viewOff:private

    //@@viewOn:render
    const { jokes, awsc, contextType, isHome, className, ...propsToPass } = props;

    if (!isContextBar(isHome, awsc, contextType)) {
      return null;
    }

    const contextBarProps = getContextBarProps(jokes, awsc, contextType, isHome, lsi);
    return <UuP.Bricks.ContextBar {...propsToPass} {...contextBarProps} className={className} />;
    //@@viewOff:render
  },
});

//@@viewOn:helpers
function isContextBar(isHome, awsc, contextType) {
  return contextType !== "none" && !isHome && awsc;
}

function getContextBarProps(jokes, awsc, contextType, isHome, lsi) {
  if (!isContextBar(isHome, awsc, contextType)) {
    return null;
  }

  return {
    header: (
      <UuTerritory.Bricks.ArtifactLink
        artifactName={jokes.name}
        href={awsc.data.artifact.uuAppWorkspaceUri}
        artifactStateIcon={"uubml-state-s00-" + jokes.state}
        icon="uubml-uuawsc"
      />
    ),
    additionalInfo: [
      {
        label: lsi.territory,
        content: (
          <div>
            <Icon icon="uubml-territory-uu" size="l" />
            {Utils.Uu5String.toChildren(awsc.data.territoryName)}
          </div>
        ),
      },
    ],
    desc: lsi.description,
    defaultView: contextType === "basic" ? "hideDesc" : "showDesc",
  };
}
//@@viewOff:helpers

export default ContextBar;
