//@@viewOn:imports
import { createVisualComponent, Utils, Lsi, useState } from "uu5g05";
import { useAlertBus } from "uu5g05-elements";
import { getErrorLsi } from "../errors/errors";
import AreaView from "./basic-info-view/area-view";
import InlineView from "./basic-info-view/inline-view";
import DetailModal from "./basic-info-view/detail-modal";
import UpdateModal from "./basic-info-view/update-modal";
import StateModal from "./basic-info-view/state-modal";
import Config from "./config/config";
import LsiData from "./basic-info-view-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  uu5Tag: Config.TAG + "BasicInfoView",
  nestingLevel: ["area", "inline"],
  //@@viewOff:statics
};

const DEFAULT_PROPS = {
  ...Config.Types.Area.defaultProps,
  ...Config.Types.Inline.defaultProps,
  ...Config.Types.IdentificationData.defaultProps,
  ...Config.Types.BasicInfo.AsyncData.defaultProps,
  ...Config.Types.BasicInfo.Properties.defaultProps,
};

const BasicInfoView = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    ...Config.Types.Area.propTypes,
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
    const { addAlert } = useAlertBus();
    const [isDetailModal, setIsDetailModal] = useState(false);
    const [isUpdateModal, setIsUpdateModal] = useState(false);
    const [isStateModal, setIsStateModal] = useState(false);
    const [disabled, setDisabled] = useState(false);

    function showError(error) {
      addAlert({
        message: getErrorLsi(error),
        priority: "error",
      });
    }

    const handleDetailOpen = () => {
      setIsDetailModal(true);
    };

    const handleDetailClose = () => {
      setIsDetailModal(false);
    };

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

      addAlert({
        message: LsiData.copyComponentSuccess,
        priority: "success",
        durationMs: 2000,
      });
    }

    async function handleReload() {
      try {
        setDisabled(true);
        await props.jokesDataObject.handlerMap.load();
      } catch (error) {
        BasicInfoView.logger.error("Error while reloading data", error);
        showError(error);
      } finally {
        setDisabled(false);
      }
    }

    //@@viewOff:private

    //@@viewOn:render
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, STATICS);
    const actionList = getActions(props, handleReload, handleCopyComponent);
    const header = (
      <>
        {!props.isHome && <Lsi lsi={LsiData.appName} />}
        <Lsi lsi={LsiData.header} />
      </>
    );

    const viewProps = {
      ...props,
      header,
      info: LsiData.info,
      actionList,
      disabled: disabled || props.disabled,
      onDetail: handleDetailOpen,
      onUpdate: handleUpdate,
      onSetState: handleSetState,
    };

    return (
      <>
        {currentNestingLevel === "area" && <AreaView {...viewProps} />}
        {currentNestingLevel === "inline" && <InlineView {...viewProps} />}
        {isDetailModal && <DetailModal {...viewProps} onClose={handleDetailClose} shown />}
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
  const actionList = [];

  actionList.push({
    icon: "mdi-sync",
    children: <Lsi lsi={LsiData.reloadData} />,
    onClick: handleReload,
    collapsed: true,
    disabled: props.disabled,
  });

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

//@@viewOn:exports
export { BasicInfoView };
export default BasicInfoView;
//@@viewOff:exports
