//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils } from "uu5g05";
import Config from "./config/config.js";
import AreaContent from "./area-content.js";
import InlineContent from "./inline-content.js";
import BoxContent from "./box-content.js";
//@@viewOff:imports

const Content = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Content",
  nestingLevel: ["area", "box", "inline"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    hideInlineSummary: PropTypes.bool,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    hideInlineSummary: false,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { nestingLevel, hideInlineSummary, ...propsToPass } = props;
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel({ nestingLevel }, Content);
    //@@viewOff:private

    //@@viewOn:render
    switch (currentNestingLevel) {
      case "area":
        return <AreaContent {...propsToPass} />;
      case "box":
        return <BoxContent {...propsToPass} />;
      case "inline":
      default:
        return hideInlineSummary ? null : <InlineContent {...propsToPass} />;
    }
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Content };
export default Content;
//@@viewOff:exports
