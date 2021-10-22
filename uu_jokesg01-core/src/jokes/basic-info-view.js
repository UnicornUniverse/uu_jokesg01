//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useRef, useState } from "uu5g04-hooks";
import { Error } from "../core/core";
import Utils from "../utils/utils";
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

const DEFAULT_PROPS = {
  bgStyle: "transparent",
  cardView: "full",
  colorSchema: "default",
  elevation: 1,
  borderRadius: "0",
  showCopyComponent: true,
  onCopyComponent: () => {},
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
  defaultProps: DEFAULT_PROPS,
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const alertBusRef = useRef();
    const [isUpdateModal, setIsUpdateModal] = useState(false);
    const [isStateModal, setIsStateModal] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const actionList = getActionList(props, handleCopyComponent, handleReload);

    function showError(error, alertBus = alertBusRef.current) {
      alertBus.addAlert({
        content: <Error errorData={error} />,
        colorSchema: "danger",
      });
    }

    const handleUpdate = () => {
      setIsUpdateModal(true);
    };

    const handleSetState = () => {
      setIsStateModal(true);
    };

    const handleUpdateCancel = () => {
      setIsUpdateModal(false);
    };

    const handleSetStateCancel = () => {
      setIsStateModal(false);
    };

    const handleUpdateDone = () => {
      setIsUpdateModal(false);
    };

    const handleSetStateDone = () => {
      setIsStateModal(false);
    };

    function handleCopyComponent() {
      let uu5string = props.onCopyComponent();

      if (!uu5string) {
        uu5string = Utils.createCopyTag("UuJokes.Jokes.BasicInfo", props, ["baseUri"], DEFAULT_PROPS);
      }

      UU5.Utils.Clipboard.write(uu5string);

      alertBusRef.current.addAlert({
        content: <UU5.Bricks.Lsi lsi={Lsi.copyComponentSuccess} />,
        colorSchema: "success",
      });
    }

    async function handleReload() {
      try {
        setDisabled(true);
        await props.jokesDataObject.handlerMap.load();
      } catch (error) {
        console.error(error);
        showError(error);
      } finally {
        setDisabled(false);
      }
    }

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    return (
      <>
        <UU5.Bricks.AlertBus ref_={alertBusRef} location="portal" />
        {currentNestingLevel === "box" && (
          <BoxView
            {...props}
            header={Lsi.header}
            help={Lsi.help}
            nestingLevel={currentNestingLevel}
            showCopyComponent={props.showCopyComponent}
            disabled={disabled || props.disabled}
            onUpdate={handleUpdate}
            onSetState={handleSetState}
            onCopyComponent={handleCopyComponent}
            onReload={handleReload}
          />
        )}
        {currentNestingLevel === "inline" && (
          <InlineView
            {...props}
            header={Lsi.header}
            nestingLevel={currentNestingLevel}
            showCopyComponent={props.showCopyComponent}
            disabled={disabled || props.disabled}
            onUpdate={handleUpdate}
            onSetState={handleSetState}
            onCopyComponent={handleCopyComponent}
            actionList={actionList}
          />
        )}
        {isUpdateModal && (
          <UpdateModal
            jokesDataObject={props.jokesDataObject}
            onSaveDone={handleUpdateDone}
            onCancel={handleUpdateCancel}
            shown
          />
        )}
        {isStateModal && (
          <StateModal
            jokesDataObject={props.jokesDataObject}
            onSaveDone={handleSetStateDone}
            onCancel={handleSetStateCancel}
            shown
          />
        )}
      </>
    );
    //@@viewOff:render
  },
});

function getActionList(props, handleCopyComponent, handleReload) {
  const isDataLoaded = props.jokesDataObject.data !== null;
  const actionList = [];

  if (isDataLoaded) {
    actionList.push({
      children: <UU5.Bricks.Lsi lsi={Lsi.reloadData} />,
      onClick: handleReload,
      collapsed: true,
    });
  }

  if (props.showCopyComponent) {
    actionList.push({
      children: <UU5.Bricks.Lsi lsi={Lsi.copyComponent} />,
      onClick: handleCopyComponent,
      collapsed: true,
    });
  }

  return actionList;
}

export default BasicInfoView;
