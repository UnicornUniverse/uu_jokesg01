//@@viewOn:imports
import { createVisualComponent } from "uu5g05";
import View from "./view";
import Config from "./config/config.js";
import Provider from "../provider";
//@@viewOff:imports

const Input = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Input",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    ...View.propTypes,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render({ value, ...viewProps }) {
    //@@viewOn:private

    //@@viewOff:private

    //@@viewOn:render
    return (
      <Provider baseUri={value}>
        <View {...viewProps} value={value} />
      </Provider>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Input };
export default Input;
//@@viewOff:exports
