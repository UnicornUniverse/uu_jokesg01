//@@viewOn:imports
import { createVisualComponent, Utils, Lsi } from "uu5g05";
import { IdentificationBlock } from "uu_plus4u5g02-elements";
import { DataObjectStateResolver } from "../../core/core";
import ContextBar from "../../jokes/context-bar";
import { Content } from "./content";
import Config from "./config/config";
import { useSpacing } from "uu5g05-elements";
//@@viewOff:imports

const Css = {
  contextBar: ({ spaceA, spaceB }, card) =>
    Config.Css.css({
      marginLeft: card !== "none" && -spaceA,
      marginRight: card !== "none" && -spaceA,
      marginBottom: spaceB,
    }),
  content: ({ spaceA, spaceB }, card) =>
    Config.Css.css({
      marginLeft: card !== "none" && -spaceA,
      marginRight: card !== "none" && -spaceA,
      marginBottom: -spaceB,
    }),
};

export const BoxView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "BoxView",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    ...Config.Types.BoxView.propTypes,
    ...Config.Types.BasicInfo.AsyncData.propTypes,
    ...Config.Types.BasicInfo.Internals.propTypes,
    ...Config.Types.BasicInfo.Properties.propTypes,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    ...Config.Types.BoxView.defaultProps,
    ...Config.Types.BasicInfo.AsyncData.defaultProps,
    ...Config.Types.BasicInfo.Internals.defaultProps,
    ...Config.Types.BasicInfo.Properties.defaultProps,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const spacing = useSpacing();
    //@@viewOff:private

    //@@viewOn:render
    const [elementProps, otherProps] = Utils.VisualComponent.splitProps(props);
    const {
      header,
      info,
      card,
      background,
      borderRadius,
      isHome,
      actionList,
      identificationType,
      level,
      ...contentProps
    } = otherProps;

    return (
      <IdentificationBlock
        {...elementProps}
        header={<Lsi lsi={header} />}
        info={<Lsi lsi={info} />}
        card={card}
        background={background}
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
        <DataObjectStateResolver dataObject={props.jokesDataObject}>
          {/* HINT: We need to trigger Content render from last Resolver to have all data loaded before setup of Content properties */}
          {() => (
            <>
              <ContextBar
                jokes={props.jokesDataObject.data}
                awsc={props.awscDataObject.data}
                contextType={identificationType}
                isHome={isHome}
                className={Css.contextBar(spacing, card)}
              />
              <Content {...contentProps} className={Css.content(spacing, card)} />
            </>
          )}
        </DataObjectStateResolver>
      </IdentificationBlock>
    );
    //@@viewOff:render
  },
});

export default BoxView;
