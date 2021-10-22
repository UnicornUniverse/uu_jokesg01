//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  placeholder: (height) => Config.Css.css`
    height: ${height}px;
  `,
};
//@@viewOff:css

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "DataObjectPending",
  nestingLevel: ["smallBox", "inline"],
  //@@viewOff:statics
};

const DataObjectPending = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    height: UU5.PropTypes.number,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);
    const className = props.height ? Css.placeholder(props.height) : "";
    const attrs = UU5.Common.VisualComponent.getAttrs(props, className);

    switch (currentNestingLevel) {
      case "smallBox":
        return (
          <div {...attrs}>
            <UU5.Bricks.Loading />
          </div>
        );
      case "inline":
      default:
        return <UU5.Bricks.Loading inline />;
    }
    //@@viewOff:render
  },
});

export default DataObjectPending;
