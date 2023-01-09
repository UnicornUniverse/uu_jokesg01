//@@viewOn:imports
import { createVisualComponent, Utils } from "uu5g05";
import { Box, Text, useSpacing } from "uu5g05-elements";
import { Plus4UButton } from "uu_plus4u5g02-app";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: (spacing) =>
    Config.Css.css({
      height: 56,
      paddingTop: spacing.b,
      paddingBottom: spacing.b,
      paddingLeft: spacing.c,
      paddingRight: spacing.c,
      display: "flex",
      alignItems: "center",
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const Top = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Top",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const spacing = useSpacing();
    //@@viewOff:private

    //@@viewOn:render
    const { elementProps } = Utils.VisualComponent.splitProps(props, Css.main(spacing));

    return (
      <Box {...elementProps} significance="distinct" colorScheme="dark-green">
        <Text category="interface" segment="title" type="major">
          {props.header}
        </Text>
        <Plus4UButton />
      </Box>
    );

    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Top };
export default Top;
//@@viewOff:exports
