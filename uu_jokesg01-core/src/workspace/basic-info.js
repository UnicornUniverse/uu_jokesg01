//@@viewOn:imports
import { createVisualComponent } from "uu5g05";
import Config from "./config/config.js";
import WorkspaceProvider from "./provider.js";
import PermissionProvider from "./permission-provider.js";
import View from "./basic-info/view.js";
//@@viewOff:imports

const BasicInfo = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "BasicInfo",
  nestingLevel: View.nestingLevel,
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    ...View.propTypes,
    baseUri: WorkspaceProvider.propTypes.baseUri,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    ...View.defaultProps,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { baseUri, ...viewProps } = props;
    //@@viewOff:private

    //@@viewOn:render
    return (
      <WorkspaceProvider baseUri={baseUri}>
        <PermissionProvider>
          <View {...viewProps} />
        </PermissionProvider>
      </WorkspaceProvider>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { BasicInfo };
export default BasicInfo;
//@@viewOff:exports
