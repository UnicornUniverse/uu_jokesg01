//@@viewOn:imports
import UuP from "uu_pg01";
import { createVisualComponent, PropTypes, Lsi } from "uu5g05";
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
    const isDataLoaded = props.jokesDataObject.data !== undefined;

    const actionList = [];

    if (isDataLoaded) {
      actionList.push({
        content: <Lsi lsi={LsiData.reloadData} />,
        onClick: props.onReload,
      });
    }

    if (props.showCopyComponent) {
      actionList.push({
        content: <Lsi lsi={LsiData.copyComponent} />,
        onClick: props.onCopyComponent,
      });
    }

    const contextBarProps = isDataLoaded
      ? getContextBarProps(props.jokesDataObject.data, props.awscDataObject.data, props.contextType, props.isHome)
      : null;

    return (
      <UuP.Bricks.ComponentWrapper
        header={<Lsi lsi={props.header} />}
        help={<Lsi lsi={props.help} />}
        contextBarProps={contextBarProps}
        contextType={props.contextType}
        copyTagFunc={props.onCopyComponent}
        elevation={props.elevation}
        bgStyle={props.bgStyle}
        cardView={props.cardView}
        colorSchema={props.colorSchema}
        borderRadius={props.borderRadius}
        hideCopyComponent={true}
        actionList={actionList}
        disabled={props.disabled}
        hidden={props.hidden}
        className={props.className}
        style={props.style}
        mainAttrs={props.mainAttrs}
        noIndex={props.noIndex}
        ref_={props.ref_}
      >
        <DataObjectStateResolver dataObject={props.jokesDataObject}>
          {/* HINT: We need to trigger Content render from last Resolver to have all data loaded before setup of Content properties */}
          {() => (
            <Content
              jokes={props.jokesDataObject.data}
              awsc={props.awscDataObject.data}
              system={props.systemDataObject.data}
              jokesPermission={props.jokesPermission}
              expanded={false}
              expandButton
              editButtons
              onUpdate={props.onUpdate}
              onSetState={props.onSetState}
            />
          )}
        </DataObjectStateResolver>
      </UuP.Bricks.ComponentWrapper>
    );
    //@@viewOff:render
  },
});

export default BoxView;
