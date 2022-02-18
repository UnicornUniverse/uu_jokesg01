//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils, Lsi } from "uu5g05";
import { Icon, useSpacing } from "uu5g05-elements";
import UuP from "uu_pg01";
import UuTerritory from "uu_territoryg01";
import "uu_territoryg01-bricks";
import Config from "./config/config";
import LsiData from "./context-bar-lsi";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  main: ({ spaceA }) =>
    Config.Css.css({
      marginLeft: -spaceA,
      marginRight: -spaceA,
    }),
};
//@viewOff:css

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
    const spacing = useSpacing();
    //@@viewOff:private

    //@@viewOn:render
    const { jokes, awsc, contextType, isHome, className, ...propsToPass } = props;

    if (!isContextBar(isHome, awsc, contextType)) {
      return null;
    }

    const barClassName = Utils.Css.joinClassName(className, Css.main(spacing));
    const contextBarProps = getContextBarProps(jokes, awsc, contextType, isHome);
    return <UuP.Bricks.ContextBar {...propsToPass} {...contextBarProps} className={barClassName} />;
    //@@viewOff:render
  },
});

//@@viewOn:helpers
function isContextBar(isHome, awsc, contextType) {
  return contextType !== "none" && !isHome && awsc;
}

function getContextBarProps(jokes, awsc, contextType = "basic", isHome) {
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
        label: <Lsi lsi={LsiData.territory} />,
        content: (
          <div>
            <Icon icon="uubml-territory-uu" size="l" />
            {Utils.Uu5String.toChildren(awsc.data.territoryName)}
          </div>
        ),
      },
    ],
    desc: <Lsi lsi={LsiData.description} />,
    defaultView: contextType === "basic" ? "hideDesc" : "showDesc",
  };
}
//@@viewOff:helpers

export default ContextBar;
