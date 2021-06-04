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
    joke: UU5.PropTypes.shape({
      name: UU5.PropTypes.string.isRequired,
      text: UU5.PropTypes.string,
      averageRating: UU5.PropTypes.number.isRequired,
      uuIdentity: UU5.PropTypes.string,
    }).isRequired,
    categoryList: UU5.PropTypes.array.isRequired,
    baseUri: UU5.PropTypes.string.isRequired,
    onAddRating: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    joke: undefined,
    categoryList: [],
    baseUri: undefined,
    onAddRating: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    function handleAddRating(rating) {
      props.onAddRating(props.joke, rating);
    }

    function buildCategoryNames() {
      // for faster lookup
      let categoryIds = new Set(props.joke.categoryList);
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
    return (
      <div>
        {props.joke.text}
        {props.joke.image && (
          <UU5.Bricks.Image
            className={Css.image()}
            src={`${props.baseUri}/uu-app-binarystore/getBinaryData?code=${props.joke.image}`}
            authenticate
          />
        )}
        <div className={Css.ratingBox()}>
          <UU5.Bricks.Rating className={Css.rating()} value={props.joke.averageRating} onClick={handleAddRating} />
          <UU5.Bricks.Lsi lsi={Lsi.votes} params={[props.joke.ratingCount]} />
        </div>

        <Line icon="mdi-tag-multiple" content={buildCategoryNames()} />
        <Line icon="mdi-account" content={props.joke.uuIdentityName} />
        <Line icon="mdi-calendar" content={<UU5.Bricks.DateTime value={props.joke.sys.cts} dateOnly />} />
      </div>
    );
    //@@viewOff:render
  },
});

function Line({ icon, content }) {
  return (
    <div className={Css.line()}>
      <UU5.Bricks.Icon className={Css.icon()} icon={icon} />
      {content}
    </div>
  );
}

export default JokeDetailContent;
