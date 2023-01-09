//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils } from "uu5g05";
import { Pending } from "uu5g05-elements";
import Config from "./config/config";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  placeholder: (height) =>
    Config.Css.css({
      height: typeof height === "number" ? `${height}px` : height,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }),
};
//@@viewOff:css

const STATICS = {
  //@@viewOn:statics
  uu5Tag: Config.TAG + "DataObjectPending",
  nestingLevel: ["box", "inline"],
  //@@viewOff:statics
};

const DataObjectPending = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    height: "100%",
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, STATICS);
    const { height, ...otherProps } = props;
    const className = Css.placeholder(height);
    const { elementProps, componentProps } = Utils.VisualComponent.splitProps(otherProps, className);

    const attrs = Utils.VisualComponent.getAttrs(elementProps, className);

    switch (currentNestingLevel) {
      case "box":
        return (
          <div {...attrs}>
            <Pending {...componentProps} size="xl" className={Config.Css.css`display: block`} />
          </div>
        );
      case "inline":
      default:
        return <Pending {...componentProps} nestingLevel="inline" />;
    }
    //@@viewOff:render
  },
});

export default DataObjectPending;
