//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Link",
  nestingLevel: "inline",
  //@@viewOff:statics
};

export const Link = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    header: UU5.PropTypes.object.isRequired,
    jokesDataObject: UU5.PropTypes.object.isRequired,
    onDetail: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    onDetail: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props);
    return (
      <span {...attrs}>
        <UU5.Bricks.Lsi lsi={props.header} />
        {" - "}
        <UU5.Bricks.Link onClick={props.onDetail}>{props.jokesDataObject.data.name}</UU5.Bricks.Link>
      </span>
    );
    //@@viewOff:render
  },
});

export default Link;
