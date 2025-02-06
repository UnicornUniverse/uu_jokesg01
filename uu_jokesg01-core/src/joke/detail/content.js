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
    showInlineSummary: PropTypes.bool,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    showInlineSummary: false,
  },
  //@@viewOff:defaultProps

  render({ nestingLevel, showInlineSummary, ...propsToPass }) {
    //@@viewOn:private
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
        return showInlineSummary ? <InlineContent {...propsToPass} /> : null;
    }
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Content };
export default Content;
//@@viewOff:exports
