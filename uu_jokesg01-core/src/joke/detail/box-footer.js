//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils } from "uu5g05";
import { Box, Grid, Icon, Number, UuGds } from "uu5g05-elements";
import { Rating } from "uu5extrasg01";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  marginRight: () => Config.Css.css({ paddingRight: UuGds.SpacingPalette.getValue(["inline", "b"]) }),
};
//@@viewOff:css

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
        <Grid templateColumns="1fr 1fr">
          <Grid.Item justifySelf="start">
            <Rating value={joke.averageRating} colorScheme="green" />
          </Grid.Item>
          <Grid.Item justifySelf="end">
            <Icon icon="uugds-account-multi" className={Css.marginRight()} />
            <Number value={joke.ratingCount} />
          </Grid.Item>
        </Grid>
      </Box>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { BoxFooter };
export default BoxFooter;
//@@viewOff:exports
