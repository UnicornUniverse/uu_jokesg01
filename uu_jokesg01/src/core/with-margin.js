import { createVisualComponent, Utils, PropTypes } from "uu5g05";
import Config from "./config/config";

function withMargin(Component, { statics } = {}) {
  return createVisualComponent({
    //@@viewOn:statics
    ...statics,
    uu5Tag: `withMargin(${Component.uu5Tag})`,
    //@@viewOff:statics

    //@@viewOn:propTypes
    propTypes: { ...Component.propTypes, margin: PropTypes.sizeOf(PropTypes.unit) },
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    defaultProps: { ...Component.defaultProps },
    //@@viewOff:defaultProps

    //@@viewOn:render
    render(props) {
      const { margin, className, ...componentProps } = props;
      let componentClass;

      if (margin) {
        const marginStyle = Utils.Style.parseSpace(margin, "margin");
        const marginClass = Config.Css.css(marginStyle);
        componentClass = Utils.Css.joinClassName(className, marginClass);
      } else {
        componentClass = className;
      }

      return <Component {...componentProps} className={componentClass} />;
    },
    //@@viewOff:render
  });
}

//@@viewOn:exports
export { withMargin };
export default withMargin;
//@@viewOff:exports
