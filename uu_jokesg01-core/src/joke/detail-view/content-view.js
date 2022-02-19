//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, PropTypes, Utils, Lsi, useEffect, useMemo, useLanguage } from "uu5g05";
import { Box, Line, Text, useSpacing } from "uu5g05-elements";
import { PersonPhoto } from "uu_plus4u5g02-elements";
import Config from "./config/config";
import LsiData from "./content-view-lsi";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  image: () =>
    Config.Css.css({
      maxWidth: "100%",
      margin: "auto",
    }),

  text: ({ spaceA, spaceB }) =>
    Config.Css.css({
      display: "block",
      marginLeft: spaceA,
      marginRight: spaceA,
      marginTop: spaceB,
      marginBottom: spaceB,
    }),

  infoLine: ({ spaceA, spaceC }) =>
    Config.Css.css({
      display: "block",
      marginLeft: spaceA,
      marginTop: spaceC,
    }),

  footer: ({ spaceA, spaceB, spaceC }) =>
    Config.Css.css({
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",

      marginTop: spaceC,
      paddingTop: spaceB,
      paddingBottom: spaceB,
      paddingLeft: spaceA,
      paddingRight: spaceA,
    }),

  photo: ({ spaceC }) =>
    Config.Css.css({
      marginRight: spaceC,
    }),
};
//@@viewOff:css

const ContentView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ContentView",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    ...Config.Types.Detail.Preferences.propTypes,
    ...Config.Types.Detail.Internals.propTypes,
    ...Config.Types.Detail.Properties.propTypes,
    categoryList: PropTypes.array.isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    ...Config.Types.Detail.Preferences.defaultProps,
    ...Config.Types.Detail.Internals.defaultProps,
    ...Config.Types.Detail.Properties.defaultProps,
    categoryList: [],
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const spacing = useSpacing();
    const [language] = useLanguage();
    const joke = props.jokeDataObject.data;

    const imageFileUrl = useMemo(() => {
      if (joke.imageFile) {
        return URL.createObjectURL(joke.imageFile);
      }
    }, [joke.imageFile]);

    useEffect(() => {
      if (joke.imageFileUrl) {
        return () => URL.revokeObjectURL(joke.imageFileUrl);
      }
    }, [joke.imageFileUrl]);

    function buildCategoryNames() {
      // for faster lookup
      let categoryIds = new Set(joke.categoryIdList);
      return props.categoryList
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

        {imageFileUrl && <img src={imageFileUrl} alt={joke.name} className={Css.image()} />}

        <Line significance="subdued" background={props.background} />

        {props.showCategories && joke.categoryIdList?.length > 0 && (
          <InfoLine background={props.background}>{buildCategoryNames()}</InfoLine>
        )}

        {props.showCreationTime && (
          <InfoLine background={props.background}>
            {
              // ISSUE - Uu5Elements - No alternative for UU5.Bricks.DateTime
              // https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=61ebd512572961002969f24f
            }
            <UU5.Bricks.DateTime value={joke.sys.cts} dateOnly />
          </InfoLine>
        )}

        <InfoLine background={props.background}>
          <Lsi lsi={getRatingCountLsi(joke.ratingCount)} params={[joke.ratingCount]} />
        </InfoLine>

        <Box significance="distinct" background={props.background} className={Css.footer(spacing)}>
          <span>
            {props.showAuthor && (
              <>
                <PersonPhoto
                  uuIdentity={joke.uuIdentity}
                  size="xs"
                  background={props.background}
                  className={Css.photo(spacing)}
                />
                <Text
                  category="interface"
                  segment="content"
                  colorScheme="building"
                  type="medium"
                  background={props.background}
                >
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
function InfoLine({ children, background }) {
  const spacing = useSpacing();

  return (
    <Text
      category="interface"
      segment="content"
      type="medium"
      significance="subdued"
      colorScheme="building"
      background={background}
      className={Css.infoLine(spacing)}
    >
      {children}
    </Text>
  );
}
//@@viewOff:helpers

export default ContentView;
