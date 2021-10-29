//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useRef, useState } from "uu5g04-hooks";
import { Error } from "../core/core";
import Utils from "../utils/utils";
import Config from "./config/config";
import BoxView from "./detail-view/box-view";
import InlineView from "./detail-view/inline-view";
import JokeUpdateModal from "./detail-view/update-modal";
import Lsi from "./detail-view-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "DetailView",
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

export const DetailView = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    jokeDataObject: UU5.PropTypes.object.isRequired,
    jokesDataObject: UU5.PropTypes.object.isRequired,
    jokesPermission: UU5.PropTypes.object.isRequired,
    baseUri: UU5.PropTypes.string,
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
    const confirmModalRef = useRef();
    const [isUpdateModal, setIsUpdateModal] = useState(false);
    const [disabled, setDisabled] = useState(false);

    function showError(error, alertBus = alertBusRef.current) {
      alertBus.addAlert({
        content: <Error errorData={error} />,
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

    const handleUpdateCancel = (opt, initialValues) => {
      const valuesChanged = !UU5.Common.Tools.deepEqual(opt.component.getValues(), initialValues);
      if (valuesChanged) {
        confirmModalRef.current.open({
          content: <UU5.Bricks.Lsi lsi={Lsi.closeModalConfirm} />,
          confirmButtonProps: { content: <UU5.Bricks.Lsi lsi={Lsi.closeModalConfirmButton} />, colorSchema: "danger" },
          refuseButtonProps: { content: <UU5.Bricks.Lsi lsi={Lsi.closeModalRefuseButton} /> },
          onConfirm: () => setIsUpdateModal(false),
        });
      } else {
        setIsUpdateModal(false);
      }
    };

    function handleCopyComponent() {
      let uu5string = props.onCopyComponent();

      if (!uu5string) {
        uu5string = Utils.createCopyTag(
          Config.DEFAULT_DETAIL_BRICK_TAG,
          { ...props, jokeId: props.jokeDataObject.data.id },
          ["baseUri", "jokeId"],
          DEFAULT_PROPS
        );
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
        // HINT: We should reload ALL data consumed by the component be sure the user is looking on up-to-date data
        await Promise.all([props.jokesDataObject.handlerMap.load(), props.jokeDataObject.handlerMap.load()]);
      } catch (error) {
        console.error(error);
        showError(error);
      } finally {
        setDisabled(false);
      }
    }
    //@@viewOff:private

    //@@viewOn:render
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    return (
      <>
        <UU5.Bricks.AlertBus ref_={alertBusRef} location="portal" />
        <UU5.Bricks.ConfirmModal ref_={confirmModalRef} size="auto" />
        {currentNestingLevel === "box" && (
          <BoxView
            {...props}
            header={Lsi.header}
            help={Lsi.help}
            nestingLevel={currentNestingLevel}
            showCopyComponent={props.showCopyComponent}
            disabled={disabled || props.disabled}
            onUpdate={handleUpdate}
            onAddRating={handleAddRating}
            onUpdateVisibility={handleUpdateVisibility}
            onCopyComponent={handleCopyComponent}
            onReload={handleReload}
          />
        )}
        {currentNestingLevel === "inline" && (
          <InlineView
            {...props}
            header={Lsi.header}
            help={Lsi.help}
            nestingLevel={currentNestingLevel}
            showCopyComponent={props.showCopyComponent}
            disabled={disabled || props.disabled}
            onUpdate={handleUpdate}
            onAddRating={handleAddRating}
            onUpdateVisibility={handleUpdateVisibility}
            onCopyComponent={handleCopyComponent}
            onReload={handleReload}
          />
        )}
        {isUpdateModal && (
          <JokeUpdateModal
            jokeDataObject={props.jokeDataObject}
            categoryList={props.jokesDataObject.data.categoryList}
            baseUri={props.baseUri}
            shown={isUpdateModal}
            onSaveDone={handleUpdateDone}
            onCancel={handleUpdateCancel}
          />
        )}
      </>
    );
    //@@viewOff:render
  },
});

export default DetailView;
