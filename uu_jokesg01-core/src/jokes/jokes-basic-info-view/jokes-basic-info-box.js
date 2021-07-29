//@@viewOn:imports
import UU5 from "uu5g04";
import UuP from "uu_pg01";

import { createVisualComponent } from "uu5g04-hooks";
import { DataObjectStateResolver } from "../../core/core";
import { JokesBasicInfoContent } from "./jokes-basic-info-content";
import Config from "./config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "JokesBasicInfoBox",
  nestingLevel: "boxCollection",
  //@@viewOff:statics
};

export const JokesBasicInfoBox = createVisualComponent({
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
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    header: undefined,
    help: undefined,
    jokesDataObject: undefined,
    jokesPermission: undefined,
    baseUri: undefined,
    rowCount: undefined,
    bgStyle: "transparent",
    cardView: "full",
    colorSchema: "default",
    elevation: 1,
    borderRadius: "0",
    showCopyComponent: false,
    onCopyComponent: () => {},
    onUpdate: () => {},
    onSetState: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);
    const attrs = UU5.Common.VisualComponent.getAttrs(props);
    const isDataLoaded = props.jokesDataObject.data !== null;

    return (
      <UuP.Bricks.ComponentWrapper
        header={<UU5.Bricks.Lsi lsi={props.header} />}
        help={<UU5.Bricks.Lsi lsi={props.help} />}
        copyTagFunc={props.onCopyComponent}
        elevation={props.elevation}
        borderRadius={props.borderRadius}
        hideCopyComponent={!props.showCopyComponent}
        {...attrs}
      >
        <DataObjectStateResolver dataObject={props.jokesDataObject} nestingLevel={currentNestingLevel} {...attrs}>
          {isDataLoaded && (
            <JokesBasicInfoContent
              jokesDataObject={props.jokesDataObject}
              jokesPermission={props.jokesPermission}
              expanded={false}
              expandButton
              editButtons
              onOpenJokesUpdateModal={props.onUpdate}
              onOpenJokesSetStateModal={props.onSetState}
            />
          )}
        </DataObjectStateResolver>
      </UuP.Bricks.ComponentWrapper>
    );
    //@@viewOff:render
  },
});

export default JokesBasicInfoBox;
