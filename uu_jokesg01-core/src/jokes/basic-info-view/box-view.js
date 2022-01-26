//@@viewOn:imports
import UuP from "uu_pg01";
import { createVisualComponent, Utils, Lsi } from "uu5g05";
import { DataObjectStateResolver } from "../../core/core";
import { getContextBarProps } from "../../jokes/context-bar";
import { Content } from "./content";
import Config from "./config/config";
import LsiData from "./box-view-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "BoxView",
  //@@viewOff:statics
};

export const BoxView = createVisualComponent({
  ...STATICS,

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
      help,
      cardView,
      elevation,
      borderRadius,
      bgStyle,
      contextType,
      isHome,
      showCopyComponent,
      onCopyComponent,
      onReload,
      ...contentProps
    } = otherProps;

    const isDataLoaded = props.jokesDataObject.data !== undefined;

    const actionList = [];

    if (isDataLoaded) {
      actionList.push({
        content: <Lsi lsi={LsiData.reloadData} />,
        onClick: onReload,
      });
    }

    if (showCopyComponent) {
      actionList.push({
        content: <Lsi lsi={LsiData.copyComponent} />,
        onClick: onCopyComponent,
      });
    }

    const contextBarProps = isDataLoaded
      ? getContextBarProps(props.jokesDataObject.data, props.awscDataObject.data, contextType, isHome)
      : null;

    return (
      <UuP.Bricks.ComponentWrapper
        {...elementProps}
        header={<Lsi lsi={header} />}
        help={<Lsi lsi={help} />}
        contextBarProps={contextBarProps}
        contextType={contextType}
        copyTagFunc={onCopyComponent}
        elevation={elevation}
        bgStyle={bgStyle}
        cardView={cardView}
        borderRadius={borderRadius}
        actionList={actionList}
        hideCopyComponent
      >
        <DataObjectStateResolver dataObject={props.jokesDataObject}>
          {/* HINT: We need to trigger Content render from last Resolver to have all data loaded before setup of Content properties */}
          {() => <Content {...contentProps} />}
        </DataObjectStateResolver>
      </UuP.Bricks.ComponentWrapper>
    );
    //@@viewOff:render
  },
});

export default BoxView;
