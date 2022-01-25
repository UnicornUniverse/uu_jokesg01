//@@viewOn:imports
import { createVisualComponent, PropTypes } from "uu5g05";
import Config from "./config/config";
import ContentView from "./content-view";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Content",
  //@@viewOff:statics
};

export const Content = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    jokeDataObject: PropTypes.object.isRequired,
    jokesDataObject: PropTypes.object.isRequired,
    awscDataObject: PropTypes.object.isRequired,
    jokesPermission: PropTypes.object.isRequired,
    preferenceDataObject: PropTypes.object,
    baseUri: PropTypes.string,
    bgStyle: PropTypes.string,
    cardView: PropTypes.string,
    colorSchema: PropTypes.string,
    elevation: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    borderRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    isHome: PropTypes.bool,
    contextType: PropTypes.oneOf(["none", "basic", "full"]),
    showCopyComponent: PropTypes.bool,
    onCopyComponent: PropTypes.func,
    onUpdate: PropTypes.func,
    onAddRating: PropTypes.func,
    onReload: PropTypes.func,
    onOpenPreference: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    preferenceDataObject: {
      state: "ready",
      data: {
        showCategories: true,
        showAuthor: true,
        showCreationTime: true,
        disableUserPreference: true,
      },
    },
    bgStyle: "transparent",
    cardView: "full",
    colorSchema: "default",
    elevation: 1,
    borderRadius: "0",
    isHome: false,
    contextType: "basic",
    showCopyComponent: true,
    onCopyComponent: () => {},
    onUpdate: () => {},
    onAddRating: () => {},
    onReload: () => {},
    onOpenPreference: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:render
    const { jokesDataObject, preferenceDataObject, ...viewProps } = props;

    return (
      <ContentView
        {...viewProps}
        categoryList={jokesDataObject.data.categoryList}
        showCategories={preferenceDataObject.data.showCategories}
        showAuthor={preferenceDataObject.data.showAuthor}
        showCreationTime={preferenceDataObject.data.showCreationTime}
      />
    );
    //@@viewOff:render
  },
});

export default Content;
