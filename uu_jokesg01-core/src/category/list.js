//@@viewOn:imports
import { createVisualComponent } from "uu5g05";
import { useSubApp } from "uu_plus4u5g01-hooks";
import { Provider as JokesProvider, PermissionProvider } from "../jokes/jokes";
import Config from "./config/config";
import ListProvider from "./list-provider";
import ListView from "./list-view";
//@@viewOff:imports

export const List = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "List",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    ...Config.Types.Box.propTypes,
    ...Config.Types.List.Properties.propTypes,
    baseUri: ListProvider.propTypes.baseUri,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    ...Config.Types.Box.defaultProps,
    ...Config.Types.List.Properties.defaultProps,
    baseUri: ListProvider.defaultProps.baseUri,
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
        {({ subAppDataObject, awscDataObject, systemDataObject }) => (
          <PermissionProvider profileList={systemDataObject.data?.profileData.uuIdentityProfileList}>
            {(jokesPermission) => (
              <ListProvider baseUri={baseUri} skipInitialLoad>
                {({ categoryDataList }) => (
                  <ListView
                    {...viewProps}
                    jokesDataObject={subAppDataObject}
                    awscDataObject={awscDataObject}
                    systemDataObject={systemDataObject}
                    categoryDataList={categoryDataList}
                    jokesPermission={jokesPermission}
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
