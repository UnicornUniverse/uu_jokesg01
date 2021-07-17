//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Calls from "calls";
import Config from "./config/config";
import Css from "./joke-list-tile-css.js";
//@@viewOff:imports

export const TILE_HEIGHT = Css.TILE_HEIGHT;

export const JokeListTile = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "JokeListTile",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    jokeDataItem: UU5.PropTypes.object.isRequired,
    baseUri: UU5.PropTypes.string,
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
    jokeDataItem: undefined,
    baseUri: undefined,
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
    const joke = props.jokeDataItem.data;

    function handleDetail() {
      props.onDetail(props.jokeDataItem);
    }

    function handleUpdate() {
      props.onUpdate(props.jokeDataItem);
    }

    function handleDelete() {
      props.onDelete(props.jokeDataItem);
    }

    function handleRatingClick(rating) {
      props.onAddRating(rating, props.jokeDataItem);
    }

    function handleVisibility() {
      props.onUpdateVisibility(!joke.visibility, props.jokeDataItem);
    }
    //@@viewOff:private

    //@@viewOn:render
    // ISSUE: https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=60f0389a1012fb00296f2155
    // We are not able to show placeholder for position where are no data and we are wating for their download
    // FIX: Nothing is shown, waiting for solution, then we show tile with loading or some icon.
    if (!joke) {
      return null;
    }

    const canManage = props.jokesPermission.joke.canManage(joke);
    const canAddRating = props.jokesPermission.joke.canAddRating(joke);
    const actionsDisabled = props.jokeDataItem.state === "pending";

    return (
      <div className={Css.main()}>
        <div className={Css.header()} onClick={handleDetail}>
          {!joke.visibility && <UU5.Bricks.Icon className={Css.visibility()} icon="mdi-eye-off" />}
          {joke.name}
        </div>
        <div className={Css.content()} onClick={handleDetail}>
          <div className={Css.text()}>{joke.text}</div>
          {joke.image && (
            <UU5.Bricks.Image
              className={Css.image()}
              src={Calls.getCommandUri(`/uu-app-binarystore/getBinaryData?code=${joke.image}`, props.baseUri)}
              authenticate
            />
          )}
        </div>
        <div className={Css.footer()}>
          <UU5.Bricks.Rating
            value={joke.averageRating}
            onClick={canAddRating ? handleRatingClick : undefined}
            disabled={actionsDisabled}
          />
          {canManage && (
            <div>
              <UU5.Bricks.Icon
                icon="mdi-pencil"
                className={Css.icon()}
                mainAttrs={{ onClick: handleUpdate }}
                disabled={actionsDisabled}
              />
              <UU5.Bricks.Icon
                icon="mdi-eye"
                className={Css.icon()}
                mainAttrs={{ onClick: handleVisibility }}
                disabled={actionsDisabled}
              />
              <UU5.Bricks.Icon
                icon="mdi-delete"
                className={Css.icon()}
                mainAttrs={{ onClick: handleDelete }}
                disabled={actionsDisabled}
              />
            </div>
          )}
        </div>
      </div>
    );
    //@@viewOff:render
  },
});

export default JokeListTile;
