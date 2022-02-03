//@@viewOn:imports
import { createVisualComponent } from "uu5g05";
import Config from "./config/config";
import ContentView, { getContentHeight } from "./content-view";
//@@viewOff:imports

export const Content = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Content",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    ...Config.Types.Component.Properties.propTypes,
    ...Config.Types.Component.AsyncData.propTypes,
    ...Config.Types.Component.Internals.propTypes,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    ...Config.Types.Component.Properties.defaultProps,
    ...Config.Types.Component.AsyncData.defaultProps,
    ...Config.Types.Component.Internals.defaultProps,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:render
    const { jokeDataList, jokesDataObject, ...viewProps } = props;

    return (
      <ContentView
        {...viewProps}
        data={props.jokeDataList.data}
        categoryList={props.jokesDataObject.data.categoryList}
        pageSize={props.jokeDataList.pageSize}
      />
    );
    //@@viewOff:render
  },
});

export { getContentHeight };

export default Content;
