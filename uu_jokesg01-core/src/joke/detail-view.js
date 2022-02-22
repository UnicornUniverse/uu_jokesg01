//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, Utils, Lsi, useRef, useState } from "uu5g05";
import { Error } from "../core/core";
import Config from "./config/config";
import AreaView from "./detail-view/area-view";
import SpotView from "./detail-view/spot-view";
import BoxView from "./detail-view/box-view";
import InlineView from "./detail-view/inline-view";
import DetailModal from "./detail-view/detail-modal";
import UpdateModal from "./detail-view/update-modal";
import PreferenceModal from "./detail-view/preference-modal";
import JokeErrorsLsi from "./errors-lsi";
import LsiData from "./detail-view-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  uu5Tag: Config.TAG + "DetailView",
  nestingLevel: ["bigBox", "box", "smallBox", "inline"],
  //@@viewOff:statics
};

export const DetailView = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    ...Config.Types.Area.propTypes,
    ...Config.Types.Box.propTypes,
    ...Config.Types.Spot.propTypes,
    ...Config.Types.Inline.propTypes,
    ...Config.Types.IdentificationData.propTypes,
    ...Config.Types.Detail.AsyncData.propTypes,
    ...Config.Types.Detail.Properties.propTypes,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    ...Config.Types.Area.defaultProps,
    ...Config.Types.Box.defaultProps,
    ...Config.Types.Spot.defaultProps,
    ...Config.Types.Inline.defaultProps,
    ...Config.Types.IdentificationData.defaultProps,
    ...Config.Types.Detail.AsyncData.defaultProps,
    ...Config.Types.Detail.Properties.defaultProps,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const alertBusRef = useRef();
    const [isDetailModal, setIsDetailModal] = useState(false);
    const [isUpdateModal, setIsUpdateModal] = useState(false);
    const [isPreferenceModal, setIsPreferenceModal] = useState(false);
    const [disabled, setDisabled] = useState(false);

    function showError(error, alertBus = alertBusRef.current) {
      alertBus.addAlert({
        content: <Error errorData={error} customErrorLsi={JokeErrorsLsi} />,
        colorSchema: "danger",
      });
    }

    async function handleAddRating(rating) {
      try {
        await props.jokeDataObject.handlerMap.addRating(rating);
      } catch (error) {
        showError(error);
      }
    }

    async function handleUpdateVisibility(visibility) {
      try {
        await props.jokeDataObject.handlerMap.updateVisibility(visibility);
      } catch (error) {
        showError(error);
      }
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

    const handleUpdateDone = async () => {
      setIsUpdateModal(false);
    };

    const handleUpdateCancel = () => {
      setIsUpdateModal(false);
    };

    const handleOpenPreference = () => {
      setIsPreferenceModal(true);
    };

    const handlePreferenceDone = async () => {
      setIsPreferenceModal(false);
    };

    const handlePreferenceCancel = () => {
      setIsPreferenceModal(false);
    };

    function handleCopyComponent() {
      const uu5string = props.onCopyComponent();
      UU5.Utils.Clipboard.write(uu5string);

      alertBusRef.current.addAlert({
        content: <Lsi lsi={LsiData.copyComponentSuccess} />,
        colorSchema: "success",
      });
    }

    async function handleReload() {
      try {
        setDisabled(true);
        // HINT: We should reload ALL data consumed by the component be sure the user is looking on up-to-date data
        await Promise.all([
          props.jokesDataObject.handlerMap.load(),
          props.jokeDataObject.handlerMap.load(),
          // Property preferenceDataObject is optional
          props.preferenceDataObject?.handlerMap.load(),
        ]);
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
    const actionList = getActions(props, {
      handleReload,
      handleCopyComponent,
      handleOpenPreference,
      handleUpdate,
      handleUpdateVisibility,
    });

    const viewProps = {
      ...props,
      header: LsiData.header,
      info: LsiData.info,
      actionList,
      disabled: disabled || props.disabled,
      onDetail: handleDetailOpen,
      onUpdate: handleUpdate,
      onAddRating: handleAddRating,
      onUpdateVisibility: handleUpdateVisibility,
    };

    // ISSUE - Uu5Elements - No alternative for UU5.Bricks.AlertBus
    // https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=61ebd5b1572961002969f271

    return (
      <>
        <UU5.Bricks.AlertBus ref_={alertBusRef} location="portal" />
        {currentNestingLevel === "bigBox" && <AreaView {...viewProps} />}
        {currentNestingLevel === "box" && <BoxView {...viewProps} />}
        {currentNestingLevel === "smallBox" && <SpotView {...viewProps} />}
        {currentNestingLevel === "inline" && <InlineView {...viewProps} />}
        {isDetailModal && <DetailModal {...viewProps} onClose={handleDetailClose} shown />}
        {isUpdateModal && (
          <UpdateModal
            jokeDataObject={props.jokeDataObject}
            categoryList={props.jokesDataObject.data.categoryList}
            baseUri={props.baseUri}
            onSaveDone={handleUpdateDone}
            onCancel={handleUpdateCancel}
            shown
          />
        )}
        {isPreferenceModal && (
          <PreferenceModal
            preferenceDataObject={props.preferenceDataObject}
            onSaveDone={handlePreferenceDone}
            onCancel={handlePreferenceCancel}
            shown
          />
        )}
      </>
    );
    //@@viewOff:render
  },
});

//@@viewOn:helpers
function getActions(
  props,
  { handleReload, handleCopyComponent, handleOpenPreference, handleUpdate, handleUpdateVisibility }
) {
  const isDataLoaded =
    props.jokesDataObject.data !== null &&
    props.jokeDataObject.data !== null &&
    props.preferenceDataObject.data !== null;

  const actionList = [];
  const canManage = props.jokesPermission.joke.canManage(props.jokeDataObject.data);
  const canUpdateVisibility = props.jokesPermission.joke.canUpdateVisibility();

  if (isDataLoaded) {
    if (canManage) {
      actionList.push({
        icon: "mdi-pencil",
        children: <Lsi lsi={LsiData.update} />,
        onClick: handleUpdate,
        disabled: props.disabled,
        primary: true,
      });
    }

    if (canUpdateVisibility) {
      const lsiCode = props.jokeDataObject.data.visibility ? "hide" : "show";
      actionList.push({
        icon: props.jokeDataObject.data.visibility ? "mdi-eye-off" : "mdi-eye",
        children: <Lsi lsi={LsiData[lsiCode]} />,
        onClick: () => handleUpdateVisibility(!props.jokeDataObject.data.visibility),
        disabled: props.disabled,
        primary: true,
      });
    }

    actionList.push({
      icon: "mdi-sync",
      children: <Lsi lsi={LsiData.reloadData} />,
      onClick: handleReload,
      collapsed: true,
      disabled: props.disabled,
    });

    actionList.push({
      icon: "mdi-settings",
      children: <Lsi lsi={LsiData.configure} />,
      onClick: handleOpenPreference,
      collapsed: true,
      disabled: props.disabled || props.preferenceDataObject.data.disableUserPreference,
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

export default DetailView;
