//@@viewOn:imports
import { createVisualComponent } from "uu5g05";
import { useArtifact } from "uu_plus4u5g02";
import View from "./view";
import Config from "./config/config.js";
import Provider from "../../workspace/provider";
//@@viewOff:imports

const Input = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Input",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    ...View.propTypes,
    baseUri: Provider.propTypes.baseUri,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render({ baseUri, ...viewProps }) {
    //@@viewOn:private
    const artifact = useArtifact();
    //@@viewOff:private

    //@@viewOn:render
    return (
      <Provider baseUri={baseUri}>
        <View {...viewProps} baseUri={baseUri} artifact={artifact} />
      </Provider>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Input };
export default Input;
//@@viewOff:exports
