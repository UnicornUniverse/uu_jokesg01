//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, PropTypes, Utils, useEffect } from "uu5g05";
import { Icon, Pending } from "uu5g05-elements";
import Config from "./config/config";
//@@viewOff:imports

export const Tile = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Tile",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
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
    //@@viewOn:private¨
    const { data: jokeDataObject } = props;

    useEffect(() => {
      if (jokeDataObject.data.image && !jokeDataObject.data.imageUrl && jokeDataObject.state === "ready") {
        jokeDataObject.handlerMap.getImage(jokeDataObject.data).catch((error) => console.error(error));
      }
    }, [jokeDataObject]);

    function handleDetail() {
      props.onDetail(jokeDataObject);
    }

    function handleUpdate() {
      props.onUpdate(jokeDataObject);
    }

    function handleDelete() {
      props.onDelete(jokeDataObject);
    }

    function handleRatingClick(rating) {
      props.onAddRating(rating, jokeDataObject);
    }

    function handleVisibility() {
      props.onUpdateVisibility(!joke.visibility, jokeDataObject);
    }
    //@@viewOff:private

    //@@viewOn:render
    // ISSUE: https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=60f0389a1012fb00296f2155
    // We are not able to show placeholder for position where are no data and we are wating for their download
    const joke = jokeDataObject.data;

    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const canManage = props.jokesPermission.joke.canManage(joke);
    const canAddRating = props.jokesPermission.joke.canAddRating(joke);
    const actionsDisabled = jokeDataObject.state === "pending";

    return (
      <div {...attrs}>
        <div className={Css.header()} onClick={handleDetail}>
          {!joke.visibility && <Icon className={Css.visibility()} icon="mdi-eye-off" />}
          {joke.name}
        </div>
        <div className={Css.content()} onClick={handleDetail}>
          {joke.text && <div className={Css.text()}>{joke.text}</div>}
          {joke.imageUrl && <img src={joke.imageUrl} alt={joke.name} className={Css.image()} />}
          {joke.image && !joke.imageUrl && (
            <Pending
              size="xl"
              colorScheme={props.colorScheme}
              background={props.background}
              className={Css.pending()}
            />
          )}
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

//@@viewOn:css
export const TILE_HEIGHT = 200; // px

const Css = {
  main: () => Config.Css.css`
    height: ${TILE_HEIGHT}px;
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    border: 1px solid #bdbdbd;
  `,

  header: () => Config.Css.css`
    font-size: 16px;
    color: #005da7;
    font-family: ClearSans-Medium, ClearSans, sans-serif;
    display: flex;
    align-items: center;
    padding: 0 16px;
    height: 48px;
    cursor: pointer;
    line-height: 25px;
  `,

  content: () => Config.Css.css`
    height: 104px;
    width: 100%;
    color: rgba(0, 0, 0, 0.87);
    overflow: hidden;
    padding: 0 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  `,

  pending: () => Config.Css.css`
    display: block;
  `,

  text: () => Config.Css.css`
    font-size: 16px;
    line-height: 21px;
    max-height: 84px;
    overflow: hidden;
  `,

  image: () => Config.Css.css`
    max-width: 100%;
    height: auto;
    display: block;
    margin: 0 auto;
  `,

  footer: () => Config.Css.css`
    display: flex;
    align-items: center;
    border-top: 1px solid rgba(0, 93, 167, 0.12);
    padding: 0 8px;
    margin: 0 8px;
    height: 48px;
    justify-content: space-between;
  `,

  icon: () => Config.Css.css`
    font-size: 20px;
    text-decoration: none;
    color: rgba(0, 0, 0, 0.54);
    margin-left: 16px;
    cursor: pointer;
  `,

  visibility: () => Config.Css.css`
    color: rgba(0,0,0,0.34);
    margin-right: 8px;
    font-size: 20px;
  `,
};
//@@viewOff:css

export default Tile;
