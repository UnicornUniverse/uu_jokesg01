//@@viewOn:imports
import UU5 from "uu5g04";
import Uu5Elements from "uu5g05-elements";
import { createVisualComponent } from "uu5g04-hooks";
import { Error } from "../../core/core";
import Config from "../config/config";
import Lsi from "./delete-modal-lsi";
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
    jokeDataObject: UU5.PropTypes.object.isRequired,
    shown: UU5.PropTypes.bool,
    onCancel: UU5.PropTypes.func,
    onDeleteDone: UU5.PropTypes.func,
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
        // is responsible to close modal window after operation.
        await props.jokeDataObject.handlerMap.delete();
        props.onDeleteDone();
      } catch (error) {
        console.error(error);
      }
    }
    //@@viewOff:private

    //@@viewOn:render
    const joke = props.jokeDataObject.data;

    let content;

    switch (props.jokeDataObject.state) {
      case "pending":
        content = <UU5.Bricks.Loading />;
        break;
      case "error":
      case "ready":
      default:
        content = (
          <>
            {props.jokeDataObject.state === "error" && <Error errorData={props.jokeDataObject.errorData} />}
            <UU5.Bricks.Lsi lsi={Lsi.question} params={[joke.name]} />
          </>
        );
    }

    if (props.jokeDataObject.state === "pending") {
      content = <UU5.Bricks.Loading />;
    }

    const isPending = props.jokeDataObject.state === "pending";

    return (
      <Uu5Elements.Modal
        header={<UU5.Bricks.Lsi lsi={Lsi.header} />}
        open={props.shown}
        onClose={props.onClose}
        className="center"
      >
        {content}
        <UU5.Bricks.Div className={buttonRowCss()} disabled={isPending}>
          <UU5.Bricks.Button onClick={props.onCancel} className={buttonCss()}>
            <UU5.Bricks.Lsi lsi={Lsi.cancel} />
          </UU5.Bricks.Button>
          <UU5.Bricks.Button onClick={handleDelete} className={buttonCss()} colorSchema="danger">
            <UU5.Bricks.Lsi lsi={Lsi.delete} />
          </UU5.Bricks.Button>
        </UU5.Bricks.Div>
      </Uu5Elements.Modal>
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
