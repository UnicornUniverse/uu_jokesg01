//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils, Lsi, useState } from "uu5g05";
import { Link } from "uu5g05-elements";
import { DataObjectStateResolver } from "../../core/core";
import Config from "./config/config";
import InlineModal from "./inline-modal";
import LsiData from "./inline-view-lsi";
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
      header: PropTypes.object.isRequired,
      help: PropTypes.object.isRequired,
      jokeDataList: PropTypes.object.isRequired,
      jokesDataObject: PropTypes.object.isRequired,
      awscDataObject: PropTypes.object.isRequired,
      jokesPermission: PropTypes.object.isRequired,
      isHome: PropTypes.bool,
      contextType: PropTypes.oneOf(["none", "basic", "full"]),
      baseUri: PropTypes.string,
      bgStyle: PropTypes.string,
      cardView: PropTypes.string,
      colorSchema: PropTypes.string,
      elevation: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      borderRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      onLoad: PropTypes.func,
      onLoadNext: PropTypes.func,
      onReload: PropTypes.func,
      onCreate: PropTypes.func,
      onDetail: PropTypes.func,
      onUpdate: PropTypes.func,
      onDelete: PropTypes.func,
      onAddRating: PropTypes.func,
      onUpdateVisibility: PropTypes.func,
      onCopyComponent: PropTypes.func,
      showCopyComponent: PropTypes.bool,
    },
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    defaultProps: {
      bgStyle: "transparent",
      cardView: "full",
      colorSchema: "default",
      elevation: 1,
      borderRadius: "0",
      isHome: false,
      contextType: "basic",
      onLoad: () => {},
      onLoadNext: () => {},
      onReload: () => {},
      onCreate: () => {},
      onDetail: () => {},
      onUpdate: () => {},
      onDelete: () => {},
      onAddRating: () => {},
      onUpdateVisibility: () => {},
      onCopyComponent: () => {},
      showCopyComponent: true,
    },
    //@@viewOff:defaultProps

    render(props) {
      //@@viewOn:private
      const [isModal, setIsModal] = useState(false);
      const actionList = getActions(props);

      function handleNewWindow() {
        // FIXME MFA Replace Url and openWindow
        // const routeUri = `${UU5.Common.Url.parse(props.baseUri)}/${Config.Routes.JOKES}`;
        // UU5.Common.Tools.openWindow(routeUri);
      }

      function handleDetail() {
        setIsModal(true);
      }
      //@@viewOff:private

      //@@viewOn:render
      const attrs = Utils.VisualComponent.getAttrs(props);

      return (
        <span {...attrs}>
          <DataObjectStateResolver dataObject={props.jokesDataObject} nestingLevel="inline">
            {/* HINT: We need to trigger content render from Resolver to have all data loaded before we use them in content */}
            {
              // ISSUE Uu5Elements.Link - Missing property onCtrlClick
              // https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=61ebcef4572961002969f197
            }
            {() => (
              <>
                <Link onClick={handleDetail} onCtrlClick={handleNewWindow}>
                  <Lsi lsi={props.header} />
                  {` - ${props.jokesDataObject.data.name}`}
                </Link>
                {isModal && (
                  <InlineModal {...props} shown={isModal} onClose={() => setIsModal(false)} actionList={actionList} />
                )}
              </>
            )}
          </DataObjectStateResolver>
        </span>
      );
      //@@viewOff:render
    },
  })
);

function getActions(props) {
  const actionList = [];

  if (props.jokesPermission.joke.canCreate()) {
    actionList.push({
      icon: "mdi-plus",
      children: <Lsi lsi={LsiData.createJoke} />,
      primary: true,
      onClick: props.onCreate,
      disabled: props.disabled,
    });
  }

  actionList.push({
    icon: "mdi-sync",
    children: <Lsi lsi={LsiData.reloadData} />,
    onClick: props.onReload,
    collapsed: true,
    disabled: props.disabled,
  });

  if (props.showCopyComponent) {
    actionList.push({
      icon: "mdi-content-copy",
      children: <Lsi lsi={LsiData.copyComponent} />,
      onClick: props.onCopyComponent,
      collapsed: true,
    });
  }

  return actionList;
}

export default InlineView;
