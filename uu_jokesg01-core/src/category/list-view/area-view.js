//@@viewOn:imports
import { createVisualComponent, Utils, useLsi, Lsi, useEffect } from "uu5g05";
import { UuGds } from "uu5g05-elements";
import { IdentificationBlock } from "uu_plus4u5g02-elements";
import { ControllerProvider } from "uu5tilesg02";
import { DataObjectStateResolver, DataListStateResolver } from "../../core/core";
import Config from "./config/config";
import { Content, getContentHeight } from "./content";
import importLsi from "../../lsi/import-lsi";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  content: () =>
    Config.Css.css({
      marginLeft: UuGds.SpacingPalette.getValue(["fixed", "c"]),
      marginRight: UuGds.SpacingPalette.getValue(["fixed", "c"]),
      marginBottom: UuGds.SpacingPalette.getValue(["fixed", "c"]),
    }),
};
//@@viewOff:css

// We need to use memo to avoid uncessary re-renders of whole list for better performance
// For example, when we open UpdateModal from Tile (trough events) we don't need to re-render list
export const AreaView = Utils.Component.memo(
  createVisualComponent({
    //@@viewOn:statics
    uu5Tag: Config.TAG + "AreaView",
    //@@viewOff:statics

    //@@viewOn:propTypes
    propTypes: {
      ...Config.Types.AreaView.propTypes,
      ...Config.Types.IdentificationData.propTypes,
      ...Config.Types.List.Properties.propTypes,
      ...Config.Types.List.AsyncData.propTypes,
      ...Config.Types.List.Internals.propTypes,
    },
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    defaultProps: {
      ...Config.Types.AreaView.defaultProps,
      ...Config.Types.List.Properties.defaultProps,
      ...Config.Types.List.AsyncData.defaultProps,
      ...Config.Types.List.Internals.defaultProps,
    },
    //@@viewOff:defaultProps

    render(props) {
      //@@viewOn:private
      const errorsLsi = useLsi(importLsi, ["Errors"]);
      // HINT: Check the Joke.ListView.AreaView for explanation of this effect.
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
        borderRadius,
        actionList,
        identificationType,
        level,
        onLoad,
        filterList,
        sorterList,
        filterDefinitionList,
        sorterDefinitionList,
        ...contentProps
      } = otherProps;

      const contentHeight = getContentHeight(props.rowCount);

      return (
        <ControllerProvider
          data={props.categoryDataList.data}
          filterDefinitionList={filterDefinitionList}
          sorterDefinitionList={sorterDefinitionList}
          filterList={filterList}
          sorterList={sorterList}
          onFilterChange={onLoad}
          onSorterChange={onLoad}
        >
          <IdentificationBlock
            {...elementProps}
            header={header}
            info={<Lsi lsi={info} />}
            card={card}
            borderRadius={borderRadius}
            actionList={actionList}
            identificationType={identificationType}
            level={level}
          >
            {() => (
              <DataObjectStateResolver
                dataObject={props.jokesDataObject}
                height={contentHeight}
                customErrorLsi={errorsLsi}
              >
                <DataListStateResolver
                  dataList={props.categoryDataList}
                  height={contentHeight}
                  customErrorLsi={errorsLsi}
                >
                  {/* HINT: We need to trigger Content render from last Resolver to have all data loaded before setup of Content properties */}
                  {() => <Content {...contentProps} className={Css.content()} />}
                </DataListStateResolver>
              </DataObjectStateResolver>
            )}
          </IdentificationBlock>
        </ControllerProvider>
      );
      //@@viewOff:render
    },
  })
);

export default AreaView;
