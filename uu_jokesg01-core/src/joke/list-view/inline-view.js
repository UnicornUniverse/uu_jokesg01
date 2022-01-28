//@@viewOn:imports
import { createVisualComponent, Utils, Lsi, useState } from "uu5g05";
import { Link } from "uu5g05-elements";
import { DataObjectStateResolver } from "../../core/core";
import Config from "./config/config";
import InlineModal from "./inline-modal";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "InlineView",
  //@@viewOff:statics
};

// We need to use memo to avoid uncessary re-renders of whole list for better performance
// For example, when we open UpdateModal from Tile (trough events) we don't need to re-render list
export const InlineView = Utils.Component.memo(
  createVisualComponent({
    ...STATICS,

    //@@viewOn:propTypes
    propTypes: {
      ...Config.Types.InlineView.propTypes,
      ...Config.Types.IdentificationData.propTypes,
      ...Config.Types.Component.Properties.propTypes,
      ...Config.Types.Component.AsyncData.propTypes,
      ...Config.Types.Component.Internals.propTypes,
    },
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    defaultProps: {
      ...Config.Types.InlineView.defaultProps,
      ...Config.Types.IdentificationData.defaultProps,
      ...Config.Types.Component.Properties.defaultProps,
      ...Config.Types.Component.AsyncData.defaultProps,
      ...Config.Types.Component.Internals.defaultProps,
    },
    //@@viewOff:defaultProps

    render(props) {
      //@@viewOn:private
      const [isModal, setIsModal] = useState(false);

      function handleDetail(event) {
        // Is it Ctrl + click?
        if (event.ctrlKey || event.metaKey) {
          // FIXME MFA Replace Url and openWindow
          // const routeUri = `${UU5.Common.Url.parse(props.baseUri)}/${Config.Routes.JOKES}`;
          // UU5.Common.Tools.openWindow(routeUri);
        } else {
          setIsModal(true);
        }
      }
      //@@viewOff:private

      //@@viewOn:render
      const [elementProps, modalProps] = Utils.VisualComponent.splitProps(props);
      const attrs = Utils.VisualComponent.getAttrs(elementProps);

      return (
        <span {...attrs}>
          <DataObjectStateResolver
            dataObject={props.jokesDataObject}
            nestingLevel="inline"
            colorScheme={props.colorScheme}
            background={props.background}
          >
            {/* HINT: We need to trigger content render from Resolver to have all data loaded before we use them in content */}
            {() => (
              <>
                <Link onClick={handleDetail}>
                  <Lsi lsi={props.header} />
                  {` - ${props.jokesDataObject.data.name}`}
                </Link>
                {isModal && <InlineModal {...modalProps} shown={isModal} onClose={() => setIsModal(false)} />}
              </>
            )}
          </DataObjectStateResolver>
        </span>
      );
      //@@viewOff:render
    },
  })
);

export default InlineView;
