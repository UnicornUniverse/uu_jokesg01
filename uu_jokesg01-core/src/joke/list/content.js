//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils } from "uu5g05";
import Config from "./config/config.js";
import AreaContent from "./area-content.js";
import InlineContent from "./inline-content.js";
import SpotContent from "./spot-content.js";
//@@viewOff:imports

const Content = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Content",
  nestingLevel: ["area", "spot", "inline"],
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
      case "spot":
        return showInlineSummary ? <SpotContent {...propsToPass} /> : null;
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
