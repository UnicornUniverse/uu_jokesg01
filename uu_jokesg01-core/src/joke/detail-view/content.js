//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, Utils, Lsi, useLanguage } from "uu5g05";
import { Box, Line, Text, DateTime, useSpacing, SpacingProvider } from "uu5g05-elements";
import { PersonPhoto } from "uu_plus4u5g02-elements";
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

  text: (spacing) =>
    Config.Css.css({
      display: "block",
      marginLeft: spacing.d,
      marginRight: spacing.d,
      marginTop: spacing.c,
      marginBottom: spacing.c,
    }),

  infoLine: (spacing) =>
    Config.Css.css({
      display: "block",
      marginLeft: spacing.d,
      marginTop: spacing.b,
    }),

  footer: (spacing) =>
    Config.Css.css({
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",

      marginTop: spacing.b,
      paddingTop: spacing.c,
      paddingBottom: spacing.c,
      paddingLeft: spacing.d,
      paddingRight: spacing.d,
    }),

  photo: (spacing) =>
    Config.Css.css({
      marginRight: spacing.b,
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

    return (
      <div {...attrs}>
        {joke.text && (
          <Text
            category="interface"
            segment="content"
            type="medium"
            colorScheme="building"
            className={Css.text(spacing)}
          >
            {joke.text}
          </Text>
        )}

        {joke.imageUrl && <img src={joke.imageUrl} alt={joke.name} className={Css.image()} />}

        <Line significance="subdued" />

        {showCategories && joke.categoryIdList?.length > 0 && <InfoLine>{buildCategoryNames()}</InfoLine>}

        {showCreationTime && (
          <InfoLine>
            <DateTime value={joke.sys.cts} dateFormat="short" timeFormat="none" />
          </InfoLine>
        )}

        <InfoLine>
          <Lsi lsi={getRatingCountLsi(joke.ratingCount)} params={[joke.ratingCount]} />
        </InfoLine>

        <Box significance="distinct" className={Css.footer(spacing)}>
          <span>
            {showAuthor && (
              <>
                <PersonPhoto uuIdentity={joke.uuIdentity} size="xs" className={Css.photo(spacing)} />
                <Text category="interface" segment="content" colorScheme="building" type="medium">
                  {joke.uuIdentityName}
                </Text>
              </>
            )}
          </span>
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
function InfoLine({ children }) {
  const spacing = useSpacing();

  return (
    <Text
      category="interface"
      segment="content"
      type="medium"
      significance="subdued"
      colorScheme="building"
      className={Css.infoLine(spacing)}
    >
      {children}
    </Text>
  );
}
//@@viewOff:helpers

export default Content;
