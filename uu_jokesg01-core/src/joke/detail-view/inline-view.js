//@@viewOn:imports
import { createVisualComponent, Utils } from "uu5g05";
import { Link } from "uu5g05-elements";
import { useSubApp } from "uu_plus4u5g02";
import { DataObjectStateResolver } from "../../core/core";
import Config from "./config/config";
import Header from "./header";
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
    const [elementProps] = Utils.VisualComponent.splitProps(props);

    return (
      <Link
        {...elementProps}
        significance={props.significance}
        colorScheme={props.colorScheme}
        background={props.background}
        onClick={handleDetail}
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
      </Link>
    );
    //@@viewOff:render
  },
});

export default InlineView;
