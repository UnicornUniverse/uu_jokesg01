//@@viewOn:imports
import { createVisualComponent } from "uu5g05";
import { useSubApp } from "uu_plus4u5g02";
import { createCopyTag } from "../utils/utils";
import JokesProvider from "./provider";
import PermissionProvider from "./permission-provider";
import BasicInfoView from "./basic-info-view";
import Config from "./config/config";
//@@viewOff:imports

const DEFAULT_PROPS = {
  ...Config.Types.Area.defaultProps,
  ...Config.Types.Inline.defaultProps,
  ...Config.Types.Identification.defaultProps,
  ...Config.Types.BasicInfo.Properties.defaultProps,
  baseUri: JokesProvider.defaultProps.baseUri,
};

export const BasicInfo = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "BasicInfo",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    ...Config.Types.Area.propTypes,
    ...Config.Types.Inline.propTypes,
    ...Config.Types.Identification.propTypes,
    ...Config.Types.BasicInfo.Properties.propTypes,
    baseUri: JokesProvider.propTypes.baseUri,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: DEFAULT_PROPS,
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    let { baseUri, ...viewProps } = props;

    const subApp = useSubApp();
    baseUri = props.baseUri || subApp.baseUri;

    function handleOnCopyComponent() {
      return createCopyTag(
        Config.DefaultBrickTags.JOKES_BASIC_INFO,
        props,
        ["baseUri", "expanded", "expandButton", "productInfoMask"],
        DEFAULT_PROPS
      );
    }
    //@@viewOff:private

    //@@viewOn:render
    return (
      <JokesProvider baseUri={baseUri}>
        {({ subAppDataObject, awscDataObject, systemDataObject, appWorkspace }) => (
          <PermissionProvider profileList={systemDataObject.data?.profileData.uuIdentityProfileList}>
            {(jokesPermission) => (
              <BasicInfoView
                {...viewProps}
                jokesDataObject={subAppDataObject}
                awscDataObject={awscDataObject}
                systemDataObject={systemDataObject}
                jokesPermission={jokesPermission}
                isHome={appWorkspace.isHome}
                onCopyComponent={handleOnCopyComponent}
              />
            )}
          </PermissionProvider>
        )}
      </JokesProvider>
    );
    //@@viewOff:render
  },
});

export default BasicInfo;
