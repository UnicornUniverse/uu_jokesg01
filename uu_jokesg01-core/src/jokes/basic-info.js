//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
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
    baseUri: UU5.PropTypes.string,
    bgStyle: UU5.PropTypes.string,
    cardView: UU5.PropTypes.string,
    colorSchema: UU5.PropTypes.string,
    elevation: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    borderRadius: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    contextType: UU5.PropTypes.oneOf(["none", "basic", "full"]),
    showCopyComponent: UU5.PropTypes.bool,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    bgStyle: "transparent",
    cardView: "full",
    colorSchema: "default",
    elevation: 1,
    borderRadius: "0",
    contextType: "basic",
    showCopyComponent: true,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const subApp = useSubApp();
    const baseUri = props.baseUri || subApp.baseUri;
    //@@viewOff:private

    //@@viewOn:render
    return (
      <JokesProvider baseUri={baseUri}>
        {({ subAppDataObject, awscDataObject, systemDataObject, appWorkspace }) => (
          <PermissionProvider profileList={systemDataObject.data?.profileData.uuIdentityProfileList}>
            {(jokesPermission) => (
              <BasicInfoView
                jokesDataObject={subAppDataObject}
                awscDataObject={awscDataObject}
                systemDataObject={systemDataObject}
                jokesPermission={jokesPermission}
                isHome={appWorkspace.isHome}
                contextType={props.contextType}
                baseUri={baseUri}
                bgStyle={props.bgStyle}
                cardView={props.cardView}
                colorSchema={props.colorSchema}
                elevation={props.elevation}
                borderRadius={props.borderRadius}
                nestingLevel={props.nestingLevel}
                showCopyComponent={props.showCopyComponent}
                disabled={props.disabled}
                hidden={props.hidden}
                className={props.className}
                style={props.style}
                mainAttrs={props.mainAttrs}
                noIndex={props.noIndex}
                ref_={props.ref_}
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
