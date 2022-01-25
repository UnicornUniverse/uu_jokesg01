//@@viewOn:imports
import UuP from "uu_pg01";
import { createVisualComponent, PropTypes, Utils, Lsi, useEffect } from "uu5g05";
import { DataObjectStateResolver, DataListStateResolver } from "../../core/core";
import { getContextBarProps } from "../../jokes/context-bar";
import Config from "./config/config";
import { Content, getContentHeight } from "./content";
import LsiData from "./box-collection-view-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "BoxCollectionView",
  //@@viewOff:statics
};

// We need to use memo to avoid uncessary re-renders of whole list for better performance
// For example, when we open UpdateModal from Tile (trough events) we don't need to re-render list
export const BoxCollectionView = Utils.Component.memo(
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
      baseUri: PropTypes.string,
      rowCount: PropTypes.number,
      bgStyle: PropTypes.string,
      cardView: PropTypes.string,
      colorSchema: PropTypes.string,
      elevation: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      borderRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      isHome: PropTypes.bool,
      contextType: PropTypes.oneOf(["none", "basic", "full"]),
      showCopyComponent: PropTypes.bool,
      onCopyComponent: PropTypes.func,
      onLoad: PropTypes.func,
      onLoadNext: PropTypes.func,
      onReload: PropTypes.func,
      onCreate: PropTypes.func,
      onDetail: PropTypes.func,
      onUpdate: PropTypes.func,
      onDelete: PropTypes.func,
      onAddRating: PropTypes.func,
      onUpdateVisibility: PropTypes.func,
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
      showCopyComponent: true,
      onCopyComponent: () => {},
      onLoad: () => {},
      onLoadNext: () => {},
      onReload: () => {},
      onCreate: () => {},
      onDetail: () => {},
      onUpdate: () => {},
      onDelete: () => {},
      onAddRating: () => {},
      onUpdateVisibility: () => {},
    },
    //@@viewOff:defaultProps

    render(props) {
      //@@viewOn:private
      // HINT: The Joke.ListProvider is rendered with prop skipInitialLoad.
      // The view is responsible to tell when the jokeDataList should be loaded.
      // And why? In inline nesting level we need to load data only when user opens
      // the modal window BUT in this component we need to load data immediately.
      useEffect(() => {
        if (props.jokeDataList.state === "readyNoData") {
          props.jokeDataList.handlerMap.load();
        }
      });

      const actionList = getActions(props);
      //@@viewOff:private

      //@@viewOn:render
      const [elementProps, otherProps] = Utils.VisualComponent.splitProps(props);
      const { header, help, cardView, elevation, borderRadius, bgStyle, contextType, ...contentProps } = otherProps;

      const contentHeight = getContentHeight(props.rowCount);

      const isDataLoaded = props.jokesDataObject.data !== null && props.jokeDataList.data !== null;

      const contextBarProps = isDataLoaded
        ? getContextBarProps(props.jokesDataObject.data, props.awscDataObject.data, props.contextType, props.isHome)
        : null;

      return (
        <UuP.Bricks.ComponentWrapper
          {...elementProps}
          header={<Lsi lsi={header} />}
          help={<Lsi lsi={help} />}
          contextBarProps={contextBarProps}
          contextType={contextType}
          cardView={cardView}
          elevation={elevation}
          bgStyle={bgStyle}
          borderRadius={borderRadius}
          actionList={actionList}
          hideCopyComponent
        >
          <DataObjectStateResolver dataObject={props.jokesDataObject} height={contentHeight}>
            <DataListStateResolver dataList={props.jokeDataList} height={contentHeight}>
              {/* HINT: We need to trigger Content render from last Resolver to have all data loaded before setup of Content properties */}
              {() => <Content {...contentProps} />}
            </DataListStateResolver>
          </DataObjectStateResolver>
        </UuP.Bricks.ComponentWrapper>
      );
      //@@viewOff:render
    },
  })
);

function getActions(props) {
  const actionList = [];

  if (props.jokesPermission.joke.canCreate()) {
    actionList.push({
      // note: note icon setting
      content: <Lsi lsi={LsiData.createJoke} />,
      onClick: props.onCreate,
      active: true,
    });
  }

  actionList.push({
    content: <Lsi lsi={LsiData.reloadData} />,
    onClick: props.onReload,
  });

  if (props.showCopyComponent) {
    actionList.push({
      content: <Lsi lsi={LsiData.copyComponent} />,
      onClick: props.onCopyComponent,
    });
  }

  return actionList;
}

export default BoxCollectionView;
