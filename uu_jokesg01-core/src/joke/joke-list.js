//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
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
    baseUri: UU5.PropTypes.string.isRequired,
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
    showCopyComponent: false,
    onCopyComponent: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    return (
      <JokesProvider baseUri={props.baseUri}>
        {(jokesDataObject) => (
          <JokesPermissionProvider profileList={jokesDataObject.data?.authorizedProfileList}>
            {(jokesPermission) => (
              <JokeListProvider baseUri={props.baseUri}>
                {(jokeDataList) => (
                  <JokeListView
                    jokesDataObject={jokesDataObject}
                    jokeDataList={jokeDataList}
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
              </JokeListProvider>
            )}
          </JokesPermissionProvider>
        )}
      </JokesProvider>
    );
    //@@viewOff:render
  },
});

export default JokeList;
