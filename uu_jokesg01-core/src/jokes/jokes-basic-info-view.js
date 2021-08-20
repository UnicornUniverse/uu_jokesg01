//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useRef, useState, useCallback } from "uu5g04-hooks";
import JokesBasicInfoBox from "./jokes-basic-info-view/jokes-basic-info-box";
import JokesBasicInfoInline from "./jokes-basic-info-view/jokes-basic-info-inline";
import JokesUpdateModal from "./jokes-basic-info-view/jokes-update-modal";
import JokesSetStateModal from "./jokes-basic-info-view/jokes-set-state-modal";
import Config from "./config/config";
import Lsi from "./jokes-basic-info-view-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "JokesBasicInfoView",
  nestingLevel: ["box", "inline"],
  //@@viewOff:statics
};

export const JokesBasicInfoView = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    jokesDataObject: UU5.PropTypes.object.isRequired,
    jokesPermission: UU5.PropTypes.object.isRequired,
    bgStyle: UU5.PropTypes.string,
    cardView: UU5.PropTypes.string,
    colorSchema: UU5.PropTypes.string,
    elevation: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    borderRadius: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    showCopyComponent: UU5.PropTypes.bool,
    onCopyComponent: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    jokesDataObject: undefined,
    jokesPermission: undefined,
    bgStyle: "transparent",
    cardView: "full",
    colorSchema: "default",
    elevation: 1,
    borderRadius: "0",
    showCopyComponent: false,
    onCopyComponent: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const alertBusRef = useRef();
    const [updateModal, setUpdateModal] = useState(false);
    const [stateModal, setStateModal] = useState(false);

    const handleUpdate = () => {
      setUpdateModal(true);
    };

    const handleSetState = () => {
      setStateModal(true);
    };

    const handleCancelUpdate = () => {
      setUpdateModal(false);
    };

    const handleCancelSetState = () => {
      setStateModal(false);
    };

    const handleConfirmUpdate = () => {
      setUpdateModal(false);
    };

    const handleConfirmSetState = () => {
      setStateModal(false);
    };

    const handleCopyComponent = useCallback(() => {
      const uu5String = props.onCopyComponent();
      UU5.Utils.Clipboard.write(uu5String);
      alertBusRef.current.addAlert({
        content: <UU5.Bricks.Lsi lsi={Lsi.copyComponentSuccess} />,
        colorSchema: "success",
      });
    }, [props]);

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    return (
      <>
        <UU5.Bricks.AlertBus ref_={alertBusRef} location="portal" />
        {currentNestingLevel === "box" && (
          <JokesBasicInfoBox
            {...props}
            {...attrs}
            header={Lsi.header}
            help={Lsi.help}
            nestingLevel={currentNestingLevel}
            onUpdate={handleUpdate}
            onSetState={handleSetState}
            onCopyComponent={handleCopyComponent}
            showCopyComponent={props.showCopyComponent}
          />
        )}
        {currentNestingLevel === "inline" && (
          <JokesBasicInfoInline
            {...props}
            {...attrs}
            header={Lsi.header}
            nestingLevel={currentNestingLevel}
            onUpdate={handleUpdate}
            onSetState={handleSetState}
            onCopyComponent={handleCopyComponent}
            showCopyComponent={props.showCopyComponent}
          />
        )}
        {updateModal && (
          <JokesUpdateModal
            jokesDataObject={props.jokesDataObject}
            onCancel={handleCancelUpdate}
            onSave={handleConfirmSetState}
            shown
          />
        )}
        {stateModal && (
          <JokesSetStateModal
            jokesDataObject={props.jokesDataObject}
            onCancel={handleCancelSetState}
            onSave={handleConfirmUpdate}
            shown
          />
        )}
      </>
    );
    //@@viewOff:render
  },
});

export default JokesBasicInfoView;