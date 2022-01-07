//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Calls from "calls";
import Config from "./config/config";
import Lsi from "./content-lsi";
//@@viewOff:imports

const Content = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "Content",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    jokeDataObject: UU5.PropTypes.object.isRequired,
    jokesPermission: UU5.PropTypes.object.isRequired,
    categoryList: UU5.PropTypes.array.isRequired,
    baseUri: UU5.PropTypes.string,
    showDelete: UU5.PropTypes.bool,
    showCopyComponent: UU5.PropTypes.bool,
    showCategories: UU5.PropTypes.bool,
    showAuthor: UU5.PropTypes.bool,
    showCreationTime: UU5.PropTypes.bool,
    onUpdate: UU5.PropTypes.func,
    onAddRating: UU5.PropTypes.func,
    onUpdateVisibility: UU5.PropTypes.func,
    onDelete: UU5.PropTypes.func,
    onCopyComponent: UU5.PropTypes.func,
    colorSchema: UU5.PropTypes.string,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    categoryList: [],
    showDelete: false,
    showCopyComponent: true,
    showCategories: true,
    showAuthor: true,
    showCreationTime: true,
    colorSchema: "default",
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
      props.onAddRating(rating, props.jokeDataObject);
    }

    function handleUpdate() {
      props.onUpdate(props.jokeDataObject);
    }

    function handleVisibility() {
      props.onUpdateVisibility(!joke.visibility, props.jokeDataObject);
    }

    function handleDelete() {
      props.onDelete(props.jokeDataObject);
    }

    function handleCopyComponent() {
      props.onCopyComponent(props.jokeDataObject);
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
            src={Calls.getCommandUri(`/uu-app-binarystore/getBinaryData?code=${joke.image}`, props.baseUri)}
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
              colorSchema={props.colorSchema}
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

        {props.showCategories && joke.categoryList?.length > 0 && (
          <Line icon="mdi-tag-multiple" content={buildCategoryNames()} />
        )}

        {props.showAuthor && <Line icon="mdi-account" content={joke.uuIdentityName} />}

        {props.showCreationTime && (
          <Line icon="mdi-calendar" content={<UU5.Bricks.DateTime value={joke.sys.cts} dateOnly />} />
        )}
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:helpers
function Line({ icon, content }) {
  return (
    <div className={Css.line()}>
      <UU5.Bricks.Icon className={Css.infoIcon()} icon={icon} />
      {content}
    </div>
  );
}
//@@viewOff:helpers

//@@viewOn:css
const Css = {
  image: () => Config.Css.css`
    max-width: 100%;
    height: auto;
    display: block;
    margin: 0 auto;
  `,

  actionPanel: () => Config.Css.css`
    border-top: 1px solid #BDBDBD;
    margin-top: 16px;
    display: flex;
    align-items: center;
    padding: 0 8px;
    height: 48px;
    justify-content: space-between;
  `,

  ratingBox: () => Config.Css.css`
    padding: 16px 0;
    display: flex;
    align-items: center;
    font-size: 12px;
  `,

  rating: () => Config.Css.css`
    margin-right: 16px;
  `,

  line: () => Config.Css.css`
    font-size: 14px;
    line-height: 19px;
    color: rgba(0,0,0,0.75);
    padding: 4px 0;
    display: flex;
    align-items: center;
  `,

  infoIcon: () => Config.Css.css`
    font-size: 16px;
    color: #005DA7;
    margin-right: 8px;
  `,

  actionIcon: () => Config.Css.css`
    font-size: 20px;
    text-decoration: none;
    color: rgba(0, 0, 0, 0.54);
    margin-left: 8px;
    cursor: pointer;
  `,
};
//@@viewOff:css

export default Content;
