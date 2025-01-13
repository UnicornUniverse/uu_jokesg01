//@@viewOn:imports
import { createVisualComponent } from "uu5g05";
import Config from "./config/config.js";
import ListProvider from "../list-provider.js";
import View from "./view";
//@@viewOff:imports

const Input = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Input",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    ...View.propTypes,
    baseUri: ListProvider.propTypes.baseUri,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render({ baseUri, ...viewProps }) {
    //@@viewOn:render
    return (
      <ListProvider baseUri={baseUri}>
        <View {...viewProps} />
      </ListProvider>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Input };
export default Input;
//@@viewOff:exports
