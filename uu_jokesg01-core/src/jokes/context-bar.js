//@@viewOn:imports
import UU5 from "uu5g04";
import UuP from "uu_pg01";
import UuTerritory from "uu_territoryg01";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import Lsi from "./context-bar-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "ContextBar",
  //@@viewOff:statics
};

export const ContextBar = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    jokes: UU5.PropTypes.object.isRequired,
    awsc: UU5.PropTypes.object.isRequired,
    contextType: UU5.PropTypes.oneOf(["none", "basic", "full"]),
    isHome: UU5.PropTypes.boolean,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    contextType: "basic",
    isHome: false,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const contextBarProps = getContextBarProps(props.jokes, props.awsc, props.contextType, props.isHome);
    return <UuP.Bricks.ContextBar {...contextBarProps} />;
    //@@viewOff:render
  },
});

//@@viewOn:helpers
export function getContextBarProps(jokes, awsc, contextType = "basic", isHome = "false") {
  if (contextType === "none" || isHome || !awsc) {
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
