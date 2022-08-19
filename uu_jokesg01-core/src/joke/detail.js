//@@viewOn:imports
import { createVisualComponent } from "uu5g05";
import { useSubApp } from "uu_plus4u5g02";
import { createCopyTag, redirectToPlus4UGo } from "../utils/utils";
import { Provider as JokesProvider, PermissionProvider } from "../jokes/jokes";
import { Provider as PreferenceProvider } from "../preference/preference";
import Config from "./config/config";
import JokeProvider from "./provider";
import DetailView from "./detail-view";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Detail",
  //@@viewOff:statics
};

const DEFAULT_PROPS = {
  ...Config.Types.Inline.defaultProps,
  ...Config.Types.Spot.defaultProps,
  ...Config.Types.Box.defaultProps,
  ...Config.Types.Area.defaultProps,
  ...Config.Types.Identification.defaultProps,
  ...Config.Types.Preference.defaultProps,
  ...Config.Types.Detail.Preferences.defaultProps,
  ...Config.Types.Detail.Properties.defaultProps,
};

export const Detail = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    ...Config.Types.Inline.propTypes,
    ...Config.Types.Spot.propTypes,
    ...Config.Types.Box.propTypes,
    ...Config.Types.Area.propTypes,
    ...Config.Types.Identification.propTypes,
    ...Config.Types.Preference.propTypes,
    ...Config.Types.Detail.Preferences.propTypes,
    ...Config.Types.Detail.Properties.propTypes,
    baseUri: JokeProvider.propTypes.baseUri,
    oid: JokeProvider.propTypes.oid,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: DEFAULT_PROPS,
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    let { baseUri, oid, showCategories, showAuthor, showCreationTime, disableUserPreference, uu5Id, ...viewProps } =
      props;

    const subApp = useSubApp();
    baseUri = props.baseUri || subApp.baseUri;

    const defaultPreference = { showCategories, showAuthor, showCreationTime };

    function handleOnCopyComponent() {
      return createCopyTag(
        Config.DefaultBrickTags.JOKE_DETAIL,
        { ...props, uu5Id: "${idHex32}" },
        ["baseUri", "oid", "showCategories", "showAuthor", "showCreationTime", "disableUserPreference", "uu5Id"],
        DEFAULT_PROPS
      );
    }

    function handleOpenToNewTab() {
      const componentProps = { baseUri, oid, uu5Id };
      redirectToPlus4UGo(Config.DefaultBrickTags.JOKE_DETAIL, componentProps, {
        top: true,
        baseUri,
        languages: Config.SupportedLanguages,
      });
    }
    //@@viewOff:private

    //@@viewOn:render
    return (
      <JokesProvider baseUri={baseUri}>
        {({ subAppDataObject, awscDataObject, systemDataObject, appWorkspace }) => (
          <PermissionProvider profileList={systemDataObject.data?.profileData?.uuIdentityProfileList}>
            {(jokesPermission) => (
              <JokeProvider baseUri={baseUri} oid={oid}>
                {({ jokeDataObject }) => (
                  <PreferenceProvider
                    baseUri={baseUri}
                    uu5Tag={STATICS.uu5Tag}
                    uu5Id={uu5Id}
                    defaultData={defaultPreference}
                    disableUserPreference={disableUserPreference}
                    skipInitialLoad
                  >
                    {({ preferenceDataObject }) => (
                      <DetailView
                        {...viewProps}
                        baseUri={baseUri}
                        jokesDataObject={subAppDataObject}
                        awscDataObject={awscDataObject}
                        jokeDataObject={jokeDataObject}
                        preferenceDataObject={preferenceDataObject}
                        jokesPermission={jokesPermission}
                        isHome={appWorkspace.isHome}
                        onCopyComponent={handleOnCopyComponent}
                        onOpenToNewTab={handleOpenToNewTab}
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
