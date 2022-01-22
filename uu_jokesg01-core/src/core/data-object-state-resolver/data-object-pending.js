//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils } from "uu5g05";
import { Pending } from "uu5g05-elements";
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
    height: PropTypes.number,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, STATICS);
    const className = props.height ? Css.placeholder(props.height) : "";
    const attrs = Utils.VisualComponent.getAttrs(props, className);

    // FIXME MFA Center pending and increase size

    switch (currentNestingLevel) {
      case "smallBox":
        return (
          <div {...attrs}>
            <Pending />
          </div>
        );
      case "inline":
      default:
        return <Pending nestingLevel="inline" />;
    }
    //@@viewOff:render
  },
});

export default DataObjectPending;
