//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useState } from "uu5g04-hooks";
import Config from "./config/config";
import { JokesBasicInfoModal } from "./jokes-basic-info-modal";
import { JokesBasicInfoLink } from "./jokes-basic-info-link";
import { DataObjectStateResolver } from "../../core/core";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "JokesBasicInfoInline",
  nestingLevel: "inline",
  //@@viewOff:statics
};

export const JokesBasicInfoInline = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    jokesDataObject: UU5.PropTypes.object.isRequired,
    jokesPermission: UU5.PropTypes.object.isRequired,
    header: UU5.PropTypes.object.isRequired,
    bgStyle: UU5.PropTypes.string,
    cardView: UU5.PropTypes.string,
    colorSchema: UU5.PropTypes.string,
    elevation: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    borderRadius: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    showCopyComponent: UU5.PropTypes.bool,
    onCopyComponent: UU5.PropTypes.func,
    onUpdate: UU5.PropTypes.func,
    onSetState: UU5.PropTypes.func,
    expanded: UU5.PropTypes.bool,
    expandButton: UU5.PropTypes.bool,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    header: undefined,
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
    expanded: false,
    expandButton: true,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [isModal, setIsModal] = useState(false);

    function handleDetail() {
      setIsModal(true);
    }

    function handleClose() {
      setIsModal(false);
    }

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);
    const attrs = UU5.Common.VisualComponent.getAttrs(props);
    const isDataLoaded = props.jokesDataObject.data !== null;

    return (
      <DataObjectStateResolver dataObject={props.jokesDataObject} nestingLevel={currentNestingLevel} {...attrs}>
        {isDataLoaded && (
          <>
            <JokesBasicInfoLink header={props.header} onDetail={handleDetail} jokesDataObject={props.jokesDataObject} />
            {isModal && (
              <JokesBasicInfoModal
                header={props.header}
                shown
                jokesDataObject={props.jokesDataObject}
                jokesPermission={props.jokesPermission}
                expanded={props.expanded}
                expandButton={props.expandButton}
                editButtons
                onClose={handleClose}
                onUpdate={props.onUpdate}
                onSetState={props.onSetState}
                bgStyle={props.bgStyle}
                cardView={props.cardView}
                colorSchema={props.colorSchema}
                elevation={props.elevation}
                borderRadius={props.borderRadius}
              />
            )}
          </>
        )}
      </DataObjectStateResolver>
    );
    //@@viewOff:render
  },
});

export default JokesBasicInfoInline;
