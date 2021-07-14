//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import Css from "./joke-detail-content-css";
import Lsi from "./joke-detail-content-lsi";
//@@viewOff:imports

const JokeDetailContent = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "JokeDetailContent",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    jokeDataObject: UU5.PropTypes.object.isRequired,
    jokesPermission: UU5.PropTypes.object.isRequired,
    categoryList: UU5.PropTypes.array.isRequired,
    baseUri: UU5.PropTypes.string.isRequired,
    showDelete: UU5.PropTypes.bool,
    showCopyComponent: UU5.PropTypes.bool,
    onUpdate: UU5.PropTypes.func,
    onAddRating: UU5.PropTypes.func,
    onUpdateVisibility: UU5.PropTypes.func,
    onDelete: UU5.PropTypes.func,
    onCopyComponent: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    jokeDataObject: undefined,
    jokesPermission: undefined,
    categoryList: [],
    baseUri: undefined,
    showDelete: false,
    showCopyComponent: false,
    onUpdate: () => {},
    onAddRating: () => {},
    onUpdateVisibility: () => {},
    onDelete: () => {},
    onCopyComponent: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const joke = props.jokeDataObject.data;

    function handleAddRating(rating) {
      props.onAddRating(joke, rating);
    }

    function handleUpdate() {
      props.onUpdate(joke);
    }

    function handleVisibility() {
      props.onUpdateVisibility(joke, !joke.visibility);
    }

    function handleDelete() {
      props.onDelete(joke);
    }

    function handleCopyComponent() {
      props.onCopyComponent(joke);
    }

    function buildCategoryNames() {
      // for faster lookup
      let categoryIds = new Set(joke.categoryList);
      return props.categoryList
        .reduce((acc, category) => {
          if (categoryIds.has(category.id)) {
            acc.push(category.name);
          }
          return acc;
        }, [])
        .join(", ");
    }
    //@@viewOff:private

    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props);
    const canManage = props.jokesPermission.joke.canManage(joke);
    const canAddRating = props.jokesPermission.joke.canAddRating(joke);
    const canUpdateVisibility = props.jokesPermission.joke.canUpdateVisibility();
    const actionsDisabled = props.jokeDataObject.state === "pending";

    return (
      <div {...attrs}>
        {joke.text}
        {joke.image && (
          <UU5.Bricks.Image
            className={Css.image()}
            src={`${props.baseUri}/uu-app-binarystore/getBinaryData?code=${joke.image}`}
            authenticate
          />
        )}

        <div className={Css.actionPanel()}>
          <div className={Css.ratingBox()}>
            <UU5.Bricks.Rating
              className={Css.rating()}
              value={joke.averageRating}
              onClick={canAddRating ? handleAddRating : undefined}
              disabled={actionsDisabled}
            />
            <UU5.Bricks.Lsi lsi={Lsi.votes} params={[joke.ratingCount]} />
          </div>

          <div>
            {canManage && (
              <UU5.Bricks.Icon
                icon="mdi-pencil"
                className={Css.actionIcon()}
                mainAttrs={{ onClick: handleUpdate }}
                disabled={actionsDisabled}
              />
            )}
            {canUpdateVisibility && (
              <UU5.Bricks.Icon
                icon="mdi-eye"
                className={Css.actionIcon()}
                mainAttrs={{ onClick: handleVisibility }}
                disabled={actionsDisabled}
              />
            )}
            {props.showDelete && canManage && (
              <UU5.Bricks.Icon
                icon="mdi-delete"
                className={Css.actionIcon()}
                mainAttrs={{ onClick: handleDelete }}
                disabled={actionsDisabled}
              />
            )}
            {props.showCopyComponent && (
              <UU5.Bricks.Icon
                icon="mdi-content-copy"
                className={Css.actionIcon()}
                mainAttrs={{ onClick: handleCopyComponent }}
              />
            )}
          </div>
        </div>

        <Line icon="mdi-tag-multiple" content={buildCategoryNames()} />
        <Line icon="mdi-account" content={joke.uuIdentityName} />
        <Line icon="mdi-calendar" content={<UU5.Bricks.DateTime value={joke.sys.cts} dateOnly />} />
      </div>
    );
    //@@viewOff:render
  },
});

function Line({ icon, content }) {
  return (
    <div className={Css.line()}>
      <UU5.Bricks.Icon className={Css.infoIcon()} icon={icon} />
      {content}
    </div>
  );
}

export default JokeDetailContent;
