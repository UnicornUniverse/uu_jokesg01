//@@viewOn:imports
import { createVisualComponent, Utils, useLsi } from "uu5g05";
import { Button } from "uu5g05-elements";
import { DataObjectStateResolver } from "../../core/core";
import Config from "./config/config";
import Header from "./header";
import importLsi from "../../lsi/import-lsi";
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
    //@@viewOn:private
    const errorsLsi = useLsi(importLsi, ["Errors"]);
    //@@viewOff:private

    //@@viewOn:render
    const [elementProps] = Utils.VisualComponent.splitProps(props);

    return (
      <Button
        {...elementProps}
        borderRadius={props.borderRadius}
        significance={props.significance}
        colorScheme={props.colorScheme}
        onClick={props.onDetail}
        width={props.width}
        size={props.size}
      >
        <DataObjectStateResolver dataObject={props.jokesDataObject} nestingLevel="inline">
          <DataObjectStateResolver dataObject={props.jokeDataObject} nestingLevel="inline" customErrorLsi={errorsLsi}>
            {/* HINT: We need to trigger content render from last Resolver to have all data loaded before we use them in content */}
            {() => <Header joke={props.jokeDataObject.data} hideTypeName={props.hideTypeName} />}
          </DataObjectStateResolver>
        </DataObjectStateResolver>
      </Button>
    );
    //@@viewOff:render
  },
});

export default SpotView;
