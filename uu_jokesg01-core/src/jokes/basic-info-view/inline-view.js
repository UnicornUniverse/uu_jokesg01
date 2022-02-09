//@@viewOn:imports
import { createVisualComponent, Utils, Lsi, useState } from "uu5g05";
import { Link, Text } from "uu5g05-elements";
import { useSubApp } from "uu_plus4u5g02";
import { DataObjectStateResolver } from "../../core/core";
import Config from "./config/config";
import InlineModal from "./inline-modal";
//@@viewOff:imports

export const InlineView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "InlineView",
  //@@viewOff:statics

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
    const { baseUri } = useSubApp();

    function handleDetail(event) {
      // Is it Ctrl + click?
      if (event.ctrlKey || event.metaKey) {
        const routeUri = `${baseUri}/${Config.Routes.CONTROL_PANEL}`;
        window.open(routeUri);
      } else {
        setIsModal(true);
      }
    }

    function handleClose() {
      setIsModal(false);
    }
    //@@viewOff:private

    //@@viewOn:render
    const [elementProps, otherProps] = Utils.VisualComponent.splitProps(props);
    const { background, significance, ...modalProps } = otherProps;

    return (
      <Text {...elementProps} background={background} significance={significance}>
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
      </Text>
    );
    //@@viewOff:render
  },
});

export default InlineView;
