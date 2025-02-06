//@@viewOn:imports
import { createVisualComponent, Utils } from "uu5g05";
import { useController } from "uu5tilesg02";
import { Number, Text } from "uu5g05-elements";
import Config from "./config/config.js";
//@@viewOff:imports

const InlineContent = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "InlineContent",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { elementProps } = Utils.VisualComponent.splitProps(props);
    const { data } = useController();
    //@@viewOff:private

    //@@viewOn:render
    return (
      <Text
        {...elementProps}
        category="interface"
        segment="content"
        type="medium"
        colorScheme="building"
        significance="subdued"
      >
        <Number value={data.length} />
      </Text>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { InlineContent };
export default InlineContent;
//@@viewOff:exports
