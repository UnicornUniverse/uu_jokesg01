//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
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
    baseUri: UU5.PropTypes.string,
    jokeId: UU5.PropTypes.string.isRequired,
    bgStyle: UU5.PropTypes.string,
    cardView: UU5.PropTypes.string,
    colorSchema: UU5.PropTypes.string,
    elevation: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    borderRadius: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    showCopyComponent: UU5.PropTypes.bool,
    showCategories: UU5.PropTypes.bool,
    showAuthor: UU5.PropTypes.bool,
    showCreationTime: UU5.PropTypes.bool,
    uu5Id: UU5.PropTypes.string,
    disableUserPreference: UU5.PropTypes.bool,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: DEFAULT_PROPS,
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const subApp = useSubApp();
    const baseUri = props.baseUri || subApp.baseUri;

    const defaultPreference = {
      showCategories: props.showCategories,
      showAuthor: props.showAuthor,
      showCreationTime: props.showCreationTime,
    };

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
        {({ subAppDataObject, awscDataObject, systemDataObject }) => (
          <PermissionProvider profileList={systemDataObject.data?.profileData.uuIdentityProfileList}>
            {(jokesPermission) => (
              <JokeProvider baseUri={baseUri} id={props.jokeId}>
                {({ jokeDataObject }) => (
                  <PreferenceProvider
                    baseUri={baseUri}
                    uu5Tag={STATICS.displayName}
                    uu5Id={props.uu5Id}
                    defaultData={defaultPreference}
                    disableUserPreference={props.disableUserPreference}
                    skipInitialLoad
                  >
                    {({ preferenceDataObject }) => (
                      <DetailView
                        jokesDataObject={subAppDataObject}
                        awscDataObject={awscDataObject}
                        systemDataObject={systemDataObject}
                        jokeDataObject={jokeDataObject}
                        preferenceDataObject={preferenceDataObject}
                        jokesPermission={jokesPermission}
                        baseUri={baseUri}
                        bgStyle={props.bgStyle}
                        cardView={props.cardView}
                        colorSchema={props.colorSchema}
                        elevation={props.elevation}
                        borderRadius={props.borderRadius}
                        nestingLevel={props.nestingLevel}
                        showCopyComponent={props.showCopyComponent}
                        disabled={props.disabled}
                        hidden={props.hidden}
                        className={props.className}
                        style={props.style}
                        mainAttrs={props.mainAttrs}
                        noIndex={props.noIndex}
                        ref_={props.ref_}
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
