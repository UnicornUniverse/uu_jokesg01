//@@viewOn:imports
import { createVisualComponent, Utils, Lsi, useRef } from "uu5g05";
import { Box, Button, useSpacing } from "uu5g05-elements";
import { SwitchSelect, Select, Text } from "uu5g05-forms";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:constants

//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: ({ spaceB }) =>
    Config.Css.css({
      display: "flex",
      flexDirection: "column",
      gap: spaceB,
      paddingTop: spaceB,
      paddingBottom: spaceB,
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const PropertyForm = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "PropertyForm",
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
    const [elementProps] = Utils.VisualComponent.splitProps(props, Css.main(spacing));

    return (
      <Box {...elementProps} significance="distinct">
        Todo
      </Box>
    );

    //@@viewOff:render
  },
});

//@@viewOn:exports
export { PropertyForm };
export default PropertyForm;
//@@viewOff:exports
