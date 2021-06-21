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
    showCopyComponent: UU5.PropTypes.bool,
    onCopyComponent: UU5.PropTypes.func,
    onDetail: UU5.PropTypes.func,
    onUpdate: UU5.PropTypes.func,
    onUpdateVisibility: UU5.PropTypes.func,
    canManage: UU5.PropTypes.bool,
    canUpdateVisibility: UU5.PropTypes.bool,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    header: undefined,
    joke: undefined,
    showCopyComponent: false,
    onCopyComponent: () => {},
    onDetail: () => {},
    onUpdate: () => {},
    onUpdateVisibility: () => {},
    canManage: false,
    canUpdateVisibility: false,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    function handleCopyComponent() {
      const text = props.onCopyComponent();
      UU5.Utils.Clipboard.write(text);
    }

    function handleUpdateVisibility() {
      props.onUpdateVisibility(props.joke, !props.joke.visibility);
    }
    //@@viewOff:private

    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props);

    return (
      <span {...attrs}>
        {!props.joke.visibility && <UU5.Bricks.Icon className={visibilityCss()} icon="mdi-eye-off" />}

        <UU5.Bricks.Lsi lsi={props.header} />
        {" - "}
        <UU5.Bricks.Link onClick={props.onDetail}>{props.joke.name}</UU5.Bricks.Link>

        {props.canManage && (
          <UU5.Bricks.Icon icon="mdi-pencil" mainAttrs={{ onClick: props.onUpdate }} className={iconCss()} />
        )}

        {props.canUpdateVisibility && (
          <UU5.Bricks.Icon icon="mdi-eye" mainAttrs={{ onClick: handleUpdateVisibility }} className={iconCss()} />
        )}

        {props.showCopyComponent && (
          <UU5.Bricks.Icon icon="mdi-content-copy" mainAttrs={{ onClick: handleCopyComponent }} className={iconCss()} />
        )}
      </span>
    );
    //@@viewOff:render
  },
});

//@@viewOn:helpers
const iconCss = () => Config.Css.css`
    text-decoration: none;
    color: rgba(0, 0, 0, 0.7);
    margin-left: 4px;
    cursor: pointer;
`;

const visibilityCss = () => Config.Css.css`
  color: rgba(0,0,0,0.34);
  margin-right: 4px;
`;
//@@viewOff:helpers

export default JokeDetailLink;
