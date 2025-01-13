//@@viewOn:imports
import { createVisualComponent, PropTypes, withRouteParamsProvider } from "uu5g05";
import DataTypes from "uu_datatypesg01";
import Config from "./config/config.js";
import WorkspaceProvider from "../workspace/provider.js";
import PermissionProvider from "../workspace/permission-provider.js";
import PreferenceProvider from "../preference/provider.js";
import JokeProvider from "./provider.js";
import View from "./detail/view.js";
//@@viewOff:imports

const InternalDetail = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Detail",
  nestingLevel: View.nestingLevel,
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    ...View.propTypes,
    baseUri: WorkspaceProvider.propTypes.baseUri,
    oid: JokeProvider.propTypes.oid,
    showAuthor: PropTypes.bool,
    showCategories: PropTypes.bool,
    showCreationTime: PropTypes.bool,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    ...View.defaultProps,
    showAuthor: true,
    showCategories: true,
    showCreationTime: true,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { baseUri, oid, showAuthor, showCategories, showCreationTime, uu5Id, hideConfiguration, ...viewProps } =
      props;
    //@@viewOff:private

    //@@viewOn:render
    return (
      <WorkspaceProvider baseUri={baseUri}>
        <PermissionProvider>
          <JokeProvider oid={oid}>
            <PreferenceProvider
              uu5Tag={InternalDetail.uu5Tag}
              uu5Id={uu5Id}
              defaultValue={{ showAuthor, showCategories, showCreationTime }}
              disableUserPreference={hideConfiguration}
              skipInitialLoad
            >
              <View {...viewProps} hideConfiguration={hideConfiguration} />
            </PreferenceProvider>
          </JokeProvider>
        </PermissionProvider>
      </WorkspaceProvider>
    );
    //@@viewOff:render
  },
});

const Detail = withRouteParamsProvider(InternalDetail, { oid: DataTypes.string });

//@@viewOn:exports
export { Detail };
export default Detail;
//@@viewOff:exports
