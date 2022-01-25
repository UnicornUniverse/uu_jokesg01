//@@viewOn:imports
import { createVisualComponent, PropTypes } from "uu5g05";
import { useSubApp } from "uu_plus4u5g01-hooks";
import { Provider as JokesProvider, PermissionProvider } from "../jokes/jokes";
import { Provider as PreferenceProvider } from "../preference/preference";
import Utils from "../utils/utils";
import Config from "./config/config";
import JokeProvider from "./provider";
import DetailView from "./detail-view";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Detail",
  //@@viewOff:statics
};

const DEFAULT_PROPS = {
  bgStyle: "transparent",
  cardView: "full",
  colorSchema: "default",
  elevation: 1,
  borderRadius: "0",
  contextType: "basic",
  showCopyComponent: true,
  showCategories: true,
  showAuthor: true,
  showCreationTime: true,
  disableUserPreference: false,
};

export const Detail = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    baseUri: PropTypes.string,
    jokeId: PropTypes.string.isRequired,
    bgStyle: PropTypes.string,
    cardView: PropTypes.string,
    colorSchema: PropTypes.string,
    elevation: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    borderRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    contextType: PropTypes.oneOf(["none", "basic", "full"]),
    showCopyComponent: PropTypes.bool,
    showCategories: PropTypes.bool,
    showAuthor: PropTypes.bool,
    showCreationTime: PropTypes.bool,
    uu5Id: PropTypes.string,
    disableUserPreference: PropTypes.bool,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: DEFAULT_PROPS,
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    let {
      baseUri,
      jokeId,
      showCategories,
      showAuthor,
      showCreationTime,
      disableUserPreference,
      uu5Id,
      ...viewProps
    } = props;

    const subApp = useSubApp();
    baseUri = props.baseUri || subApp.baseUri;

    const defaultPreference = { showCategories, showAuthor, showCreationTime };

    function handleOnCopyComponent() {
      return Utils.createCopyTag(
        Config.DefaultBrickTags.JOKE_DETAIL,
        props,
        ["baseUri", "jokeId", "showCategories", "showAuthor", "showCreationTime", "disableUserPreference", "uu5Id"],
        DEFAULT_PROPS
      );
    }
    //@@viewOff:private

    //@@viewOn:render
    return (
      <JokesProvider baseUri={baseUri}>
        {({ subAppDataObject, awscDataObject, systemDataObject, appWorkspace }) => (
          <PermissionProvider profileList={systemDataObject.data?.profileData.uuIdentityProfileList}>
            {(jokesPermission) => (
              <JokeProvider baseUri={baseUri} id={jokeId}>
                {({ jokeDataObject }) => (
                  <PreferenceProvider
                    baseUri={baseUri}
                    uu5Tag={STATICS.displayName}
                    uu5Id={uu5Id}
                    defaultData={defaultPreference}
                    disableUserPreference={disableUserPreference}
                    skipInitialLoad
                  >
                    {({ preferenceDataObject }) => (
                      <DetailView
                        {...viewProps}
                        jokesDataObject={subAppDataObject}
                        awscDataObject={awscDataObject}
                        jokeDataObject={jokeDataObject}
                        preferenceDataObject={preferenceDataObject}
                        jokesPermission={jokesPermission}
                        isHome={appWorkspace.isHome}
                        onCopyComponent={handleOnCopyComponent}
                      />
                    )}
                  </PreferenceProvider>
                )}
              </JokeProvider>
            )}
          </PermissionProvider>
        )}
      </JokesProvider>
    );
    //@@viewOff:render
  },
});

export default Detail;
