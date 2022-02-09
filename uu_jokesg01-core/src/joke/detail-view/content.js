//@@viewOn:imports
import { createVisualComponent } from "uu5g05";
import Config from "./config/config";
import ContentView from "./content-view";
//@@viewOff:imports

export const Content = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Content",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    ...Config.Types.Detail.AsyncData.propTypes,
    ...Config.Types.Detail.Internals.propTypes,
    ...Config.Types.Detail.Properties.propTypes,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    ...Config.Types.Detail.AsyncData.defaultProps,
    ...Config.Types.Detail.Internals.defaultProps,
    ...Config.Types.Detail.Properties.defaultProps,
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
