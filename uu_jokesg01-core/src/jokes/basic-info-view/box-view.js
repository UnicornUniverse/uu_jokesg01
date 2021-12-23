//@@viewOn:imports
import UU5 from "uu5g04";
import UuP from "uu_pg01";
import { createVisualComponent } from "uu5g04-hooks";
import { DataObjectStateResolver } from "../../core/core";
import { getContextBarProps } from "../../jokes/context-bar";
import { Content } from "./content";
import Config from "./config/config";
import Lsi from "./box-view-lsi";
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
    header: UU5.PropTypes.object.isRequired,
    help: UU5.PropTypes.object.isRequired,
    jokesDataObject: UU5.PropTypes.object.isRequired,
    systemDataObject: UU5.PropTypes.object.isRequired,
    awscDataObject: UU5.PropTypes.object.isRequired,
    jokesPermission: UU5.PropTypes.object.isRequired,
    isHome: UU5.PropTypes.bool,
    contextType: UU5.PropTypes.oneOf(["none", "basic", "full"]),
    bgStyle: UU5.PropTypes.string,
    cardView: UU5.PropTypes.string,
    colorSchema: UU5.PropTypes.string,
    elevation: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    borderRadius: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    showCopyComponent: UU5.PropTypes.bool,
    onCopyComponent: UU5.PropTypes.func,
    onUpdate: UU5.PropTypes.func,
    onSetState: UU5.PropTypes.func,
    onReload: UU5.PropTypes.func,
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
        content: <UU5.Bricks.Lsi lsi={Lsi.reloadData} />,
        onClick: props.onReload,
      });
    }

    if (props.showCopyComponent) {
      actionList.push({
        content: <UU5.Bricks.Lsi lsi={Lsi.copyComponent} />,
        onClick: props.onCopyComponent,
      });
    }

    const contextBarProps = isDataLoaded
      ? getContextBarProps(props.jokesDataObject.data, props.awscDataObject.data, props.contextType, props.isHome)
      : null;

    return (
      <UuP.Bricks.ComponentWrapper
        header={<UU5.Bricks.Lsi lsi={props.header} />}
        help={<UU5.Bricks.Lsi lsi={props.help} />}
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
