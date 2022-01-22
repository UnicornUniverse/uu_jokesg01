//@@viewOn:imports
import UuP from "uu_pg01";
import { createVisualComponent, PropTypes, Utils, Lsi, useEffect } from "uu5g05";
import { DataObjectStateResolver, DataListStateResolver } from "../../core/core";
import Config from "./config/config";
import { Content, getContentHeight } from "./content";
import LsiData from "./box-collection-view-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "BoxCollectionView",
  nestingLevel: "boxCollection",
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
      jokesDataObject: PropTypes.object.isRequired,
      systemDataObject: PropTypes.object.isRequired,
      awscDataObject: PropTypes.object.isRequired,
      jokesPermission: PropTypes.object.isRequired,
      categoryDataList: PropTypes.object.isRequired,
      rowCount: PropTypes.number,
      bgStyle: PropTypes.string,
      cardView: PropTypes.string,
      colorSchema: PropTypes.string,
      elevation: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      borderRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      showCopyComponent: PropTypes.bool,
      onCopyComponent: PropTypes.func,
      onLoad: PropTypes.func,
      onReload: PropTypes.func,
      onCreate: PropTypes.func,
      onUpdate: PropTypes.func,
      onDelete: PropTypes.func,
    },
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    defaultProps: {
      bgStyle: "transparent",
      cardView: "full",
      colorSchema: "default",
      elevation: 1,
      borderRadius: "0",
      showCopyComponent: true,
      onCopyComponent: () => {},
      onLoad: () => {},
      onReload: () => {},
      onCreate: () => {},
      onUpdate: () => {},
      onDelete: () => {},
    },
    //@@viewOff:defaultProps

    render(props) {
      //@@viewOn:private
      // HINT: Check the Joke.ListView.BoxCollection for explanation of this effect.
      useEffect(() => {
        if (props.categoryDataList.state === "readyNoData") {
          props.categoryDataList.handlerMap.load();
        }
      });
      //@@viewOff:private

      //@@viewOn:render
      const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, STATICS);
      const contentHeight = getContentHeight(props.rowCount);

      return (
        <UuP.Bricks.ComponentWrapper
          header={<Lsi lsi={props.header} />}
          help={<Lsi lsi={props.help} />}
          cardView={props.cardView}
          actionList={getActions(props)}
          elevation={props.elevation}
          borderRadius={props.borderRadius}
          hideCopyComponent={true}
          disabled={props.disabled}
          hidden={props.hidden}
          className={props.className}
          style={props.style}
          mainAttrs={props.mainAttrs}
          noIndex={props.noIndex}
          ref_={props.ref_}
        >
          <DataObjectStateResolver
            dataObject={props.jokesDataObject}
            nestingLevel={currentNestingLevel}
            height={contentHeight}
          >
            <DataListStateResolver
              dataList={props.categoryDataList}
              nestingLevel={currentNestingLevel}
              height={contentHeight}
            >
              {/* HINT: We need to trigger Content render from last Resolver to have all data loaded before setup of Content properties */}
              {() => (
                <Content
                  categoryList={props.categoryDataList.data}
                  pageSize={props.categoryDataList.pageSize}
                  jokesPermission={props.jokesPermission}
                  rowCount={props.rowCount}
                  onLoad={props.onLoad}
                  onReload={props.onReload}
                  onCreate={props.onCreate}
                  onUpdate={props.onUpdate}
                  onDelete={props.onDelete}
                  onCopyComponent={props.onCopyComponent}
                  showCopyComponent={props.showCopyComponent}
                  nestingLevel={currentNestingLevel}
                />
              )}
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

  if (props.jokesPermission.category.canCreate()) {
    actionList.push({
      content: <Lsi lsi={LsiData.createCategory} />,
      active: true,
      onClick: props.onCreate,
      bgStyle: "filled",
      colorSchema: "primary",
    });
  }

  actionList.push({
    content: <Lsi lsi={LsiData.reloadData} />,
    onClick: props.onReload,
    bgStyle: "outline",
    colorSchema: "primary",
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
