//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
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
    jokeDataObject: UU5.PropTypes.object.isRequired,
    shown: UU5.PropTypes.bool,
    onClose: UU5.PropTypes.func,
    onDelete: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    jokeDataObject: undefined,
    shown: false,
    onClose: () => {},
    onDelete: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const joke = props.jokeDataObject.data;

    function handleDelete() {
      props.onDelete(joke);
    }
    //@@viewOff:private

    //@@viewOn:render
    return (
      <UU5.Bricks.Modal
        header={<UU5.Bricks.Lsi lsi={Lsi.header} />}
        shown={props.shown}
        onClose={props.onClose}
        stickyBackground={false}
        offsetTop="auto"
        location="portal"
      >
        <div className="center">
          <UU5.Bricks.Lsi lsi={Lsi.question} params={[joke.name]} />
          <div className={buttonRowCss()}>
            <UU5.Bricks.Button onClick={props.onClose} className={buttonCss()}>
              <UU5.Bricks.Lsi lsi={Lsi.cancel} />
            </UU5.Bricks.Button>
            <UU5.Bricks.Button onClick={handleDelete} className={buttonCss()} colorSchema="danger">
              <UU5.Bricks.Lsi lsi={Lsi.delete} />
            </UU5.Bricks.Button>
          </div>
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
