//@@viewOn:imports
import { createVisualComponent, Utils } from "uu5g05";
import { Box } from "uu5g05-elements";
import { DataObjectStateResolver } from "../../core/core";
import BoxContent from "./box-content";
import Config from "./config/config";
import JokeErrorsLsi from "../errors-lsi";
//@@viewOff:imports

const PLACEHOLDER_HEIGHT = "100%";

export const BoxView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "BoxView",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    ...Config.Types.BoxView.propTypes,
    ...Config.Types.Detail.AsyncData.propTypes,
    ...Config.Types.Detail.Internals.propTypes,
    ...Config.Types.Detail.Properties.propTypes,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    ...Config.Types.BoxView.defaultProps,
    ...Config.Types.Detail.AsyncData.defaultProps,
    ...Config.Types.Detail.Internals.defaultProps,
    ...Config.Types.Detail.Properties.defaultProps,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:render
    const [elementProps, otherProps] = Utils.VisualComponent.splitProps(props);
    const { aspectRatio, size, width, height, borderRadius, ...contentProps } = otherProps;

    return (
      <Box
        {...elementProps}
        borderRadius={borderRadius}
        aspectRatio={aspectRatio}
        size={size}
        width={width}
        height={height}
        background={props.background}
        onClick={props.onDetail}
        significance="subdued"
      >
        <DataObjectStateResolver dataObject={props.jokesDataObject} height={PLACEHOLDER_HEIGHT}>
          <DataObjectStateResolver
            dataObject={props.jokeDataObject}
            height={PLACEHOLDER_HEIGHT}
            customErrorLsi={JokeErrorsLsi}
          >
            {/* HINT: We need to trigger Content render from last Resolver to have all data loaded before setup of Content properties */}
            {() => <BoxContent {...contentProps} />}
          </DataObjectStateResolver>
        </DataObjectStateResolver>
      </Box>
    );
    //@@viewOff:render
  },
});

export default BoxView;
