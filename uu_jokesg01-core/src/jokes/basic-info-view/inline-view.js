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

export const InlineView = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    ...Config.Types.InlineView.propTypes,
    ...Config.Types.Component.AsyncData.propTypes,
    ...Config.Types.Component.Internals.propTypes,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    ...Config.Types.InlineView.defaultProps,
    ...Config.Types.Component.AsyncData.defaultProps,
    ...Config.Types.Component.Internals.defaultProps,
    ...Config.Types.Component.Properties.defaultProps,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [isModal, setIsModal] = useState(false);

    function handleDetail(event) {
      // Is it Ctrl + click?
      if (event.ctrlKey || event.metaKey) {
        // FIXME MFA Change Url and openWindow
        //const routeUri = `${UU5.Common.Url.parse(props.baseUri)}/${Config.Routes.CONTROL_PANEL}`;
        //UU5.Common.Tools.openWindow(routeUri);
      } else {
        setIsModal(true);
      }
    }

    function handleClose() {
      setIsModal(false);
    }
    //@@viewOff:private

    //@@viewOn:render
    const [elementProps, modalProps] = Utils.VisualComponent.splitProps(props);
    const attrs = Utils.VisualComponent.getAttrs(elementProps);

    return (
      <span {...attrs}>
        <DataObjectStateResolver dataObject={props.jokesDataObject} nestingLevel="inline">
          {/* HINT: We need to trigger content render from Resolver to have all data loaded before we use them in content */}
          {() => (
            <>
              <span>
                <Lsi lsi={props.header} />
                {" - "}
                <Link onClick={handleDetail}>{props.jokesDataObject.data.name}</Link>
              </span>
              {isModal && <InlineModal {...modalProps} onClose={handleClose} shown />}
            </>
          )}
        </DataObjectStateResolver>
      </span>
    );
    //@@viewOff:render
  },
});

export default InlineView;
