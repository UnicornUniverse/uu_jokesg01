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
  contextBar: ({ spaceA }) => Config.Css.css({ marginLeft: -spaceA, marginRight: -spaceA }),
  content: ({ spaceA }) =>
    Config.Css.css({
      marginLeft: -spaceA,
      marginRight: -spaceA,
    }),
};

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
          // ISSUE Uu5Elements.Block - headerType should be heading for card equal to none and content
          // https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=620f42c05729610029749d09
          headerType={card === "full" ? "title" : "heading"}
          // ISSUE Uu5Element.Block - Level shouldn't be used when headingType is title
          // https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=620f63e2572961002974b697
          level={card !== "full" ? level : undefined}
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
                    className={Css.contextBar(spacing)}
                  />
                  <Content {...contentProps} className={Css.content(spacing)} />
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

export default BoxCollectionView;
