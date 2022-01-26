//@@viewOn:imports
import { createVisualComponent } from "uu5g05";
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
    ...Config.Types.Component.AsyncData.propTypes,
    ...Config.Types.Component.Internals.propTypes,
    ...Config.Types.Component.Properties.propTypes,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    ...Config.Types.Component.AsyncData.defaultProps,
    ...Config.Types.Component.Internals.defaultProps,
    ...Config.Types.Component.Properties.defaultProps,
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
