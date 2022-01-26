//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, Utils, useRef, useState } from "uu5g05";
import { Error } from "../core/core";
import Config from "./config/config";
import BoxView from "./detail-view/box-view";
import InlineView from "./detail-view/inline-view";
import UpdateModal from "./detail-view/update-modal";
import PreferenceModal from "./detail-view/preference-modal";
import JokeErrorsLsi from "./errors-lsi";
import Lsi from "./detail-view-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "DetailView",
  nestingLevel: ["box", "inline"],
  //@@viewOff:statics
};

export const DetailView = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    ...Config.Types.Box.propTypes,
    ...Config.Types.Inline.propTypes,
    ...Config.Types.IdentificationData.propTypes,
    ...Config.Types.Detail.AsyncData.propTypes,
    ...Config.Types.Detail.Properties.propTypes,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    ...Config.Types.Box.defaultProps,
    ...Config.Types.Inline.defaultProps,
    ...Config.Types.IdentificationData.defaultProps,
    ...Config.Types.Detail.AsyncData.defaultProps,
    ...Config.Types.Detail.Properties.defaultProps,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const alertBusRef = useRef();
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
        content: <UU5.Bricks.Lsi lsi={Lsi.copyComponentSuccess} />,
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

    const viewProps = {
      ...props,
      header: Lsi.header,
      help: Lsi.help,
      showCopyComponent: props.showCopyComponent,
      disabled: disabled || props.disabled,
      onUpdate: handleUpdate,
      onAddRating: handleAddRating,
      onUpdateVisibility: handleUpdateVisibility,
      onCopyComponent: handleCopyComponent,
      onOpenPreference: handleOpenPreference,
      onReload: handleReload,
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
            jokeDataObject={props.jokeDataObject}
            categoryList={props.jokesDataObject.data.categoryList}
            baseUri={props.baseUri}
            shown={isUpdateModal}
            onSaveDone={handleUpdateDone}
            onCancel={handleUpdateCancel}
          />
        )}
        {isPreferenceModal && (
          <PreferenceModal
            preferenceDataObject={props.preferenceDataObject}
            shown={isPreferenceModal}
            onSaveDone={handlePreferenceDone}
            onCancel={handlePreferenceCancel}
          />
        )}
      </>
    );
    //@@viewOff:render
  },
});

export default DetailView;
