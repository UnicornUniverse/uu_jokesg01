//@@viewOn:imports
import { createVisualComponent, Utils, Lsi, useEffect } from "uu5g05";
import { Block } from "uu5g05-elements";
import { DataObjectStateResolver, DataListStateResolver } from "../../core/core";
import Config from "./config/config";
import { ContentView, getContentHeight } from "./content-view";
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
      ...Config.Types.BoxView.propTypes,
      ...Config.Types.IdentificationData.propTypes,
      ...Config.Types.Component.Properties.propTypes,
      ...Config.Types.Component.AsyncData.propTypes,
      ...Config.Types.Component.Internals.propTypes,
    },
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    defaultProps: {
      ...Config.Types.BoxView.defaultProps,
      ...Config.Types.Component.Properties.defaultProps,
      ...Config.Types.Component.AsyncData.defaultProps,
      ...Config.Types.Component.Internals.defaultProps,
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
      const [elementProps, otherProps] = Utils.VisualComponent.splitProps(props);
      const { header, info, card, background, significance, borderRadius, actionList, ...contentProps } = otherProps;

      const contentHeight = getContentHeight(props.rowCount);

      return (
        <Block
          {...elementProps}
          header={<Lsi lsi={header} />}
          headerType="title"
          info={<Lsi lsi={info} />}
          card={card}
          background={background}
          colorSheme={props.colorScheme}
          significance={significance}
          borderRadius={borderRadius}
          actionList={actionList}
          collapsible={false}
        >
          <DataObjectStateResolver dataObject={props.jokesDataObject} height={contentHeight}>
            <DataListStateResolver dataList={props.categoryDataList} height={contentHeight}>
              {/* HINT: We need to trigger Content render from last Resolver to have all data loaded before setup of Content properties */}
              {() => (
                <ContentView
                  {...contentProps}
                  data={props.categoryDataList.data}
                  pageSize={props.categoryDataList.pageSize}
                />
              )}
            </DataListStateResolver>
          </DataObjectStateResolver>
        </Block>
      );
      //@@viewOff:render
    },
  })
);

export default BoxCollectionView;
