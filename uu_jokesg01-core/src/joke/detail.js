//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import { SubAppResolver } from "uu_plus4u5g02";
import { Provider as JokesProvider, PermissionProvider } from "../jokes/jokes";
import Config from "./config/config";
import JokeProvider from "./provider";
import DetailView from "./detail-view";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Detail",
  nestingLevel: ["box", "inline"],
  //@@viewOff:statics
};

export const Detail = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    baseUri: UU5.PropTypes.string,
    jokeId: UU5.PropTypes.string.isRequired,
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
    jokeId: undefined,
    baseUri: undefined,
    code: undefined,
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
    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    return (
      <SubAppResolver baseUri={props.baseUri} subApp={Config.HOME_SUBAPP}>
        <JokesProvider>
          {({ jokesDataObject }) => (
            <PermissionProvider profileList={jokesDataObject.data?.sysData.profileData.uuIdentityProfileList}>
              {(jokesPermission) => (
                <JokeProvider baseUri={props.baseUri} id={props.jokeId}>
                  {({ jokeDataObject }) => (
                    <DetailView
                      jokesDataObject={jokesDataObject}
                      jokeDataObject={jokeDataObject}
                      jokesPermission={jokesPermission}
                      baseUri={props.baseUri}
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
                </JokeProvider>
              )}
            </PermissionProvider>
          )}
        </JokesProvider>
      </SubAppResolver>
    );
    //@@viewOff:render
  },
});

export default Detail;
