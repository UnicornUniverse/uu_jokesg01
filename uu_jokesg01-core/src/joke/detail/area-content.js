//@@viewOn:imports
import { createVisualComponent, Utils, useLsi, PropTypes, Content } from "uu5g05";
import { Box, Text, DateTime, InfoGroup, Number, UuGds, Skeleton } from "uu5g05-elements";
import { PersonItem } from "uu_plus4u5g02-elements";
import { Rating } from "uu5extrasg01";
import { Image } from "uu5imagingg01";
import Config from "./config/config.js";
import Joke from "../../utils/joke.js";
import Badge from "../../category/common/badge.js";
import importLsi from "../../lsi/import-lsi.js";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  image: (padding) =>
    Config.Css.css({
      textAlign: "center",
      paddingLeft: padding.left,
      paddingRight: padding.right,
      paddingTop: padding.top,
      paddingBottom: padding.bottom,
    }),

  text: (padding) =>
    Config.Css.css({
      display: "block",
      marginLeft: padding.left,
      marginRight: padding.right,
      marginTop: padding.top,
      marginBottom: padding.top,
    }),

  infoBox: (padding) =>
    Config.Css.css({
      paddingLeft: padding.left,
      paddingRight: padding.right,
      paddingTop: padding.top,
      paddingBottom: padding.top,
    }),

  categoryBadge: () => Config.Css.css({ marginRight: UuGds.SpacingPalette.getValue(["fixed", "a"]) }),
};
//@@viewOff:css

const AreaContent = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "AreaContent",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    joke: PropTypes.object.isRequired,
    showAuthor: PropTypes.bool,
    showCategories: PropTypes.bool,
    showCreationTime: PropTypes.bool,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    showAuthor: true,
    showCategories: true,
    showCreationTime: true,
  },
  //@@viewOff:defaultProps

  render({ joke, padding, showAuthor, showCategories, showCreationTime, ...propsToPass }) {
    //@@viewOn:private
    const jokeLsi = useLsi(importLsi, [Joke.APP_TYPE]);
    const attrs = Utils.VisualComponent.getAttrs(propsToPass);

    function getInfoItemList() {
      const itemList = [];

      itemList.push({
        iconText: <Number value={joke.averageRating} minDecimalDigits={1} maxDecimalDigits={1} />,
        subtitle: jokeLsi.keys.averageRating,
        title: (
          <>
            <Rating value={joke.averageRating} />
            <Text significance="subdued" colorScheme="building">
              {" "}
              ( {joke.ratingCount} )
            </Text>
          </>
        ),
      });

      if (showAuthor) {
        itemList.push({
          component: (props) => (
            <PersonItem
              {...props}
              subtitle={jokeLsi.keys.uuIdentity}
              uuIdentity={joke.uuIdentity}
              direction="vertical-reverse"
            />
          ),
        });
      }

      if (showCreationTime) {
        itemList.push({
          icon: "uugdsstencil-time-calendar-time",
          subtitle: jokeLsi.keys.sys.cts,
          title: <DateTime value={joke.sys.cts} dateFormat="short" timeFormat="short" />,
        });
      }

      if (showCategories && joke.categoryIdList?.length > 0) {
        itemList.push({
          icon: "uugds-tag",
          subtitle: jokeLsi.keys.categoryIdList,
          title: joke.categoryIdList?.map((id) => (
            <Badge key={id} oid={id} colorScheme="green" size="m" className={Css.categoryBadge()} />
          )),
        });
      }

      return itemList;
    }
    //@@viewOff:private

    //@@viewOn:render
    return (
      <div {...attrs}>
        <Box significance="distinct" className={Css.infoBox(padding)}>
          <InfoGroup itemList={getInfoItemList()} autoResize={false} />
        </Box>

        {!joke.image && joke.text && (
          <Text
            category="interface"
            segment="content"
            type="medium"
            colorScheme="building"
            className={Css.text(padding)}
          >
            <Content>{joke.text}</Content>
          </Text>
        )}

        {joke.image && joke.imageUrl && (
          <div className={Css.image(padding)}>
            <Image src={joke.imageUrl} alt={joke.name} borderRadius="none" lightbox={joke.id} />
          </div>
        )}

        {joke.image && !joke.imageUrl && <Skeleton width="100%" height="100%" />}
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { AreaContent };
export default AreaContent;
//@@viewOff:exports
