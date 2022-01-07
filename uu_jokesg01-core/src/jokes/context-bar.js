//@@viewOn:imports
import UU5 from "uu5g04";
import { Utils } from "uu5g05";
import UuP from "uu_pg01";
import UuTerritory from "uu_territoryg01";
import "uu_territoryg01-bricks";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import Lsi from "./context-bar-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "ContextBar",
  //@@viewOff:statics
};

const DEFAULT_PROPS = {
  contextType: "basic",
  isHome: false,
};

export const ContextBar = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    jokes: UU5.PropTypes.object.isRequired,
    awsc: UU5.PropTypes.object.isRequired,
    contextType: UU5.PropTypes.oneOf(["none", "basic", "full"]),
    isHome: UU5.PropTypes.bool,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: DEFAULT_PROPS,
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const { jokes, awsc, contextType, isHome, className, ...propsToPass } = props;

    if (!isContextBar(isHome, awsc, contextType)) {
      return null;
    }

    const mainClassName = Config.Css.css`margin-bottom:16px`;
    const barClassName = Utils.Css.joinClassName(className, mainClassName);
    const contextBarProps = getContextBarProps(jokes, awsc, contextType, isHome);
    return <UuP.Bricks.ContextBar {...propsToPass} {...contextBarProps} className={barClassName} />;
    //@@viewOff:render
  },
});

//@@viewOn:helpers
function isContextBar(isHome, awsc, contextType) {
  return contextType !== "none" && !isHome && awsc;
}

export function getContextBarProps(jokes, awsc, contextType = "basic", isHome = DEFAULT_PROPS.isHome) {
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
        label: <UU5.Bricks.Lsi lsi={Lsi.territory} />,
        content: (
          <div>
            <UU5.Bricks.Icon icon="uubml-territory-uu" size="l" />
            <UU5.Bricks.Span content={awsc.data.territoryName} />
          </div>
        ),
      },
    ],
    desc: <UU5.Bricks.Lsi lsi={Lsi.description} />,
    defaultView: contextType === "basic" ? "hideDesc" : "showDesc",
  };
}
//@@viewOff:helpers

export default ContextBar;
