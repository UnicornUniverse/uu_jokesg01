//@@viewOn:imports
import { createVisualComponent } from "uu5g05";
import Config from "./config/config.js";
import Provider from "./provider.js";
import View from "./artifact-link/view.js";
//@@viewOff:imports

const ArtifactLink = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ArtifactLink",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    baseUri: Provider.propTypes.baseUri,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render({ baseUri, ...viewProps }) {
    //@@viewOn:render
    return (
      <Provider baseUri={baseUri}>
        <View {...viewProps} />
      </Provider>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ArtifactLink };
export default ArtifactLink;
//@@viewOff:exports
