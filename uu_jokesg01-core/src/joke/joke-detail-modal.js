//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import JokeDetailContent from "./joke-detail-view/joke-detail-content";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "JokeDetailModal",
  //@@viewOff:statics
};

export const JokeDetailModal = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    joke: UU5.PropTypes.shape({
      name: UU5.PropTypes.string.isRequired,
      text: UU5.PropTypes.string,
      averageRating: UU5.PropTypes.number.isRequired,
      uuIdentity: UU5.PropTypes.string,
    }).isRequired,
    categoryList: UU5.PropTypes.array.isRequired,
    baseUri: UU5.PropTypes.string.isRequired,
    shown: UU5.PropTypes.bool,
    onClose: UU5.PropTypes.func,
    onAddRating: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    joke: undefined,
    categoryList: [],
    baseUri: undefined,
    shown: false,
    onClose: () => {},
    onAddRating: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    //@@viewOff:private
    //@@viewOn:render
    return (
      <UU5.Bricks.Modal
        header={props.joke.name}
        shown={props.shown}
        onClose={props.onClose}
        stickyBackground={false}
        offsetTop="auto"
        location="portal"
      >
        <JokeDetailContent
          joke={props.joke}
          categoryList={props.categoryList}
          baseUri={props.baseUri}
          onAddRating={props.onAddRating}
        />
      </UU5.Bricks.Modal>
    );
    //@@viewOff:render
  },
});

export default JokeDetailModal;
