//@@viewOn:imports
import { createVisualComponent, Utils, Lsi } from "uu5g05";
import { Icon, Text, Button, useSpacing } from "uu5g05-elements";
import { DataObjectStateResolver } from "../../core/core";
import Config from "./config/config";
import JokeErrorsLsi from "../errors-lsi";
//@@viewOff:imports

export const SpotView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "InlineView",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    ...Config.Types.InlineView.propTypes,
    ...Config.Types.Detail.AsyncData.propTypes,
    ...Config.Types.Detail.Internals.propTypes,
    ...Config.Types.Detail.Properties.propTypes,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    ...Config.Types.InlineView.defaultProps,
    ...Config.Types.Detail.AsyncData.defaultProps,
    ...Config.Types.Detail.Internals.defaultProps,
    ...Config.Types.Detail.Properties.defaultProps,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const spacing = useSpacing();
    //@@viewOff:private

    //@@viewOn:render
    const [elementProps, otherProps] = Utils.VisualComponent.splitProps(props);
    const { borderRadius, significance, colorScheme, width, background } = otherProps;

    return (
      <Button
        {...elementProps}
        borderRadius={borderRadius}
        significance={significance}
        colorScheme={colorScheme}
        background={background}
        onClick={props.onDetail}
        width={width}
      >
        <DataObjectStateResolver dataObject={props.jokesDataObject} nestingLevel="inline">
          <DataObjectStateResolver
            dataObject={props.jokeDataObject}
            nestingLevel="inline"
            customErrorLsi={JokeErrorsLsi}
          >
            {/* HINT: We need to trigger content render from last Resolver to have all data loaded before we use them in content */}
            {() => (
              <>
                {!props.jokeDataObject.data.visibility && (
                  <Text colorScheme="building" significance="subdued">
                    <Icon icon="mdi-eye-off" margin={{ right: spacing.spaceC }} />
                  </Text>
                )}
                <Lsi lsi={props.header} />
                {" - "}
                {props.jokeDataObject.data.name}
              </>
            )}
          </DataObjectStateResolver>
        </DataObjectStateResolver>
      </Button>
    );
    //@@viewOff:render
  },
});

export default SpotView;
