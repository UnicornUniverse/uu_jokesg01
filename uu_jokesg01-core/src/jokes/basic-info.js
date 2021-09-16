//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import { SubAppResolver } from "uu_plus4u5g02";
import JokesProvider from "./provider";
import PermissionProvider from "./permission-provider";
import BasicInfoView from "./basic-info-view";
import Config from "./config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "BasicInfo",
  nestingLevel: ["box", "inline"],
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
    showCopyComponent: UU5.PropTypes.bool,
    onCopyComponent: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    baseUri: undefined,
    bgStyle: "transparent",
    cardView: "full",
    colorSchema: "default",
    elevation: 1,
    borderRadius: "0",
    showCopyComponent: true,
    onCopyComponent: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    return (
      <SubAppResolver baseUri={props.baseUri} subApp={Config.HOME_SUBAPP}>
        <JokesProvider>
          {({ jokesDataObject }) => (
            <PermissionProvider profileList={jokesDataObject.data?.sysData.profileData.uuIdentityProfileList}>
              {(jokesPermission) => (
                <BasicInfoView
                  jokesDataObject={jokesDataObject}
                  jokesPermission={jokesPermission}
                  bgStyle={props.bgStyle}
                  cardView={props.cardView}
                  colorSchema={props.colorSchema}
                  elevation={props.elevation}
                  borderRadius={props.borderRadius}
                  nestingLevel={currentNestingLevel}
                  showCopyComponent={props.showCopyComponent}
                  onCopyComponent={props.onCopyComponent}
                  {...attrs}
                />
              )}
            </PermissionProvider>
          )}
        </JokesProvider>
      </SubAppResolver>
    );
    //@@viewOff:render
  },
});

export default BasicInfo;
