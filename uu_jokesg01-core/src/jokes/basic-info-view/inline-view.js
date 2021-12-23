//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useState } from "uu5g04-hooks";
import { DataObjectStateResolver } from "../../core/core";
import Config from "./config/config";
import Modal from "./modal";
import Link from "./link";
import Lsi from "./inline-view-lsi";
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
    baseUri: UU5.PropTypes.string,
    jokesDataObject: UU5.PropTypes.object.isRequired,
    systemDataObject: UU5.PropTypes.object.isRequired,
    awscDataObject: UU5.PropTypes.object.isRequired,
    jokesPermission: UU5.PropTypes.object.isRequired,
    isHome: UU5.PropTypes.bool,
    contextType: UU5.PropTypes.oneOf(["none", "basic", "full"]),
    header: UU5.PropTypes.object.isRequired,
    bgStyle: UU5.PropTypes.string,
    cardView: UU5.PropTypes.string,
    colorSchema: UU5.PropTypes.string,
    elevation: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    borderRadius: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    showCopyComponent: UU5.PropTypes.bool,
    onCopyComponent: UU5.PropTypes.func,
    onReload: UU5.PropTypes.func,
    onUpdate: UU5.PropTypes.func,
    onSetState: UU5.PropTypes.func,
    expanded: UU5.PropTypes.bool,
    expandButton: UU5.PropTypes.bool,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    isHome: false,
    contextType: "basic",
    bgStyle: "transparent",
    cardView: "full",
    colorSchema: "default",
    elevation: 1,
    borderRadius: "0",
    showCopyComponent: true,
    onCopyComponent: () => {},
    onReload: () => {},
    onUpdate: () => {},
    onSetState: () => {},
    expanded: false,
    expandButton: true,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [isModal, setIsModal] = useState(false);

    function handleNewWindow() {
      const routeUri = `${UU5.Common.Url.parse(props.baseUri)}/${Config.Routes.CONTROL_PANEL}`;
      UU5.Common.Tools.openWindow(routeUri);
    }

    function handleDetail(eventType) {
      if (eventType === "newWindow") {
        handleNewWindow();
      } else {
        setIsModal(true);
      }
    }

    function handleClose() {
      setIsModal(false);
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props);

    return (
      <span {...attrs}>
        <DataObjectStateResolver dataObject={props.jokesDataObject} nestingLevel="inline">
          {/* HINT: We need to trigger content render from Resolver to have all data loaded before we use them in content */}
          {() => (
            <>
              <Link header={props.header} onDetail={handleDetail} jokesDataObject={props.jokesDataObject} />
              {isModal && (
                <Modal
                  header={props.header}
                  jokesDataObject={props.jokesDataObject}
                  awscDataObject={props.awscDataObject}
                  systemDataObject={props.systemDataObject}
                  jokesPermission={props.jokesPermission}
                  isHome={props.isHome}
                  expanded={props.expanded}
                  expandButton={props.expandButton}
                  onClose={handleClose}
                  onUpdate={props.onUpdate}
                  onSetState={props.onSetState}
                  bgStyle={props.bgStyle}
                  cardView={props.cardView}
                  colorSchema={props.colorSchema}
                  elevation={props.elevation}
                  borderRadius={props.borderRadius}
                  actionList={getActions(props)}
                  disabled={props.disabled}
                  editButtons
                  shown
                />
              )}
            </>
          )}
        </DataObjectStateResolver>
      </span>
    );
    //@@viewOff:render
  },
});

function getActions(props) {
  const isDataLoaded = props.jokesDataObject.data !== null;
  const actionList = [];

  if (isDataLoaded) {
    actionList.push({
      icon: "mdi-sync",
      children: <UU5.Bricks.Lsi lsi={Lsi.reloadData} />,
      onClick: props.onReload,
      collapsed: true,
      disabled: props.disabled,
    });
  }

  if (props.showCopyComponent) {
    actionList.push({
      icon: "mdi-content-copy",
      children: <UU5.Bricks.Lsi lsi={Lsi.copyComponent} />,
      onClick: props.onCopyComponent,
      collapsed: true,
      disabled: props.disabled,
    });
  }

  return actionList;
}

export default InlineView;
