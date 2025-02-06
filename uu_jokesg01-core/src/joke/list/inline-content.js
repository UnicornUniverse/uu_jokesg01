//@@viewOn:imports
import { createVisualComponent } from "uu5g05";
import { useController } from "uu5tilesg02";
import { Badge, Number } from "uu5g05-elements";
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
    const { data } = useController();
    //@@viewOff:private

    //@@viewOn:render
    return (
      <Badge {...props} colorScheme="blue">
        <Number value={data.length} />
      </Badge>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { InlineContent };
export default InlineContent;
//@@viewOff:exports
