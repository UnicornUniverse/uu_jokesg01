//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useState } from "uu5g04-hooks";
import { DataObjectStateResolver } from "../../core/core";
import Config from "./config/config";
import Modal from "./modal";
import Lsi from "./inline-view-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "InlineView",
  //@@viewOff:statics
};

// We need to use memo to avoid uncessary re-renders of whole list for better performance
// For example, when we open UpdateModal from Tile (trough events) we don't need to re-render list
export const InlineView = UU5.Common.Component.memo(
  createVisualComponent({
    ...STATICS,

    //@@viewOn:propTypes
    propTypes: {
      header: UU5.PropTypes.object.isRequired,
      help: UU5.PropTypes.object.isRequired,
      jokeDataList: UU5.PropTypes.object.isRequired,
      jokesDataObject: UU5.PropTypes.object.isRequired,
      jokesPermission: UU5.PropTypes.object.isRequired,
      baseUri: UU5.PropTypes.string,
      bgStyle: UU5.PropTypes.string,
      cardView: UU5.PropTypes.string,
      colorSchema: UU5.PropTypes.string,
      elevation: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
      borderRadius: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
      onLoad: UU5.PropTypes.func,
      onLoadNext: UU5.PropTypes.func,
      onReload: UU5.PropTypes.func,
      onCreate: UU5.PropTypes.func,
      onDetail: UU5.PropTypes.func,
      onUpdate: UU5.PropTypes.func,
      onDelete: UU5.PropTypes.func,
      onAddRating: UU5.PropTypes.func,
      onUpdateVisibility: UU5.PropTypes.func,
      onCopyComponent: UU5.PropTypes.func,
      showCopyComponent: UU5.PropTypes.bool,
    },
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    defaultProps: {
      bgStyle: "transparent",
      cardView: "full",
      colorSchema: "default",
      elevation: 1,
      borderRadius: "0",
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
        const routeUri = `${UU5.Common.Url.parse(props.baseUri)}/${Config.Routes.JOKES}`;
        UU5.Common.Tools.openWindow(routeUri);
      }

      function handleDetail() {
        setIsModal(true);
      }
      //@@viewOff:private

      //@@viewOn:render
      const attrs = UU5.Common.VisualComponent.getAttrs(props);

      return (
        <span {...attrs}>
          <DataObjectStateResolver dataObject={props.jokesDataObject} nestingLevel="inline">
            {/* HINT: We need to trigger content render from Resolver to have all data loaded before we use them in content */}
            {() => (
              <>
                <UU5.Bricks.Link onClick={handleDetail} onCtrlClick={handleNewWindow}>
                  <UU5.Bricks.Lsi lsi={props.header} />
                  {` - ${props.jokesDataObject.data.name}`}
                </UU5.Bricks.Link>
                {isModal && (
                  <Modal {...props} shown={isModal} onClose={() => setIsModal(false)} actionList={actionList} />
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
      children: <UU5.Bricks.Lsi lsi={Lsi.createJoke} />,
      primary: true,
      onClick: props.onCreate,
    });
  }

  actionList.push({
    icon: "mdi-reload",
    children: <UU5.Bricks.Lsi lsi={Lsi.reloadList} />,
    onClick: props.onReload,
    collapsed: true,
  });

  if (props.showCopyComponent) {
    actionList.push({
      children: <UU5.Bricks.Lsi lsi={Lsi.copyComponent} />,
      onClick: props.onCopyComponent,
      collapsed: true,
    });
  }

  return actionList;
}

export default InlineView;
