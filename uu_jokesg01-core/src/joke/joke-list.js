//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import { SubAppResolver } from "uu_plus4u5g02";
import Config from "./config/config";
import { JokesProvider, JokesPermissionProvider } from "../jokes/jokes";
import JokeListProvider from "./joke-list-provider";
import JokeListView from "./joke-list-view";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "JokeList",
  nestingLevel: ["boxCollection", "inline"],
  //@@viewOff:statics
};

export const JokeList = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    baseUri: UU5.PropTypes.string,
    rowCount: UU5.PropTypes.number,
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
    rowCount: undefined,
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
            <JokesPermissionProvider profileList={jokesDataObject.data?.authorizedProfileList}>
              {(jokesPermission) => (
                <JokeListProvider baseUri={props.baseUri}>
                  {({ jokeDataList }) => (
                    <JokeListView
                      jokesDataObject={jokesDataObject}
                      jokeDataList={jokeDataList}
                      jokesPermission={jokesPermission}
                      baseUri={props.baseUri}
                      rowCount={props.rowCount}
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
                </JokeListProvider>
              )}
            </JokesPermissionProvider>
          )}
        </JokesProvider>
      </SubAppResolver>
    );
    //@@viewOff:render
  },
});

export default JokeList;
