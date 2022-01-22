//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, PropTypes, Utils, Lsi, useRef, useState } from "uu5g05";
import { Error } from "../core/core";
import JokesUtils from "../utils/utils";
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
  isHome: false,
  contextType: "basic",
  bgStyle: "transparent",
  cardView: "full",
  colorSchema: "default",
  elevation: 1,
  borderRadius: "0",
  showCopyComponent: true,
};

export const BasicInfoView = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    baseUri: PropTypes.string,
    jokesDataObject: PropTypes.object.isRequired,
    systemDataObject: PropTypes.object.isRequired,
    awscDataObject: PropTypes.object.isRequired,
    jokesPermission: PropTypes.object.isRequired,
    isHome: PropTypes.bool,
    contextType: PropTypes.oneOf(["none", "basic", "full"]),
    bgStyle: PropTypes.string,
    cardView: PropTypes.string,
    colorSchema: PropTypes.string,
    elevation: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    borderRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    showCopyComponent: PropTypes.bool,
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
      const uu5string = JokesUtils.createCopyTag(
        Config.DefaultBrickTags.JOKES_BASIC_INFO,
        props,
        ["baseUri"],
        DEFAULT_PROPS
      );

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

    // ISSUE - Uu5Elements - No alternative for UU5.Bricks.AlertBus
    // https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=61ebd5b1572961002969f271

    return (
      <>
        <UU5.Bricks.AlertBus ref_={alertBusRef} location="portal" />
        {currentNestingLevel === "box" && (
          <BoxView
            {...props}
            header={LsiData.header}
            help={LsiData.help}
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
            header={LsiData.header}
            showCopyComponent={props.showCopyComponent}
            disabled={disabled || props.disabled}
            onUpdate={handleUpdate}
            onSetState={handleSetState}
            onCopyComponent={handleCopyComponent}
            onReload={handleReload}
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

export default BasicInfoView;
