//@@viewOn:imports
import { createVisualComponent } from "uu5g05";
import { useController } from "uu5tilesg02";
import { Number } from "uu5g05-elements";
import Config from "./config/config.js";
import InlineContent from "./inline-content.js";
//@@viewOff:imports

const SpotContent = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "InlineContent",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render({ displayType, ...propsToPass }) {
    //@@viewOn:private
    const { data } = useController();
    //@@viewOff:private

    //@@viewOn:render
    switch (displayType) {
      case "menu-item":
        return <InlineContent {...propsToPass} />;
      default:
        return <Number value={data.length} />;
    }
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { SpotContent };
export default SpotContent;
//@@viewOff:exports
