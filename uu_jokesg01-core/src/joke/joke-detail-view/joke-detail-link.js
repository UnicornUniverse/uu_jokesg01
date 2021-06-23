//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "JokeDetailLink",
  nestingLevel: "inline",
  //@@viewOff:statics
};

export const JokeDetailLink = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    header: UU5.PropTypes.object.isRequired,
    joke: UU5.PropTypes.object.isRequired,
    onDetail: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    header: undefined,
    joke: undefined,
    onDetail: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props);

    return (
      <span {...attrs}>
        {!props.joke.visibility && <UU5.Bricks.Icon className={visibilityCss()} icon="mdi-eye-off" />}

        <UU5.Bricks.Lsi lsi={props.header} />
        {" - "}
        <UU5.Bricks.Link onClick={props.onDetail}>{props.joke.name}</UU5.Bricks.Link>
      </span>
    );
    //@@viewOff:render
  },
});

//@@viewOn:helpers
const visibilityCss = () => Config.Css.css`
  color: rgba(0,0,0,0.34);
  margin-right: 4px;
`;
//@@viewOff:helpers

export default JokeDetailLink;
