//@@viewOn:imports
import { createVisualComponent, PropTypes, Lsi } from "uu5g05";
import { Modal, Button, Pending } from "uu5g05-elements";
import Config from "./config/config";
import { Error } from "../../core/core";
import LsiData from "./delete-modal-lsi";
import ListErrorsLsi from "../list-errors-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "DeleteModal",
  //@@viewOff:statics
};

export const DeleteModal = createVisualComponent({
  ...STATICS,

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
    async function handleDelete() {
      try {
        // The modal window remains opened during operation and shows possible errors
        // in local Error component (pessimistic approach). The parent component
        // is responsible to close modal window after operation has been successfuly done.
        await props.categoryDataObject.handlerMap.delete();
        props.onDeleteDone();
      } catch (error) {
        console.error(error);
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
        content = <Error errorData={props.categoryDataObject?.errorData} customErrorLsi={ListErrorsLsi} />;
        break;
      case "ready":
      default:
        content = <Lsi lsi={LsiData.question} params={[category?.name]} />;
    }

    const isPending = props.categoryDataObject?.state === "pending";

    return (
      <Modal header={<Lsi lsi={LsiData.header} />} open={props.shown} onClose={props.onClose} className="center">
        {content}
        <div className={buttonRowCss()} disabled={isPending}>
          <Button onClick={props.onCancel} className={buttonCss()}>
            <Lsi lsi={LsiData.cancel} />
          </Button>
          <Button onClick={handleDelete} className={buttonCss()} colorScheme="negative">
            <Lsi lsi={LsiData.delete} />
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
