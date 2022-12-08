//@@viewOn:imports
import { createVisualComponent, Utils, useLsi } from "uu5g05";
import { Link } from "uu5g05-elements";
import { DataObjectStateResolver } from "../../core/core";
import Config from "./config/config";
import Header from "./header";
import importLsi from "../../lsi/import-lsi";
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
    const errorsLsi = useLsi(importLsi, ["Errors"]);

    function handleDetail(event) {
      const options = {};

      if (event.ctrlKey || event.metaKey || event.button === 1) {
        options.isNewTab = true;
      }

      props.onDetail(options);
    }
    //@@viewOff:private

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);

    return (
      <span {...attrs}>
        <DataObjectStateResolver dataObject={props.jokesDataObject} nestingLevel="inline" customErrorLsi={errorsLsi}>
          <DataObjectStateResolver dataObject={props.jokeDataObject} nestingLevel="inline" customErrorLsi={errorsLsi}>
            {/* HINT: We need to trigger content render from last Resolver to have all data loaded before we use them in content */}
            {() => (
              <Link
                significance={props.significance === "subdued" ? props.significance : undefined}
                colorScheme={props.colorScheme}
                onClick={handleDetail}
              >
                <Header joke={props.jokeDataObject.data} hideTypeName={props.hideTypeName} />
              </Link>
            )}
          </DataObjectStateResolver>
        </DataObjectStateResolver>
      </span>
    );
    //@@viewOff:render
  },
});

export default InlineView;
