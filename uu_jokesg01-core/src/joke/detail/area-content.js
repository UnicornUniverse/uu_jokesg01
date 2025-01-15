//@@viewOn:imports
import { createVisualComponent, Utils, useLsi, PropTypes } from "uu5g05";
import { Box, Text, DateTime, InfoGroup, Number, UuGds } from "uu5g05-elements";
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
        iconText: <Number value={joke.averageRating} maxDecimalDigits={0} />,
        subtitle: jokeLsi.keys.averageRating,
        title: <Rating value={joke.averageRating} colorScheme="green" />,
      });

      itemList.push({
        icon: "uugds-account-multi",
        subtitle: jokeLsi.keys.ratingCount,
        title: <Number value={joke.ratingCount} />,
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
          <InfoGroup itemList={getInfoItemList()} />
        </Box>

        {!joke.imageUrl && joke.text && (
          <Text
            category="interface"
            segment="content"
            type="medium"
            colorScheme="building"
            className={Css.text(padding)}
          >
            {joke.text}
          </Text>
        )}

        {joke.imageUrl && (
          <div className={Css.image(padding)}>
            <Image src={joke.imageUrl} alt={joke.name} borderRadius="none" />
          </div>
        )}
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { AreaContent };
export default AreaContent;
//@@viewOff:exports
