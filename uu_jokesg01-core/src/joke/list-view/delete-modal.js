//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils, useLsi } from "uu5g05";
import { Modal, Button, Pending } from "uu5g05-elements";
import { Error } from "../../core/core";
import Config from "./config/config";
import importLsi from "../../lsi/import-lsi";
//@@viewOff:imports

export const DeleteModal = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "DeleteModal",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    jokeDataObject: PropTypes.object.isRequired,
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

    async function handleDelete() {
      try {
        // The modal window remains opened during operation and shows possible errors
        // in local Error component (pessimistic approach). The parent component
        // is responsible to close modal window after operation.
        await props.jokeDataObject.handlerMap.delete();
        props.onDeleteDone();
      } catch (error) {
        DeleteModal.logger.error("Error deleting joke", error);
      }
    }
    //@@viewOff:private

    //@@viewOn:render
    const joke = props.jokeDataObject.data;

    let content;

    switch (props.jokeDataObject.state) {
      case "pending":
        content = <Pending />;
        break;
      case "error":
      case "ready":
      default:
        content = (
          <>
            {props.jokeDataObject.state === "error" && <Error errorData={props.jokeDataObject.errorData} />}
            {Utils.String.format(lsi.question, joke.name)}
          </>
        );
    }

    const isPending = props.jokeDataObject.state === "pending";

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
