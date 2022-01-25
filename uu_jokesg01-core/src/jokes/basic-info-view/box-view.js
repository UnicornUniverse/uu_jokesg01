//@@viewOn:imports
import UuP from "uu_pg01";
import { createVisualComponent, PropTypes, Utils, Lsi } from "uu5g05";
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
    header: PropTypes.object.isRequired,
    help: PropTypes.object.isRequired,
    jokesDataObject: PropTypes.object.isRequired,
    systemDataObject: PropTypes.object.isRequired,
    awscDataObject: PropTypes.object.isRequired,
    jokesPermission: PropTypes.object.isRequired,
    isHome: PropTypes.bool,
    contextType: PropTypes.oneOf(["none", "basic", "full"]),
    bgStyle: PropTypes.string,
    cardView: PropTypes.string,
    colorSchema: PropTypes.string,
    elevation: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    borderRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    showCopyComponent: PropTypes.bool,
    onCopyComponent: PropTypes.func,
    onUpdate: PropTypes.func,
    onSetState: PropTypes.func,
    onReload: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    isHome: false,
    contextType: "basic",
    bgStyle: "transparent",
    colorSchema: "default",
    elevation: 1,
    cardView: "full",
    borderRadius: "0",
    showCopyComponent: true,
    onCopyComponent: () => {},
    onUpdate: () => {},
    onSetState: () => {},
    onReload: () => {},
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
