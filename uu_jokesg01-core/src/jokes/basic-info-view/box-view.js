//@@viewOn:imports
import { createVisualComponent, Utils, Lsi } from "uu5g05";
import { IdentificationBlock } from "uu_plus4u5g02-elements";
import { DataObjectStateResolver } from "../../core/core";
import ContextBar from "../../jokes/context-bar";
import { Content } from "./content";
import Config from "./config/config";
//@@viewOff:imports

export const BoxView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "BoxView",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    ...Config.Types.BoxView.propTypes,
    ...Config.Types.Component.AsyncData.propTypes,
    ...Config.Types.Component.Internals.propTypes,
    ...Config.Types.Component.Properties.propTypes,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    ...Config.Types.BoxView.defaultProps,
    ...Config.Types.Component.AsyncData.defaultProps,
    ...Config.Types.Component.Internals.defaultProps,
    ...Config.Types.Component.Properties.defaultProps,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const [elementProps, otherProps] = Utils.VisualComponent.splitProps(props);
    const {
      header,
      info,
      card,
      background,
      significance,
      borderRadius,
      isHome,
      contextType,
      actionList,
      ...contentProps
    } = otherProps;

    return (
      <IdentificationBlock
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
        <DataObjectStateResolver dataObject={props.jokesDataObject}>
          {/* HINT: We need to trigger Content render from last Resolver to have all data loaded before setup of Content properties */}
          {() => (
            <>
              <ContextBar
                jokes={props.jokesDataObject.data}
                awsc={props.awscDataObject.data}
                contextType={contextType}
                isHome={isHome}
              />
              <Content {...contentProps} />
            </>
          )}
        </DataObjectStateResolver>
      </IdentificationBlock>
    );
    //@@viewOff:render
  },
});

export default BoxView;
