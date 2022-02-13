//@@viewOn:imports
import { createVisualComponent, Utils, Lsi, useEffect } from "uu5g05";
import { IdentificationBlock } from "uu_plus4u5g02-elements";
import { DataObjectStateResolver, DataListStateResolver } from "../../core/core";
import Config from "./config/config";
import { ContentView, getContentHeight } from "./content-view";
//@@viewOff:imports

// We need to use memo to avoid uncessary re-renders of whole list for better performance
// For example, when we open UpdateModal from Tile (trough events) we don't need to re-render list
export const BoxCollectionView = Utils.Component.memo(
  createVisualComponent({
    //@@viewOn:statics
    uu5Tag: Config.TAG + "BoxCollectionView",
    //@@viewOff:statics

    //@@viewOn:propTypes
    propTypes: {
      ...Config.Types.BoxView.propTypes,
      ...Config.Types.IdentificationData.propTypes,
      ...Config.Types.List.Properties.propTypes,
      ...Config.Types.List.AsyncData.propTypes,
      ...Config.Types.List.Internals.propTypes,
    },
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    defaultProps: {
      ...Config.Types.BoxView.defaultProps,
      ...Config.Types.List.Properties.defaultProps,
      ...Config.Types.List.AsyncData.defaultProps,
      ...Config.Types.List.Internals.defaultProps,
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
      const {
        header,
        info,
        card,
        background,
        significance,
        borderRadius,
        actionList,
        identificationType,
        ...contentProps
      } = otherProps;

      const contentHeight = getContentHeight(props.rowCount);

      return (
        <IdentificationBlock
          {...elementProps}
          header={<Lsi lsi={header} />}
          info={<Lsi lsi={info} />}
          card={card}
          background={background}
          significance={significance}
          borderRadius={borderRadius}
          actionList={actionList}
          identificationType={identificationType}
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
        </IdentificationBlock>
      );
      //@@viewOff:render
    },
  })
);

export default BoxCollectionView;
