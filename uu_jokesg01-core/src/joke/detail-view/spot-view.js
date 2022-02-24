//@@viewOn:imports
import { createVisualComponent, Utils } from "uu5g05";
import { Button } from "uu5g05-elements";
import { DataObjectStateResolver } from "../../core/core";
import Config from "./config/config";
import Header from "./header";
import JokeErrorsLsi from "../errors-lsi";
//@@viewOff:imports

export const SpotView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "SpotView",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    ...Config.Types.SpotView.propTypes,
    ...Config.Types.Detail.AsyncData.propTypes,
    ...Config.Types.Detail.Internals.propTypes,
    ...Config.Types.Detail.Properties.propTypes,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    ...Config.Types.SpotView.defaultProps,
    ...Config.Types.Detail.AsyncData.defaultProps,
    ...Config.Types.Detail.Internals.defaultProps,
    ...Config.Types.Detail.Properties.defaultProps,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const [elementProps] = Utils.VisualComponent.splitProps(props);

    return (
      <Button
        {...elementProps}
        borderRadius={props.borderRadius}
        significance={props.significance}
        colorScheme={props.colorScheme}
        background={props.background}
        onClick={props.onDetail}
        width={props.width}
      >
        <DataObjectStateResolver dataObject={props.jokesDataObject} nestingLevel="inline">
          <DataObjectStateResolver
            dataObject={props.jokeDataObject}
            nestingLevel="inline"
            customErrorLsi={JokeErrorsLsi}
          >
            {/* HINT: We need to trigger content render from last Resolver to have all data loaded before we use them in content */}
            {() => <Header joke={props.jokeDataObject.data} background={props.background} />}
          </DataObjectStateResolver>
        </DataObjectStateResolver>
      </Button>
    );
    //@@viewOff:render
  },
});

export default SpotView;
