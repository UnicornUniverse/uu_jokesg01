//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils, Lsi, useState } from "uu5g05";
import { DataObjectStateResolver } from "../../core/core";
import Config from "./config/config";
import InlineModal from "./inline-modal";
import InlineLink from "./inline-link";
import LsiData from "./inline-view-lsi";
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
    baseUri: PropTypes.string,
    jokesDataObject: PropTypes.object.isRequired,
    systemDataObject: PropTypes.object.isRequired,
    awscDataObject: PropTypes.object.isRequired,
    jokesPermission: PropTypes.object.isRequired,
    isHome: PropTypes.bool,
    contextType: PropTypes.oneOf(["none", "basic", "full"]),
    header: PropTypes.object.isRequired,
    bgStyle: PropTypes.string,
    cardView: PropTypes.string,
    colorSchema: PropTypes.string,
    elevation: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    borderRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    showCopyComponent: PropTypes.bool,
    onCopyComponent: PropTypes.func,
    onReload: PropTypes.func,
    onUpdate: PropTypes.func,
    onSetState: PropTypes.func,
    expanded: PropTypes.bool,
    expandButton: PropTypes.bool,
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
      // FIXME MFA Change Url and openWindow
      //const routeUri = `${UU5.Common.Url.parse(props.baseUri)}/${Config.Routes.CONTROL_PANEL}`;
      //UU5.Common.Tools.openWindow(routeUri);
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

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);

    return (
      <span {...attrs}>
        <DataObjectStateResolver dataObject={props.jokesDataObject} nestingLevel="inline">
          {/* HINT: We need to trigger content render from Resolver to have all data loaded before we use them in content */}
          {() => (
            <>
              <InlineLink header={props.header} onDetail={handleDetail} jokesDataObject={props.jokesDataObject} />
              {isModal && (
                <InlineModal
                  header={props.header}
                  jokesDataObject={props.jokesDataObject}
                  awscDataObject={props.awscDataObject}
                  systemDataObject={props.systemDataObject}
                  jokesPermission={props.jokesPermission}
                  isHome={props.isHome}
                  contextType={props.contextType}
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
      children: <Lsi lsi={LsiData.reloadData} />,
      onClick: props.onReload,
      collapsed: true,
      disabled: props.disabled,
    });
  }

  if (props.showCopyComponent) {
    actionList.push({
      icon: "mdi-content-copy",
      children: <Lsi lsi={LsiData.copyComponent} />,
      onClick: props.onCopyComponent,
      collapsed: true,
      disabled: props.disabled,
    });
  }

  return actionList;
}

export default InlineView;
