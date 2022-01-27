//@@viewOn:imports
import { createVisualComponent, Utils, Lsi, useState } from "uu5g05";
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
      const actionList = getActions(props);

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
          <DataObjectStateResolver dataObject={props.jokesDataObject} nestingLevel="inline">
            {/* HINT: We need to trigger content render from Resolver to have all data loaded before we use them in content */}
            {() => (
              <>
                <Link onClick={handleDetail}>
                  <Lsi lsi={props.header} />
                  {` - ${props.jokesDataObject.data.name}`}
                </Link>
                {isModal && (
                  <InlineModal
                    {...modalProps}
                    shown={isModal}
                    onClose={() => setIsModal(false)}
                    actionList={actionList}
                  />
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
