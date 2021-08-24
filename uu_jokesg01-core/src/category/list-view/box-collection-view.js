//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import UuP from "uu_pg01";
import { DataObjectStateResolver, DataListStateResolver } from "../../core/core";
import Config from "./config/config";
import { Content, getContentHeight } from "./content";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "BoxCollectionView",
  nestingLevel: "boxCollection",
  //@@viewOff:statics
};

export const BoxCollectionView = createVisualComponent({
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
    header: undefined,
    help: undefined,
    jokesDataObject: undefined,
    jokesPermission: undefined,
    categoryDataList: undefined,
    rowCount: undefined,
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
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);
    const attrs = UU5.Common.VisualComponent.getAttrs(props);

    const isDataLoaded = props.categoryDataList.data !== null && props.jokesDataObject.data !== null;
    const contentHeight = getContentHeight(props.rowCount);

    return (
      <UuP.Bricks.ComponentWrapper
        header={<UU5.Bricks.Lsi lsi={props.header} />}
        help={<UU5.Bricks.Lsi lsi={props.help} />}
        cardView={props.cardView}
        copyTagFunc={props.onCopyComponent}
        elevation={props.elevation}
        borderRadius={props.borderRadius}
        hideCopyComponent={true}
        {...attrs}
      >
        <DataObjectStateResolver
          dataObject={props.jokesDataObject}
          nestingLevel={currentNestingLevel}
          height={contentHeight}
          {...attrs}
        >
          <DataListStateResolver
            dataList={props.categoryDataList}
            nestingLevel={currentNestingLevel}
            height={contentHeight}
            {...attrs}
          >
            {isDataLoaded && (
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
});

export default UU5.Common.Component.memo(BoxCollectionView);
