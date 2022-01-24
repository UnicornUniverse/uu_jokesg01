//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, PropTypes, Utils, useEffect, useMemo } from "uu5g05";
import { Icon, Pending } from "uu5g05-elements";
import Config from "./config/config";
import Css from "./tile-css.js";
//@@viewOff:imports

export const TILE_HEIGHT = Css.TILE_HEIGHT;

export const Tile = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "Tile",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    jokeDataObject: PropTypes.object.isRequired,
    colorSchema: PropTypes.string,
    onDetail: PropTypes.func,
    onUpdate: PropTypes.func,
    onDelete: PropTypes.func,
    onAddRating: PropTypes.func,
    onUpdateVisibility: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    onDetail: () => {},
    onUpdate: () => {},
    onDelete: () => {},
    onAddRating: () => {},
    onUpdateVisibility: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const joke = props.jokeDataObject.data;

    useEffect(() => {
      // console.log("MOUNT:", joke.name);
      if (joke.image && !joke.imageFile && typeof props.jokeDataObject.handlerMap.getImage === "function") {
        props.jokeDataObject.handlerMap.getImage(joke);
      }
      // eslint-disable-next-line uu5/hooks-exhaustive-deps
    }, []);

    const imageFileUrl = useMemo(() => {
      // ISSUE Uu5Tiles.Grid - Tile component is unmounted during each render
      // https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=61eeb5c957296100296a7d0c
      if (joke.imageFile) {
        return URL.createObjectURL(joke.imageFile);
      }
    }, [joke.imageFile]);

    useEffect(() => {
      if (imageFileUrl) {
        return () => URL.revokeObjectURL(imageFileUrl);
      }
    }, [imageFileUrl]);

    function handleDetail() {
      props.onDetail(props.jokeDataObject);
    }

    function handleUpdate() {
      props.onUpdate(props.jokeDataObject);
    }

    function handleDelete() {
      props.onDelete(props.jokeDataObject);
    }

    function handleRatingClick(rating) {
      props.onAddRating(rating, props.jokeDataObject);
    }

    function handleVisibility() {
      props.onUpdateVisibility(!joke.visibility, props.jokeDataObject);
    }
    //@@viewOff:private

    //@@viewOn:render
    // ISSUE: https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=60f0389a1012fb00296f2155
    // We are not able to show placeholder for position where are no data and we are wating for their download
    // FIX: Nothing is shown, waiting for solution, then we show tile with loading or some icon.
    if (!joke) {
      return null;
    }

    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const canManage = props.jokesPermission.joke.canManage(joke);
    const canAddRating = props.jokesPermission.joke.canAddRating(joke);
    const actionsDisabled = props.jokeDataObject.state === "pending";

    return (
      <div {...attrs}>
        <div className={Css.header()} onClick={handleDetail}>
          {!joke.visibility && <Icon className={Css.visibility()} icon="mdi-eye-off" />}
          {joke.name}
        </div>
        <div className={Css.content()} onClick={handleDetail}>
          <div className={Css.text()}>{joke.text}</div>
          {
            // ISSUE - Uu5Elements - No alternative for UU5.Bricks.Image
            // https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=61ebd3da572961002969f1f0
          }
          {
            // FIXME MFA Improve performance
            // FIXME MFA Improve loading
          }
          {joke.image && imageFileUrl && <img src={imageFileUrl} alt={joke.name} className={Css.image()} />}
          {joke.image && !imageFileUrl && <Pending />}
        </div>
        <div className={Css.footer()}>
          {
            // ISSUE - Uu5Elements - No alternative for UU5.Bricks.Rating
            // https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=61ebd485572961002969f212
          }
          <UU5.Bricks.Rating
            value={joke.averageRating}
            onClick={canAddRating ? handleRatingClick : undefined}
            disabled={actionsDisabled}
            colorSchema={props.colorSchema}
          />
          {canManage && (
            <div>
              <Icon icon="mdi-pencil" className={Css.icon()} onClick={handleUpdate} disabled={actionsDisabled} />
              <Icon icon="mdi-eye" className={Css.icon()} onClick={handleVisibility} disabled={actionsDisabled} />
              <Icon icon="mdi-delete" className={Css.icon()} onClick={handleDelete} disabled={actionsDisabled} />
            </div>
          )}
        </div>
      </div>
    );
    //@@viewOff:render
  },
});

export default Tile;
