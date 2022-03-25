//@@viewOn:imports
import { createVisualComponent, Utils, Lsi, useEffect } from "uu5g05";
import { useSpacing } from "uu5g05-elements";
import { IdentificationBlock } from "uu_plus4u5g02-elements";
import { DataObjectStateResolver, DataListStateResolver } from "../../core/core";
import ContextBar from "../../jokes/context-bar";
import Config from "./config/config";
import { Content, getContentHeight } from "./content";
//@@viewOff:imports

const Css = {
  contextBar: ({ spaceA }, card) =>
    Config.Css.css({
      marginLeft: card !== "none" && -spaceA,
      marginRight: card !== "none" && -spaceA,
    }),
  content: ({ spaceA, spaceB }, card) =>
    Config.Css.css({
      marginLeft: card !== "none" && -spaceA,
      marginRight: card !== "none" && -spaceA,
      marginBottom: card !== "none" && -spaceB,
    }),
};

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
      ...Config.Types.IdentificationData.defaultProps,
      ...Config.Types.List.Properties.defaultProps,
      ...Config.Types.List.AsyncData.defaultProps,
      ...Config.Types.List.Internals.defaultProps,
    },
    //@@viewOff:defaultProps

    render(props) {
      //@@viewOn:private
      const spacing = useSpacing();

      // HINT: The Joke.ListProvider is rendered with prop skipInitialLoad.
      // The view is responsible to tell when the jokeDataList should be loaded.
      // And why? In inline nesting level we need to load data only when user opens
      // the modal window BUT in this component we need to load data immediately.
      useEffect(() => {
        if (props.jokeDataList.state === "readyNoData") {
          props.jokeDataList.handlerMap.load();
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
        isHome,
        awscDataObject,
        actionList,
        identificationType,
        level,
        ...contentProps
      } = otherProps;

      const contentHeight = getContentHeight(props.rowCount);

      return (
        <IdentificationBlock
          {...elementProps}
          header={<Lsi lsi={header} />}
          info={<Lsi lsi={info} />}
          card={card}
          background={props.background}
          borderRadius={borderRadius}
          actionList={actionList}
          identificationType={identificationType}
          level={level}
        >
          <DataObjectStateResolver
            dataObject={props.jokesDataObject}
            height={contentHeight}
            colorScheme={props.colorScheme}
            background={props.background}
          >
            <DataListStateResolver
              dataList={props.jokeDataList}
              height={contentHeight}
              colorScheme={props.colorScheme}
              background={props.background}
            >
              {/* HINT: We need to trigger Content render from last Resolver to have all data loaded before setup of Content properties */}
              {() => (
                <>
                  <ContextBar
                    jokes={props.jokesDataObject.data}
                    awsc={awscDataObject.data}
                    contextType={identificationType}
                    isHome={isHome}
                    className={Css.contextBar(spacing, card)}
                  />
                  <Content {...contentProps} className={Css.content(spacing, card)} />
                </>
              )}
            </DataListStateResolver>
          </DataObjectStateResolver>
        </IdentificationBlock>
      );
      //@@viewOff:render
    },
  })
);

export default AreaView;
