//@@viewOn:imports
import UU5 from "uu5g04";
import UuP from "uu_pg01";
import { createVisualComponent } from "uu5g04-hooks";
import { DataObjectStateResolver, DataListStateResolver } from "../../core/core";
import Config from "./config/config";
import { useTraceUpdate } from "../../core/core";
import { JokeListContent, getContentHeight } from "./joke-list-content";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "JokeListBoxCollection",
  nestingLevel: "boxCollection",
  //@@viewOff:statics
};

export const JokeListBoxCollection = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    header: UU5.PropTypes.object.isRequired,
    help: UU5.PropTypes.object.isRequired,
    jokeDataList: UU5.PropTypes.object.isRequired,
    jokesDataObject: UU5.PropTypes.object.isRequired,
    jokesPermission: UU5.PropTypes.object.isRequired,
    baseUri: UU5.PropTypes.string,
    rowCount: UU5.PropTypes.number,
    bgStyle: UU5.PropTypes.string,
    cardView: UU5.PropTypes.string,
    colorSchema: UU5.PropTypes.string,
    elevation: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    borderRadius: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    showCopyComponent: UU5.PropTypes.bool,
    onCopyComponent: UU5.PropTypes.func,
    onLoad: UU5.PropTypes.func,
    onLoadNext: UU5.PropTypes.func,
    onReload: UU5.PropTypes.func,
    onCreate: UU5.PropTypes.func,
    onDetail: UU5.PropTypes.func,
    onUpdate: UU5.PropTypes.func,
    onDelete: UU5.PropTypes.func,
    onAddRating: UU5.PropTypes.func,
    onUpdateVisibility: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    header: undefined,
    help: undefined,
    jokeDataList: undefined,
    jokesDataObject: undefined,
    jokesPermission: undefined,
    baseUri: undefined,
    rowCount: undefined,
    bgStyle: "transparent",
    cardView: "full",
    colorSchema: "default",
    elevation: 1,
    borderRadius: "0",
    showCopyComponent: false,
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
    // TODO Remove after debugging
    useTraceUpdate(props);
    //@@viewOff:private

    //@@viewOn:render
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);
    const attrs = UU5.Common.VisualComponent.getAttrs(props);

    const isDataLoaded = props.jokesDataObject.data !== null && props.jokeDataList.data !== null;
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
            dataList={props.jokeDataList}
            nestingLevel={currentNestingLevel}
            height={contentHeight}
            {...attrs}
          >
            {isDataLoaded && (
              <JokeListContent
                data={props.jokeDataList.data}
                categoryList={props.jokesDataObject.data.categoryList}
                pageSize={props.jokeDataList.pageSize}
                baseUri={props.baseUri}
                jokesPermission={props.jokesPermission}
                rowCount={props.rowCount}
                onLoad={props.onLoad}
                onLoadNext={props.onLoadNext}
                onReload={props.onReload}
                onCreate={props.onCreate}
                onDetail={props.onDetail}
                onUpdate={props.onUpdate}
                onDelete={props.onDelete}
                onAddRating={props.onAddRating}
                onUpdateVisibility={props.onUpdateVisibility}
                onCopyComponent={props.onCopyComponent}
                showCopyComponent={props.showCopyComponent}
                colorSchema={props.colorSchema}
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

export default UU5.Common.Component.memo(JokeListBoxCollection);
