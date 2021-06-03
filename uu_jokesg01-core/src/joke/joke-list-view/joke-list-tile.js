//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useContext, useSession } from "uu5g04-hooks";
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
      <UU5.Bricks.Card className={Css.main()} colorSchema={props.colorSchema}>
        <div className={Css.header()} onClick={handleDetail}>
          {props.joke.name}
        </div>
        <div className={Css.content()} onClick={handleDetail}>
          <div className={Css.text()}>
            {props.joke.text}
            {props.joke.image && (
              <UU5.Bricks.Image
                className={Css.image()}
                src={Calls.getCommandUri(`/uu-app-binarystore/getBinaryData?code=${props.joke.image}`, props.baseUri)}
                authenticate
              />
            )}
          </div>
        </div>
        <div className={Css.footer()}>
          <UU5.Bricks.Rating value={props.joke.averageRating} onClick={handleRatingClick} />
          {props.canManage && (
            <div>
              <UU5.Bricks.Button onClick={handleUpdate} bgStyle="transparent">
                <UU5.Bricks.Icon icon="mdi-pencil" />
              </UU5.Bricks.Button>
              <UU5.Bricks.Button onClick={handleVisibility} bgStyle="transparent">
                <UU5.Bricks.Icon icon="mdi-eye" />
              </UU5.Bricks.Button>
              <UU5.Bricks.Button onClick={handleDelete} bgStyle="transparent">
                <UU5.Bricks.Icon icon="mdi-delete" />
              </UU5.Bricks.Button>
            </div>
          )}
        </div>
      </UU5.Bricks.Card>
    );
    //@@viewOff:render
  },
});

export default JokeListTile;
