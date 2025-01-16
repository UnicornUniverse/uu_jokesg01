//@@viewOn:imports
import { createVisualComponent, Utils, PropTypes } from "uu5g05";
import { Text } from "uu5g05-elements";
import { Image } from "uu5imagingg01";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  main: () =>
    Config.Css.css({
      overflow: "hidden",
      height: "100%",
    }),
  text: (padding) =>
    Config.Css.css({
      display: "block",
      marginLeft: padding.left,
      marginRight: padding.right,
      marginTop: padding.top,
      marginBottom: padding.top,
    }),
};
//@@viewOff:css

const BoxContent = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "BoxContent",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    joke: PropTypes.object.isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render({ joke, padding, ...propsToPass }) {
    //@@viewOn:private
    const attrs = Utils.VisualComponent.getAttrs(propsToPass, Css.main());
    //@@viewOff:private

    //@@viewOn:render
    return (
      <div {...attrs}>
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
          <Image src={joke.imageUrl} alt={joke.name} lightbox={joke.id} borderRadius="none" width="100%" />
        )}
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { BoxContent };
export default BoxContent;
//@@viewOff:exports
