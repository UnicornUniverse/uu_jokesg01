//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Calls from "calls";
import Config from "./config/config";
import Css from "./joke-list-tile-css.js";
//@@viewOff:imports

const JokeListTile = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "JokeListTile",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    joke: UU5.PropTypes.shape({
      name: UU5.PropTypes.string.isRequired,
      text: UU5.PropTypes.string,
      averageRating: UU5.PropTypes.number.isRequired,
    }),
    baseUri: UU5.PropTypes.string.isRequired,
    canManage: UU5.PropTypes.bool,
    canAddRating: UU5.PropTypes.bool,
    colorSchema: UU5.PropTypes.string,
    onDetail: UU5.PropTypes.func,
    onUpdate: UU5.PropTypes.func,
    onDelete: UU5.PropTypes.func,
    onAddRating: UU5.PropTypes.func,
    onUpdateVisibility: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    joke: undefined,
    baseUri: undefined,
    canManage: false,
    canAddRating: false,
    colorSchema: undefined,
    onDetail: () => {},
    onUpdate: () => {},
    onDelete: () => {},
    onAddRating: () => {},
    onUpdateVisibility: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    function handleDetail() {
      props.onDetail(props.joke);
    }

    function handleUpdate() {
      props.onUpdate(props.joke);
    }

    function handleDelete() {
      props.onDelete(props.joke);
    }

    function handleRatingClick(value) {
      props.onAddRating(props.joke, value);
    }

    function handleVisibility() {
      props.onUpdateVisibility(props.joke, !props.joke.visibility);
    }
    //@@viewOff:private

    //@@viewOn:render
    if (!props.joke) {
      return null;
    }

    return (
      <div className={Css.main()}>
        <div className={Css.header()} onClick={handleDetail}>
          {!props.joke.visibility && <UU5.Bricks.Icon className={Css.visibility()} icon="mdi-eye-off" />}
          {props.joke.name}
        </div>
        <div className={Css.content()} onClick={handleDetail}>
          <div className={Css.text()}>{props.joke.text}</div>
          {props.joke.image && (
            <UU5.Bricks.Image
              className={Css.image()}
              src={Calls.getCommandUri(`/uu-app-binarystore/getBinaryData?code=${props.joke.image}`, props.baseUri)}
              authenticate
            />
          )}
        </div>
        <div className={Css.footer()}>
          <UU5.Bricks.Rating
            value={props.joke.averageRating}
            onClick={props.canAddRating ? handleRatingClick : undefined}
          />
          {props.canManage && (
            <div>
              <UU5.Bricks.Icon icon="mdi-pencil" className={Css.icon()} mainAttrs={{ onClick: handleUpdate }} />
              <UU5.Bricks.Icon icon="mdi-eye" className={Css.icon()} mainAttrs={{ onClick: handleVisibility }} />
              <UU5.Bricks.Icon icon="mdi-delete" className={Css.icon()} mainAttrs={{ onClick: handleDelete }} />
            </div>
          )}
        </div>
      </div>
    );
    //@@viewOff:render
  },
});

export default JokeListTile;
