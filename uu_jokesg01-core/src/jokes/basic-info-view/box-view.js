//@@viewOn:imports
import UU5 from "uu5g04";
import UuP from "uu_pg01";

import { createVisualComponent } from "uu5g04-hooks";
import { DataObjectStateResolver } from "../../core/core";
import { Content } from "./content";
import Config from "./config/config";
import Lsi from "./box-view-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "BoxView",
  nestingLevel: "box",
  //@@viewOff:statics
};

export const BoxView = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    header: UU5.PropTypes.object.isRequired,
    help: UU5.PropTypes.object.isRequired,
    jokesDataObject: UU5.PropTypes.object.isRequired,
    jokesPermission: UU5.PropTypes.object.isRequired,
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
    header: undefined,
    help: undefined,
    jokesDataObject: undefined,
    jokesPermission: undefined,
    baseUri: undefined,
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
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);
    const isDataLoaded = props.jokesDataObject.data !== null;

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

    return (
      <UuP.Bricks.ComponentWrapper
        header={<UU5.Bricks.Lsi lsi={props.header} />}
        help={<UU5.Bricks.Lsi lsi={props.help} />}
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
      >
        <DataObjectStateResolver dataObject={props.jokesDataObject} nestingLevel={currentNestingLevel}>
          {isDataLoaded && (
            <Content
              jokesDataObject={props.jokesDataObject}
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
