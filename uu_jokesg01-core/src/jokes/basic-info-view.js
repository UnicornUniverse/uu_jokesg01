//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useRef, useState, useCallback } from "uu5g04-hooks";
import BoxView from "./basic-info-view/box-view";
import InlineView from "./basic-info-view/inline-view";
import UpdateModal from "./basic-info-view/update-modal";
import StateModal from "./basic-info-view/state-modal";
import Config from "./config/config";
import Lsi from "./basic-info-view-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "BasicInfoView",
  nestingLevel: ["box", "inline"],
  //@@viewOff:statics
};

export const BasicInfoView = createVisualComponent({
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
    showCopyComponent: true,
    onCopyComponent: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const alertBusRef = useRef();
    const [isUpdateModal, setIsUpdateModal] = useState(false);
    const [isStateModal, setIsStateModal] = useState(false);

    const handleUpdate = () => {
      setIsUpdateModal(true);
    };

    const handleSetState = () => {
      setIsStateModal(true);
    };

    const handleCancelUpdate = () => {
      setIsUpdateModal(false);
    };

    const handleCancelSetState = () => {
      setIsStateModal(false);
    };

    const handleConfirmUpdate = () => {
      setIsUpdateModal(false);
    };

    const handleConfirmSetState = () => {
      setIsStateModal(false);
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
          <BoxView
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
          <InlineView
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
        {isUpdateModal && (
          <UpdateModal
            jokesDataObject={props.jokesDataObject}
            onCancel={handleCancelUpdate}
            onSave={handleConfirmUpdate}
            shown
          />
        )}
        {isStateModal && (
          <StateModal
            jokesDataObject={props.jokesDataObject}
            onCancel={handleCancelSetState}
            onSave={handleConfirmSetState}
            shown
          />
        )}
      </>
    );
    //@@viewOff:render
  },
});

export default BasicInfoView;
