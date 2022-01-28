//@@viewOn:imports
import { createVisualComponent, Utils, Lsi, useEffect } from "uu5g05";
import { Block } from "uu5g05-elements";
import { DataObjectStateResolver, DataListStateResolver } from "../../core/core";
import ContextBar from "../../jokes/context-bar";
import Config from "./config/config";
import { Content, getContentHeight } from "./content";
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
      ...Config.Types.IdentificationData.defaultProps,
      ...Config.Types.Component.Properties.defaultProps,
      ...Config.Types.Component.AsyncData.defaultProps,
      ...Config.Types.Component.Internals.defaultProps,
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
      //@@viewOff:private

      //@@viewOn:render
      const [elementProps, otherProps] = Utils.VisualComponent.splitProps(props);
      const {
        header,
        info,
        card,
        significance,
        borderRadius,
        isHome,
        contextType,
        awscDataObject,
        actionList,
        ...contentProps
      } = otherProps;

      const contentHeight = getContentHeight(props.rowCount);

      return (
        <Block
          {...elementProps}
          header={<Lsi lsi={header} />}
          headerType="title"
          info={<Lsi lsi={info} />}
          card={card}
          background={props.background}
          colorSheme={props.colorScheme}
          significance={significance}
          borderRadius={borderRadius}
          actionList={actionList}
          collapsible={false}
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
                    contextType={contextType}
                    isHome={isHome}
                  />
                  <Content {...contentProps} />
                </>
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
