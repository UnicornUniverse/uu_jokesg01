//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, Utils, Lsi, useLanguage, PropTypes } from "uu5g05";
import { Box, Line, Text, DateTime, useSpacing } from "uu5g05-elements";
import { PersonItem } from "uu_plus4u5g02-elements";
import Config from "./config/config";
import LsiData from "./content-lsi";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  image: () =>
    Config.Css.css({
      display: "block",
      maxWidth: "100%",
      margin: "auto",
    }),

  text: (parent) =>
    Config.Css.css({
      display: "block",
      marginLeft: parent.paddingLeft,
      marginRight: parent.paddingRight,
      marginTop: parent.paddingTop,
      marginBottom: parent.paddingTop,
    }),

  infoLine: (parent, spacing) =>
    Config.Css.css({
      display: "block",
      marginLeft: parent.paddingLeft,
      marginTop: spacing.b,
      marginBottom: spacing.b,
    }),

  footer: (parent) =>
    Config.Css.css({
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: parent.paddingBottom,
      paddingBottom: parent.paddingBottom,
      paddingLeft: parent.paddingLeft,
      paddingRight: parent.paddingRight,
    }),
};
//@@viewOff:css

const Content = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Content",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    ...Config.Types.Detail.Internals.propTypes,
    ...Config.Types.Detail.AsyncData.propTypes,
    ...Config.Types.Detail.Properties.propTypes,
    parentStyle: PropTypes.shape({
      paddingTop: PropTypes.unit,
      paddingBottom: PropTypes.unit,
      paddingRight: PropTypes.unit,
      paddingLeft: PropTypes.unit,
    }).isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    ...Config.Types.Detail.Internals.defaultProps,
    ...Config.Types.Detail.AsyncData.defaultProps,
    ...Config.Types.Detail.Properties.defaultProps,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const spacing = useSpacing();
    const [language] = useLanguage();
    const joke = props.jokeDataObject.data;
    const { showCategories, showCreationTime, showAuthor } = props.preferenceDataObject.data;
    const categoryList = props.jokesDataObject.data.categoryList;

    function buildCategoryNames() {
      // for faster lookup
      let categoryIds = new Set(joke.categoryIdList);
      return categoryList
        .reduce((acc, category) => {
          if (categoryIds.has(category.id)) {
            acc.push(category.name);
          }
          return acc;
        }, [])
        .join(", ");
    }

    function getRatingCountLsi(ratingCount) {
      const pluralRules = new Intl.PluralRules(language);
      const rule = pluralRules.select(ratingCount);
      return LsiData[`${rule}Votes`];
    }

    function handleAddRating(rating) {
      props.onAddRating(rating, props.jokeDataObject);
    }
    //@@viewOff:private

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);
    const canAddRating = props.jokesPermission.joke.canAddRating(joke);
    const actionsDisabled = props.jokeDataObject.state === "pending";
    const infoLineClass = Css.infoLine(props.parentStyle, spacing);

    return (
      <div {...attrs}>
        {joke.text && (
          <Text
            category="interface"
            segment="content"
            type="medium"
            colorScheme="building"
            className={Css.text(props.parentStyle)}
          >
            {joke.text}
          </Text>
        )}

        {joke.imageUrl && <img src={joke.imageUrl} alt={joke.name} className={Css.image()} />}

        <Line significance="subdued" />

        {showCategories && joke.categoryIdList?.length > 0 && (
          <InfoLine className={infoLineClass}>{buildCategoryNames()}</InfoLine>
        )}

        {showCreationTime && (
          <InfoLine className={infoLineClass}>
            <DateTime value={joke.sys.cts} dateFormat="short" timeFormat="none" />
          </InfoLine>
        )}

        <InfoLine className={infoLineClass}>
          <Lsi lsi={getRatingCountLsi(joke.ratingCount)} params={[joke.ratingCount]} />
        </InfoLine>

        <Box significance="distinct" className={Css.footer(props.parentStyle)}>
          <span>{showAuthor && <PersonItem uuIdentity={joke.uuIdentity} />}</span>
          <UU5.Bricks.Rating
            value={joke.averageRating}
            onClick={canAddRating ? handleAddRating : undefined}
            disabled={actionsDisabled}
          />
        </Box>
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:helpers
function InfoLine(props) {
  const [elementProps] = Utils.VisualComponent.splitProps(props);

  return (
    <Text
      {...elementProps}
      category="interface"
      segment="content"
      type="medium"
      significance="subdued"
      colorScheme="building"
    >
      {props.children}
    </Text>
  );
}
//@@viewOff:helpers

export default Content;
