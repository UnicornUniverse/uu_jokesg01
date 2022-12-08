//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils, useLsi } from "uu5g05";
import { Modal, Button, Pending } from "uu5g05-elements";
import Config from "./config/config";
import { Error } from "../../core/core";
import importLsi from "../../lsi/import-lsi";
//@@viewOff:imports

export const DeleteModal = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "DeleteModal",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    categoryDataObject: PropTypes.object,
    shown: PropTypes.bool,
    onCancel: PropTypes.func,
    onDeleteDone: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    shown: false,
    onCancel: () => {},
    onDeleteDone: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const lsi = useLsi(importLsi, [DeleteModal.uu5Tag]);
    const errorsLsi = useLsi(importLsi, ["Errors"]);

    async function handleDelete() {
      try {
        // The modal window remains opened during operation and shows possible errors
        // in local Error component (pessimistic approach). The parent component
        // is responsible to close modal window after operation has been successfuly done.
        await props.categoryDataObject.handlerMap.delete();
        props.onDeleteDone();
      } catch (error) {
        DeleteModal.logger.error("Error deleting category", error);
      }
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

    const category = props.categoryDataObject?.data;

    let content;

    switch (props.categoryDataObject?.state) {
      case "pending":
        content = <Pending />;
        break;
      case "error":
        content = <Error errorData={props.categoryDataObject?.errorData} customErrorLsi={errorsLsi} />;
        break;
      case "ready":
      default:
        content = Utils.String.format(lsi.question, category?.name);
    }

    const isPending = props.categoryDataObject?.state === "pending";

    return (
      <Modal header={lsi.header} open={props.shown} onClose={props.onClose} className="center">
        {content}
        <div className={buttonRowCss()} disabled={isPending}>
          <Button onClick={props.onCancel} className={buttonCss()}>
            {lsi.cancel}
          </Button>
          <Button onClick={handleDelete} className={buttonCss()} colorScheme="negative">
            {lsi.delete}
          </Button>
        </div>
      </Modal>
    );
    //@@viewOff:render
  },
});

//@@viewOn:css
const buttonRowCss = () => Config.Css.css`
margin: 16px;
`;

const buttonCss = () => Config.Css.css`
margin: 8px;
`;
//@@viewOff:css

export default DeleteModal;
