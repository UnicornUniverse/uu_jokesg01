//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils } from "uu5g05";
import { Box, Text } from "uu5g05-elements";
import { Rating } from "uu5extrasg01";
import Config from "./config/config.js";
//@@viewOff:imports

const BoxFooter = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "BoxFooter",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    joke: PropTypes.object.isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render({ joke, ...propsToPass }) {
    //@@viewOn:private
    const { elementProps } = Utils.VisualComponent.splitProps(propsToPass);
    //@@viewOff:private

    //@@viewOn:render
    return (
      <Box {...elementProps} significance="distinct">
        <Rating value={joke.averageRating} colorScheme="green" />
        <Text significance="subdued" colorScheme="building">
          {" "}
          ( {joke.ratingCount} )
        </Text>
      </Box>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { BoxFooter };
export default BoxFooter;
//@@viewOff:exports
