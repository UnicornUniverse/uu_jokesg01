//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import { Error } from "../../core/core";
import Config from "../config/config";
import Lsi from "./joke-delete-modal-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "JokeDeleteModal",
  //@@viewOff:statics
};

export const JokeDeleteModal = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    jokeDataObject: UU5.PropTypes.object,
    shown: UU5.PropTypes.bool,
    onCancel: UU5.PropTypes.func,
    onDelete: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    jokeDataObject: undefined,
    shown: false,
    onCancel: () => {},
    onDelete: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    async function handleDelete() {
      try {
        await props.jokeDataObject.handlerMap.delete();
        props.onDelete();
      } catch (error) {
        console.error(error);
      }
    }
    //@@viewOff:private

    //@@viewOn:render
    if (!props.jokeDataObject) {
      return null;
    }

    const joke = props.jokeDataObject.data;

    let content;

    switch (props.jokeDataObject.state) {
      case "pending":
        content = <UU5.Bricks.Loading />;
        break;
      case "error":
        content = <Error errorData={props.jokeDataObject.errorData} />;
        break;
      case "ready":
      default:
        content = <UU5.Bricks.Lsi lsi={Lsi.question} params={[joke.name]} />;
    }

    const isPending = props.jokeDataObject.state === "pending";

    return (
      <UU5.Bricks.Modal
        header={<UU5.Bricks.Lsi lsi={Lsi.header} />}
        shown={props.shown}
        onClose={props.onCancel}
        stickyBackground={true}
        offsetTop="auto"
        location="portal"
      >
        <div className="center">
          {content}
          <UU5.Bricks.Div className={buttonRowCss()} disabled={isPending}>
            <UU5.Bricks.Button onClick={props.onCancel} className={buttonCss()}>
              <UU5.Bricks.Lsi lsi={Lsi.cancel} />
            </UU5.Bricks.Button>
            <UU5.Bricks.Button onClick={handleDelete} className={buttonCss()} colorSchema="danger">
              <UU5.Bricks.Lsi lsi={Lsi.delete} />
            </UU5.Bricks.Button>
          </UU5.Bricks.Div>
        </div>
      </UU5.Bricks.Modal>
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

export default JokeDeleteModal;
