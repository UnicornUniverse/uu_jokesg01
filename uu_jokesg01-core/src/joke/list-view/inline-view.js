//@@viewOn:imports
import { createVisualComponent, Utils, useLsi } from "uu5g05";
import { Link } from "uu5g05-elements";
import { useSubApp } from "uu_plus4u5g02";
import { DataObjectStateResolver } from "../../core/core";
import Config from "./config/config";
import importLsi from "../../lsi/import-lsi";
//@@viewOff:imports

// We need to use memo to avoid uncessary re-renders of whole list for better performance
// For example, when we open UpdateModal from Tile (trough events) we don't need to re-render list
export const InlineView = Utils.Component.memo(
  createVisualComponent({
    //@@viewOn:statics
    uu5Tag: Config.TAG + "InlineView",
    //@@viewOff:statics

    //@@viewOn:propTypes
    propTypes: {
      ...Config.Types.InlineView.propTypes,
      ...Config.Types.IdentificationData.propTypes,
      ...Config.Types.List.Properties.propTypes,
      ...Config.Types.List.AsyncData.propTypes,
      ...Config.Types.List.Internals.propTypes,
    },
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    defaultProps: {
      ...Config.Types.InlineView.defaultProps,
      ...Config.Types.IdentificationData.defaultProps,
      ...Config.Types.List.Properties.defaultProps,
      ...Config.Types.List.AsyncData.defaultProps,
      ...Config.Types.List.Internals.defaultProps,
    },
    //@@viewOff:defaultProps

    render(props) {
      //@@viewOn:private
      const errorsLsi = useLsi(importLsi, ["Errors"]);
      const { baseUri } = useSubApp();

      function handleDetail(event) {
        // Is it Ctrl + click?
        if (event.ctrlKey || event.metaKey) {
          const routeUri = `${baseUri}/${Config.Routes.JOKES}`;
          window.open(routeUri);
        } else {
          props.onDetail();
        }
      }
      //@@viewOff:private

      //@@viewOn:render
      const attrs = Utils.VisualComponent.getAttrs(props);

      return (
        <span {...attrs}>
          <DataObjectStateResolver
            dataObject={props.jokesDataObject}
            nestingLevel="inline"
            colorScheme={props.colorScheme}
            customErrorLsi={errorsLsi}
          >
            {/* HINT: We need to trigger content render from Resolver to have all data loaded before we use them in content */}
            {() => (
              <Link
                significance={props.significance === "subdued" ? props.significance : undefined}
                colorScheme={props.colorScheme}
                onClick={handleDetail}
              >
                {props.header}
                {` - ${props.jokesDataObject.data.name}`}
              </Link>
            )}
          </DataObjectStateResolver>
        </span>
      );
      //@@viewOff:render
    },
  })
);

export default InlineView;
