//@@viewOn:imports
import { createVisualComponent } from "uu5g05";
import { useSubApp } from "uu_plus4u5g01-hooks";
import JokesProvider from "./provider";
import PermissionProvider from "./permission-provider";
import BasicInfoView from "./basic-info-view";
import Config from "./config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "BasicInfo",
  //@@viewOff:statics
};

export const BasicInfo = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    ...Config.Types.Box.propTypes,
    ...Config.Types.Inline.propTypes,
    ...Config.Types.Identification.propTypes,
    ...Config.Types.BasicInfo.Properties.propTypes,
    baseUri: JokesProvider.propTypes.baseUri,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    ...Config.Types.Box.defaultProps,
    ...Config.Types.Inline.defaultProps,
    ...Config.Types.Identification.defaultProps,
    ...Config.Types.BasicInfo.Properties.defaultProps,
    baseUri: JokesProvider.defaultProps.baseUri,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    let { baseUri, ...viewProps } = props;

    const subApp = useSubApp();
    baseUri = props.baseUri || subApp.baseUri;
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
                baseUri={baseUri}
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
