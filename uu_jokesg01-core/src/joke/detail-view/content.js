//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent, Utils, useLsi, useLanguage, PropTypes } from "uu5g05";
import { Box, Line, Text, DateTime, UuGds } from "uu5g05-elements";
import { PersonItem } from "uu_plus4u5g02-elements";
import Config from "./config/config";
import importLsi from "../../lsi/import-lsi";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  image: () =>
    Config.Css.css({
      display: "block",
      width: "100%",
      margin: "auto",
    }),

  text: (marginLeft, marginRight, marginTop, marginBottom) =>
    Config.Css.css({
      display: "block",
      marginLeft,
      marginRight,
      marginTop,
      marginBottom,
    }),

  infoSection: (marginLeft, marginRight, marginTop, marginBottom) =>
    Config.Css.css({
      display: "flex",
      flexDirection: "column",
      gap: UuGds.SpacingPalette.getValue(["fixed", "b"]),
      marginLeft,
      marginRight,
      marginTop,
      marginBottom,
    }),

  footer: (paddingLeft, paddingRight, paddingTop, paddingBottom) =>
    Config.Css.css({
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
      // ISSUE Block + Modal - should pass required borderRadius to children
      // https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=62e160840b17bf002ae9c910
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
    }),
};
//@@viewOff:css

export const Content = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Content",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    jokeDataObject: PropTypes.object.isRequired,
    jokesPermission: PropTypes.object.isRequired,
    preferenceDataObject: PropTypes.object.isRequired,
    onAddRating: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const lsi = useLsi(importLsi, [Content.uu5Tag]);
    const [language] = useLanguage();
    const joke = props.jokeDataObject.data;
    const { showCategories, showCreationTime, showAuthor } = props.preferenceDataObject.data;

    function getRatingCountLsi(ratingCount) {
      const pluralRules = new Intl.PluralRules(language);
      const rule = pluralRules.select(ratingCount);
      return Utils.String.format(lsi[`${rule}Votes`], joke.ratingCount);
    }

    function handleAddRating(rating) {
      props.onAddRating(rating, props.jokeDataObject);
    }
    //@@viewOff:private

    //@@viewOn:render
    const { paddingLeft, paddingRight, paddingTop, paddingBottom, ...styleToPass } = props.style;
    const attrs = Utils.VisualComponent.getAttrs(
      { ...props, style: styleToPass },
      Config.Css.css({ borderRadius: "inherit" })
    );
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
            className={Css.text(paddingLeft, paddingRight, paddingTop, paddingBottom)}
          >
            {joke.text}
          </Text>
        )}

        {joke.imageUrl && <img src={joke.imageUrl} alt={joke.name} className={Css.image()} />}

        <Line significance="subdued" />

        <div className={Css.infoSection(paddingLeft, paddingRight, paddingTop, paddingBottom)}>
          {showCategories && joke.categoryList?.length > 0 && (
            <InfoLine>{joke.categoryList.map((c) => c.name).join(",")}</InfoLine>
          )}

          {showCreationTime && (
            <InfoLine>
              <DateTime value={joke.sys.cts} dateFormat="short" timeFormat="none" />
            </InfoLine>
          )}

          <InfoLine>{getRatingCountLsi(joke.ratingCount)}</InfoLine>
        </div>

        <Box significance="distinct" className={Css.footer(paddingLeft, paddingRight, paddingTop, paddingBottom)}>
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
  const { elementProps } = Utils.VisualComponent.splitProps(props);

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
