//@@viewOn:imports
import { createVisualComponent } from "uu5g05";
import Uu5TilesControls from "uu5tilesg02-controls";
import { Box } from "uu5g05-elements";
import Config from "./config/config.js";
//@@viewOff:imports

const Counter = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Counter",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    ...Box.propTypes,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    ...Box.defaultProps,
    significance: "distinct",
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    return <Uu5TilesControls.Counter {...props} />;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Counter };
export default Counter;
//@@viewOff:exports
