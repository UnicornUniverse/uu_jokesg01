//@@viewOn:imports
import { createVisualComponent } from "uu5g05";
import ContentView from "./content-view";
import Config from "./config/config";
//@@viewOff:imports

export const Content = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Content",
  //@@viewOff:statics

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
    //@@viewOn:render
    const { jokesDataObject, awscDataObject, systemDataObject, ...viewProps } = props;

    return (
      <ContentView
        {...viewProps}
        jokes={props.jokesDataObject.data}
        awsc={props.awscDataObject.data}
        system={props.systemDataObject.data}
        expandButton
        editButtons
      />
    );
    //@@viewOff:render
  },
});

export default Content;
