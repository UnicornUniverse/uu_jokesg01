//@@viewOn:imports
import { createVisualComponent, PropTypes } from "uu5g05";
import { useSubApp } from "uu_plus4u5g01-hooks";
import { Provider as JokesProvider, PermissionProvider } from "../jokes/jokes";
import Config from "./config/config";
import ListProvider from "./list-provider";
import ListView from "./list-view";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "List",
  //@@viewOff:statics
};

export const List = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    baseUri: PropTypes.string,
    rowCount: PropTypes.number,
    bgStyle: PropTypes.string,
    cardView: PropTypes.string,
    colorSchema: PropTypes.string,
    elevation: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    borderRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    contextType: PropTypes.oneOf(["none", "basic", "full"]),
    showCopyComponent: PropTypes.bool,
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
              <ListProvider baseUri={baseUri} skipInitialLoad>
                {({ jokeDataList }) => (
                  <ListView
                    {...viewProps}
                    jokesDataObject={subAppDataObject}
                    awscDataObject={awscDataObject}
                    jokeDataList={jokeDataList}
                    jokesPermission={jokesPermission}
                    isHome={appWorkspace.isHome}
                  />
                )}
              </ListProvider>
            )}
          </PermissionProvider>
        )}
      </JokesProvider>
    );
    //@@viewOff:render
  },
});

export default List;
