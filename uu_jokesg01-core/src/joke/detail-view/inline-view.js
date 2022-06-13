//@@viewOn:imports
import { createVisualComponent, Utils } from "uu5g05";
import { Link } from "uu5g05-elements";
import { DataObjectStateResolver } from "../../core/core";
import Config from "./config/config";
import Header from "./header";
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
    function handleDetail(event) {
      const options = {};

      if (event.ctrlKey || event.metaKey) {
        options.isNewTab = true;
      }

      props.onDetail(options);
    }
    //@@viewOff:private

    //@@viewOn:render
    const [elementProps] = Utils.VisualComponent.splitProps(props);

    return (
      <Link
        {...elementProps}
        significance={props.significance === "subdued" ? props.significance : undefined}
        colorScheme={props.colorScheme}
        onClick={handleDetail}
      >
        <DataObjectStateResolver dataObject={props.jokesDataObject} nestingLevel="inline">
          <DataObjectStateResolver
            dataObject={props.jokeDataObject}
            nestingLevel="inline"
            customErrorLsi={JokeErrorsLsi}
          >
            {/* HINT: We need to trigger content render from last Resolver to have all data loaded before we use them in content */}
            {() => <Header joke={props.jokeDataObject.data} hideTypeName={props.hideTypeName} />}
          </DataObjectStateResolver>
        </DataObjectStateResolver>
      </Link>
    );
    //@@viewOff:render
  },
});

export default InlineView;
