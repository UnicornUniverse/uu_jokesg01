//@@viewOn:imports
import { createVisualComponent } from "uu5g05";
import { useSubApp } from "uu_plus4u5g02";
import { Provider as JokesProvider, PermissionProvider } from "../jokes/jokes";
import JokesUtils from "../utils/utils";
import Config from "./config/config";
import ListProvider from "./list-provider";
import ListView from "./list-view";
//@@viewOff:imports

const DEFAULT_PROPS = {
  ...Config.Types.Box.defaultProps,
  ...Config.Types.Inline.defaultProps,
  ...Config.Types.Identification.defaultProps,
  ...Config.Types.List.Properties.defaultProps,
  baseUri: ListProvider.defaultProps.baseUri,
};

export const List = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "List",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    ...Config.Types.Box.propTypes,
    ...Config.Types.Inline.propTypes,
    ...Config.Types.Identification.propTypes,
    ...Config.Types.List.Properties.propTypes,
    baseUri: ListProvider.propTypes.baseUri,
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
      return JokesUtils.createCopyTag(Config.DefaultBrickTags.JOKE_LIST, props, ["baseUri", "rowCount"], DEFAULT_PROPS);
    }
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
                    onCopyComponent={handleOnCopyComponent}
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
