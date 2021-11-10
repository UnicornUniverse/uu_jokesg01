//@@viewOn:imports
import UU5 from "uu5g04";
import UuP from "uu_pg01";
import { createVisualComponent, useEffect } from "uu5g04-hooks";
import { DataObjectStateResolver, DataListStateResolver } from "../../core/core";
import Config from "./config/config";
import { Content, getContentHeight } from "./content";
import Lsi from "./box-collection-view-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "BoxCollectionView",
  nestingLevel: "boxCollection",
  //@@viewOff:statics
};

// We need to use memo to avoid uncessary re-renders of whole list for better performance
// For example, when we open UpdateModal from Tile (trough events) we don't need to re-render list
export const BoxCollectionView = UU5.Common.Component.memo(
  createVisualComponent({
    ...STATICS,

    //@@viewOn:propTypes
    propTypes: {
      header: UU5.PropTypes.object.isRequired,
      help: UU5.PropTypes.object.isRequired,
      jokesDataObject: UU5.PropTypes.object.isRequired,
      jokesPermission: UU5.PropTypes.object.isRequired,
      categoryDataList: UU5.PropTypes.object.isRequired,
      rowCount: UU5.PropTypes.number,
      bgStyle: UU5.PropTypes.string,
      cardView: UU5.PropTypes.string,
      colorSchema: UU5.PropTypes.string,
      elevation: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
      borderRadius: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
      showCopyComponent: UU5.PropTypes.bool,
      onCopyComponent: UU5.PropTypes.func,
      onLoad: UU5.PropTypes.func,
      onReload: UU5.PropTypes.func,
      onCreate: UU5.PropTypes.func,
      onUpdate: UU5.PropTypes.func,
      onDelete: UU5.PropTypes.func,
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
      const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);
      const contentHeight = getContentHeight(props.rowCount);

      return (
        <UuP.Bricks.ComponentWrapper
          header={<UU5.Bricks.Lsi lsi={props.header} />}
          help={<UU5.Bricks.Lsi lsi={props.help} />}
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
      content: <UU5.Bricks.Lsi lsi={Lsi.createCategory} />,
      active: true,
      onClick: props.onCreate,
      bgStyle: "filled",
      colorSchema: "primary",
    });
  }

  actionList.push({
    content: <UU5.Bricks.Lsi lsi={Lsi.reloadData} />,
    onClick: props.onReload,
    bgStyle: "outline",
    colorSchema: "primary",
  });

  if (props.showCopyComponent) {
    actionList.push({
      content: <UU5.Bricks.Lsi lsi={Lsi.copyComponent} />,
      onClick: props.onCopyComponent,
    });
  }

  return actionList;
}

export default BoxCollectionView;
