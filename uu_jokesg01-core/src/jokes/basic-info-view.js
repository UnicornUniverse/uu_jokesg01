//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, Utils, Lsi, useRef, useState } from "uu5g05";
import { Error } from "../core/core";
import BoxView from "./basic-info-view/box-view";
import InlineView from "./basic-info-view/inline-view";
import UpdateModal from "./basic-info-view/update-modal";
import StateModal from "./basic-info-view/state-modal";
import Config from "./config/config";
import LsiData from "./basic-info-view-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "BasicInfoView",
  nestingLevel: ["box", "inline"],
  //@@viewOff:statics
};

const DEFAULT_PROPS = {
  ...Config.Types.Box.defaultProps,
  ...Config.Types.Inline.defaultProps,
  ...Config.Types.IdentificationData.defaultProps,
  ...Config.Types.BasicInfo.AsyncData.defaultProps,
  ...Config.Types.BasicInfo.Properties.defaultProps,
};

export const BasicInfoView = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    ...Config.Types.Box.propTypes,
    ...Config.Types.Inline.propTypes,
    ...Config.Types.IdentificationData.propTypes,
    ...Config.Types.BasicInfo.AsyncData.propTypes,
    ...Config.Types.BasicInfo.Properties.propTypes,
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
      const uu5string = props.onCopyComponent();
      Utils.Clipboard.write(uu5string);

      alertBusRef.current.addAlert({
        content: <Lsi lsi={LsiData.copyComponentSuccess} />,
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

    //@@viewOn:render
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, STATICS);
    const actionList = getActions(props, handleReload, handleCopyComponent);

    const viewProps = {
      ...props,
      header: LsiData.header,
      info: LsiData.info,
      actionList,
      disabled: disabled || props.disabled,
      onUpdate: handleUpdate,
      onSetState: handleSetState,
    };

    // ISSUE - Uu5Elements - No alternative for UU5.Bricks.AlertBus
    // https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=61ebd5b1572961002969f271

    return (
      <>
        <UU5.Bricks.AlertBus ref_={alertBusRef} location="portal" />
        {currentNestingLevel === "box" && <BoxView {...viewProps} />}
        {currentNestingLevel === "inline" && <InlineView {...viewProps} />}
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

//@@viewOn:helpers
function getActions(props, handleReload, handleCopyComponent) {
  const isDataLoaded = props.jokesDataObject.data !== undefined;

  const actionList = [];

  if (isDataLoaded) {
    actionList.push({
      icon: "mdi-sync",
      children: <Lsi lsi={LsiData.reloadData} />,
      onClick: handleReload,
      collapsed: true,
      disabled: props.disabled,
    });
  }

  actionList.push({
    icon: "mdi-content-copy",
    children: <Lsi lsi={LsiData.copyComponent} />,
    onClick: handleCopyComponent,
    collapsed: true,
    disabled: props.disabled,
  });

  return actionList;
}
//@@viewOff:helpers

export default BasicInfoView;
