//@@viewOn:imports
import { createVisualComponent } from "uu5g05";
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
    ...Config.Types.Box.propTypes,
    ...Config.Types.Inline.propTypes,
    ...Config.Types.Identification.propTypes,
    ...Config.Types.List.Properties.propTypes,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    ...Config.Types.Box.defaultProps,
    ...Config.Types.Inline.defaultProps,
    ...Config.Types.Identification.defaultProps,
    ...Config.Types.List.Properties.defaultProps,
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
