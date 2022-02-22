//@@viewOn:imports
import { createVisualComponent, Utils, Lsi } from "uu5g05";
import { Icon, Link, Text, useSpacing } from "uu5g05-elements";
import { useSubApp } from "uu_plus4u5g02";
import { DataObjectStateResolver } from "../../core/core";
import Config from "./config/config";
import { redirectToPlus4UGo } from "../../utils/utils";
import JokeErrorsLsi from "../errors-lsi";
//@@viewOff:imports

export const InlineView = createVisualComponent({
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
    const { baseUri } = useSubApp();

    function handleDetail(event) {
      // Is it Ctrl + click?
      if (event.ctrlKey || event.metaKey) {
        const componentProps = {
          baseUri: baseUri,
          oid: props.jokeDataObject.data.id,
        };

        redirectToPlus4UGo(Config.DefaultBrickTags.JOKE_DETAIL, componentProps);
      } else {
        props.onDetail();
      }
    }
    //@@viewOff:private

    //@@viewOn:render
    const [elementProps, otherProps] = Utils.VisualComponent.splitProps(props);
    const { background, significance, colorScheme } = otherProps;

    return (
      <Link
        {...elementProps}
        significance={significance}
        colorScheme={colorScheme}
        background={background}
        onClick={handleDetail}
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
      </Link>
    );
    //@@viewOff:render
  },
});

export default InlineView;
